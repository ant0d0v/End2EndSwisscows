import BasePage from "../../base/BasePage";
const { expect } = require("@playwright/test");

export default class WebPreview extends BasePage {
  constructor(page) {
    super(page);
  }
}
