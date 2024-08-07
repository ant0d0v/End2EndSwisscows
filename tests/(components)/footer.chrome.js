import { test } from "../../utils/fixtures.js";
import testData from "../../data/footer/testData.json";

test.describe("Footer of static pages", () => {
  for (const {
    testID,
    expectedUrl,
    expectedTitle,
    locatorId,
  } of testData.internalLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} internal link in footer static pages`, async ({
      app,
    }) => {
      //Actions
      await app.home.open();
      await app.home.footer.clickAllInternalLink(locatorId);

      //Assert
      await app.expectPageToHaveUrl(app.page, expectedUrl);
      await app.expectHaveTitle(app.page, expectedTitle);
    });
  }
  for (const {
    testID,
    expectedUrl,
    expectedTitle,
    locatorId,
  } of testData.externalLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} external link (Our products and Our Services ) in footer static pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.expectToBeOpenedNewPageAfterClick(
        app.home.footer.allExternalLinks(locatorId),
        expectedUrl
      );
      await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }

  for (const {
    testID,
    expectedUrl,
    expectedTitle,
    locatorId,
  } of testData.socialNetworksLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} social networks link in footer static pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.expectToBeOpenedNewPageAfterClick(
        app.home.footer.socialNetworksLinks(locatorId),
        expectedUrl
      );
      await app.expectNewPageToHaveTitle(context, new RegExp(expectedTitle));
    });
  }

  for (const {
    testID,
    expectedUrl,
    expectedTitle,
    locatorId,
  } of testData.swisscowsAppLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} swisscows App link in footer static pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.expectToBeOpenedNewPageAfterClick(
        app.home.footer.swisscowsAppLinks(locatorId),
        expectedUrl
      );
      await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }
  test(`Check swisscows App Images in footer static pages are displayed `, async ({
    app,
  }) => {
    //Actions
    await app.home.open();

    //Assert
    await app.home.footer.expectSwisscowsAppImagesToBeVisible();
  });
});
test.describe("Footer of search pages", () => {
  for (const {
    testID,
    expectedUrl,
    expectedTitle,
    locatorId,
  } of testData.socialNetworksLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} social networks link in footer search pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();
      await app.home.header.searchBar.inputSearchCriteria("glory Ukraine");
      await app.home.header.searchBar.clickEnterSearchField();
      await app.webPage.item.expectWebItemsToBeVisible();

      //Assert
      await app.webPage.expectToBeOpenedNewPageAfterClick(
        app.webPage.footer.socialNetworksLinks(locatorId),
        expectedUrl
      );
      await app.expectNewPageToHaveTitle(context, new RegExp(expectedTitle));
    });
  }

  for (const {
    testID,
    expectedUrl,
    expectedTitle,
    locatorId,
  } of testData.swisscowsAppLinks) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} swisscows App link in footer search pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();
      await app.home.header.searchBar.inputSearchCriteria("1234567");
      await app.home.header.searchBar.clickEnterSearchField();
      await app.webPage.item.expectWebItemsToBeVisible();

      //Assert
      await app.webPage.expectToBeOpenedNewPageAfterClick(
        app.webPage.footer.swisscowsAppLinks(locatorId),
        expectedUrl
      );
      await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }
  test(`Check swisscows App Images in footer search pages are displayed `, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria("1234567");
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible();

    //Assert
    await app.webPage.footer.expectSwisscowsAppImagesToBeVisible();
  });
});

test("Check design of footer component the search pages", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("A");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();

  //Assert
  await app.webPage.footer.takeSnapshot(testInfo);
});
