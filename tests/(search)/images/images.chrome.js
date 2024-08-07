import { test, expect, deletionIds } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
const randomQuery = faker.helpers.arrayElement([
  "Cute cat pictures",
  "DIY home improvement videos",
  "how to Cook PASTA",
  "Music videos 2024",
  "Best coffee shops #near me",
  "WEATHER TODAY",
  "Quelle heure est-il à Tokyo?",
  "Tech news + updates",
]);
const firstItem = 1;
const secondItem = 2;
const fifthItem = 5;

test("Check 202 No Results Found error page ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo);
});

test("Check request is blocked 450 error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("porn");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo);
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v4/images", 500);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo);
});

test("Check 501 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v4/images", 501);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo);
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v4/images", 429);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo);
});

test.describe("favorite function", () => {
  test.use({ mode: "default" });
  test.fixme("Check add image  in the favorite", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("ACD");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.imagePage.header.navigation.clickImageTab();
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.item.clickItemNumber(firstItem);
    let favoriteID =
      await app.imagePage.itemDetails.clickBookmarkButtonAndGetResponse();
    deletionIds.myImages.internalUser.push(favoriteID);

    //Assert
    await app.imagePage.itemDetails.expectBookmarkButtonIsActive();
    await app.imagePage.relatedQueries.expectFavoriteItemToHaveText(
      "My images"
    );
  });

  test.fixme("Check delete image from the favorite", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("Ukraine");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.imagePage.header.navigation.clickImageTab();
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.item.clickItemNumber(firstItem);
    await app.imagePage.itemDetails.clickBookmarkButton();
    await app.imagePage.itemDetails.expectBookmarkButtonIsActive();
    await app.imagePage.relatedQueries.expectFavoriteItemToBeVisible();
    await app.imagePage.itemDetails.clickBookmarkButton();

    //Assert
    await app.imagePage.itemDetails.expectBookmarkButtonIsNotActive();
    await app.imagePage.relatedQueries.expectFavoriteItemToBeHidden();
  });
});

test.fixme("Check next button in the item details", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("ACD");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);
  await app.imagePage.itemDetails.clickNextButton();

  //Assert
  await app.imagePage.item.expectSecondItemIsActive();
  await app.imagePage.item.expectFirstItemIsNotActive();
});

test.fixme("Check prev button in the item details", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Blu");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);
  await app.imagePage.itemDetails.clickNextButton();
  await app.imagePage.item.expectSecondItemIsActive();
  await app.imagePage.itemDetails.clickPrevButton();

  //Assert
  await app.imagePage.item.expectFirstItemIsActive();
  await app.imagePage.item.expectSecondItemIsNotActive();
});

test("Check that details panel to be hidden when clicking close button", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("A");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.preloader.expectPreloaderToBeVisible();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);
  await app.imagePage.itemDetails.expectImageInDetailsPanelToBeVisible();
  await app.imagePage.itemDetails.clickCloseButton();

  //Assert
  await app.imagePage.itemDetails.expectDetailsPanelToBeHidden();
});

test("Check image first item equal image in the item details", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Ronaldo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  const altAttributeFirstImage =
    await app.imagePage.item.getByAltAttributeFirstImage(firstItem);
  await app.imagePage.item.clickItemNumber(firstItem);
  const altAttributeImageInItemDetails =
    await app.imagePage.itemDetails.getByAltAttributeImage();

  //Assert
  expect(altAttributeFirstImage).toEqual(altAttributeImageInItemDetails);
});

test("Check infinity scroll to next page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("red");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.scrollByVisibleItemNumber(80);

  //Assert
  await app.imagePage.item.expectListToBeGreaterThanOrEqual(
    app.imagePage.item.allImages,
    80
  );
});

test("Check infinity scroll to next page when item details is opened", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("red");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);
  await app.imagePage.item.scrollByVisibleItemNumber(80);

  //Assert
  await app.imagePage.item.expectListToBeGreaterThanOrEqual(
    app.imagePage.item.allImages,
    80
  );
});

test("Check that images results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.item.expectItemNameToContainText(/iphone/i);
  await app.imagePage.item.expectItemsCount(50);
});

test("Check regional search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("red");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.header.clickHamburgerMenuButton();
  await app.imagePage.header.hamburgerMenu.selectRegion("Germany");
  await app.imagePage.item.expectImageItemsToBeVisible();

  //Assert
  await app.imagePage.item.expectItemNameToContainText(/red/i);
  await app.imagePage.item.expectItemsCount(50);
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/images?query=red&region=de-DE`
  );
});

test("Check outline and opacity of item when item is selected", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Ronaldo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);

  //Assert
  await app.imagePage.item.expectImageToHaveOpacity(firstItem, "0.5");
  await app.imagePage.item.expectImageToHaveOpacity(secondItem, "1");
  await app.imagePage.item.expectItemToHaveOutline(
    firstItem,
    "rgb(228, 229, 231) solid 2px"
  );
});

test("Check that image of proxy cdn server", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();

  //Assert
  await app.imagePage.item.proxyImage.expectAttributeSrcAllImagesToHave(
    app.imagePage.item.allImages,
    /cdn.swisscows.com/
  );
});

test("Check image item is active  when clicking on image", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);

  //Assert
  await app.imagePage.item.expectFirstItemIsActive();
  await app.imagePage.itemDetails.expectImageInDetailsPanelToBeVisible();
});

test("Check open site button when clicking redirect to new page", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);
  const currentUrl = await app.page.url();
  const currentTitle = await app.page.title();
  await app.imagePage.itemDetails.clickOpenSiteButton();

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
  await app.expectPageNotToHaveTitle(app.page, currentTitle);
});

test("Check that resolution in details pane to have value", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);

  //Assert
  await app.imagePage.itemDetails.expectResolutionInformationNotToBeEmpty();
});

test("Check that title in details pane to containe text", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Ronaldo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);

  //Assert
  await app.imagePage.itemDetails.expectTitleToContainText(/ronaldo/i);
});

test("Check that site ifrormation in details pane to have value", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);

  //Assert
  await app.imagePage.itemDetails.expectSiteInformationNotToBeEmpty();
  await app.imagePage.itemDetails.favicon.expectFaviconToBeVisible();
});

test("Check height and width of details pane to have value", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Ronaldo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(firstItem);

  //Assert
  await app.imagePage.itemDetails.expectDetailsToHaveHeightAndWidth(630, 1130);
});

test("Check that details to be in viewport", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(fifthItem);

  //Assert
  await app.imagePage.itemDetails.expectDetailsToBeInViewport();
});

test("Check preloader on page when Status.LOADING", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(randomQuery);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();
  await app.imagePage.preloader.expectPreloaderToBeVisible();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemNumber(fifthItem);

  //Assert
  await app.imagePage.preloader.expectPreloaderToBeVisible();
  await app.imagePage.preloader.expectPreloaderToBeHidden();
});
