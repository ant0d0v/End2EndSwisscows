import { test } from "../../utils/fixtures.js";
import constanta from "../../data/project-constants/testData.json";
import main from "../../data/home/testData.json";

test("Check that suggest is displayed", async ({ app }) => {
  await app.home.open();
  await app.home.reloadPage();
  await app.home.waitUntilPageIsFullyLoaded();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");

  //Assert
  await app.home.header.searchForm.expectSuggestIsDisplayed();
  await app.home.header.searchForm.expectSuggestToHaveCount(5);
  await app.home.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check that all questions were opened on the home page.", async ({
  app,
}) => {
  //Action
  await app.home.open();
  await app.home.scrollDownToQuestions();
  await app.home.clickAllQuestions();

  //Assert
  await app.home.faq.expectQuestionsAreOpened();
});

test("Check that a question and answer can be opened and closed on the home page.", async ({
  app,
}) => {
  //Action
  await app.home.open();
  await app.home.scrollDownToQuestions();
  await app.home.clickAllQuestions();
  await app.home.faq.expectQuestionsAreOpened();
  await app.home.clickAllQuestions();

  //Assert
  await app.home.faq.expectQuestionsAreClosed();
});

test("Check that the link in the fourth question leads to the expected URL.", async ({
  app,
  context,
}) => {
  //Action
  await app.home.open();
  await app.home.scrollDownToQuestions();
  await app.home.clickFourQuestion();

  //Assert
  await app.home.expectToBeOpenedNewPageAfterClick(
    app.home.linkInTheFourQuestion,
    main.url.defaultSearchPage
  );
  await app.expectNewPageToHaveTitle(
    context,
    "Install Swisscows and use it as the default search"
  );
});

test("Check the texts of questions on the home page.", async ({ app }) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.faq.expectListSizeAnswerToQuestions(6);
  await app.home.expectElementToHaveText(
    app.home.faq.answersToQuestions,
    main.accordion.expectedAnswer
  );
});

test.fixme("Check that buttons have hover over the services block on home page", async ({
  app,
}) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.expectColorsLinksWhenHovering(
    app.home.buttonOfServiceBlock,
    "color",
    constanta.RED
  );
});

test("Check design of the home page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  //Assert
  await app.home.takeSnapshot(testInfo);
});

test("Check design dark theme of the home page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.waitUntilPageIsFullyLoaded();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickThemeDropdown();
  await app.home.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.home.takeSnapshot(testInfo);
});
