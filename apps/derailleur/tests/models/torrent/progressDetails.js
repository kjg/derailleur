// ==========================================================================
// Project:   Derailleur Unit Test
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur module test ok equals same stop start */

var torrent;
module("Derailleur.Torrent progressDetails", {
  setup: function(){
    Derailleur.store.from(SC.Record.fixtures);
    torrent = Derailleur.Torrent.find(Derailleur.store, 1);
  },
  teardown: function(){
    torrent = null;
  }
});


test("it should work", function() {
  torrent.set('sizeWhenDone', 100000);
  torrent.set('leftUntilDone', 50666);
  equals(torrent.get('progressDetails'), "48.2 KB of 97.7 KB (49.33%)", "should format correctly");
});

