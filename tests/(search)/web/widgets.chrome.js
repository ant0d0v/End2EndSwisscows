import { test } from "../../../utils/fixtures.js";

test("Check next and prev buttons in the video widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("parfums");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();
  await app.webPage.videoCollection.clickNextButton();
  //Assert
  await app.webPage.videoCollection.expectToHaveAttributeSlideAt({
    number: 2,
    attribute: /active/,
  });
  await app.webPage.videoCollection.clickPrevButton();
  await app.webPage.videoCollection.expectToHaveAttributeSlideAt({
    number: 1,
    attribute: /active/,
  });
});

test("Check the width and visibility of images in the video widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.videoCollection.expectAllImagesToBeVisible();
  await app.webPage.videoCollection.expectImagesToHaveProperty({
    width: 240,
    height: 135,
  });
});

test("Check click more button in the video widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();
  await app.webPage.videoCollection.clickMoreVideosButton();

  //Assert
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + "/en/video?query=iphone&region=de-DE"
  );
  await app.expectHaveTitle(app.page, "Videos for iphone - Swisscows");
});

test("Check that open video in the video widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.videoCollection.expectToBeOpenedNewPageAfterClickImageAt({
    number: 1,
    expectedUrl: /www.youtube.com/,
  });
});

test("Check design widget video header componet", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.videoCollection.takeSnapshotWidgetHeader(testInfo);
});

test("Check the design error icon of video object", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.videoCollection.takeSnapshotErrorIconAt(testInfo, {
    number: 1,
  });
});

test("Check that video  item {site, title}", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.videoCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.videoCollection.expectVideoInfoToContain({
    title: /\w+/,
    site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
  });
});

test("Check next and prev buttons in the news widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.newsCollection.waitUntilWidgetToBeVisible();
  await app.webPage.newsCollection.clickNextButton();
  //Assert
  await app.webPage.newsCollection.expectToHaveAttributeSlideAt({
    number: 2,
    attribute: /active/,
  });
  await app.webPage.newsCollection.clickPrevButton();
  await app.webPage.newsCollection.expectToHaveAttributeSlideAt({
    number: 1,
    attribute: /active/,
  });
});

test("Check that open new page when clicking title in news widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  const currentUrl = await app.page.url();
  await app.webPage.newsCollection.waitUntilWidgetToBeVisible();
  const newPage =
    await app.webPage.newsCollection.navigateToNewPageWhenClickingTitleAt({
      number: 1,
    });

  //Assert
  await app.expectPageNotToHaveUrl(newPage, currentUrl);
});

test("Check design widget news header componet", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.newsCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.newsCollection.takeSnapshotWidgetHeader(testInfo);
});

test("Check that article item {site, title}", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("news");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.newsCollection.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.newsCollection.expectArticleDescriptionNotToBeEmpty();
  await app.webPage.newsCollection.expectArticleInfoToContain({
    title: /\w+/,
    date: /(\d+)\s*(?:hours?|minutes?)\s+ago/,
  });
});

test("Check design widget faq header componet", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("questions phone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.faq.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.faq.takeSnapshotWidgetHeader(testInfo);
});

test("Check design chevron-down icon", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("questions phone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.faq.waitUntilWidgetToBeVisible();

  //Assert
  await app.webPage.faq.takeSnapshotChevronIconAt(testInfo, { number: 1 });
});

test("Check design chevron-up icon", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("questions phone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.faq.waitUntilWidgetToBeVisible();
  await app.webPage.faq.clickAllQuestions();

  //Assert
  await app.webPage.faq.takeSnapshotChevronIconAt(testInfo, { number: 1 });
});

test("Check that all questions were opened in the widget faq", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("questions phone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.faq.waitUntilWidgetToBeVisible();
  await app.webPage.faq.clickAllQuestions();

  //Assert
  await app.webPage.faq.expectQuestionsToHaveAttribute({ attribute: /open/ });
});

test("Check that question and answer can be opened and closed in the widget faq", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("questions phone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.faq.waitUntilWidgetToBeVisible();
  await app.webPage.faq.clickAllQuestions();

  //Assert
  await app.webPage.faq.expectQuestionsToHaveAttribute({ attribute: /open/ });
  await app.webPage.faq.clickAllQuestions();
  await app.webPage.faq.expectQuestionsToHaveAttribute({ attribute: "qa" });
});

test("Check info {qustions and answers} in widget faq", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("questions phone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.faq.waitUntilWidgetToBeVisible();
  await app.webPage.faq.clickAllQuestions();

  //Assert
  await app.webPage.faq.expectQaInfoToContain({
    question: /\w+/,
    answer: /\w+/,
  });
});

test("Check design header of infobox widget", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.infobox.expectImageToBeVisible();
  await app.webPage.infobox.takeSnapshot(testInfo);
});

test("Check design footer of infobox widget", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.infobox.takeSnapshotFooter(testInfo);
});

test("Check design read more button of infobox widget", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.infobox.takeSnapshotReadMoreButton(testInfo);
});

test("Check design expend button of infobox widget when button isn't active", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.infobox.takeSnapshotExpandButton(testInfo);
});

test("Check design expend button of infobox widget when button is active", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.infobox.clickExpandButton();

  //Assert
  await app.webPage.infobox.takeSnapshotExpandButton(testInfo);
});

test("Check open page wiki when clicking read more button in infobox widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  const currentUrl = await app.page.url();
  await app.webPage.infobox.clickReadMoreButton();

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
});

test("Check info {description and site} in infobox widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.infobox.expectInfoboxToContain({
    description: /\w+/,
    site: "www.cristianoronaldo.com",
  });
});

test("Check info properties { property-value and property-name } in infobox widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.infobox.clickExpandButton();

  //Assert
  await app.webPage.infobox.expectPropertiesNameAndValueNotToBeEmpty();
});

test("Open page when clicking  on  profile in infobox widget", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.infobox.expectToBeOpenedPageAfterSelectProfileBy({
    name: "www.youtube.com",
    url: "https://www.youtube.com/@cristiano",
  });
});

test("Open page when clicking  on site in infobox widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.infobox.clickSiteLink();

  //Assert
  await app.expectPageToHaveUrl(
    app.page,
    "https://www.cristianoronaldo.com/#cr7"
  );
});

test("Check open and close properties in infobox widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.infobox.expectPropertiesToHave({ hidden: true });
  await app.webPage.infobox.clickExpandButton();

  //Assert
  await app.webPage.infobox.expectPropertiesToHave({ hidden: false });
});

test.describe("components in dark theme", () => {
  test.use({ colorScheme: "dark" });
  test("Check design footer of infobox widget dark theme", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.takeSnapshotFooter(testInfo);
  });

  test("Check design header of infobox widget dark theme", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.takeSnapshot(testInfo);
  });
});
