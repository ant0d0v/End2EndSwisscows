import BasePage from "../../base/BasePage.js";
import FavoritesPlaylistItem from "../../components/music/Music.Favorites.js"
import MusicPlayer from "../../components/music/Music.Player.js";
import PlaylistItem from "../../components/music/Music.Playlist.js";
import Track from "../../components/music/Music.Track.js";
import Header from "../../components/Header.js";
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
