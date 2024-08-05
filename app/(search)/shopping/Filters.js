import BaseComponent from "../../../base/BaseComponent.js";
import { expect } from "@playwright/test";

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.filtersPanel = this.page.getByText('Sort ByBy popularityCheapest')
    this.cheapestFilter = this.page.getByText('Cheapest first');
    this.mostExpensive = this.page.getByText('Most expensive first')
    this.marken = this.page.getByRole('heading', { name: 'Marken' })
    this.brand = (text) => this.page.locator('li').filter({ hasText: text }).getByRole('img')
    this.lastFilter = this.page.getByRole('heading', { name: 'Bildwiederholfrequenz' })
    this.more = this.page.getByText('More', { exact: true })
    this.less = this.page.getByText('Less', { exact: true })
    this.markenFilterItems = this.page.locator(".filter:nth-child(2) .options .item")
  }
  //Actions
  selectMarken = async () => {
    await this.clickElement(this.marken, `filter marken`);
  }
  selectBrand = async (name) => {
    await this.clickElement(this.brand(name), `filter brand`);
  }
  clickMore = async () => {
    await this.clickElement(this.more, `more`);
  }
  clickLess = async () => {
    await this.clickElement(this.less, `less`);
  }
 
  selectCheapestAndGetResponse = async (query) => {
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/shopping/search?query=${query}&offset=0&itemsCount=24&sort=PriceAsc&region=de-DE`);
    await this.clickElement(this.cheapestFilter, `filter select Cheapest`);
    const response = await responsePromise;
    return response
  }

  selectMostExpensiveAndGetResponse = async (query) => {
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/shopping/search?query=${query}&offset=0&itemsCount=24&sort=PriceDesc&region=de-DE`);
    await this.clickElement(this.mostExpensive, `filter Most expensive`);
    const response = await responsePromise;
    return response
  }
  scrollToLastFilter = async () => {
    await this.scrollByVisibleElement(this.lastFilter, "last filter")
  }


  //Verify
  expectListItemsFromMostExpensiveToCheapest = async(originalArray) => {
    let sortedArray = await originalArray.slice().sort((a, b) => b - a);
    expect(originalArray).toEqual(sortedArray)
  }
  expectListItemsFromCheapestToMostExpensive = async(originalArray) => {
    let sortedArray = await originalArray.slice().sort((a, b) => a - b);
    expect(originalArray).toEqual(sortedArray)
  }
  expectFiltersPaneToBeVisible = async () => {
    await this.expectElementToBeVisible(this.filtersPanel)
  }
  expectFiltersPaneToBeHidden = async () => {
    await this.expectElementToBeHidden(this.filtersPanel)
  }
  expectLastFilterToBeVisible = async () => {
    await this.expectElementToBeVisible(this.lastFilter)
  }
  expectLastFilterToBeVisible = async () => {
    await this.expectElementToBeVisible(this.lastFilter)
  }
  expectMarkenFilterToHaveCountItems = async (value) => {
    await this.expectListToHaveCount(this.markenFilterItems, value)
  }

}
