import { BasePage } from "../base/BasePage";
const { expect } = require("@playwright/test");

export class Filters extends BasePage {
  constructor(page) {
    super(page);
  }
}
