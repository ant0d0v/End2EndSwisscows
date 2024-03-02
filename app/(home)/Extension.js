import BaseComponent from "../../base/BaseComponent";

export default class Extension extends BaseComponent {
    constructor(page) {
        super(page);
        // Locators
        this.extensionLink = this.page.getByRole("link", { name: "Install Swisscows The",});
    }
}