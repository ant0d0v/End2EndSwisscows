import { test } from "../../utils/fixtures";
import { readCsvFile } from "../../helpers/csvHelper"

  const headerHomeTable = readCsvFile('../localization/headerHome.csv')
  for (const { test_case, language, expected_content} of headerHomeTable) {
    test(`${test_case} Check content of header home for  ${language} localization`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdown();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
  
      //Assert
      await app.home.expectElementToHaveText(app.home.header.allContent, expected_content)
    });
  }

  const hamburgerTable = readCsvFile('../localization/hamburgerMenu.csv')
  for (const { test_case, language, expected_content} of hamburgerTable) {
    test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
      app
    }) => {
      //Actions
      await app.home.open()
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdown();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
      await app.home.header.clickHamburgerMenuButton();
  
      //Assert
      await app.home.expectElementToHaveText(app.home.header.hamburgerMenu.allContent,expected_content)
    });
  }