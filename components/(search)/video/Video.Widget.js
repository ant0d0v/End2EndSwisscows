import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class VideoWidget extends BaseComponent {
  constructor(page) {
    super(page);
  }
}
