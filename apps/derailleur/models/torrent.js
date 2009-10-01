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
sc_require('helpers/math');

Derailleur.Torrent = SC.Record.extend(
/** @scope Derailleur.Torrent.prototype */ {
  primaryKey: 'id',
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
  }.property('sizeWhenDone', 'leftUntilDone').cacheable(),

  progressDetails: function(){
    var sizeWhenDone, leftUntilDone, percentDone, formattedSizeDownloaded, formattedSizeWhenDone, progressString;

    sizeWhenDone = this.get('sizeWhenDone');
    leftUntilDone = this.get('leftUntilDone');

    formattedSizeDownloaded = Math.formatBytes(sizeWhenDone - leftUntilDone);
    formattedSizeWhenDone = Math.formatBytes(sizeWhenDone)

    progressString = ("%@ " +  "_of".loc() + " %@ (%@%)").fmt(formattedSizeDownloaded, formattedSizeWhenDone, this.get('percentDone'));

    return progressString;
  }.property('sizeWhenDone', 'leftUntilDone').cacheable(),

  isActive: function(){
    return (this.get('status') & (Derailleur.Torrent.STATUS_DOWNLOADING | Derailleur.Torrent.STATUS_SEEDING)) > 0;
  }.property('status').cacheable(),

  statusString: function(){
    var status = this.get('status');

    switch( status ) {
      case Derailleur.Torrent.STATUS_WAITING_TO_CHECK : return 'Waiting to verify';
      case Derailleur.Torrent.STATUS_CHECKING :         return 'Verifying local data';
      case Derailleur.Torrent.STATUS_DOWNLOADING:       return 'Downloading';
      case Derailleur.Torrent.STATUS_SEEDING:           return 'Seeding';
      case Derailleur.Torrent.STATUS_PAUSED :           return 'Paused';
      default:                                          return 'error';
    }
  }.property('status').cacheable()
});

Derailleur.Torrent.STATUS_WAITING_TO_CHECK  = 1;
Derailleur.Torrent.STATUS_CHECKING          = 2;
Derailleur.Torrent.STATUS_DOWNLOADING       = 4;
Derailleur.Torrent.STATUS_SEEDING           = 8;
Derailleur.Torrent.STATUS_PAUSED            = 16;
