// ==========================================================================
// Project:   Derailleur.Torrent Fixtures
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

sc_require('models/torrent');

Derailleur.Torrent.FIXTURES = [
  { guid: 1,
    name: "Enough Records - Nhoin - Rite of Passage",
    status: 4,
    totalSize: 30635793,
    sizeWhenDone: 24049425,
    haveValid: 2422545,
    leftUntilDone: 21626880,
    percentDone: 30 },

  { guid: 2,
    name: "ubuntu-9.04-desktop-amd64.iso",
    status: 16,
    totalSize: 730554368,
    sizeWhenDone: 730554368,
    haveValid: 0,
    leftUntilDone: 730505216,
    percentDone: 80 }

];
