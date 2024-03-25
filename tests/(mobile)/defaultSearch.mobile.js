import { test, expect } from "../../utils/fixturePages";

test("Check design of the default search page ", async ({ app },testInfo) => {
    //Actions
    await app.defaultSearchPage.open()
    await app.defaultSearchPage.waitUntilPageIsFullyLoaded();
    //Assert
    await app.defaultSearchPage.expectDefaultSearchPage(testInfo)
  });
  
  test("Check design dark theme of the default search page ", async ({
    app
  },testInfo) => {
    //Actions
    await app.defaultSearchPage.open()
    await app.defaultSearchPage.waitUntilPageIsFullyLoaded();
    await app.defaultSearchPage.header.clickHamburgerMenuButton();
    await app.defaultSearchPage.header.hamburgerMenu.clickThemeDropdown();
    await app.defaultSearchPage.header.hamburgerMenu.clickDarkTheme();
  
    //Assert
    await app.defaultSearchPage.expectDefaultSearchPage(testInfo)
  });
