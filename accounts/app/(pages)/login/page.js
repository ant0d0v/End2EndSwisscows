import BasePage from "../../../../base/BasePage.js";
import Form from "./Form.js";

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.form = new Form(this.page)
  }
  //Actions

  //Verify
}
