import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../../pages/HomePage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();

When('I search for {string}', function (query: string) {
  homePage.search(query);
  cy.then(async () => {
    await homePage.expectSearchResultsFor(query);
  });
});

When('I open the product {string} from search results', function (productName: string) {
  homePage.clickProductLink(productName);
});

When('I add it to cart with Size {string} and Color {string}', function (size: string, color: string) {
  productPage.addConfigurableToCart(size, color);
});

Then('I see the message {string}', function (message: string) {
  const productName = message.replace(/^You added (.+) to your shopping cart\.$/, '$1');
  cy.then(async () => {
    await productPage.expectAddedToCartMessage(productName);
  });
});

When('I open the shopping cart', function () {
  cartPage.gotoCart();
  cy.then(async () => {
    await cartPage.expectOnCartPage();
  });
});

When('I update the cart quantity to {int}', function (qty: number) {
  cy.then(async () => {
    await cartPage.expectOnCartPage();
  }).then(() => {
    cartPage.updateQuantityTo(qty);
  });
});

Then('the cart quantity is {int}', function (qty: number) {
  cy.then(async () => {
    await cartPage.expectCartItemQty(qty);
  });
});

When('I remove the item from the cart', function () {
  cy.then(async () => {
    await cartPage.expectOnCartPage();
  }).then(() => {
    cartPage.removeFirstItem();
  });
});
