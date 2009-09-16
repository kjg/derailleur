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

  displayProperties: 'isSelected'.w(),
  contentDisplayProperties: 'name percentDone'.w(),

  childViews: 'name summary progressBar status'.w(),

  name: SC.LabelView.extend(SC.ContentDisplay,{
    layout: { left: 10, right: 10, top: 3, height: 20 },
    valueBinding: '.owner*content.name'
  }),

  summary: SC.LabelView.extend(SC.ContentDisplay,{
    layout: { left: 10, right: 10, top: 20, height: 19 },
    value: 'summary'
  }),

  progressBar: SC.ProgressView.extend(SC.ContentDisplay,{
    layout: { left: 10, right: 10, top: 41, height: 10 },
    isRunning: YES,
    minimum: 0,
    maximum: 100,
    isIndeterminate: NO,
    isEnabled: YES,
    valueBinding: '.owner*content.percentDone'
  }),

  status: SC.LabelView.extend(SC.ContentDisplay,{
    layout: { left: 10, right: 10, top: 51, height: 19 },
    value: 'status'
  }),

  render: function(context, firstTime) {
    var cycle = this.get('contentIndex') % 2 === 0 ? 'even' : 'odd'

    var classes = { 'sel': this.get('isSelected') };

    context = context.addClass(cycle).setClass(classes);

    this.renderChildViews(context, YES);
  }

});
