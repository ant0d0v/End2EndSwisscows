import { test, expect} from "../../utils/fixtures.js";
import filterData from "../../data/filters/testData.json";
import { faker } from "@faker-js/faker";

for (const {
  testID,
  publisherPart,
  filterName,
  expectedPublisher,
} of filterData.publisher) {
  test(`${testID} Check search results by filter ${filterName} navigates to the corresponding URL and matches response results`, async ({
    app,
  }) => {
    const query = "news";
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(query);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.navigation.clickVideoTab();
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.filters.clickFilterBy("All publishers");
    const response = await app.videoPage.filters.selectMenu.selectFilterAndGetResponse({
        endpoint: "/v2/videos",
        locator: filterName,
      });
    await app.videoPage.item.expectVideoItemsToBeVisible();  

    //Assert
    await app.expectPageToHaveUrl(app.page,`${process.env.BASE_URL}/en/video?query=${
        query + publisherPart
      }`
    );
    await app.videoPage.item.expectItemsResponsePublisherToEqual(response, expectedPublisher);
  });
}

for (const { testID, freshnessPart, filterName, filter } of filterData.byDate) {
  test(`${testID} Check search results by filter ${filterName} navigates to the corresponding URL and matches response results`, async ({
    app,
  }) => {
    const randomQuery = faker.word.sample();
    //Actions
    await app.videoPage.open(`/video?query=${randomQuery}`)
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.filters.clickFilterBy("Any time");
    const response =
      await app.videoPage.filters.selectMenu.selectFilterAndGetResponse({
        endpoint: "/v2/videos",
        locator: filterName,
      });

    //Assert
    await app.expectPageToHaveUrl(app.page,`${process.env.BASE_URL}/en/video?query=${
        randomQuery+ freshnessPart
      }`
    );
    await app.api.search.response.expectBodyToEqual(response, {
      request: {
        query: randomQuery,
        itemsCount: 10,
        offset: 0,
        region: expect.any(String),
        freshness: filter,
      },
    });
  });
}

test("Check list dropdown of filter by date ", async ({ app }, testInfo) => {
  //Actions
  await app.videoPage.open(`/video?query=${faker.word.sample()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.filters.clickFilterBy("Any time");

  //Assert
  await app.videoPage.filters.selectMenu.takeSnapshot(testInfo);
});

test("Check list dropdown of filter publisher ", async ({ app }, testInfo) => {
  //Actions
  await app.videoPage.open(`/video?query=${faker.word.sample()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.filters.clickFilterBy("All publishers");

  //Assert
  await app.videoPage.filters.selectMenu.takeSnapshot(testInfo);
});

test("Check that dropdown of filter by publishers is opened", async ({
  app,
}) => {
  //Actions
  await app.videoPage.open(`/video?query=${faker.word.sample()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.filters.clickFilterBy("All publishers");

  //Assert
  await app.videoPage.filters.expectFilterAllPublisherIs("open");
  await app.webPage.filters.selectMenu.selectFilter("Vimeo");
  await app.videoPage.filters.expectFilterAllPublisherIs("closed");
});
