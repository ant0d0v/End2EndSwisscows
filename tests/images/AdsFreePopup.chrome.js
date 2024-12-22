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
  await app.imagePage.open(`/images?query=${faker.word.sample()}&region=de-DE`)
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
  await app.imagePage.open(`/images?query=${faker.word.sample()}&region=de-DE`)
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsFreePopup.clickCloseButton();

  //Assert
  await app.imagePage.adsFreePopup.expectPopupToBeHidden();
});

test("Check show ads free popup is displayed again after 24 hours", async ({
  app,
}) => {
  //Actions
  await app.imagePage.open(`/images?query=${faker.word.sample()}&region=de-DE`)
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
