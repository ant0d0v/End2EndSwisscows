import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const dateTest = JSON.parse(
  JSON.stringify(require("../../data/hamburger/testData.json"))
);

test("Check  login User and display of nickname in hamburger menu", async ({
  home,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.header.clickHamburgerMenuButton();

  //Assert
  await webPage.header.hamburgerMenu.expectNicknameUserInHamburgerMenuToHave("TTest");
});

test("Check Log Out user and display of login button", async ({
  home,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.header.clickHamburgerMenuButton();
  await webPage.header.hamburgerMenu.clickLogoutButtonInHamburgerMenu();
  await webPage.header.clickHamburgerMenuButton();

  //Assert
  await webPage.header.hamburgerMenu.expectLoginButtonInHamburgerMenuIsDisplayed();
});

test("Texts of the links in the hamburger menu.", async ({
  home
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
  await home.headerStaticPages.clickHamburgerMenuButton();

  //Assert
  await home.headerStaticPages.hamburgerMenu.expectTextsOfLinksInHamburgerMenu(expectedTextsOfLinks);
});

test("Check availability and options of localization dropdown menu in hamburger Menu", async ({
  home
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
  await home.headerStaticPages.clickHamburgerMenuButton();
  await home.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();

  //Assert
  await home.headerStaticPages.hamburgerMenu.expectListToHaveCount(
    home.headerStaticPages.hamburgerMenu.textsLanguagesDropdownInHamburgerMenu,
    11
  );
  await home.headerStaticPages.hamburgerMenu.expectTextsOfLanguagesInHamburgerMenu(
    expectedTextsOfLanguagesDropdown
  );
});

test("Check  availability and options of region dropdown menu in hamburger menu", async ({
  home
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
  await home.headerStaticPages.clickHamburgerMenuButton();
  await home.headerStaticPages.hamburgerMenu.clickRegionDropdownInHamburgerMenu();

  //Assert
  await home.headerStaticPages.hamburgerMenu.expectListToHaveCount(
    home.headerStaticPages.hamburgerMenu.textsOfRegionDropdownInHamburgerMenu,
    48
  );
  await home.headerStaticPages.hamburgerMenu.expectTextsOfRegionInHamburgerMenu(
    expectedTextsOfRegionDropdown
  );
});
test("Check theme change to dark theme", async ({
  home
}) => {
  const expectedDarkBackground = /rgb\(24, 26, 28\)/;
  //Actions
  await home.headerStaticPages.clickHamburgerMenuButton();
  await home.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await home.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await home.headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(expectedDarkBackground);
});

test("Check theme change to light theme", async ({
  home
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await home.headerStaticPages.clickHamburgerMenuButton();
  await home.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await home.headerStaticPages.hamburgerMenu.clickLightInHamburgerMenu();

  //Assert
  await home.headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

test("Check default theme on first opening the site", async ({
  home
}) => {
  const expectedLightBackground = /rgb\(250, 251, 253\)/;
  //Actions
  await home.headerStaticPages.clickHamburgerMenuButton();
  await home.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();

  //Assert
  await home.headerStaticPages.hamburgerMenu.expectAttributeClassOfElement(
    home.headerStaticPages.hamburgerMenu.defaultThemeInHamburgerMenu,
    "active"
  );
  await home.headerStaticPages.hamburgerMenu.expectBackgroundColorOfPage(
    expectedLightBackground
  );
});

for (const {testID,expectedLink,locatorId,expectedTitle,} of dateTest.regionLinksOfHome) {
  test(`${testID} Check navigation to corresponding pages for ${locatorId} region`, async ({
    home,
    page,
  }) => {
    //Actions
    await home.headerStaticPages.clickHamburgerMenuButton();
    await home.headerStaticPages.hamburgerMenu.clickDropdownRegion();
    await home.headerStaticPages.hamburgerMenu.clickRegionLinkInDropdown(locatorId);

    //Assert
    await home.expectHaveUrl(page, expectedLink);
    await home.expectHaveTitle(page, expectedTitle);
  });
}
for (const {testID,expectedLink,locatorId,expectedTitle,} of dateTest.staticPagesLinks) {
  test(`${testID}  ${locatorId} content page links navigates to the corresponding page.`, async ({
    headerStaticPages,
    home,
    page
  }) => {
    //Actions
    await home.headerStaticPages.clickHamburgerMenuButton();
    await home.headerStaticPages.hamburgerMenu.clickLinkOfStaticPage(locatorId);

    //Assert
    await headerStaticPages.hamburgerMenu.expectHaveUrl(page, expectedLink);
    await headerStaticPages.hamburgerMenu.expectHaveTitle(page, expectedTitle);
  });
}
