import { test } from "../../../utils/fixtures.js";
test("Check design header of product ads", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.advertiserProductCollection.takeSnapshot(testInfo);
});

test("Check price and shipping of product ads", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  //Assert
  await app.webPage.advertiserProductCollection.expectInfoProductToContain({
    title: /\w+/,
    price: /(\d+(\.\d{1,2})?)\sEUR/,
    site: /\w+/,
    shipping: "Versand",
  });
});

test("Check the thumbnail width and Height of products ads items", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.advertiserProductCollection.expectThumbnailToHaveProperty({
    width: 266,
    height: 140,
  });
});

test("Check open advertising ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  const oldUrl = await app.page.url();
  await app.webPage.advertiserProductCollection.clickProductAt(1);

  //Assert
  await app.expectPageNotToHaveUrl(app.page, oldUrl);
});

test("Check next button and prev button in the product advertising ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  await app.webPage.advertiserProductCollection.clickUntilNextButtonToBeDisabled();

  //Assert
  await app.webPage.advertiserProductCollection.expectLastProductImageToBeInViewport();
  await app.webPage.advertiserProductCollection.clickUntilPrevButtonToBeDisabled();
  await app.webPage.advertiserProductCollection.expectFirstProductImageToBeInViewport();
});

test("Check open new page when clicking ads link", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("whisky price");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.advertiserProductCollection.expectToBeOpenedNewPageAfterClickAdsLink(
    { expectedUrl: /privacy.microsoft.com/ }
  );
});
