import { test } from "../../../utils/fixtures.js";
test("Check text advertising", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("macbook price");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.adsText.waitUntilAdsToBeVisible();

  //Assert
  await app.webPage.adsText.expectAdsToHaveText(
    "Ads by Microsoft Data privacy"
  );
  await app.webPage.adsText.expectListToBeGreaterThanOrEqual(
    app.webPage.adsText.listAds,
    1
  );
  await app.webPage.adsText.expectListAdsToHaveText("Ad");
});

test("Check design header of product ads", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();


  //Assert
  await app.webPage.advertiserProductCollection.takeSnapshot(testInfo);
});

test("Check title of product ads", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.avertiserProduct.expectTitleToContain(/scotch/i);
});

test("Check price and shipping of product ads", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.avertiserProduct.expectPricesNotToBeEmpty();
  await app.webPage.avertiserProduct.expectShippingsNotToBeEmpty();
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
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.avertiserProduct.expectThumbnailToHaveWidth(178);
  await app.webPage.avertiserProduct.expectThumbnailToHaveHeight(173);
});

test("Check open advertising ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("scotch whisky");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  const oldUrl = await app.page.url()
  await app.webPage.avertiserProduct.clickProductAtNumber(1);

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
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  await app.webPage.advertiserProductCollection.clickUntilNextButtonToBeDisabled();

  //Assert
  await app.webPage.adsProduct.expectCarouselNextButtonIsDisabled();
  await app.webPage.adsProduct.clickCarouselPrevButtonUntilToBeInvisible();
  await app.webPage.adsProduct.expectCarouselPrevButtonIsDisabled();
});
