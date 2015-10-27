angular.module('minhalista.factories',[])
.factory('DB', ['$q', '$cordovaSQLite', 'DB_CONFIG', function($q, $cordovaSQLite, DB_CONFIG) {

    var db = null;

    var init = function() {

        db =  window.openDatabase(DB_CONFIG.name, '1', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
            var sql = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            //console.log(sql);
            console.log('Table ' + table.name + ' initialized');
            query(sql);
        });

        //query("INSERT INTO listas (id, descricao,dataInclusao) VALUES (?,?,?)", [1,'LISTA 1', '23/10/2015'])

        /*$cordovaSQLite.execute(db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (1,'LISTA 1', '23/10/2015')");
        $cordovaSQLite.execute(db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (2,'LISTA 2', '23/10/2015')");
        $cordovaSQLite.execute(db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (3,'LISTA 3', '23/10/2015')");
        $cordovaSQLite.execute(db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (4,'LISTA 4', '23/10/2015')");*/

    };

    var query = function(sql, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        return $cordovaSQLite.execute(db, sql, bindings);
    };

    var fetchAll = function(result) {
        var output = [];
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    };

    var fetch = function(result) {
        return result.rows.item(0);
    };

    return {
        init: init,
        query: query,
        fetchAll: fetchAll,
        fetch: fetch
    };
}])

.factory('Listas',['$q', function(DB){

  var self = this;

  self.all = function() {
    var out = [];
    return DB.query("select * from listas")
             .then(function(result){
                      return DB.fetchAll(result);
                    },
                   function(error){
                      throw error;
                   });
   //console.log(out);
  }

  /*
  self.get = function(memberId) {
   var parameters = [memberId];
   return DBA.query("SELECT id, name FROM team WHERE id = (?)", parameters)
     .then(function(result) {
       return DBA.getById(result);
     });

     self.add = function(member) {
    var parameters = [member.id, member.name];
    return DBA.query("INSERT INTO team (id, name) VALUES (?,?)", parameters);
  }

  self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("DELETE FROM team WHERE id = (?)", parameters);
  }

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE team SET id = (?), name = (?) WHERE id = (?)", parameters);
  }
 }*/

  return self
})
