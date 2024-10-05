import { test, expect } from "../../../utils/fixtures.js";
import { randomQueryWithVideoItemSearch } from "../../../helpers/random.js";
import { faker } from "@faker-js/faker";

test.describe("Error pages in dark theme", () => {
  test.use({ colorScheme: "dark" });
  test("Check No results error page", async ({ app }, testInfo) => {
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

  test("Check 404 Page Not Found ", async ({ app }, testInfo) => {
    //Actions
    await app.webPage.openNotFound("/web/123");

    //Assert
    await app.webPage.error.takeSnapshotNotFoundImage(testInfo);
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
  await app.webPage.webPageItem.expectResultsToBeGreaterThanOrEqual(8);
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

  test("Check titles to have css font and color", async ({ app }) => {
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
  await app.home.header.searchForm.inputSearchCriteria(
    faker.word.words({ count: { min: 2, max: 5 } })
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  const oldResult = await app.webPage.webPageItem.getTextContentWebItems();
  await app.webPage.pagination.clickNextButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
  const newResult = await app.webPage.webPageItem.getTextContentWebItems();

  //Assert
  await app.webPage.webPageItem.expectOldArrayNotToEqualNewArray(
    oldResult,
    newResult
  );
  await app.webPage.pagination.expectPreviousButtonIsEnabled();
});

test("Check prev button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.pagination.clickNextButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
  await app.webPage.pagination.clickPrevButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "3"
  );

  //Assert
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + "/en/web?query=ivanka&offset=0"
  );
  await app.webPage.pagination.expectPreviousButtonIsDisabled();
});
