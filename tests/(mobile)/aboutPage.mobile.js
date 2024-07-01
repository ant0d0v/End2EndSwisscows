import { test } from "../../utils/fixtures.js";
test("Check design of the About Page page ", async ({ app }, testInfo) => {
  //Actions
  await app.aboutPage.open();

  //Assert
  await app.aboutPage.expectScreenAboutPage(testInfo);
});

test("Check design dark theme of the   About Page page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.aboutPage.open();
  await app.aboutPage.header.clickHamburgerMenuButton();
  await app.aboutPage.header.hamburgerMenu.clickThemeDropdown();
  await app.aboutPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.aboutPage.expectScreenAboutPage(testInfo);
});
