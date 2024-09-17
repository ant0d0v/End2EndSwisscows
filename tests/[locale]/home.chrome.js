import { test } from "../../utils/fixtures.js";
import { readCsvFile } from "../../helpers/csvHelper.js";

const home = readCsvFile("../data/locales/home.csv");
for (const { test_case, language, expected_title, languageCode } of home) {
  test(`${test_case} Check content of home page for ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.home.expectTranslationsForTag({
      translationKey_1: "Startpage_Business",
      locale:languageCode,
    });
    await app.home.expectTranslationsForLinkMore({
      translationKey_1: "Startpage_LinkMore",
      translationKey_2: "Startpage_LinkShowMore",
      translationKey_3: "Startpage_FanShopLink",
      translationKey_4: "Startpage_BlogLink",
      locale: languageCode,
    });
    await app.home.expectTranslationsForProductsTitle({
      translationKey_1: "Startpage_HulbeeTitle",
      translationKey_2: "Startpage_TgBusinessTitle",
      locale: languageCode,
    });
    await app.home.expectTranslationsForProductsDescroption({
      translationKey_1: "Startpage_EmailDescription",
      translationKey_2: "Startpage_VPNDescription",
      translationKey_3: "Startpage_TeleguardDescription",
      translationKey_4: "Startpage_HulbeeDescription",
      translationKey_5: "Startpage_TgBusinessDescription",
      translationKey_6: "Startpage_GetDigestDescription",
      translationKey_7: "Startpage_FanShopDescription",
      translationKey_8: "Startpage_FaradayBagDescription",
      translationKey_9: "Startpage_BlogDescription",
      locale: languageCode,
    });
    await app.home.expectTranslationsForConteinerTitle({
      translationKey_1: "Startpage_ProductsServices",
      translationKey_2: "Startpage_FAQ_Title",
      translationKey_3: "StartpageTagline_Title",
      locale: languageCode
    });
    await app.expectHaveTitle(app.home.page, expected_title);
  });
}
for (const { test_case, language, languageCode } of home) {
  test(
    `${test_case} Check benefits block for ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.home.open();
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdown();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

      //Assert
      await app.home.benefits.expectTranslationsForTitle({
        translationKey_1: "Startpage_BlockTitle_1",
        translationKey_2: "Startpage_BlockTitle_2",
        translationKey_3: "Startpage_BlockTitle_3",
        translationKey_4: "Startpage_BlockTitle_4",
        translationKey_5: "Startpage_BlockTitle_5",
        translationKey_6: "Startpage_BlockTitle_6",
        locale: languageCode,
      });
      await app.home.benefits.expectTranslationsForDescription({
        translationKey_1: "Startpage_BlockDescription_1",
        translationKey_2: "Startpage_BlockDescription_2",
        translationKey_3: "Startpage_BlockDescription_3",
        translationKey_4: "Startpage_BlockDescription_4",
        translationKey_5: "Startpage_BlockDescription_5",
        translationKey_6: "Startpage_BlockDescription_6",
        locale: languageCode,
      });
    }
  );
}

for (const { test_case, language, languageCode } of home) {
  test(`${test_case} Check header of home page for ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.home.open();
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdown();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);
      await app.home.header.clickBadgeCounter();

      //Assert
      await app.home.header.expectTranslationsForTaglineList({
        translationKey_1: "Startpage_TaglineList",
        translationKey_2: "Startpage_Tagline",
        locale: languageCode,
      });
      await app.home.header.searchForm.expectTranslationsForPlaceholder({
        translationKey_1: "ApplicationBanner_Title",
        locale: languageCode,
      });
    }
  );
}

for (const { test_case, language, languageCode } of home) {
  test(
    `${test_case} Check FAQ of home page for ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.home.open();
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.clickLanguagesDropdown();
      await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

      //Assert
      await app.home.faq.expectTranslationsForQuestions({
        translationKey_1: "Startpage_FAQ_Question1",
        translationKey_2: "Startpage_FAQ_Question2",
        translationKey_3: "Startpage_FAQ_Question3",
        translationKey_4: "Startpage_FAQ_Question4",
        translationKey_5: "Startpage_FAQ_Question5",
        translationKey_6: "Startpage_FAQ_Question6",
        locale: languageCode,
      });
      await app.home.faq.expectTranslationsForAnswers({
        translationKey_1: "Startpage_FAQ_Answer1",
        translationKey_2: "Startpage_FAQ_Answer2",
        translationKey_3: "Startpage_FAQ_Answer3",
        translationKey_4: "Startpage_FAQ_Answer4",
        translationKey_5: "Startpage_FAQ_Answer5",
        translationKey_6: "Startpage_FAQ_Answer6",
        locale: languageCode,
      });
    }
  );
}
