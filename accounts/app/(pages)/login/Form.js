import BaseComponent from "../../../../base/BaseComponent.js";

export default class Form extends BaseComponent {
  constructor(page) {
    super(page);
    this.emailField = this.page.getByPlaceholder("Username or email");
    this.passwordField = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }
  //Actions
  async fill(
    fields = {
      emailField: string,
      passwordField: string,
    }
  ) {
    await this.emailField.fill(fields.emailField, `Email field`);
    await this.passwordField.fill(fields.passwordField, `Email field`);
  }
  inputEmail = async (value) => {
    await this.emailField.fill(value);
  };
  pressTab = async () => {
    await this.emailField.press("Tab");
  };
  inputPassword = async (value) => {
    await this.passwordField.fill(value);
  };
  clickLoginButton = async () => {
    await this.clickElement(this.loginButton, `login button`);
  };

  //Verify
}
