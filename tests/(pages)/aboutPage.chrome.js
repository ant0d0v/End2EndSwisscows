import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/about/testData.json"))
);
test("Check design of the About page ", async ({ aboutPage },testInfo) => {
    //Actions
    await aboutPage.waitUntilPageIsFullyLoaded();
    //Assert
    await aboutPage.expectScreenAboutPage(testInfo)
  });
  
  test("Check design dark theme of the   About page", async ({
    aboutPage
  },testInfo) => {
    //Actions
    await aboutPage.waitUntilPageIsFullyLoaded();
    await aboutPage.header.clickHamburgerMenuButton();
    await aboutPage.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await aboutPage.header.hamburgerMenu.clickDarkInHamburgerMenu();
  
    //Assert
    await aboutPage.expectScreenAboutPage(testInfo)
  });

  for (const { testID, expectedLink, locatorId, expectedTitle,} of testData.allLinks) {
    test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
        aboutPage,
        page
    }) => {
      //Actions
      await aboutPage.clickAllLinks(locatorId);
  
      //Assert
      await aboutPage.expectHaveUrl(page, new RegExp(expectedLink));
      await aboutPage.expectHaveTitle(page ,expectedTitle);
    });
  }