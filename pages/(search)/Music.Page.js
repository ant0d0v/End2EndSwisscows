import BasePage from "../../base/BasePage.js";
import FavoritePlaylist from "../../components/(search)/music/FavoritePlaylist.js"
import Player from "../../components/(search)/music/Player.js";
import Playlist from "../../components/(search)/music/Playlist.js";
import Track from "../../components/(search)/music/Track.js";
import Header from "../../components/(search)/Header.js";
import Error from "../../components/Error.js";
const { expect, context } = require("@playwright/test");

export default class MusicPage extends BasePage {
  constructor(page) {
    super(page);
    this.favoritePlaylist = new FavoritePlaylist(page);
    this.player = new Player(page);
    this.playlist = new Playlist(page);
    this.track = new Track(page);
    this.header  = new Header(page);
    this.error = new Error(page)
  }
}
