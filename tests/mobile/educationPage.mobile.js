import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(
    require("../../data/static-pages/education-page/testData.json")
  )
);

test("Check design of the Education page ", async ({ educationPage }) => {
  //Assert
  await educationPage.expectScreenEducationPage();
});

test("Check color of flyer button when hovering ", async ({ educationPage }) => {
  //Assert
  await educationPage.expectColorLinkWhenHovering(educationPage.flyerButton, "background", /rgb\(191, 0, 0\)/);
});

test("Check design dark theme of the Education page ", async ({
  educationPage
}) => {
  //Actions
  await educationPage.waitUntilPageIsFullyLoaded();
  await educationPage.headerStaticPages.clickHamburgerMenuButton();
  await educationPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await educationPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await educationPage.expectScreenEducationPage();
});
