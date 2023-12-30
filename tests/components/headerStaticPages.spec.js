import { test } from "../../utils/fixturePages";
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);

test.describe("test don't use cookie ", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  for (const { testID,expectedLink,locatorId,expectedTitle,} of data.headerLinks) {
    test(`${testID} Check that header static badge ${locatorId} link navigate to corresponding pages`, async ({
      headerStaticPages,
    }) => {
      //Actions
      const newPage = await headerStaticPages.clickLinkInHeaderAndNavigateToNewPage(locatorId);

      //Assert
      await headerStaticPages.expectHaveUrl(newPage, expectedLink);
      await headerStaticPages.expectHaveTitle(newPage, new RegExp(expectedTitle));
    });
  }
});
test("Check charity query counter value at the Beginning", async ({
  headerStaticPages,
}) => {
  //Assert
  await headerStaticPages.expectCharitySearchCounterToHave("0");
});

test("Check charity query counter value after refresh page ", async ({
  mainPage,
  headerStaticPages,
}) => {
  //Actions
  await mainPage.reloadPage();

  //Assert
  await headerStaticPages.expectCharitySearchCounterToHave("0");
});

test("Check charity query counter value after search and go back to main bage ", async ({
  headerStaticPages,
  webPage,
}) => {
  //Actions
  await headerStaticPages.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.clickEnterSearchField();
  await headerStaticPages.expectCharitySearchCounterToHave("1");
  await webPage.goBack();

  //Assert
  await headerStaticPages.expectCharitySearchCounterToHave("1");
});
test("Check that display of heart icon message in the header static pages", async ({
  headerStaticPages,
}) => {
  //Actions
  await headerStaticPages.clickSearchCounter();

  //Assert
  await headerStaticPages.expectPopupCharitySearchCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});

test.describe("test use cookie", () => {
  test.use({ storageState: "./data/auth/user.json" });
  test("Check that email icon navigates to account/login page if user logged ", async ({
    headerStaticPages
  }) => {
    //Actions
    const newPage = await headerStaticPages.clickBadgeEmailAndNavigateToNewPage();

    //Assert
    await headerStaticPages.expectHaveUrl(newPage, new RegExp("/accounts.swisscows.com/login\\?ReturnUrl=.*"));
    await headerStaticPages.expectHaveTitle( newPage, /Login - Swisscows Accounts/);
  });
});
