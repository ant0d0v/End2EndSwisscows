import BasePage from "../../base/BasePage.js";

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = this.page.getByPlaceholder("Username or email");
    this.passwordField = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.mainImage = this.page.locator("img").nth(2);
  }
  //Actions
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
