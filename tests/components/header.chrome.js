import { test } from "../../utils/fixturePages";
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
);

test("Clicking on the swisscows's logo leads to the main page.", async ({
  mainPage,
  headerStaticPages,
  header,
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickSwisscowsLogo();

  //Assert
  await mainPage.expectHaveUrl(mainPage.page, process.env.WEB_URL + "en");
  await mainPage.expectHaveTitle( mainPage.page, constantsData.TITLE_MAIN_PAGE );
});

test("Check query counter value when searching for images ", async ({
  headerStaticPages,
  header,
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickImageSearchButton();

  //Assert
  await header.searchCounter.expectCharitySearchCounterToHave("2");
});

test("Check query counter value when searching for video ", async ({
  headerStaticPages,
  header,
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickVideoSearchButton();

  //Assert
  await header.searchCounter.expectCharitySearchCounterToHave("2");
});

test("Check query counter value when searching for music", async ({
    headerStaticPages,
    header,
  }) => {
    //Actions
    await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
    await headerStaticPages.autocomplete.clickEnterSearchField();
    await header.clickMusicSearchButton();

    //Assert
    await header.searchCounter.expectCharitySearchCounterToHave("2");
  });


test("Check query counter value when searching for news", async ({
  header,
  headerStaticPages
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickHamburgerMenuButton();
  await header.hamburgerMenu.selectGermanyRegion();
  await header.clickNewsSearchButton();

  //Assert
  await header.searchCounter.expectCharitySearchCounterToHave("3");
});

test("Check query counter value when searching for shopping", async ({
  header,
  headerStaticPages,
  page
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickHamburgerMenuButton();
  await header.hamburgerMenu.selectGermanyRegion();
  await header.clickShoppingSearchButton();

  //Assert
  await header.searchCounter.expectCharitySearchCounterToHave("3");
});

  test("Check that email icon navigates to account/login page if user logged ", async({
    header,
    headerStaticPages, 
  }) => {
    //Actions
    await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
    await headerStaticPages.autocomplete.clickEnterSearchField();
    await header.searchCounter.expectCharitySearchCounterToHave("1");
    const newPage = await header.clickBadgeEmailAndNavigateToNewPage();

    //Assert
    await header.expectHaveUrl( newPage, new RegExp("/accounts.swisscows.com/login\\?ReturnUrl=.*"));
    await header.expectHaveTitle(newPage, /Login - Swisscows Accounts/);
  });

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  for (const { testID, expectedLink, locatorId, expectedTitle, } of data.headerLinks) {
    test(`${testID} Check that header badge ${locatorId} link navigate to corresponding pages`, async ({
      header,
      headerStaticPages,
    }) => {
      //Actions
      await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
      await headerStaticPages.autocomplete.clickEnterSearchField();
      await header.searchCounter.expectCharitySearchCounterToHave("1");
      const newPage = await header.clickLinkInHeaderAndNavigateToNewPage(locatorId);

      //Assert
      await header.expectHaveUrl(newPage, expectedLink);
      await header.expectHaveTitle(newPage, new RegExp(expectedTitle));
    });
  }
});

test("Check that display of heart icon message in the header", async ({
  header,
  headerStaticPages,
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.searchCounter.expectCharitySearchCounterToHave("1");
  await header.searchCounter.clickSearchCounter();

  //Assert
  await header.searchCounter.expectPopupCharitySearchCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});
