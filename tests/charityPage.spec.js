const { test } = require("../utils/fixturePages");

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

test("Check play video", async ({ charityPage }) => {
  //Action
  await charityPage.staticVideoPlayer.playVideo();
});
