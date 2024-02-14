
import { test } from "../../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../../data/home/testData.json"))
);
test('Check that popup "firefox install" redirect to the corresponding page ', async ({
  home,
}) => {
  const externalPage = await home.installSwisscowsLink.clickExtensionPopupAndNavigateToWebStore();

  //Assert
  await home.expectHaveUrl( externalPage, new RegExp(testData.url.extensionFirefoxInstall));
  await home.expectHaveTitle(externalPage, /Swisscows/);
});

test("Check that popup firefox install Is Displayed", async ({ home }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";

  //Assert
  await home.installSwisscowsLink.expectExtensionPopupIsDisplayed();
  await home.installSwisscowsLink.expectTextExtensionPopup(
    expectedText
  );
});

test('Check that the "Install Swisscows Block" button redirect to corresponding URL.', async ({
  home
}) => {
  const externalPage = await home.extensionBlock.clickExtensionBlockAndNavigateToWebStore();

  //Assert
  await home.expectHaveUrl( externalPage, new RegExp(testData.url.extensionFirefoxInstall));
  await home.expectHaveTitle(externalPage, /Swisscows/);
});
