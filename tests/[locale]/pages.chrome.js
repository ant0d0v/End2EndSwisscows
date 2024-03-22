import { test } from "../../utils/fixturePages";
import { readCsvFile, readSpecificCsvFile } from "../../helpers/csvHelper"

const mainTable = readCsvFile('../localization/main.csv')
for (const { test_case, language, expected_content} of mainTable) {
  test(`${test_case} Check content of home page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.home.expectElementToHaveText(app.home.allContent,expected_content)
  });
}

const contactTable = readCsvFile('../localization/contact.csv')
for (const { test_case, language, expected_content} of contactTable) {
  test(`${test_case} Check content of contact Us page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.contactPage.open()
    await app.contactPage.header.clickHamburgerMenuButton();
    await app.contactPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.contactPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.contactPage.expectElementToHaveText(app.contactPage.allContent,expected_content)
  });
}

const charityTable = readCsvFile('../localization/charity.csv')
for (const { test_case, language, expected_content} of charityTable) {
  test(`${test_case} Check content of charity page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.charityPage.open()
    await app.charityPage.header.clickHamburgerMenuButton();
    await app.charityPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.charityPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.charityPage.expectElementToHaveText(app.charityPage.allContent, expected_content)
  });
}

const datacenterTable = readCsvFile('../localization/datacenter.csv')
for (const { test_case, language, expected_content} of datacenterTable) {
  test(`${test_case} Check content of datacenter page for  ${language} localization`, async ({
   app
  }) => {
    //Actions
    await app.datacenterPage.open()
    await app.datacenterPage.header.clickHamburgerMenuButton();
    await app.datacenterPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.datacenterPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.datacenterPage.expectElementToHaveText(app.datacenterPage.allContent, expected_content)
  });
}

const educationTable = readSpecificCsvFile('../localization/education.csv')
for (const { test_case, language, expected_content} of educationTable) {
  test(`${test_case} Check content of education page for  ${language} localization`, async ({
   app
  }) => {
    //Actions
    await app.mediaEducationPage.open()
    await app.mediaEducationPage.header.clickHamburgerMenuButton();
    await app.mediaEducationPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.mediaEducationPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.mediaEducationPage.expectElementToHaveText(app.mediaEducationPage.allContent, expected_content)
  });
}

const imprintTable = readCsvFile('../localization/imprint.csv')
for (const { test_case, language, expected_content} of imprintTable) {
  test(`${test_case} Check content of imprint page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.imprintPage.open()
    await app.imprintPage.header.clickHamburgerMenuButton();
    await app.imprintPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.imprintPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.imprintPage.expectElementToHaveText(app.imprintPage.allContent, expected_content)
  });
}

const aboutTable = readCsvFile('../localization/about.csv')
for (const { test_case, language, expected_content} of aboutTable) {
  test(`${test_case} Check content of About Page page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.aboutPage.open()
    await app.aboutPage.header.clickHamburgerMenuButton();
    await app.aboutPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.aboutPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.aboutPage.expectElementToHaveText(app.aboutPage.allContent, expected_content)
  });
}
