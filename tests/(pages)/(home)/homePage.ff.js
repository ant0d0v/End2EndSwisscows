import { test } from "../../../utils/fixtures.js";
import testData from "../../../data/home/testData.json";

test('Check that popup "firefox install" redirect to the corresponding page ', async ({
  app,
  context,
}) => {
  //Actions
  await app.home.open();

  //Assert
  await await app.home.extensionPopup.expectToBeOpenedPageAfterClickPopup(
    testData.url.extensionFirefoxInstall
  );
  await app.expectNewPageToHaveTitle(context, /Swisscows/);
});

test("Check that popup firefox install Is Displayed", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.extensionPopup.takeSnapshot(testInfo);
});