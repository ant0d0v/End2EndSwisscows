import BaseComponent from "./BaseComponent";
const { expect } = require("@playwright/test");

export default class AppPage extends BaseComponent {
  constructor(page) {
    super(page);
  }
}
