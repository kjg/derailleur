# ===========================================================================
# Project:   Derailleur
# Copyright: ©2009 Kevin Glowacz
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore, :load_fixtures  => true, :url_prefix => '/transmission/web', :overwrite_current => true
proxy '/transmission/rpc', :to => 'localhost:9091'
