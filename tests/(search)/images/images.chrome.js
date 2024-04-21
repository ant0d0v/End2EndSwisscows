import { test,expect, favoriteImagesIdForDeletionOfInternalUser} from "../../../utils/fixtures";
const testData = JSON.parse(
    JSON.stringify(require("../../../data/error/testData.json"))
  );

test("Check 202 No Results Found error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    
    //Assert
    await app.imagePage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.noResultsFound202Error)
    await app.imagePage.error.expectErrorImageToBeVisible()
    await app.imagePage.error.expectImageToHaveWight(450)
  });

  test("Check request is blocked 450 error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("porn");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()

    //Assert
    await app.imagePage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.blocked450Error)
    await app.imagePage.error.expectErrorImageToBeVisible()
    await app.imagePage.error.expectImageToHaveWight(450)
  });

  test("Check 500 unknown Error Page  ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/v4/images", 500)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()

    //Assert
    await app.imagePage.error.expectContentToHaveText(testData.expectedErrorText.unknown500Error)
    await app.imagePage.error.expectErrorImageToBeVisible()
    await app.imagePage.error.expectImageToHaveWight(450)
  });

  test("Check 501 unknown Error Page  ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/v4/images", 501)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()

    //Assert
    await app.imagePage.error.expectContentToHaveText("Sorry, there are no search results for your regionError 501: Service UnavailableSearchTips:Try to change the search region.")
    await app.imagePage.error.expectErrorImageToBeVisible()
    await app.imagePage.error.expectImageToHaveWight(450)
  });

  test("Check 429 Too many requests", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/v4/images", 429)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    
    //Assert
    await app.imagePage.error.expectContentToHaveText(testData.expectedErrorText.TooManyRequestsError)
    await app.imagePage.error.expectErrorImageToBeVisible()
    await app.imagePage.error.expectImageToHaveWight(450)
  });

  test.describe('favorite function', () => { test.use({ mode: "default" })
  test("Check add image  in the favorite", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ACD");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    const favoriteID = await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse()
    favoriteImagesIdForDeletionOfInternalUser.push(favoriteID);
    
    //Assert
    await app.imagePage.itemDetails.expectBookmarkButtonIsActive()
    await app.imagePage.relatedQueries.expectFavoriteItemToHaveText("My images")
  });

  test("Check delete image from the favorite", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ACD");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.imagePage.header.clickImageSearchButton()
    await app.imagePage.item.expectImageItemsToBeVisible()
    await app.imagePage.item.clickItemNumber(1)
    await app.imagePage.itemDetails.clickBookmarkButton()
    await app.imagePage.itemDetails.expectBookmarkButtonIsActive()
    await app.imagePage.itemDetails.clickBookmarkButton()

    //Assert
    await app.imagePage.itemDetails.expectBookmarkButtonIsNotActive()
    await app.imagePage.relatedQueries.expectFavoriteItemToBeHidden()
  });
});

test("Check next button in the item details", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("ACD");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.clickItemNumber(1)
  await app.imagePage.itemDetails.clickNextButton()
  
  //Assert
  await app.imagePage.item.expectSecondItemIsActive()
  await app.imagePage.item.expectFirstItemIsNotActive()
});

test("Check prev button in the item details", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("Blu");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.clickItemNumber(1)
  await app.imagePage.itemDetails.clickNextButton()
  await app.imagePage.item.expectSecondItemIsActive()
  await app.imagePage.itemDetails.clickPrevButton()
  
  //Assert
  await app.imagePage.item.expectFirstItemIsActive()
  await app.imagePage.item.expectSecondItemIsNotActive()
});

test("Check close button in the item details", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("Ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.clickItemNumber(1)
  await app.imagePage.itemDetails.expectItemInDetailsPanelToBeVisible()
  await app.imagePage.itemDetails.clickCloseButton()

  //Assert
  await app.imagePage.itemDetails.expectItemInDetailsPanelToBeHidden()
});

test("Check image of item is displayed in the item details", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.clickItemNumber(1)

  //Assert
  await app.imagePage.itemDetails.expectImageInDetailsPanelToBeVisible()
});

test("Check image first item equal image in the item details", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  const altAttributeFirstImage = await app.imagePage.item.getByAltAttributeFirstImage()
  await app.imagePage.item.clickItemNumber(1)
  const altAttributeImageInItemDetails = await app.imagePage.itemDetails.getByAltAttributeImage()
  
  //Assert
  await expect(altAttributeFirstImage).toEqual(altAttributeImageInItemDetails)
});

test("Check infinity scroll to next page", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.scrollByVisibleItemNumber(80)

  //Assert
  await app.imagePage.item.expectListToBeGreaterThanOrEqual(app.imagePage.item.allImages, 80)
});

test("Check infinity scroll to next page when item details is opened", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.clickItemNumber(1)
  await app.imagePage.item.scrollByVisibleItemNumber(80)

  //Assert
  await app.imagePage.item.expectListToBeGreaterThanOrEqual(app.imagePage.item.allImages, 80)
});

test("Check that images results equals search criteria", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  
  //Assert
  await app.imagePage.item.expectItemNameToContainText(/iphone/i)
  await app.imagePage.item.expectItemsCount(50)
});

test("Check regional search", async ({
  app,
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.header.clickHamburgerMenuButton();
  await app.imagePage.header.hamburgerMenu.selectRegion("Germany");
  await app.imagePage.item.expectImageItemsToBeVisible()
  
  //Assert
  await app.imagePage.item.expectItemNameToContainText(/red/i)
  await app.imagePage.item.expectItemsCount(50)
  await app.expectHaveUrl(app.page, process.env.BASE_URL + `/en/images?query=red&region=de-DE`)
});

test("Check outline of item when item is selected", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  await app.imagePage.item.clickItemNumber(1)

  //Assert
  await app.imagePage.item.expectItemToHaveOutline("rgb(223, 93, 93) solid 2px")
});

test("Check that image of proxy cdn server", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.clickImageSearchButton()
  await app.imagePage.item.expectImageItemsToBeVisible()
  
  //Assert
  await app.imagePage.item.proxyImage.expectAttributeSrcAllImagesToHave(app.imagePage.item.allImages, 
    /cdn.swisscows.com/)
});
