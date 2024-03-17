import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");

const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);

for (const {testID, expectedWebLink, locatorId, filter} of filterData.byDate) {
  test(`${testID} ${locatorId} filter navigates to the corresponding page.`, async ({
    app
  }) => {
    // Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible()
    await app.webPage.header.clickFiltersButton()
    await app.webPage.filters.buttonMenu.clickFilterByDate()
    const response = await app.webPage.filters.clickFilterInDropdownListAndGetResponse(locatorId, "/v4/web/search?query=ronaldo")
    
    // Assert
    await app.webPage.expectHaveUrl(app.page, expectedWebLink);
    await expect(response.json()).resolves.toMatchObject({
      request: expect.objectContaining({
        query: "ronaldo",
        itemsCount: 10,
        locale: "de-DE",
        freshness: filter,
        includeAds: true,
        spellcheck: true,
        referer: expect.stringContaining(`freshness=${filter}`)
      }),
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
    await app.webPage.filters.buttonMenu.clickFilterByDate()
    const oldResponse = await app.webPage.filters.clickPastDayFilterAndGetResponse("/v4/web/search?query=ronaldo")
    const newResponse =  await app.webPage.header.clickFilterButtonAndGetResponse("/v4/web/search?query=ronaldo")   
    
    //Assert
    await app.webPage.expectHaveUrl(app.page,  process.env.BASE_URL + "/en/web?query=ronaldo&region=de-DE");
    await expect(oldResponse.json()).resolves.not.toEqual(newResponse.json())
    await expect(newResponse.json()).resolves.toMatchObject({
      request: expect.objectContaining({
        query: "ronaldo",
        itemsCount: 10,
        locale: "de-DE",
        freshness: "All",
        includeAds: true,
        spellcheck: true,
        referer: expect.stringContaining("/web?query=ronaldo&region=de-DE")
      }),
    });
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
    await app.webPage.filters.buttonMenu.clickFilterByDate()

    //Assert
    await app.webPage.filters.expectFilterByDateDropdownToHaveText(
      ["All","Past Day","Past Week","Past Month","Past Year"])
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
    await app.webPage.header.clickFiltersButton()
    await app.webPage.filters.buttonMenu.clickFilterByDate()

    //Assert
    await app.webPage.filters.buttonMenu.expectFilterByDateIsOpened()
  });