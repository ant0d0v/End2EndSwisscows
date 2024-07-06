import { test } from "../../../utils/fixtures.js";
import validateText from "../../../locales/n18next.js";
import { readCsvFile } from "../../../helpers/csvHelper.js";

const education = readCsvFile("../data/locales/education.csv");
for (const { test_case, language, expected_title, languageCode } of education) {
  test(`${test_case} Check content of contact us  page for ${language} localization`, async ({
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
