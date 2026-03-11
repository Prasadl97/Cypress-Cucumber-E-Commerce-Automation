import { BasePage } from './BasePage.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class CartPage extends BasePage {
  gotoCart(): void {
    this.goto('/checkout/cart/');
  }

  setCartItemQty(qty: number): void {
    cy.get('[role="spinbutton"][aria-label="Qty"], input.input-text.qty').first().clear().type(String(qty));
  }

  clickUpdateShoppingCart(): void {
    cy.contains('button', 'Update Shopping Cart').click();
  }

  updateQuantityTo(qty: number): void {
    this.setCartItemQty(qty);
    this.clickUpdateShoppingCart();
  }

  removeFirstItem(): void {
    cy.contains('a', 'Remove item').first().click();
  }

  async expectOnCartPage(): Promise<void> {
    await AssertUtils.verifyExpect(
      'Cart page visible',
      async () => {
        cy.contains('h1', 'Shopping Cart').should('be.visible');
      },
      'Cart heading should be visible'
    );
  }

  async expectEmptyCart(): Promise<void> {
    await AssertUtils.verifyExpect(
      'Empty cart message',
      async () => {
        cy.contains('You have no items in your shopping cart.').should('be.visible');
      },
      'Empty cart message should be visible'
    );
  }

  async expectCartItemQty(qty: number): Promise<void> {
    await AssertUtils.verifyExpect(
      'Cart item quantity',
      async () => {
        cy.get('[role="spinbutton"][aria-label="Qty"], input.input-text.qty').first().should('have.value', String(qty));
      },
      `Cart qty should be ${qty}`
    );
  }
}
