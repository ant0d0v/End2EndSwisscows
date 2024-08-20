import { test } from "../../utils/fixtures.js";
import constantsData from "../../data/project-constants/testData.json";
import { faker } from "@faker-js/faker";

test("Clicking on the swisscows's logo leads to the home page.", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickSwisscowsLogo();

  //Assert
  await app.expectPageToHaveUrl(app.page, constantsData.URL_MAIN_PAGE);
  await app.expectHaveTitle(app.page, constantsData.TITLE_MAIN_PAGE);
});

test("Check query counter value when searching for images ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test("Check query counter value when searching for video ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test("Check query counter value when searching for music", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test("Check query counter value when searching for news", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("news");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.newsPage.header.navigation.clickNewsTab();

  //Assert
  await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "3"
  );
});

test("Check query counter value when searching for shopping", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.shoppingPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test.describe("test use cookie", () => {
  test("Check that email badge navigates to account/login page if user logged ", async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeEmail.badge,
      constantsData.URL_LOGIN_PAGE
    );

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_LOGIN_PAGE);
  });
});

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test(`Check that email badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeEmail.badge,
      constantsData.URL_EMAIL_PAGE
    );

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_EMAIL_PAGE);
  });

  test(`Check that Teleguard badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeTeleguard.badge,
      constantsData.URL_TELEGUARD_PAGE
    );

    await app.expectNewPageToHaveTitle(
      context,
      constantsData.TITLE_TELEGUARD_PAGE
    );
  });

  test(`Check that vpn badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeVPN.badge,
      constantsData.URL_VPN_PAGE
    );

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_VPN_PAGE);
  });
});

test("Check design of popup badge counter", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickBadgeCounter();

  //Assert
  await app.webPage.header.badgeCounter.takeSnapshot(testInfo);
});

test("Check suggest on the web search", async ({ app }) => {
  let randomQuery = faker.word.sample();
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(
    randomQuery.toLocaleLowerCase()
  );
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.searchBar.clickSearchField();

  //Assert
  await app.webPage.header.searchBar.expectSuggestIsDisplayed();
  await app.webPage.header.searchBar.expectSuggestToHaveCount(5);
  await app.webPage.header.searchBar.expectSuggestToContains(
    randomQuery.toLocaleLowerCase()
  );
});

test("Check suggest on the image search", async ({ app }) => {
  let randomQuery = faker.word.sample();
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(
    randomQuery.toLocaleLowerCase()
  );
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.header.searchBar.clickSearchField();

  //Assert
  await app.imagePage.header.searchBar.expectSuggestIsDisplayed();
  await app.imagePage.header.searchBar.expectSuggestToHaveCount(5);
  await app.imagePage.header.searchBar.expectSuggestToContains(
    randomQuery.toLocaleLowerCase()
  );
});

test("Check suggest on the video search", async ({ app }) => {
  let randomQuery = faker.word.sample();
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(
    randomQuery.toLocaleLowerCase()
  );
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.header.searchBar.clickSearchField();

  //Assert
  await app.videoPage.header.searchBar.expectSuggestIsDisplayed();
  await app.videoPage.header.searchBar.expectSuggestToHaveCount(5);
  await app.videoPage.header.searchBar.expectSuggestToContains(
    randomQuery.toLocaleLowerCase()
  );
});

test("Check suggest on the news search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("ukraine");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickNewsTab();
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.header.searchBar.clickSearchField();

  //Assert
  await app.newsPage.header.searchBar.expectSuggestIsDisplayed();
  await app.newsPage.header.searchBar.expectSuggestToHaveCount(5);
  await app.newsPage.header.searchBar.expectSuggestToContains("ukraine");
});

test("Check suggest on the shopping search", async ({ app }) => {
  let randomQuery = faker.commerce.product();
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery.toLocaleLowerCase());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.searchBar.clickSearchField();

  //Assert
  await app.shoppingPage.header.searchBar.expectSuggestIsDisplayed();
  await app.shoppingPage.header.searchBar.expectSuggestToHaveCount(5);
  await app.shoppingPage.header.searchBar.expectSuggestToContains(
    randomQuery.toLocaleLowerCase()
  );
});

test("Check suggest on the music search", async ({ app }) => {
  let randomQuery = faker.music.songName();
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery.toLocaleLowerCase());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.header.searchBar.clickSearchField();

  //Assert
  await app.musicPage.header.searchBar.expectSuggestIsDisplayed();
  await app.musicPage.header.searchBar.expectSuggestToHaveCount(5);
  await app.musicPage.header.searchBar.expectSuggestToContains(randomQuery.toLocaleLowerCase());
});

test("Check design of header component the search pages", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("A");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

  //Assert
  await app.webPage.header.takeSnapshot(testInfo);
});
