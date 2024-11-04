import { test } from "../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
import { randomUserAgent } from "../../helpers/random.js"

test.use({ userAgent: randomUserAgent() });

test(`Check succses message when sending form with all required fields`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.fillContactForm({
    nameField: faker.person.fullName(),
    emailField: faker.internet.exampleEmail(),
    messageField: faker.word.words({ count: { min: 5, max: 10 } }),
  });
  await app.contactPage.form.checkAgreeCheckbox();
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.takeSnapshot(testInfo);
});

test("Check design of the Contact Us page ", async ({ app }, testInfo) => {
  //Actions
  await app.contactPage.open();
  //Assert
  await app.contactPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the  Contact Us page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.header.clickHamburgerMenuButton();
  await app.contactPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.contactPage.takeSnapshot(testInfo);
});
