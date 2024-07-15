import BaseComponent from "../../../base/BaseComponent.js";
import Player from "./Player.js";


export default class ItemDetails extends BaseComponent {
  constructor(page) {
    super(page);
    this.player = new Player(page)
  }
}
