// import { test } from "../../utils/fixtures.js";
// import validateText from "../../locales/n18next.js";
// import { readCsvFile, readSpecificCsvFile } from "../../helpers/csvHelper.js"



// const imprintTable = readCsvFile('../localization/imprint.csv')
// for (const { test_case, language, expected_content} of imprintTable) {
//   test(`${test_case} Check content of imprint page for  ${language} localization`, async ({
//     app
//   }) => {
//     //Actions
//     await app.imprintPage.open()
//     await app.imprintPage.header.clickHamburgerMenuButton();
//     await app.imprintPage.header.hamburgerMenu.clickLanguagesDropdown();
//     await app.imprintPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

//     //Assert
//     await app.imprintPage.expectPageToHaveText(app.imprintPage.allContent, expected_content)
//   });
// }

// const aboutTable = readCsvFile('../localization/about.csv')
// for (const { test_case, language, expected_content} of aboutTable) {
//   test(`${test_case} Check content of About Page page for  ${language} localization`, async ({
//     app
//   }) => {
//     //Actions
//     await app.aboutPage.open()
//     await app.aboutPage.header.clickHamburgerMenuButton();
//     await app.aboutPage.header.hamburgerMenu.clickLanguagesDropdown();
//     await app.aboutPage.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

//     //Assert
//     await app.aboutPage.expectPageToHaveText(app.aboutPage.allContent, expected_content)
//   });
// }
