const message = 'Initial version';

const revision = 'KiZFgpKWC';

async function upgrade() {
  const changes = {installTime: new Date().getTime()};

  changes.storageVersion = revision;
  return browser.storage.local.set(changes);
}

export {message, revision, upgrade};
