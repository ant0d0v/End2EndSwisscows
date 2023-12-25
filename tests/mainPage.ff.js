// @ts-check
const { test, expect } = require("../utils/fixturePages");

const testData = JSON.parse(
  JSON.stringify(require("../data/main-page/testData.json"))
);
test('Check that popup "firefox install" redirect to the corresponding page ', async ({
  mainPage,
}) => {
  const externalPage = await mainPage.clickPopupInstallSwisscowsBlockAndNavigateToWebStore();

  //Assert
  await mainPage.expectHaveUrl( externalPage, new RegExp(testData.url.extensionFirefoxInstall));
  await mainPage.expectHaveTitle(externalPage, /Swisscows/);
});

test("Check that popup firefox install Is Dysplaed", async ({ mainPage }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";

  //Assert
  await mainPage.expectPopupInstallSwisscowsLinkIsDisplayed();
  await mainPage.expectTextOfPopupInstallSwisscowsLink(expectedText);
});

test('Check that the "Install Swisscows Block" button redirect to coresponding URL.', async ({
  mainPage
}) => {
  const externalPage = await mainPage.clickInstallSwisscowsBlockAndNavigateToWebStore();

  //Assert
  await mainPage.expectHaveUrl( externalPage, new RegExp(testData.url.extensionFirefoxInstall));
  await mainPage.expectHaveTitle(externalPage, /Swisscows/);
});
