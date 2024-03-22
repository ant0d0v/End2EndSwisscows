import BaseComponent from "../../../base/BaseComponent";
import ButtonMenu from "../../../components/ButtonMenu";
const { expect } = require("@playwright/test");

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);

    //Locators
    this.filterList = (name) => this.page.getByRole('menuitem', { name: `${name}` })
    this.pastDay = this.page.getByRole('menuitem', { name: 'Past Day' })
    this.dropdownOfFilterByDate = this.page.locator('ul.popup.menu li.menuitem')
  }
  //Actions
  clickFilterInDropdownListAndGetResponse = async (name, expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
    await this.clickElement(this.filterList(name),`filter in dropdown` );
    const response = await responsePromise;
    return response;
  };
  clickPastDayFilterAndGetResponse = async (expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
    await this.clickElement(this.pastDay, `past day filter in dropdown` );
    const response = await responsePromise;
    return response;
  };
  //Verify
  expectFilterByDateDropdownToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(this.dropdownOfFilterByDate,expectedText)
  };
  expectResponseDatePublishedToEqual= async (response, testID, getYesterdayDay, getPastMonth, getPastYear) => {
    const jsonResponse = await response.json();
    jsonResponse.items.forEach(item => {
      if (item.datePublished && testID == 1) {
        const datePublished = item.datePublished;
        const dateOnly = datePublished.slice(8, 10);
        expect(dateOnly).toEqual(getYesterdayDay);
      }
      if (item.datePublished && testID == 2) {
        const datePublished = item.datePublished;
        const dateOnly = datePublished.slice(6, 7);
        expect(dateOnly).toEqual(getPastMonth);
      }
      if (item.datePublished && testID == 3) {
        const datePublished = item.datePublished;
        const dateOnly = datePublished.slice(0, 4);
        expect(dateOnly).toEqual(getPastYear);
      }
    });
  };

  
}
