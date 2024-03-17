import { test} from " /../../utils/fixtures";

test("Check next and prev buttons in the video widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flovers video");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.clickNextButtonUntilInvisible()
     await app.webPage.videoWidget.waitElementToBeVisible(app.webPage.videoWidget.nextButton)
     
     //Assert
     await app.webPage.videoWidget.expectNextButtonIsDisabled()
     await app.webPage.videoWidget.clickPrevButtonUntilInvisible()
     await app.webPage.videoWidget.expectPrevButtonIsDisabled()
    });

  test("Check the width and visibility of images in the video widget", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flovers video");
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
     await app.home.header.searchForm.inputSearchCriteria("flovers video");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.waitElementToBeVisible(app.webPage.videoWidget.nextButton)
     await app.webPage.videoWidget.clickMoreVideosButton()
     
     //Assert
     await app.videoPage.expectHaveUrl(app.videoPage.page, process.env.BASE_URL + "/en/video?query=flovers+video&region=de-DE" )
     await app.videoPage.expectHaveTitle(app.videoPage.page, "Videos for flovers video - Swisscows" )
  });

  test("Check that open video in the video widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flovers video");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.videoWidget.waitElementToBeVisible(app.webPage.videoWidget.nextButton)
     
     //Assert
     await app.webPage.videoWidget.expectToBeOpenedNewPageAfterClick(
      app.webPage.videoWidget.firstVideo , /www.youtube.com/)
  });

  test("Check the count and visibility of images in the image widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flowers");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await app.webPage.imagesWidget.expectAreElementsInListDisplayed(app.webPage.imagesWidget.allImage)
     await app.webPage.imagesWidget.expectListToBeGreaterThanOrEqual(app.webPage.imagesWidget.allImage, 6)
  });

  test("Check click more button in the image widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flowers");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.imagesWidget.clickMoreImagesButton()
     
     //Assert
     await app.imagePage.expectHaveUrl(app.allImage.page, process.env.BASE_URL + "/en/images?query=flowers&region=de-DE" )
     await app.imagePage.expectHaveTitle(app.allImage.page, "Images for flowers - Swisscows" )
  });

  test("Check that open image in the image widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flowers");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await app.webPage.expectNewPageNotToHaveUrlAfterClick(
      app.webPage.imagesWidget.firstImage , process.env.BASE_URL + "/en/images?query=flowers&region=de-DE")
  });

  test("Check title of the image widget", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("flowers");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await app.webPage.imagesWidget.expectTitleToHaveText("Images for flowers")
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