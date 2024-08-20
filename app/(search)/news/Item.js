import BaseComponent from "../../../base/BaseComponent.js";
import ProxyImage from "../../../components/ProxyImage.js";


export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.proxyImage = new ProxyImage(page)

    //Locators
    this.newsItems = this.page.locator(".item.news-article");
    this.allImage = this.page.locator("article.item--news  figure.media img")
    this.firstNewsItem = this.page.locator("article.item--news h2").first()
  }
  //Actions
  getTextContentNewsItems = async () => {
    const texts = [];
    const elements = await this.newsItems.all();
    for (const element of elements) {
        texts.push(await element.textContent());
    }
    return texts;
  }

  clickFirstNewsItem = async () => {
    return await this.clickElementAndNavigateToNewPage(this.firstNewsItem, `first news item in search result`);
   };

  
  // Verify
  expectImageToHaveWightInSearchResult = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };

  expectNewsItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.newsItems)
  };

  expectNewsItemsToContains = async (criteria) => {
    this.expectTextsToContainSearchCriteria(this.newsItems, criteria);
  };
}