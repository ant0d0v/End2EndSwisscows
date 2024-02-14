import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/default-search/testData.json"))
);
test("Check design of the default search page ", async ({ defaultSearchPage },testInfo) => {
    //Actions
    await defaultSearchPage.waitUntilPageIsFullyLoaded();
    //Assert
    await defaultSearchPage.expectDefaultSearchPage(testInfo)
  });
  
  test("Check design dark theme of the default search page ", async ({
    defaultSearchPage
  },testInfo) => {
    //Actions
    await defaultSearchPage.waitUntilPageIsFullyLoaded();
    await defaultSearchPage.headerStaticPages.clickHamburgerMenuButton();
    await defaultSearchPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await defaultSearchPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();
  
    //Assert
    await defaultSearchPage.expectDefaultSearchPage(testInfo)
  });

  for (const { testID, expectedLink, locatorId, locatorName, expectedTitle,} of testData.allLinks) {
    test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
      defaultSearchPage
    }) => {
      //Actions
      
      const currentPage = await defaultSearchPage.clickAllLinksAndNavigateToNewPage(locatorId, locatorName,);
  
      //Assert
      await defaultSearchPage.expectHaveUrl(currentPage, new RegExp(expectedLink));
      await defaultSearchPage.expectHaveTitle(currentPage ,expectedTitle);
    });
  }