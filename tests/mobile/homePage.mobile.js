import { test } from "../../utils/fixtures.js";
import home from "../../data/home/testData.json";
import { faker } from "@faker-js/faker";

test("Check that suggest is displayed", async ({ app }) => {
  let randomQuery = faker.word.sample();

  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomQuery.toLocaleLowerCase());

  //Assert
  await app.home.header.searchForm.expectSuggestIsDisplayed();
  await app.home.header.searchForm.expectSuggestToHaveCount(5);
  await app.home.header.searchForm.expectSuggestToContains(randomQuery);
});

test("Check that all questions were opened on the home page.", async ({
  app,
}) => {
  //Action
  await app.home.open();
  await app.home.scrollDownToQuestions();
  await app.home.faq.clickAllQuestions();

  //Assert
  await app.home.faq.expectQuestionsAreOpened();
});

test("Check that a question and answer can be opened and closed on the home page.", async ({
  app,
}) => {
  //Action
  await app.home.open();
  await app.home.scrollDownToQuestions();
  await app.home.faq.clickAllQuestions();

  //Assert
  await app.home.faq.expectQuestionsAreOpened();
  await app.home.faq.clickAllQuestions();
  await app.home.faq.expectQuestionsAreClosed();
});

test("Check the texts of questions on the home page.", async ({ app }) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.faq.expectListSizeAnswerToQuestions(6);
  await app.home.faq.expectAnswersToHaveText(home.faq.expectedAnswer);
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
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.home.takeSnapshot(testInfo);
});
