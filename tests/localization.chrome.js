import { test } from "../utils/fixturePages";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const mainTable = parse(fs.readFileSync(path.join(__dirname, '../localization/main.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of mainTable) {
  test(`${test_case} Check content of main page for  ${language} localization`, async ({
    mainPage,
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await mainPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await mainPage.expectElementToHaveText(mainPage.allContent,expected_content)
  });
}

const contactTable = parse(fs.readFileSync(path.join(__dirname, '../localization/contactUs.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of contactTable) {
  test(`${test_case} Check content of contact Us page for  ${language} localization`, async ({
    contactUsPage
  }) => {
    //Actions
    await contactUsPage.waitUntilPageIsFullyLoaded();
    await contactUsPage.headerStaticPages.clickHamburgerMenuButton();
    await contactUsPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await contactUsPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await contactUsPage.expectElementToHaveText(contactUsPage.allContent,expected_content)
  });
}
const hamburgerTable = parse(fs.readFileSync(path.join(__dirname, '../localization/hamburgerMenu.csv')), {
  columns: true,
  skip_empty_lines: true
});
for (const { test_case, language, expected_content} of hamburgerTable) {
  test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
    mainPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await mainPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );
    await mainPage.headerStaticPages.clickHamburgerMenuButton();

    //Assert
    await mainPage.expectElementToHaveText(mainPage.headerStaticPages.hamburgerMenu.allContent,expected_content)
  });
}

const charityTable = parse(fs.readFileSync(path.join(__dirname, '../localization/charity.csv')), {
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

const datacenterTable = parse(fs.readFileSync(path.join(__dirname, '../localization/datacenter.csv')), {
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
const educationTable = parse(fs.readFileSync(path.join(__dirname, '../localization/education.csv')), {
  columns: true, relax_quotes: true, escape: '\\', ltrim: true, rtrim: true 
});
for (const { test_case, language, expected_content} of educationTable) {
  test(`${test_case} Check content of education page for  ${language} localization`, async ({
   educationPage
  }) => {
    //Actions
    await educationPage.waitUntilPageIsFullyLoaded();
    await educationPage.headerStaticPages.clickHamburgerMenuButton();
    await educationPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await educationPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await educationPage.expectElementToHaveText(educationPage.allContent, expected_content)
  });
}

const headerHomeTable = parse(fs.readFileSync(path.join(__dirname, '../localization/headerHome.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of headerHomeTable) {
  test(`${test_case} Check content of header home for  ${language} localization`, async ({
    mainPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await mainPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await mainPage.expectElementToHaveText(mainPage.headerStaticPages.allContent, expected_content)
  });
}

const imprintTable = parse(fs.readFileSync(path.join(__dirname, '../localization/imprint.csv')), {
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

const emailTable = parse(fs.readFileSync(path.join(__dirname, '../localization/email.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of emailTable) {
  test(`${test_case} Check content of email page for  ${language} localization`, async ({
    emailPage
  }) => {
    //Actions
    await emailPage.waitUntilPageIsFullyLoaded();
    await emailPage.headerStaticPages.clickHamburgerMenuButton();
    await emailPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await emailPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await emailPage.expectElementToHaveText(emailPage.allContent, expected_content)
  });
}
const vpnTable = parse(fs.readFileSync(path.join(__dirname, '../localization/vpn.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const { test_case, language, expected_content} of vpnTable) {
  test(`${test_case} Check content of vpn page for  ${language} localization`, async ({
    vpnPage
  }) => {
    //Actions
    await vpnPage.waitUntilPageIsFullyLoaded();
    await vpnPage.headerStaticPages.clickHamburgerMenuButton();
    await vpnPage.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
    await vpnPage.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await vpnPage.expectElementToHaveText(vpnPage.allContent, expected_content)
  });
}