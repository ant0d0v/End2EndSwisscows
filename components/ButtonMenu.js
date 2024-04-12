import BaseComponent from '../base/BaseComponent'
export default class ButtonMenu extends BaseComponent {
    constructor(page) {
        super(page)

        //Locators
        this.filterList = (name) => this.page.getByRole('menuitem', { name: `${name}` })
        this.pastDay = this.page.getByRole('menuitem', { name: 'Past Day' })
        this.pastMonth = this.page.getByRole('menuitem', { name: 'Past Month' })
        this.pastYear = this.page.getByRole('menuitem', { name: 'Past Year' })
        this.dropdownOfFilter = this.page.locator('ul.popup.menu li.menuitem')
        this.filterTableView = this.page.getByRole('menuitem', { name: 'Table view' })
    }
    //Actions
    
    clickMenuItemAndGetResponse = async (name, expectedLink) => {
        const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
        await this.clickElement(this.filterList(name),`filter in dropdown` );
        const response = await responsePromise;
        return response;
    };    
    clickPastDayAndGetResponse = async (expectedLink) => {
        const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
        await this.clickElement(this.pastDay, `past day filter in dropdown` );
        const response = await responsePromise;
        return response;
    };
    clickMenuItemTableView = async () => {
        await this.clickElement(this.filterTableView), "filter table view in dropdown`"
    };

    //Verify
    expectDropdownToHaveText = async (expectedText) => {
        await this.expectElementToHaveText(this.dropdownOfFilter,expectedText)
    };
    
}
