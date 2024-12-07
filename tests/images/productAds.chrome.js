import { test } from "../../utils/fixtures.js";
import { randomProductAdsQuery } from "../../helpers/random.js"
test("Check design of product images ads", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.requestWithGivenResponse("/v4/images", 'data/mock/images/productAds.json');
  await app.home.header.searchForm.inputSearchCriteria(randomProductAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.imagePage.advertiserProductCollection.takeSnapshot(testInfo);
});

test("Check open advertising ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomProductAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  const oldUrl = await app.page.url();
  await app.imagePage.advertiserProductCollection.clickProductAt({ number: 1 });

  //Assert
  await app.expectPageNotToHaveUrl(app.page, oldUrl);
});

test("Check price,shipping,title and site of product ads", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomProductAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.imagePage.advertiserProductCollection.expectInfoProductToContain({
    title: /\w+/,
    price: /(\d+(\.\d{1,2})?)\sEUR/,
    site: /\w+/,
    shipping: "Versand",
  });
});

test("Check next button and prev button in the product advertising ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.route.requestWithGivenResponse("/v4/images", 'data/mock/images/productAds.json');
  await app.home.header.searchForm.inputSearchCriteria(randomProductAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  await app.imagePage.advertiserProductCollection.clickUntilNextButtonToBeDisabled();

  //Assert
  await app.imagePage.advertiserProductCollection.expectLastProductImageToBeInViewport();
  await app.imagePage.advertiserProductCollection.clickUntilPrevButtonToBeDisabled();
  await app.imagePage.advertiserProductCollection.expectFirstProductImageToBeInViewport();
});

test("Check open new page when clicking ads link", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomProductAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.imagePage.advertiserProductCollection.expectToBeOpenedNewPageAfterClickAdsLink(
    { expectedUrl: /microsoft.com/ }
  );
});
