import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class FavoritePlaylist extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.playlist = this.page.getByRole('link', { name: /My favorite tracks/ })
  }
  //Actions
  expectPlaylistToHaveText = async (value) => {
    await this.expectElementToHaveText(this.playlist,value)
  }
  expectPlaylistToBeHidden = async () => {
    await this.expectElementToBeHidden(this.playlist)
  }
}
