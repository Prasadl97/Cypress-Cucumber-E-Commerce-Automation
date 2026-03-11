/**
 * Reusable form component for generic form interactions.
 */
export class FormComponent {
  static fillInput(selector: string, value: string): void {
    cy.get(selector).clear().type(value);
  }

  static fillInputByLabel(label: string, value: string): void {
    cy.contains('label', label).parent().find('input, select, textarea').first().clear().type(value);
  }

  static submitButton(buttonText: string): void {
    cy.contains('button', buttonText).click();
  }
}
