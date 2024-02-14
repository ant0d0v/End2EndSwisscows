import { test } from "../../utils/fixturePages";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const emailTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/email.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  
  for (const { test_case, language, expected_content} of emailTable) {
    test(`${test_case} Check content of email page for  ${language} localization`, async ({
      emailPage
    }) => {
      //Actions
      await emailPage.waitUntilPageIsFullyLoaded();
      await emailPage.header.clickHamburgerMenuButton();
      await emailPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await emailPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await emailPage.expectElementToHaveText(emailPage.allContent, expected_content)
    });
  }
  const vpnTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/vpn.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  
  for (const { test_case, language, expected_content} of vpnTable) {
    test(`${test_case} Check content of vpn page for  ${language} localization`, async ({
      vpnPage
    }) => {
      //Actions
      await vpnPage.waitUntilPageIsFullyLoaded();
      await vpnPage.header.clickHamburgerMenuButton();
      await vpnPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await vpnPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await vpnPage.expectElementToHaveText(vpnPage.allContent, expected_content)
    });
  }