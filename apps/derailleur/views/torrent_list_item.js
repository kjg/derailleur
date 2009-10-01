// ==========================================================================
// Project:   Derailleur.TorrentListItemView
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Derailleur.TorrentListItemView = SC.View.extend(SC.ContentDisplay,
/** @scope Derailleur.TorrentListItemView.prototype */ {
  classNames: [ 'torrent-item' ],

  displayProperties: 'isSelected'.w(),
  contentDisplayProperties: 'name percentDone'.w(),

  childViews: 'name details progressBar status'.w(),

  name: SC.LabelView.extend(SC.ContentDisplay,{
    classNames: [ 'name' ],
    layout: { left: 10, right: 10, top: 3, height: 20 },
    fontWeight: SC.BOLD_WEIGHT,
    valueBinding: '.owner*content.name'
  }),

  details: SC.LabelView.extend(SC.ContentDisplay,{
    classNames: [ 'details' ],
    layout: { left: 10, right: 10, top: 20, height: 19 },
    controlSize: SC.SMALL_CONTROL_SIZE,
    valueBinding: '.owner*content.progressDetails'
  }),

  progressBar: SC.ProgressView.extend(SC.ContentDisplay,{
    layout: { left: 10, right: 10, top: 37, height: 10 },
    isRunning: YES,
    minimum: 0,
    maximum: 100,
    isIndeterminate: NO,
    isEnabled: YES,
    valueBinding: '.owner*content.percentDone'
  }),

  status: SC.LabelView.extend(SC.ContentDisplay,{
    classNames: [ 'status' ],
    layout: { left: 10, right: 10, top: 49, height: 19 },
    controlSize: SC.SMALL_CONTROL_SIZE,
    valueBinding: '.owner*content.statusString'
  }),

  render: function(context, firstTime) {
    var cycle = this.get('contentIndex') % 2 === 0 ? 'even' : 'odd'

    var classes = { 'sel': this.get('isSelected') };

    context = context.addClass(cycle).setClass(classes);

    sc_super();
  }

});
