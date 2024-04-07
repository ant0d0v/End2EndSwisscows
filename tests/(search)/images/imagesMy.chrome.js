import { test, 
    favoriteImagesIdForDeletionOfInternalUser, 
    favoriteImagesIdForDeletionOfExternalUser } 
    from "../../../utils/fixtures";

  test.describe('Internal user', () => { test.use({ mode: "default" })
  test("Check redirect to /images when delete last image from my favorite images", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("red");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    await app.imagePage.itemDetails.clickBookmarkButton()
    await app.imagePage.clickFavoriteItem()
    await app.imageMyPage.expectPageUrlToHaveParameter(`?query=red`)
    await app.imageMyPage.item.clickItemNumber(1)
    await app.imageMyPage.itemDetails.clickBookmarkButton()
    
    //Assert
    await app.imagePage.expectHaveUrl(app.imagePage.page, process.env.BASE_URL + `/en/images?query=red`)
    await app.imagePage.item.expectItemsCount(50)
  });

  test("Check adding multiple favorites to a my images ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("good");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    const favoriteIDFirstImage = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    await app.imagePage.itemDetails.clickNextButton()
    const favoriteIDSecondImage = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    await app.imagePage.clickFavoriteItem()
    await app.imageMyPage.expectPageUrlToHaveParameter(`?query=good`)
    favoriteImagesIdForDeletionOfInternalUser.push(favoriteIDFirstImage);
    favoriteImagesIdForDeletionOfInternalUser.push(favoriteIDSecondImage);
  
    //Assert
    await app.imageMyPage.item.expectItemsCount(2)
    await app.imageMyPage.item.expectAreElementsInListDisplayed(app.imageMyPage.item.allImages)
  })
});
test.describe('External user', () => {  
    test.describe.configure({ mode: 'default' });
    test.use({ storageState: './data/auth/externalUser.json' });
    test("Check prev button in the item details my images ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("good");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    const favoriteIDFirstImage = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    await app.imagePage.itemDetails.clickNextButton()
    const favoriteIDSecondImage = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    await app.imagePage.clickFavoriteItem()
    await app.imageMyPage.expectPageUrlToHaveParameter(`?query=good`)
    await app.imageMyPage.item.clickItemNumber(1)
    await app.imageMyPage.itemDetails.clickNextButton()
    await app.imageMyPage.item.expectSecondItemIsActive()
    await app.imageMyPage.itemDetails.clickPrevButton()
    favoriteImagesIdForDeletionOfExternalUser.push(favoriteIDFirstImage);
    favoriteImagesIdForDeletionOfExternalUser.push(favoriteIDSecondImage);

    //Assert
    await app.imageMyPage.item.expectFirstItemIsActive()
    await app.imageMyPage.item.expectSecondItemIsNotActive()
  })
  test("Check close button in the item details my images ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("good");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    const favoriteID = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    await app.imagePage.clickFavoriteItem()
    await app.imageMyPage.expectPageUrlToHaveParameter(`?query=good`)
    await app.imageMyPage.item.clickItemNumber(1)
    await app.imageMyPage.itemDetails.clickCloseButton()
    favoriteImagesIdForDeletionOfExternalUser.push(favoriteID);

    ///Assert
    await app.imageMyPage.itemDetails.expectItemInDetailsPanelToBeHidden()
  })
  test("Check regional search", async ({
    app,
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("good");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    const favoriteID = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    await app.imagePage.clickFavoriteItem()
    await app.imageMyPage.expectPageUrlToHaveParameter(`?query=good`)
    await app.imageMyPage.header.clickHamburgerMenuButton();
    await app.imageMyPage.header.hamburgerMenu.selectRegion("Germany");
    await app.imageMyPage.item.expectImageItemsToBeVisible()
    favoriteImagesIdForDeletionOfExternalUser.push(favoriteID);
    
    //Assert
    await app.imageMyPage.item.expectItemsCount(1)
    await app.imageMyPage.expectHaveUrl(app.imageMyPage.page, process.env.BASE_URL + `/en/images/my?query=good&region=de-DE`)  
});
});
