import { test } from "../../utils/fixtures.js";
const testData = JSON.parse(
  JSON.stringify(require("../../data/lendings/email/testData.json"))
);
const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
);
test("Check design of the Email page ", async ({ app }, testInfo) => {
  //Actions
  await app.emailPage.open();

  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo);
});

test("Check design dark theme of the  Email page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.emailPage.open();
  await app.emailPage.header.clickHamburgerMenuButton();
  await app.emailPage.header.hamburgerMenu.clickThemeDropdown();
  await app.emailPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo);
});

for (const {
  testID,
  expectedUrl,
  locatorId,
  expectedTitle,
} of testData.introductionAndSupportLinks) {
  test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.emailPage.open();

    //Assert
    await app.emailPage.expectToBeOpenedNewPageAfterClick(
      app.emailPage.introductionAndSupportLinks(locatorId),
      expectedUrl
    );

    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}

for (const {
  testID,
  expectedUrl,
  locatorId,
  buttonName,
  expectedTitle,
} of testData.subscriptionLinks) {
  test(`${testID} Check navigation to corresponding pages for ${buttonName} link`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.emailPage.open();

    //Assert
    await app.emailPage.expectToBeOpenedNewPageAfterClick(
      app.emailPage.subscriptionLinks(locatorId, buttonName),
      expectedUrl
    );

    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}

test("Check that buttons have hover effect on email page", async ({ app }) => {
  //Actions
  await app.emailPage.open();

  // Assert
  await app.emailPage.expectColorsLinksWhenHovering(
    app.emailPage.introductionAndSupportButtons,
    "background",
    "rgb(191, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  );
});

test("Clicking on the swisscows's logo on email page leads to the home page.", async ({
  app,
}) => {
  //Actions
  await app.emailPage.open();
  await app.emailPage.header.clickSwisscowsEmailLogo();

  //Assert
  await app.expectHaveUrl(app.page, constantsData.URL_MAIN_PAGE);
  await app.expectHaveTitle(app.page, constantsData.TITLE_MAIN_PAGE);
});
