import { test} from " /../../utils/fixturePages";
const { expect } = require("@playwright/test");

test("Check next and prev buttons in the video widget", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flovers video");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.videoWidget.clickNextButtonUntilInvisible()
     await webPage.videoWidget.waitElementToBeVisible(webPage.videoWidget.nextButton)
     
     //Assert
     await webPage.videoWidget.expectAttributeToHaveValue(webPage.videoWidget.nextButton, 
      "class", /next swiper-button-disabled/)
     await webPage.videoWidget.clickPrevButtonUntilInvisible()
     await webPage.videoWidget.expectAttributeToHaveValue(webPage.videoWidget.prevButton, 
      "class", /prev swiper-button-disabled/)
  });

  test("Check the width and visibility of images in the video widget", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flovers video");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.videoWidget.waitElementToBeVisible(webPage.videoWidget.nextButton)
     
     //Assert
     await webPage.videoWidget.expectAreElementsInListDisplayed(webPage.videoWidget.allImage)
     await webPage.videoWidget.expectImageToHaveWightInWidget("width", 240)
     await webPage.videoWidget.expectListToHaveCount(webPage.videoWidget.allImage, 10)
  });

  test("Check click more button in the video widget", async ({
    home,
    webPage,
    videoPage,
    page
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flovers video");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.videoWidget.waitElementToBeVisible(webPage.videoWidget.nextButton)
     await webPage.videoWidget.clickMoreVideosButton()
     
     //Assert
     await videoPage.expectHaveUrl(page,"https://dev.swisscows.com/en/video?query=flovers+video&region=de-DE" )
     await videoPage.expectHaveTitle(page, "Videos for flovers video - Swisscows" )
  });

  test("Check that open video in the video widget", async ({
    home,
    webPage,
    videoPage
  }) => {
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flovers video");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.videoWidget.waitElementToBeVisible(webPage.videoWidget.nextButton)
     const newPage = await webPage.videoWidget.clickFirstVideoAndNavigateToNewPage()
     
     //Assert
     await videoPage.expectHaveUrl(newPage, /www.youtube.com/ )
  });

  test("Check the count and visibility of images in the image widget", async ({
    home,
    webPage
  }) => {
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flowers");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await webPage.imagesWidget.expectAreElementsInListDisplayed(webPage.imagesWidget.allImage)
     await webPage.imagesWidget.expectListToBeGreaterThanOrEqual(webPage.imagesWidget.allImage, 6)
  });

  test("Check click more button in the image widget", async ({
    home,
    webPage,
    imagePage,
    page
  }) => {
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flowers");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.imagesWidget.clickMoreImagesButton()
     
     //Assert
     await imagePage.expectHaveUrl(page,"https://dev.swisscows.com/en/images?query=flowers&region=de-DE" )
     await imagePage.expectHaveTitle(page, "Images for flowers - Swisscows" )
  });

  test("Check that open image in the image widget", async ({
    home,
    webPage,
    imagePage
  }) => {
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flowers");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     const newPage = await webPage.imagesWidget.clickFirstImageAndNavigateToNewPage()
     
     //Assert
     await imagePage.expectNotToHaveUrl(newPage, "https://dev.swisscows.com/en/web?query=flowers&region=de-DE" )
  });

  test("Check title of the image widget", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("flowers");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await webPage.imagesWidget.expectElementToHaveText(webPage.imagesWidget.titleImagesWidget, 
      "Images for flowers")
  });

  test("Check open news in the news widget", async ({
    home,
    webPage,
    newsPage
  }) => {
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("news Ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     const newPage = await webPage.newsWidget.clickFirstNewsAndNavigateToNewPage()
     
     //Assert
     await newsPage.expectNotToHaveUrl(newPage, "https://dev.swisscows.com/en/web?query=news+Ukraine&region=de-DE" )
  });
  test("Check the width and visibility of images in the news widget", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("news Ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await webPage.newsWidget.expectAreElementsInListDisplayed(webPage.newsWidget.allImage)
     await webPage.newsWidget.expectImageToHaveWightInWidget("width", 160)
     await webPage.newsWidget.expectListToHaveCount(webPage.newsWidget.allImage, 3)
  });

  test("Check title of the news widget", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("news Ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     
     //Assert
     await webPage.newsWidget.expectElementToHaveText(webPage.newsWidget.titleNewsWidget, 
      "News for news ukraine")
  });