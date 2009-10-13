// ==========================================================================
// Project:   Derailleur - mainPage
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================
/*globals Derailleur */

// This page describes the main user interface for your application.
Derailleur.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'toolbar torrentList bottombar'.w(),

    toolbar: SC.ToolbarView.design({
      layout: { top: 0, left: 0, right: 0, height: 36 },
      anchorLocation: SC.ANCHOR_TOP
    }),

    torrentList: SC.ScrollView.design({
      hasHorizontalScroller: NO,
      layout: { top: 36, bottom: 20, left: 0, right: 0 },
      backgroundColor: 'white',

      contentView: SC.ListView.design({
        contentBinding: 'Derailleur.torrentsController.arrangedObjects',
        selectionBinding: 'Derailleur.torrentsController.selection',

        exampleView: Derailleur.TorrentListItemView,
        rowHeight: 70
      })
    }),

    bottombar: SC.ToolbarView.design({
      layout: { bottom: 0, left: 0, right: 0, height: 20 },
      anchorLocation: SC.ANCHOR_BOTTOM
    })
  })

});
