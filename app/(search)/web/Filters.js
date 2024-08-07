import BaseComponent from "../../../base/BaseComponent.js";
import ButtonMenu from "../../../components/ButtonMenu.js";


export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);

    //Locators
    this.filterByDate = this.page.getByRole('button', { name: 'Filter by date' })
    this.attributeFilterByDate = this.page.locator("button-menu")
  }
  
  //Actions
  clickByDate = async() => {
    await this.clickElement(this.filterByDate,`filter by date in dropdown` );
  };
  
  //Verify
  expectByDateIsOpened  = async() => {
    await this.expectAttributeClassOfElement(this.attributeFilterByDate, /open/)
  }

  expectByDateIsClosed = async() => {
    await this.expectAttributeClassOfElement(this.attributeFilterByDate, "button-menu")
  }

}
