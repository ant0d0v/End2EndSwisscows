import { test } from "../../../utils/fixtures.js";

test("Check Cheapest first filter ", async ({ app }) => {
  const query = "iPhone";
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(query);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  const response = await app.shoppingPage.filters.selectFilterAndGetResponse(
    "Cheapest first"
  );
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const allPrice = await app.shoppingPage.item.getPriceAllItems();

  // Assert
  await app.shoppingPage.filters.expectListItemsFromCheapestToMostExpensive(
    allPrice
  );
  await app.api.search.response.expectBodyToEqual(response, {
    request: {
      query: query,
      itemsCount: 24,
      offset: 0,
      filters: {},
      region: "de-DE",
      sort: "PriceAsc",
    },
  });
});

test("Check Most expensive filter", async ({ app }) => {
  const query = "shoes";
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(query);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  const response = await app.shoppingPage.filters.selectFilterAndGetResponse(
    "Most expensive first"
  );
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const allPrices = await app.shoppingPage.item.getPriceAllItems();

  // Assert
  await app.shoppingPage.filters.expectListItemsFromMostExpensiveToCheapest(
    allPrices
  );
  await app.api.search.response.expectBodyToEqual(response, {
    request: {
      query: query,
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
  await app.home.header.searchBar.inputSearchCriteria("laptop");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter("Marken", /Apple/);
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
  await app.home.header.searchBar.inputSearchCriteria("laptop");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter("Marken", /Apple/);
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const response = await app.shoppingPage.filters.selectFilterAndGetResponse(
    "Most expensive first"
  );
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  const allPrices = await app.shoppingPage.item.getPriceAllItems();

  // Assert
  await app.shoppingPage.filters.expectListItemsFromMostExpensiveToCheapest(
    allPrices
  );
  await app.api.search.response.expectResponseToHaveStatusCode(response, 200);
  await app.shoppingPage.item.expectBrandProductToContain("Apple");
});

test("Check that filter is closed ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("laptop");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
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
  await app.home.header.searchBar.inputSearchCriteria("laptop");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.scrollToLastFilter();

  // Assert
  await app.shoppingPage.filters.expectLastFilterToBeVisible();
});

test("Check less and more buttons", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("laptop");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter("Marken", /Apple/);
  await app.shoppingPage.filters.clickMore();

  // Assert
  await app.shoppingPage.filters.expectMarkenFilterToHaveCountItems(100);
  await app.shoppingPage.filters.clickLess();
  await app.shoppingPage.filters.expectMarkenFilterToHaveCountItems(11);
});
