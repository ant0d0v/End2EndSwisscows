import { test} from "../../utils/fixturePages";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../data/error/testData.json"))
);


test("Check 202 No Results Found error page ", async ({
    home,
    webPage
  }) => {
    //Actions
    await home.header.clickHamburgerMenuButton();
    await home.header.hamburgerMenu.selectRegion("Ukraine");
    await home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await home.header.searchForm.clickEnterSearchField();
    
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorNoResults,
      testData.expectedErrorText.noResultsFound202Error)
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check request is blocked 450 error page ", async ({
    home,
    webPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("porn");
    await home.header.searchForm.clickEnterSearchField();
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorNoResults, 
      testData.expectedErrorText.blocked450Error)
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check 500 unknown Error Page  ", async ({
    webPage
  }) => {
    //Actions
    await webPage.error.open500Page("/web")
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorPage, 
      testData.expectedErrorText.unknown500Error)
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check 404 Page Not Found ", async ({
    webPage
  }) => {
    //Actions
    await webPage.error.open404Page()
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorPage, 
      testData.expectedErrorText.pageNotFound404Error
      )
  });

  test("Check related search criteria", async ({
    home,
    webPage
  }) => {
     //Actions
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.selectRegion("Germany");
     await home.header.searchForm.inputSearchCriteria("ronaldo");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

    //Assert
    await webPage.relatedSearches.expectRelatedSearchesToContains("ronaldo");
    await webPage.relatedSearches.expectRelatedSearchesToHaveCount(8)
  });

  test("Check that hover texts related to search", async ({
    home,
    webPage
  }) => {
     //Actions
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.selectRegion("Germany");
     await home.header.searchForm.inputSearchCriteria("ronaldo");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

    //Assert
    await webPage.relatedSearches.expectColorsLinksWhenHovering(
      webPage.relatedSearches.listRelatedSearches, "color", "rgb(223, 93, 93)");
  });

  test("Check click query in related search criteria", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.selectRegion("Germany");
     await home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     const oldSearchResult = await webPage.item.getTextContentWebItems()
     await webPage.relatedSearches.clickFirstCriteriaInRelatedSearches()
     await webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     const newSearchResult = await webPage.item.getTextContentWebItems()

     //Assert
     await webPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await webPage.item.expectWebItemsToContains("ronaldo");
  });

  test("Check Did you mean message in the search field ", async ({
    home,
    webPage
  }) => {
     const query = "appple";
     let expectedResult = "Including results for \"apple\"" + "Do you want results only for " + query + "?";
     
     //Actions
     await home.header.searchForm.inputSearchCriteria(query);
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

     //Assert
     await webPage.alternateSearch.expectElementToHaveText(webPage.alternateSearch.textDidYouMeanMessage,
      expectedResult )
  });

  test("Check that web results equals search criteria ", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

     //Assert
     await webPage.item.expectWebItemsToContains("ronaldo");
     await webPage.item.expectListToBeGreaterThanOrEqual(webPage.item.webItems, 6)
  });

  test("Check select any number in the paging", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("ukraine");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     const oldSearchResult = await webPage.item.getTextContentWebItems()
     await webPage.pagination.clickThreeNumber()
     await webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     const newSearchResult = await webPage.item.getTextContentWebItems()

     //Assert
     await webPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await webPage.pagination.expectAttributeClassOfElement(
      webPage.pagination.threeNumberInPagination, "number active");
  });

  test("Check next button in the paging", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("ukraine");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     const oldSearchResult = await webPage.item.getTextContentWebItems()
     await webPage.pagination.clickNextButton()
     await webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     const newSearchResult = await webPage.item.getTextContentWebItems()

     //Assert
     await webPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
     await webPage.pagination.expectAttributeClassOfElement(
      webPage.pagination.secondNumberInPagination, "number active");
  });

  test("Check prev button in the paging", async ({
    home,
    webPage,
    page
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("ivanka");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.pagination.clickNextButton()
     await webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
     await webPage.pagination.clickPrevButton()
     await webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
     

     //Assert
     await webPage.expectHaveUrl(page, "https://dev.swisscows.com/en/web?query=ivanka&offset=0")
     await webPage.pagination.expectAttributeClassOfElement(
      webPage.pagination.firstNumberInPagination, "number active");
  });

  test("Check open link in  the web result", async ({
    home,
    webPage,
    page
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("ukraine");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.item.clickFirstWebItem()
   
     //Assert
     await webPage.expectNotToHaveUrl(page, "https://dev.swisscows.com/en/web?query=ukraine" )
  });

  test("Check open web Preview ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("wiki");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
   
     //Assert
     await webPage.preview.expectElementToBeVisible(webPage.preview.contentImageInPreview)
  });

  test("Check close web Preview ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("wiki");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
   
     //Assert
     await webPage.preview.expectElementToBeVisible(webPage.preview.contentImageInPreview)
     await webPage.preview.clickCloseButtonInPreview ()
     await webPage.preview.expectElementToBeHidden(webPage.preview.contentImageInPreview)

  });

  test("Check click open site button in web Preview ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("wiki");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
     const newPage = await webPage.preview.clickOpenSiteButtonInPreview()
   
     //Assert
     await webPage.expectHaveUrl(newPage, /wikipedia.org/ )
  });

  test("Check open trackers in web Preview ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("google");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
     await webPage.preview.clickTrackersButtonInPreview()
     
   
     //Assert
     await webPage.preview.expectListToBeGreaterThanOrEqual(webPage.preview.allTrackers, 1)
  });

  test("Check click screenshot button in web Preview ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.header.searchForm.inputSearchCriteria("google");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
     await webPage.preview.clickTrackersButtonInPreview()
     
     //Assert
     await webPage.preview.expectElementToBeHidden(webPage.preview.contentImageInPreview)
     await webPage.preview.clickScreenshotButtonInPreview()
     await webPage.preview.expectElementToBeVisible(webPage.preview.contentImageInPreview)
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
     await home.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
     await home.header.hamburgerMenu.clickDarkInHamburgerMenu();
     await home.header.clickHamburgerMenuButton();
     await home.header.hamburgerMenu.selectRegion("Ukraine");
     await home.header.searchForm.inputSearchCriteria("adsddss");
     await home.header.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.waitUntilPageIsFullyLoaded()
     
     //Assert
     await webPage.expectScreenWebPage(testInfo)
  });



 