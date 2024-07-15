import BaseComponent from "../base/BaseComponent.js";

export default class Avatar extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.nickname = this.page.getByRole("link", {name: "T Test",});
    this.image = this.page.locator(".avatar img")
  }
  //Actions

  

  // Verify

  expectNicknameToHaveText = async (text) => {
    await this.expectElementToHaveText(this.nickname, text);
  };
  expectAvatarToBeVisible = async () => {
    await this.expectElementToBeVisible(this.image);
  };
  
}
