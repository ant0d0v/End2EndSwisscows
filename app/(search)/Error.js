import BaseComponent from "../../base/BaseComponent";
export default class Error extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.contentErrorNoResults = this.page.locator('div').filter({ hasText: 'No results found for' }).nth(1)
    this.contentErrorPage = this.page.locator("div.error div.content")
    this.errorImage = this.page.getByRole('img', { name: 'Error Image' })
    this.errorImageNoResult = this.page.getByRole('main').getByRole('img').first()
  }
  // Actions

  open404Page = () => {
    this.page.goto("https://swisscows.com/en/qwerty")
  }
  open500Page = (endpoint) => {
    this.page.goto(`https://swisscows.com/en${endpoint}?query= `)
  }
}
