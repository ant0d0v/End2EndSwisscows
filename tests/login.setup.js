import { test as setup, expect } from "@playwright/test";
import fs from "fs";
const authFilePath = "./data/auth/user.json";

const removeRefreshToken = () => {
  const authFileContent = fs.readFileSync(authFilePath, "utf-8");
  let authData = JSON.parse(authFileContent);

  authData.origins.forEach((origin) => {
    origin.localStorage = origin.localStorage.filter(
      (item) => item.name !== "oidc.refresh_token"
    );
  });
  fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2));
};

setup("Login to site", async ({ page }) => {
  await page.goto(process.env.WEB_URL);
  await page.locator("header button.hamburger-menu").click();
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByPlaceholder("Username or email").fill(process.env.USERNAME);
  await page.getByPlaceholder("Password").fill(process.env.PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  // Wait until the page actually signs in.
  await expect(page.getByRole("img", { name: "Swisscows", exact: true })).toBeVisible();

  // Run the function to remove the specified element from the origins array
  await page.context().storageState({ path: authFilePath });
  removeRefreshToken();
});
