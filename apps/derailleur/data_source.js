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
    'arguments': {'fields':['id', 'name', 'status', 'totalSize', 'sizeWhenDone', 'haveValid', 'leftUntilDone', 'eta']}
  },

  fetch: function(store, query){
    var ret = [], request;
    if(query.recordType === Derailleur.Torrent){
      request = SC.Request.postUrl('/transmission/rpc', SC.json.encode(this.torrent_request))
        .set('isJSON', YES)
        .notify(this, this.didFetchTorrents, { store: store, query: query, storeKeyArray:ret});

      if(this.session_id.length > 0){
        request.header('X-Transmission-Session-Id', this.session_id);
      }

      request.send();

    }
    else{
      SC.AlertPane.error("Could not fetch data", "Don't know how to fetch: " + query.recordType.toString(), '', "Dang");
    }

    return ret;
  },

  didFetchTorrents: function(request, params){
    var storeKeys = [], existingKeys = [], noLongerExistingKeys = [], response;
    response = request.response();

    if(response.kindOf ? response.kindOf(SC.Error) : false) {
      return this.requestDidError(request);
    }
    else
    {
      storeKeys = params.store.loadRecords(Derailleur.Torrent, response.arguments.torrents);
      existingKeys = Derailleur.store.storeKeysFor(Derailleur.Torrent);
      if(!storeKeys.isEqual(existingKeys)) this.handleRemotelyRemoved(existingKeys, storeKeys);

      params.storeKeyArray.replace(0,0,storeKeys);
    }
    return YES;
  },

  requestDidError: function(request){
    var response, session_id;

    response = request.response();
    session_id = response.request.getResponseHeader('X-Transmission-Session-Id');

    if(response.request.status === 409 && session_id.length > 0)
    {
      this.session_id = session_id;
      request.header('X-Transmission-Session-Id', session_id);
      request.send();
    }
    else
    {
      SC.AlertPane.error("RPC Connection Failure", response.request.responseText, '', "Dang");
    }
    return NO;
  },

  handleRemotelyRemoved: function(existingKeys, freshKeys){
    existingKeys.forEach(function(value){
      if( freshKeys.indexOf(value) === -1 ) Derailleur.store.pushDestroy(null, null, value);
    });
  }
});

