import BaseComponent from "../../../base/BaseComponent.js";
export default class FavoritePlaylist extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.getByRole("link", { name: /My favorite tracks/ });
    this.count = this.root.locator(".count");
  }
  //Actions
  async expectPlaylistToHaveText(value) {
    await this.expectElementToHaveText(this.root, value);
  }
  async expectCountToHaveText(value) {
    await this.expectElementToHaveText(this.count, value);
  }
  async expectPlaylistToBeHidden() {
    await this.expectElementToBeHidden(this.root);
  }
}
