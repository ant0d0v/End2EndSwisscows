import { test } from "../../utils/fixtures.js";
import { expect } from "@playwright/test";
import filterData from "../../data/filters/testData.json";

for (const { testID, freshnessPart, filterName } of filterData.byDate) {
  test(`${testID}  ${filterName} filter navigates to the corresponding page.`, async ({
    app,
  }) => {
    //Actions
    await app.newsPage.open(`/news?query=news&region=de-DE`)
    await app.newsPage.item.expectNewsItemsToBeVisible();
    await app.newsPage.filters.clickFilterByDate();
    const response =
      await app.webPage.filters.selectMenu.selectFilterAndGetResponse({
        endpoint: "/news",
        locator: filterName,
      });

    //Assert
    // await app.expectPageToHaveUrl(
    //   app.page,
    //   `${process.env.BASE_URL}/en/news?query=news&region=de-DE${freshnessPart}`
    // );
    await app.api.search.response.expectBodyToEqual(response, {
      request: {
        query: "news",
        itemsCount: 10,
        region: "de-DE",
        offset: 0,
        sortBy: "Created",
        sortOrder: "Desc",
        type: null,
        collection: null,
        language: "de",
        freshness: 0,
      },
      items: expect.anything(),
      totalCount: expect.any(Number)
    });
  });
}

test("Cancel filter and navigates to the corresponding page.", async ({
  app,
}) => {
  //Actions
  await app.newsPage.open(`/news?query=news&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.filters.clickFilterByDate();
  const oldResponse =
    await app.newsPage.filters.selectMenu.selectFilterAndGetResponse({
      endpoint: "/news",
      locator: "Past Day",
    });
  await app.newsPage.filters.clickFilterByDate();
  const newResponse =
    await app.newsPage.filters.selectMenu.selectFilterAndGetResponse({
      endpoint: "/news",
      locator: "All",
    });

  //Assert
  // await app.expectPageToHaveUrl(
  //   app.page,
  //   process.env.BASE_URL + "/en/news?query=news&region=de-DE"
  // );
  await expect(oldResponse.json()).resolves.not.toEqual(newResponse.json())
});

test("Check list dropdown of filter by date ", async ({ app }, testInfo) => {
  //Actions
  await app.newsPage.open(`/news?query=news&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.filters.clickFilterByDate();

  //Assert
  await app.newsPage.filters.selectMenu.takeSnapshot(testInfo);
});

test("Check that dropdown of filter by date is opened and closed", async ({
  app,
}) => {
  //Actions
  await app.newsPage.open(`/news?query=news&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.filters.clickFilterByDate();

  //Assert
  await app.newsPage.filters.expectFilterByDateIs("open");
  await app.newsPage.filters.selectMenu.selectFilter("Past Year");
  await app.newsPage.filters.expectFilterByDateIs("closed");
});

