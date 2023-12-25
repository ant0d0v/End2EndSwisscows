import { BasePage } from "../base/BasePage";
const { expect } = require("@playwright/test");

export class Pagination extends BasePage {
  constructor(page) {
    super(page);
  }
}
