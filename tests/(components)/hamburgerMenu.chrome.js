import { test } from "../../utils/fixtures.js";
import testData from "../../data/hamburger/testData.json";
import { faker } from "@faker-js/faker";

test("Check display of nickname and avatar in hamburger menu", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();

  //Assert
  await app.webPage.header.hamburgerMenu.avatar.expectNicknameToHaveText(
    "TTest"
  );
  await app.webPage.header.hamburgerMenu.avatar.expectAvatarToBeVisible();
});

test("Check Log Out user and display of login button", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.word.sample());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.clickLogoutButton();
  await app.webPage.header.clickHamburgerMenuButton();

  //Assert
  await app.webPage.header.hamburgerMenu.expectLoginButtonIsDisplayed();
});

test("Check redirect to profile when clicking on avatar", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickAvatar();

  //Assert
  await app.expectPageToHaveUrl(app.page, /accounts.dev.swisscows.com/);
  await app.expectHaveTitle(app.page, /Dashboard - Swisscows Accounts/);
});

test("Check availability and options of localization dropdown menu in hamburger Menu", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLanguagesDropdown();

  //Assert
  await app.home.header.hamburgerMenu.expectLanguagesDropdownToHaveCount(11);
  await app.home.header.hamburgerMenu.expectLanguagesDropdownToHaveText(
    testData.expectedTextsOfLanguagesDropdown
  );
});

test("Check  availability and options of region dropdown menu in hamburger menu", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickRegionDropdown();

  //Assert
  await app.home.header.hamburgerMenu.expectRegionDropdownToHaveCount(43);
  await app.home.header.hamburgerMenu.expectRegionDropdownToHaveText(
    testData.expectedTextsOfRegionDropdown
  );
});

for (const {
  testID,
  expectedLink,
  locatorId,
  expectedTitle,
} of testData.regionLinksOfHome) {
  test(`${testID} Check navigation to corresponding pages for ${locatorId} region`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickDropdownRegion();
    await app.home.header.hamburgerMenu.clickRegionLinkInDropdown(locatorId);

    //Assert
    await app.expectPageToHaveUrl(app.page, expectedLink);
    await app.expectHaveTitle(app.page, expectedTitle);
  });
}
for (const {
  testID,
  expectedLink,
  locatorId,
  expectedTitle,
} of testData.staticPagesLinks) {
  test(`${testID}  ${locatorId} content page links navigates to the corresponding page.`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLinkOfStaticPage(locatorId);

    //Assert
    await app.expectPageToHaveUrl(app.page, expectedLink);
    await app.expectHaveTitle(app.page, expectedTitle);
  });
}

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test("Check design of hamburger menu component", async ({ app }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.clickHamburgerMenuButton();

    //Assert
    await app.home.header.hamburgerMenu.takeSnapshot(testInfo);
  });
});