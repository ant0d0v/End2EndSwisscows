import { test, expect } from "../../../utils/fixtures.js";
import { randomQueryWithVideoItemSearch } from "../../../helpers/random.js";
import { faker } from "@faker-js/faker";

test.describe("Error pages in dark theme", () => {
  test.use({ colorScheme: "dark" });
  test("Check No results error web page", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("././././");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, {
      error: 204,
      name: "web"
    });
  });

  test("Check request is blocked 450 error page ", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("porn");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, {
      error: 450,
      name: "web"
    });
  });

  test("Check 429 Too many requests", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 429);
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, {
      error: 429,
      name: "web"
    });
  });

  test("Check 500 unknown Error Page", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 500);
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, {
      error: 500,
      name: "web"
    });
  });

  test("Check 501 unsupported region", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 501);
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, {
      error: 501,
      name: "web"
    });
  });

  test("Check 404 Page Not Found", async ({ app }, testInfo) => {
    //Actions
    await app.openNotFoundPage("/web/123");

    //Assert
    await app.webPage.takeSnapshot(testInfo);
  });
});

test("Check Did you mean message in the search field ", async ({ app }) => {
  const query = "smasung";

  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(query);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.alternateSearch.expectDidYouMeanMessageToHaveText(
    'Including results for "samsung"' +
      "Do you want results only for " +
      query +
      "?"
  );
});
test("Check that web results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wikipedia");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.webPageItem.expectItemsToContains("wiki");
  await app.webPage.expectResultsToBeGreaterThanOrEqual(8)
});

test("Check design web page", async ({ app },testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseBody("/v4/web", 'data/mock/web/testData.json');
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.takeSnapshot(testInfo);
});

test.describe("Web-page items", () => {
  test("Check  web items { date, site, title, description }", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.webPageItem.expectItemsDescriptionNotToBeEmpty();
    await app.webPage.webPageItem.expectItemInfoToContain({
      title: /\w+/,
      site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
      date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
    });
  });

  test("Check that web-page item thumbnails to have height = 60 and width = 60", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.webPageItem.expectThumbnailsToBeVisible();
    await app.webPage.webPageItem.expectThumbnailsToHaveJSProperty({
      height: 60,
      width: 60,
    });
  });

  test.skip("Check titles to have css font and color", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.webPageItem.expectTitlesToHaveCSS({
      size: "18px",
      color: "rgb(52, 64, 84)",
    });
  });

  test("Check open link in  the web result", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(
      faker.word.words({ count: { min: 2, max: 5 } })
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.webPageItem.clickTitleAt({ number: 1 });

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });
});

test.describe("Article items", () => {
  test("Check that article items {date, site, title, description, author}", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("article ukraine war");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.article.expectArticleItemsToBeVisible();

    //Assert
    await app.webPage.article.expectItemsDescriptionNotToBeEmpty();
    await app.webPage.article.expectItemInfoToContain({
      author: /\w+/,
      title: /\w+/,
      site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
      date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
    });
  });

  test("Check that article item thumbnails to have height = 60 and width = 60 ", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("article ukraine war");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.article.expectArticleItemsToBeVisible();

    //Assert
    await app.webPage.article.expectThumbnailsToBeVisible();
    await app.webPage.article.expectThumbnailsToHaveJSProperty({
      height: 60,
      width: 60,
    });
  });

  test("Check open new page when clicking image of article item", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("article ukraine war");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.article.expectArticleItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.article.clickImageAt({ number: 1 });

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });
});

test.describe("Video object items", () => {
  test("Check that video object item thumbnails to have height = 64 and width = 86", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria(
      randomQueryWithVideoItemSearch()
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.videoObject.expectVideoObjectItemsToBeVisible();

    //Assert
    await app.webPage.videoObject.expectThumbnailsToBeVisible();
    await app.webPage.videoObject.expectThumbnailsToHaveJSProperty({
      height: 64,
      width: 86,
    });
  });
  test("Check that video object item {date, site, title, description}", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria(
      randomQueryWithVideoItemSearch()
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.videoObject.expectVideoObjectItemsToBeVisible();

    //Assert
    await app.webPage.videoObject.expectItemsDescriptionNotToBeEmpty();
    await app.webPage.videoObject.expectItemInfoToContain({
      title: /\w+/,
      site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
      date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
    });
  });
  test("Check open new page when clicking image of video object item", async ({ app }) => {
    //Actions
    await app.home.open();
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria(
       randomQueryWithVideoItemSearch()
     );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.videoObject.expectVideoObjectItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.videoObject.clickImageAt({ number: 1 });

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });
});

