import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const main = JSON.parse(
  JSON.stringify(require("../../data/main-page/testData.json"))
);

test("Check that suggest is displayed", async ({
  mainPage
}) => {
  await mainPage.reloadPage();
  await mainPage.waitUntilPageIsFullyLoaded();
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);

  //Assert
  await mainPage.headerStaticPages.autocomplete.expectSuggestIsDisplayed();
  await mainPage.headerStaticPages.autocomplete.expectSuggestToHaveCount(5);
  await mainPage.headerStaticPages.autocomplete.expectSuggestToContains(
    testData.searchCriteria.first
  );
});

test("Check that all questions were opened on the main page.", async ({
  mainPage,
}) => {
  //Actions
  await mainPage.scrollDownToQuestions()
  await mainPage.clickAllQuestions();

  //Assert
  await mainPage.expectQuestionsAreOpened();
});

test("Check that a question and answer can be opened and closed on the main page.", async ({
  mainPage,
}) => {
  //Actions
  await mainPage.scrollDownToQuestions()
  await mainPage.clickAllQuestions();
  await mainPage.expectQuestionsAreOpened();
  await mainPage.clickAllQuestions();

  //Assert
  await mainPage.expectQuestionsAreClosed();
});

test("Check that the link in the fourth question leads to the expected URL.", async ({
  mainPage,
}) => {
  const expectedH1text = "How to use Swisscows as default search";
   //Actions
  await mainPage.scrollDownToQuestions()
  await mainPage.clickFourQuestion();
  const DefaultSearchPage = await mainPage.clickLinkInTheFourQuestionAndNavigateToDefaultSearchPage();
  
  //Assert
  await mainPage.expectHaveUrl( DefaultSearchPage, main.url.defaultSearchPage);
  await mainPage.expectH1Text(DefaultSearchPage, expectedH1text);
});

test("Check the texts of questions on the main page.", async ({ mainPage }) => {
  const expectedAnswers = [
    "Our anonymous search engine protects the privacy of our users when searching and from inappropriate content when finding it. We do not use cookies or other tracking technologies, with us each search query remains anonymous and each user a guest without a user profile.",
    "Protecting our users' data is an essential part of our DNA and thus a core promise of the anonymous search engine Swisscows. We do not store data, build search history or deliver ads based on collected data. Our technology is built in such a way that the storage of user data is not even possible.",
    "With us you are sure to find what you are looking for! Thanks to the cooperation of our anonymous search engine with Bing, as well as over 20 years of experience and research in the field of search technologies and a constant development, there are hardly any search requests that we cannot fulfill. The index-based country search and Swisscow's semantics ensure intelligent and fast finding.",
    "Switching is possible at any time. To use the anonymous search engine Swisscows as the default search engine in the browser (Chrome, Edge, Firefox, etc.), simply click on the link that appears below the search box and follow the browser-specific instructions. This is as simple and safe as searching with the anonymous search engine Swisscows.",
    "We earn money with search ads delivered by Bing. Swisscows has an exclusive cooperation agreement with Bing. These ads appear exclusively based on your own search query, which is submitted to Bing. The anonymous search engine Swisscows does not collect personal data and accordingly cannot transmit any data. From each click on an ad, Swisscows receives a share of the advertising revenue from Bing. In this way, we continue to invest in our technology and support social projects.",
    "Our vision is that every user can be online without fear of surveillance, annoying advertising and unwanted data storage. We have been working towards this goal for over 20 years. Fortunately, data security has now become a relevant topic and many people have understood what all happens to their data completely without their knowledge.We don't want to share our users' data, we want to value it. That's why we developed Swisscows, the anonymous search engine, and other products: • TeleGuard - our data secure messenger (WhatsApp alternative) • Swisscows - works like a firewall and also helps to visit websites anonymously • GetDigest - an AI-based program that helps summarize web content and text documents and quickly delivers the relevant information.Our growing team continues to develop and research innovations that protect users and their privacy on the World Wide Web.",
  ];

  //Assert
  await mainPage.expectListSizeAnswerToQuestions(6);
  await mainPage.expectElementToHaveText(mainPage.answersToQuestions, expectedAnswers);
});

test("Check that buttons have hover over the services block on main page", async ({
  mainPage,
}) => {
  const expectedColorWhenHovering = "rgb(223, 93, 93)";

  //Assert
  await mainPage.expectColorsLinksWhenHovering(mainPage.buttonOfServiceBlock, "color", expectedColorWhenHovering );
});

test("Check design of the main page ", async ({ mainPage },testInfo) => {

  //Assert
  await mainPage.expectScreenMainPage(testInfo);
});

test("Check design dark theme of the main page ", async ({
  mainPage
},testInfo) => {
  //Actions

  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await mainPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await mainPage.expectScreenMainPage(testInfo);
});
