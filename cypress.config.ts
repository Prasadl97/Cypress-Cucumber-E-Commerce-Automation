import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import cypressSplit from 'cypress-split';
import { saveRegisteredUser, loadRegisteredUser } from './utils/EntityStore.js';

const baseURL = process.env.BASE_URL ?? 'https://magento2-demo.magebit.com/';
const adminBaseURL = process.env.ADMIN_BASE_URL ?? `${baseURL.replace(/\/?$/, '')}/admin/`;
const entityFilePath = process.env.ENTITY_FILE_PATH ?? './data/entities/registered-user.json';

export default defineConfig({
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
        saveRegisteredUser: async (args: { path: string; data: { email: string; password?: string } }) => {
          await saveRegisteredUser(args.path, args.data);
          return null;
        },
        loadRegisteredUser: async (path: string) => {
          return await loadRegisteredUser(path);
        },
      });
      cypressSplit(on, config);
      return config;
    },
  },
});
