import HamburgerMenu from "../HamburgerMenu.js";
import badgeCounter from "../../components/BadgeCounter.js";
import BadgeEmail from "../../components/BadgeEmail.js";
import BadgeTeleguard from "../../components/BadgeTeleguard.js";
import BadgeVPN from "../../components/BadgeVPN.js";
import SearchBar from "../../components/SearchBar.js";
import BaseComponent from "../../base/BaseComponent.js";
import Logo from "./Logo.js";
import Navigation from "./Navigation.js";

export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.searchBar = new SearchBar(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    this.logo = new Logo(page);
    this.navigation = new Navigation(page);

    //Locators
    this.searchCounter = this.page.locator(".search-counter");
    this.hamburgerMenuButton = this.page
      .getByRole("banner")
      .getByRole("button")
      .nth(1);
    this.filtersButton = this.page.getByRole("button", { name: "Filters" });
    this.root = this.page.locator(".header");
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
      this.logo.swisscows,
      testInfo
    );
  };
}
