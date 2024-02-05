import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Preview extends BaseComponent {
  constructor(page) {
    super(page);
  }
}
