/*
 * Copyright (C) 2012-2013 InSeven Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
 
(function($) {

  App.Store = function(name) {
    this.init(name);
  };
  
  App.Store.Property = {
    STATE: 0,
    GAME:  1
  };
  
  jQuery.extend(App.Store.prototype, {

    init: function(name) {
      var self = this;
      self.name = name;
      self.database = undefined;
      
      try {
        if (!window.openDatabase) {
          alert('Databases are not supported in this browser.');
        } else {
          self.database = openDatabase(self.name, '1.0', self.name, 50*1024*1024);
          self.createTables();
        }
      } catch(e) {
        if (e == 2) {
          // Version number mismatch.
          console.log("Invalid database version.");
        } else {
          console.log("Unknown error " + e + ".");
        }
      }

    },

    transaction: function(callback, description) {
      var self = this;
      self.database.transaction(callback, function(error) {
        console.log(description + ": Failed to access storage named '" + self.name + "' with error  '" + error.message + "' (" + error.code + ")");
      });
    },
    
    createTables: function() {
      var self = this;
      self.transaction(function(transaction) {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
                                "properties ( " +
                                  "id INTEGER PRIMARY KEY," +
                                  "domain TEXT NOT NULL," +
                                  "key TEXT NOT NULL," +
                                  "value TEXT NOT NULL" +
                                ")");
      }, "Creating database tables");
    },
    
    setProperty: function(domain, key, value) {
      var self = this;
      self.transaction(function(transaction) {
        transaction.executeSql(
          "INSERT OR REPLACE INTO properties (domain, key, value) VALUES ('" + domain + "', '" + key + "', '" + value + "')"
        );
      }, "Setting property '" + key + "'");
    },
    
    property: function(domain, key, callback) {
      var self = this;
      self.transaction(function(transaction) {
        transaction.executeSql(
          "SELECT * FROM properties WHERE domain = '" + domain + "' AND key = '" + key + "'",
          [],
          function(transaction, results) {
            if (results.rows.length > 0) {
              callback(results.rows.item(0).value);
            } else {
              callback(undefined);
            }
          },
          function(error) {
            callback(undefined);
          }
        );
      }, "Reading property '" + key + "'");
    },

    deleteProperty: function(domain, key) {
      var self = this;
      self.transaction(function(transaction) {
        transaction.executeSql(
          "DELETE FROM properties WHERE key = domain = '" + domain + "' AND '" + key + "'"
        );
      }, "Deleting property '" + key + "'");
    },

    propertiesForDomain: function(domain, callback) {
      var self = this;
      self.transaction(function(transaction) {
        transaction.executeSql(
          "SELECT * FROM properties WHERE domain = '" + domain + "'",
          [],
          function(transaction, results) {
            var properties = {};
            for (var i = 0; i < results.rows.length; i++) {
              var item = results.rows.item(i);
              properties[item.key] = item.value;
            }
            callback(properties);
          },
          function(transaction, error) {
            callback({});
          }
        );
      }, "Reading properties for domain '" + domain + "'");
    },

    keys: function(callback) {
      var self = this;
      self.transaction(function(transation) {
        transation.executeSql(
          "SELECT key FROM properties",
          [],
          function(transaction, results) {
            var rows = [];
            for (var i = 0; i < results.rows.length; i++) {
              rows.push(results.rows.item(i).key);
            }
            callback(rows);
          },
          function(transaction, error) {
            callback(undefined);
          }
        );
      });
    }

  });

})(jQuery);
