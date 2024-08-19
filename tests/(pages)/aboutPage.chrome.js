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

for (const {
  testID,
  link,
  name,
  expectedTitle,
} of testData.links) {
  test(`${testID} Check navigation to corresponding pages for  '${name}' link`, async ({
    app, context
  }) => {
    //Actions
    await app.aboutPage.open();

    //Assert
    await app.aboutPage.expectToBeOpenedNewPageAfterClickLinks({
      locator: name,
      expected: link,
    });
    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}
