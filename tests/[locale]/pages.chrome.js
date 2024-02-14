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
    home,
  }) => {
    //Actions
    await home.headerStaticPages.clickHamburgerMenuButton();
    await home.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await home.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await home.expectElementToHaveText(home.allContent,expected_content)
  });
}

const contactTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/contact.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of contactTable) {
  test(`${test_case} Check content of contact Us page for  ${language} localization`, async ({
    contactPage
  }) => {
    //Actions
    await contactPage.waitUntilPageIsFullyLoaded();
    await contactPage.headerStaticPages.clickHamburgerMenuButton();
    await contactPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await contactPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await contactPage.expectElementToHaveText(contactPage.allContent,expected_content)
  });
}

const charityTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/charity.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of charityTable) {
  test(`${test_case} Check content of charity page for  ${language} localization`, async ({
    charityPage
  }) => {
    //Actions
    await charityPage.waitUntilPageIsFullyLoaded();
    await charityPage.headerStaticPages.clickHamburgerMenuButton();
    await charityPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await charityPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await charityPage.expectElementToHaveText(charityPage.allContent, expected_content)
  });
}

const datacenterTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/datacenter.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of datacenterTable) {
  test(`${test_case} Check content of datacenter page for  ${language} localization`, async ({
   datacenterPage
  }) => {
    //Actions
    await datacenterPage.waitUntilPageIsFullyLoaded();
    await datacenterPage.headerStaticPages.clickHamburgerMenuButton();
    await datacenterPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await datacenterPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await datacenterPage.expectElementToHaveText(datacenterPage.allContent, expected_content)
  });
}
const educationTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/education.csv')), {
  columns: true, relax_quotes: true, escape: '\\', ltrim: true, rtrim: true 
});
for (const { test_case, language, expected_content} of educationTable) {
  test(`${test_case} Check content of education page for  ${language} localization`, async ({
   mediaEducationPage
  }) => {
    //Actions
    await mediaEducationPage.waitUntilPageIsFullyLoaded();
    await mediaEducationPage.headerStaticPages.clickHamburgerMenuButton();
    await mediaEducationPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await mediaEducationPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await mediaEducationPage.expectElementToHaveText(mediaEducationPage.allContent, expected_content)
  });
}



const imprintTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/imprint.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of imprintTable) {
  test(`${test_case} Check content of imprint page for  ${language} localization`, async ({
    imprintPage
  }) => {
    //Actions
    await imprintPage.waitUntilPageIsFullyLoaded();
    await imprintPage.headerStaticPages.clickHamburgerMenuButton();
    await imprintPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await imprintPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await imprintPage.expectElementToHaveText(imprintPage.allContent, expected_content)
  });
}

const aboutTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/about.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of aboutTable) {
  test(`${test_case} Check content of About Page page for  ${language} localization`, async ({
    aboutPage
  }) => {
    //Actions
    await aboutPage.waitUntilPageIsFullyLoaded();
    await aboutPage.headerStaticPages.clickHamburgerMenuButton();
    await aboutPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await aboutPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await aboutPage.expectElementToHaveText(aboutPage.allContent, expected_content)
  });
}
