import browser from 'webextension-polyfill';

import {initStorage} from 'storage/init';
import {targetEnv} from 'utils/config';

function addPingListener() {
  const requestTypes = ['ping'];
  if (targetEnv === 'firefox') {
    requestTypes.push('beacon');
  }

  browser.webRequest.onBeforeRequest.addListener(
    function() {
      return {
        cancel: true
      };
    },
    {
      urls: ['*://*/*'],
      types: requestTypes
    },
    ['blocking']
  );
}

async function onLoad() {
  await initStorage('sync');
  addPingListener();
}

document.addEventListener('DOMContentLoaded', onLoad);
