import BaseComponent from "../../../base/BaseComponent";
import Player from "./Player";
const { expect } = require("@playwright/test");

export default class ItemDetails extends BaseComponent {
  constructor(page) {
    super(page);
    this.player = new Player(page)
  }
}
