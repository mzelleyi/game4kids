var POINTSDB = null;

function errorHandler(transaction, error){
  if (error.code==1){
    // DB Table already exists
  } else {
    // Error is a human-readable string.
    console.log('Oops.  Error was '+ error.message + ' (Code '+error.code+')');
  }
  return false;
}


function nullDataHandler(){
  console.log("SQL Query Succeeded");
}

function createTables() {
  POINTSDB.transaction(function(transaction) {
    var table = "";
    table += "CREATE TABLE IF NOT EXISTS memo_players(";
    table += "        id     INTEGER NOT NULL PRIMARY KEY,";
    table += "        points INTEGER NOT NULL,";
    table += "        win_on DATETIME";
    table += ");";
    transaction.executeSql(table, [], nullDataHandler, errorHandler);
  });
}

function selectAll() {
  POINTSDB.transaction(function(transaction) {
    transaction.executeSql("SELECT * FROM memo_players", [], dataSelectHandler, errorHandler);
  });
}

function getPosition(id, renderPosition) {
  /* posible problema por renderPosition y la clausura,
   * al no usar funcion anonima en el dataPositionHandler
   */
  POINTSDB.transaction(function(transaction) {
    transaction.executeSql("SELECT * FROM memo_players ORDER BY points DESC",
      [], 
      function (tx, results) {
        var i=0, length = 0;
        for (i=0, length=results.rows.length; i<length; i++) {
          if (results.rows.item(i).id === id) {
            renderPosition(i+1, length);
            return;
          }
        }
      }

    );
  });
}


function dataSelectHandler(transaction, results) {
  var i = 0, length = 0;

  //handle results
  for (i=0, length=results.rows.length; i<length; i++) {
    console.log(results.rows.item(i));
  }
}

function insertElement(points, renderPosition) {
  POINTSDB.transaction(function(transaction) {
    var winOn = new Date();
    transaction.executeSql(
      "INSERT INTO memo_players (points, win_on) VALUES (?,?)", 
      [points, winOn],
      function (transaction2, resultSet) {
        id = resultSet.insertId;
        console.log("este es el id a buscar: " + id);
        getPosition(id, renderPosition );
     }, 
      errorHandler
    );
  });
}


function initDatabase() {
  try {
    if (!window.openDatabase) {
      alert("Databases are not supported in this browser.");
    } else{
      var shortName = 'POINTSDB';
      var version  = '1.0';
      var displayName = 'Players Points Database';
      var maxSize = 100000; // bytes
      POINTSDB = openDatabase(shortName, version, displayName, maxSize);
      createTables();
      selectAll();
    }
  } catch (e) {
    if (e == 2) {
      console.log ("Invalid database version.");
    } else {
      console.log ("Unknown error " + e + ".");
    }
    return;
  }
}
