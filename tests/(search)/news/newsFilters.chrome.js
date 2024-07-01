import { test} from "../../../utils/fixtures.js";
import { expect } from "@playwright/test";
const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);

for (const {testID,expectedNewsLink,locatorId} of filterData.byDate) {
    test(`${testID}  ${locatorId} filter navigates to the corresponding page.`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.selectRegion("Germany");
      await app.home.header.searchForm.inputSearchCriteria("news");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.webPage.item.expectWebItemsToBeVisible()
      await app.webPage.header.clickNewsSearchButton()
      await app.newsPage.item.expectNewsItemsToBeVisible()
      await app.newsPage.header.clickFiltersButton()
      await app.newsPage.filters.clickByDate()
      const response = await app.newsPage.filters.buttonMenu.clickMenuItemAndGetResponse(locatorId, 
        process.env.API_URL + "/news/search?query=news&region=de-DE")
      
      //Assert
      await app.expectHaveUrl(app.page, expectedNewsLink);
      await app.api.search.response.expectBodyToEqual(response ,{ "request": {
        query: "news",
        itemsCount: 10,
        region: "de-DE",
        offset: 0,
        sortBy: "Created",
        sortOrder: "Desc",
        type: null,
        collection: null,
        language: "de",
        freshness: 0 }
      });
    });
  }

  test("Cancel filter and navigates to the corresponding page.", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("news");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible()
    await app.webPage.header.clickNewsSearchButton()
    await app.newsPage.item.expectNewsItemsToBeVisible()
    await app.newsPage.header.clickFiltersButton()
    await app.newsPage.filters.clickByDate()
    const oldResponse = await app.newsPage.filters.buttonMenu.clickPastDayAndGetResponse(process.env.API_URL)
    const newResponse =  await app.newsPage.header.clickFilterButtonAndGetResponse(process.env.API_URL)
    
    //Assert
    await app.expectHaveUrl(app.page, process.env.BASE_URL + "/en/news?query=news&region=de-DE");
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
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible()
    await app.webPage.header.clickNewsSearchButton()
    await app.newsPage.item.expectNewsItemsToBeVisible()
    await app.newsPage.header.clickFiltersButton()
    await app.newsPage.filters.clickByDate()

    //Assert
    await app.newsPage.filters.buttonMenu.expectDropdownToHaveText([
        "All","Past Day","Past Week","Past Month","Past Year"])
  });

  test("Check that dropdown of filter by date is opened", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible()
    await app.webPage.header.clickNewsSearchButton()
    await app.newsPage.item.expectNewsItemsToBeVisible()
    await app.newsPage.header.clickFiltersButton()
    await app.newsPage.filters.clickByDate()

    //Assert
    await app.newsPage.filters.expectByDateIsOpened()
    await app.newsPage.filters.clickByDate()
    await app.newsPage.filters.expectByDateIsClosed()
  });