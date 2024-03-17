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
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await app.home.expectElementToHaveText(app.home.header.allContent, expected_content)
    });
  }

  const hamburgerTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/hamburgerMenu.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  for (const { test_case, language, expected_content} of hamburgerTable) {
    test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
      await app.home.header.clickHamburgerMenuButton();
  
      //Assert
      await app.home.expectElementToHaveText(app.home.header.hamburgerMenu.allContent,expected_content)
    });
  }