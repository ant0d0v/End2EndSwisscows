import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Playlist extends BaseComponent {
  constructor(page) {
    super(page);
  
    //Locators
    this.trackCount = (index) => this.page.locator(`a[href*="/en/music/playlist?query="] .duration span:first-child`).nth(index - 1)
  }
  getTextSumTracksOfPlaylistNumber = async (index) => {
    const text = await this.trackCount(index).innerText();
    const number = parseInt(text.split(" ").filter(part => !isNaN(parseInt(part)))[0]);
    return isNaN(number) ? 0 : number;
  }
}
