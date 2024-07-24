import { test } from "../../../utils/fixtures.js";
import testData from "../../../data/error/testData.json";
const firstItemTitle = 1;
test.describe("Error pages in dark theme", () => {
  test.use({ colorScheme: "dark" });
  test("Check 202 no results error page ", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("././././");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo);
  });

  test("Check request is blocked 450 error page ", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("porn");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo);
  });

  test("Check 429 Too many requests", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 429);
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo);
  });

  test("Check 500 unknown Error Page", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 500);
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo);
  });
  test("Check 501 unsupported region", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.mockResponseStatusCode("/v4/web", 501);
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();

    //Assert
    await app.webPage.error.takeSnapshot(testInfo);
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
  await app.home.header.searchForm.inputSearchCriteria(query);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

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
  await app.home.header.searchForm.inputSearchCriteria("Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.item.expectWebItemsToContains("ukraine");
  await app.webPage.item.expectListToBeGreaterThanOrEqual(
    app.webPage.item.titles,
    6
  );
});

test("Check that web items date not to be empty", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.item.expectItemsDateNotToBeEmpty();
});

test("Check that items site not to be empty", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.item.expectItemsSiteNotToBeEmpty();
  await app.webPage.item.favicon.expectAllFaviconsToBeVisible();
});

test("Check that thumbnails to have height = 60 and width = 60", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.item.expectThumbnailsToHaveHeightAndWidth(60, 60);
  await app.webPage.item.expectThumbnailsToBeVisible();
});

test("Check titles to have css font and color", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.item.expectTitlesToHaveCSSFontSizeAndColor(
    "18px",
    "rgb(52, 64, 84)"
  );
});
test("Check next button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  const oldResult = await app.webPage.item.getTextContentWebItems();
  await app.webPage.pagination.clickNextButton();
  await app.webPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
  const newResult = await app.webPage.item.getTextContentWebItems();

  //Assert
  await app.webPage.item.expectOldArrayNotToEqualNewArray(oldResult, newResult);
  await app.webPage.pagination.expectPreviousButtonIsEnabled();
});

test("Check prev button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
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

test("Check open link in  the web result", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  const currentUrl = await app.page.url();
  console.log(currentUrl)
  await app.webPage.clickItemNumber(firstItemTitle);

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
});

test.skip("Check open web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.clickPreviewButton();

  //Assert
  await app.webPage.preview.expectScreenshotImageToBeVisible();
});

test.skip("Check close web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.clickPreviewButton();

  //Assert
  await app.webPage.preview.expectScreenshotImageToBeVisible();
  await app.webPage.preview.clickCloseButton();
  await app.webPage.preview.expectScreenshotImageToBeHidden();
});

test("Check click open site button in web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.clickPreviewButton();

  //Assert
  await app.webPage.preview.expectToBeOpenedNewPageAfterClickOpenSiteButton(
    /wikipedia.org/
  );
});

test.skip("Check open trackers in web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("google");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.clickPreviewButton();
  await app.webPage.preview.clickTrackersButton();

  //Assert
  await app.webPage.preview.expectListToBeGreaterThanOrEqual(
    app.webPage.preview.allTrackers,
    1
  );
});

test.skip("Check click screenshot button in web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("google");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.clickPreviewButton();
  await app.webPage.preview.clickTrackersButton();

  //Assert
  await app.webPage.preview.expectScreenshotImageToBeHidden();
  await app.webPage.preview.clickScreenshotButton();
  await app.webPage.preview.expectScreenshotImageToBeVisible();
});
