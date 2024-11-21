import { test } from "../../utils/fixtures.js";

test("Check that border is red and 2px when clicking on the Charity Haiti slider images", async ({
  app,
}) => {
  //Actions
  await app.charityPage.open();
  //Assert
  await app.charityPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    app.charityPage.imagesGallery.charityHaitiGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that border is red and 2px when clicking on the Charity Columbia slider images", async ({
  app,
}) => {
  //Actions
  await app.charityPage.open();
  //Assert
  await app.charityPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    app.charityPage.imagesGallery.charityColumbiaGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check the swipe to left in  Charity Columbia slider ", async ({
  app,
}) => {
  //Actions
  await app.charityPage.open();
  await app.charityPage.expectMapsToBeVisible();
  await app.charityPage.imagesGallery.swipeLeftColumbiaSlider();

  //Assert
  await app.charityPage.imagesGallery.expectAttributeClassOfLastSmallImageCharityColumbiaGallery(
    "visible"
  );
});

test("Check the swipe to left in Charity Haiti slider ", async ({ app }) => {
  //Actions
  await app.charityPage.open();
  await app.charityPage.expectMapsToBeVisible();
  await app.charityPage.imagesGallery.swipeLeftCharitySlider();

  //Assert
  await app.charityPage.imagesGallery.expectAttributeClassOfLastSmallImageCharityHaitiGallery(
    "visible"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  app,
}) => {
  //Actions
  await app.charityPage.open();
  //Assert
  await app.charityPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInHaitiGallery(
    "active"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Columbia slider", async ({
  app,
}) => {
  //Actions
  await app.charityPage.open();
  //Assert
  await app.charityPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInColumbiaGallery(
    "active"
  );
});
test.use({ channel: 'chrome' });
test.only("Check that the video is playing", async ({ app }) => {
  //Actions
  await app.charityPage.open();
  //Assert
  await app.charityPage.videoPlayer.expectVideoToPlay();
});

test(`Check navigation to corresponding page when cliking keyshift link`, async ({
  app,
  context,
}) => {
  //Actions
  await app.charityPage.open();

  //Assert
  await app.charityPage.expectToBeOpenedPageAfterClickKeyshiftLink(
    "https://keyshift.com/en/donation"
  );
  await app.expectNewPageToHaveTitle(
    context,
    "KeyShift – to transform people and lives."
  );
});

test("Check design of the charity page ", async ({ app }, testInfo) => {
  //Actions
  await app.charityPage.open();
  
  //Assert
  await app.charityPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the charity page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.charityPage.open();
  await app.charityPage.header.clickHamburgerMenuButton();
  await app.charityPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.charityPage.takeSnapshot(testInfo);
});
