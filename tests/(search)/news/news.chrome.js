import { test} from "../../../utils/fixtures";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);

test("Check 202 No Results Found error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.newsPage.header.clickNewsSearchButton()
    
    //Assert
    await app.newsPage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.noResultsFound202Error)
    await app.newsPage.error.expectErrorImageToBeVisible()
    await app.newsPage.error.expectImageToHaveWight(450)
  });

  test("Check request is blocked 450 error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("porn");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.newsPage.header.clickNewsSearchButton()

    //Assert
    await app.newsPage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.blocked450Error)
    await app.newsPage.error.expectErrorImageToBeVisible()
    await app.newsPage.error.expectImageToHaveWight(450)
  });
  
  test("Check 500 unknown Error Page  ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.route.mockResponseStatusCode("/news", 500)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.newsPage.header.clickNewsSearchButton()

    //Assert
    await app.newsPage.error.expectContentToHaveText("Oops! Something is wrongError 500: Internal Server ErrorServer doesn’t respond or something else happened. Please, try to refresh this page.")
    await app.newsPage.error.expectErrorImageToBeVisible()
    await app.newsPage.error.expectImageToHaveWight(450)
  });

  test("Check 429 Too many requests", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.route.mockResponseStatusCode("/news", 429)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.newsPage.header.clickNewsSearchButton()
    
    //Assert
    await app.newsPage.error.expectContentToHaveText(testData.expectedErrorText.TooManyRequestsError)
    await app.newsPage.error.expectErrorImageToBeVisible()
    await app.newsPage.error.expectImageToHaveWight(450)
  });

  test("Check error region is unsupported", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("football");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.newsPage.header.clickNewsSearchButton()
    await app.newsPage.item.expectNewsItemsToBeVisible()
    await app.newsPage.header.clickHamburgerMenuButton();
    await app.newsPage.header.hamburgerMenu.selectRegion("Ukraine");
    
    //Assert
    await app.newsPage.error.expectContentToHaveText(testData.expectedErrorText.unknownRegion501Error)
    await app.newsPage.error.expectErrorImageToBeVisible()
    await app.newsPage.error.expectImageToHaveWight(450)
  });

  test("Check search results in news page ", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("news");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.newsPage.header.clickNewsSearchButton()
     await app.newsPage.item.expectNewsItemsToBeVisible()

     //Assert
     await app.newsPage.item.expectAreElementsInListDisplayed(app.newsPage.item.allImage)
     await app.newsPage.item.expectImageToHaveWightInSearchResult("width", 210)
     await app.newsPage.item.expectListToHaveCount(app.newsPage.item.newsItems, 10)
  });


  test("Check open link in  the news result", async ({
   app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.newsPage.header.clickNewsSearchButton()
     await app.newsPage.item.expectNewsItemsToBeVisible()
     const newPage = await app.newsPage.item.clickFirstNewsItem()
   
     //Assert
     await app.expectNotToHaveUrl(newPage,  process.env.BASE_URL + "/en/news?query=ukraine&region=de-DE" )
  });

  test("Check select any number in the paging", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.newsPage.header.clickNewsSearchButton()
     await app.newsPage.item.expectNewsItemsToBeVisible()
     const oldSearchResult = await app.newsPage.item.getTextContentNewsItems()
     await app.newsPage.pagination.clickThreeNumber()
     await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     const newSearchResult = await app.newsPage.item.getTextContentNewsItems()

     //Assert
     await app.newsPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await app.newsPage.item.expectListToHaveCount(app.newsPage.item.newsItems, 10)
     await app.newsPage.pagination.expectThreeNumberIsActive()
  });

  test("Check next button in the paging", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.newsPage.header.clickNewsSearchButton()
     await app.newsPage.item.expectNewsItemsToBeVisible()
     const oldSearchResult = await app.newsPage.item.getTextContentNewsItems()
     await app.newsPage.pagination.clickNextButton()
     await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     const newSearchResult = await app.newsPage.item.getTextContentNewsItems()

     //Assert
     await app.newsPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await app.newsPage.item.expectListToHaveCount(app.newsPage.item.newsItems, 10)
     await app.newsPage.pagination.expectSecondNumberIsActive()
  });

  test("Check prev button in the paging", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("news");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.newsPage.header.clickNewsSearchButton()
     await app.newsPage.item.expectNewsItemsToBeVisible()
     await app.newsPage.pagination.clickNextButton()
     await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     await app.newsPage.pagination.clickPrevButton()
     await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("4");
     
     //Assert
     await app.expectHaveUrl(app.page,  process.env.BASE_URL + "/en/news?query=news&region=de-DE&offset=0")
     await app.newsPage.item.expectListToHaveCount(app.newsPage.item.newsItems, 10)
     await app.newsPage.pagination.expectFirstNumberIsActive()
  });

  test("Check that image of proxy cdn server", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("Ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.newsPage.header.clickNewsSearchButton()
     await app.newsPage.item.expectNewsItemsToBeVisible()

     //Assert
     await app.newsPage.item.proxyImage.expectAttributeSrcAllImagesToHave(app.newsPage.item.allImage, 
        /cdn.swisscows.com/)
  });