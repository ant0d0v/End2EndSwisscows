import BaseComponent from "../../../base/BaseComponent";
import ButtonMenu from "../../ButtonMenu";
const { expect } = require("@playwright/test");

export default class ShoppingFilters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);
  }
}
