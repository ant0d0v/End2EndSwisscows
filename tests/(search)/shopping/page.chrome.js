import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check 204 No Results Found error shopping page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, {
    error: 204,
    name: "shopping",
  });
});

test("Check request is blocked 450 error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, {
    error: 450,
    name: "shopping",
  });
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseStatusCode("/shopping", 500);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, {
    error: 500,
    name: "shopping",
  });
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseStatusCode("/shopping", 429);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, {
    error: 429,
    name: "shopping",
  });
});

test("Check error region is unsupported", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(
    faker.commerce.product()
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickHamburgerMenuButton();
  await app.shoppingPage.header.hamburgerMenu.selectRegion("Ukraine");

  //Assert
  await app.shoppingPage.error.takeSnapshot(testInfo, {
    error: 501,
    name: "shopping",
  });
});

test("Check design shopping page", async ({ app },testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseBody("/shopping", 'data/mock/shopping/testData.json');
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.takeSnapshot(testInfo);
});

test("Check info items { name, symbol price, link, brand}  ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(
    faker.commerce.product()
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectInfoProductToContain({
    name: /\w+/,
    pricing: "€",
    link: "See all offers",
    brand: /\w+/,
  });
});

test("Check payments methods icon of products items ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(
    faker.commerce.product()
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectPaymentIconToHaveProperty({
    width: 24,
    height: 24,
  });
  await app.shoppingPage.item.expectPaymentIconToBeVisible();
  await app.shoppingPage.item.expectPaymentIconsToBeGreaterThan(100);
});

test("Check product images are visible and wight ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(
    faker.commerce.product()
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectProductImagesToBeVisible();
  await app.shoppingPage.item.expectProductMediaToHaveProperty({
    width: 211,
    height: 140,
  });
});

test("Check next button in the paging", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(
    faker.commerce.product()
  );
  await app.home.header.searchForm.clickEnterSearchField();
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
  await app.home.header.searchForm.inputSearchCriteria(randomQuery);
  await app.home.header.searchForm.clickEnterSearchField();
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
