import { test, expect } from "../../utils/fixtures";


test("Check design of the Email page ", async ({ app },testInfo) => {
  //Actions
  await app.emailPage.open()
  await app.emailPage.waitUntilPageIsFullyLoaded();
  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo)
});

test("Check design dark theme of the  Email page ", async ({
  app
},testInfo) => {
  //Actions
  await app.emailPage.open()
  await app.emailPage.waitUntilPageIsFullyLoaded();
  await app.emailPage.header.clickHamburgerMenuButton();
  await app.emailPage.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await app.emailPage.header.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo)
});

