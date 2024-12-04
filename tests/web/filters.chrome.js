import { test } from "../../utils/fixtures.js";
import { expect } from "@playwright/test";
import filterData from "../../data/filters/testData.json";
import { faker } from "@faker-js/faker";

for (const { testID, freshnessPart, filterName} of filterData.byDate) {
  test(`${testID} Check search results by filter ${filterName} navigates to the corresponding URL and matches response results`, async ({
    app,
  }) => {
    const query = "today"
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(query);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.filters.clickFilterByDate();
    const response =
      await app.webPage.filters.selectMenu.selectFilterAndGetResponse({
        endpoint: "/v4/web",
        locator: filterName,
      });
    await app.webPage.expectContentToBeVisible();  

    //Assert
    await app.expectPageToHaveUrl(app.page,`${process.env.BASE_URL}/en/web?query=${
        query + freshnessPart
      }`
    );
    await app.api.search.response.expectBodyToEqual(response, {
      context: {
        query: query,
        effectiveQuery: query,
        offset: 0,
        itemsCount: 10,
        locale: expect.any(String),
        spellcheck: true,
        adsIncluded: true
      },
      entities: [],
      items: expect.anything()
    });
  });
}

test("Cancel filter and navigates to the corresponding page.", async ({
  app,
}) => {
  const randomQuery = faker.word.sample();
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomQuery);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.filters.clickFilterByDate();
  const oldResponse =
    await app.webPage.filters.selectMenu.selectFilterAndGetResponse({
      endpoint: "/v4/web",
      locator: "Past Day",
    });
  await app.webPage.filters.clickFilterByDate();
  const newResponse =
    await app.webPage.filters.selectMenu.selectFilterAndGetResponse({
      endpoint: "/v4/web",
      locator: "Any time",
    });

  //Assert
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/web?query=${randomQuery}&region=de-DE`
  );
  await expect(oldResponse.json()).resolves.not.toEqual(newResponse.json());
});

test("Check list dropdown of filter by date ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.filters.clickFilterByDate();

  //Assert
  await app.webPage.filters.selectMenu.takeSnapshot(testInfo);
});

test("Check that dropdown of filter by date is opened and closed", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.filters.clickFilterByDate();

  //Assert
  await app.webPage.filters.expectFilterByDateIs("open");
  await app.webPage.filters.selectMenu.selectFilter("Past Year");
  await app.webPage.filters.expectFilterByDateIs("closed");
});
