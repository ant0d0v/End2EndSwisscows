import { test } from "../../utils/fixtures.js";
import testData from "../../data/pages/datacenter/testData.json";

test("Check that border is red and 2px when clicking on the images Datacenter slider", async ({
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

test("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  app,
}) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInDatacenterGallery(
    "active"
  );
});

test("Check that the video is playing", async ({ app }) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.videoPlayer.expectVideoToPlay();
});

for (const {
  testID,
  expectedLink,
  locatorId,
  expectedTitle,
} of testData.datacenterLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} link`, async ({
    app,
  }) => {
    //Actions
    await app.datacenterPage.open();
    const currentPage = await app.datacenterPage.clickLinkOnThePage(locatorId);

    //Assert
    await app.expectPageToHaveUrl(currentPage, expectedLink);
    await app.expectHaveTitle(currentPage, expectedTitle);
  });
}
test("Check design of the Datacenter page ", async ({ app }, testInfo) => {
  //Actions
  await app.datacenterPage.open();
  //Assert
  await app.datacenterPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the Datacenter page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.datacenterPage.open();
  await app.datacenterPage.header.clickHamburgerMenuButton();
  await app.datacenterPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.datacenterPage.takeSnapshot(testInfo);
});
