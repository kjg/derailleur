// ==========================================================================
// Project:   Derailleur
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */


Derailleur.Remote = SC.Object.create({
  _session_id: "",

	getInitialDataFor: function(torrent_ids, store, success, failure) {
		var payload = {
			method: 'torrent-get',
			arguments: {
		    fields: ['id', 'name', 'status', 'totalSize', 'sizeWhenDone', 'haveValid', 'leftUntilDone', 'eta', 'uploadedEver', 'uploadRatio']
			}
		};

		if(torrent_ids) payload.arguments.ids = torrent_ids;

    request = SC.Request.postUrl('/transmission/rpc', payload)
      .set('isJSON', YES)
      .notify(409, this, this.updateSessionId, failure)
      .notify(this, this.didFetchTorrents, store, success, failure);

    if(this._session_id.length > 0){
      request.header('X-Transmission-Session-Id', this._session_id);
    }

    request.send();
	},

  didFetchTorrents: function(response, store, success, failure){
    var storeKeys = [], existingKeys = [], noLongerExistingKeys = [], response;

    if(!SC.$ok(response) ){
      return this.requestDidError(response, failure);
    }
    else
    {
      storeKeys = store.loadRecords(Derailleur.Torrent, response.get('body').arguments.torrents);
      existingKeys = store.storeKeysFor(Derailleur.Torrent);
      if(!storeKeys.isEqual(existingKeys)) this.handleRemotelyRemoved(store, existingKeys, storeKeys);
      if(typeof success == "function") success();
    }
    return YES;
  },

  updateSessionId: function(response, failure){
    var xhr_request, session_id;

    xhr_request = response.rawRequest;
    session_id = xhr_request.getResponseHeader('X-Transmission-Session-Id');

    if(session_id.length > 0)
    {
      this.session_id = session_id;
      response.request.header('X-Transmission-Session-Id', session_id);
      response.request.send();
      return YES;
    }
    else{
      this.requestDidError(response, failure);
      return NO;
    }
  },

  requestDidError: function(response, failure){
    SC.AlertPane.error("RPC Connection Failure", response.responseText, '', "Dang");
    if(typeof failure == "function") failure(response);
  },

  handleRemotelyRemoved: function(store, existingKeys, freshKeys){
    existingKeys.forEach(function(value){
      if( freshKeys.indexOf(value) === -1 ) store.pushDestroy(null, null, value);
    });
  }

})
