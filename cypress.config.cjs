/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const cypressSplit = require('cypress-split');
const { saveRegisteredUser, loadRegisteredUser } = require('./utils/EntityStore.cjs');

const baseURL = process.env.BASE_URL ?? 'https://magento2-demo.magebit.com/';
const adminBaseURL = process.env.ADMIN_BASE_URL ?? `${baseURL.replace(/\/?$/, '')}/admin/`;
const entityFilePath = process.env.ENTITY_FILE_PATH ?? './data/entities/registered-user.json';

module.exports = defineConfig({
  e2e: {
    baseUrl: baseURL,
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    env: {
      adminBaseURL,
      entityFilePath,
      tags: '',
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      on('task', {
        saveRegisteredUser: async (args) => {
          await saveRegisteredUser(args.path, args.data);
          return null;
        },
        loadRegisteredUser: async (path) => {
          return await loadRegisteredUser(path);
        },
      });
      cypressSplit(on, config);
      return config;
    },
  },
});
