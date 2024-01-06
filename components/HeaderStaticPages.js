import BasePage from "../base/BasePage";
import WebPage from "../pages/search/WebPage";
import HamburgerMenu from "../components/HamburgerMenu";
import SearchCounter from "./users/User.SearchCounter";
import Autocomplete from "./Autocomplete";
export default class HeaderStaticPages extends BasePage {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.searchCounter = new SearchCounter(page);
    this.autocomplete = new Autocomplete(page);

    //Locators
    this.linksInStaticHeader = (name) => this.page.locator(`a.badge-${name}`);
    this.hamburgerMenuButton = this.page.locator(
      "header button.hamburger-menu"
    );
    this.badgeEmail = this.page.locator("div.badges a.badge-email");
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenuButton,
      `hamburger menu in the header static pages`
    );
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
