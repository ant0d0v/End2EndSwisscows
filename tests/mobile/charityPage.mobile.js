import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/charity-page/testData.json"))
);

test("Check that border is red and 2px when clicking on the Charity Haiti slider images", async ({
  charityPage
}) => {
  //Assert
  await charityPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    charityPage.imagesGallery.charityHaitiGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that border is red and 2px when clicking on the Charity Columbia slider images", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.imagesGallery.expectBorderWhenClickingOnSmallImages(
    charityPage.imagesGallery.charityColumbiaGallerySmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInHaitiGallery(
    "active"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Columbia slider", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.imagesGallery.expectAttributeOfLargeImagesWhenClickingInColumbiaGallery(
    "active"
  );
});

test("Check that the video is playing", async ({ charityPage }) => {
  //Action 
 /* `await charityPage.waitUntilPageIsFullyLoaded();` is a function call that waits until the charity
 page is fully loaded before proceeding with the next actions or assertions. This ensures that all
 the necessary elements and resources on the page are loaded and ready to be interacted with or
 checked. */
  await charityPage.waitUntilPageIsFullyLoaded();
  //Assert
  await charityPage.staticVideoPlayer.expectVideoToPlay();
});

for (const { testID, expectedLink, locatorId, expectedTitle, } of testData.charityLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} link`, async ({
    charityPage,

  }) => {
    //Actions
    const currentPage = await charityPage.clickLinkOnThePage(locatorId);

    //Assert
    await charityPage.expectHaveUrl(currentPage, expectedLink);
    await charityPage.expectHaveTitle(currentPage, expectedTitle);
  });
}
test("Check design of the charity page ", async ({ charityPage },testInfo) => {
  //Assert
  await charityPage.expectScreenCharityPage(testInfo);
});

test("Check design dark theme of the charity page ", async ({
  charityPage
},testInfo) => {
  
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await charityPage.headerStaticPages.clickHamburgerMenuButton();
  await charityPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await charityPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await charityPage.expectScreenCharityPage(testInfo);
});
