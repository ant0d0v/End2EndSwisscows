import BaseComponent from "../../../base/BaseComponent.js";
export default class Playlist extends BaseComponent {
  constructor(page) {
    super(page);
  
    //Locators
    this.root = this.page.locator(".audio-playlist");
    this.trackCount = (index) => this.page.locator(`a[href*="/en/music/playlist?query="] .duration span:first-child`).nth(index - 1)
    this.allImages = this.root.locator("img");
  }
  async getTextSumTracksOfPlaylistNumber (index){
    await this.expectElementToHaveText(this.trackCount(index), value);
  }
  //
  async expectImageToHaveWight(property, value){
    await this.expectElementsToHaveJSProperty(this.allImages , property, value);
  };
}
