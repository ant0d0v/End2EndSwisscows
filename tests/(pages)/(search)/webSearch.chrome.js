import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);
const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);

test("Check 202 No Results Found error page ", async ({
    mainPage,
    webPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Ukraine");
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorNoResults,
      testData.expectedErrorText.noResultsFound202Error)
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check request is blocked 450 error page ", async ({
    mainPage,
    webPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("porn");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
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
    mainPage,
    webPage
  }) => {
     //Actions
     await mainPage.headerStaticPages.clickHamburgerMenuButton();
     await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ronaldo");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

    //Assert
    await webPage.relatedSearches.expectRelatedSearchesToContains("ronaldo");
    await webPage.relatedSearches.expectRelatedSearchesToHaveCount(8)
  });

  test("Check that hover texts related to search", async ({
    mainPage,
    webPage
  }) => {
     //Actions
     await mainPage.headerStaticPages.clickHamburgerMenuButton();
     await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ronaldo");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

    //Assert
    await webPage.relatedSearches.expectColorsLinksWhenHovering(
      webPage.relatedSearches.listRelatedSearches, "color", "rgb(223, 93, 93)");
  });

  test("Check click query in related search criteria", async ({
    mainPage,
    webPage
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.clickHamburgerMenuButton();
     await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("Cristiano Ronaldo");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
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
    mainPage,
    webPage
  }) => {
     const query = "appple";
     let expectedResult = "Including results for \"apple\"" + "Do you want results only for " + query + "?";
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria(query);
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

     //Assert
     await webPage.alternateSearch.expectElementToHaveText(webPage.alternateSearch.textDidYouMeanMessage,
      expectedResult )
  });

  test("Check that web results equals search criteria ", async ({
    mainPage,
    webPage
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("Cristiano Ronaldo");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()

     //Assert
     await webPage.item.expectWebItemsToContains("ronaldo");
     await webPage.item.expectListToBeGreaterThanOrEqual(webPage.item.webItems, 6)
  });

  test("Check select any number in the paging", async ({
    mainPage,
    webPage
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ukraine");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
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
    mainPage,
    webPage
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ukraine");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
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
    mainPage,
    webPage,
    page
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ivanka");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
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
    mainPage,
    webPage,
    page
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ukraine");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.item.clickFirstWebItem()
   
     //Assert
     await webPage.expectNotToHaveUrl(page, "https://dev.swisscows.com/en/web?query=ukraine" )
  });

  test("Check open web Preview ", async ({
    mainPage,
    webPage,
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("wiki");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
   
     //Assert
     await webPage.preview.expectElementToBeVisible(webPage.preview.contentImageInPreview)
  });

  test("Check close web Preview ", async ({
    mainPage,
    webPage,
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("wiki");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
   
     //Assert
     await webPage.preview.expectElementToBeVisible(webPage.preview.contentImageInPreview)
     await webPage.preview.clickCloseButtonInPreview ()
     await webPage.preview.expectElementToBeHidden(webPage.preview.contentImageInPreview)

  });

  test("Check click open site button in web Preview ", async ({
    mainPage,
    webPage,
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("wiki");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
     const newPage = await webPage.preview.clickOpenSiteButtonInPreview()
   
     //Assert
     await webPage.expectHaveUrl(newPage, /wikipedia.org/ )
  });

  test("Check open trackers in web Preview ", async ({
    mainPage,
    webPage,
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("google");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
     await webPage.preview.clickTrackersButtonInPreview()
     
   
     //Assert
     await webPage.preview.expectListToBeGreaterThanOrEqual(webPage.preview.allTrackers, 1)
  });

  test("Check click screenshot button in web Preview ", async ({
    mainPage,
    webPage,
  }) => {
     
     //Actions
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("google");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.preview.clickPreviewButton()
     await webPage.preview.clickTrackersButtonInPreview()
     
     //Assert
     await webPage.preview.expectElementToBeHidden(webPage.preview.contentImageInPreview)
     await webPage.preview.clickScreenshotButtonInPreview()
     await webPage.preview.expectElementToBeVisible(webPage.preview.contentImageInPreview)
  });

  test("Check design of the web search page ", async ({
    mainPage,
    webPage,
  },testInfo) => {
     
     //Actions
     await mainPage.headerStaticPages.clickHamburgerMenuButton();
     await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Ukraine");
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("adsddss");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.waitUntilPageIsFullyLoaded()
     
     //Assert
     await webPage.expectScreenWebPage(testInfo)
  });

  test("Check design dark theme of the web search page ", async ({
    mainPage,
    webPage,
  },testInfo) => {
     
     //Actions
     await mainPage.headerStaticPages.clickHamburgerMenuButton();
     await mainPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
     await mainPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();
     await mainPage.headerStaticPages.clickHamburgerMenuButton();
     await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Ukraine");
     await mainPage.headerStaticPages.searchForm.inputSearchCriteria("adsddss");
     await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.waitUntilPageIsFullyLoaded()
     
     //Assert
     await webPage.expectScreenWebPage(testInfo)
  });

  for (const {testID,expectedLink,locatorId,responseUrl,filter } of filterData.byDate) {
    test(`${testID}  ${locatorId} filter navigates to the corresponding page.`, async ({
      mainPage,
      webPage,
      page
    }) => {
      //Actions
      await mainPage.headerStaticPages.clickHamburgerMenuButton();
      await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
      await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ronaldo");
      await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
      await webPage.item.expectWebItemsToBeVisible()
      await webPage.header.clickFiltersButton()
      await webPage.filters.buttonMenu.clickFilterByDate()
      const response = await webPage.filters.clickFilterInDropdownListAndGetResponse(locatorId,responseUrl)
      
      //Assert
      await webPage.expectHaveUrl(page, expectedLink);
      await expect(response.json()).resolves.toEqual(expect.objectContaining({ "request": {
        "query": "ronaldo",
        "itemsCount": 10,
        "offset": 0,
        "region": "de-DE",
        "freshness": filter
    },}));
    });
  }


 