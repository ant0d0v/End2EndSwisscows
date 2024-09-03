import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
import home from "../../../data/home/testData.json";

test("Check that suggest is displayed", async ({ app }) => {
  let randomQuery = faker.word.sample();

  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomQuery);

  //Assert
  await app.home.header.searchForm.expectSuggestIsDisplayed();
  await app.home.header.searchForm.expectSuggestToHaveCount(5);
  await app.home.header.searchForm.expectSuggestToContains(randomQuery);
});

test("Check that all questions were opened on the home page ", async ({
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

test("Check that the link in the fourth question leads to the expected URL.", async ({
  app,
  context,
}) => {
  //Action
  await app.home.open();
  await app.home.scrollDownToQuestions();
  await app.home.faq.clickFourQuestion();

  //Assert
  await app.home.faq.expectToBeOpenedPageAfterClickInstructionsLink(
    home.url.defaultSearchPage
  );
  await app.expectNewPageToHaveTitle(
    context,
    "Install Swisscows and use it as the default search"
  );
});

test("Check that popup google install Is Displayed", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.header.extensionPopup.takeSnapshot(testInfo);
});

test('Check that popup "google install" redirect to the corresponding page', async ({
  app,
  context,
}) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.header.extensionPopup.expectToBeOpenedPageAfterClickPopup(
    home.url.extensionGoogleInstall
  );
  await app.expectNewPageToHaveTitle(context, /Swisscows/);
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
  await app.home.header.extensionPopup.clickCloseButtonInExtensionPopup();

  //Assert
  await app.home.takeSnapshot(testInfo);
});

test("Check design dark theme of the home page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectTheme("Dark");
  await app.home.header.extensionPopup.clickCloseButtonInExtensionPopup();

  //Assert
  await app.home.takeSnapshot(testInfo);
});

for (const { testID, link, name, expectedTitle } of home.links) {
  test(`${testID} Check that the ${name} link navigate to the corresponding page.`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();

    //Assert
    await app.home.expectToBeOpenedNewPageAfterClickLinks({
      locator: name,
      expected: link,
    });
    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}
