import BasePage from "../../base/BasePage";
const { expect } = require("@playwright/test");

export default class VideoWidget extends BasePage {
  constructor(page) {
    super(page);
  }
}
