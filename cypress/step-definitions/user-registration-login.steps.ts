import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../../pages/HomePage.js';
import { CreateAccountPage } from '../../pages/CreateAccountPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { AccountDashboardPage } from '../../pages/AccountDashboardPage.js';
import { generateUniqueEmail } from '../../utils/IdUtils.js';
import { TestDataLoader } from '../../configs/TestDataLoader';
import { scenarioContext } from '../support/context.js';

const homePage = new HomePage();
const createAccountPage = new CreateAccountPage();
const loginPage = new LoginPage();
const accountDashboardPage = new AccountDashboardPage();

Given('I am on the home page', function () {
  homePage.gotoHome();
});

When('I register a new user with a dynamic email', function () {
  const testData = TestDataLoader.load();
  const { firstName, lastName, password } = testData.defaultRegistration;
  const email = generateUniqueEmail();
  scenarioContext.registeredEmail = email;
  scenarioContext.registeredPassword = password;

  homePage.gotoHome();
  homePage.clickCreateAccount();
  createAccountPage.register({ firstName, lastName, email, password });
});

Then('registration succeeds', function () {
  cy.then(async () => {
    await accountDashboardPage.expectOnDashboard();
    await accountDashboardPage.expectRegistrationSuccessMessage();
  }).then(() => {
    const email = scenarioContext.registeredEmail;
    const password = scenarioContext.registeredPassword;
    if (email && password) {
      const entityPath = Cypress.env('entityFilePath') ?? './data/entities/registered-user.json';
      cy.task('saveRegisteredUser', { path: entityPath, data: { email, password } });
    }
  });
});

When('I log out', function () {
  accountDashboardPage.clickSignOut();
});

When('I log in with the saved credentials', function () {
  const entityPath = Cypress.env('entityFilePath') ?? './data/entities/registered-user.json';
  cy.task<{ email: string; password?: string }>('loadRegisteredUser', entityPath).then((user) => {
    if (!user?.password) throw new Error('Saved user has no password; cannot login.');
    loginPage.gotoLogin();
    loginPage.login(user.email, user.password);
  });
});

Then('I see my account dashboard', function () {
  cy.then(async () => {
    await accountDashboardPage.expectOnDashboard();
  });
});
