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
  eta: SC.Record.attr(Number),

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

  etaString: function(){
    var eta = this.get('eta');

    if(eta < 0) return "_remaining time unknown".loc();

    return Math.formatSeconds(eta) + ' ' + '_remaining'.loc();

  }.property('eta').cacheable(),

  isActive: function(){
    return (this.get('status') & (Derailleur.Torrent.STATUS_DOWNLOADING | Derailleur.Torrent.STATUS_SEEDING)) > 0;
  }.property('status').cacheable(),

  isDoneDownloading: function(){
    var status = this.get('status'), leftUntilDone = this.get('leftUntilDone');
    if(status === Derailleur.Torrent.STATUS_SEEDING) return true;
    if(leftUntilDone === 0) return true;
    return false;
  }.property('status', 'leftUntilDone').cacheable(),

  statusString: function(){
    var status = this.get('status');

    switch( status ) {
      case Derailleur.Torrent.STATUS_WAITING_TO_CHECK : return '_Waiting to verify'.loc();
      case Derailleur.Torrent.STATUS_CHECKING :         return '_Verifying local data'.loc();
      case Derailleur.Torrent.STATUS_DOWNLOADING:       return '_Downloading'.loc();
      case Derailleur.Torrent.STATUS_SEEDING:           return '_Seeding'.loc();
      case Derailleur.Torrent.STATUS_PAUSED :           return '_Paused'.loc();
      default:                                          return '_error'.loc();
    }
  }.property('status').cacheable()
});

Derailleur.Torrent.STATUS_WAITING_TO_CHECK  = 1;
Derailleur.Torrent.STATUS_CHECKING          = 2;
Derailleur.Torrent.STATUS_DOWNLOADING       = 4;
Derailleur.Torrent.STATUS_SEEDING           = 8;
Derailleur.Torrent.STATUS_PAUSED            = 16;
