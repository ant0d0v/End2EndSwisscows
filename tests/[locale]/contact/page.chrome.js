import { test } from "../../../utils/fixtures.js";
import validateText from "../../../locales/n18next.js";
import { readCsvFile,readSpecificCsvFile } from "../../../helpers/csvHelper.js";

const contactTable = readSpecificCsvFile("../data/locales/contact.csv");
for (const {test_case,language,expected_title,languageCode,
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
    await validateText(app.contactPage.page, "Contact", languageCode);
    await validateText(app.contactPage.page, "Contact_Agreement", languageCode);
    await validateText(app.contactPage.page, "Contact_Content", languageCode);
    await validateText(app.contactPage.page, "Contact_Send", languageCode);
    await app.expectHaveTitle(app.contactPage.page, expected_title);
  });
}
