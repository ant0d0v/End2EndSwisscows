import { test } from "../../../utils/fixtures.js";
import validateText from "../../../locales/n18next.js";
import { readCsvFile,readSpecificCsvFile } from "../../../helpers/csvHelper.js";

const charity = readSpecificCsvFile("../data/locales/charity.csv");
for (const { test_case, language, expected_title, languageCode } of charity) {
  test(`${test_case} Check content of contact us  page for ${language} localization`, async ({
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
