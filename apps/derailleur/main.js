// ==========================================================================
// Project:   Derailleur
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Derailleur.main = function main() {
  // switch to fixtures if #fixtures in URL
  if (window.location.hash.toString().match('fixtures')) {
    Derailleur.store.from(SC.Record.fixtures);
  }

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Derailleur.getPath('mainPage.mainPane').append() ;

  var torrents = Derailleur.store.find(Derailleur.Torrent);
  Derailleur.torrentsController.set('content', torrents);
  //Derailleur.torrentsController.set('isRefreshing', YES);

} ;

function main() { Derailleur.main(); }
