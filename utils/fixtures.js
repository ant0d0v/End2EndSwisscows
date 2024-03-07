const base = require('@playwright/test');
export let favoriteTracksIdForDeletion = []
import Application from "../app/index.js";

exports.test = base.test.extend({
  app: async ({page}, use) => {
    const app = new Application(page)
    await use(app);
    if (favoriteTracksIdForDeletion) {
      for (const id of favoriteTracksIdForDeletion) { 
        await app.musicMyPage.track.deleteTrackFromFavorite(id);
      }
    }
  }
});

exports.expect = base.expect;
