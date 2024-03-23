import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");
import { getYesterdayDay, getPastMonth, getPastYear} from "../../../helpers/dataHelper";
const expectedPastDay = getYesterdayDay()
const expectedPastMonth = getPastMonth()
const expectedPastYear = getPastYear()

test("Check search results by filter Past day", async ({ app }) => {
  // Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickFiltersButton();
  await app.webPage.filters.buttonMenu.clickFilterByDate();

  const response = await app.webPage.filters.clickPastDayFilterAndGetResponse("/v4/web/search?query=ronaldo")
  
  await app.webPage.expectHaveUrl(app.page, /query=ronaldo&region=de-DE&freshness=Day/);
  await app.webPage.filters.expectDatePublishedForPastDayToEqual(response, expectedPastDay)
});

test("Check search results by filter Past month", async ({ app }) => {
  // Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickFiltersButton();
  await app.webPage.filters.buttonMenu.clickFilterByDate();

  const response = await app.webPage.filters.clickPastMonthFilterAndGetResponse("/v4/web/search?query=ronaldo")
  
  await app.webPage.expectHaveUrl(app.page, /query=ronaldo&region=de-DE&freshness=Month/);
  await app.webPage.filters.expectDatePublishedForPastMonthToEqual(response, expectedPastMonth)
});

test("Check search results by filter Past Year", async ({ app }) => {
  // Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickFiltersButton();
  await app.webPage.filters.buttonMenu.clickFilterByDate();

  const response = await app.webPage.filters.clickPastYearFilterAndGetResponse("/v4/web/search?query=ronaldo")
  
  await app.webPage.expectHaveUrl(app.page, /query=ronaldo&region=de-DE&freshness=Year/);
  await app.webPage.filters.expectDatePublishedForPastYearToEqual(response, expectedPastYear)
});

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
  await app.webPage.filters.buttonMenu.clickFilterByDate()

  //Assert
  await app.webPage.filters.buttonMenu.expectFilterByDateIsOpened()
  await app.webPage.filters.buttonMenu.clickFilterByDate()
  await app.webPage.filters.buttonMenu.expectFilterByDateIsClosed()
});