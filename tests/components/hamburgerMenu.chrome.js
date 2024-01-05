import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const dateTest = JSON.parse(
  JSON.stringify(require("../../data/hamburger/testData.json"))
);

test("Check  login User and display of nickname in hamburger menu", async ({
  headerStaticPages,
  header
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickHamburgerMenuButton();

  //Assert
  await header.hamburgerMenu.expectNicknameUserInHamburgerMenuToHave("TTest");
});

test("Check Log Out user and display of login button", async ({
  headerStaticPages,
  header
}) => {
  //Actions
  await headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await headerStaticPages.autocomplete.clickEnterSearchField();
  await header.clickHamburgerMenuButton();
  await header.hamburgerMenu.clickLogoutButtonInHamburgerMenu();
  await header.clickHamburgerMenuButton();

  //Assert
  await header.hamburgerMenu.expectLoginButtonInHamburgerMenuIsDisplayed();
});

test("Texts of the links in the hamburger menu.", async ({
  headerStaticPages
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
  await headerStaticPages.clickHamburgerMenuButton();

  //Assert
  await headerStaticPages.hamburgerMenu.expectTextsOfLinksInHamburgerMenu(expectedTextsOfLinks);
});

test("Check availability and options of localization dropdown menu in hamburger Menu", async ({
  headerStaticPages
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
  await headerStaticPages.clickHamburgerMenuButton();
  await headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();

  //Assert
  await headerStaticPages.hamburgerMenu.expectListSize(
    headerStaticPages.hamburgerMenu.textsOflanguagesDropdownInHamburgerMenu,
    11
  );
  await headerStaticPages.hamburgerMenu.expectTextsOfLanguagesInHamburgerMenu(
    expectedTextsOfLanguagesDropdown
  );
});

test("Check  availability and options of region dropdown menu in hamburger menu", async ({
  headerStaticPages
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
  await headerStaticPages.clickHamburgerMenuButton();
  await headerStaticPages.hamburgerMenu.clickRegionDropdownInHamburgerMenu();

  //Assert
  await headerStaticPages.hamburgerMenu.expectListSize(
    headerStaticPages.hamburgerMenu.textsOfRegionDropdownInHamburgerMenu,
    48
  );
  await headerStaticPages.hamburgerMenu.expectTextsOfRegionInHamburgerMenu(
    expectedTextsOfRegionDropdown
  );
});
test("Check theme change to dark theme", async ({
  headerStaticPages
}) => {
  const expectedDarkBackground = /rgb\(24, 26, 28\)/;
  //Actions
  await headerStaticPages.clickHamburgerMenuButton();
  await headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedDarkBackground
  );
});

test("Check theme change to light theme", async ({
  headerStaticPages
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await headerStaticPages.clickHamburgerMenuButton();
  await headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await headerStaticPages.hamburgerMenu.clickLightInHamburgerMenu();

  //Assert
  await headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

test("Check default theme on first opening the site", async ({
  headerStaticPages
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await headerStaticPages.clickHamburgerMenuButton();
  await headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();

  //Assert
  await headerStaticPages.hamburgerMenu.expectAttributeClassOfElement(
    headerStaticPages.hamburgerMenu.defaultThemeInHemburgerMenu,
    "active"
  );
  await headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

for (const {testID,expectedLink,locatorId,expectedTitle,} of dateTest.regionLinksOfMainPage) {
  test(`${testID} Check navigation to corresponding pages for ${locatorId} region`, async ({
    headerStaticPages,
    mainPage,
    page,
  }) => {
    //Actions
    await headerStaticPages.clickHamburgerMenuButton();
    await headerStaticPages.hamburgerMenu.clickDropdownRegion();
    await headerStaticPages.hamburgerMenu.clickRegioLinkInDropdown(locatorId);

    //Assert
    await mainPage.expectHaveUrl(page, expectedLink);
    await mainPage.expectHaveTitle(page, expectedTitle);
  });
}
for (const {testID,expectedLink,locatorId,expectedTitle,} of dateTest.staticPagesLinks) {
  test(`${testID}  ${locatorId} content page links navigates to the corresponding page.`, async ({
    headerStaticPages,
    page
  }) => {
    //Actions
    await headerStaticPages.clickHamburgerMenuButton();
    await headerStaticPages.hamburgerMenu.clickLinkOfStaticPage(locatorId);

    //Assert
    await headerStaticPages.hamburgerMenu.expectHaveUrl(page, expectedLink);
    await headerStaticPages.hamburgerMenu.expectHaveTitle(page, expectedTitle);
  });
}
