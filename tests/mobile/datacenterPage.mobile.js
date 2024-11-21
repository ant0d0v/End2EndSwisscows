import { test } from "../../utils/fixtures.js";

test.only("Check that border is red and 2px when clicking on the images Datacenter slider", async ({
  app,
}) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    app.datacenterPage.imagesGallery.dataCenterGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test.only("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  app,
}) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInDatacenterGallery(
    "active"
  );
});
test.use({ channel: 'chrome' });
test.only("Check that the video is playing", async ({ app }) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.videoPlayer.expectVideoToPlay();
});

test.only("Check design of the Datacenter page", async ({ app }, testInfo) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.takeSnapshot(testInfo);
});

test.only("Check design dark theme of the Datacenter page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.datacenterPage.open();
  await app.datacenterPage.header.clickHamburgerMenuButton();
  await app.datacenterPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.datacenterPage.takeSnapshot(testInfo);
});
