import { test } from "../../utils/fixturePages";
import { readCsvFile } from "../../helpers/csvHelper"

  const emailTable = readCsvFile('../localization/email.csv')
  for (const { test_case, language, expected_content} of emailTable) {
    test(`${test_case} Check content of email page for  ${language} localization`, async ({
      app
    }) => {
      //Actions
      await app.emailPage.open()
      await app.emailPage.header.clickHamburgerMenuButton();
      await app.emailPage.header.hamburgerMenu.clickLanguagesDropdown();
      await app.emailPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await app.emailPage.expectElementToHaveText(app.emailPage.allContent, expected_content)
    });
  }
  const vpnTable = readCsvFile('../localization/vpn.csv')
  for (const { test_case, language, expected_content} of vpnTable) {
    test(`${test_case} Check content of vpn page for  ${language} localization`, async ({
      app
    }) => {
      //Actions
      await app.vpnPage.open()
      await app.vpnPage.header.clickHamburgerMenuButton();
      await app.vpnPage.header.hamburgerMenu.clickLanguagesDropdown();
      await app.vpnPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await app.vpnPage.expectElementToHaveText(app.vpnPage.allContent, expected_content)
    });
  }