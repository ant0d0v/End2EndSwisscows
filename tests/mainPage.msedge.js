import { test, expect } from "../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../data/main-page/testData.json"))
);

test('Check that popup "Edge install" redirect to the corresponding page', async ({
  mainPage
}) => {
 const externalPage = await mainPage.installSwisscowsLink.clickExtensionPopupAndNavigateToWebStore();

  //Assert
  await mainPage.expectHaveUrl( externalPage, new RegExp(testData.url.extensionEdgeInstall));
  await mainPage.expectHaveTitle(externalPage, /Swisscows/);
});

test("Check that popup Edge install Is Displayed", async ({ mainPage }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";

  //Assert
  await mainPage.installSwisscowsLink.expectExtensionPopupIsDisplayed();
  await mainPage.installSwisscowsLink.expectTextExtensionPopup(expectedText);
});

test('Check that the "Install Swisscows Block" button redirect to corresponding URL.', async ({
  mainPage
}) => {
  const externalPage = await mainPage.extensionBlock.clickExtensionBlockAndNavigateToWebStore();

  //Assert
  await mainPage.expectHaveUrl( externalPage, new RegExp(testData.url.extensionEdgeInstall));
  await mainPage.expectHaveTitle(externalPage, /Swisscows/);
});
