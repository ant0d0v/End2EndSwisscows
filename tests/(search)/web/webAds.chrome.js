import { test} from "../../../utils/fixtures";
const { expect } = require("@playwright/test");

test("Check text advertising", async ({
    app
  }) => {
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("laptop");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.adsText.waitUntilAdsToBeVisible()
   
     //Assert
     await app.webPage.adsText.expectAdsToHaveText("Ads by Microsoft Data privacy")
     await app.webPage.adsText.expectListToBeGreaterThanOrEqual(app.webPage.adsText.listAds, 1)
     await app.webPage.adsText.expectListAdsToHaveText("Ad")
  });

  test("Check text and image product advertising ", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("parfum");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.adsProduct.waitUntilProductAdsToBeVisible()
   
     //Assert
     await app.webPage.adsProduct.expectTitleAdsToHaveText("Products for parfum")
     await app.webPage.adsProduct.expectAreElementsInListDisplayed(app.webPage.adsProduct.allImage)
     await app.webPage.adsText.expectAdsToHaveText("Ads by Microsoft Data privacy")
  });

  test("Check next button and prev button in the product advertising ", async ({
   app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("parfum");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.adsProduct.waitUntilProductAdsToBeVisible()
     await app.webPage.adsProduct.clickCarouselNextButtonUntilToBeInvisible()
     
     //Assert
     await app.webPage.adsProduct.expectCarouselNextButtonIsDisabled()
     await app.webPage.adsProduct.clickCarouselPrevButtonUntilToBeInvisible()
     await app.webPage.adsProduct.expectCarouselPrevButtonIsDisabled()
  });
  test("Check open advertising ", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("parfum");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.webPage.item.expectWebItemsToBeVisible()
     await app.webPage.adsProduct.waitUntilProductAdsToBeVisible()
     const newPage = await app.webPage.adsProduct.clickFirstProductAndNavigateToNewPage()
     
     //Assert
     await app.webPage.expectNotToHaveUrl(newPage, process.env.BASE_URL + "/en/web?query=parfum&region=de-DE" )
  });