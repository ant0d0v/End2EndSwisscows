import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../../data/error/testData.json"))
);
test("Check text advertising", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("laptop");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.adsText.waitElementToBeVisible(webPage.adsText.textAds)
   
     //Assert
     await webPage.adsText.expectElementToHaveText(webPage.adsText.textAds,
      "Ads by Microsoft Data privacy")
     await webPage.adsText.expectListToBeGreaterThanOrEqual(webPage.adsText.listAds, 1)
  });

  test("Check text and image product advertising ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("crocs price");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.adsProduct.waitElementToBeVisible(webPage.adsProduct.textProductsAds)
   
     //Assert
     await webPage.adsProduct.expectElementToHaveText(webPage.adsProduct.textProductsAds,
      "Products for crocs price")
     await webPage.adsProduct.expectAreElementsInListDisplayed(webPage.adsProduct.allImage)
  });

  test("Check next button and prev button in the product advertising ", async ({
    home,
    webPage,
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("price iphone in germany ");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.adsProduct.waitElementToBeVisible(webPage.adsProduct.nextButton)
     await webPage.adsProduct.clickNextButtonUntilInvisible()
     
     //Assert
     await webPage.adsProduct.expectAttributeToHaveValue(webPage.adsProduct.nextButton, 
      "class", /next swiper-button-disabled/)
     await webPage.adsProduct.clickPrevButtonUntilInvisible()
     await webPage.adsProduct.expectAttributeToHaveValue(webPage.adsProduct.prevButton, 
      "class", /prev swiper-button-disabled/)
  });
  test("Check open advertising ", async ({
    home,
    webPage
  }) => {
     
     //Actions
     await home.headerStaticPages.clickHamburgerMenuButton();
     await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
     await home.headerStaticPages.searchForm.inputSearchCriteria("price iphone in germany");
     await home.headerStaticPages.searchForm.clickEnterSearchField();
     await webPage.item.expectWebItemsToBeVisible()
     await webPage.adsProduct.waitElementToBeVisible(webPage.adsProduct.firstProduct)
     const newPage = await webPage.adsProduct.clickFirstProductAndNavigateToNewPage()
     
     //Assert
     await webPage.expectNotToHaveUrl(newPage, "https://dev.swisscows.com/en/web?query=price+iphone+in+germany&region=de-DE" )
  });