import { test } from "../../utils/fixturePages";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const headerHomeTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/headerHome.csv')), {
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

  const hamburgerTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/hamburgerMenu.csv')), {
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