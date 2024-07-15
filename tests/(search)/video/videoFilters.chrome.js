import { test} from "../../../utils/fixtures.js";
import filterData from "../../../data/filters/testData.json"

for (const {testID,expectedVideoURL,locatorId, expectedPublisher } of filterData.publisher) {
    test(`${testID} Check search results by filter ${locatorId} navigates to the corresponding URL and matches response results`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.searchForm.inputSearchCriteria("video");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.videoPage.header.clickVideoSearchButton()
      await app.videoPage.item.expectVideoItemsToBeVisible()
      await app.videoPage.header.clickFiltersButton()
      await app.videoPage.filters.clickPublisher()
      const response = await app.videoPage.filters.buttonMenu.clickMenuItemAndGetResponse(locatorId, "/v2/videos/search?query=video")
      
      //Assert
      await app.expectHaveUrl(app.page, expectedVideoURL);
      await app.videoPage.item.expectItemsResponsePublisherToEqual(response, expectedPublisher)
    });
  }

  for (const {testID,expectedVideoURL,locatorId, filter } of filterData.byDate) {
    test(`${testID} Check search results by filter ${locatorId} navigates to the corresponding URL and matches response results`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.selectRegion("Germany");
      await app.home.header.searchForm.inputSearchCriteria("video");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.videoPage.header.clickVideoSearchButton()
      await app.videoPage.item.expectVideoItemsToBeVisible()
      await app.videoPage.header.clickFiltersButton()
      await app.videoPage.filters.clickByDate()
      const response = await app.videoPage.filters.buttonMenu.clickMenuItemAndGetResponse(locatorId, "/v2/videos/search?query=video")
      
      //Assert
      await app.expectHaveUrl(app.page, expectedVideoURL);
      await app.api.search.response.expectBodyToEqual(response ,{ "request": {
        query: "video",
        itemsCount: 10,
        offset: 0,
        region: "de-DE",
        freshness: filter }
      });
    });
  }
  test("Check search results by filter Table view", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("video");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.header.clickFiltersButton()
    await app.videoPage.filters.clickView()
    await app.videoPage.filters.buttonMenu.clickMenuItemTableView()

    //Assert
    await app.videoPage.item.expectVideoResultsAreTiles()
    await app.videoPage.item.expectVideoItemsToBeVisible()
  });

  test("Check list dropdown of filter by date ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.header.clickFiltersButton()
    await app.videoPage.filters.clickByDate()

    //Assert
    await app.videoPage.filters.buttonMenu.expectDropdownToHaveText([
      "All","Past Day","Past Week","Past Month","Past Year"])
  });

  test("Check list dropdown of filter publisher ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.header.clickFiltersButton()
    await app.videoPage.filters.clickPublisher()

    //Assert
    await app.videoPage.filters.buttonMenu.expectDropdownToHaveText([
      "All","YouTube","Vimeo","DailyMotion"])
  });
  test("Check list dropdown of filter view", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.header.clickFiltersButton()
    await app.videoPage.filters.clickView()

    //Assert
    await app.videoPage.filters.buttonMenu.expectDropdownToHaveText([
      "List view", "Table view"])
  });

  test("Check that dropdown of filter by date is opened", async ({
   app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.header.clickFiltersButton()
    await app.videoPage.filters.clickByDate()

    //Assert
    await app.videoPage.filters.expectByDateIsOpened()
    await app.videoPage.filters.clickByDate()
    await app.videoPage.filters.expectByDateIsClosed()
  });