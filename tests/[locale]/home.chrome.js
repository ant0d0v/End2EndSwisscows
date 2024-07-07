import { test } from "../../utils/fixtures.js";
import { validateText } from "../../locales/n18next.js";
import { readCsvFile } from "../../helpers/csvHelper.js";

const home = readCsvFile("../data/locales/home.csv");
for (const { test_case, language, expected_title, languageCode } of home) {
  test(`${test_case} Check content of home page for ${language} localization`, async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.installSwisscowsLink.clickCloseButtonInExtensionPopup();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await validateText(app.home.page, "Startpage_BlockDescription_1", languageCode);
    await validateText(app.home.page, "Startpage_BlockDescription_2", languageCode);
    await validateText(app.home.page, "Startpage_BlockDescription_3", languageCode);
    await validateText(app.home.page, "Startpage_BlockDescription_4", languageCode);
    await validateText(app.home.page, "Startpage_BlockDescription_5", languageCode);
    await validateText(app.home.page, "Startpage_BlockTitle_1", languageCode);
    await validateText(app.home.page, "Startpage_BlockTitle_2", languageCode);
    await validateText(app.home.page, "Startpage_BlockTitle_3", languageCode);
    await validateText(app.home.page, "Startpage_BlockTitle_4", languageCode);
    await validateText(app.home.page, "Startpage_BlockTitle_5", languageCode);
    await validateText(app.home.page, "Startpage_BlogDescription",languageCode);
    await validateText(app.home.page, "Startpage_BlogLink", languageCode);
    await validateText(app.home.page, "Startpage_FanShopDescription",languageCode);
    await validateText(app.home.page, "Startpage_FanShopLink", languageCode);
    await validateText(app.home.page, "Startpage_HESDescription", languageCode);
    await validateText(app.home.page, "StartpageTagline_Title", languageCode);
    await app.expectHaveTitle(app.home.page, expected_title);
  });
}

for (const { test_case, language, languageCode } of home) {
  test(`${test_case} Check header of home page for ${language} localization`, async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.installSwisscowsLink.clickCloseButtonInExtensionPopup();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
    await app.home.header.clickBadgeCounter();

    //Assert
    await validateText(app.home.page, "Startpage_TaglineList_1", languageCode);
    await validateText(app.home.page, "Startpage_TaglineList_3", languageCode);
    await validateText(app.home.page, "Startpage_Tagline", languageCode);
    await validateText(app.home.page, "Search_Counter_Hint", languageCode);
  });
}

for (const { test_case, language, languageCode } of home) {
  test(`${test_case} Check FAQ of home page for ${language} localization`, async ({
    app,
  }, testInfo) => {
    //Actions
    await app.home.open();
    await app.home.installSwisscowsLink.clickCloseButtonInExtensionPopup();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await validateText(app.home.page, "Startpage_FAQ_Title", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Question1", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Question2", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Question3", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Question4", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Question5", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Question6", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Answer1", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Answer2", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Answer3", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Answer4", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Answer5", languageCode);
    await validateText(app.home.page, "Startpage_FAQ_Answer6", languageCode);
  });
}
