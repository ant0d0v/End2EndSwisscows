import BaseComponent from "../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Track extends BaseComponent {
  constructor(page) {
    super(page);
  }
}
