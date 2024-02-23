import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class FavoritePlaylist extends BaseComponent {
  constructor(page) {
    super(page);
    this.playlist = this.page.getByRole('link', { name: /My favorite tracks/ })
  }
  //Actions
  clickPlaylist = async () => {
    await this.clickElement( this.playlist,
      `favorite playlist`
    );
  };
}
