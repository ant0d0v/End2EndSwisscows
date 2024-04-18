import { test, expect } from "../../utils/fixtures";

test("Check design of the Imprint page ", async ({ app },testInfo) => {
  //Actions
  await app.imprintPage.open()

  //Assert
  await app.imprintPage.expectScreenImprintPage(testInfo)
});

test("Check design dark theme of the  Imprint page ", async ({
  app
},testInfo) => {
  //Actions
  await app.imprintPage.open()
  await app.imprintPage.header.clickHamburgerMenuButton();
  await app.imprintPage.header.hamburgerMenu.clickThemeDropdown();
  await app.imprintPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.imprintPage.expectScreenImprintPage(testInfo)
});
