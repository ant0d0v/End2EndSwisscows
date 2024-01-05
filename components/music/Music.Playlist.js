import BasePage from "../../base/BasePage";
const { expect } = require("@playwright/test");

export default class PlaylistItem extends BasePage {
  constructor(page) {
    super(page);
  }
}
