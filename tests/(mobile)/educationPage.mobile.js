import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(
    require("../../data/pages/media-education/testData.json")
  )
);

test("Check design of the Education page ", async ({ mediaEducationPage },testInfo) => {
  //Assert
  await mediaEducationPage.expectScreenMediaEducationPage(testInfo);
});

test("Check color of flyer button when hovering ", async ({ mediaEducationPage }) => {
  //Assert
  await mediaEducationPage.expectColorLinkWhenHovering(mediaEducationPage.flyerButton, "background", /rgb\(191, 0, 0\)/);
});

test("Check design dark theme of the Education page ", async ({
  mediaEducationPage
},testInfo) => {
  //Actions
  await mediaEducationPage.waitUntilPageIsFullyLoaded();
  await mediaEducationPage.header.clickHamburgerMenuButton();
  await mediaEducationPage.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await mediaEducationPage.header.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await mediaEducationPage.expectScreenMediaEducationPage(testInfo);
});