test.describe("Book items", () => {
  test("Check that book item thumbnails to have height = 60 and width = 60", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Harry Potter and the Sorcerer’s Stone | Goodreads");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.book.expectBookItemsToBeVisible();

    //Assert
    await app.webPage.book.expectThumbnailsToBeVisible();
    await app.webPage.book.expectThumbnailsToHaveJSProperty({
      height: 60,
      width: 60,
    });
  });
  test("Check that place item { title, author, description, rate, site }", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Harry Potter and the Sorcerer’s Stone | Goodreads");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.book.expectBookItemsToBeVisible();

    //Assert
    await app.webPage.book.expectItemInfoToContain({
      title: /\w+/,
      author: /\w+/,
      description: /\w+/,
      rate: /4./,
      site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
    });
  });
  test("Check open new page when clicking image of book item", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Harry Potter and the Sorcerer’s Stone | Goodreads");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.book.expectBookItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.book.clickImageAt({ number: 1 });

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });

  test("Check design stars icon of book item", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Harry Potter and the Sorcerer’s Stone | Goodreads");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.book.expectBookItemsToBeVisible();

    //Assert
    await app.webPage.book.takeSnapshotStarsIcons(testInfo);
  });
});

test.describe("Place items", () => {
  test("Check that place item thumbnails to have height = 60 and width = 60", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Hotel Malte Astotel");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.place.expectPlaceItemsToBeVisible();

    //Assert
    await app.webPage.place.expectThumbnailsToBeVisible();
    await app.webPage.place.expectThumbnailsToHaveJSProperty({
      height: 60,
      width: 60,
    });
  });
  test("Check that place item { title, address, description, site }", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Hotel Malte Astotel");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.place.expectPlaceItemsToBeVisible();

    //Assert
    await app.webPage.place.expectItemInfoToContain({
      title: /\w+/,
      address: /Paris|rue de Richelieu/i,
      description: /\w+/,
      site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
    });
  });
  test("Check open new page when clicking image of place item", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Hotel Malte Astotel");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.place.expectPlaceItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.place.clickImageAt({ number: 1 });

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });

  test("Check design pin marker icon of place item", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Hotel Malte Astotel");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.place.expectPlaceItemsToBeVisible();

    //Assert
    await app.webPage.place.takeSnapshotPinMarkerIcon(testInfo);
  });

  test("Check design preview icon of place item", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Hotel Malte Astotel");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.place.expectPlaceItemsToBeVisible();

    //Assert
    await app.webPage.place.takeSnapshotPreviewIcon(testInfo);
  });
});

test("Check that loader skeleton", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();

  //Assert
  await app.webPage.skeleton.takeSnapshot(testInfo);
});

test("Check next button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("news");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.scrollToLastItem()
  await app.webPage.expectContentToBeVisible();
  await app.webPage.pagination.clickNextButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
  const response = await app.webPage.scrollToLastItemAndGetResponse({ endpoint: "/v4/web" })
  await app.webPage.expectContentToBeVisible();

  //Assert
  await app.api.search.response.expectBodyToEqual(response, {
    context: {
      query: "news",
      effectiveQuery: "news",
      offset: 30,
      itemsCount: 10,
      locale: expect.any(String),
      spellcheck: true,
    },
    entities: [],
    items: expect.anything()
  });
  await app.webPage.expectResultsToBeGreaterThanOrEqual(15)
  await app.webPage.pagination.expectPreviousButtonIsEnabled();
});

test("Check prev button in the paging", async ({ app }) => {
  const randomQuery = faker.word.sample();
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomQuery);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.scrollToLastItem()
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.pagination.clickNextButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
  await app.webPage.webPageItem.scrollToLastItem()
  await app.expectPageToHaveUrl(app.page, process.env.BASE_URL + `/en/web?query=${randomQuery}&offset=20`);
  await app.webPage.pagination.clickPrevButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("5");
  const response = await app.webPage.scrollToLastItemAndGetResponse({ endpoint: "/v4/web" })
  await app.webPage.expectContentToBeVisible();

  //Assert
  await app.api.search.response.expectBodyToEqual(response, {
    context: {
      query: randomQuery,
      effectiveQuery: randomQuery,
      offset: 10,
      itemsCount: 10,
      locale: expect.any(String),
      spellcheck: true,
    },
    entities: [],
    items: expect.anything()
  });
  await app.expectPageToHaveUrl(app.page, process.env.BASE_URL + `/en/web?query=${randomQuery}&offset=0`);
  await app.webPage.pagination.expectPreviousButtonIsDisabled();
});

test("Check request when scrolling to last element on page", async ({ app }) => {
  const randomQuery = faker.word.sample();

  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomQuery);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.expectContentToBeVisible();
  const response = await app.webPage.scrollToLastItemAndGetResponse({ endpoint: "/v4/web" })
  await app.webPage.expectContentToBeVisible();
 

  //Assert
  await app.api.search.response.expectBodyToEqual(response, {
    context: {
      query: randomQuery,
      effectiveQuery: randomQuery,
      offset: 10,
      itemsCount: 10,
      locale: expect.any(String),
      spellcheck: true,
    },
    entities: [],
    items: expect.anything()
  });
  await app.webPage.expectResultsToBeGreaterThanOrEqual(15)
});