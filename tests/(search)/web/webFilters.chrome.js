import { test} from "../../../utils/fixtures";
const { expect } = require("@playwright/test");
const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);
for (const {testID, expectedWebURL, locatorId} of filterData.byDate) {
  test(`${testID} Check search results by filter ${locatorId} navigates to the corresponding URL and matches response results`, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible()
    await app.webPage.header.clickFiltersButton()
    await app.webPage.filters.clickByDate()
    const response = await app.webPage.filters.buttonMenu.clickMenuItemAndGetResponse(locatorId, "/v4/web/search?query=ronaldo")
    
    //Assert
    await app.webPage.expectHaveUrl(app.page, expectedWebURL);
    await app.api.search.response.expectBodyToEqual(response , { "context": {
      query: "ronaldo",
      effectiveQuery: "ronaldo",
      offset: 0,
      itemsCount: 10,
      locale: "en-CA",      
      spellcheck: true }
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
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible()
  await app.webPage.header.clickFiltersButton()
  await app.webPage.filters.clickByDate()
  const oldResponse = await app.webPage.filters.buttonMenu.clickPastDayAndGetResponse("/v4/web/search?query=ronaldo")
  const newResponse =  await app.webPage.header.clickFilterButtonAndGetResponse("/v4/web/search?query=ronaldo")   
  
  //Assert
  await app.webPage.expectHaveUrl(app.page,  process.env.BASE_URL + "/en/web?query=ronaldo&region=de-DE");
  await expect(oldResponse.json()).resolves.not.toEqual(newResponse.json())
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
  await app.webPage.header.clickFiltersButton()
  await app.webPage.filters.clickByDate()

  //Assert
  await app.webPage.filters.buttonMenu.expectDropdownToHaveText(
    ["All","Past Day","Past Week","Past Month","Past Year"])
});

test("Check that dropdown of filter by date is opened and closed", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible()
  await app.webPage.header.clickFiltersButton()
  await app.webPage.filters.clickByDate()

  //Assert
  await app.webPage.filters.expectByDateIsOpened()
  await app.webPage.filters.clickByDate()
  await app.webPage.filters.expectByDateIsClosed()
});