import { test } from "../../utils/fixtures";
const testData = JSON.parse(
  JSON.stringify(require("../../data/hamburger/testData.json"))
);

test("Check display of nickname and avatar in hamburger menu", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickHamburgerMenuButton();

  //Assert
  await app.webPage.header.hamburgerMenu.avatar.expectNicknameToHaveText("TTest");
  await app.webPage.header.hamburgerMenu.avatar.expectAvatarToBeVisible()
});

test("Check Log Out user and display of login button", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.searchForm.inputSearchCriteria("best");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.clickLogoutButtonInHamburgerMenu();
  await app.webPage.header.clickHamburgerMenuButton();

  //Assert
  await app.webPage.header.hamburgerMenu.expectLoginButtonInHamburgerMenuIsDisplayed();
});

test("Texts of the links in the hamburger menu.", async ({
  app
}) => {
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();

  //Assert
  await app.home.header.hamburgerMenu.expectTextsOfLinksInHamburgerMenu(
    testData.expectedTextsHamburgerLinks);
});

test("Check availability and options of localization dropdown menu in hamburger Menu", async ({
  app
}) => {
 ;
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();

  //Assert
  await app.home.header.hamburgerMenu.expectListToHaveCount(
    app.home.header.hamburgerMenu.textsLanguagesDropdownInHamburgerMenu, 11
  );
  await app.home.header.hamburgerMenu.expectTextsOfLanguagesInHamburgerMenu(
    testData.expectedTextsOfLanguagesDropdown
  );
});

test("Check  availability and options of region dropdown menu in hamburger menu", async ({
  app
}) => {
 
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickRegionDropdownInHamburgerMenu();

  //Assert
  await app.home.header.hamburgerMenu.expectListToHaveCount(
    app.home.header.hamburgerMenu.textsOfRegionDropdownInHamburgerMenu, 48
  );
  await app.home.header.hamburgerMenu.expectTextsOfRegionInHamburgerMenu(
    testData.expectedTextsOfRegionDropdown
  );
});
test("Check theme change to dark theme", async ({
  app
}) => {
  const expectedDarkBackground = /rgb\(24, 26, 28\)/;
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await app.home.header.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await app.home.header.hamburgerMenu.expectBackgroundColorOfPage(expectedDarkBackground);
});

test("Check theme change to light theme", async ({
  app
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await app.home.header.hamburgerMenu.clickLightInHamburgerMenu();

  //Assert
  await app.home.header.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

test("Check default theme on first opening the site", async ({
  app
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await app.home.open()
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();

  //Assert
  await app.home.header.hamburgerMenu.expectAttributeClassOfElement(
    app.home.header.hamburgerMenu.defaultThemeInHamburgerMenu, "active"
  );
  await app.home.header.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

for (const {testID,expectedLink,locatorId,expectedTitle,} of testData.regionLinksOfHome) {
  test(`${testID} Check navigation to corresponding pages for ${locatorId} region`, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickDropdownRegion();
    await app.home.header.hamburgerMenu.clickRegionLinkInDropdown(locatorId);

    //Assert
    await app.home.expectHaveUrl(app.home.page, expectedLink);
    await app.home.expectHaveTitle(app.home.page, expectedTitle);
  });
}
for (const {testID,expectedLink,locatorId,expectedTitle,} of testData.staticPagesLinks) {
  test(`${testID}  ${locatorId} content page links navigates to the corresponding page.`, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLinkOfStaticPage(locatorId);

    //Assert
    await app.home.header.hamburgerMenu.expectHaveUrl(app.home.page, expectedLink);
    await app.home.header.hamburgerMenu.expectHaveTitle(app.home.page, expectedTitle);
  });
}
