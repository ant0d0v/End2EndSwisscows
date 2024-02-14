import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");

const filterData = JSON.parse(
  JSON.stringify(require("../../../data/filters/testData.json"))
);

for (const {testID,expectedWebLink,locatorId,responseWebUrl,filter } of filterData.byDate) {
    test(`${testID}  ${locatorId} filter navigates to the corresponding page.`, async ({
      home,
      webPage,
      page
    }) => {
      //Actions
      await home.header.clickHamburgerMenuButton();
      await home.header.hamburgerMenu.selectRegion("Germany");
      await home.header.searchForm.inputSearchCriteria("ronaldo");
      await home.header.searchForm.clickEnterSearchField();
      await webPage.item.expectWebItemsToBeVisible()
      await webPage.header.clickFiltersButton()
      await webPage.filters.buttonMenu.clickFilterByDate()
      const response = await webPage.filters.clickFilterInDropdownListAndGetResponse(locatorId,responseWebUrl)
      
      //Assert
      await webPage.expectHaveUrl(page, expectedWebLink);
      await expect(response.json()).resolves.toEqual(expect.objectContaining({ "request": {
        "query": "ronaldo",
        "itemsCount": 10,
        "offset": 0,
        "region": "de-DE",
        "freshness": filter
    },}));
    });
  }

  test("Cancel filter and navigates to the corresponding page.", async ({
    home,
    webPage,
    page
  }) => {
    //Actions
    await home.header.clickHamburgerMenuButton();
    await home.header.hamburgerMenu.selectRegion("Germany");
    await home.header.searchForm.inputSearchCriteria("ronaldo");
    await home.header.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickFiltersButton()
    await webPage.filters.buttonMenu.clickFilterByDate()
    const oldResponse = await webPage.filters.clickFilterInDropdownListAndGetResponse(
        filterData.byDate[0].locatorId, filterData.byDate[0].responseWebUrl)
    const newResponse =  await webPage.header.clickFilterButtonInAndGetResponse(
      "https://api.dev.swisscows.com/web/search?query=ronaldo&offset=0&itemsCount=10&region=de-DE&freshness=All"
    )   
    
    //Assert
    await webPage.expectHaveUrl(page, "https://dev.swisscows.com/en/web?query=ronaldo&region=de-DE");
    await expect(oldResponse.json()).resolves.not.toEqual(newResponse.json())
    await expect(newResponse.json()).resolves.toEqual(expect.objectContaining({ "request": {
      "query": "ronaldo",
      "itemsCount": 10,
      "offset": 0,
      "region": "de-DE",
      "freshness": "All"
  },}));
  });

  test("Check list dropdown of filter by date ", async ({
    home,
    webPage
  }) => {
    //Actions
    await home.header.clickHamburgerMenuButton();
    await home.header.hamburgerMenu.selectRegion("Germany");
    await home.header.searchForm.inputSearchCriteria("ronaldo");
    await home.header.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickFiltersButton()
    await webPage.filters.buttonMenu.clickFilterByDate()

    //Assert
    await webPage.filters.expectElementToHaveText( webPage.filters.dropdownOfFilterByDate,[
        "All","Past Day","Past Week","Past Month","Past Year"])
  });

  test("Check that dropdown of filter by date is opened", async ({
    home,
    webPage
  }) => {
    //Actions
    await home.header.clickHamburgerMenuButton();
    await home.header.hamburgerMenu.selectRegion("Germany");
    await home.header.searchForm.inputSearchCriteria("ronaldo");
    await home.header.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickFiltersButton()
    await webPage.filters.buttonMenu.clickFilterByDate()

    //Assert
    await webPage.filters.buttonMenu.expectAttributeClassOfElement( webPage.filters.buttonMenu.attributeFilterByDate, /open/)
  });