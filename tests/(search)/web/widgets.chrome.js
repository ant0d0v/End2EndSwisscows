import { test} from " /../../utils/fixtures";

test.fixme("Check next and prev buttons in the video widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("iphone");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.clickNextButtonUntilInvisible()
     await app.webPage.videoWidget.waitUntilWidgetToBeVisible()
     
     //Assert
     await app.webPage.videoWidget.expectNextButtonIsDisabled()
     await app.webPage.videoWidget.clickPrevButtonUntilInvisible()
     await app.webPage.videoWidget.expectPrevButtonIsDisabled()
    });

  test.fixme("Check the width and visibility of images in the video widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("iphone");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.waitElementToBeVisible(app.webPage.videoWidget.nextButton)
     
     //Assert
     await webPage.videoWidget.expectAreElementsInListDisplayed(app.webPage.videoWidget.allImage)
     await webPage.videoWidget.expectImageToHaveWightInWidget("width", 240)
     await webPage.videoWidget.expectListToHaveCount(app.ebPage.videoWidget.allImage, 10)
  });

  test("Check click more button in the video widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("iphone");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.waitElementToBeVisible(app.webPage.videoWidget.nextButton)
     await app.webPage.videoWidget.clickMoreVideosButton()
     
     //Assert
     await app.expectHaveUrl(app.page, process.env.BASE_URL + "/en/video?query=iphone&region=de-DE" )
     await app.expectHaveTitle(app.page, "Videos for iphone - Swisscows" )
  });

  test("Check that open video in the video widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("iphone");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.waitElementToBeVisible(app.webPage.videoWidget.nextButton)
     
     //Assert
     await app.webPage.videoWidget.expectToBeOpenedNewPageAfterClick(
      app.webPage.videoWidget.firstVideo , /www.youtube.com/)
  });

  test("Check open news in the news widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("news Ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await app.webPage.expectNewPageNotToHaveUrlAfterClick(
      app.webPage.newsWidget.firstNews , process.env.BASE_URL + "/en/web?query=news+Ukraine&region=de-DE")
  });
  test("Check the width and visibility of images in the news widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("news Ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await app.webPage.newsWidget.expectAreElementsInListDisplayed(app.webPage.newsWidget.allImage)
     await app.webPage.newsWidget.expectImageToHaveWightInWidget("width", 160)
     await app.webPage.newsWidget.expectListToHaveCount(app.webPage.newsWidget.allImage, 3)
  });

  test("Check title of the news widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("news Ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await app.webPage.newsWidget.expectTitleToHaveText("News for news Ukraine")
  });