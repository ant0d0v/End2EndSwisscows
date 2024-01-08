import BaseComponent from "../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class FavoritesPlaylistItem extends BaseComponent {
  constructor(page) {
    super(page);
  }
}
