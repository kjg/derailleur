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
    var ret = [], request;
    if(query.recordType === Derailleur.Torrent){
      request = SC.Request.postUrl('/transmission/rpc', this.torrent_request)
        .set('isJSON', YES)
        .notify(this, this.didFetchTorrents, store, query);

      if(this.session_id.length > 0){
        request.header('X-Transmission-Session-Id', this.session_id);
      }

      request.send();

    }
    else{
      SC.AlertPane.error("Could not fetch data", "Don't know how to fetch: " + query.recordType.toString(), '', "Dang");
    }

    return YES;
  },

  didFetchTorrents: function(response, store, query){
    var storeKeys = [], existingKeys = [], noLongerExistingKeys = [], response;

    if(!SC.$ok(response) ){
      return this.requestDidError(store, query, response);
    }
    else
    {
      storeKeys = store.loadRecords(Derailleur.Torrent, response.get('body').arguments.torrents);
      existingKeys = Derailleur.store.storeKeysFor(Derailleur.Torrent);
      if(!storeKeys.isEqual(existingKeys)) this.handleRemotelyRemoved(existingKeys, storeKeys);
      store.dataSourceDidFetchQuery(query);

    }
    return YES;
  },

  requestDidError: function(store, query, response){
    var XHRRequest, session_id;

    XHRRequest = response.rawRequest;
    session_id = XHRRequest.getResponseHeader('X-Transmission-Session-Id');

    if(response.status === 409 && session_id.length > 0)
    {
      this.session_id = session_id;
      response.request.header('X-Transmission-Session-Id', session_id);
      response.request.send();
    }
    else
    {
      store.dataSourceDidErrorQuery(query, response);
      SC.AlertPane.error("RPC Connection Failure", response.responseText, '', "Dang");
    }
    return NO;
  },

  handleRemotelyRemoved: function(existingKeys, freshKeys){
    existingKeys.forEach(function(value){
      if( freshKeys.indexOf(value) === -1 ) Derailleur.store.pushDestroy(null, null, value);
    });
  }
});

