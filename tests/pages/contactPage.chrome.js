import { test } from "../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
import constantsData from "../../data/project-constants/testData.json";

test("Check color of Send button when hovering ", async ({ app }) => {
  //Actions
  await app.contactPage.open();

  //Assert
  await app.contactPage.form.expectSendButtonWhenHoveringToHaveColor(
    /rgb\(191, 0, 0\)/
  );
});

test(`Check border color of name, email, message when sending form with empty fields`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.takeSnapshot(testInfo);
});

test(`Check property of name, email, message when sending form with empty fields`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.form.expectYourNameFieldToHaveProperty(
    "Please fill out this field."
  );
  await app.contactPage.form.expectEmailFieldToHaveProperty(
    "Please fill out this field."
  );
  await app.contactPage.form.expectYourMessageFieldToHaveProperty(
    "Please fill out this field."
  );
});

test(`Check property of name, email, message when sending form with name only`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.fillContactForm({
    nameField: faker.person.fullName(),
    emailField: "",
    messageField: "",
  });
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.form.expectYourNameFieldToHaveProperty("");
  await app.contactPage.form.expectEmailFieldToHaveProperty(
    "Please fill out this field."
  );
  await app.contactPage.form.expectYourMessageFieldToHaveProperty(
    "Please fill out this field."
  );
});

test(`Check property of name, email, message when sending form with email only`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.fillContactForm({
    nameField: "",
    emailField: faker.internet.exampleEmail(),
    messageField: "",
  });
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.form.expectYourNameFieldToHaveProperty(
    "Please fill out this field."
  );
  await app.contactPage.form.expectEmailFieldToHaveProperty("");
  await app.contactPage.form.expectYourMessageFieldToHaveProperty(
    "Please fill out this field."
  );
});

test(`Check property of name, email, message when sending form with message only`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.fillContactForm({
    nameField: "",
    emailField: "",
    messageField: faker.word.words({ count: { min: 5, max: 10 } }),
  });
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.form.expectYourNameFieldToHaveProperty(
    "Please fill out this field."
  );
  await app.contactPage.form.expectEmailFieldToHaveProperty(
    "Please fill out this field."
  );
  await app.contactPage.form.expectYourMessageFieldToHaveProperty("");
});

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

test(`Check "back to search" button `, async ({ app }) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.fillContactForm({
    nameField: faker.person.fullName(),
    emailField: faker.internet.exampleEmail(),
    messageField: faker.word.words({ count: { min: 5, max: 10 } }),
  });
  await app.contactPage.form.checkAgreeCheckbox();
  await app.contactPage.form.clickSendButton();
  await app.contactPage.clickBackToSearchButton();

  //Assert
  await app.expectPageToHaveUrl(app.page, constantsData.URL_MAIN_PAGE);
  await app.expectHaveTitle(app.page, constantsData.TITLE_MAIN_PAGE);
});

test(`Check the tooltip when sending a message without the "Agree" checkbox`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.fillContactForm({
    nameField: faker.person.fullName(),
    emailField: faker.internet.exampleEmail(),
    messageField: faker.word.words({ count: { min: 5, max: 10 } }),
  });
  await app.contactPage.form.clickSendButton();

  //Assert
  await app.contactPage.form.expectAgreeCheckboxToHaveProperty(
    "Please check this box if you want to proceed."
  );
});

test(`Check color of "back to search" when hovering `, async ({ app }) => {
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
  await app.contactPage.expectBackToSearchButtonWhenHoveringToHaveColor(
    /rgb\(191, 0, 0\)/
  );
});

test("Check navigation to corresponding pages for  privacy link on the page", async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  const currentPage =
    await app.contactPage.form.clickPrivacyLinkAndNavigateToNewPage();

  //Assert
  await app.expectPageToHaveUrl(currentPage, constantsData.URL_PRIVACY_POLICY);
  await app.expectHaveTitle(currentPage, constantsData.TITLE_PRIVACY_POLICY);
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

test.skip(`Check error when sending message with 400 status code `, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactRoute.requestWithGivenResponseStatusCode(400);
  await app.contactPage.form.fillContactForm({
    nameField: faker.person.fullName(),
    emailField: faker.internet.exampleEmail(),
    messageField: faker.word.words({ count: { min: 5, max: 10 } }),
  });
  await app.contactPage.form.checkAgreeCheckbox();
  await app.contactPage.form.clickSendButton();

  //Assert
});
