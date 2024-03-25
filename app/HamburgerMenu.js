import BaseComponent from "../base/BaseComponent";
import Avatar from "../components/Avatar"
import { expect } from '@playwright/test';

export default class HamburgerMenu extends BaseComponent {
  constructor(page) {
    super(page);
    this.avatar =  new Avatar(this.page);

    //Locators
    this.dropdownRegion = this.page.getByText(/Region/);
    this.allContent = this.page.locator("header div.menu");
    this.regionInDropdown = (region) => this.page.getByText(`${region}`, { exact: true });
    this.loginButton= this.page.getByRole("button", {name: "Login",});
    this.logoutButton = this.page.getByRole("button", {name: "Logout",});
    this.textsOfLinksInHamburgerMenu = this.page.locator("div.menu.popup li a");
    this.languagesDropdown = this.page.getByText("Language");
    this.regionDropdown = this.page.getByText("Region");
    this.themeDropdown = this.page.getByText("Theme Default");
    this.darkTheme = this.page.getByText("Dark");
    this.lightTheme = this.page.getByText("Light");
    this.defaultTheme = this.page.locator("li").filter({ hasText: /^Default$/ });
    this.textsLanguagesDropdown = this.page.locator( "//ul[@class ='menu-dropdown-list']/li");
    this.textsRegionDropdown = this.page.locator("//ul[@class ='menu-dropdown-list']/li");
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

  clickloginButton= async () => {
    await this.clickElement(
      this.loginButtonInHamburgerMenu,`login button in hamburger menu`);
  };
  clickLogoutButton = async () => {
    await this.clickElement(
      this.logoutButton,`logout button in hamburger menu`);
  };

  clickDropdownRegion = async () => {
    await this.clickElement(
      this.dropdownRegion, `drop-down of regions in hamburger menu`);
  };
  clickRegionInDropdown = async (region) => {
    await this.clickElement(
      this.regionInDropdown(region),`germany region in the drop-down of regions`);
  };
  clickLanguagesDropdown = async () => {
    await this.clickElement(
      this.languagesDropdown,`drop-down of languages in hamburger menu`);
  };
  clickRegionDropdown = async () => {
    await this.clickElement(
      this.regionDropdown,`region in the drop-down of regions`);
  };
  clickThemeDropdown = async () => {
    await this.clickElement(
      this.themeDropdown,`drop-down of themes in hamburger menu`);
  };
  clickDarkTheme = async () => {
    await this.clickElement(
      this.darkTheme,`dark theme in the dropdown of themes in hamburger menu`
    );
  };
  clickLightTheme = async () => {
    await this.clickElement(
      this.lightTheme, `light theme in the dropdown of themes in hamburger menu`);
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


  expectLoginButtonIsDisplayed = async () => {
    await this.expectElementToBeVisible(this.loginButton);
  };
  expectLinksToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(
      this.textsOfLinksInHamburgerMenu, expectedText);
  };
  expectLanguagesDropdownToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(
      this.textsLanguagesDropdown, expectedText);
  };
  expectRegionDropdownToHaveText = async ( expectedText) => {
    await this.expectElementToHaveText(
      this.textsRegionDropdown, expectedText);
  };
  expectBackgroundColorOfPage = async (expectedValue) => {
    await expect(this.bodyOfPage).toHaveCSS("background", expectedValue);
  };
  expectDefaultThemeButtonIsActive = async () => {
    await this.expectAttributeClassOfElement(this.defaultTheme, "active");
  };

  expectRegionDropdownToHaveCount = async (number) => {
    await this.expectListToHaveCount(this.textsRegionDropdown, number);
  };
  expectLanguagesDropdownToHaveCount = async (number) => {
    await this.expectListToHaveCount(this.textsLanguagesDropdown, number);
  };
}
