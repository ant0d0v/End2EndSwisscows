import { test } from "../../utils/fixtures.js";
import {
  validateTextHamburgerComponent,
  validateTextFooterComponent,
  validateTextHeaderComponent
} from "../../locales/n18next.js";
import { readCsvFile } from "../../helpers/csvHelper.js";

const hamburgerTable = readCsvFile("../data/locales/hamburgerMenu.csv");
for (const { test_case, language, languageCode } of hamburgerTable) {
  test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
    await app.home.header.clickHamburgerMenuButton();

    //Assert
    await validateTextHamburgerComponent(app.home.page, "Logout", languageCode);
    await validateTextHamburgerComponent(app.home.page, "CharityProject", languageCode);
    await validateTextHamburgerComponent(app.home.page, "About_Swisscows", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Privacy", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Contact", languageCode);
    await validateTextHamburgerComponent(app.home.page, "MediaEducation_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Datacenter_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Default_Search_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Startpage_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Support_Search_Home_Menu", languageCode)
  });
}

const footerTable = readCsvFile("../data/locales/footerMenu.csv");
for (const { test_case, language, languageCode } of footerTable) {
  test(`${test_case} Check content of footer menu for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await validateTextFooterComponent(app.home.page, "CharityProject", languageCode);
    await validateTextFooterComponent(app.home.page, "About_Swisscows", languageCode);
    await validateTextFooterComponent(app.home.page, "Privacy", languageCode);
    await validateTextFooterComponent(app.home.page, "Contact", languageCode);
    await validateTextFooterComponent(app.home.page, "MediaEducation_Home_Menu", languageCode);
    await validateTextFooterComponent(app.home.page, "Datacenter_Home_Menu", languageCode);
    await validateTextFooterComponent(app.home.page, "Support_Search_Home_Menu", languageCode)
    await validateTextFooterComponent(app.home.page, "Imprint_Menu", languageCode);
    await validateTextFooterComponent(app.home.page, "Menu_AboutAG", languageCode)
    await validateTextFooterComponent(app.home.page, "Menu_About", languageCode)
    await validateTextFooterComponent(app.home.page, "Products", languageCode);
    await validateTextFooterComponent(app.home.page, "Donation", languageCode);
    await validateTextFooterComponent(app.home.page, "BlogSwisscows", languageCode);
  });
}

const header = readCsvFile("../data/locales/header.csv");
for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check search header for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany")
    await app.home.header.searchForm.inputSearchCriteria("test");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.header.clickHamburgerMenuButton();
    await app.webPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.webPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
    await app.webPage.header.clickFiltersButton();

    //Assert
    await validateTextHeaderComponent(app.webPage.page, "Web", languageCode);
    await validateTextHeaderComponent(app.webPage.page, "Images", languageCode);
    await validateTextHeaderComponent(app.webPage.page, "Video", languageCode);
    await validateTextHeaderComponent(app.webPage.page, "Music", languageCode);
    await validateTextHeaderComponent(app.webPage.page, "News", languageCode);
    await validateTextHeaderComponent(app.webPage.page, "Shopping", languageCode)
    await validateTextHeaderComponent(app.webPage.page, "Web_Freshness", languageCode)
  });
}
for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check web filters for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany")
    await app.home.header.searchForm.inputSearchCriteria("test");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.header.clickHamburgerMenuButton();
    await app.webPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.webPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
    await app.webPage.header.clickFiltersButton();

    //Assert
    await validateTextHeaderComponent(app.webPage.page, "Web_Freshness", languageCode)
  });
}

  for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check videos filters for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany")
    await app.home.header.searchForm.inputSearchCriteria("test");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton();
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.header.clickHamburgerMenuButton();
    await app.videoPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.videoPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
    await app.videoPage.header.clickFiltersButton();

    //Assert
    await validateTextHeaderComponent(app.videoPage.page, "Video_Publisher", languageCode)
    await validateTextHeaderComponent(app.videoPage.page, "Video_Freshness", languageCode)
    await validateTextHeaderComponent(app.videoPage.page, "View_List", languageCode)
  });
}
