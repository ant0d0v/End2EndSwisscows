import { test } from "../../utils/fixtures.js";
import { readCsvFile, readSpecificCsvFile } from "../../helpers/csvHelper.js";

const contactTable = readSpecificCsvFile("../data/locales/contact.csv");
for (const {
  test_case,
  language,
  expected_title,
  languageCode,
} of contactTable) {
  test(`${test_case} Check content of contact us  page for ${language} localization`, async ({
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
    await app.contactPage.expectTranslationsForContent({
      translationKey_1: "Contact",
      translationKey_2: "Contact_Content",
      locale: languageCode,
    });
    await app.contactPage.form.expectTranslationsForButton({
      translationKey_1: "Contact_Send",
      locale: languageCode,
    });
    await app.contactPage.form.expectTranslationsForAgreement({
      translationKey_1: "Contact_Agreement",
      locale: languageCode,
    });
    await app.expectHaveTitle(app.contactPage.page, expected_title);
  });
}

const datacenter = readSpecificCsvFile("../data/locales/datacenter.csv");
for (const {
  test_case,
  language,
  expected_title,
  languageCode,
} of datacenter) {
  test(`${test_case} Check content of datacenter  page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.datacenterPage.open();
    await app.datacenterPage.header.clickHamburgerMenuButton();
    await app.datacenterPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.datacenterPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await app.datacenterPage.expectTranslationsForDescriptions({
      translationKey_1: "Datacenter_BlockDescription_1",
      translationKey_2: "Datacenter_BlockDescription_2",
      translationKey_3: "Datacenter_BlockDescription_3",
      translationKey_4: "Datacenter_CertificatDescription",
      translationKey_5: "Datacenter_BlockDescription_4",
      translationKey_6: "Datacenter_BlockDescription_5",
      translationKey_7:
        language === "Русский" || language === "Українська"
          ? ""
          : "Datacenter_BlockDescription_6",
      locale: languageCode,
    });
    await app.datacenterPage.expectTranslationsForTitle({
      translationKey_1: "Datacenter_Title",
      translationKey_2: "Datacenter_BlockTitle",
      locale: languageCode,
    });
    await app.expectHaveTitle(app.datacenterPage.page, expected_title);
  });
}

const imprint = readCsvFile("../data/locales/imprint.csv");
for (const { test_case, language, expected_title, languageCode } of imprint) {
  test(`${test_case} Check content of imprint page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.imprintPage.open();
    await app.imprintPage.header.clickHamburgerMenuButton();
    await app.imprintPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.imprintPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await app.imprintPage.expectTranslationsForPublishingInfo({
      translationKey_1: "Imprint_PublishingInfo_Title",
      translationKey_2: "Imprint_PublishingInfo_Description_1",
      translationKey_3: "Imprint_PublishingInfo_Description_2",
      translationKey_4: "Imprint_PublishingInfo_Description_3",
      translationKey_5: "Imprint_PublishingInfo_Description_4",
      translationKey_6: "Imprint_PublishingInfo_Description_5",
      locale: languageCode,
    });
    await app.imprintPage.expectTranslationsForLocation({
      translationKey: "Imprint_Location_Info",
      locale: languageCode,
    });
    await app.imprintPage.expectTranslationsForTitle({
      translationKey: "Imprint",
      locale: languageCode,
    });
    await app.expectHaveTitle(app.imprintPage.page, expected_title);
  });
}

const education = readCsvFile("../data/locales/education.csv");
for (const { test_case, language, expected_title, languageCode } of education) {
  test(`${test_case} Check content of education  page for ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.mediaEducationPage.open();
      await app.mediaEducationPage.header.clickHamburgerMenuButton();
      await app.mediaEducationPage.header.hamburgerMenu.clickLanguagesDropdown();
      await app.mediaEducationPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
        language
      );

      //Assert 
      await app.mediaEducationPage.expectTranslationsForDescriptions({
        translationKey_1: "MediaEducation_BlockDescription_1",
        translationKey_2: "MediaEducation_BlockDescription_2",
        translationKey_3: "MediaEducation_BlockDescription_3",
        translationKey_4: "MediaEducation_BlockDescription_4",
        translationKey_5: "MediaEducation_BlockDescription_5",
        translationKey_6: "MediaEducation_DigitizationTitle",
        translationKey_7: "MediaEducation_DigitizationWrap_1",
        translationKey_8: "MediaEducation_DigitizationWrap_2",
        translationKey_9: "MediaEducation_DigitizationWrap_3",
        translationKey_10: "MediaEducation_DigitizationWrap_4",
        translationKey_11: "MediaEducation_DigitizationWrap_5",
        translationKey_12: "MediaEducation_BlockDescription_6",
        translationKey_13: "MediaEducation_BrochureTitle",
        translationKey_14: "MediaEducation_BrochureDescription",
        locale: languageCode,
      });
      await app.mediaEducationPage.expectTranslationsForFlayerButton({
        translationKey: "MediaEducation_OpenFlyer",
        locale: languageCode
      });
      await app.mediaEducationPage.expectTranslationsForBlockTitle({
        translationKey_1: "MediaEducation_BlockTitle_1",
        translationKey_2: "MediaEducation_BlockTitle_2",
        locale: languageCode
      });
      await app.mediaEducationPage.expectTranslationsForMediaeduList({
        translationKey: "MediaEducation_List",
        locale: languageCode,
      });
      await app.expectHaveTitle(app.mediaEducationPage.page, expected_title);
    }
  );
}

const charity = readSpecificCsvFile("../data/locales/charity.csv");
for (const { test_case, language, expected_title, languageCode } of charity) {
  test(`${test_case} Check content of charity page for ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.charityPage.open();
      await app.charityPage.header.clickHamburgerMenuButton();
      await app.charityPage.header.hamburgerMenu.clickLanguagesDropdown();
      await app.charityPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
        language
      );
      
      //Assert
      await app.charityPage.expectTranslationsForDescriptions({
        translationKey_1: "Charity_BlockDescription_1",
        translationKey_2: "Charity_BlockDescription_2",
        translationKey_3: "Charity_BlockDescription_3",
        translationKey_4: "Charity_BlockDescription_4",
        translationKey_5: "Charity_BlockDescription_5",
        translationKey_6: "Charity_BlockDescription_6",
        translationKey_7: "Charity_BlockDescription_7",
        translationKey_8: "Charity_BlockDescription_8",
        translationKey_9: "Charity_BlockDescription_9",
        translationKey_10: "Charity_BlockDescription_10",
        translationKey_11: "Charity_BlockDescription_11",
        translationKey_12: "Charity_BlockDescription_12",
        translationKey_13:
          language === "Deutsch" || language === "Português"
            ? "Charity_BlockDescription_13"
            : "",
        locale: languageCode,
      });
      await app.charityPage.expectTranslationsForBlockTitle({
        translationKey_1: "Charity_Title",
        translationKey_2: "Charity_BlockTitle_1",
        translationKey_3: "Charity_BlockTitle_2",
        translationKey_4: "Charity_BlockTitle_3",
        locale: languageCode,
      });
      await app.expectHaveTitle(app.charityPage.page, expected_title);
    }
  );
}
