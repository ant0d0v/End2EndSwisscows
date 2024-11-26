import HamburgerMenu from "../HamburgerMenu.js";
import badgeCounter from "../../components/BadgeCounter.js";
import BadgeEmail from "../../components/BadgeEmail.js";
import BadgeTeleguard from "../../components/BadgeTeleguard.js";
import BadgeVPN from "../../components/BadgeVPN.js";
import BadgeEdelcloud from "../../components/BadgeEdelcloud.js";
import SearchBar from "../../components/SearchBar.js";
import BaseComponent from "../../base/BaseComponent.js";
import Logo from "./Logo.js";
import Navigation from "./Navigation.js";
import Translations from "../../i18n/index.js";

export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.searchBar = new SearchBar(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    this.badgeEdelcloud = new BadgeEdelcloud(page);
    this.logo = new Logo(page);
    this.navigation = new Navigation(page);

    //Locators
    this.root = this.page.locator(".header");
    this.navTabs = this.root.locator(".nav-tabs a");
    this.searchCounter = this.page.locator(".search-counter");
    this.hamburgerMenuButton = this.page
      .getByRole("banner")
      .getByRole("button")
      .nth(1);
    this.filtersButton = this.page.getByRole("button", { name: "Filters" });
    this.badge = (name) => this.root.locator(`.${name}`)
    this.images = this.root.locator("svg");
  }

  //Actions
  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header`
    );
  };

  clickSwisscowsLogo = async () => {
    await this.clickElement(
      this.logo.swisscows,
      `Swisscows Logo in the header`
    );
  };

  clickFiltersButton = async () => {
    await this.clickElement(this.filtersButton, `filters button in the header`);
  };

  clickFilterButtonAndGetResponse = async (expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes(expectedLink)
    );
    await this.clickElement(this.filtersButton, `filter button`);
    const response = await responsePromise;
    return response;
  };

  clickBadgeCounter = async () => {
    await this.clickElement(
      this.searchCounter,
      `charity search counter  in the header`
    );
  };


  // Verify

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.images,
      testInfo
    );
  };

  expectToBeOpenedPageAfterClickBy = async (expected = { locator: String, url: String} ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.badge(expected.locator), expected.url
    );
  };

  //Locales
  async expectTranslationsForNavTabs(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      translationKey_6: value,
      locale: value,
    }
  ) {
    const expectedTab_1 = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedTab_2 = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    const expectedTab_3 = this.translations.t(expected.translationKey_3, {
      lng: expected.locale,
    });
    const expectedTab_4 = this.translations.t(expected.translationKey_4, {
      lng: expected.locale,
    });
    const expectedTab_5 = this.translations.t(expected.translationKey_5, {
      lng: expected.locale,
    });
    const expectedTab_6 = this.translations.t(expected.translationKey_6, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.navTabs, [
      expectedTab_1,
      expectedTab_2,
      expectedTab_3,
      expectedTab_4,
      expectedTab_5,
      expectedTab_6,
    ]);
  }
}
