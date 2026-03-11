/// <reference types="cypress" />

/**
 * Custom Cypress commands for reusable actions.
 */

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/customer/account/login/');
  cy.get('#email').clear().type(email);
  cy.get('input[name="login[password]"]').clear().type(password);
  cy.contains('span', 'Sign In').click();
});

Cypress.Commands.add('assertVisible', (selector: string, message?: string) => {
  cy.get(selector).should('be.visible');
  if (message) cy.log(message);
});

Cypress.Commands.add('fillForm', (fields: Record<string, string>) => {
  for (const [selector, value] of Object.entries(fields)) {
    cy.get(selector).clear().type(value);
  }
});
