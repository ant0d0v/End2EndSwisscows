import HamburgerMenu from "../HamburgerMenu";
import badgeCounter from "../../components/BadgeCounter";
import BadgeEmail from "../../components/BadgeEmail";
import BadgeTeleguard from "../../components/BadgeTeleguard";
import BadgeVPN from "../../components/BadgeVPN";
import SearchForm from "../SearchForm";
import BaseComponent from "../../base/BaseComponent";

export default class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);
    this.badgeCounter = new badgeCounter(page);
    this.searchForm = new SearchForm(page);
    this.badgeEmail = new BadgeEmail(page);
    this.badgeTeleguard = new BadgeTeleguard(page);
    this.badgeVPN = new BadgeVPN(page);

    //Locators
    this.logoSwisscows = this.page.locator("#header").getByRole("link", { name: "Swisscows", exact: true });
    this.imageSearchButton = this.page.getByRole("link", { name: "Images", exact: true,});
    this.videoSearchButton = this.page.getByRole("link", { name: "Video", exact: true,});
    this.musicSearchButton = this.page.getByRole("link", { name: "Music", exact: true,});
    this.newsSearchButton = this.page.getByRole("link", {name: "News", exact: true,});
    this.shoppingSearchButton = this.page.getByRole("link", {name: "Shopping",exact: true,});
    this.hamburgerMenuButton = this.page.locator("#header").getByRole("button").nth(2);
    this.filtersButton = this.page.locator('.filters-button')
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(this.hamburgerMenuButton,
      `hamburger menu in the header`
    );
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
  clickFilterButtonAndGetResponse = async (expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
    await this.clickElement(this.filtersButton,`filter button` );
    const response = await responsePromise;
    return response;
  };
  
  // Verify
}
