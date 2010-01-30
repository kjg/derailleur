// ==========================================================================
// Project:   Derailleur
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

Derailleur.DataSource = SC.DataSource.extend({
  // code goes here...
  session_id : "",
  torrent_request: {
    'method': 'torrent-get',
    'arguments': {'fields':['id', 'name', 'status', 'totalSize', 'sizeWhenDone', 'haveValid', 'leftUntilDone', 'eta', 'uploadedEver', 'uploadRatio']}
  },

  fetch: function(store, query){
    Derailleur.Remote.getInitialDataFor(null, store, function(){ store.dataSourceDidFetchQuery(query); }, function(response){ store.dataSourceDidErrorQuery(query, response); });
  }
});

