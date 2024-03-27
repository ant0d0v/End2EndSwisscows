import { test, expect } from "../../utils/fixtures";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/about/testData.json"))
);
test("Check design of the About page ", async ({ app },testInfo) => {
    //Actions
    await app.aboutPage.open()
    await app.aboutPage.waitUntilPageIsFullyLoaded();
    //Assert
    await app.aboutPage.expectScreenAboutPage(testInfo)
  });
  
  test("Check design dark theme of the   About page", async ({
    app
  },testInfo) => {
    //Actions
    await app.aboutPage.open()
    await app.aboutPage.waitUntilPageIsFullyLoaded();
    await app.aboutPage.header.clickHamburgerMenuButton();
    await app.aboutPage.header.hamburgerMenu.clickThemeDropdown();
    await app.aboutPage.header.hamburgerMenu.clickDarkTheme();
  
    //Assert
    await app.aboutPage.expectScreenAboutPage(testInfo)
  });

  for (const { testID, expectedLink, locatorId, expectedTitle,} of testData.allLinks) {
    test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
        app
    }) => {
      //Actions
      await app.aboutPage.open()
      await app.aboutPage.clickAllLinks(locatorId);
  
      //Assert
      await app.aboutPage.expectHaveUrl(app.page, new RegExp(expectedLink));
      await app.aboutPage.expectHaveTitle(app.page ,expectedTitle);
    });
  }