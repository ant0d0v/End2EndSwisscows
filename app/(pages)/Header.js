import BaseComponent from "../../base/BaseComponent";
import HamburgerMenu from "../../app/HamburgerMenu";
import badgeCounter from "../../components/BadgeCounter";
import BadgeEmail from "../../components/BadgeEmail";
import BadgeTeleguard from "../../components/BadgeTeleguard";
import BadgeVPN from "../../components/BadgeVPN";
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    
    //Locators
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header static page`
    );
  };
}
