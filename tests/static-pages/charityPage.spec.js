const { test } = require("../../utils/fixturePages");
const testData = JSON.parse(
  JSON.stringify(
    require("../../data/static-pages/charity-page/testData.json")
  )
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

test("Check the swipe to left in  Charity Columbia slider ", async ({
  charityPage,
}) => {
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await charityPage.staticSlider.swipeLeft(
    await charityPage.staticSlider.charityColumbiaSliderSmallFirstImage,
    await charityPage.staticSlider.charityColumbiaSliderSmallLastImage
  );
  //Assert
  await charityPage.staticSlider.expectAttributeClassOfLastSmallImageCharityColumbiaSlider(
    "visible"
  );
});

test("Check the swipe to left in Charity Haiti slider ", async ({
  charityPage,
}) => {
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await charityPage.staticSlider.swipeLeft(
    await charityPage.staticSlider.charityHaitiSliderSmallFirstImage,
    await charityPage.staticSlider.charityHaitiSliderSmallLastImage
  );

  //Assert
  await charityPage.staticSlider.expectAttributeClassOfLastSmallImageCharityHaitiSlider(
    "visible"
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
  charityPage,
  headerStaticPages,
  hamburgerMenu,
}) => {
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await headerStaticPages.clickHamburgerMenuButton();
  await hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await charityPage.expectScreenCharityPage();
});
