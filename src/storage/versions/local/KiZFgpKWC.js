import browser from 'webextension-polyfill';

const message = 'Initial version';

const revision = 'KiZFgpKWC';
const downRevision = null;

const storage = browser.storage.local;

async function upgrade() {
  const changes = {installTime: new Date().getTime()};

  changes.storageVersion = revision;
  return storage.set(changes);
}

async function downgrade() {
  const changes = {};

  changes.storageVersion = downRevision;
  return storage.set(changes);
}

export {message, revision, upgrade, downgrade};
