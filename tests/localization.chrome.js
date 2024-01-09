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
    await mainPage.expectTextOfElement(mainPage.allContent,expected_content)
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
    await contactUsPage.expectTextOfElement(contactUsPage.allContent,expected_content)
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
    await mainPage.expectTextOfElement(mainPage.headerStaticPages.hamburgerMenu.allContent,expected_content)
  });
}

