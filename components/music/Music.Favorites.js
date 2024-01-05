import BasePage from "../../base/BasePage";
const { expect } = require("@playwright/test");

export default class FavoritesPlaylistItem extends BasePage {
  constructor(page) {
    super(page);
  }
}
