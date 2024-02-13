import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);
const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);

test("Check 202 No Results Found error page ", async ({
    home,
    newsPage
  }) => {
    //Actions
    await home.headerStaticPages.clickHamburgerMenuButton();
    await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
    await home.headerStaticPages.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await newsPage.header.clickNewsSearchButton()
    
    //Assert
    await newsPage.expectElementToHaveText(newsPage.error.contentErrorNoResults,
      testData.expectedErrorText.noResultsFound202Error)
    await newsPage.expectElementToBeVisible(newsPage.error.errorImage)
  });

  test("Check request is blocked 450 error page ", async ({
    home,
    newsPage
  }) => {
    //Actions
    await home.headerStaticPages.clickHamburgerMenuButton();
    await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
    await home.headerStaticPages.searchForm.inputSearchCriteria("porn");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await newsPage.header.clickNewsSearchButton()

    //Assert
    await newsPage.expectElementToHaveText(newsPage.error.contentErrorNoResults, 
      testData.expectedErrorText.blocked450Error)
    await newsPage.expectElementToBeVisible(newsPage.error.errorImage)
  });

  test("Check 501 unknown Error Page  ", async ({
    newsPage
  }) => {
    //Actions
    await newsPage.error.open500Page("/news")
    //Assert
    await newsPage.expectElementToHaveText(newsPage.error.contentErrorPage, 
      testData.expectedErrorText.unknownRegion501Error)
    await newsPage.expectElementToBeVisible(newsPage.error.errorImage)
  });

  test("Check error region is unsupported", async ({
    home,
    newsPage,
    webPage
  }) => {
    //Actions
    await home.headerStaticPages.clickHamburgerMenuButton();
    await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
    await home.headerStaticPages.searchForm.inputSearchCriteria("news");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await newsPage.header.clickNewsSearchButton()
    await newsPage.item.expectNewsItemsToBeVisible()
    await newsPage.header.clickHamburgerMenuButton();
    await newsPage.header.hamburgerMenu.selectRegion("Ukraine");
    

    //Assert
    await newsPage.expectElementToHaveText(newsPage.error.contentErrorPage, 
        testData.expectedErrorText.unknownRegion501Error)
    await newsPage.expectElementToBeVisible(newsPage.error.errorImage)
  });

  test("Check search results in news page ", async ({
    home,
    webPage,
    newsPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("Ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await newsPage.header.clickNewsSearchButton()
     await newsPage.item.expectNewsItemsToBeVisible()

     //Assert
     await newsPage.item.expectAreElementsInListDisplayed(newsPage.item.allImage)
     await newsPage.item.expectImageToHaveWightInSearchResult("width", 210)
     await newsPage.item.expectListToHaveCount(newsPage.item.newsItems, 10)
  });


  test("Check open link in  the news result", async ({
    home,
    webPage,
    newsPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await newsPage.header.clickNewsSearchButton()
     await newsPage.item.expectNewsItemsToBeVisible()
     const newPage = await newsPage.item.clickFirstNewsItem()
   
     //Assert
     await newsPage.expectNotToHaveUrl(newPage, "https://dev.swisscows.com/en/news?query=ukraine&region=de-DE" )
  });

  test("Check select any number in the paging", async ({
    home,
    webPage,
    newsPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await newsPage.header.clickNewsSearchButton()
     await newsPage.item.expectNewsItemsToBeVisible()
     const oldSearchResult = await newsPage.item.getTextContentNewsItems()
     await newsPage.pagination.clickThreeNumber()
     await newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     const newSearchResult = await newsPage.item.getTextContentNewsItems()

     //Assert
     await newsPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await newsPage.item.expectListToHaveCount(newsPage.item.newsItems, 10)
     await newsPage.pagination.expectAttributeClassOfElement(
        newsPage.pagination.threeNumberInPagination, "number active");
  });

  test("Check next button in the paging", async ({
    home,
    webPage,
    newsPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await newsPage.header.clickNewsSearchButton()
     await newsPage.item.expectNewsItemsToBeVisible()
     const oldSearchResult = await newsPage.item.getTextContentNewsItems()
     await newsPage.pagination.clickNextButton()
     await newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     const newSearchResult = await newsPage.item.getTextContentNewsItems()

     //Assert
     await newsPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await newsPage.item.expectListToHaveCount(newsPage.item.newsItems, 10)
     await newsPage.pagination.expectAttributeClassOfElement(
       newsPage.pagination.secondNumberInPagination, "number active");
  });

  test("Check prev button in the paging", async ({
    home,
    webPage,
    newsPage,
    page
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("news");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await newsPage.header.clickNewsSearchButton()
     await newsPage.item.expectNewsItemsToBeVisible()
     await newsPage.pagination.clickNextButton()
     await newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     await newsPage.pagination.clickPrevButton()
     await newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("4");
     

     //Assert
     await newsPage.expectHaveUrl(page, "https://dev.swisscows.com/en/news?query=news&region=de-DE&offset=0")
     await newsPage.item.expectListToHaveCount(newsPage.item.newsItems, 10)
     await newsPage.pagination.expectAttributeClassOfElement(
       newsPage.pagination.firstNumberInPagination, "number active");
  });

  test("Check that image of proxy cdn server", async ({
    home,
    webPage,
    newsPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("Ukraine");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await newsPage.header.clickNewsSearchButton()
     await newsPage.item.expectNewsItemsToBeVisible()

     //Assert
     await newsPage.proxyImage.expectAttributeSrcAllImagesToHave(newsPage.item.allImage, 
        /cdn.swisscows.com/)
  });