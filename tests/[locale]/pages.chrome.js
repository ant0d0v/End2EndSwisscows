import { test } from "../../utils/fixtures.js";
import { validateText } from "../../locales/n18next.js";
import { readCsvFile,readSpecificCsvFile } from "../../helpers/csvHelper.js";

const contactTable = readSpecificCsvFile("../data/locales/contact.csv");
for (const {test_case,language,expected_title,languageCode,
} of contactTable) {
  test.fixme(`${test_case} Check content of contact us  page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.contactPage.open();
    await app.contactPage.header.clickHamburgerMenuButton();
    await app.contactPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.contactPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await validateText(app.contactPage.page, "Contact", languageCode);
    await validateText(app.contactPage.page, "Contact_Agreement", languageCode);
    await validateText(app.contactPage.page, "Contact_Content", languageCode);
    await validateText(app.contactPage.page, "Contact_Send", languageCode);
    await app.expectHaveTitle(app.contactPage.page, expected_title);
  });
}

const datacenter = readSpecificCsvFile("../data/locales/datacenter.csv");
for (const {test_case,language,expected_title,languageCode,
} of datacenter) {
  test.fixme(`${test_case} Check content of datacenter  page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.datacenterPage.open();
    await app.datacenterPage.header.clickHamburgerMenuButton();
    await app.datacenterPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.datacenterPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await validateText(app.datacenterPage.page, "Datacenter", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockTitle_1", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockDescription_1", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockDescription_2", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockDescription_3", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockDescription_4", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockDescription_5", languageCode);
    await validateText(app.datacenterPage.page, "Datacenter_BlockDescription_6", languageCode);
    await app.expectHaveTitle(app.datacenterPage.page, expected_title);
  });
}

const imprint = readCsvFile("../data/locales/imprint.csv");
for (const { test_case, language, expected_title, languageCode } of imprint) {
  test.fixme(`${test_case} Check content of imprint page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.imprintPage.open()
    await app.imprintPage.header.clickHamburgerMenuButton();
    await app.imprintPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.imprintPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await validateText(app.imprintPage.page, "Imprint", languageCode);
    await validateText(app.imprintPage.page, "Imprint_Title", languageCode);
    await validateText(app.imprintPage.page, "Imprint_BlockDescription_1", languageCode);
    await validateText(app.imprintPage.page, "Imprint_BlockDescription_2", languageCode);
    await validateText(app.imprintPage.page, "Imprint_BlockDescription_3", languageCode);
    await validateText(app.imprintPage.page, "Imprint_BlockDescription_4", languageCode);
    await validateText(app.imprintPage.page, "Imprint_BlockDescription_5", languageCode);
    await app.expectHaveTitle(app.imprintPage.page, expected_title);
  });
}

const education = readCsvFile("../data/locales/education.csv");
for (const { test_case, language, expected_title, languageCode } of education) {
  test.fixme(`${test_case} Check content of education  page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.mediaEducationPage.open()
    await app.mediaEducationPage.header.clickHamburgerMenuButton();
    await app.mediaEducationPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.mediaEducationPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await validateText(app.mediaEducationPage.page, "MediaEducation", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_OpenFlyer", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BrochureTitle", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BrochureDescription", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BlockTitle_1", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BlockTitle_2", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationTitle", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationTitle", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationWrap_1", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationWrap_2", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationWrap_3", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationWrap_4", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_DigitizationWrap_5", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_List", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BlockDescription_1", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BlockDescription_2", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BlockDescription_3", languageCode);
    await validateText(app.mediaEducationPage.page, "MediaEducation_BlockDescription_4", languageCode);
    await app.expectHaveTitle(app.mediaEducationPage.page, expected_title);
  });
}

const charity = readSpecificCsvFile("../data/locales/charity.csv");
for (const { test_case, language, expected_title, languageCode } of charity) {
  test.fixme(`${test_case} Check content of charity page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.charityPage.open();
    await app.charityPage.header.clickHamburgerMenuButton();
    await app.charityPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.charityPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await validateText(app.charityPage.page, "CharityProject", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockTitle_1", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockTitle_2", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockTitle_3", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_1", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_2", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_3", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_4", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_5", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_6", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_7", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_8", languageCode);
    await validateText(app.charityPage.page, "Charity_BlockDescription_9", languageCode);
    await app.expectHaveTitle(app.charityPage.page, expected_title);
  });
}



