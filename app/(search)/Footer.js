import BaseComponent from '../../base/BaseComponent'
export default class Footer extends BaseComponent {
    constructor(page) {
        super(page)
    //Locators
    this.socialNetworksLinks = (index) => this.page.locator(`.social-networks > a:nth-child(${index})`)
    this.swisscowsAppLinks = (locator) => this.page.getByRole('link', { name: locator })
    this.swisscowsAppImages = this.page.locator(".app .app-link img")       
    }
    //Verify
    expectSwisscowsAppImagesToBeVisible = async () => {
        await this.expectAreElementsInListDisplayed(this.swisscowsAppImages);
    }    
}
