import { test } from "../../utils/fixtures.js";
import testData from "../../data/pages/media-education/testData.json";

test.use({ headless: false });
test("Check that the video is playing", async ({ app }) => {
  //Actions
  await app.mediaEducationPage.open();

  //Assert
  await app.mediaEducationPage.videoPlayer.expectYouTubeVideoToPlay();
});

for (const { testID, link, name} of testData.pdfLinks) {
  test(`${testID} Check navigation to corresponding page for  ${name} pdf link and validate pdf`, async ({
    app,
  }, testInfo) => {
    //Actions
    await app.mediaEducationPage.open();
    const url = await app.mediaEducationPage.clickPdfLinkOnThePage(name);

    //Assert
    await app.expectPageToHaveUrl(url, link);
    await app.mediaEducationPage.expectValidatePdfFile(
      {
        currentUrl: url,
        pdfUrl: link,
      },
      testInfo
    );
  });
}

  for (const { testID, link, name, title } of testData.links) {
    test(`${testID} Check navigation to corresponding page for  ${name} link`, async ({
      app, context
    }) => {
      //Actions
      await app.mediaEducationPage.open();
   
      //Assert
      await app.mediaEducationPage.expectToBeOpenedNewPageAfterClickLinks({
        locator: name,
        expected: link,
      });
      await app.expectNewPageToHaveTitle(context, title);
    });
  }

  test("Check design of the Education page ", async ({ app }, testInfo) => {
    //Actions
    await app.mediaEducationPage.open();
    //Assert
    await app.mediaEducationPage.takeSnapshot(testInfo);
  });

  test("Check color of flyer button when hovering ", async ({ app }) => {
    //Actions
    await app.mediaEducationPage.open();

    //Assert
    await app.mediaEducationPage.expectColorWhenHoveringOnPdfButton(/rgb\(191, 0, 0\)/);
  });

  test("Check design dark theme of the Education page ", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.mediaEducationPage.open();
    await app.mediaEducationPage.header.clickHamburgerMenuButton();
    await app.mediaEducationPage.header.hamburgerMenu.clickThemeDropdown();
    await app.mediaEducationPage.header.hamburgerMenu.clickDarkTheme();

    //Assert
    await app.mediaEducationPage.takeSnapshot(testInfo);
  });
