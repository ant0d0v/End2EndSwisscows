import { test } from "../../utils/fixtures.js";
import{ randomProduct } from "../../helpers/random.js"
import { faker } from "@faker-js/faker";

test("Check open product details pane", async ({ app }) => {
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
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeVisible();
});

test("Check close product details pane", async ({ app }) => {
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
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeVisible();
  await app.shoppingPage.details.clickCloseButton();
  await app.shoppingPage.details.expectDetailsPaneToBeHidden();
});

test("Check image in details pane ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsImageToBeVisible();
  await app.shoppingPage.details.expectProductMediaToHaveProperty({
    width: 320,
    height: 320,
  });
});

test("Check more button in detail", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.route.mockResponseBody("/shopping/products/", 'data/mock/shopping/details.json');
  await app.shoppingPage.item.selectProductAt({ number: 1 });
  await app.shoppingPage.details.clickMore();

  //Assert
  await app.shoppingPage.details.expectDescriptionToHaveAttribute(
    "description full"
  );
});

test("Check less button in detail", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.route.mockResponseBody("/shopping/products", 'data/mock/shopping/details.json');
  await app.shoppingPage.item.selectProductAt({ number: 1 });
  await app.shoppingPage.details.clickMore();
  await app.shoppingPage.details.clickLess();

  //Assert
  await app.shoppingPage.details.expectDescriptionToHaveAttribute(
    "description"
  );
});

test("Check offer info in detail", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeVisible();
  await app.shoppingPage.details.offer.expectOfferInfoToContain({
    siteName: /\w+/,
    pricing: /€\s*\d+(\.\d{1,2})?/,
    priceShipping: "shipping",
    availability: /\w+/,
  });
});

test("Check count of payments options", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectPaymentListToBeGreaterThanOrEqual(3);
  await app.shoppingPage.details.expectPaymentIconsToBeVisible();
});

test("Check count of Shipping options", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectShippingListToBeGreaterThanOrEqual(3);
});

test(`Check that the "Buy" button redirect to new page`, async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });
  const currentUrl = await app.page.url();
  await app.shoppingPage.details.offer.clickBuyButtonAt({ number: 1 });

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
});

test(`Check design product details`, async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(randomProduct());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.route.mockResponseBody("/shopping/products", 'data/mock/shopping/details.json');
  await app.shoppingPage.item.selectProductAt({ number: 1 });
  await app.shoppingPage.details.expectDetailsImageToBeVisible();

  //Assert
  await app.shoppingPage.details.takeSnapshot(testInfo);
});

test("Check  offer icons to be visible", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsImageToBeVisible();
  await app.shoppingPage.details.offer.expectTrustedIconsToBeVisible();
  await app.shoppingPage.details.offer.expectTrustedIconsToHaveProperty({
    width: 16,
    height: 16,
  });
});

test("Check  brand image to be visible and have property", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("laptop iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectBrandImageToBeVisible();
  await app.shoppingPage.details.expectBrandImageToHaveProperty({
    width: 17,
    height: 20,
  });
});
