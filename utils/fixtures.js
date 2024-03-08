const base = require('@playwright/test');
const internalData = JSON.parse(
  JSON.stringify(require("../data/auth/internalUser.json"))
);
const externalData = JSON.parse(
  JSON.stringify(require("../data/auth/externalUser.json"))
);
export let favoriteTracksIdForDeletionOfInternalUser = []
export let favoriteTracksIdForDeletionOfExternalUser = []
import Application from "../app/index.js";

exports.test = base.test.extend({
  app: async ({page}, use) => {
    const app = new Application(page)
    await use(app);
    if (favoriteTracksIdForDeletionOfInternalUser) {
      for (const id of favoriteTracksIdForDeletionOfInternalUser) { 
        await app.musicMyPage.track.deleteTrackFromFavorite(id,internalData);
      }
    }
    if (favoriteTracksIdForDeletionOfExternalUser) {
      for (const id of favoriteTracksIdForDeletionOfExternalUser) { 
        await app.musicMyPage.track.deleteTrackFromFavorite(id,externalData);
      }
    }
  }
});

exports.expect = base.expect;
