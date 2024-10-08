import { test } from "../../utils/fixtures.js";
import { readCsvFile } from "../../helpers/csvHelper.js";

const hamburgerTable = readCsvFile("../data/locales/hamburgerMenu.csv");
for (const { test_case, language, languageCode, isoCode } of hamburgerTable) {
  test.describe('use config locale', () => {
  test.use({ locale: isoCode});
  test(`${test_case} Check content of hamburger menu for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();

    //Assert
    await app.home.header.hamburgerMenu.expectTranslationsForTitle({
      translationKey_1: "Use",
      translationKey_2: "Menu_About",
      locale: languageCode,
    });
    await app.home.header.hamburgerMenu.expectTranslationsForMenuButton({
      translationKey_1: "Language",
      translationKey_2: "Region",
      translationKey_3: "Theme",
      locale: languageCode,
    });

    await app.home.header.hamburgerMenu.expectTranslationsForLink({
      translationKey_1: "Startpage_Home_Menu",
      translationKey_2: "Default_Search_Home_Menu",
      translationKey_3: "About_Swisscows",
      translationKey_4: "MediaEducation_Home_Menu",
      translationKey_5: "CharityProject",
      translationKey_6: "Datacenter_Home_Menu",
      translationKey_7: "Contact",
      translationKey_8: "Privacy",
      translationKey_9: "Donation",
      translationKey_10:
        language === "Deutsch" ? "Speakers_Search_Home_Menu" : "",
      translationKey_11: "Support_Search_Home_Menu",
      locale: languageCode,
    });
  });
});
}

const footerTable = readCsvFile("../data/locales/footerMenu.csv");
for (const { test_case, language, languageCode } of footerTable) {
  test(`${test_case} Check content of footer menu for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.clickLanguagesDropdown();
    await app.home.header.hamburgerMenu.clickLanguageLinkInDropdown(language);

    //Assert
    await app.home.footer.expectTranslationsForTitle({
      translationKey_1: "Menu_About",
      translationKey_2: "Products",
      translationKey_3: "Services",
      locale: languageCode,
    });
    await app.home.footer.expectTranslationsForCompanyLink({
      translationKey_1: "Menu_AboutAG",
      translationKey_2: "Imprint_Menu",
      translationKey_3: "Privacy",
      translationKey_4: "Donation",
      locale: languageCode,
    });
    await app.home.footer.expectTranslationsForLink({
      translationKey_1: "About_Swisscows",
      translationKey_2: "MediaEducation_Home_Menu",
      translationKey_3: "CharityProject",
      translationKey_4: "Datacenter_Home_Menu",
      translationKey_5: "Contact",
      translationKey_6:
        language === "Deutsch" ? "Speakers_Search_Home_Menu" : "",
      translationKey_7: "VPN",
      translationKey_8: "Swisscows.email",
      translationKey_9: "TeleGuard",
      translationKey_10: "HES",
      translationKey_11: "GetDigest",
      translationKey_12: "Faraday Bag",
      translationKey_13: "Fan-shop",
      translationKey_14:
        language === "Русский" || language === "Українська"
          ? "Swisscows блог"
          : "Swisscows Blog",
      translationKey_15: "Support_Search_Home_Menu",
      locale: languageCode,
    });
  });
}

const header = readCsvFile("../data/locales/header.csv");
for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check search header for  ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.home.open();
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.selectRegion("Germany");
      await app.home.header.searchForm.inputSearchCriteria("test");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
      await app.webPage.header.clickHamburgerMenuButton();
      await app.webPage.header.hamburgerMenu.clickLanguagesDropdown();
      await app.webPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
        language
      );

      //Assert
      await app.webPage.header.expectTranslationsForNavTabs({
        translationKey_1: "Web",
        translationKey_2: "News",
        translationKey_3: "Images",
        translationKey_4: "Video",
        translationKey_5: "Shopping",
        translationKey_6: "Music",
        locale: languageCode,
      });
    }
  );
}
for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check web filters for  ${language} localization`,
    async ({ app }) => {
      //Actions
      await app.home.open();
      await app.home.header.clickHamburgerMenuButton();
      await app.home.header.hamburgerMenu.selectRegion("Germany");
      await app.home.header.searchForm.inputSearchCriteria("test");
      await app.home.header.searchForm.clickEnterSearchField();
      await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
      await app.webPage.header.clickHamburgerMenuButton();
      await app.webPage.header.hamburgerMenu.clickLanguagesDropdown();
      await app.webPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
        language
      );

      //Assert
      await app.webPage.filters.expectTranslationsForFilter({ translationKey: "Web_Freshness_All", locale: languageCode });
      await app.webPage.filters.clickFilterByDate();
      await app.webPage.filters.selectMenu.expectTranslationsForFilterListByDate(
        {
          translationKey_1: "Web_Freshness_All",
          translationKey_2: "Web_Freshness_Day",
          translationKey_3: "Web_Freshness_Week",
          translationKey_4: "Web_Freshness_Month",
          translationKey_5: "Web_Freshness_Year",
          locale: languageCode,
        }
      );
    }
  );
}

for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check news filters for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("test");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.newsPage.header.navigation.clickNewsTab();
    await app.newsPage.item.expectNewsItemsToBeVisible();
    await app.newsPage.header.clickHamburgerMenuButton();
    await app.newsPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.newsPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await app.newsPage.filters.expectTranslationsForFilter({
      translationKey: "News_Freshness_All",
      locale: languageCode,
    });
    await app.newsPage.filters.clickFilterByDate();
    await app.newsPage.filters.selectMenu.expectTranslationsForFilterListByDate({
      translationKey_1: "News_Freshness_All",
      translationKey_2: "News_Freshness_Day",
      translationKey_3: "News_Freshness_Week",
      translationKey_4: "News_Freshness_Month",
      translationKey_5: "News_Freshness_Year",
      locale: languageCode,
    });
  });
}

for (const { test_case, language, languageCode } of header) {
  test(`${test_case} Check video filters for  ${language} localization`, async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.clickHamburgerMenuButton();
    await app.home.header.hamburgerMenu.selectRegion("Germany");
    await app.home.header.searchForm.inputSearchCriteria("test");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.header.navigation.clickVideoTab();
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.header.clickHamburgerMenuButton();
    await app.videoPage.header.hamburgerMenu.clickLanguagesDropdown();
    await app.videoPage.header.hamburgerMenu.clickLanguageLinkInDropdown(
      language
    );

    //Assert
    await app.videoPage.filters.expectTranslationsForFilter({
      translationKey_1: "Video_Publisher_All",
      translationKey_2: "Video_Freshness_All",
      locale: languageCode,
    });
    await app.videoPage.filters.clickFilterByDate();
    await app.videoPage.filters.selectMenu.expectTranslationsForFilterListByDate({
      translationKey_1: "Video_Freshness_All",
      translationKey_2: "Video_Freshness_Day",
      translationKey_3: "Video_Freshness_Week",
      translationKey_4: "Video_Freshness_Month",
      translationKey_5: "Video_Freshness_Year",
      locale: languageCode,
    });
  });
}