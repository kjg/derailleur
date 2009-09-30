// ==========================================================================
// Project:   Derailleur.torrentsController
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Derailleur.torrentsController = SC.ArrayController.create(
/** @scope Derailleur.torrentsController.prototype */ {

  isRefreshing: NO,

  isRefreshingObserver: function(){
    var isRefreshing = this.get('isRefreshing'), content = this.get('content');
    if (!this._timer){
      this._timer = SC.Timer.schedule({
        target: content,
        action: 'refresh',
        repeats: YES,
        interval: 1000
      });
    }

    this._timer.set('isPaused', !isRefreshing);
  }.observes('isRefreshing')
}) ;
