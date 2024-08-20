import BaseComponent from "../base/BaseComponent.js";
import Avatar from "../components/Avatar.js";
import { expect } from '@playwright/test';

export default class HamburgerMenu extends BaseComponent {
  constructor(page) {
    super(page);
    this.avatar = new Avatar(this.page);

    //Locators
    this.root = this.page.locator(".menu.popup");
    this.dropdownRegion = this.page.getByText(/Region/);
    this.regionInDropdown = (region) =>
      this.page.getByText(`${region}`, { exact: true });
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.logoutButton = this.page.getByRole("button", { name: "Logout" });
    this.languagesDropdown = this.page.getByText("Language");
    this.regionDropdown = this.page.getByText("Region");
    this.themeDropdown = this.page.getByText("Theme Default");
    this.nameTheme = (name) => this.page.getByText(name);
    this.lightTheme = this.page.getByText("Light");
    this.defaultTheme = this.page
      .locator("li")
      .filter({ hasText: /^Default$/ });
    this.textsLanguagesDropdown = this.page.locator(".menu-dropdown-list li");
    this.textsRegionDropdown = this.page.locator(".menu-dropdown-list li");
    this.languageLinkInDropdown = (nameLocator) =>
      this.page.getByText(nameLocator, { exact: true });
    this.regionLinkInDropdown = (nameLocator) =>
      this.page.locator("li").filter({ hasText: nameLocator });
    this.linkOfStaticPage = (nameLocator) =>
      this.page.getByRole("banner").getByRole("link", { name: nameLocator });
  }

  //Actions

  clickLanguageLinkInDropdown = async (id) => {
    await this.clickElement(
      this.languageLinkInDropdown(id),
      `lang link of Languages drop-down`
    );
  };
  clickRegionLinkInDropdown = async (id) => {
    await this.clickElement(
      this.regionLinkInDropdown(id),
      `region link of Region drop-down`
    );
  };
  clickLinkOfStaticPage = async (id) => {
    await this.clickElement(this.linkOfStaticPage(id), `link of static pages`);
  };

  clickLoginButton = async () => {
    await this.clickElement(this.loginButton, `login button in hamburger menu`);
  };
  clickLogoutButton = async () => {
    await this.clickElement(
      this.logoutButton,
      `logout button in hamburger menu`
    );
  };

  clickDropdownRegion = async () => {
    await this.clickElement(
      this.dropdownRegion,
      `drop-down of regions in hamburger menu`
    );
  };
  clickRegionInDropdown = async (region) => {
    await this.clickElement(
      this.regionInDropdown(region),
      `germany region in the drop-down of regions`
    );
  };
  clickLanguagesDropdown = async () => {
    await this.clickElement(
      this.languagesDropdown,
      `drop-down of languages in hamburger menu`
    );
  };
  clickRegionDropdown = async () => {
    await this.clickElement(
      this.regionDropdown,
      `region in the drop-down of regions`
    );
  };

  selectTheme = async (name) => {
    await this.clickElement(
      this.themeDropdown,
      `drop-down of themes in hamburger menu`
    );
    await this.clickElement(
      this.nameTheme(name),
      `${name}theme in the dropdown of themes`
    );
  };

  clickAvatar = async () => {
    await this.clickElement(this.avatar.image, `avatar in in hamburger menu`);
  };

  selectRegion = async (region) => {
    await this.clickDropdownRegion();
    await this.clickRegionInDropdown(region);
  };

  //Verify

  expectLoginButtonIsDisplayed = async () => {
    await this.expectElementToBeVisible(this.loginButton);
  };

  expectLanguagesDropdownToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(
      this.textsLanguagesDropdown,
      expectedText
    );
  };
  expectRegionDropdownToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(this.textsRegionDropdown, expectedText);
  };

  expectRegionDropdownToHaveCount = async (number) => {
    await this.expectListToHaveCount(this.textsRegionDropdown, number);
  };

  expectLanguagesDropdownToHaveCount = async (number) => {
    await this.expectListToHaveCount(this.textsLanguagesDropdown, number);
  };

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.loginButton,
      testInfo
    );
  };
}
