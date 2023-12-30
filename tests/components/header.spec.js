import { test } from "../../utils/fixturePages";
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);

test("Clicking on the swisscows's logo leads to the main page.", async ({
  mainPage,
  headerStaticPages,
  header,
}) => {
  //Actions
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await header.clickSwisscowsLogo();

  //Assert
  await mainPage.expectHaveUrl(mainPage.page, process.env.WEB_URL + "en");
  await mainPage.expectHaveTitle(
    mainPage.page,
    "Your private and anonymous search engine Swisscows"
  );
});

test("Check query counter value when searching for images ", async ({
  headerStaticPages,
  header,
}) => {
  //Actions
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await header.clickImageSearchButton();

  //Assert
  await header.headerStaticPages.expectCharitySearchCounterToHave("2");
});

test("Check query counter value when searching for video ", async ({
  headerStaticPages,
  header,
}) => {
  //Actions
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await header.clickVideoSearchButton();

  //Assert
  await header.headerStaticPages.expectCharitySearchCounterToHave("2");
});

test("Check query counter value when searching for music", async ({
    headerStaticPages,
    header,
  }) => {
    //Actions
    await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
    await headerStaticPages.clickEnterSearchField();
    await header.clickMusicSearchButton();

    //Assert
    await header.headerStaticPages.expectCharitySearchCounterToHave("2");
  });


test("Check query counter value when searching for news", async ({
  header,
  headerStaticPages,
  hamburgerMenu,
}) => {
  //Actions
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await header.clickHamburgerMenuButton();
  await hamburgerMenu.selectGermanyRegion();
  await header.clickNewsSearchButton();

  //Assert
  await header.headerStaticPages.expectCharitySearchCounterToHave("3");
});

test("Check query counter value when searching for shopping", async ({
  header,
  headerStaticPages,
  hamburgerMenu,
}) => {
  //Actions
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await header.clickHamburgerMenuButton();
  await hamburgerMenu.selectGermanyRegion();
  await header.clickShoppingSearchButton();

  //Assert
  await header.headerStaticPages.expectCharitySearchCounterToHave("3");
});

  test("Check that email icon navigates to account/login page if user logged ", async({
    header,
    headerStaticPages, 
  }) => {
    //Actions
    await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
    await headerStaticPages.clickEnterSearchField();
    await header.headerStaticPages.expectCharitySearchCounterToHave("1");
    const newPage = await header.headerStaticPages.clickBadgeEmailAndNavigateToNewPage();

    //Assert
    await header.expectHaveUrl(
      newPage,
      new RegExp("/accounts.swisscows.com/login\\?ReturnUrl=.*")
    );
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
      await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
      await headerStaticPages.clickEnterSearchField();
      await header.headerStaticPages.expectCharitySearchCounterToHave("1");
      const newPage = await header.headerStaticPages.clickLinkInHeaderAndNavigateToNewPage(locatorId);

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
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await header.headerStaticPages.expectCharitySearchCounterToHave("1");
  await header.headerStaticPages.clickSearchCounter();

  //Assert
  await header.headerStaticPages.expectPopupCharitySearchCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});
