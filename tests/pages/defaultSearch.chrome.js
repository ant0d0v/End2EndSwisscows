import { test } from "../../utils/fixtures.js";
import testData from "../../data/pages/default-search/testData.json";

test("Check design of the default search page ", async ({ app }, testInfo) => {
  //Actions
  await app.defaultSearchPage.open();
  //Assert
  await app.defaultSearchPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the default search page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.defaultSearchPage.open();
  await app.defaultSearchPage.header.clickHamburgerMenuButton();
  await app.defaultSearchPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.defaultSearchPage.takeSnapshot(testInfo);
});

for (const {
  testID,
  expectedLink,
  locatorId,
  locatorName,
  expectedTitle,
} of testData.allLinks) {
  test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
    app,
  }) => {
    //Actions
    await app.defaultSearchPage.open();
    const currentPage =
      await app.defaultSearchPage.clickAllLinksAndNavigateToNewPage(
        locatorId,
        locatorName
      );

    //Assert
    await app.expectPageToHaveUrl(currentPage, new RegExp(expectedLink));
    await app.expectHaveTitle(currentPage, expectedTitle);
  });
}
