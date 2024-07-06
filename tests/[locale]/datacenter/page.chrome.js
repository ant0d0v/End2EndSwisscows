import { test } from "../../../utils/fixtures.js";
import validateText from "../../../locales/n18next.js";
import { readCsvFile,readSpecificCsvFile } from "../../../helpers/csvHelper.js";

const datacenter = readSpecificCsvFile("../data/locales/datacenter.csv");
for (const {test_case,language,expected_title,languageCode,
} of datacenter) {
  test(`${test_case} Check content of contact us  page for ${language} localization`, async ({
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
