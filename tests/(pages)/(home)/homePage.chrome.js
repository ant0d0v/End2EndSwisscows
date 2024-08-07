import { test } from "../../../utils/fixtures.js";
import constanta from "../../../data/project-constants/testData.json";
import main from "../../../data/home/testData.json";

test("Check that suggest is displayed", async ({ app }) => {
  await app.home.open();
  await app.home.reloadPage();
  await app.home.waitUntilPageIsFullyLoaded();
  await app.home.header.searchBar.inputSearchCriteria("ivanka");

  //Assert
  await app.home.header.searchBar.expectSuggestIsDisplayed();
  await app.home.header.searchBar.expectSuggestToHaveCount(5);
  await app.home.header.searchBar.expectSuggestToContains("ivanka");
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
    main.url.defaultSearchPage
  );
  await app.expectNewPageToHaveTitle(
    context,
    "Install Swisscows and use it as the default search"
  );
});

test("Check that popup google install Is Displayed", async ({ app }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";
  //Actions
  await app.home.open();

  //Assert
  await app.home.extensionPopup.expectPopupToBeVisible();
  await app.home.extensionPopup.expectPopupToHaveText(expectedText);
});

test('Check that popup "google install" redirect to the corresponding page', async ({
  app,
  context,
}) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.extensionPopup.expectToBeOpenedPageAfterClickPopup(
    main.url.extensionGoogleInstall
  );
  await app.expectNewPageToHaveTitle(context, /Swisscows/);
});

test.fixme(
  'Check that the "Install Google Block" button redirect to corresponding URL.',
  async ({ app, context }) => {
    //Actions
    await app.home.open();

    //Assert
    await app.home.extensionBlock.expectToBeOpenedPageAfterClickInstall(
      main.url.extensionGoogleInstall
    );
    await app.expectNewPageToHaveTitle(context, /Swisscows/);
  }
);

test("Check the texts of questions on the home page.", async ({ app }) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.faq.expectListSizeAnswerToQuestions(6);
  await app.home.faq.expectAnswersToHaveText(main.accordion.expectedAnswer);
});
for (const { testID, locatorId } of main.buttons) {
  test(`${testID} Check that button ${locatorId} to have color when hover`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.hoverButton(locatorId);

    //Assert
    await app.home.expectButtonToHaveColor(
      locatorId,
      "rgb(16, 24, 40) none repeat scroll 0% 0% / auto padding-box border-box"
    );
  });
}

test("Check design of the home page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.extensionPopup.clickCloseButtonInExtensionPopup();

  //Assert
  await app.home.takeSnapshot(testInfo);
});

test("Check design dark theme of the home page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickThemeDropdown();
  await app.home.header.hamburgerMenu.clickDarkTheme();
  await app.home.extensionPopup.clickCloseButtonInExtensionPopup();

  //Assert
  await app.home.takeSnapshot(testInfo);
});

for (const { testID, expectedLink, locatorId, expectedTitle } of main.buttons) {
  test(`${testID} Check that the ${locatorId} link navigate to the corresponding page.`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();

    //Assert
    await app.home.expectToBeOpenedNewPageAfterClick(
      app.home.linksOfServiceBlock(locatorId),
      expectedLink
    );
    await app.expectNewPageToHaveTitle(context, expectedTitle);
  });
}
