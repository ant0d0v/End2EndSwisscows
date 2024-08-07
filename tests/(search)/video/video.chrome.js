import { test } from "../../../utils/fixtures.js";
import testData from "../../../data/error/testData.json";

test("Check 202 No Results Found error page ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.expectNotResultErrorToHaveText(
    testData.expectedErrorText.noResultsFound202Error
  );
  await app.videoPage.error.expectErrorImageToBeVisible();
  await app.videoPage.error.expectImageToHaveWight(450);
});

test("Check request is blocked 450 error page ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("porn");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.expectNotResultErrorToHaveText(
    testData.expectedErrorText.blocked450Error
  );
  await app.videoPage.error.expectErrorImageToBeVisible();
  await app.videoPage.error.expectImageToHaveWight(450);
});

test("Check 501 unknown Error Page  ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v2/videos", 500);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.expectContentToHaveText(
    "Oops! Something is wrongError 500: Internal Server ErrorServer doesn’t respond or something else happened. Please, try to refresh this page."
  );
  await app.videoPage.error.expectErrorImageToBeVisible();
  await app.videoPage.error.expectImageToHaveWight(450);
});

test("Check 429 Too many requests", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v2/videos", 429);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.expectContentToHaveText(
    testData.expectedErrorText.TooManyRequestsError
  );
  await app.videoPage.error.expectErrorImageToBeVisible();
  await app.videoPage.error.expectImageToHaveWight(450);
});

test("Check that video results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectTextsToContainSearchCriteria(
    app.videoPage.item.videoItems,
    "Iphone".toLowerCase()
  );
  await app.videoPage.item.expectListToHaveCount(
    app.videoPage.item.videoItems,
    10
  );
  await app.videoPage.item.expectAreElementsInListDisplayed(
    app.videoPage.item.images
  );
});

test("Check infinity scroll to items-pane aside", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("football");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);
  await app.videoPage.item.scrollByVisibleVideoNumber(50);

  //Assert
  await app.videoPage.item.expectListToBeGreaterThanOrEqual(
    app.videoPage.item.videoItems,
    35
  );
});

test("Check infinity scroll in video results", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("video");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.scrollWithMouseWheelToVideoNumber(90);

  //Assert
  await app.videoPage.item.expectListToBeGreaterThanOrEqual(
    app.videoPage.item.images,
    80
  );
});

test("Check the width and visibility images of items", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("football");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectImageToHaveWight("width", 210);
  await app.videoPage.item.expectListToHaveCount(app.videoPage.item.images, 10);
  await app.videoPage.item.expectAreElementsInListDisplayed(
    app.videoPage.item.images
  );
});

test("Check the width and visibility images of items in items-pane aside", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("football");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);

  //Assert
  await app.videoPage.item.expectImageToHaveWight("width", 264);
  await app.videoPage.item.expectListToHaveCount(app.videoPage.item.images, 10);
  await app.videoPage.item.expectAreElementsInListDisplayed(
    app.videoPage.item.images
  );
});

test("Check play video in player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);
  await app.videoPage.itemDetails.player.clickOkButton();

  //Assert
  await app.videoPage.itemDetails.player.expectTimeToHaveText("0:02");
});

test("Check description and title of video ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);

  //Assert
  await app.videoPage.itemDetails.player.expectElementToHaveText(
    app.videoPage.itemDetails.player.description,
    "Video provider prevents videos from being watched anonymously. Watching this video can be tracked by the video provider."
  );
  await app.videoPage.itemDetails.player.expectElementToHaveText(
    app.videoPage.itemDetails.player.title,
    "Privacy Warning"
  );
});

test("Check cancel button of video ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);
  await app.videoPage.itemDetails.player.clickCancelButton();

  //Assert
  await app.videoPage.itemDetails.player.expectElementToBeHidden(
    app.videoPage.itemDetails.player.videoPlayer
  );
  await app.expectPageToHaveUrl(
    app.page,
    `${process.env.BASE_URL}/en/video?query=Skofka`
  );
});

test("Check checkbox `Don't remind me again ` ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);
  await app.videoPage.itemDetails.player.selectCheckbox();
  await app.videoPage.itemDetails.player.clickOkButton();
  await app.videoPage.reloadPage();
  await app.videoPage.item.clickVideoNumber(1);

  //Assert
  await app.videoPage.itemDetails.player.expectTimeToHaveText("0:02");
  await app.videoPage.itemDetails.player.expectElementToBeHidden(
    app.videoPage.itemDetails.player.checkbox
  );
});

test("Check video play if don't select checkbox `Don't remind me again ` ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoNumber(1);
  await app.videoPage.itemDetails.player.clickOkButton();
  await app.videoPage.reloadPage();
  await app.videoPage.item.clickVideoNumber(1);

  //Assert
  await app.videoPage.player.expectElementToBeVisible(
    app.videoPage.itemDetails.player.okButton
  );
});

test("Check that image of proxy cdn server", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("football");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectListToHaveCount(app.videoPage.item.images, 10);
  await app.videoPage.item.proxyImage.expectAttributeSrcAllImagesToHave(
    app.videoPage.item.images,
    /cdn.swisscows.com/
  );
});

test("Check regional search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Ronaldo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.header.clickHamburgerMenuButton();
  await app.videoPage.header.hamburgerMenu.selectRegion("Germany");
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectTextsToContainSearchCriteria(
    app.videoPage.item.videoItems,
    "Ronaldo".toLowerCase()
  );
  await app.videoPage.item.expectListToHaveCount(
    app.videoPage.item.videoItems,
    10
  );
  await app.videoPage.item.expectAreElementsInListDisplayed(
    app.videoPage.item.images
  );
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/video?query=Ronaldo&region=de-DE`
  );
});
