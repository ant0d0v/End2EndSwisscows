import BasePage from "../../base/BasePage";

export default class SignInPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailField = this.page.getByPlaceholder('Username or email')
    this.passwordField = this.page.getByPlaceholder("Password")
    this.loginButton = this.page.getByRole("button", { name: "Login" })
  }
  //Actions
  inputEmail = async (value) => {
   await this.emailField.fill(value)
  };
  inputPassword = async (value) => {
   await this.passwordField.fill(value)
   };
  clickLoginButton = async () => {
    await this.clickElement(
      this.loginButton,`login button`);
  };
}