import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const dateTest = JSON.parse(
  JSON.stringify(require("../../data/hamburger/testData.json"))
);

test("Check  login User and display of nickname in hamburger menu", async ({
  mainPage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.header.clickHamburgerMenuButton();

  //Assert
  await webPage.header.hamburgerMenu.expectNicknameUserInHamburgerMenuToHave("TTest");
});

test("Check Log Out user and display of login button", async ({
  mainPage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.header.clickHamburgerMenuButton();
  await webPage.header.hamburgerMenu.clickLogoutButtonInHamburgerMenu();
  await webPage.header.clickHamburgerMenuButton();

  //Assert
  await webPage.header.hamburgerMenu.expectLoginButtonInHamburgerMenuIsDisplayed();
});

test("Texts of the links in the hamburger menu.", async ({
  mainPage
}) => {
  const expectedTextsOfLinks = [
    "Set as Startpage",
    "Make a Default Search Engine",
    "Who we are",
    "Media Education",
    "Charity Project",
    "Our Datacenter",
    "Contact us",
    "Data privacy",
    "Donation",
    "Support",
  ];
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();

  //Assert
  await mainPage.headerStaticPages.hamburgerMenu.expectTextsOfLinksInHamburgerMenu(expectedTextsOfLinks);
});

test("Check availability and options of localization dropdown menu in hamburger Menu", async ({
  mainPage
}) => {
  const expectedTextsOfLanguagesDropdown = [
    "English",
    "Deutsch",
    "Español",
    "Français",
    "Italiano",
    "Latviešu",
    "Magyar",
    "Nederlands",
    "Português",
    "Русский",
    "Українська",
  ];
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();

  //Assert
  await mainPage.headerStaticPages.hamburgerMenu.expectListToHaveCount(
    mainPage.headerStaticPages.hamburgerMenu.textsLanguagesDropdownInHamburgerMenu,
    11
  );
  await mainPage.headerStaticPages.hamburgerMenu.expectTextsOfLanguagesInHamburgerMenu(
    expectedTextsOfLanguagesDropdown
  );
});

test("Check  availability and options of region dropdown menu in hamburger menu", async ({
  mainPage
}) => {
  const expectedTextsOfRegionDropdown = [
    "Argentina",
    "Australia",
    "Austria",
    "Belgium (FR)",
    "Belgium (NL)",
    "Brazil",
    "Canada (EN)",
    "Canada (FR)",
    "Chile",
    "China",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Hong Kong SAR",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Italy",
    "Japan",
    "Kazakhstan",
    "Korea",
    "Latvia",
    "Malaysia",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Paraguay",
    "Philippines",
    "Poland",
    "Portugal",
    "Russia",
    "Saudi Arabia",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland (DE)",
    "Switzerland (FR)",
    "Taiwan",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "United States (EN)",
    "United States (ES)",
    "World-wide",
  ];
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.clickRegionDropdownInHamburgerMenu();

  //Assert
  await mainPage.headerStaticPages.hamburgerMenu.expectListToHaveCount(
    mainPage.headerStaticPages.hamburgerMenu.textsOfRegionDropdownInHamburgerMenu,
    48
  );
  await mainPage.headerStaticPages.hamburgerMenu.expectTextsOfRegionInHamburgerMenu(
    expectedTextsOfRegionDropdown
  );
});
test("Check theme change to dark theme", async ({
  mainPage
}) => {
  const expectedDarkBackground = /rgb\(24, 26, 28\)/;
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await mainPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await mainPage.headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(expectedDarkBackground);
});

test("Check theme change to light theme", async ({
  mainPage
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await mainPage.headerStaticPages.hamburgerMenu.clickLightInHamburgerMenu();

  //Assert
  await mainPage.headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

test("Check default theme on first opening the site", async ({
  mainPage
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();

  //Assert
  await mainPage.headerStaticPages.hamburgerMenu.expectAttributeClassOfElement(
    mainPage.headerStaticPages.hamburgerMenu.defaultThemeInHamburgerMenu,
    "active"
  );
  await mainPage.headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

for (const {testID,expectedLink,locatorId,expectedTitle,} of dateTest.regionLinksOfMainPage) {
  test(`${testID} Check navigation to corresponding pages for ${locatorId} region`, async ({
    mainPage,
    page,
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.clickDropdownRegion();
    await mainPage.headerStaticPages.hamburgerMenu.clickRegionLinkInDropdown(locatorId);

    //Assert
    await mainPage.expectHaveUrl(page, expectedLink);
    await mainPage.expectHaveTitle(page, expectedTitle);
  });
}
for (const {testID,expectedLink,locatorId,expectedTitle,} of dateTest.staticPagesLinks) {
  test(`${testID}  ${locatorId} content page links navigates to the corresponding page.`, async ({
    headerStaticPages,
    mainPage,
    page
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.clickLinkOfStaticPage(locatorId);

    //Assert
    await headerStaticPages.hamburgerMenu.expectHaveUrl(page, expectedLink);
    await headerStaticPages.hamburgerMenu.expectHaveTitle(page, expectedTitle);
  });
}
