import { BasePage } from '../base/BasePage';
import { Header} from '../components/Header';
const { expect } = require('@playwright/test');
import { WebPage } from "../pages/search/WebPage";


export class HamburgerMenu extends BasePage {
  constructor(page) {
    super(page);

    //Locators

    this.dropdownRegion = this.page.getByText("Region");
    this.germanyRegionInDropdown = this.page.getByText("Germany");
    this.loginButtonInHamburgerMenu = this.page.getByRole("button", {name: "Login",});
    this.nicknameInHamburgerMenu = this.page.getByRole("link", {name: "T Test",});
    this.logoutButtonInHamburgerMenu = this.page.getByRole("button", {name: "Logout",});
    this.textsOfLinksInHamburgerMenu = this.page.locator("div.menu.popup li a");
    this.languagesDropdownInHamburgerMenu = this.page.getByText("Language");
    this.regionDropdownInHamburgerMenu = this.page.getByText("Region");
    this.themeDropdownInHumburgerMenu = this.page.getByText("Theme Default");
    this.darkThemeInHemburgerMenu = this.page.getByText("Dark");
    this.lightThemeInHemburgerMenu = this.page.getByText("Light");
    this.defaultThemeInHemburgerMenu = this.page.locator("li").filter({ hasText: /^Default$/ });
    this.textsOflanguagesDropdownInHamburgerMenu = this.page.locator( "//ul[@class ='menu-dropdown-list']/li");
    this.textsOfRegionDropdownInHamburgerMenu = this.page.locator("//ul[@class ='menu-dropdown-list']/li");
    this.bodyOfPage = this.page.locator("body");
    this.languageLinkInDropdown = (nameLocator) =>this.page.getByText(nameLocator);
    this.regionLinkInDropdown = (nameLocator) => this.page.locator("li").filter({ hasText: nameLocator });
    this.linkOfStaticPage = (nameLocator) => this.page.getByRole("banner").getByRole("link", { name: nameLocator });
  }
  
  //Actions

  clickLanguageLinkInDropdown = async (id) => {
    await this.clickElement(
      this.languageLinkInDropdown(id),`lang link of Languages drop-down` );
  };
  clickRegioLinkInDropdown = async (id) => {
    await this.clickElement(
      this.regionLinkInDropdown(id),`region link of Region drop-down`);
  };
  clickLinkOfStaticPage = async (id) => {
    await this.clickElement(this.linkOfStaticPage(id), `link of static pages`);
  };

  clickLoginButtonInHamburgerMenu = async () => {
    await this.clickElement(
      this.loginButtonInHamburgerMenu,`login button in hamburger menu`);
  };
  clickLogoutButtonInHamburgerMenu = async () => {
    await this.clickElement(
      this.logoutButtonInHamburgerMenu,`logout button in hamburger menu`);
  };

  clickDropdownRegion = async () => {
    await this.clickElement(
      this.dropdownRegion, `drop-down of regions in hamburger menu`);
  };
  clickGermanyRegionInDropdown = async () => {
    await this.clickElement(
      this.germanyRegionInDropdown,`germany region in the drop-down of regions`);
  };
  clickLanguagesDropdownInHamburgerMenu = async () => {
    await this.clickElement(
      this.languagesDropdownInHamburgerMenu,`drop-down of languages in hamburger menu`);
  };
  clickRegionDropdownInHamburgerMenu = async () => {
    await this.clickElement(
      this.regionDropdownInHamburgerMenu,`region in the drop-down of regions`);
  };
  clickThemeDropdownInHamburgerMenu = async () => {
    await this.clickElement(
      this.themeDropdownInHumburgerMenu,`drop-down of themes in hamburger menu`);
  };
  clickDarkInHamburgerMenu = async () => {
    await this.clickElement(
      this.darkThemeInHemburgerMenu,`dark theme in the dropdown of themes in hamburger menu`
    );
  };
  clickLightInHamburgerMenu = async () => {
    await this.clickElement(
      this.lightThemeInHemburgerMenu, `light theme in the dropdown of themes in hamburger menu`);
  };
  getTextsOfLinksInHamburgerMenu = async () => {
    return this.getTextsOfElements(
      this.textsOfLinksInHamburgerMenu.all(), `links of hamburger menu `);
  };

  selectGermanyRegion = async () => {
    await this.clickDropdownRegion();
    await this.clickGermanyRegionInDropdown();
    return new WebPage();
  };

  //Verify

  expectNicknameUserInHamburgerMenuToHave = async (text) => {
    await this.expectTextOfElement(this.nicknameInHamburgerMenu, text);
  };

  expectLoginButtonInHamburgerMenuIsDisplayed = async () => {
    await this.expectIsElementDisplayed(this.loginButtonInHamburgerMenu);
  };
  expectTextsOfLinksInHamburgerMenu = async (expectedText) => {
    await this.expectTextOfElement(
      this.textsOfLinksInHamburgerMenu, expectedText);
  };
  expectTextsOfLanguagesInHamburgerMenu = async (expectedText) => {
    await this.expectTextOfElement(
      this.textsOflanguagesDropdownInHamburgerMenu, expectedText);
  };
  expectTextsOfRegionInHamburgerMenu = async ( expectedText) => {
    await this.expectTextOfElement(
      this.textsOfRegionDropdownInHamburgerMenu, expectedText);
  };
  expectBackgroundColorOfPage = async (expectedValue) => {
    await expect(this.bodyOfPage).toHaveCSS("background", expectedValue);
  };
}
