import BaseComponent from "../../base/BaseComponent";
import HamburgerMenu from "../HamburgerMenu";
import badgeCounter from "../../components/BadgeCounter";
import searchForm from "../SearchForm";
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.searchForm = new searchForm(page);

    //Locators
    this.allContent = this.page.locator("header.header-home");
    this.linksInStaticHeader = (name) => this.page.locator(`a.badge-${name}`);
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
    this.logoSwisscows = this.page.getByRole('link', { name: 'Swisscows', exact: true })
    this.badgeEmail = this.page.locator("div.badges a.badge-email");
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
