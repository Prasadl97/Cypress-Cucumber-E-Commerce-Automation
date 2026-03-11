import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  gotoLogin(): void {
    this.goto('/customer/account/login/');
  }

  fillEmail(email: string): void {
    cy.get('#email').clear().type(email);
  }

  fillPassword(password: string): void {
    cy.get('input[name="login[password]"]').clear().type(password);
  }

  clickSignIn(): void {
    cy.contains('span', 'Sign In').click();
  }

  login(email: string, password: string): void {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignIn();
  }
}
