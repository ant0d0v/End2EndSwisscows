import { test } from "../../utils/fixtures.js";
import testData from "../../data/pages/about/testData.json";

test("Check design of the About page ", async ({ app }, testInfo) => {
  //Actions
  await app.aboutPage.open();

  //Assert
  await app.aboutPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the   About page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.aboutPage.open();
  await app.aboutPage.header.clickHamburgerMenuButton();
  await app.aboutPage.header.hamburgerMenu.clickThemeDropdown();
  await app.aboutPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.aboutPage.takeSnapshot(testInfo);
});

for (const { testID, expectedLink, locatorId, expectedTitle } of testData.allLinks) {
  test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
    app,
  }) => {
    //Actions
    await app.aboutPage.open();
    await app.aboutPage.clickAllLinks(locatorId);

    //Assert
    await app.expectHaveUrl(app.page, new RegExp(expectedLink));
    await app.expectHaveTitle(app.page, expectedTitle);
  });
}
