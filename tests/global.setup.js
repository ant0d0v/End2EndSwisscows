import { test as setup } from "../utils/fixtures.js";
import { 
  getBearerTokenOfInternalUser, 
  getBearerTokenOfExternalUser, 
  removeRefreshToken  
} from "../helpers/authHelper.js"

const authFilePathForInternalUser = "./data/auth/internalUser.json";
const authFilePathForExternalUser = "./data/auth/externalUser.json";

setup("Login to site as swisscows user", async ({ app }) => {
  //Action
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton()
  await app.signInPage.expectMainImageToBeVisible()
  await app.signInPage.inputEmail(process.env.USERNAME_INTERNAL_USER);
  await app.signInPage.pressTab()
  await app.signInPage.inputPassword(process.env.PASSWORD_INTERNAL_USER);
  await app.signInPage.clickLoginButton()
  
  // Assert
  await app.home.header.expectSwisscowsLogoToBeVisible()

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForInternalUser });
  removeRefreshToken(authFilePathForInternalUser);
  process.env.TOKEN_INTERNAL_USER = getBearerTokenOfInternalUser();
});

setup("Login to site as external user", async ({ app }) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton()
  await app.signInPage.expectMainImageToBeVisible();
  await app.signInPage.inputEmail(process.env.USERNAME_EXTERNAL_USER);
  await app.signInPage.pressTab();
  await app.signInPage.inputPassword(process.env.PASSWORD_EXTERNAL_USER);
  await app.signInPage.clickLoginButton()

  //Assert
  await app.home.header.expectSwisscowsLogoToBeVisible()

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForExternalUser });
  removeRefreshToken(authFilePathForExternalUser);
  process.env.TOKEN_EXTERNAL_USER =  getBearerTokenOfExternalUser();
});
