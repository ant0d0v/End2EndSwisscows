import { test, expect } from "../../utils/fixturePages";

test("Check design of the About Page page ", async ({ aboutPage },testInfo) => {
    //Actions
    await aboutPage.waitUntilPageIsFullyLoaded();
    //Assert
    await aboutPage.expectScreenAboutPage(testInfo)
  });
  
  test("Check design dark theme of the   About Page page ", async ({
    aboutPage
  },testInfo) => {
    //Actions
    await aboutPage.waitUntilPageIsFullyLoaded();
    await aboutPage.header.clickHamburgerMenuButton();
    await aboutPage.header.hamburgerMenu.clickThemeDropdown();
    await aboutPage.header.hamburgerMenu.clickDarkTheme();
  
    //Assert
    await aboutPage.expectScreenAboutPage(testInfo)
  });
