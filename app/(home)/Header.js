import BaseComponent from "../../base/BaseComponent";
import HamburgerMenu from "../HamburgerMenu";
import BadgeCounter from "../../components/BadgeCounter";
import BadgeEmail from "../../components/BadgeEmail";
import BadgeTeleguard from "../../components/BadgeTeleguard";
import BadgeVPN from "../../components/BadgeVPN";
import SearchForm from "../SearchForm";
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new BadgeCounter(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);
    this.searchForm = new SearchForm(page);

    //Locators
    this.allContent = this.page.locator("header.header-home");
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
    this.logoSwisscows = this.page.getByRole('link', { name: 'Swisscows', exact: true })
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header static pages`
    );
  };
  clickSwisscowsLogo = async () => {
    await this.clickElement(this.logoSwisscows, `Swisscows Logo in the header`);
  };
  
}
