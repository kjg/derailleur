// ==========================================================================
// Project:   Derailleur.Torrent
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

/** @class

  A Torrent

  @extends SC.Record
  @version 0.1
*/

Derailleur.Torrent = SC.Record.extend(
/** @scope Derailleur.Torrent.prototype */ {

  name: SC.Record.attr(String),
  status: SC.Record.attr(Number),
  totalSize: SC.Record.attr(Number),
  sizeWhenDone: SC.Record.attr(Number),
  haveValid: SC.Record.attr(Number),
  leftUntilDone: SC.Record.attr(Number),

  percentDone: function() {
    var sizeWhenDone, leftUntilDone, percentDone;
    sizeWhenDone = this.get('sizeWhenDone');
    leftUntilDone = this.get('leftUntilDone');

    if( SC.none(sizeWhenDone) ) return 0;
    if( SC.none(leftUntilDone) ) return 0;

    percentDone = Math.floor( ((sizeWhenDone - leftUntilDone) / sizeWhenDone) * 10000 ) / 100;

    return percentDone;
  }.property('sizeWhenDone', 'leftUntilDone')

}) ;
