import BaseComponent from "../base/BaseComponent";

export default class Extension extends BaseComponent {
    constructor(page) {
        super(page);
        // Locators
        this.extensionBlock = this.page.getByRole("link", { name: "Install Swisscows The",});
    }
    
    // Actions 

    clickExtensionBlockAndNavigateToWebStore = async () => {
        const newPage = await this.clickElementAndNavigateToNewPage( this.extensionBlock,
          "Install Swisscows Block"
        );
        return newPage;
      };
}