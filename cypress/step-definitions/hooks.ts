import { Before, After } from '@badeball/cypress-cucumber-preprocessor';
import { AssertUtils } from '../../utils/AssertUtils.js';
import { Logger } from '../../utils/Logger.js';
import { clearContext } from '../support/context.js';

Before(function ({ pickle }) {
  Logger.info(`Scenario: ${pickle.name}`);
  AssertUtils.setScenarioId(pickle.id);
  clearContext();
});

After(function ({ pickle }) {
  const status = AssertUtils.getFailureCount() > 0 ? 'FAILED' : 'PASSED';
  Logger.logSummary('Execution Summary', {
    Scenario: pickle.name,
    Status: status,
    BaseURL: Cypress.config().baseUrl ?? '',
  });
  AssertUtils.assertAll(pickle.name);
});
