import BasePage from "../../base/BasePage.js";
import FavoritesPlaylistItem from "../../components/(search)/music/Music.Favorites.js"
import MusicPlayer from "../../components/(search)/music/Music.Player.js";
import PlaylistItem from "../../components/(search)/music/Music.Playlist.js";
import Track from "../../components/(search)/music/Music.Track.js";
import Header from "../../components/(search)/Header.js";
const { expect, context } = require("@playwright/test");

export default class MusicPage extends BasePage {
  constructor(page) {
    super(page);
    this.favoritesPlaylistItem = new FavoritesPlaylistItem(page);
    this.musicPlayer = new MusicPlayer(page);
    this.playlistItem = new PlaylistItem(page);
    this.track = new Track(page);
    this.header  = new Header(page);
  }
}
