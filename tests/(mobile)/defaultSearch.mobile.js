import { test, expect } from "../../utils/fixturePages";

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
