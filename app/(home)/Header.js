import BaseComponent from "../../base/BaseComponent.js";
import HamburgerMenu from "../HamburgerMenu.js";
import BadgeCounter from "../../components/BadgeCounter.js";
import BadgeEmail from "../../components/BadgeEmail.js";
import BadgeTeleguard from "../../components/BadgeTeleguard.js";
import BadgeVPN from "../../components/BadgeVPN.js";
import BadgeEdelcloud from "../../components/BadgeEdelcloud.js";
import SearchBar from "../../components/SearchBar.js";
import ExtensionPopup from "./ExtensionPopup.js";
import Logo from "./Logo.js";
import SearchForm from "./SearchForm.js";
import Translations from "../../i18n/index.js";
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    this.extensionPopup = new ExtensionPopup(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new BadgeCounter(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    this.badgeEdelcloud = new BadgeEdelcloud(page);
    this.searchBar = new SearchBar(page);
    this.searchForm = new SearchForm(page);
    this.logo = new Logo(page);

    //Locators
    this.searchCounter = this.page.locator(".search-counter");
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
    this.taglineList = this.page.locator(".tagline-list");
    this.tagline = this.page.locator(".tagline");
    this.badge = (name) => this.page.locator(`.${name}`)
  }

  //Actions
  clickBadgeCounter = async () => {
    await this.clickElement(
      this.searchCounter,
      `charity search counter  in the header`
    );
  };

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header static pages`
    );
  };
  clickSwisscowsLogo = async () => {
    await this.clickElement(
      this.logo.swisscows,
      `Swisscows Logo in the header`
    );
  };

  //Verify 
  expectToBeOpenedPageAfterClickBy = async (expected = { locator: String, url: String} ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.badge(expected.locator), expected.url
    );
  };

  //Locale
  async expectTranslationsForTaglineList(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      locale: value,
    }
  ) {
    const expectedTextTaglineList = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextTagline = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(
      this.taglineList,
      expectedTextTaglineList
    );
    await this.expectElementToHaveText(this.tagline, expectedTextTagline);
  }
}
