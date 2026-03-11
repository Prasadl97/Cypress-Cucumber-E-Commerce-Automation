/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    assertVisible(selector: string, message?: string): Chainable<void>;
    fillForm(fields: Record<string, string>): Chainable<void>;
  }
}
