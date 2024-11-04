import { test } from "../../utils/fixtures.js";

test.skip("Check design of the Email page ", async ({ app }, testInfo) => {
  //Actions
  await app.emailPage.open();

  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo);
});

test.skip("Check design dark theme of the  Email page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.emailPage.open();
  await app.emailPage.header.clickHamburgerMenuButton();
  await app.emailPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.emailPage.expectScreenEmailPage(testInfo);
});
