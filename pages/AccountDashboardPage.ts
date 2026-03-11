import { BasePage } from './BasePage.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class AccountDashboardPage extends BasePage {
  async expectDashboardVisible(): Promise<void> {
    await AssertUtils.verifyExpect(
      'Dashboard visible',
      async () => {
        cy.contains('span', 'My Account').should('be.visible');
      },
      'My Account heading should be visible'
    );
  }

  async expectRegistrationSuccessMessage(): Promise<void> {
    await AssertUtils.verifyExpect(
      'Registration success',
      async () => {
        cy.contains('Thank you for registering with Main Website Store.').should('be.visible');
      },
      'Registration success message should be visible'
    );
  }

  expandAccountDropdown(): void {
    cy.contains('button', 'Change').first().click();
    cy.contains('a', 'Sign Out').should('be.visible');
  }

  clickSignOut(): void {
    this.expandAccountDropdown();
    cy.contains('a', 'Sign Out').click();
  }

  async expectOnDashboard(): Promise<void> {
    await this.expectDashboardVisible();
  }
}
