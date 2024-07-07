import { test } from "../../utils/fixtures.js";
import { validateTextHamburgerComponent } from "../../locales/n18next.js";
import { readCsvFile } from "../../helpers/csvHelper.js";

const hamburgerTable = readCsvFile("../data/locales/hamburgerMenu.csv");
for (const { test_case, language, languageCode } of hamburgerTable) {
  test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
    await app.home.header.clickHamburgerMenuButton();

    //Assert
    await validateTextHamburgerComponent(app.home.page, "Logout", languageCode);
    await validateTextHamburgerComponent(app.home.page, "CharityProject", languageCode);
    await validateTextHamburgerComponent(app.home.page, "About_Swisscows", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Privacy", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Contact", languageCode);
    await validateTextHamburgerComponent(app.home.page, "MediaEducation_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Datacenter_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Default_Search_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Startpage_Home_Menu", languageCode);
    await validateTextHamburgerComponent(app.home.page, "Support_Search_Home_Menu", languageCode)
  });
}
