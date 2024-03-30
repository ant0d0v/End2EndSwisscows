import { test as setup } from "../utils/fixtures";
import fs from "fs";
const authFilePathForInternalUser = "./data/auth/internalUser.json";
const authFilePathForExternalUser = "./data/auth/externalUser.json";

const removeRefreshToken = (authFilePath) => {
  const authFileContent = fs.readFileSync(authFilePath, "utf-8");
  let authData = JSON.parse(authFileContent);

  authData.origins.forEach((origin) => {
    origin.localStorage = origin.localStorage.filter(
      (item) => item.name !== "oidc.refresh_token"
    );
  });
  fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2));
};

setup("Login to site as swisscows user", async ({ app }) => {
  //Action
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton()
  await app.signInPage.inputEmail(process.env.USERNAME_INTERNAL_USER)
  await app.signInPage.inputPassword(process.env.PASSWORD_INTERNAL_USER)
  await app.signInPage.clickLoginButton()
  
  // Assert
  await app.home.expectSwisscowsLogoToBeVisible()

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForInternalUser });
  removeRefreshToken(authFilePathForInternalUser);
});

setup("Login to site as external user", async ({ app }) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLoginButton()
  await app.signInPage.inputEmail(process.env.USERNAME_EXTERNAL_USER)
  await app.signInPage.inputPassword(process.env.PASSWORD_EXTERNAL_USER)
  await app.signInPage.clickLoginButton()

  //Assert
  await app.home.expectSwisscowsLogoToBeVisible()

  // Run the function to remove the specified element from the origins array
  await app.page.context().storageState({ path: authFilePathForExternalUser });
  removeRefreshToken(authFilePathForExternalUser);
});
