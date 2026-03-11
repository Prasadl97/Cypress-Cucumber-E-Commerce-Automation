import { BasePage } from './BasePage.js';
import { HeaderComponent } from '../cypress/components/HeaderComponent.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class HomePage extends BasePage {
  gotoHome(): void {
    this.goto('/');
  }

  search(query: string): void {
    HeaderComponent.search(query);
  }

  clickProductLink(productName: string): void {
    cy.contains('a', productName).first().click();
  }

  async expectSearchResultsFor(query: string): Promise<void> {
    await AssertUtils.verifyExpect(
      'Search results',
      async () => {
        cy.get('h1').contains(`Search results for: '${query}'`).should('be.visible');
      },
      `Search results for '${query}' should be visible`
    );
  }

  clickCreateAccount(): void {
    HeaderComponent.clickCreateAccount();
  }

  clickSignIn(): void {
    HeaderComponent.clickSignIn();
  }
}
