import BaseComponent from "../../../base/BaseComponent.js";
import ButtonMenu from "../../../components/ButtonMenu.js";
export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);
  }
}
