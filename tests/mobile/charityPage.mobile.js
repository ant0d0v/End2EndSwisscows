import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/charity-page/testData.json"))
);

test("Check that border is red and 2px when clicking on the Charity Haiti slider images", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.staticSlider.expectBorderWhenClickingOnSmallImages(
    charityPage.staticSlider.charityHaitiSliderSmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that border is red and 2px when clicking on the Charity Columbia slider images", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.staticSlider.expectBorderWhenClickingOnSmallImages(
    charityPage.staticSlider.charityColumbiaSliderSmallImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Haiti slider", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.staticSlider.expectAttributeOfLargeImagesWhenClickingInHaitiSlider(
    "active"
  );
});

test("Check that small image matches the large image when clicking on the small image in Charity Columbia slider", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.staticSlider.expectAttributeOfLargeImagesWhenClickingInColumbiaSlider(
    "active"
  );
});

test("Check that the video is playing", async ({ charityPage }) => {
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
test("Check design of the charity page ", async ({ charityPage }) => {
  //Assert
  await charityPage.expectScreenCharityPage();
});

test("Check design dark theme of the charity page ", async ({
  charityPage
}) => {
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await charityPage.headerStaticPages.clickHamburgerMenuButton();
  await charityPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await charityPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await charityPage.expectScreenCharityPage();
});
