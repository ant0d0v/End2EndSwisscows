import { test as setup } from "../utils/fixtures.js";
import { removeRefreshToken } from "../helpers/authHelper.js";

const authFilePathForInternalUser = "./data/auth/internalUser.json";
const authFilePathForExternalUser = "./data/auth/externalUser.json";

setup("Login to site as swisscows user", async ({ accounts, app, page}) => {
  //Action
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton();
  await accounts.app.loginPage.form.fill({
    emailField: process.env.USERNAME_INTERNAL_USER,
    passwordField: process.env.PASSWORD_INTERNAL_USER,
  }); 
  await accounts.app.loginPage.form.clickLoginButton();

  // Assert
  await app.home.header.logo.expectSwisscowsLogoToBeVisible();

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForInternalUser });
  removeRefreshToken(authFilePathForInternalUser);
});

setup("Login to site as external user", async ({ accounts, app, page }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton();
  await accounts.app.loginPage.waitUntilPageIsFullyLoaded();
  await accounts.app.loginPage.form.fill({
    emailField: process.env.USERNAME_EXTERNAL_USER,
    passwordField: process.env.PASSWORD_EXTERNAL_USER,
  }); 
  await accounts.app.loginPage.form.clickLoginButton();

  //Assert
  await app.home.header.logo.expectSwisscowsLogoToBeVisible();

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForExternalUser });
  removeRefreshToken(authFilePathForExternalUser);
});
