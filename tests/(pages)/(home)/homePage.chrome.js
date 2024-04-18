import { test, expect } from "../../../utils/fixtures";
const constanta = JSON.parse(
  JSON.stringify(require("../../../data/project-constants/testData.json"))
);
const main = JSON.parse(
  JSON.stringify(require("../../../data/home/testData.json"))
);

test("Check that suggest is displayed", async ({
  app
}) => {
  await app.home.open()
  await app.home.reloadPage();
  await app.home.waitUntilPageIsFullyLoaded();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  
  //Assert
  await app.home.header.searchForm.expectSuggestIsDisplayed();
  await app.home.header.searchForm.expectSuggestToHaveCount(5);
  await app.home.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check that all questions were opened on the home page.", async ({
  app
}) => {
  //Action
  await app.home.open()
  await app.home.scrollDownToQuestions()
  await app.home.clickAllQuestions();

  //Assert
  await app.home.faq.expectQuestionsAreOpened();
});

test("Check that a question and answer can be opened and closed on the home page.", async ({
  app
}) => {
  //Action
  await app.home.open()
  await app.home.scrollDownToQuestions()
  await app.home.clickAllQuestions();
  await app.home.faq.expectQuestionsAreOpened()
  await app.home.clickAllQuestions();

  //Assert
  await app.home.faq.expectQuestionsAreClosed();
});

test("Check that the link in the fourth question leads to the expected URL.", async ({
  app, context
}) => {
  //Action
  await app.home.open()
  await app.home.scrollDownToQuestions()
  await app.home.clickFourQuestion();

  //Assert
  await app.home.expectToBeOpenedNewPageAfterClick(
    app.home.linkInTheFourQuestion, main.url.defaultSearchPage)
    
  await app.defaultSearchPage.expectNewPageToHaveTitle(context, 
    "Install Swisscows and use it as the default search");
});

test("Check that popup google install Is Displayed", async ({ app }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";
  //Actions
  await app.home.open() 

  //Assert
  await app.home.installSwisscowsLink.expectExtensionPopupIsDisplayed();
  await app.home.installSwisscowsLink.expectTextExtensionPopup(expectedText);
});

test('Check that popup "google install" redirect to the corresponding page', async ({
  app, context
}) => {
  //Actions
  await app.home.open()
 
  //Assert
  await app.home.expectToBeOpenedNewPageAfterClick(
    app.home.installSwisscowsLink.extensionPopup, main.url.extensionGoogleInstall)

  await app.expectNewPageToHaveTitle(context, /Swisscows/)
});

test('Check that the "Install Google Block" button redirect to corresponding URL.', async ({
  app, context
}) => {
  //Actions
  await app.home.open()

  //Assert
  await app.home.expectToBeOpenedNewPageAfterClick(
    app.home.extensionBlock.extensionLink, main.url.extensionGoogleInstall)
    
  await app.expectNewPageToHaveTitle(context, /Swisscows/)
});

test("Check the texts of questions on the home page.", async ({ app }) => {
  //Actions
  await app.home.open()

  //Assert
  await app.home.faq.expectListSizeAnswerToQuestions(6);
  await app.home.expectElementToHaveText(app.home.faq.answersToQuestions, main.accordion.expectedAnswer);
});

test("Check that buttons have hover over the services block on home page", async ({
  app
}) => {
  //Actions
  await app.home.open()

  //Assert
  await app.home.expectColorsLinksWhenHovering(app.home.buttonOfServiceBlock, "color", constanta.RED);
});

test("Check design of the home page ", async ({ app },testInfo) => {
   //Actions
  await app.home.open()
  await app.home.installSwisscowsLink.clickCloseButtonInExtensionPopup();

  //Assert
  await app.home.expectScreenHome(testInfo);
});

test("Check design dark theme of the home page ", async ({
  app
},testInfo) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickThemeDropdown();
  await app. home.header.hamburgerMenu.clickDarkTheme();
  await app.home.installSwisscowsLink.clickCloseButtonInExtensionPopup();

  //Assert
  await app.home.expectScreenHome(testInfo);
});

for (const { testID, expectedLink, locatorId,expectedTitle,} of main.servicesBlockLinks) {
  test(`${testID} Check that the ${locatorId} link navigate to the corresponding page.`, async ({
    app,context
  }) => {
    //Actions
    await app.home.open()

    //Assert
    await app.home.expectToBeOpenedNewPageAfterClick(app.home.linksOfServiceBlock(locatorId), expectedLink)
    await app.expectNewPageToHaveTitle(context, expectedTitle)
  });
}
for (const { testID, expectedLink, locatorId, expectedTitle,} of main.languagesLinks) {
  test(`${testID} Check navigation to corresponding pages for  ${locatorId} localization`, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(locatorId);
    
    //Assert
    await app.home.expectHaveUrl(app.home.page, expectedLink);
    await app.home.expectHaveTitle(app.home.page, new RegExp(expectedTitle));
  });
}

