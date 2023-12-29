const { test, expect } = require("../utils/fixturePages");
const testData = JSON.parse(
  JSON.stringify(require("../data/education-page/testData.json"))
);

test("Check that the video is playing", async ({ educationPage }) => {
  //Assert
  await educationPage.staticVideoPlayer.expectYouTubeVideoToPlay();
});

for (const { testID, pdfLink, locatorId } of testData.educationPdfLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} pdf link and validate pdf`, async ({
    educationPage,
  }) => {
    //Actions
    const currentPage = await educationPage.clickPdfLinkOnThePage(locatorId);
    
    //Assert
    await educationPage.expectHaveUrl(currentPage, pdfLink);
    await educationPage.expectValidatePdfFile(currentPage, pdfLink);
  });
}
test("Check design of the Education page ", async ({ educationPage }) => {
  //Assert
  await educationPage.expectScreenEducationPage();
});

test("Check color of flyer button when hovering ", async ({ educationPage }) => {
  //Assert
  await educationPage.expectColorLinkWhenHovering(educationPage.flyerButton, "background", /rgb\(191, 0, 0\)/);
});

test("Check design dark theme of the Education page ", async ({
  educationPage,
  headerStaticPages,
  hamburgerMenu,
}) => {
  //Actions
  await educationPage.waitUntilPageIsFullyLoaded();
  await headerStaticPages.clickHamburgerMenuButton();
  await hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await educationPage.expectScreenEducationPage();
});
