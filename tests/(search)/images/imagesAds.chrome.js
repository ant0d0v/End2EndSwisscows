import { test } from "../../../utils/fixtures.js";
test("Check text and image product advertising ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("laptop macbook");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible();

  //Assert
  await app.imagePage.adsProduct.expectTitleAdsToHaveText(
    "Products for laptop macbook"
  );
  await app.imagePage.adsProduct.expectAreElementsInListDisplayed(
    app.imagePage.adsProduct.allImage
  );
  await app.imagePage.adsText.expectAdsToHaveText(
    "Ads by Microsoft Data privacy"
  );
});

test("Check next button and prev button in the product advertising ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("laptop macbook");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible();
  await app.imagePage.adsProduct.clickCarouselNextButtonUntilToBeInvisible();

  //Assert
  await app.imagePage.adsProduct.expectCarouselNextButtonIsDisabled();
  await app.imagePage.adsProduct.clickCarouselPrevButtonUntilToBeInvisible();
  await app.imagePage.adsProduct.expectCarouselPrevButtonIsDisabled();
});
test("Check open advertising ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("laptop macbook");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible();
  const newPage =
    await app.imagePage.adsProduct.clickFirstProductAndNavigateToNewPage();

  //Assert
  await app.expectPageNotToHaveUrl(
    newPage,
    process.env.BASE_URL + "/en/images?query=parfum&region=de-DE"
  );
});

test("Check the width and Height of products ads items", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("laptop macbook");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible();

  //Assert
  await app.imagePage.adsProduct.expectProductToHaveWidth(254);
  await app.imagePage.adsProduct.expectProductToHaveHeight(122);
});

test("Check title of products ads ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchBar.inputSearchCriteria("laptop macbook");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible();

  //Assert
  await app.imagePage.adsProduct.expectTitleProductsToContains(/macbook/i);
});
