import { test as setup } from "../utils/fixtures.js";
import {
  getBearerTokenOfInternalUser,
  getBearerTokenOfExternalUser,
  removeRefreshToken,
} from "../helpers/authHelper.js";

const authFilePathForInternalUser = "./data/auth/internalUser.json";
const authFilePathForExternalUser = "./data/auth/externalUser.json";

setup("Login to site as swisscows user", async ({accounts, app }) => {
  //Action
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton();
  await accounts.app.loginPage.waitUntilPageIsFullyLoaded();
  await accounts.app.loginPage.inputEmail(process.env.USERNAME_INTERNAL_USER);
  await accounts.app.loginPage.pressTab();
  await accounts.app.loginPage.inputPassword(
    process.env.PASSWORD_INTERNAL_USER
  );
  await accounts.app.loginPage.clickLoginButton();

  // Assert
  await app.home.header.logo.expectSwisscowsLogoToBeVisible();

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForInternalUser });
  removeRefreshToken(authFilePathForInternalUser);
  process.env.TOKEN_INTERNAL_USER = getBearerTokenOfInternalUser();
});

setup("Login to site as external user", async ({ accounts, app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton();
  await accounts.app.loginPage.waitUntilPageIsFullyLoaded();
  await accounts.app.loginPage.inputEmail(process.env.USERNAME_EXTERNAL_USER);
  await accounts.app.loginPage.pressTab();
  await accounts.app.loginPage.inputPassword(
    process.env.PASSWORD_EXTERNAL_USER
  );
  await accounts.app.loginPage.clickLoginButton();

  //Assert
  await app.home.header.logo.expectSwisscowsLogoToBeVisible();

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForExternalUser });
  removeRefreshToken(authFilePathForExternalUser);
  process.env.TOKEN_EXTERNAL_USER = getBearerTokenOfExternalUser();
});
