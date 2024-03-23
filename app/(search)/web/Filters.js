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
    this.pastMonth = this.page.getByRole('menuitem', { name: 'Past Month' })
    this.pastYear = this.page.getByRole('menuitem', { name: 'Past Year' })
    this.dropdownOfFilterByDate = this.page.locator('ul.popup.menu li.menuitem')
  }
  
  //Actions
  
  clickPastDayFilterAndGetResponse = async (expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
    await this.clickElement(this.pastDay, `past day filter in dropdown` );
    const response = await responsePromise;
    return response;
  };
  clickPastMonthFilterAndGetResponse = async (expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
    await this.clickElement(this.pastMonth, `past month filter in dropdown` );
    const response = await responsePromise;
    return response;
  };
  clickPastYearFilterAndGetResponse = async (expectedLink) => {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(expectedLink));
    await this.clickElement(this.pastYear, `past year filter in dropdown` );
    const response = await responsePromise;
    return response;
  };

  //Verify

  expectFilterByDateDropdownToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(this.dropdownOfFilterByDate,expectedText)
  };
  expectDatePublishedForPastDayToEqual = async (response,  getYesterdayDay) => {
    const jsonResponse = await response.json();
    jsonResponse.items.forEach(item => {
      if (item.datePublished) {
        const datePublished = item.datePublished;
        const dateOnly = datePublished.slice(8, 10);
        expect(dateOnly).toEqual(getYesterdayDay);
      }
    });
  };
  expectDatePublishedForPastMonthToEqual = async (response, getPastMonth) => {
    const jsonResponse = await response.json();
    jsonResponse.items.forEach(item => {
      if (item.datePublished) {
        const datePublished = item.datePublished;
        const dateOnly = datePublished.slice(5, 7);
        expect(dateOnly).toEqual(getPastMonth);
      }
    });
  };
  expectDatePublishedForPastYearToEqual = async (response, getPastYear) => {
    const jsonResponse = await response.json();
    jsonResponse.items.forEach(item => {
      if (item.datePublished) {
        const datePublished = item.datePublished;
        const dateOnly = datePublished.slice(0, 4);
        expect(dateOnly).toEqual(getPastYear);
      }
    });
  };
}
