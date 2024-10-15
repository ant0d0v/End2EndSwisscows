import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check Cheapest first filter ", async ({ app }) => {
  const randomQuery = faker.commerce.product();
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
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
      query: randomQuery,
      itemsCount: 24,
      offset: 0,
      filters: {},
      region: "de-DE",
      sort: "PriceAsc",
    },
  });
});

test("Check Most expensive filter", async ({ app }) => {
  const randomQuery = faker.commerce.product();
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
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
      query: randomQuery,
      itemsCount: 24,
      offset: 0,
      filters: {},
      region: "de-DE",
      sort: "PriceDesc",
    },
  });
});

test(`Check select specific "brand" filter`, async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter({
    name: "Marken",
    option: /Apple/,
  });
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  // Assert
  await app.shoppingPage.item.expectInfoProductToContain({
    name: "MacBook",
    pricing: "€",
    link: "See all offers",
    brand: "Apple",
  });
});

test(`Check select multiple filters specifics "brand" and "Most expensive"`, async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter({
    name: "Marken",
    option: /Apple/,
  });
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
  await app.home.header.searchForm.inputSearchCriteria(
    faker.commerce.product()
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
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
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.scrollToLastFilter();

  // Assert
  await app.shoppingPage.filters.expectLastFilterToBeVisible();
});

test("Check less and more buttons in filter", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.selectFilter({
    name: "Marken",
    option: /Apple/,
  });
  await app.shoppingPage.filters.clickMore();

  // Assert
  await app.shoppingPage.filters.expectMarkenFilterNotToHaveCountItems(11);
  await app.shoppingPage.filters.clickLess();
  await app.shoppingPage.filters.expectMarkenFilterToHaveCountItems(11);
});

test("Check design filter component", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickFiltersButton();
  await app.shoppingPage.filters.clickDropdownFilterBy({ name: "Kategorien" });

  // Assert
  await app.shoppingPage.filters.takeSnapshot(testInfo);
});
