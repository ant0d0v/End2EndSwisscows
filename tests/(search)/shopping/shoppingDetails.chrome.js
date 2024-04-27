import { test } from "../../../utils/fixtures";
const { expect } = require("@playwright/test");
const body = "data/shopping/mock_data.json"
const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);

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
  await app.shoppingPage.details.expectMediaToHaveWidth(445)
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

test(`The "Buy" button opens a new page if one offer`, async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.route.mockResponseBody("/shopping/products", body)
  await app.shoppingPage.item.openProductDetailsByItem(1)
  
  //Assert 
  await app.shoppingPage.details.expectNewPageNotToHaveUrlAfterClick(
    app.shoppingPage.details.buyButton, process.env.BASE_URL + "/en/shopping?query=iphone&region=de-DE" )

});
test(`The "Buy" button scroll to offers if more one offer `, async ({ app}) => {
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
  await app.shoppingPage.details.clickBuyButton()

  //Assert 
  await app.shoppingPage.details.expectDetailsImageNotToBeInViewport()
});
test(`Check  offer icons to be visible `, async ({ app}) => {
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