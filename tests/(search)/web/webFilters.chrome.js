import { test} from "../../../utils/fixtures";
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
  await app.webPage.filters.clickByDate();

  const response = await app.webPage.filters.buttonMenu.clickPastDayAndGetResponse("/v4/web/search?query=ronaldo")
  
  await app.webPage.expectHaveUrl(app.page, /query=ronaldo&region=de-DE&freshness=Day/);
  await app.webPage.item.expectDatePublishedForPastDayToEqual(response, expectedPastDay)
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
  await app.webPage.filters.clickByDate();

  const response = await app.webPage.filters.buttonMenu.clickPastMonthAndGetResponse("/v4/web/search?query=ronaldo")
  
  await app.webPage.expectHaveUrl(app.page, /query=ronaldo&region=de-DE&freshness=Month/);
  await app.webPage.item.expectDatePublishedForPastMonthToEqual(response, expectedPastMonth)
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
  await app.webPage.filters.clickByDate();

  const response = await app.webPage.filters.buttonMenu.clickPastYearAndGetResponse("/v4/web/search?query=ronaldo")
  
  await app.webPage.expectHaveUrl(app.page, /query=ronaldo&region=de-DE&freshness=Year/);
  await app.webPage.item.expectDatePublishedForPastYearToEqual(response, expectedPastYear)
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