import { test } from "../../utils/fixtures.js";
import testData from "../../data/lendings/vpn/testData.json";
import constantsData from "../../data/project-constants/testData.json";

test.skip("Check design of the VPN page ", async ({ app }, testInfo) => {
  //Actions
  await app.vpnPage.open();
  //Assert
  await app.vpnPage.expectScreenVpnPage(testInfo);
});

test.skip("Check design dark theme of the  VPN page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.vpnPage.open();
  await app.vpnPage.header.clickHamburgerMenuButton();
  await app.vpnPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.vpnPage.expectScreenVpnPage(testInfo);
});

for (const {
  testID,
  expectedLink,
  locatorId,
  expectedTitle,
} of testData.allLinks) {
  test.skip(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.vpnPage.open();

    //Assert
    await app.vpnPage.expectToBeOpenedNewPageAfterClick(
      app.vpnPage.allLinks(locatorId),
      expectedLink
    );
    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}
for (const {
  testID,
  expectedLink,
  locatorId,
  expectedTitle,
} of testData.allLinksInSecondQuestions) {
  test.skip(`${testID} Check navigation to corresponding pages for  '${locatorId}' link in Second question`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.vpnPage.open();
    await app.vpnPage.scrollDownToQuestions();
    await app.vpnPage.clickSecondQuestion();

    //Assert
    await app.vpnPage.expectToBeOpenedNewPageAfterClick(
      app.vpnPage.allLinksInSecondQuestions(locatorId),
      expectedLink
    );
    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}
test.skip("Check that all questions were opened on the VPN page.", async ({
  app,
}) => {
  //Action
  await app.vpnPage.open();
  await app.vpnPage.scrollDownToQuestions();
  await app.vpnPage.clickAllQuestions();

  //Assert
  await app.vpnPage.faq.expectQuestionsAreOpened();
});

test.skip("Check that a question and answer can be opened and closed on the VPN page.", async ({
  app,
}) => {
  //Action
  await app.vpnPage.open();
  await app.vpnPage.scrollDownToQuestions();
  await app.vpnPage.clickAllQuestions();
  await app.vpnPage.faq.expectQuestionsAreOpened();
  await app.vpnPage.clickAllQuestions();

  //Assert
  await app.vpnPage.faq.expectQuestionsAreClosed();
});

test.skip("Check download windows vpn extension file", async ({ app }) => {
  //Actions
  await app.vpnPage.open();
  const windowsExtension = await app.vpnPage.downloadVpnExtensionFile(
    app.vpnPage.windowsLink
  );

  //Assert
  await app.vpnPage.expectDownloadFileNameToBe(
    windowsExtension,
    "SwisscowsVPNInstaller.msi"
  );
  await app.vpnPage.expectFileSizeToBeGreaterThan(windowsExtension, 23000000);
  await windowsExtension.delete();
});

test.skip("Check download windows vpn extension file when clicking try now 3 day link", async ({
  app,
}) => {
  //Actions
  await app.vpnPage.open();
  const windowsExtension = await app.vpnPage.downloadVpnExtensionFile(
    app.vpnPage.tryNowThreeDayLink
  );

  //Assert
  await app.vpnPage.expectDownloadFileNameToBe(
    windowsExtension,
    "SwisscowsVPNInstaller.msi"
  );
  await app.vpnPage.expectFileSizeToBeGreaterThan(windowsExtension, 23000000);
  await windowsExtension.delete();
});

test.skip("Check that buttons have hover effect on vpn page", async ({
  app,
}) => {
  //Actions
  await app.vpnPage.open();

  // Assert
  await app.vpnPage.expectColorsLinksWhenHovering(
    app.vpnPage.allButtons,
    "background",
    "rgb(0, 93, 119) none repeat scroll 0% 0% / auto padding-box border-box"
  );
});
