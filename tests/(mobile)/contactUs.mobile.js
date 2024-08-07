import { test } from "../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
import constantsData from "../../data/project-constants/testData.json";

test.fixme("Check color of Send button when hovering ", async ({ app }) => {
  //Actions
  await app.contactPage.open();

  //Assert
  await app.contactPage.form.expectSendButtonWhenHoveringToHaveColor(
    /rgb\(191, 0, 0\)/
  );
});

test(`Check succses message when sending form with all required fields`, async ({ app },testInfo) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.form.inputYouNameField(faker.person.fullName());
  await app.contactPage.form.inputEmailField(faker.internet.exampleEmail());
  await app.contactPage.form.inputMessageField(faker.word.words({ count: { min: 5, max: 10 } }));
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
  await app.contactPage.header.hamburgerMenu.clickThemeDropdown();
  await app.contactPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.contactPage.takeSnapshot(testInfo);
});
