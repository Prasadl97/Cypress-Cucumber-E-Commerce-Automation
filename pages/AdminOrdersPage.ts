import { BasePage } from './BasePage.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class AdminOrdersPage extends BasePage {
  gotoOrders(): void {
    const adminBaseURL = Cypress.env('adminBaseURL') ?? `${this.baseURL}admin/`;
    cy.visit(adminBaseURL + 'sales/order/index/');
  }

  async expectOrdersGridLoaded(): Promise<void> {
    await AssertUtils.verifyExpect(
      'Orders heading',
      async () => {
        cy.contains('h1', 'Orders').should('be.visible');
      },
      'Orders heading should be visible'
    );
    await AssertUtils.verifyExpect(
      'Create New Order button',
      async () => {
        cy.contains('button', 'Create New Order').should('be.visible');
      },
      'Create New Order button should be visible'
    );
  }
}
