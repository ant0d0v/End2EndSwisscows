import { test } from "../../utils/fixtures.js";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  saveStorageState,
  getStorageKey,
  setValueStorageKey,
} from "../../helpers/authHelper.js";

test("Check that ads free popup to equal false in storage when close popup", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.adsFreePopup.clickCloseButton();
  await saveStorageState(app.page);

  //Assert
  expect(await getStorageKey("showAdsFreePopup")).toEqual("false");
});

test("Check that ads free popup is hidden when close popup", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.adsFreePopup.clickCloseButton();

  //Assert
  await app.webPage.adsFreePopup.expectPopupToBeHidden();
});

test("Check show ads free popup is displayed again after 24 hours", async ({
  app,
}) => {
  //Actions
  await app.webPage.open(`/web?query=${faker.word.sample()}`)
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.adsFreePopup.clickCloseButton();
  await saveStorageState(app.page);
  await setValueStorageKey("lastClosedAdsFreePopup"); // set value - 24 hours
  const value = await getStorageKey("lastClosedAdsFreePopup"); // get new value
  await app.page.evaluate(
    (value) => localStorage.setItem("lastClosedAdsFreePopup", value),
    value
  ); // set to local storage
  await app.webPage.reloadPage();

  //Assert
  await app.webPage.adsFreePopup.expectPopupToBeVisible();
});

test("Check design ads free popup", async ({ app }, testInfo) => {
  //Actions
  await app.webPage.open(`/web?query=${faker.word.sample()}`)
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.adsFreePopup.takeSnapshot(testInfo);
});

test("Check open subscription page and close popup when clicking Start button", async ({
  app,
}) => {
  //Actions
  await app.webPage.open(`/web?query=${faker.word.sample()}`)
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  const newPage = await app.webPage.adsFreePopup.getNewPageAfterClickStartButton();
  await saveStorageState(app.page);

  //Assert
  expect(await getStorageKey("showAdsFreePopup")).toEqual("false");
  await app.expectPageToHaveUrl(
    newPage,
    "https://accounts.dev.swisscows.com/products/premium"
  );
});

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test("Check that ads free popup is hidden if user with ads-free subscription", async ({
    app,
    accounts,
  }) => {
    //Actions
    await app.webPage.open(`/web?query=${faker.word.sample()}`)
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.header.clickHamburgerMenuButton();
    await app.webPage.header.hamburgerMenu.clickLoginButton();
    await accounts.app.loginPage.waitImageIsLoaded()
    await accounts.app.loginPage.form.fill({
      emailField: process.env.USERNAME_PREMIUM_USER,
      passwordField: process.env.PASSWORD_PREMIUM_USER,
    });
    await accounts.app.loginPage.form.clickLoginButton();
    await app.webPage.header.navigation.clickImageTab();
    await app.imagePage.item.expectImageItemsToBeVisible();

    //Assert
    await app.imagePage.adsFreePopup.expectPopupToBeHidden();
  });
});
