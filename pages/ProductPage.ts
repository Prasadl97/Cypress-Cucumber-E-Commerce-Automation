import { BasePage } from './BasePage.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class ProductPage extends BasePage {
  selectSize(size: string): void {
    cy.get(`[data-option-label="${size}"]`).first().click();
  }

  selectColor(color: string): void {
    cy.get(`[data-option-label="${color}"]`).first().click();
  }

  addToCart(): void {
    cy.contains('button', 'Add to Cart').click();
  }

  addConfigurableToCart(size: string, color: string): void {
    this.selectSize(size);
    this.selectColor(color);
    this.addToCart();
  }

  async expectAddedToCartMessage(productName: string): Promise<void> {
    await AssertUtils.verifyExpect(
      'Added to cart message',
      async () => {
        cy.contains(`You added ${productName} to your shopping cart.`).should('be.visible');
      },
      `Message for ${productName} should be visible`
    );
  }
}
