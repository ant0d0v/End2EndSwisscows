import { test, expect } from "../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
import { readCsvFile } from "../../helpers/csvHelper.js";
test.describe("Widget video", () => {
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

  test("Check that video  item { site, title } ", async ({ app }) => {
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
});

test.describe("Widget news", () => {
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

  test("Check that article item { site, title }", async ({ app }) => {
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
});

test.describe("Widget faq", () => {
  test("Check design widget faq", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.route.requestWithGivenResponse("/v4/web", "data/mock/web/faqWidget.json");
    await app.home.header.searchForm.inputSearchCriteria("questions phone");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.faq.takeSnapshot(testInfo);
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

  test("Check info { qustions and answers } in widget faq", async ({ app }) => {
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
});

test.describe("Widget infobox", () => {
  test("Check design of infobox Person", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.route.requestWithGivenResponse("/v4/web","data/mock/web/infoboxPerson.json");
    await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.adsFreePopup.closePopup()

    //Assert
    await app.webPage.infobox.takeSnapshot(testInfo);
  });

  test("Check design of infobox Movie", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.route.requestWithGivenResponse("/v4/web","data/mock/web/infoboxMovie.json");
    await app.home.header.searchForm.inputSearchCriteria("Dune");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.adsFreePopup.closePopup()

    //Assert
    await app.webPage.infobox.expectParticipantsImageToHavePropetry({
      width: 64,
      height: 64,
      complete: true
    });
    await app.webPage.infobox.takeSnapshot(testInfo);
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

  test("Check info { title, subtitle, description, site } in infobox person", async ({
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
    await app.webPage.infobox.expectImageToBeVisible();
    await app.webPage.infobox.expectInfoboxToContain({
      title: /\w+/,
      subtitle: /\w+/,
      description: /\w+/,
      site: "www.cristianoronaldo.com",
    });
  });

  test("Check info { title, subtitle, description, site, rate } in infobox movie", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("dune 2");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.expectImageToBeVisible();
    await app.webPage.infobox.expectInfoboxToContain({
      title: /\w+/,
      subtitle: /\w+/,
      description: /\w+/,
      site: "www.dunemovie.net",
      rate: /9/
    });
  });

  test("Check info { title, subtitle, description, site, rate } in infobox City", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("london");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.expectImageToBeVisible();
    await app.webPage.infobox.expectInfoboxToContain({
      title: /\w+/,
      subtitle: /\w+/,
      description: /\w+/,
      site: /\w+/
    });
  });

  test("Check info { title, subtitle, description, site, rate } in infobox company", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("apple");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.expectImageToBeVisible();
    await app.webPage.infobox.expectInfoboxToContain({
      title: /\w+/,
      subtitle: /\w+/,
      description: /\w+/,
      site: "apple.com"
    });
  });

  test("Check list profiles in infobox person", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.expectListProfilesToHaveCount(7);
  });

  test("Check list participants in infobox movie", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("dune 2");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.infobox.expectListParticipantsToHaveCount(5);
  });


  test("Check info properties { property-value and property-name } in infobox person", async ({
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

  test("Open page when clicking  on  profile in infobox person", async ({
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

  test("Open page when clicking  on participan in infobox movie", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("dune 2");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    const currentUrl = await app.page.url();
    await app.webPage.infobox.clickParticipantAt({ number: 1 });

    //Assert
    await app.expectPageNotToHaveUrl(app.page, currentUrl);
  });

  test("Open page when clicking  on site in infobox widget", async ({
    app,
  }) => {
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
    test("Check design of infobox widget dark theme", async ({
      app,
    }, testInfo) => {
      //Actions
      await app.home.open();
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.selectRegion("Germany");
      await app.home.header.searchForm.inputSearchCriteria("Cristiano Ronaldo");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
      await app.webPage.adsFreePopup.closePopup()

      //Assert
      await app.webPage.infobox.takeSnapshot(testInfo);
    });
  });
});

test.describe("Widget summary", () => {
  test("Check summary widget is displayed  when clicking ai button", async ({
    app,
  }) => {
    //Actions
    await app.webPage.open(`/web?query=${faker.word.sample()}`)
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });

    //Assert
    await app.webPage.webPageItem.summary.expectWidgetToBeVisible();
  });

  test("Check summary widget is hidden when the ai button is clicked twice", async ({
    app,
  }) => {
    //Actions
    await app.webPage.open(`/web?query=${faker.word.sample()}`);
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });
    await app.webPage.webPageItem.summary.expectWidgetToBeVisible();
    await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });

    //Assert
    await app.webPage.webPageItem.summary.expectWidgetToBeHidden();
  });

  test("Check all statuses while waiting, writing and finishing ", async ({
    app,
  }) => {
    //Actions
    await app.webPage.open(`/web?query=${faker.word.sample()}`)
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });

    //Assert
    await app.webPage.webPageItem.summary.expectStutusToHaveText(
      "Analyzing web-page..."
    );
    await app.webPage.webPageItem.summary.expectStutusToHaveText(
      "Producing output..."
    );
    await app.webPage.webPageItem.summary.expectStutusToHaveText("Ready");
  });

  test("Check design summary widget", async ({ app }, testInfo) => {
    //Actions
    await app.webPage.open(`/web?query=${faker.word.sample()}`)
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.route.requestWithGivenResponseTypeText(
      "/ai/summary",
      "data/mock/web/summary.text"
    );
    await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });
    await app.webPage.adsFreePopup.closePopup()

    //Assert
    await app.webPage.webPageItem.summary.expectStutusToHaveText("Ready");
    await app.webPage.webPageItem.summary.takeSnapshot(testInfo);
  });

  test("Check summary widget content when AI_Error_NoContent ", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.route.requestWithGivenResponse("/v4/web", 'data/mock/web/summaryData.json');
    await app.home.header.searchForm.inputSearchCriteria("site:twitter.com");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });

    //Assert
    await app.webPage.webPageItem.summary.expectSummaryTextToContain(
      "Unfortunately, the content of the page could not be read." +
        " Probably, the site requires the user to perform certain actions in order to access the page," +
        " such as authorization, agreement to the terms of use, etc."
    );
  });

  test("Check summary widget content to have 3 paragraphs", async ({ app }) => {
    //Actions
    await app.webPage.open(`/web?query=${faker.word.sample()}`)
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
    const text = await app.webPage.webPageItem.getResponseAfterClickAiButtonAt({
      number: 1,
    });

    //Assert
    await app.webPage.webPageItem.summary.expectTextToHaveCountParagraphs({
      response: text,
      paragraphCount: 3,
    });
  });

  const summary = readCsvFile("../data/locales/summary.csv");
  for (const { test_case, language, expected_content, isoCode } of summary) {
    test.describe("use config locale", () => {
      test.use({ locale: isoCode });
      test(`${test_case} Check text content of summary widget for  ${language} localization`, async ({
        app,
      }) => {
        //Actions
        await app.webPage.open("/web?query=swisscows")
        await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
        await app.webPage.webPageItem.clickAiButtonAt({ number: 1 });

        //Assert
        await app.webPage.webPageItem.summary.expectSummaryTextToContain(
          expected_content
        );
      });
    });
  }
});
