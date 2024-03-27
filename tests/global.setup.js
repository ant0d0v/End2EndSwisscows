import { test as setup, expect } from "@playwright/test";
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

setup("Login to site as swisscows user", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.locator("header button.hamburger-menu").click();
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByPlaceholder("Username or email").fill(process.env.USERNAME_INTERNAL_USER);
  await page.getByPlaceholder("Password").fill(process.env.PASSWORD_INTERNAL_USER);
  await page.getByRole("button", { name: "Login" }).click();

  // Wait until the page actually signs in.
  await expect(page.getByRole("img", { name: "Swisscows", exact: true })).toBeVisible();

  // Run the function to remove the specified element from the origins array
  await page.context().storageState({ path: authFilePathForInternalUser });
  removeRefreshToken(authFilePathForInternalUser);
});

setup("Login to site as external user", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.locator("header button.hamburger-menu").click();
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByPlaceholder("Username or email").fill(process.env.USERNAME_EXTERNAL_USER);
  await page.getByPlaceholder("Password").fill(process.env.PASSWORD_EXTERNAL_USER);
  await page.getByRole("button", { name: "Login" }).click();

  // Wait until the page actually signs in.
  await expect(page.getByRole("img", { name: "Swisscows", exact: true })).toBeVisible();

  // Run the function to remove the specified element from the origins array
  await page.context().storageState({ path: authFilePathForExternalUser });
  removeRefreshToken(authFilePathForExternalUser);
});
