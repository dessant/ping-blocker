import {initStorage} from 'storage/init';
import {isStorageReady} from 'storage/storage';
import {setAppVersion, getStartupState} from 'utils/app';
import {runOnce} from 'utils/common';
import {targetEnv, mv3} from 'utils/config';

async function syncState() {
  const resourceTypes = ['ping', 'csp_report'];
  if (targetEnv === 'firefox') {
    resourceTypes.push('beacon');
  }

  if (mv3) {
    await browser.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [1],
      addRules: [
        {
          id: 1,
          action: {
            type: 'block'
          },
          condition: {
            resourceTypes
          }
        }
      ]
    });
  } else {
    browser.webRequest.onBeforeRequest.addListener(
      function() {
        return {
          cancel: true
        };
      },
      {
        urls: ['*://*/*'],
        types: resourceTypes
      },
      ['blocking']
    );
  }
}

async function onInstall(details) {
  if (['install', 'update'].includes(details.reason)) {
    await setup({event: 'install'});
  }
}

async function onStartup() {
  await setup({event: 'startup'});
}

function addInstallListener() {
  browser.runtime.onInstalled.addListener(onInstall);
}

function addStartupListener() {
  browser.runtime.onStartup.addListener(onStartup);
}

async function setup({event = ''} = {}) {
  const startup = await getStartupState({event});

  if (startup.setupInstance) {
    await runOnce('setupInstance', async () => {
      if (!(await isStorageReady())) {
        await initStorage();
      }

      if (startup.update) {
        await setAppVersion();
      }
    });
  }

  if (startup.setupSession) {
    await runOnce('setupSession', async () => {
      if (mv3 && !(await isStorageReady({area: 'session'}))) {
        await initStorage({area: 'session', silent: true});
      }

      await syncState();
    });
  }
}

function init() {
  addInstallListener();
  addStartupListener();

  setup();
}

init();
