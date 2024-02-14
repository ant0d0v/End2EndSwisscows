import HamburgerMenu from "../HamburgerMenu";
import badgeCounter from "../BadgeCounter";
import SearchForm from "../SearchForm";
import BaseComponent from "../../base/BaseComponent";

export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.searchForm = new SearchForm(page);

    //Locators
    this.linksOfHeader = (name) => this.page.locator(`a.badge-${name}`);
    this.logoSwisscows = this.page.locator("#header").getByRole("link", { name: "Swisscows", exact: true });
    this.imageSearchButton = this.page.getByRole("link", { name: "Images", exact: true,});
    this.videoSearchButton = this.page.getByRole("link", { name: "Video", exact: true,});
    this.musicSearchButton = this.page.getByRole("link", { name: "Music", exact: true,});
    this.newsSearchButton = this.page.getByRole("link", {name: "News", exact: true,});
    this.shoppingSearchButton = this.page.getByRole("link", {name: "Shopping",exact: true,});
    this.hamburgerMenuButton = this.page.locator("#header").getByRole("button").nth(2);
    this.badgeEmail = this.page.locator("div.badges a.badge-email");
    this.filtersButton = this.page.locator('.filters-button')
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(this.hamburgerMenuButton,
      `hamburger menu in the header`
    );
  };
  clickBadgeEmailAndNavigateToNewPage = async () => {
    const loginPage = await this.clickElementAndNavigateToNewPage(this.badgeEmail,
      "badge Email"
    );
    return loginPage;
  };
  clickLinkInHeaderAndNavigateToNewPage = async (id) => {
    const newPage = await this.clickElementAndNavigateToNewPage(this.linksOfHeader(id),
      "link of header"
    );
    return newPage;
  };

  clickSwisscowsLogo = async () => {
    await this.clickElement(this.logoSwisscows, `Swisscows Logo in the header`);
  };
  clickImageSearchButton = async () => {
    await this.clickElement( this.imageSearchButton,
      `image button in the header`
    );
  };
  clickVideoSearchButton = async () => {
    await this.clickElement(this.videoSearchButton,
      `video button in the header`
    );
  };
  clickMusicSearchButton = async () => {
    await this.clickElement( this.musicSearchButton,
      `music button in the header`
    );
  };
  clickNewsSearchButton = async () => {
    await this.clickElement(this.newsSearchButton,
      `search button in the header`
    );
  };
  clickShoppingSearchButton = async () => {
    await this.clickElement(this.shoppingSearchButton,
      `shopping button in the header`
    );
  };
  clickFiltersButton = async () => {
    await this.clickElement(this.filtersButton,
      `filters button in the header`
    );
  };
  clickFilterButtonInAndGetResponse = async (link) => {
    const responsePromise = this.page.waitForResponse(link);
    await this.clickElement(this.filtersButton,`filter button` );
    const response = await responsePromise;
    return response;
  };

  // Verify
}
