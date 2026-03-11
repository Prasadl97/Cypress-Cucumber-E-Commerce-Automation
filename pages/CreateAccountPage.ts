import { BasePage } from './BasePage.js';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class CreateAccountPage extends BasePage {
  gotoCreateAccount(): void {
    this.goto('/customer/account/create/');
  }

  fillRegistrationForm(data: RegistrationData): void {
    cy.get('#firstname').clear().type(data.firstName);
    cy.get('#lastname').clear().type(data.lastName);
    cy.get('#email_address').clear().type(data.email);
    cy.get('#password').clear().type(data.password);
    cy.get('#password-confirmation').clear().type(data.password);
  }

  submitCreateAccount(): void {
    cy.contains('button', 'Create an Account').click();
  }

  register(data: RegistrationData): void {
    this.fillRegistrationForm(data);
    this.submitCreateAccount();
  }
}
