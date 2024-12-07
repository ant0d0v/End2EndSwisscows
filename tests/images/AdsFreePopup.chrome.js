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
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsFreePopup.clickCloseButton();
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
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsFreePopup.clickCloseButton();

  //Assert
  await app.imagePage.adsFreePopup.expectPopupToBeHidden();
});

test("Check show ads free popup is displayed again after 24 hours", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsFreePopup.clickCloseButton();
  await saveStorageState(app.page);
  await setValueStorageKey("lastClosedAdsFreePopup"); // set value - 24 hours
  const value = await getStorageKey("lastClosedAdsFreePopup"); // get new value
  await app.page.evaluate(
    (value) => localStorage.setItem("lastClosedAdsFreePopup", value),
    value
  ); // set to local storage
  await app.imagePage.reloadPage();

  //Assert
  await app.imagePage.adsFreePopup.expectPopupToBeVisible();
});
