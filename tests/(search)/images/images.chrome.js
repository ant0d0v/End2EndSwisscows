import { test, favoriteImagesIdForDeletionOfInternalUser} from "../../../utils/fixtures";
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
  test("Check add image in the favorite", async ({
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
    console.log(favoriteID)
    
    //Assert
    await app.imagePage.expectFavoriteItemToHaveText("My images")
    favoriteImagesIdForDeletionOfInternalUser.push(favoriteID);
  });
});
