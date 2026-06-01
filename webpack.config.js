import path from 'node:path';

import webpack from 'webpack';

const __dirname = import.meta.dirname;

const {
  default: {revisions: storageRevisions}
} = await import('./src/storage/config.json', {with: {type: 'json'}});

export default async function (env, argv) {
  const targetEnv = process.env.TARGET_ENV || 'chrome';
  const isProduction = process.env.NODE_ENV === 'production';

  const mv3 = env.mv3 === 'true';
  const appVersion = env.appVersion;

  const provideExtApi = !['firefox', 'safari'].includes(targetEnv);

  const provideModules = {};
  if (provideExtApi) {
    provideModules.browser = 'webextension-polyfill';
  }

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        TARGET_ENV: JSON.stringify(targetEnv),
        STORAGE_REVISION_LOCAL: JSON.stringify(storageRevisions.local.at(-1)),
        STORAGE_REVISION_SESSION: JSON.stringify(
          storageRevisions.session.at(-1)
        ),
        APP_VERSION: JSON.stringify(appVersion),
        MV3: JSON.stringify(mv3.toString())
      }
    }),
    new webpack.ProvidePlugin(provideModules)
  ];

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'browserslist',
    entry: {
      background: './src/background/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist', targetEnv, 'src'),
      filename: '[name]/script.js',
      chunkFilename: '[name]/script.js',
      chunkFormat: 'array-push',
      asyncChunks: false
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.json', '.css', '.scss', '.vue'],
      fallback: {fs: false}
    },
    performance: {
      hints: false
    },
    devtool: false,
    plugins
  };
}
