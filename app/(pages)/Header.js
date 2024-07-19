import BaseComponent from "../../base/BaseComponent.js";
import HamburgerMenu from "../../app/HamburgerMenu.js";
import badgeCounter from "../../components/BadgeCounter.js";
import BadgeEmail from "../../components/BadgeEmail.js";
import BadgeTeleguard from "../../components/BadgeTeleguard.js";
import BadgeVPN from "../../components/BadgeVPN.js";
import Logo from "./Logo.js"
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    this.logo = new Logo(page)

    //Locators
    this.badgeCounter = this.page.getByTitle('0').locator('img')
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
  }

  //Actions

  clickBadgeCounter = async () => {
    await this.clickElement(
      this.badgeCounter,
      `charity search counter  in the header`
    );
  };

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header static page`
    );
  };
}
