import  BasePage  from "../../base/BasePage.js";
const { expect, context } = require("@playwright/test");

export default class MusicPage extends BasePage {
  constructor(page) {
    super(page);
  }
}
