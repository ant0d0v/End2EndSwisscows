import { test} from "../../../utils/fixtures";
const { expect } = require("@playwright/test");
  test("Check text and image product advertising ", async ({
    app
  }) => {
     
     //Actions
     await app.home.open()
     await app.home.header.clickHamburgerMenuButton();
     await app.home.header.hamburgerMenu.selectRegion("Germany");
     await app.home.header.searchForm.inputSearchCriteria("parfum");
     await app.home.header.searchForm.clickEnterSearchField();
     await app.imagePage.header.clickImageSearchButton()
     await app.imagePage.item.expectImageItemsToBeVisible()
     await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible()
   
     //Assert
     await app.imagePage.adsProduct.expectTitleAdsToHaveText("Products for parfum")
     await app.imagePage.adsProduct.expectAreElementsInListDisplayed(app.imagePage.adsProduct.allImage)
     await app.imagePage.adsText.expectAdsToHaveText("Ads by Microsoft Data privacy")
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
     await app.imagePage.header.clickImageSearchButton()
     await app.imagePage.item.expectImageItemsToBeVisible()
     await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible()
     await app.imagePage.adsProduct.clickCarouselNextButtonUntilToBeInvisible()
     
     //Assert
     await app.imagePage.adsProduct.expectCarouselNextButtonIsDisabled()
     await app.imagePage.adsProduct.clickCarouselPrevButtonUntilToBeInvisible()
     await app.imagePage.adsProduct.expectCarouselPrevButtonIsDisabled()
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
     await app.imagePage.header.clickImageSearchButton()
     await app.imagePage.item.expectImageItemsToBeVisible()
     await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible()
     const newPage = await app.imagePage.adsProduct.clickFirstProductAndNavigateToNewPage()
     
     //Assert
     await app.expectNotToHaveUrl(newPage, process.env.BASE_URL + "/en/images?query=parfum&region=de-DE" )
  });

  test("Check the width and Height of products ads items", async ({
   app
 }) => {
    
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("parfum");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible()
    
    //Assert
    await app.imagePage.adsProduct.expectProductToHaveWidth(254)
    await app.imagePage.adsProduct.expectProductToHaveHeight(122)
 });

 test("Check title of products ads ", async ({
   app
 }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("lacoste online shop");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.adsProduct.waitUntilProductAdsToBeVisible()
    
    //Assert
    await app.imagePage.adsProduct.expectTitleProductsToContains(/lacoste/i)  
 });