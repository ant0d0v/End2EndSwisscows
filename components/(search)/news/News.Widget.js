import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class NewsWidget extends BaseComponent {
  constructor(page) {
    super(page);
  }
}
