// ==========================================================================
// Project:   Derailleur.Torrent Unit Test
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur module test ok equals same stop start */

var torrent;
module("Derailleur.Torrent isDoneDownloading", {
  setup: function(){
    Derailleur.store.from(SC.Record.fixtures);
    torrent = Derailleur.Torrent.find(Derailleur.store, 1);
  },
  teardown: function(){
    torrent = null;
  }
});

test("it should be true when the status is seeding even if leftUntilDone is great than 0", function() {
  torrent.set('status', Derailleur.Torrent.STATUS_SEEDING);
  torrent.set('leftUntilDone', 1000);
  equals(torrent.get('isDoneDownloading'), YES, "it is done downloading");
});

test("it should be true when leftUntilDone is 0", function() {
  torrent.set('status', Derailleur.Torrent.STATUS_PAUSED);
  torrent.set('leftUntilDone', 0);
  equals(torrent.get('isDoneDownloading'), YES, "it is done downloading");
});

test("it should be true when leftUntilDone is 0", function() {
  torrent.set('status', Derailleur.Torrent.STATUS_PAUSED);
  torrent.set('leftUntilDone', 1000);
  equals(torrent.get('isDoneDownloading'), NO, "it is not done downloading");
});
