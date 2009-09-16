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

  childViews: 'progressBar'.w(),

  progressBar: SC.ProgressView.extend(SC.ContentDisplay,{
     layout: { value: 3, minimum: 0, maximum: 100, isIndeterminate: NO, left: 5, right: 5, top: 20, height: 8 },
     isRunning: YES,
     valueBinding: '.owner*content.percentDone'
  }),

  render: function(context, firstTime) {

    var content = this.get('content');
    var name = content.get('name');
    var isSelected = this.get('isSelected');

    var selected = isSelected;
    var cycle = this.get('contentIndex') % 2 === 0 ? 'even' : 'odd'

    var classes = { 'sel': selected };

    context = context.addClass(cycle).setClass(classes).begin('label').push(name).end();

    this.renderChildViews(context, YES);

    context = context.begin('p').push(content.get('percentDone')).end();
  }

});
