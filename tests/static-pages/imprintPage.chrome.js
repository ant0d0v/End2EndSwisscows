import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/donation-page/testData.json"))
);


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
  await imprintPage.headerStaticPages.clickHamburgerMenuButton();
  await imprintPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await imprintPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await imprintPage.expectScreenImprintPage(testInfo)
});
