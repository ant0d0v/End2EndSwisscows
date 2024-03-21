import { test, expect } from "../../utils/fixturePages";

test("Check design of the Imprint page ", async ({ imprintPage },testInfo) => {
  //Actions
  await imprintPage.waitUntilPageIsFullyLoaded();
  //Assert
  await imprintPage.expectScreenImprintPage(testInfo)
});

test("Check design dark theme of the  Imprint page ", async ({
  imprintPage
},testInfo) => {
  //Actions
  await imprintPage.waitUntilPageIsFullyLoaded();
  await imprintPage.header.clickHamburgerMenuButton();
  await imprintPage.header.hamburgerMenu.clickThemeDropdown();
  await imprintPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await imprintPage.expectScreenImprintPage(testInfo)
});
