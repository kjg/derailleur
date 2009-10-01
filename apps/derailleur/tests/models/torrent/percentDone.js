// ==========================================================================
// Project:   Derailleur.Torrent Unit Test
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur module test ok equals same stop start */

var torrent;
module("Derailleur.Torrent percentDone", {
  setup: function(){
    Derailleur.store.from(SC.Record.fixtures);
    torrent = Derailleur.Torrent.find(Derailleur.store, 1);
  },
  teardown: function(){
    torrent = null;
  }
});

test("it should return 0 when sizeWhenDone is null", function() {
  torrent.set('sizeWhenDone', null);
  equals(torrent.get('percentDone'), 0, "percentDone should be 0");
});

test("it should return 0 when leftUntilDone is null", function() {
  torrent.set('leftUntilDone', null);
  equals(torrent.get('percentDone'), 0, "percentDone should be 0");
});

test("it should truncate to 2 decimals", function() {
  torrent.set('sizeWhenDone', 100000);
  torrent.set('leftUntilDone', 50666);
  equals(torrent.get('percentDone'), 49.33, "percentDone should be 49.33");
});

test("it should always round done so that 100% isn't premature", function() {
  torrent.set('sizeWhenDone', 100000);
  torrent.set('leftUntilDone', 1);
  equals(torrent.get('percentDone'), 99.99, "percentDone should be 99.99");
});
