import { test } from "../../../utils/fixtures.js";

test("Check Cheapest first filter ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iPhone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  const response = await app.shoppingPage.filters.selectCheapestAndGetResponse("iPhone");
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const allPrice = await app.shoppingPage.item.getPriceAllItems();

  // Assert
  await app.shoppingPage.filters.expectListItemsFromCheapestToMostExpensive(allPrice);
  await app.api.search.response.expectBodyToEqual(response, {
    request: {
      query: "iPhone",
      itemsCount: 24,
      offset: 0,
      filters: {},
      region: "de-DE",
      sort: "PriceAsc",
    },
  });
});

test("Check Most expensive filter", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("shoes");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  const response = await app.shoppingPage.filters.selectMostExpensiveAndGetResponse("shoes");
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const allPrices = await app.shoppingPage.item.getPriceAllItems();

  // Assert
  await app.shoppingPage.filters.expectListItemsFromMostExpensiveToCheapest(allPrices);
  await app.api.search.response.expectBodyToEqual(response, {
    request: {
      query: "shoes",
      itemsCount: 24,
      offset: 0,
      filters: {},
      region: "de-DE",
      sort: "PriceDesc",
    },
  });
});
test(`Check select specific "brand" filter`, async ({ app }) => {
  const expectedInfo = {
    name: "MacBook",
    itemPricing: "€",
    itemLink: "See all offers",
    itemBrand: "Apple",
  };
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectMarken();
  await app.shoppingPage.filters.selectBrand(/Apple/);
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  // Assert
  await app.shoppingPage.item.expectDescriptionItemsNotToBeEmpty();
  await app.shoppingPage.item.expectInfoProductToContain(
    expectedInfo.name,
    expectedInfo.itemPricing,
    expectedInfo.itemLink,
    expectedInfo.itemBrand
  );
});
test(`Check select multiple filters specifics "brand" and "Most expensive"`, async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  const response = await app.shoppingPage.filters.selectMostExpensiveAndGetResponse("laptop");
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.filters.selectMarken();
  await app.shoppingPage.filters.selectBrand(/Apple/);
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const allPrices = await app.shoppingPage.item.getPriceAllItems();

  // Assert
  await app.shoppingPage.filters.expectListItemsFromMostExpensiveToCheapest(allPrices);
  await app.api.search.response.expectResponseToHaveStatusCode(response, 200);
  await app.shoppingPage.item.expectBrandProductToContain("Apple");
});

test("Check that filter is closed ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.expectFiltersPaneToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();

  // Assert
  await app.shoppingPage.filters.expectFiltersPaneToBeHidden();
});

test("Check scrolling to last filter", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.scrollToLastFilter();

  // Assert
  await app.shoppingPage.filters.expectLastFilterToBeVisible();
});

test("Check less and more buttons", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectMarken();
  await app.shoppingPage.filters.clickMore();

  // Assert
  await app.shoppingPage.filters.expectMarkenFilterToHaveCountItems(101);
  await app.shoppingPage.filters.clickLess();
  await app.shoppingPage.filters.expectMarkenFilterToHaveCountItems(11);
});
