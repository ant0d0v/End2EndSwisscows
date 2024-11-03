import { test } from "../../../utils/fixtures.js";
import { randomAdsQuery } from "../../../helpers/random.js"
test("Check design of product ads", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseBody("/v4/web", 'data/mock/web/productAds.json');
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.advertiserProductCollection.takeSnapshot(testInfo);
});

test("Check price and shipping of product ads in widget", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
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
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.advertiserProductCollection.expectThumbnailToHaveProperty({
    width: 178,
    height: 140,
  });
});

test("Check open advertising ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();
  const oldUrl = await app.page.url();
  await app.webPage.advertiserProductCollection.clickProductAt({ number: 1 });

  //Assert
  await app.expectPageNotToHaveUrl(app.page, oldUrl);
});

test("Check next button and prev button in the product advertising ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseBody("/v4/web", 'data/mock/web/productAds.json');
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
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
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiserProductCollection.waitUntilProductAdsToBeVisible();

  //Assert
  await app.webPage.advertiserProductCollection.expectToBeOpenedNewPageAfterClickAdsLink(
    { expectedUrl: /microsoft.com/ }
  );
});


test("Check { title, site, callout, ad } of web page ads item", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("laptop");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiser.waitUntilAdvertiserToBeVisible();

  //Assert
  await app.webPage.advertiser.expectAdvertiserDescriptionNotToBeEmpty()
  await app.webPage.advertiser.expectInfoAdvertiserToContain({
    title: /\w+/,
    site: /\w+/,
    callout: /\w+/,
    ad: /Ad/,
  });
});

test("Check design of web page ads", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseBody("/v4/web", 'data/mock/web/webPageAds.json');
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiser.waitUntilAdvertiserToBeVisible();

  //Assert
  await app.webPage.advertiser.takeSnapshot(testInfo);
});

test("Check open adverster web page item", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria(randomAdsQuery());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.advertiser.waitUntilAdvertiserToBeVisible();
  const oldUrl = await app.page.url();
  await app.webPage.advertiser.clickAdsTitleAt({ number: 1 });

  //Assert
  await app.expectPageNotToHaveUrl(app.page, oldUrl);
});
