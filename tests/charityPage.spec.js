const { test } = require("../utils/fixturePages");

test("Check that border is red and 2px when clicking on the Charity Haiti slider images", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.staticSlider.expectBorderWhenClickingOnImages(
    charityPage.staticSlider.charityHaitiSliderImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check that border is red and 2px when clicking on the Charity Columbia slider images", async ({
  charityPage,
}) => {
  //Assert
  await charityPage.staticSlider.expectBorderWhenClickingOnImages(
    charityPage.staticSlider.charityColumbiaSliderImages,
    "2px solid rgb(223, 93, 93)"
  );
});

test("Check the swipe to left in  Columbia Charity slider ", async ({
  charityPage,
}) => {
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await charityPage.staticSlider.swipeLeft(
    await charityPage.staticSlider.charityColumbiaSliderFirstImage,
    await charityPage.staticSlider.charityColumbiaSliderLastImage
  );

  //Assert
  await charityPage.staticSlider.expectAttributeClassOfElement(
    charityPage.staticSlider.charityColumbiaSliderLastImage,
    "swiper-slide swiper-slide-thumb-active swiper-slide-visible swiper-slide-fully-visible"
  );
});

test("Check the swipe to left in  Haiti Slider slider ", async ({
  charityPage,
}) => {
  //Actions
  await charityPage.waitUntilPageIsFullyLoaded();
  await charityPage.staticSlider.swipeLeft(
    await charityPage.staticSlider.charityHaitiSliderFirstImage,
    await charityPage.staticSlider.charityHaitiSliderLastImage
  );

  //Assert
  await charityPage.staticSlider.expectAttributeClassOfElement(
    charityPage.staticSlider.charityHaitiSliderLastImage,
    "swiper-slide swiper-slide-thumb-active swiper-slide-visible"
  );
});


