import BaseComponent from "../../../base/BaseComponent";
import HamburgerMenu from "../../HamburgerMenu";
import badgeCounter from "../../../components/BadgeCounter";
export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    
    //Locators
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
    this.logoSwisscowsEmail = this.page.getByRole('link', { name: 'Swisscows', exact: true })
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header lending page`
    );
  };
  clickSwisscowsEmailLogo = async () => {
    await this.clickElement(this.logoSwisscowsEmail, `Swisscows Logo in the header`);
  };
}
