import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/whoweare-page/testData.json"))
);
test("Check design of the Who We Are page ", async ({ whoWeArePage },testInfo) => {
    //Actions
    await whoWeArePage.waitUntilPageIsFullyLoaded();
    //Assert
    await whoWeArePage.expectScreenWhoWeArePage(testInfo)
  });
  
  test("Check design dark theme of the   Who We Are page ", async ({
    whoWeArePage
  },testInfo) => {
    //Actions
    await whoWeArePage.waitUntilPageIsFullyLoaded();
    await whoWeArePage.headerStaticPages.clickHamburgerMenuButton();
    await whoWeArePage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await whoWeArePage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();
  
    //Assert
    await whoWeArePage.expectScreenWhoWeArePage(testInfo)
  });
