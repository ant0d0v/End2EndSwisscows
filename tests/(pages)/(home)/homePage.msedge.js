import { test } from "../../../utils/fixtures.js";
import testData from "../../../data/home/testData.json"

test('Check that popup "Edge install" redirect to the corresponding page', async ({
  app,
  context,
}) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.expectToBeOpenedNewPageAfterClick(
    app.home.installSwisscowsLink.extensionPopup,
    testData.url.extensionEdgeInstall
  );
  await app.expectNewPageToHaveTitle(context, /Swisscows/);
});

test("Check that popup Edge install Is Displayed", async ({ app }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";
  //Actions
  await app.home.open();

  //Assert
  await app.home.installSwisscowsLink.expectExtensionPopupIsDisplayed();
  await app.home.installSwisscowsLink.expectTextExtensionPopup(expectedText);
});

test('Check that the "Install Swisscows Block" button redirect to corresponding URL.', async ({
  app,
  context,
}) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.expectToBeOpenedNewPageAfterClick(
    app.home.extensionBlock.extensionLink,
    testData.url.extensionEdgeInstall
  );
  await app.expectNewPageToHaveTitle(context, /Swisscows/);
});
