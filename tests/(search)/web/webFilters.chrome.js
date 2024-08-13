import { test } from "../../../utils/fixtures.js";
import { expect } from "@playwright/test";
import filterData from "../../../data/filters/testData.json";
import { faker } from "@faker-js/faker";

for (const { testID, freshnessPart, fiterName } of filterData.byDate) {
  test(`${testID} Check search results by filter ${fiterName} navigates to the corresponding URL and matches response results`, async ({
    app,
  }) => {
    const randomQuery = faker.word.sample();
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(randomQuery);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.filters.clickFilterByDate();
    const response =
      await app.webPage.filters.selectMenu.selectFilterAndGetResponse(
        fiterName
      );

    //Assert
    await app.expectPageToHaveUrl(
      app.page,
      `${process.env.BASE_URL}/en/web?query=${randomQuery + freshnessPart}`
    );
    await app.api.search.response.expectBodyToEqual(response, {
      context: {
        query: randomQuery,
        effectiveQuery: randomQuery,
        offset: 0,
        itemsCount: 10,
        locale: "en-CA",
        spellcheck: true,
      },
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
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.filters.clickFilterByDate();
  const oldResponse =
    await app.webPage.filters.selectMenu.selectFilterAndGetResponse("Past Day");
  await app.webPage.filters.clickFilterByDate();
  const newResponse =
    await app.webPage.filters.selectMenu.selectFilterAndGetResponse("Any time");

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
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.filters.clickFilterByDate();

  //Assert
  await app.webPage.filters.expectFilterByDateIs("open");
  await app.webPage.filters.selectMenu.selectFilter("Past Year");
  await app.webPage.filters.expectFilterByDateIs("closed");
});
