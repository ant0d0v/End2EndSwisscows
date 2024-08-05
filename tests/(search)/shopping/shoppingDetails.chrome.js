import { test } from "../../../utils/fixtures.js";
const body = "data/shopping/mock_data.json" 

test("Check open product details pane", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)

  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeVisible()
});

test("Check close product details pane", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
  await app.shoppingPage.details.clickCloseButton()

  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeHidden()
});

test("Check image in details pane ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
 
  //Assert
  await app.shoppingPage.details.expectDetailsImageToBeVisible()
  await app.shoppingPage.details.expectMediaToHaveWidth(320);
});

test("Check more button in detail", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
  await app.shoppingPage.details.clickMore()
 
  //Assert
  await app.shoppingPage.details.expectDescriptionToHaveAttribute("description full")
});

test("Check less button in detail", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
  await app.shoppingPage.details.clickMore()
  await app.shoppingPage.details.clickLess()
 
  //Assert
  await app.shoppingPage.details.expectDescriptionToHaveAttribute("description")
});

test("Check offer info in detail", async ({ app }) => {
  const expectedInfo = {
    pricing: "€",
    priceShipping: "shipping",
  };
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
 
  //Assert
  await app.shoppingPage.details.expectDetailsPaneToBeVisible();
  await app.shoppingPage.details.offer.expectPriceNotToBeEmpty()
  await app.shoppingPage.details.offer.expectNameNotToBeEmpty()
  await app.shoppingPage.details.offer.expectOfferInfoToContain(
    expectedInfo.pricing,
    expectedInfo.priceShipping,
  )
});

test("Check count of payments options", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)

  //Assert
  await app.shoppingPage.details.expectPaymentListToBeGreaterThanOrEqual(3)
  await app.shoppingPage.details.icon.expectPaymentIconDetailsToBeVisible()
});

test("Check count of Shipping options", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
   
  //Assert
  await app.shoppingPage.details.expectShippingListToBeGreaterThanOrEqual(3)
});

test(`Check that the "Buy" button redirect to new page`, async ({ app}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
  const currentUrl = await app.page.url()
  await app.shoppingPage.details.offer.clickBuyButton(1)

  //Assert 
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
});
test("Check  offer icons to be visible" , async ({ app}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.item.openProductDetailsByItem(1)
  
  //Assert 
  await app.shoppingPage.details.expectDetailsImageToBeVisible()
  await app.shoppingPage.details.offer.icon.expectOfferIconsDetailsToBeVisible()
});