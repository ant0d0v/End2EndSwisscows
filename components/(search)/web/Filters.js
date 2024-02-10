import BaseComponent from "../../../base/BaseComponent";
import ButtonMenu from "../../ButtonMenu";
const { expect } = require("@playwright/test");

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);

    //Locators
    this.filterList = (name) => this.page.getByRole('menuitem', { name: `${name}` })
    this.dropdownOfFilterByDate = this.page.locator('ul.popup.menu li.menuitem')
  }
  //Actions
  clickFilterInDropdownListAndGetResponse = async (name, expectedLink) => {
    const responsePromise = this.page.waitForResponse(expectedLink);
    await this.clickElement(this.filterList(name),`filter in dropdown` );
    const response = await responsePromise;
    return response;
  };
}
