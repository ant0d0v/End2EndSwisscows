import { test } from "../../utils/fixtures.js";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/default-search/testData.json"))
);
test("Check design of the default search page ", async ({ app }, testInfo) => {
  //Actions
  await app.defaultSearchPage.open();
  //Assert
  await app.defaultSearchPage.expectDefaultSearchPage(testInfo);
});

test("Check design dark theme of the default search page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.defaultSearchPage.open();
  await app.defaultSearchPage.header.clickHamburgerMenuButton();
  await app.defaultSearchPage.header.hamburgerMenu.clickThemeDropdown();
  await app.defaultSearchPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.defaultSearchPage.expectDefaultSearchPage(testInfo);
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
    await app.expectHaveUrl(currentPage, new RegExp(expectedLink));
    await app.expectHaveTitle(currentPage, expectedTitle);
  });
}
