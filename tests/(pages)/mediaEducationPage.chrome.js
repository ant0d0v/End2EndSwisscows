import { test } from "../../utils/fixtures";
const testData = JSON.parse(
  JSON.stringify(
    require("../../data/pages/media-education/testData.json")
  )
);
test.use({ headless: false });

test("Check that the video is playing", async ({ app }) => {
  //Actions
  await app.mediaEducationPage.open()
  //Assert
  await app.mediaEducationPage.videoPlayer.expectYouTubeVideoToPlay();
});

for (const { testID, pdfLink, locatorId } of testData.educationPdfLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} pdf link and validate pdf`, async ({
    app
  },testInfo) => {
   //Actions
   await app.mediaEducationPage.open()
    const currentPage = await app.mediaEducationPage.clickPdfLinkOnThePage(locatorId);
    
   //Assert
    await app.mediaEducationPage.expectHaveUrl(currentPage, pdfLink);
    await app.mediaEducationPage.expectValidatePdfFile(currentPage, pdfLink,testInfo);
  });
}


test("Check design of the Education page ", async ({ app },testInfo) => {
  //Actions
  await app.mediaEducationPage.open()
  //Assert
  await app.mediaEducationPage.expectScreenMediaEducationPage(testInfo);
});

test("Check color of flyer button when hovering ", async ({ app }) => {
  //Actions
  await app.mediaEducationPage.open()
  //Assert
  await app.mediaEducationPage.expectColorLinkWhenHovering(app.mediaEducationPage.flyerButton, "background", /rgb\(191, 0, 0\)/);
});

test("Check design dark theme of the Education page ", async ({
  app
},testInfo) => {
  //Actions
  await app.mediaEducationPage.open()
  await app.mediaEducationPage.header.clickHamburgerMenuButton();
  await app.mediaEducationPage.header.hamburgerMenu.clickThemeDropdown();
  await app.mediaEducationPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.mediaEducationPage.expectScreenMediaEducationPage(testInfo);
});
