export class BasePage {
  visit(url = "/") {
    cy.visit(url);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  typeText(selector, text) {
    cy.get(selector).type(text);
  }
}
