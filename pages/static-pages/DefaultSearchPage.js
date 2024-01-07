import AppPage from "../../base/AppPage";
const { expect, context } = require("@playwright/test");
export default class DefaultSearchPage extends AppPage {
  constructor(page) {
    super(page);
  }
}
