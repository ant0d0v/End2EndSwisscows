import { test } from "../../utils/fixtures.js";
import testData from "../../data/footer/testData.json";
import { faker } from "@faker-js/faker";

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
    url,
    expectedTitle,
    name,
  } of testData.externalLinks) {
    test(`${testID} Check navigation to corresponding pages for ${name} external link (Our products and Our Services ) in footer static pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.footer.expectToBeOpenedNewPageAfterClickExternalLink({ locator: name, expected: url });
      await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }

  for (const {
    testID,
    url,
    expectedTitle,
    name,
  } of testData.socialNetworksLinks) {
    test(`${testID} Check navigation to corresponding pages for ${name} social networks link in footer static pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.footer.expectToBeOpenedNewPageAfterClickSocialNetworksLinks({
        locator: name,
        expected: url
      });
      await app.expectNewPageToHaveTitle(context, new RegExp(expectedTitle));
    });
  }

  for (const { testID, url, expectedTitle, name } of testData.appLinks) {
    test(`${testID} Check navigation to corresponding pages for ${name} swisscows App link in footer static pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.footer.expectToBeOpenedNewPageAfterClickAppLinks({
        locator: name,
        expected: url,
      });
      await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }

});
test.describe("Footer of search pages", () => {
  for (const {
    testID,
    url,
    expectedTitle,
    name,
  } of testData.socialNetworksLinks) {
    test(`${testID} Check navigation to corresponding pages for ${name} social networks link in footer search pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();
      await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
      await app.home.header.searchBar.clickEnterSearchField();
      await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

      //Assert
      await app.webPage.footer.expectToBeOpenedNewPageAfterClickSocialNetworksLinks({
        locator: name,
        expected: url
      });
      await app.expectNewPageToHaveTitle(context, new RegExp(expectedTitle));
    });
  }

  for (const {
    testID,
    url,
    expectedTitle,
    name,
  } of testData.appLinks) {
    test(`${testID} Check navigation to corresponding pages for ${name} swisscows App link in footer search pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();
      await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
      await app.home.header.searchBar.clickEnterSearchField();
      await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

      //Assert
     await app.home.footer.expectToBeOpenedNewPageAfterClickAppLinks({
       locator: name,
       expected: url,
     });
     await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }
  
  test("Check design of footer component the search pages", async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.word.sample());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.webPage.webPageItem.expectWebPageItemsToBeVisible();

    //Assert
    await app.webPage.footer.takeSnapshot(testInfo);
  });
});

