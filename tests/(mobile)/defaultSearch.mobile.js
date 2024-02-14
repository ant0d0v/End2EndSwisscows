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
    await defaultSearchPage.header.clickHamburgerMenuButton();
    await defaultSearchPage.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await defaultSearchPage.header.hamburgerMenu.clickDarkInHamburgerMenu();
  
    //Assert
    await defaultSearchPage.expectDefaultSearchPage(testInfo)
  });
