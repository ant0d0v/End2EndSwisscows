import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check 204 No Results Found error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, 204);
});

test("Check request is blocked 450 error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("porn");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, 450);
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseStatusCode("/shopping", 500);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, 500);
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseStatusCode("/shopping", 429);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, 429);
});

test("Check error region is unsupported", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickHamburgerMenuButton();
  await app.shoppingPage.header.hamburgerMenu.selectRegion("Ukraine");

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, 501);
});

test("Check info items { name, symbol price, link, brand}  ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter("Marken", /Apple/);
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectDescriptionItemsNotToBeEmpty();
  await app.shoppingPage.item.expectInfoProductToContain({
    name: "iPhone",
    pricing: "€",
    link: "See all offers",
    brand: "Apple"
  });
});

test("Check payments methods icon of products items ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.icon.expectPaymentIconToHaveWidthAndHeight(24);
  await app.shoppingPage.item.icon.expectListToBeGreaterThanOrEqual(
    app.shoppingPage.item.icon.paymentMethods,
    100
  );
  await app.shoppingPage.item.icon.expectAreElementsInListDisplayed(
    app.shoppingPage.item.icon.paymentMethods
  );
});

test("Check product images are visible and wight ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectProductImagesToBeVisible();
  await app.shoppingPage.item.expectProductMediaToHaveWidth(208);
});

test("Check next button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const oldSearchResult =
    await app.shoppingPage.item.getTextContentProductItems();
  await app.shoppingPage.pagination.clickNextButton();
  await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "3"
  );
  const newSearchResult =
    await app.shoppingPage.item.getTextContentProductItems();

  //Assert
  await app.shoppingPage.item.expectOldArrayNotToEqualNewArray(
    oldSearchResult,
    newSearchResult
  );
  await app.shoppingPage.item.expectItemsListToHaveCount(24);
  await app.shoppingPage.pagination.expectPreviousButtonIsEnabled();
});

test("Check prev button in the paging", async ({ app }) => {
  const randomQuery = faker.commerce.product();
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.pagination.clickNextButton();
  await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "3"
  );
  await app.shoppingPage.pagination.clickPrevButton();
  await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "4"
  );

  //Assert
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL +
      `/en/shopping?query=${randomQuery}&region=de-DE&offset=0`
  );
  await app.shoppingPage.item.expectItemsListToHaveCount(24);
  await app.shoppingPage.pagination.expectPreviousButtonIsDisabled();
});
