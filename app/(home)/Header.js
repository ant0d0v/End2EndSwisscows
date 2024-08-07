import BaseComponent from "../../base/BaseComponent.js";
import HamburgerMenu from "../HamburgerMenu.js";
import BadgeCounter from "../../components/BadgeCounter.js";
import BadgeEmail from "../../components/BadgeEmail.js";
import BadgeTeleguard from "../../components/BadgeTeleguard.js";
import BadgeVPN from "../../components/BadgeVPN.js";
import SearchBar from "../../components/SearchBar.js";
import Logo from "./Logo.js";
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new BadgeCounter(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    this.searchBar = new SearchBar(page);
    this.logo = new Logo(page);

    //Locators
    this.searchCounter = this.page.getByTitle("0").locator("img");
    this.allContent = this.page.locator("header.header-home");
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
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
}
