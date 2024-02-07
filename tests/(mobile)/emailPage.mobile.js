import { test, expect } from "../../utils/fixturePages";


test("Check design of the Email page ", async ({ emailPage },testInfo) => {
  //Actions
  await emailPage.waitUntilPageIsFullyLoaded();
  //Assert
  await emailPage.expectScreenEmailPage(testInfo)
});

test("Check design dark theme of the  Email page ", async ({
  emailPage
},testInfo) => {
  //Actions
  await emailPage.waitUntilPageIsFullyLoaded();
  await emailPage.headerStaticPages.clickHamburgerMenuButton();
  await emailPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await emailPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await emailPage.expectScreenEmailPage(testInfo)
});

