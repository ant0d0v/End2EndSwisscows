import { test } from "../../utils/fixtures.js";
import testData from "../../data/header/testData.json";

test("Check charity query counter value at the Beginning", async ({ app }) => {
  //Actions
  await app.home.open();

  //Assert
  await app.home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("0");
});

test("Check charity query counter value after refresh page ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.reloadPage();

  //Assert
  await app.home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("0");
});

test("Check charity query counter value after search and go back to main bage ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.goBack();

  //Assert
  await app.home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("1");
});
test("Check that display of heart icon message in the header static pages", async ({
  app
},testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.clickBadgeCounter();

  //Assert
  await app.home.header.badgeCounter.takeSnapshot(testInfo);
});

test.describe("tests use cookie", () => {
  test(`Check that email badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
   
    //Assert
    await app.home.header.expectToBeOpenedPageAfterClickBy({
      locator: "badge-email",
      url: /task=mail&_mbox=INBOX/,
    });

    await app.expectNewPageToHaveTitle(context, "Swisscows.email :: Inbox");
  });
});

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  for (const { testID, expectedUrl, expectedTitle, nameIcon } of testData.badgeLinks) {
    test(`${testID} Check that ${nameIcon} link navigate to corresponding pages`, async ({
      app,
      context,
    }) => {
      //Actions
      await app.home.open();

      //Assert
      await app.home.header.expectToBeOpenedPageAfterClickBy({
        locator: nameIcon,
        url: expectedUrl,
      });

      await app.expectNewPageToHaveTitle(context, expectedTitle);
    });
  }
});
