import { test } from "../../utils/fixtures.js";

test("Check  No Results Found error news page", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.newsPage.header.navigation.clickNewsTab();

  //Assert
  await app.newsPage.error.takeSnapshot(testInfo, {
    error: 204,
    name: "news",
  });
});

test("Check request is blocked 450 error page ", async ({ app },testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.newsPage.header.navigation.clickNewsTab();

  //Assert
  await app.newsPage.error.takeSnapshot(testInfo, {
    error: 450,
    name: "news",
  });
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.requestWithGivenResponseStatusCode("/news", 500);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.newsPage.header.navigation.clickNewsTab();

  //Assert
  await app.newsPage.error.takeSnapshot(testInfo, {
    error: 500,
    name: "news",
  });
});

test("Check 429 Too many requests", async ({ app }, testInfo ) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.requestWithGivenResponseStatusCode("/news", 429);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.newsPage.header.navigation.clickNewsTab();

  //Assert
  await app.newsPage.error.takeSnapshot(testInfo, {
    error: 429,
    name: "news",
  });
});

test("Check error region is unsupported", async ({ app }, testInfo ) => {
  //Actions
  await app.newsPage.open(`/news?query=football&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.header.clickHamburgerMenuButton();
  await app.newsPage.header.hamburgerMenu.selectRegion("Ukraine");

  //Assert
  await app.newsPage.error.takeSnapshot(testInfo, {
    error: 501,
    name: "news",
  });
});

test("Check design news page", async ({ app },testInfo) => {
  //Actions
  await app.route.requestWithGivenResponse("/news", 'data/mock/news/testData.json');
  await app.newsPage.open(`/news?query=ronaldo&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();

  //Assert
  await app.newsPage.takeSnapshot(testInfo);
});


test("Check search results in news page ", async ({ app }) => {
  //Actions
  await app.newsPage.open(`/news?query=ronaldo&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();

  //Assert
  await app.newsPage.item.expectImageItemsToBeVisible()
  await app.newsPage.item.expectNewsResultToHaveCount(10)
});

test("Check open page when clicking title of item", async ({ app }) => {
  //Actions
  await app.newsPage.open(`/news?query=ronaldo&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  const currentUrl = await app.page.url();
  await app.newsPage.item.clickTitleItemAt({ number: 1});

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
});

test("Check open page when clicking image of item", async ({ app }) => {
  //Actions
  await app.newsPage.open(`/news?query=ronaldo&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  const currentUrl = await app.page.url();
  await app.newsPage.item.clickImageItemAt({ number: 1 });

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
});

test("Check next button in the paging", async ({ app }) => {
  //Actions
  await app.newsPage.open(`/news?query=ukraine&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  const oldSearchResult = await app.newsPage.item.getTextContentNewsItems();
  await app.newsPage.pagination.clickNextButton();
  await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
  const newSearchResult = await app.newsPage.item.getTextContentNewsItems();

  //Assert
  await app.newsPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult);
  await app.newsPage.item.expectNewsResultToHaveCount(10);
  await app.newsPage.pagination.expectPreviousButtonIsEnabled();
});

test("Check prev button in the paging", async ({ app }) => {
  //Actions
  await app.newsPage.open(`/news?query=news&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.pagination.clickNextButton();
  await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
  await app.newsPage.pagination.clickPrevButton();
  await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");

  //Assert
  await app.expectPageToHaveUrl(app.page, process.env.BASE_URL + "/en/news?query=news&region=de-DE&offset=0");
  await app.newsPage.item.expectNewsResultToHaveCount(10);
  await app.newsPage.pagination.expectPreviousButtonIsDisabled();
});

test("Check that image of proxy cdn server", async ({ app }) => {
  //Actions
  await app.newsPage.open(`/news?query=Ukraine&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();

  //Assert
  await app.newsPage.item.expectAllImagesToHaveAttribute(/cdn.dev.swisscows.com/);
});

test("Check the info news article { site, description, date, title } in search result", async ({
  app,
}) => {
  //Actions
  await app.newsPage.open(`/news?query=news&region=de-DE`)
  await app.newsPage.item.expectNewsItemsToBeVisible();

  //Assert
  await app.newsPage.item.expectItemDescriptionNotToBeEmpty()
  await app.newsPage.item.expectNewsInfoToContain({
    title: /\w+/,
    site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
    date: /(\d+)\s*hours?\s+ago|yesterday|([A-Za-z]+\s+\d{1,2},\s+\d{4})/,
  });
});
