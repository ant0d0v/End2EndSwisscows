const base = require('@playwright/test');
import Application from "../app/index.js";
export let deletionIds = {
  myTracks: {
      internalUser: [],
      externalUser: []
  },
  myImages: {
      internalUser: [],
      externalUser: []
  }
};
exports.test = base.test.extend({
  app: async ({page}, use) => {
    const app = new Application(page)
    await use(app);
    if (deletionIds.myTracks.internalUser.length > 0) {
      for (const id of deletionIds.myTracks.internalUser) { 
        await app.api.user.sendDeleteTrackFromFavorite(id, process.env.TOKEN_INTERNAL_USER);
      }
    }
    if (deletionIds.myTracks.externalUser.length > 0) {
      for (const id of deletionIds.myTracks.externalUser) { 
        await app.api.user.sendDeleteTrackFromFavorite(id,process.env.TOKEN_EXTERNAL_USER);
      }
    }
    if (deletionIds.myImages.internalUser.length > 0) {
      for (const id of deletionIds.myImages.internalUser) { 
        await app.api.user.sendDeleteImageFromFavorite(id, process.env.TOKEN_INTERNAL_USER);
      }
    }
    if (deletionIds.myImages.externalUser.length > 0) {
      for (const id of deletionIds.myImages.externalUser) { 
        await app.api.user.sendDeleteImageFromFavorite(id, process.env.TOKEN_EXTERNAL_USER);
      }
    }
  }
});

exports.expect = base.expect;
