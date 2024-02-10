import MainPage from "../../pages/Main.Page";
import { WebPage } from "../../pages/(search)/Web.Page";
import ImagePage from "../../pages/(search)/Image.Page";
import MusicPage from "../../pages/(search)/Music.Page";
import NewsPage from "../../pages/(search)/News.Page";
import VideoPage from "../../pages/(search)/Video.Page";
import ShoppingPage from "../../pages/(search)/Shopping.Page";
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
    return new MainPage(this.page);
  };
  clickImageSearchButton = async () => {
    await this.clickElement( this.imageSearchButton,
      `image button in the header`
    );
    return new ImagePage(this.page);
  };
  clickVideoSearchButton = async () => {
    await this.clickElement(this.videoSearchButton,
      `video button in the header`
    );
    return new VideoPage(this.page);
  };
  clickMusicSearchButton = async () => {
    await this.clickElement( this.musicSearchButton,
      `music button in the header`
    );
    return new MusicPage(this.page);
  };
  clickNewsSearchButton = async () => {
    await this.clickElement(this.newsSearchButton,
      `search button in the header`
    );
    return new NewsPage(this.page);
  };
  clickShoppingSearchButton = async () => {
    await this.clickElement(this.shoppingSearchButton,
      `shopping button in the header`
    );
    return new ShoppingPage(this.page);
  };
  clickFiltersButton = async () => {
    await this.clickElement(this.filtersButton,
      `filters button in the header`
    );
  };
  clickFilterButtonInAndGetResponse = async () => {
    const responsePromise = this.page.waitForResponse(
       "https://api.dev.swisscows.com/web/search?query=ronaldo&offset=0&itemsCount=10&region=de-DE&freshness=All");
    await this.clickElement(this.filtersButton,`filter button` );
    const response = await responsePromise;
    return response;
  };

  // Verify
}
