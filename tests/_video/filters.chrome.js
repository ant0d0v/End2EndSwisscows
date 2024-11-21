import { test, expect} from "../../utils/fixtures.js";
import filterData from "../../data/filters/testData.json";
import { faker } from "@faker-js/faker";

for (const {
  testID,
  publisherPart,
  fiterName,
  expectedPublisher,
} of filterData.publisher) {
  test.only(`${testID} Check search results by filter ${fiterName} navigates to the corresponding URL and matches response results`, async ({
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
        locator: fiterName,
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

for (const { testID, freshnessPart, fiterName, filter } of filterData.byDate) {
  test.only(`${testID} Check search results by filter ${fiterName} navigates to the corresponding URL and matches response results`, async ({
    app,
  }) => {
    const randomQuery = faker.word.sample();
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(randomQuery);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.navigation.clickVideoTab();
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.filters.clickFilterBy("Any time");
    const response =
      await app.videoPage.filters.selectMenu.selectFilterAndGetResponse({
        endpoint: "/v2/videos",
        locator: fiterName,
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

test.only("Check list dropdown of filter by date ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.filters.clickFilterBy("Any time");

  //Assert
  await app.videoPage.filters.selectMenu.takeSnapshot(testInfo);
});

test.only("Check list dropdown of filter publisher ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.filters.clickFilterBy("All publishers");

  //Assert
  await app.videoPage.filters.selectMenu.takeSnapshot(testInfo);
});

test.only("Check that dropdown of filter by publishers is opened", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.filters.clickFilterBy("All publishers");

  //Assert
  await app.videoPage.filters.expectFilterAllPublisherIs("open");
  await app.webPage.filters.selectMenu.selectFilter("Vimeo");
  await app.videoPage.filters.expectFilterAllPublisherIs("closed");
});
