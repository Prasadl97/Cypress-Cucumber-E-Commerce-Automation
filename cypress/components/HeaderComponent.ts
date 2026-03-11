/**
 * Reusable header component - search, create account, sign in.
 */
export class HeaderComponent {
  static getCreateAccountLink() {
    return cy.contains('a', 'Create an Account');
  }

  static getSignInLink() {
    return cy.contains('a', 'Sign In');
  }

  static getSearchCombobox() {
    return cy.get('#search, input[name="q"], [role="combobox"][aria-label="Search"]').first();
  }

  static clickCreateAccount(): void {
    this.getCreateAccountLink().click();
  }

  static clickSignIn(): void {
    this.getSignInLink().click();
  }

  static search(query: string): void {
    this.getSearchCombobox().clear().type(query).type('{enter}');
  }
}
