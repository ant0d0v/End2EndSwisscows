import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");

const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);

for (const {testID,expectedNewsLink,locatorId,responseNewsUrl,filter } of filterData.byDate) {
    test(`${testID}  ${locatorId} filter navigates to the corresponding page.`, async ({
      mainPage,
      webPage,
      newsPage,
      page
    }) => {
      //Actions
      await mainPage.headerStaticPages.clickHamburgerMenuButton();
      await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
      await mainPage.headerStaticPages.searchForm.inputSearchCriteria("news");
      await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
      await webPage.item.expectWebItemsToBeVisible()
      await webPage.header.clickNewsSearchButton()
      await newsPage.item.expectNewsItemsToBeVisible()
      await newsPage.header.clickFiltersButton()
      await newsPage.filters.buttonMenu.clickFilterByDate()
      const response = await newsPage.filters.clickFilterInDropdownListAndGetResponse(locatorId,responseNewsUrl)
      
      //Assert
      await newsPage.expectHaveUrl(page, expectedNewsLink);
      await expect(response.json()).resolves.toEqual(expect.objectContaining({ "request": {
        "query": "news",
        "itemsCount": 10,
        "region": "de-DE",
        "offset": 0,
        "sortBy": "Created",
        "sortOrder": "Desc",
        "type": null,
        "collection": null,
        "language": "de",
        "freshness": 0
    },}));
    });
  }

  test("Cancel filter and navigates to the corresponding page.", async ({
    mainPage,
    webPage,
    newsPage,
    page
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("news");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickNewsSearchButton()
    await newsPage.item.expectNewsItemsToBeVisible()
    await newsPage.header.clickFiltersButton()
    await newsPage.filters.buttonMenu.clickFilterByDate()
    const oldResponse = await newsPage.filters.clickFilterInDropdownListAndGetResponse(
        filterData.byDate[0].locatorId, filterData.byDate[0].responseNewsUrl)
    const newResponse =  await newsPage.header.clickFilterButtonInAndGetResponse(
        "https://api.dev.swisscows.com/news/search?query=news&region=de-DE&language=de&itemsCount=10&offset=0&freshness=All&sortOrder=Desc&sortBy=Created"
    )   
    
    //Assert
    await newsPage.expectHaveUrl(page, "https://dev.swisscows.com/en/news?query=news&region=de-DE");
    await expect(oldResponse.json()).resolves.not.toEqual(newResponse.json())
    await expect(newResponse.json()).resolves.toEqual(expect.objectContaining({ "request": {
        "query": "news",
        "itemsCount": 10,
        "region": "de-DE",
        "offset": 0,
        "sortBy": "Created",
        "sortOrder": "Desc",
        "type": null,
        "collection": null,
        "language": "de",
        "freshness": 0
  },}));
  });

  test("Check list dropdown of filter by date ", async ({
    mainPage,
    webPage,
    newsPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ronaldo");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickNewsSearchButton()
    await newsPage.item.expectNewsItemsToBeVisible()
    await newsPage.header.clickFiltersButton()
    await newsPage.filters.buttonMenu.clickFilterByDate()

    //Assert
    await newsPage.filters.expectElementToHaveText( newsPage.filters.dropdownOfFilterByDate,[
        "All","Past Day","Past Week","Past Month","Past Year"])
  });

  test("Check that dropdown of filter by date is opened", async ({
    mainPage,
    webPage,
    newsPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Germany");
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("ronaldo");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickNewsSearchButton()
    await newsPage.item.expectNewsItemsToBeVisible()
    await newsPage.header.clickFiltersButton()
    await newsPage.filters.buttonMenu.clickFilterByDate()

    //Assert
    await newsPage.filters.buttonMenu.expectAttributeClassOfElement(newsPage.filters.buttonMenu.attributeFilterByDate, /open/)
  });