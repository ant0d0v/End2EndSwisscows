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
      app
    }) => {
      //Actions
      await app.emailPage.open()
      await app.emailPage.header.clickHamburgerMenuButton();
      await app.emailPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await app.emailPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await app.emailPage.expectElementToHaveText(app.emailPage.allContent, expected_content)
    });
  }
  const vpnTable = parse(fs.readFileSync(path.join(__dirname, '../../localization/vpn.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  
  for (const { test_case, language, expected_content} of vpnTable) {
    test(`${test_case} Check content of vpn page for  ${language} localization`, async ({
      app
    }) => {
      //Actions
      await app.vpnPage.open()
      await app.vpnPage.header.clickHamburgerMenuButton();
      await app.vpnPage.header.hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await app.vpnPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await app.vpnPage.expectElementToHaveText(app.vpnPage.allContent, expected_content)
    });
  }