import { test, expect } from "../../utils/fixtures";

test("Check design of the VPN page ", async ({ app },testInfo) => {
    //Actions
    await app.vpnPage.open()
    await app.vpnPage.waitUntilPageIsFullyLoaded();

    //Assert
    await app.vpnPage.expectScreenVpnPage(testInfo)
  });
  
  test("Check design dark theme of the  VPN page ", async ({
    app
  },testInfo) => {
    //Actions
    await app.vpnPage.open()
    await app.vpnPage.waitUntilPageIsFullyLoaded();
    await app.vpnPage.header.clickHamburgerMenuButton();
    await app.vpnPage.header.hamburgerMenu.clickThemeDropdown();
    await app.vpnPage.header.hamburgerMenu.clickDarkTheme();
  
    //Assert
    await app.vpnPage.expectScreenVpnPage(testInfo)
  });

  test("Check that all questions were opened on the VPN page.", async ({
    app
  }) => {
    //Actions
    await app.vpnPage.open()
    await app.vpnPage.scrollDownToQuestions()
    await app.vpnPage.clickAllQuestions();
  
    //Assert
    await app.vpnPage.faq.expectQuestionsAreOpened();
  });
  
  test("Check that a question and answer can be opened and closed on the VPN page.", async ({
    app
  }) => {
    //Actions
    await app.vpnPage.open()
    await app.vpnPage.scrollDownToQuestions()
    await app.vpnPage.clickAllQuestions();
    await app.vpnPage.faq.expectQuestionsAreOpened();
    await app.vpnPage.clickAllQuestions();
    
    //Assert
    await app.vpnPage.faq.expectQuestionsAreClosed();
  });
 
  test("Check that buttons have hover effect on vpn page", async ({ app }) => {
    //Actions
    await app.vpnPage.open()
    
    // Assert
    await app.vpnPage.expectColorsLinksWhenHovering(app.vpnPage.allButtons, "background", 
    "rgb(0, 93, 119) none repeat scroll 0% 0% / auto padding-box border-box");
  });