const targetEnv = process.env.TARGET_ENV;

const storageRevisions = {
  local: process.env.STORAGE_REVISION_LOCAL,
  session: process.env.STORAGE_REVISION_SESSION
};

const appVersion = process.env.APP_VERSION;

const mv3 = process.env.MV3 === 'true';

export {targetEnv, storageRevisions, appVersion, mv3};
