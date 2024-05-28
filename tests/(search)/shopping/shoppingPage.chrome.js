import { test } from "../../../utils/fixtures";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);
test("Check 202 No Results Found error page ", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickShoppingSearchButton();
  
  //Assert
  await app.shoppingPage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.noResultsFound202Error)
  await app.shoppingPage.error.expectErrorImageToBeVisible()
  await app.shoppingPage.error.expectImageToHaveWight(450)
});

test("Check request is blocked 450 error page ", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickShoppingSearchButton();

  //Assert
  await app.shoppingPage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.blocked450Error)
  await app.shoppingPage.error.expectErrorImageToBeVisible()
  await app.shoppingPage.error.expectImageToHaveWight(450)
});

test("Check 500 unknown Error Page  ", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseStatusCode("/shopping", 500)
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickShoppingSearchButton();

  //Assert
  await app.shoppingPage.error.expectContentToHaveText("Oops! Something is wrongError 500: Internal Server ErrorServer doesn’t respond or something else happened. Please, try to refresh this page.")
  await app.shoppingPage.error.expectErrorImageToBeVisible()
  await app.shoppingPage.error.expectImageToHaveWight(450)
});

test("Check 429 Too many requests", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.route.mockResponseStatusCode("/shopping", 429)
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickShoppingSearchButton();
  
  //Assert
  await app.shoppingPage.error.expectContentToHaveText(testData.expectedErrorText.TooManyRequestsError)
  await app.shoppingPage.error.expectErrorImageToBeVisible()
  await app.shoppingPage.error.expectImageToHaveWight(450)
});

test("Check error region is unsupported", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("football");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.clickHamburgerMenuButton();
  await app.shoppingPage.header.hamburgerMenu.selectRegion("Ukraine");
  
  //Assert
  await app.shoppingPage.error.expectContentToHaveText(testData.expectedErrorText.unknownRegion501Error)
  await app.shoppingPage.error.expectErrorImageToBeVisible()
  await app.shoppingPage.error.expectImageToHaveWight(450)
});

test("Check info items { name, symbol price, link, brand}  ", async ({
  app,
}) => {
  const expectedInfo = {
    name: "iPhone",
    itemPricing: "€",
    itemLink: "See all offers",
    itemBrand: "Apple",
  };
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iPhone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectDescriptionItemsNotToBeEmpty();
  await app.shoppingPage.item.expectInfoProductToContain(
    expectedInfo.name,
    expectedInfo.itemPricing,
    expectedInfo.itemLink,
    expectedInfo.itemBrand
  );
});

test("Check payments methods icon of products items ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iPhone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.icon.expectPaymentIconToHaveWidthAndHeight(24);
  await app.shoppingPage.item.icon.expectListToBeGreaterThanOrEqual(
    app.shoppingPage.item.icon.paymentMethods, 100
  );
  await app.shoppingPage.item.icon.expectAreElementsInListDisplayed(
    app.shoppingPage.item.icon.paymentMethods
  );
});

test("Check product images are visible and wight ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("adidas");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();

  //Assert
  await app.shoppingPage.item.expectProductImagesToBeVisible()
  await app.shoppingPage.item.expectProductMediaToHaveWidth(208)
});

test("Check next button in the paging", async ({
  app
}) => {
   //Actions
   await app.home.open()
   await app.home.header.clickHamburgerMenuButton();
   await app.home.header.hamburgerMenu.selectRegion("Germany");
   await app.home.header.searchForm.inputSearchCriteria("adidas");
   await app.home.header.searchForm.clickEnterSearchField();
   await app.webPage.item.expectWebItemsToBeVisible()
   await app.webPage.header.clickShoppingSearchButton();
   await app.shoppingPage.item.expectShoppingItemsToBeVisible();
   const oldSearchResult = await app.shoppingPage.item.getTextContentProductItems()
   await app.shoppingPage.pagination.clickNextButton()
   await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
   const newSearchResult = await app.shoppingPage.item.getTextContentProductItems()

   //Assert
   await app.shoppingPage.item.expectOldArrayNotToEqualNewArray(oldSearchResult, newSearchResult)
   await app.shoppingPage.item.expectItemsListToHaveCount(24)
   await app.shoppingPage.pagination.expectPreviousButtonIsEnabled()
});

test("Check prev button in the paging", async ({
  app
}) => {
   //Actions
   await app.home.open()
   await app.home.header.clickHamburgerMenuButton();
   await app.home.header.hamburgerMenu.selectRegion("Germany");
   await app.home.header.searchForm.inputSearchCriteria("iphone sales");
   await app.home.header.searchForm.clickEnterSearchField();
   await app.webPage.item.expectWebItemsToBeVisible()
   await app.webPage.header.clickShoppingSearchButton();
   await app.shoppingPage.item.expectShoppingItemsToBeVisible();
   await app.shoppingPage.pagination.clickNextButton()
   await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
   await app.shoppingPage.pagination.clickPrevButton()
   await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("4");
   
   //Assert
   await app.expectHaveUrl(app.page,  process.env.BASE_URL + "/en/shopping?query=iphone+sales&region=de-DE&offset=0")
   await app.shoppingPage.item.expectItemsListToHaveCount(24)
   await app.shoppingPage.pagination.expectPreviousButtonIsDisabled()
});