import { test } from "../../utils/fixturePages";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';


const mainTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/main.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of mainTable) {
  test(`${test_case} Check content of home page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.home.expectElementToHaveText(app.home.allContent,expected_content)
  });
}

const contactTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/contact.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of contactTable) {
  test(`${test_case} Check content of contact Us page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.contactPage.open()
    await app.contactPage.header.clickHamburgerMenuButton();
    await app.contactPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.contactPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.contactPage.expectElementToHaveText(app.contactPage.allContent,expected_content)
  });
}

const charityTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/charity.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of charityTable) {
  test(`${test_case} Check content of charity page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.charityPage.open()
    await app.charityPage.header.clickHamburgerMenuButton();
    await app.charityPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.charityPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.charityPage.expectElementToHaveText(app.charityPage.allContent, expected_content)
  });
}

const datacenterTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/datacenter.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of datacenterTable) {
  test(`${test_case} Check content of datacenter page for  ${language} localization`, async ({
   app
  }) => {
    //Actions
    await app.datacenterPage.open()
    await app.datacenterPage.header.clickHamburgerMenuButton();
    await app.datacenterPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.datacenterPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.datacenterPage.expectElementToHaveText(app.datacenterPage.allContent, expected_content)
  });
}
const educationTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/education.csv')), {
  columns: true, relax_quotes: true, escape: '\\', ltrim: true, rtrim: true 
});
for (const { test_case, language, expected_content} of educationTable) {
  test(`${test_case} Check content of education page for  ${language} localization`, async ({
   app
  }) => {
    //Actions
    await app.mediaEducationPage.open()
    await app.mediaEducationPage.header.clickHamburgerMenuButton();
    await app.mediaEducationPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.mediaEducationPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.mediaEducationPage.expectElementToHaveText(app.mediaEducationPage.allContent, expected_content)
  });
}



const imprintTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/imprint.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of imprintTable) {
  test(`${test_case} Check content of imprint page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.imprintPage.open()
    await app.imprintPage.header.clickHamburgerMenuButton();
    await app.imprintPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.imprintPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.imprintPage.expectElementToHaveText(app.imprintPage.allContent, expected_content)
  });
}

const aboutTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/about.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of aboutTable) {
  test(`${test_case} Check content of About Page page for  ${language} localization`, async ({
    app
  }) => {
    //Actions
    await app.aboutPage.open()
    await app.aboutPage.header.clickHamburgerMenuButton();
    await app.aboutPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await app.aboutPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.aboutPage.expectElementToHaveText(app.aboutPage.allContent, expected_content)
  });
}
