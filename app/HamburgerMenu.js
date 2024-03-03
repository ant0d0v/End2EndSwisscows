import BaseComponent from "../base/BaseComponent";
import Avatar from "..//components/Avatar"
import { expect } from '@playwright/test';

export default class HamburgerMenu extends BaseComponent {
  constructor(page) {
    super(page);
    this.avatar =  new Avatar(this.page);

    //Locators
    this.dropdownRegion = this.page.getByText(/Region/);
    this.allContent = this.page.locator("header div.menu");
    this.regionInDropdown = (region) => this.page.getByText(`${region}`, { exact: true });
    this.loginButtonInHamburgerMenu = this.page.getByRole("button", {name: "Login",});
    this.logoutButtonInHamburgerMenu = this.page.getByRole("button", {name: "Logout",});
    this.textsOfLinksInHamburgerMenu = this.page.locator("div.menu.popup li a");
    this.languagesDropdownInHamburgerMenu = this.page.getByText("Language");
    this.regionDropdownInHamburgerMenu = this.page.getByText("Region");
    this.themeDropdownInHamburgerMenu = this.page.getByText("Theme Default");
    this.darkThemeInHamburgerMenu = this.page.getByText("Dark");
    this.lightThemeInHamburgerMenu = this.page.getByText("Light");
    this.defaultThemeInHamburgerMenu = this.page.locator("li").filter({ hasText: /^Default$/ });
    this.textsLanguagesDropdownInHamburgerMenu = this.page.locator( "//ul[@class ='menu-dropdown-list']/li");
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
  clickRegionLinkInDropdown = async (id) => {
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
  clickRegionInDropdown = async (region) => {
    await this.clickElement(
      this.regionInDropdown(region),`germany region in the drop-down of regions`);
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
      this.themeDropdownInHamburgerMenu,`drop-down of themes in hamburger menu`);
  };
  clickDarkInHamburgerMenu = async () => {
    await this.clickElement(
      this.darkThemeInHamburgerMenu,`dark theme in the dropdown of themes in hamburger menu`
    );
  };
  clickLightInHamburgerMenu = async () => {
    await this.clickElement(
      this.lightThemeInHamburgerMenu, `light theme in the dropdown of themes in hamburger menu`);
  };
  getTextsOfLinksInHamburgerMenu = async () => {
    return this.getTextsOfElements(
      this.textsOfLinksInHamburgerMenu.all(), `links of hamburger menu `);
  };

  selectRegion = async (region) => {
    await this.clickDropdownRegion();
    await this.clickRegionInDropdown(region);
  };

  //Verify


  expectLoginButtonInHamburgerMenuIsDisplayed = async () => {
    await this.expectElementToBeVisible(this.loginButtonInHamburgerMenu);
  };
  expectTextsOfLinksInHamburgerMenu = async (expectedText) => {
    await this.expectElementToHaveText(
      this.textsOfLinksInHamburgerMenu, expectedText);
  };
  expectTextsOfLanguagesInHamburgerMenu = async (expectedText) => {
    await this.expectElementToHaveText(
      this.textsLanguagesDropdownInHamburgerMenu, expectedText);
  };
  expectTextsOfRegionInHamburgerMenu = async ( expectedText) => {
    await this.expectElementToHaveText(
      this.textsOfRegionDropdownInHamburgerMenu, expectedText);
  };
  expectBackgroundColorOfPage = async (expectedValue) => {
    await expect(this.bodyOfPage).toHaveCSS("background", expectedValue);
  };
}
