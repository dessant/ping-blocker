function runOnce(name, func) {
  name = `${name}Run`;

  if (!self[name]) {
    self[name] = true;

    if (!func) {
      return true;
    }

    return func();
  }
}

function sleep(ms) {
  return new Promise(resolve => self.setTimeout(resolve, ms));
}

export {runOnce, sleep};
