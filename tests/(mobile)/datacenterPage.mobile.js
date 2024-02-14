import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/datacenter/testData.json"))
);

test("Check that border is red and 2px when clicking on the images Datacenter slider", async ({
  datacenterPage,
}) => {
  //Assert
  await datacenterPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    datacenterPage.imagesGallery.dataCenterGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  datacenterPage,
}) => {
  //Assert
  await datacenterPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInDatacenterGallery(
    "active"
  );
});

test("Check that the video is playing", async ({ datacenterPage }) => {
  //Assert
  await datacenterPage.videoPlayer.expectVideoToPlay();
});

for (const { testID, expectedLink, locatorId, expectedTitle, } of testData.datacenterLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} link`, async ({
    datacenterPage,
  }) => {
    //Actions
    const currentPage = await datacenterPage.clickLinkOnThePage(locatorId);

    //Assert
    await datacenterPage.expectHaveUrl(currentPage, expectedLink);
    await datacenterPage.expectHaveTitle(currentPage, expectedTitle);
  });
}
test("Check design of the Datacenter page ", async ({ datacenterPage },testInfo) => {
  //Assert
  await datacenterPage.expectScreenDatacenterPage(testInfo);
});

test("Check design dark theme of the Datacenter page ", async ({
  datacenterPage
},testInfo) => {
  //Actions
  await datacenterPage.waitUntilPageIsFullyLoaded();
  await datacenterPage.headerStaticPages.clickHamburgerMenuButton();
  await datacenterPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await datacenterPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await datacenterPage.expectScreenDatacenterPage(testInfo);
});
