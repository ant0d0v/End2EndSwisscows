import { test } from "../../utils/fixturePages";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const headerHomeTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/headerhome.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  
  for (const { test_case, language, expected_content} of headerHomeTable) {
    test(`${test_case} Check content of header home for  ${language} localization`, async ({
      home
    }) => {
      //Actions
      await home.headerStaticPages.clickHamburgerMenuButton();
      await home.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await home.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
        language
      );
  
      //Assert
      await home.expectElementToHaveText(home.headerStaticPages.allContent, expected_content)
    });
  }

  const hamburgerTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/hamburgerMenu.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  for (const { test_case, language, expected_content} of hamburgerTable) {
    test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
      home
    }) => {
      //Actions
      await home.headerStaticPages.clickHamburgerMenuButton();
      await home.headerStaticPages.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await home.headerStaticPages.hamburgerMenu.clickLanguageLinkInDropdown(
        language
      );
      await home.headerStaticPages.clickHamburgerMenuButton();
  
      //Assert
      await home.expectElementToHaveText(home.headerStaticPages.hamburgerMenu.allContent,expected_content)
    });
  }