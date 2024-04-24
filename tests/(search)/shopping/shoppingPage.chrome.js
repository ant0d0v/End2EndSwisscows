import { test} from "../../../utils/fixtures";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);
  test("Check info items { name, symbol price, link, brand}  ", async ({
    app
  }) => {
    const expectedInfo = { name: "iPhone", itemPricing: "€", itemLink: "See all offers", itemBrand: "Apple"}
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("iPhone");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.header.clickHamburgerMenuButton();
     await app.webPage.header.hamburgerMenu.selectRegion("Germany");
     await app.webPage.header.clickShoppingSearchButton()
     await app.shoppingPage.item.expectShoppingItemsToBeVisible()
     
     //Assert
     await app.shoppingPage.item.expectDescriptionItemsNotToBeEmpty()
     await app.shoppingPage.item.expectInfoProductToContain(
      expectedInfo.name,
      expectedInfo.itemPricing,
      expectedInfo.itemLink,
      expectedInfo.itemBrand
     )
  });

  test("Check payments methods icon of products items ", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.searchForm.inputSearchCriteria("iPhone");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.header.clickHamburgerMenuButton();
     await app.webPage.header.hamburgerMenu.selectRegion("Germany");
     await app.webPage.header.clickShoppingSearchButton()
     await app.shoppingPage.item.expectShoppingItemsToBeVisible()
     
     //Assert
     await app.shoppingPage.item.icon.expectPaymentIconToHaveWidthAndHeight(24)
     await app.shoppingPage.item.icon.expectListToBeGreaterThanOrEqual(app.shoppingPage.item.icon.paymentMethods, 100)
     await app.shoppingPage.item.icon.expectAreElementsInListDisplayed(app.shoppingPage.item.icon.paymentMethods)
  });



 