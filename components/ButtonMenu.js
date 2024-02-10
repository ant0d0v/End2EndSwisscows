import BaseComponent from '../base/BaseComponent'
export default class ButtonMenu extends BaseComponent {
    constructor(page) {
        super(page)

        //Locators
        this.filterByDate = this.page.getByRole('button', { name: 'Filter by date' })
        this.attributeFilterByDate = this.page.locator("div.button-menu")
    
    }
    //Actions

    clickFilterByDate = async() => {
        await this.clickElement(
          this.filterByDate,`filter by date in dropdown` );
      };

}
