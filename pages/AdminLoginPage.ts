import { BasePage } from './BasePage.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class AdminLoginPage extends BasePage {
  gotoAdminLogin(): void {
    const adminBaseURL = Cypress.env('adminBaseURL') ?? `${this.baseURL}/admin/`;
    cy.visit(adminBaseURL);
  }

  fillUsername(username: string): void {
    cy.get('input[name="login[username]"], input#username').clear().type(username);
  }

  fillPassword(password: string): void {
    cy.get('input[name="login[password]"], input#login').clear().type(password);
  }

  clickSignIn(): void {
    cy.contains('button', 'Sign in').click();
  }

  login(username: string, password: string): void {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickSignIn();
  }

  async expectOnAdminDashboard(): Promise<void> {
    await AssertUtils.verifyExpect(
      'Admin dashboard',
      async () => {
        cy.contains('h1', 'Dashboard').should('be.visible');
      },
      'Admin dashboard heading should be visible'
    );
  }
}
