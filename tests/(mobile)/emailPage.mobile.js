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
  await emailPage.header.clickHamburgerMenuButton();
  await emailPage.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await emailPage.header.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await emailPage.expectScreenEmailPage(testInfo)
});

