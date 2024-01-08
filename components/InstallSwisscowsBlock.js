import BaseComponent from "../base/BaseComponent";

export default class InstallSwisscowsBlock extends BaseComponent {
    constructor(page) {
        super(page);
        // Locators
        this.installSwisscowsBlock = this.page.getByRole("link", { name: "Install Swisscows The",});
    }
    
    // Actions 

    clickInstallSwisscowsBlockAndNavigateToWebStore = async () => {
        const newPage = await this.clickElementAndNavigateToNewPage( this.installSwisscowsBlock,
          "Install Swisscows Block"
        );
        return newPage;
      };
}