import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check open product details pane", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria("adidas");
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
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
  await app.home.header.searchBar.inputSearchCriteria(faker.commerce.product());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
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
  await app.home.header.searchBar.inputSearchCriteria("adidas");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeVisible();
  await app.shoppingPage.details.offer.expectPriceNotToBeEmpty();
  await app.shoppingPage.details.offer.expectNameNotToBeEmpty();
  await app.shoppingPage.details.offer.expectOfferInfoToContain({
    name: "€",
    priceShipping:"shipping"
  });
});

test("Check count of payments options", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("adidas");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectPaymentListToBeGreaterThanOrEqual(3);
  await app.shoppingPage.details.icon.expectPaymentIconDetailsToBeVisible();
});

test("Check count of Shipping options", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("adidas");
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria("iphone");
  await app.home.header.searchBar.clickEnterSearchField();
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

test(`Check design "Buy" button`, async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.offer.takeSnapshot(testInfo, { buttonNumber: 1 });
});


test("Check  offer icons to be visible", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectDetailsImageToBeVisible();
  await app.shoppingPage.details.offer.icon.expectTrustedIconsToBeVisible();
  await app.shoppingPage.details.offer.icon.expectTrustedIconsToHaveProperty({
    width: 16,
    height: 16
  });
});

test("Check  brand image to be visible and have property", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("adidas");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.navigation.clickShoppingTab();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.selectProductAt({ number: 1 });

  //Assert
  await app.shoppingPage.details.expectBrandImageToBeVisible();
  await app.shoppingPage.details.expectBrandImageToHaveProperty({
    width: 30,
    height: 20,
  });
});
