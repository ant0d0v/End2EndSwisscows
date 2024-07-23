import { test } from "../../../utils/fixtures.js";

test("Check next and prev buttons in the video widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.videoCollection.clickNextButtonUntilInvisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();
  //Assert
  await app.webPage.videoCollection.expectNextButtonIsDisabled();
  await app.webPage.videoCollection.clickPrevButtonUntilInvisible();
  await app.webPage.videoCollection.expectPrevButtonIsDisabled();
});

test("Check the width and visibility of images in the video widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.videoCollection.waitElementToBeVisible(
    app.webPage.videoCollection.nextButton
  );

  //Assert
  await app.webPage.videoCollection.expectAreElementsInListDisplayed(
    app.webPage.videoCollection.allImage
  );
  await app.webPage.videoCollection.expectImagesToHaveWightInWidget(
    "width",
    240
  );
  await app.webPage.videoCollection.expectListToHaveCount(
    app.webPage.videoCollection.allImage,
    4
  );
});

test("Check click more button in the video widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.videoCollection.waitElementToBeVisible(
    app.webPage.videoCollection.nextButton
  );
  await app.webPage.videoCollection.clickMoreVideosButton();

  //Assert
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + "/en/video?query=iphone&region=de-DE"
  );
  await app.expectHaveTitle(app.page, "Videos for iphone - Swisscows");
});

test("Check that open video in the video widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.videoCollection.waitElementToBeVisible(
    app.webPage.videoCollection.nextButton
  );

  //Assert
  await app.webPage.videoCollection.expectToBeOpenedNewPageAfterClick(
    app.webPage.videoCollection.firstVideo,
    /www.youtube.com/
  );
});

test("Check open news in the news widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.expectNewPageNotToHaveUrlAfterClick(
    app.webPage.newsCollection.firstNews,
    process.env.BASE_URL + "/en/web?query=news+Ukraine&region=de-DE"
  );
});
test("Check the width and visibility of images in the news widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.newsCollection.expectAreElementsInListDisplayed(
    app.webPage.newsCollection.allImage
  );
  await app.webPage.newsCollection.expectImageToHaveWightInWidget("width", 160);
  await app.webPage.newsCollection.expectListToHaveCount(
    app.webPage.newsCollection.allImage,
    3
  );
});

test("Check title of the news widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.newsCollection.expectTitleToHaveText(
    "News for news Ukraine"
  );
});
