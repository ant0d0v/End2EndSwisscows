import BaseComponent from "../../../base/BaseComponent.js";
export default class FavoritePlaylist extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.playlist = this.page.getByRole('link', { name: /My favorite tracks/ })
  }
  //Actions
  async expectPlaylistToHaveText (value) {
    await this.expectElementToHaveText(this.playlist,value)
  }
  async expectPlaylistToBeHidden(){
    await this.expectElementToBeHidden(this.playlist)
  }
}
