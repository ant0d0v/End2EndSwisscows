import BaseComponent from "../../base/BaseComponent.js";
import HamburgerMenu from "../HamburgerMenu.js";
import BadgeCounter from "../../components/BadgeCounter.js";
import BadgeEmail from "../../components/BadgeEmail.js";
import BadgeTeleguard from "../../components/BadgeTeleguard.js";
import BadgeVPN from "../../components/BadgeVPN.js";
import SearchForm from "../SearchForm.js";
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
    this.logoSwisscows = this.page.getByRole('heading', { name: 'Anonymous search engine', exact: true })
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
  //Verify
  expectSwisscowsLogoToBeVisible = async () => {
    await this.expectElementToBeVisible(this.logoSwisscows);
  };
}
