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
    await aboutPage.headerStaticPages.clickHamburgerMenuButton();
    await aboutPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await aboutPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();
  
    //Assert
    await aboutPage.expectScreenAboutPage(testInfo)
  });
