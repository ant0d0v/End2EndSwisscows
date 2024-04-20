import { test, expect } from "../../utils/fixtures";

const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
);

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
  test("Check that email badge navigate to account/login page if user logged ", async ({
    app, context
  }) => {
    //Actions
    await app.home.open()

    //Assert
    await app.home.header.expectToBeOpenedNewPageAfterClick(
      app.home.header.badgeEmail.badge, constantsData.URL_LOGIN_PAGE)

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_LOGIN_PAGE)
  });
});

test.describe("test don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
    test(`Check that email badge link navigate to corresponding pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open()
      
      //Assert
      await app.home.header.expectToBeOpenedNewPageAfterClick(
        app.home.header.badgeEmail.badge, constantsData.URL_EMAIL_PAGE)

      await app.expectNewPageToHaveTitle(context, constantsData.TITLE_EMAIL_PAGE)
    });

    test(`Check that Teleguard badge link navigate to corresponding pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open()
      
      //Assert
      await app.home.header.expectToBeOpenedNewPageAfterClick(
        app.home.header.badgeTeleguard.badge, constantsData.URL_TELEGUARD_PAGE)

      await app.expectNewPageToHaveTitle(context, constantsData.TITLE_TELEGUARD_PAGE)
    });

    test(`Check that VPN badge link navigate to corresponding pages`, async ({
      app, context
    }) => {
      //Actions
      await app.home.open()
      
      //Assert
      await app.home.header.expectToBeOpenedNewPageAfterClick(
        app.home.header.badgeVPN.badge, constantsData.URL_VPN_PAGE)

      await app.expectNewPageToHaveTitle(context, constantsData.TITLE_VPN_PAGE)
    });
  })
