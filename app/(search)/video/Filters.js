import BaseComponent from "../../../base/BaseComponent";
import ButtonMenu from "../../../components/ButtonMenu";
const { expect } = require("@playwright/test");

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);
  }
}
