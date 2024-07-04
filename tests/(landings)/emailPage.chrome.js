import { test } from "../../utils/fixtures.js";
import testData from "../../data/lendings/email/testData.json"
import constantsData from "../../data/project-constants/testData.json"

test.skip("Check design of the Email page ", async ({ app }, testInfo) => {
  //Actions
  await app.emailPage.open();

  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo);
});

test.skip("Check design dark theme of the  Email page ", async ({
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
  test.skip(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
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
test.skip(`${testID} Check navigation to corresponding pages for ${buttonName} link`, async ({
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

test.skip("Check that buttons have hover effect on email page", async ({
  app,
}) => {
  //Actions
  await app.emailPage.open();

  // Assert
  await app.emailPage.expectColorsLinksWhenHovering(
    app.emailPage.introductionAndSupportButtons,
    "background",
    "rgb(191, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  );
});

