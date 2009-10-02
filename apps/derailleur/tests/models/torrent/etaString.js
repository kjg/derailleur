// ==========================================================================
// Project:   Derailleur.Torrent Unit Test
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur module test ok equals same stop start */

var torrent;
module("Derailleur.Torrent etaString", {
  setup: function(){
    Derailleur.store.from(SC.Record.fixtures);
    torrent = Derailleur.Torrent.find(Derailleur.store, 1);
  },
  teardown: function(){
    torrent = null;
  }
});

test("it should be unknown when less than 0", function() {
  torrent.set('eta', -1);
  equals(torrent.get('etaString'), "remaining time unknown", "eta should be unknown");
});

test("it should format the time correctly", function() {
  torrent.set('eta', 3660);
  equals(torrent.get('etaString'), "1 hr 1 min remaining", "eta be 1 min 1 sec");
});
