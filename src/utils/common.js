function getStore(name, {content = null} = {}) {
  name = `${name}Store`;

  if (!self[name]) {
    self[name] = content || {};
  }

  return self[name];
}

function runOnce(name, func) {
  const store = getStore('run');

  if (!store[name]) {
    store[name] = true;

    if (!func) {
      return true;
    }

    return func();
  }
}

function sleep(ms) {
  return new Promise(resolve => self.setTimeout(resolve, ms));
}

export {getStore, runOnce, sleep};
