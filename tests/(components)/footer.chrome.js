import { test } from "../../utils/fixtures";
const testData = JSON.parse(
  JSON.stringify(require("../../data/footer/testData.json"))
);
test.describe('Footer of static pages', () => {  
for (const {testID, expectedUrl, expectedTitle, locatorId } of testData.internalLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} internal link in footer static pages`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.footer.clickAllInternalLink(locatorId)
      
  
      //Assert
      await app.home.expectHaveUrl(app.home.page, expectedUrl);
      await app.home.expectHaveTitle(app.home.page, expectedTitle);
    });
  }
  for (const {testID, expectedUrl, expectedTitle, locatorId } of testData.externalLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} external link (Our products and Our Services ) in footer static pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open() 
  
      //Assert
      await app.home.expectToBeOpenedNewPageAfterClick(app.home.footer.allExternalLinks(locatorId), expectedUrl)
      await app.home.expectNewPageToHaveTitle(context, expectedTitle)
    });
  }

  for (const {testID, expectedUrl, expectedTitle, locatorId } of testData.socialNetworksLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} social networks link in footer static pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open() 
  
      //Assert
      await app.home.expectToBeOpenedNewPageAfterClick(app.home.footer.socialNetworksLinks(locatorId), expectedUrl)
      await app.home.expectNewPageToHaveTitle(context, new RegExp(expectedTitle))
    });
  }

  for (const {testID, expectedUrl, expectedTitle, locatorId } of testData.swisscowsAppLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} swisscows App link in footer static pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open() 
  
      //Assert
      await app.home.expectToBeOpenedNewPageAfterClick(app.home.footer.swisscowsAppLinks(locatorId), expectedUrl)
      await app.home.expectNewPageToHaveTitle(context, expectedTitle)
    });
  }
  test(`Check swisscows App Images in footer static pages are displayed `, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    
    //Assert
    await app.home.footer.expectSwisscowsAppImagesToBeVisible()
  });
})
test.describe('Footer of search pages', () => {  
    for (const {testID, expectedUrl, expectedTitle, locatorId } of testData.socialNetworksLinks) {
      test(`${testID} Check navigation to corresponding pages for ${locatorId} social networks link in footer search pages`, async ({
        app, context
      }) => {
        //Actions
        await app.home.open()
        await app.home.header.searchForm.inputSearchCriteria("glory Ukraine");
        await app.home.header.searchForm.clickEnterSearchField();
        await app.webPage.item.expectWebItemsToBeVisible() 
    
        //Assert
        await app.webPage.expectToBeOpenedNewPageAfterClick(app.webPage.footer.socialNetworksLinks(locatorId), expectedUrl)
        await app.webPage.expectNewPageToHaveTitle(context, new RegExp(expectedTitle))
      });
    }
  
    for (const {testID, expectedUrl, expectedTitle, locatorId } of testData.swisscowsAppLinks) {
      test(`${testID} Check navigation to corresponding pages for ${locatorId} swisscows App link in footer search pages`, async ({
        app, context
      }) => {
        //Actions
        await app.home.open()
        await app.home.header.searchForm.inputSearchCriteria("1234567");
        await app.home.header.searchForm.clickEnterSearchField();
        await app.webPage.item.expectWebItemsToBeVisible() 
    
        //Assert
        await app.webPage.expectToBeOpenedNewPageAfterClick(app.webPage.footer.swisscowsAppLinks(locatorId), expectedUrl)
        await app.webPage.expectNewPageToHaveTitle(context, expectedTitle)
      });
    }
    test(`Check swisscows App Images in footer search pages are displayed `, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.searchForm.inputSearchCriteria("1234567");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.webPage.item.expectWebItemsToBeVisible() 
  
      //Assert
      await app.webPage.footer.expectSwisscowsAppImagesToBeVisible()
    });
  })