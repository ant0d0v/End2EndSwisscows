import { test } from "../../utils/fixtures.js";
import testData from "../../data/pages/social-projects/testData.json";

test("Check that border is red and 2px when clicking on the Charity Haiti slider images", async ({
  app,
}) => {
  //Assert
  await app.charityPage.open();
  await app.charityPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    app.charityPage.imagesGallery.charityHaitiGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that border is red and 2px when clicking on the Charity Columbia slider images", async ({
  app,
}) => {
  //Assert
  await app.charityPage.open();
  await app.charityPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    app.charityPage.imagesGallery.charityColumbiaGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  app,
}) => {
  //Assert
  await app.charityPage.open();
  await app.charityPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInHaitiGallery(
    "active"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Columbia slider", async ({
  app,
}) => {
  //Assert
  await app.charityPage.open();
  await app.charityPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInColumbiaGallery(
    "active"
  );
});

test("Check that the video is playing", async ({ app }) => {
  //Action
  await app.charityPage.open();

  //Assert
  await app.charityPage.videoPlayer.expectVideoToPlay();
});

for (const {
  testID,
  expectedLink,
  locatorId,
  expectedTitle,
} of testData.charityLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} link`, async ({
    app,
  }) => {
    //Actions
    await app.charityPage.open();
    const currentPage = await app.charityPage.clickLinkOnThePage(locatorId);

    //Assert
    await app.expectPageToHaveUrl(currentPage, expectedLink);
    await app.expectHaveTitle(currentPage, expectedTitle);
  });
}
test("Check design of the charity page ", async ({ app }, testInfo) => {
  //Actions
  await app.charityPage.open();

  //Assert
  await app.charityPage.expectMapsToBeVisible();
  await app.charityPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the charity page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.charityPage.open();
  await app.charityPage.expectMapsToBeVisible();
  await app.charityPage.header.clickHamburgerMenuButton();
  await app.charityPage.header.hamburgerMenu.clickThemeDropdown();
  await app.charityPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.charityPage.takeSnapshot(testInfo);
});
