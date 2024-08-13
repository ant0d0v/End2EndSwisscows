import { test, expect } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
const firstItemTitle = 1;
test.describe("Error pages in dark theme", () => {
  test.use({ colorScheme: "dark" });
  test("Check 202 no results error page ", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("././././");
    await app.home.header.searchBar.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, 202);
  });

  test("Check request is blocked 450 error page ", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("porn");
    await app.home.header.searchBar.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, 450);
  });

  test("Check 429 Too many requests", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 429);
    await app.home.header.searchBar.inputSearchCriteria("food");
    await app.home.header.searchBar.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, 429);
  });

  test("Check 500 unknown Error Page", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 500);
    await app.home.header.searchBar.inputSearchCriteria("food");
    await app.home.header.searchBar.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, 500);
  });

  test("Check 501 unsupported region", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 501);
    await app.home.header.searchBar.inputSearchCriteria("food");
    await app.home.header.searchBar.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo, 501);
  });

  test("Check 404 Page Not Found ", async ({ app }, testInfo) => {
    //Actions
    await app.webPage.openNotFound("/web/123");

    //Assert
    await app.webPage.error.takeSnapshot(testInfo);
  });
});

test("Check Did you mean message in the search field ", async ({ app }) => {
  const query = "appple";

  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria(query);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.alternateSearch.expectDidYouMeanMessageToHaveText(
    'Including results for "apple"' +
      "Do you want results only for " +
      query +
      "?"
  );
});

test("Check that web results equals search criteria ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Ukraine");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.expectItemsToContains("ukraine");
  await app.webPage.expectResultsToHaveCountItems(10);
});
test.describe("Web-page items", () => {
  test("Check that web items date not to be empty", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.webPageItem.expectItemsDateNotToBeEmpty();
  });

  test("Check that web-page item thumbnails to have height = 60 and width = 60", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.webPageItem.expectThumbnailsToBeVisible();
    await app.webPage.webPageItem.expectThumbnailsToHaveJSProperty({
      height: 60,
      width: 60,
    });
  });

  test("Check that web-page items site not to be empty", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.webPageItem.expectItemsSiteNotToBeEmpty();
    await app.webPage.webPageItem.favicon.expectAllFaviconsToBeVisible();
  });

  test("Check titles to have css font and color", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
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
    await app.home.header.searchBar.inputSearchCriteria(
      faker.word.words({ count: { min: 2, max: 5 } })
    );
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.webPageItem.clickTitleAtNumber(firstItemTitle);

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });
});

test.describe("Article items", () => {
  test("Check that author of the article item exists", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchBar.inputSearchCriteria("article ukraine war");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.article.expectArticleItemsToBeVisible();

    //Assert
    await app.webPage.article.expectArticleAuthorNotToBeEmpty();
  });

  test("Check that article item thumbnails to have height = 60 and width = 60 ", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchBar.inputSearchCriteria("article ukraine war");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.article.expectArticleItemsToBeVisible();

    //Assert
    await app.webPage.article.expectThumbnailsToBeVisible();
    await app.webPage.article.expectThumbnailsToHaveJSProperty({
      height: 60,
      width: 60,
    });
  });

  test("Check that article items site not to be empty", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("article ukraine war");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.article.expectArticleItemsToBeVisible();

    //Assert
    await app.webPage.article.expectItemsSiteNotToBeEmpty();
    await app.webPage.article.favicon.expectAllFaviconsToBeVisible();
  });
});

test.describe("Video object items", () => {
  test("Check that video object item thumbnails to have height = 64 and width = 86", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("iphone video youtube");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.videoObject.expectVideoObjectItemsToBeVisible();

    //Assert
    await app.webPage.videoObject.expectThumbnailsToBeVisible();
    await app.webPage.videoObject.expectThumbnailsToHaveJSProperty({
      height: 64,
      width: 86,
    });
  });
});

test("Check that loader skeleton", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();

  //Assert
  await app.webPage.skeleton.takeSnapshot(testInfo);
});

test("Check next button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("ukraine");
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria("ivanka");
  await app.home.header.searchBar.clickEnterSearchField();
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
