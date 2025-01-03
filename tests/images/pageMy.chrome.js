import { test, deletionIds } from "../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
test.describe("Internal user", () => {
  test.describe.configure({ mode: "default" });
  test(`Check "Remove from bookmarks" button when image is selected`, async ({
    app,
  }, testInfo) => {
    //Actions
    await app.imagePage.open(`/images?query=${faker.word.sample()}`)
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.adsFreePopup.closePopup()
    await app.imagePage.item.clickItemAt({ number: 1 });
    let favoriteID = await app.imagePage.details.getResponseAfterClickGhostButtonBy({ name: "Save" });
    deletionIds.myImages.internalUser.push(favoriteID);
    await app.imagePage.details.clickGhostButtonBy({ name: "Saved" });
    await app.imageMyPage.waitUrlToBeChanged();
    await app.imageMyPage.item.clickItemAt({ number: 1 });

    //Assert
    await app.imageMyPage.details.takeSnapshotGhostButtonBy(testInfo, {
      name: "Remove from bookmarks",
    });
  });

  test("Check No items Found error page", async ({ app }, testInfo) => {
    //Actions
    await app.imagePage.open(`/images?query=${faker.word.sample()}`)
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.adsFreePopup.closePopup()
    await app.imagePage.item.clickItemAt({ number: 1 });
    await app.imagePage.details.clickGhostButtonBy({ name: "Save" });
    await app.imagePage.details.clickGhostButtonBy({ name: "Saved" });
    await app.imageMyPage.waitUrlToBeChanged();
    await app.imageMyPage.item.clickItemAt({ number: 1 });
    await app.imageMyPage.details.clickGhostButtonBy({ name: "Remove from bookmarks" });

    //Assert
    await app.imageMyPage.error.takeSnapshot(testInfo, {
      error: 204,
      name: "images",
    });
  });

  test("Check adding multiple favorites to a my images ", async ({ app }) => {
    //Actions
    await app.imagePage.open(`/images?query=${faker.animal.cat()}`)
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.adsFreePopup.closePopup()
    await app.imagePage.item.clickItemAt({ number: 1 });
    const favoriteIDFirstImage = await app.imagePage.details.getResponseAfterClickGhostButtonBy({ name: "Save" });
    await app.imagePage.details.clickCloseButton();
    await app.imagePage.item.clickItemAt({ number: 2 });
    const favoriteIDSecondImage = await app.imagePage.details.getResponseAfterClickGhostButtonBy({ name: "Save" });
    deletionIds.myImages.internalUser.push(
      favoriteIDFirstImage,
      favoriteIDSecondImage
    );
    await app.imagePage.details.clickGhostButtonBy({ name: "Saved" });
    await app.imageMyPage.waitUrlToBeChanged();

    //Assert
    await app.imageMyPage.item.expectImageItemsToBeVisible();
    await app.imageMyPage.item.expectResultToHaveItemsCount(2);
  });
});

test.describe("External user", () => {
  test.describe.configure({ mode: "default" });
  test.use({ storageState: "./data/auth/externalUser.json" });
  test("Check close button in the item details my images ", async ({ app }) => {
    //Actions
    await app.imagePage.open(`/images?query=${faker.word.sample()}`)
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.adsFreePopup.closePopup()
    await app.imagePage.item.clickItemAt({ number: 1 });
    let favoriteID = await app.imagePage.details.getResponseAfterClickGhostButtonBy({ name: "Save" });
    deletionIds.myImages.externalUser.push(favoriteID);
    await app.imagePage.details.clickGhostButtonBy({ name: "Saved" });
    await app.imageMyPage.waitUrlToBeChanged();
    await app.imageMyPage.item.clickItemAt({ number: 1 });
    await app.imageMyPage.details.clickCloseButton();

    ///Assert
    await app.imageMyPage.details.expectDetailsPanelToBeHidden();
  });

  test("Check that {resolution, title, site, favicon } in details pane to have value", async ({
    app,
  }) => {
    //Actions
    await app.imagePage.open(`/images?query=Ronaldo`)
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.adsFreePopup.closePopup()
    await app.imagePage.item.clickItemAt({ number: 1 });
    await app.imagePage.details.waitImageIsLoaded();
    const height = await app.imagePage.details.getAttributeImageBy({ attribute: "height" });
    const width = await app.imagePage.details.getAttributeImageBy({ attribute: "width" });
    let favoriteID = await app.imagePage.details.getResponseAfterClickGhostButtonBy({ name: "Save" });
    deletionIds.myImages.externalUser.push(favoriteID);
    await app.imagePage.details.clickGhostButtonBy({ name: "Saved" });
    await app.imageMyPage.waitUrlToBeChanged();
    await app.imageMyPage.item.clickItemAt({ number: 1 });

    //Assert
    await app.imageMyPage.details.favicon.expectFaviconToBeVisible();
    await app.imageMyPage.details.expectDetailInfoToContainText({
      title: /\w+/,
      site: /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
      resolution: `${width} x ${height}`,
    });
  });

  test("Check regional search", async ({ app }) => {
    //Actions
    await app.imagePage.open(`/images?query=good`)
    await app.imagePage.item.expectImageItemsToBeVisible();
    await app.imagePage.adsFreePopup.closePopup()
    await app.imagePage.item.clickItemAt({ number: 1 });
    let favoriteID = await app.imagePage.details.getResponseAfterClickGhostButtonBy({ name: "Save" });
    deletionIds.myImages.externalUser.push(favoriteID);
    await app.imagePage.details.clickGhostButtonBy({ name: "Saved" });
    await app.imageMyPage.waitUrlToBeChanged();
    await app.imageMyPage.header.clickHamburgerMenuButton();
    await app.imageMyPage.header.hamburgerMenu.selectRegion("Germany");
    await app.imageMyPage.item.expectImageItemsToBeVisible();

    //Assert
    await app.imageMyPage.item.expectResultToHaveItemsCount(1);
    await app.imageMyPage.item.expectImageItemsToBeVisible();
    await app.expectPageToHaveUrl(
      app.page,
      process.env.BASE_URL + `/en/images/my?query=good&region=de-DE`
    );
  });
});
