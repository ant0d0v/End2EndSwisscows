import { test as base } from "@playwright/test";
import Application from "../app/index.js";
import AdminApplication from "../admin/app/index.js";
import AccountsApplication from "../accounts/app/index.js";
import {
  getBearerTokenOfInternalUser,
  getBearerTokenOfExternalUser,
} from "../helpers/authHelper.js";
const tokenInternalUser = getBearerTokenOfInternalUser()
const tokenExternalUser = getBearerTokenOfExternalUser();

export let deletionIds = {
  myTracks: {
    internalUser: [],
    externalUser: [],
  },
  myImages: {
    internalUser: [],
    externalUser: [],
  },
};
export const test = base.extend({
  app: async ({ page, context, browser }, use) => {
    const app = new Application(page);
    await use(app, page, context, browser);
    if (deletionIds.myTracks.internalUser.length > 0) {
      for (const id of deletionIds.myTracks.internalUser) {
        await app.api.user.sendDeleteTrackFromFavorite(id, tokenInternalUser);
      }
    }
    if (deletionIds.myTracks.externalUser.length > 0) {
      for (const id of deletionIds.myTracks.externalUser) {
        await app.api.user.sendDeleteTrackFromFavorite(id, tokenExternalUser);
      }
    }
    if (deletionIds.myImages.internalUser.length > 0) {
      for (const id of deletionIds.myImages.internalUser) {
        await app.api.user.sendDeleteImageFromFavorite(id, tokenInternalUser);
      }
    }
    if (deletionIds.myImages.externalUser.length > 0) {
      for (const id of deletionIds.myImages.externalUser) {
        await app.api.user.sendDeleteImageFromFavorite(id, tokenExternalUser);
      }
    }
    
    // Clear the arrays after processing
    deletionIds.myTracks.internalUser = [];
    deletionIds.myTracks.externalUser = [];
    deletionIds.myImages.internalUser = [];
    deletionIds.myImages.externalUser = [];

    await context.close()
  },
  accounts: async ({ page, context, browser }, use) => {
    const app = new AccountsApplication(page);
    await use({ app, page, context, browser });
  },
  admin: async ({ browser }, use) => {
    // Create a new context for admin
    const adminCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const adminPage = await adminCtx.newPage();
    const app = new AdminApplication(adminPage);

    await use({
      app,
      page: adminPage,
      context: adminCtx,
      browser,
    });

    // Close the admin page and context after the test
    await adminPage.close();
    await adminCtx.close();
  },
});

export { expect } from "@playwright/test";
