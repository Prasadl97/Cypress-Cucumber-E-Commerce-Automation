/**
 * Base page for all page objects.
 * Uses Cypress cy API - no Playwright Page.
 */
export abstract class BasePage {
  protected get baseURL(): string {
    return Cypress.config().baseUrl ?? '';
  }

  protected goto(path: string): void {
    const url = path.startsWith('http') ? path : new URL(path, this.baseURL).toString();
    cy.visit(url);
  }
}
