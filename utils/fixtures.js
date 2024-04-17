const base = require('@playwright/test');
import Application from "../app/index.js";

export let favoriteTracksIdForDeletionOfInternalUser = []
export let favoriteTracksIdForDeletionOfExternalUser = []
export let favoriteImagesIdForDeletionOfInternalUser = []
export let favoriteImagesIdForDeletionOfExternalUser = []

exports.test = base.test.extend({
  app: async ({page}, use) => {
    const app = new Application(page)
    await use(app);
    if (favoriteTracksIdForDeletionOfInternalUser.length > 0) {
      for (const id of favoriteTracksIdForDeletionOfInternalUser) { 
        await app.api.user.sendDeleteTrackFromFavorite(id, process.env.TOKEN_INTERNAL_USER);
      }
    }
    if (favoriteTracksIdForDeletionOfExternalUser.length > 0) {
      for (const id of favoriteTracksIdForDeletionOfExternalUser) { 
        await app.api.user.sendDeleteTrackFromFavorite(id,process.env.TOKEN_EXTERNAL_USER);
      }
    }
    if (favoriteImagesIdForDeletionOfInternalUser.length > 0) {
      for (const id of favoriteImagesIdForDeletionOfInternalUser) { 
        await app.api.user.sendDeleteImageFromFavorite(id, process.env.TOKEN_INTERNAL_USER);
      }
    }
    if (favoriteImagesIdForDeletionOfExternalUser.length > 0) {
      for (const id of favoriteImagesIdForDeletionOfExternalUser) { 
        await app.api.user.sendDeleteImageFromFavorite(id,process.env.TOKEN_EXTERNAL_USER);
      }
    }
  }
});

exports.expect = base.expect;
