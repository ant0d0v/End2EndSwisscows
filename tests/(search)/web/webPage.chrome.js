import { test} from "../../../utils/fixturePages";
import { mockingStatusCodeResponse } from "../../../app/api/route"
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);


test("Check 202 no results error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("././././");
    await app.home.header.searchForm.clickEnterSearchField();
    
    //Assert
    await app.webPage.error.expectNotResultErrorToHaveText(
      "No results found for \"././././\"SearchTips:Ensure words are spelled correctly.Try rephrasing keywords or using synonyms.Try less specific keywords.Make your queries as concise as possible.")
    await app.webPage.error.expectErrorImageToBeVisible()
  });

  test("Check request is blocked 450 error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("porn");
    await app.home.header.searchForm.clickEnterSearchField();
    
    //Assert
    await app.webPage.error.expectContentToHaveText(testData.expectedErrorText.blocked450Error)
    await app.webPage.error.expectErrorImageToBeVisible()
    await app.webPage.error.expectImageToHaveWight(450)
  });
  
  test("Check 429 Too many requests", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/web", 429)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    
    //Assert
    await app.webPage.error.expectContentToHaveText(testData.expectedErrorText.TooManyRequestsError)
    await app.webPage.error.expectErrorImageToBeVisible()
    await app.webPage.error.expectImageToHaveWight(450)
  });

  test("Check 500 unknown Error Page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/web", 500)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
  
    //Assert
    await app.webPage.error.expectContentToHaveText(testData.expectedErrorText.unknown500Error)
    await app.webPage.error.expectErrorImageToBeVisible()
    await app.webPage.error.expectImageToHaveWight(446)
  });
  test("Check 501 unsupported region", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/web", 501)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
  
    //Assert
    await app.webPage.error.expectContentToHaveText(testData.expectedErrorText.unknownRegion501Error)
    await app.webPage.error.expectErrorImageToBeVisible()
    await app.webPage.error.expectImageToHaveWight(450)
  });

  test("Check 404 Page Not Found ", async ({
    app
  }) => {
    //Actions
    await app.webPage.error.open("/web/123")

    //Assert
    await app.webPage.error.expectContentToHaveText(testData.expectedErrorText.pageNotFound404Error)
  });

  test("Check Did you mean message in the search field ", async ({
    app
  }) => {
     const query = "appple";
   
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria(query);
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()

     //Assert
     await app.webPage.alternateSearch.expectDidYouMeanMessageToHaveText(
      "Including results for \"apple\"" + "Do you want results only for " + query + "?")
  });

  test("Check that web results equals search criteria ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("Ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()

     //Assert
     await app.webPage.item.expectWebItemsToContains("ukraine");
     await app.webPage.item.expectListToBeGreaterThanOrEqual(app.webPage.item.webItems, 6)
  });

  test("Check select any number in the paging", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     const oldSearchResult = await app.webPage.item.getTextContentWebItems()
     await app.webPage.pagination.clickThreeNumber()
     await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     const newSearchResult = await app.webPage.item.getTextContentWebItems()

     //Assert
     await app.webPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await app.webPage.pagination.expectThreeNumberIsActive()
  });

  test("Check next button in the paging", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     const oldSearchResult = await app.webPage.item.getTextContentWebItems()
     await app.webPage.pagination.clickNextButton()
     await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     const newSearchResult = await app.webPage.item.getTextContentWebItems()

     //Assert
     await app.webPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await app.webPage.pagination.expectSecondNumberIsActive()
  });

  test("Check prev button in the paging", async ({
    app
  }) => {
      //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("ivanka");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.pagination.clickNextButton()
     await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     await app.webPage.pagination.clickPrevButton()
     await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     
     //Assert
     await app.webPage.expectHaveUrl(app.page, process.env.BASE_URL + "/en/web?query=ivanka&offset=0")
     await app.webPage.pagination.expectFirstNumberIsActive()
  });

  test("Check open link in  the web result", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("ukraine");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.item.clickFirstWebItem()
   
     //Assert
     await app.webPage.expectNotToHaveUrl(app.page, process.env.BASE_URL + "/en/web?query=ukraine")
  });

  test("Check open web Preview ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("wiki");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.clickPreviewButton()
   
     //Assert
     await app.webPage.preview.expectScreenshotImageToBeVisible()
  });

  test("Check close web Preview ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("wiki");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.clickPreviewButton()
   
     //Assert
     await app.webPage.preview.expectScreenshotImageToBeVisible()
     await app.webPage.preview.clickCloseButton()
     await app.webPage.preview.expectScreenshotImageToBeHidden()
  });

  test("Check click open site button in web Preview ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("wiki");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.clickPreviewButton()

     //Assert
     await app.webPage.preview.expectToBeOpenedNewPageAfterClickOpenSiteButton(/wikipedia.org/)
  });

  test("Check open trackers in web Preview ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("google");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.clickPreviewButton()
     await app.webPage.preview.clickTrackersButton()
     
     //Assert
     await app.webPage.preview.expectListToBeGreaterThanOrEqual(app.webPage.preview.allTrackers, 1)
  });

  test("Check click screenshot button in web Preview ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("google");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.clickPreviewButton()
     await app.webPage.preview.clickTrackersButton()
     
     //Assert
     await app.webPage.preview.expectScreenshotImageToBeHidden()
     await app.webPage.preview.clickScreenshotButton()
     await app.webPage.preview.expectScreenshotImageToBeVisible()
  });

  test.skip("Check design of the web search page ", async ({
    home,
    webPage,
  },testInfo) => {
     //Actions
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.selectRegion("Ukraine");
     await home.header.searchForm.inputSearchCriteria("adsddss");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.waitUntilPageIsFullyLoaded()
     
     //Assert
     await webPage.expectScreenWebPage(testInfo)
  });

  test.skip("Check design dark theme of the web search page ", async ({
    home,
    webPage,
  },testInfo) => {
     
     //Actions
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.clickThemeDropdown();
     await home.header.hamburgerMenu.clickDarkTheme();
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.selectRegion("Ukraine");
     await home.header.searchForm.inputSearchCriteria("adsddss");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.waitUntilPageIsFullyLoaded()
     
     //Assert
     await webPage.expectScreenWebPage(testInfo)
  });



 