import BaseComponent from "../base/BaseComponent";
import MainPage from "../pages/Main.Page";
import HamburgerMenu from "../components/HamburgerMenu";
import badgeCounter from "./BadgeCounter";
import searchForm from "./SearchForm";
export default class HeaderStaticPages extends BaseComponent {
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
    return new MainPage(this.page);
  };

  clickBadgeEmailAndNavigateToNewPage = async () => {
    const loginPage = await this.clickElementAndNavigateToNewPage(
      this.badgeEmail,
      "badge Email"
    );
    return loginPage;
  };
  clickLinkInStaticHeaderAndNavigateToNewPage = async (id) => {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.linksInStaticHeader(id),
      "link of header"
    );
    return newPage;
  };
}
