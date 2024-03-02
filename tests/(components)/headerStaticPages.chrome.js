import { test, expect } from "../../utils/fixtures";
const testData  = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
);

test.describe("test don't use cookie ", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  for (const { testID,expectedLink,locatorId,expectedTitle,} of testData.headerLinks) {
    test(`${testID} Check that header static badge ${locatorId} link navigate to corresponding pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open()
      
      //Assert
      await app.home.header.expectToBeOpenedNewPageAfterClick(
        app.home.header.linksInStaticHeader(locatorId), expectedLink)

      await expect(context.pages()[1]).toHaveTitle(new RegExp(expectedTitle))
    });
  }
});
test("Check charity query counter value at the Beginning", async ({
  app,
}) => {
  //Actions
  await app.home.open()

  //Assert
  await  app.home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("0");
});

test("Check charity query counter value after refresh page ", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.reloadPage();

  //Assert
  await app.home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("0");
});

test("Check charity query counter value after search and go back to main bage ", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible()
  await app.webPage.goBack();

  //Assert
  await app.home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("1");
});
test("Check that display of heart icon message in the header static pages", async ({ 
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.badgeCounter.clickBadgeCounter();

  //Assert
  await app.home.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});

test.describe("test use cookie", () => {
  test.use({ storageState: "./data/auth/user.json" });
  test("Check that email icon navigates to account/login page if user logged ", async ({
    app, context
  }) => {
    //Actions
    await app.home.open()

    //Assert
    await app.home.header.expectToBeOpenedNewPageAfterClick(
      app.home.header.badgeEmail, constantsData.URL_LOGIN_PAGE)

    await expect(context.pages()[1]).toHaveTitle(constantsData.TITLE_LOGIN_PAGE)
  });
});

