import { test, expect, deletionIds } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check 202 No Results Found error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("..");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo, 202);
});

test("Check request is blocked 450 error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo, 450);
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v4/images", 500);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo, 500);
});

test("Check 501 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v4/images", 501);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo, 501);
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v4/images", 429);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.imagePage.header.navigation.clickImageTab();

  //Assert
  await app.imagePage.error.takeSnapshot(testInfo, 429);
});

test("Check Saved button when adding image to bookmark", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });
  let favoriteID = await app.imagePage.details.clickGhostButtonByAndGetResponse(
    { name: "Save" }
  );
  deletionIds.myImages.internalUser.push(favoriteID);

  //Assert
  await app.imagePage.details.takeSnapshotGhostButtonBy(testInfo, {
    name: "Saved",
  });
});

test("Check Save button isn't attached in DOM when user logout", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.header.clickHamburgerMenuButton();
  await app.imagePage.header.hamburgerMenu.clickLogoutButton();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.details.expectNotToBeAttachedGhostButtonBy({
    name: "Save",
  });
  await app.imagePage.details.expectNotToBeAttachedGhostButtonBy({
    name: "Saved",
  });
});

test("Check the “Save” button until the image is added to the bookmark", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.details.takeSnapshotGhostButtonBy(testInfo, {
    name: "Save",
  });
});

test("Check that details panel to be hidden when clicking close button", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.animal.fish());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });
  await app.imagePage.details.expectImageInDetailsPanelToBeVisible();
  await app.imagePage.details.clickCloseButton();

  //Assert
  await app.imagePage.details.expectDetailsPanelToBeHidden();
});

test("Check image first item equal image in the item details", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.animal.dog());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  const altAttributeFirstImage =
    await app.imagePage.item.getByAltAttributeImageAt({ number: 1 });
  await app.imagePage.item.clickItemAt({ number: 1 });
  const altAttributeImageInItemDetails =
    await app.imagePage.details.getAttributeImageBy({ attribute: "alt" });

  //Assert
  expect(altAttributeFirstImage).toEqual(altAttributeImageInItemDetails);
});

test("Check infinity scroll to next page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.scrollByVisibleLastItem();

  //Assert
  await app.imagePage.item.expectResultToHaveItemsCount(100);
  await app.imagePage.item.scrollByVisibleLastItem();
});

test("Check infinity scroll to next page when item details is opened", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });
  await app.imagePage.item.scrollByVisibleLastItem();

  //Assert
  await app.imagePage.item.expectResultToHaveItemsCount(100);
  await app.imagePage.item.scrollByVisibleLastItem();
});

test("Check that images results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();

  //Assert
  await app.imagePage.item.expectItemNameToContainText(/red/i);
  await app.imagePage.item.expectResultToHaveItemsCount(50);
});

test("Check regional search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("red");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.header.clickHamburgerMenuButton();
  await app.imagePage.header.hamburgerMenu.selectRegion("Germany");
  await app.imagePage.item.expectImageItemsToBeVisible();

  //Assert
  await app.imagePage.item.expectResultToHaveItemsCount(50);
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
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.item.expectItemToHaveCSSBy({
    itemNumber: 1,
    outline: "rgb(228, 229, 231) solid 2px",
    opacity: "0.5",
  });
  await app.imagePage.item.expectItemToHaveCSSBy({
    itemNumber: 2,
    outline: "rgb(16, 24, 40) none 0px",
    opacity: "1",
  });
});

test("Check that image of proxy cdn server", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();

  //Assert
  await app.imagePage.item.expectAllImagesToHaveAttribute(/cdn.dev.swisscows.com/);
});

test("Check image item is active  when clicking on image", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.item.expectItemToHaveAttributeAt({
    number: 1,
    attribute: /active/,
  });
  await app.imagePage.item.expectItemToHaveAttributeAt({
    number: 2,
    attribute: "item image-object",
  });
  await app.imagePage.details.expectImageInDetailsPanelToBeVisible();
});

test("Check open site button when clicking redirect to new page", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.animal.dog());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });
  const currentUrl = await app.page.url();
  const currentTitle = await app.page.title();
  await app.imagePage.details.clickOpenSiteButton();

  //Assert
  await app.expectPageNotToHaveUrl(app.page, currentUrl);
  await app.expectPageNotToHaveTitle(app.page, currentTitle);
});

test("Check that {resolution, title, site, favicon } in details pane to have value", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });
  await app.imagePage.waitUntilPageIsFullyLoaded();
  const height = await app.imagePage.details.getAttributeImageBy({
    attribute: "height",
  });
  const width = await app.imagePage.details.getAttributeImageBy({
    attribute: "width",
  });

  //Assert
  await app.imagePage.details.favicon.expectFaviconToBeVisible();
  await app.imagePage.details.expectDetailInfoToContainText({
    title: /ronaldo/i,
    site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
    resolution: `${width} x ${height}`,
  });
});

test("Check height and width of details pane to have value", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.waitUntilPageIsFullyLoaded();
  await app.imagePage.details.expectDetailsToHaveProperty({
    width: 1130,
    height: { min: 320, max: 630 },
  });
});

test("Check that details to be in viewport", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.details.expectDetailsToBeInViewport();
});

test("Check preloader on page when Status.LOADING", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.navigation.clickImageTab();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.item.clickItemAt({ number: 1 });

  //Assert
  await app.imagePage.details.preloader.expectPreloaderToBeVisible();
  await app.imagePage.details.preloader.expectPreloaderToBeHidden();
});
