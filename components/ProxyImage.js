const { expect, context, test} = require('@playwright/test');
import BaseComponent from '../base/BaseComponent'
export default class ProxyImage extends BaseComponent {
    constructor(page) {
        super(page)
}
 //Actions
 expectAttributeSrcAllImagesToHave = async(elements, value) => {
    await test.step('Expect the elements in the array to "have" attribute src with value', async ()=> {
        for (const attribute of await elements.all()) {
            await expect(attribute).toHaveAttribute("src", value);
        }
    })};
}