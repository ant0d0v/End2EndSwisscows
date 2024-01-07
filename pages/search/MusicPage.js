import AppPage from "../../base/AppPage.js";
import FavoritesPlaylistItem from "../../components/music/Music.Favorites.js"
import MusicPlayer from "../../components/music/Music.Player.js";
import PlaylistItem from "../../components/music/Music.Playlist.js";
import Track from "../../components/music/Music.Track.js";
const { expect, context } = require("@playwright/test");

export default class MusicPage extends AppPage {
  constructor(page) {
    super(page);
    this.favoritesPlaylistItem = new FavoritesPlaylistItem(page);
    this.musicPlayer = new MusicPlayer(page);
    this.playlistItem = new PlaylistItem(page);
    this.track = new Track(page);
  }
}
