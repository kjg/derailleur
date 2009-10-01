// ==========================================================================
// Project:   Derailleur.Torrent Unit Test
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur module test ok equals same stop start */

var torrent;
module("Derailleur.Torrent isActive", {
  setup: function(){
    Derailleur.store.from(SC.Record.fixtures);
    torrent = Derailleur.Torrent.find(Derailleur.store, 1);
  },
  teardown: function(){
    torrent = null;
  }
});

test("it should be true when the torrent is seeding", function() {
  torrent.set('status', Derailleur.Torrent.STATUS_SEEDING);
  equals(torrent.get('isActive'), YES, "seeding should be active");
});

test("it should be true when the torrent is downloading", function() {
  torrent.set('status', Derailleur.Torrent.STATUS_DOWNLOADING);
  equals(torrent.get('isActive'), YES, "seeding should be active");
});


test("it should be false the rest of the time", function() {
  torrent.set('status', Derailleur.Torrent.STATUS_WAITING_TO_CHECK);
  equals(torrent.get('isActive'), NO, "waiting should not be active");

  torrent.set('status', Derailleur.Torrent.STATUS_CHECKING);
  equals(torrent.get('isActive'), NO, "checking should not active");

  torrent.set('status', Derailleur.Torrent.STATUS_PAUSED );
  equals(torrent.get('isActive'), NO, "paused should not be active");
});
