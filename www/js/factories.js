angular.module('minhalista.factories',[])
.factory('DB', ['$q', '$cordovaSQLite', 'DB_CONFIG', function($q, $cordovaSQLite, DB_CONFIG) {

    var self = this;
    self.db = null;

    self.init = function() {

        self.db =  window.openDatabase(DB_CONFIG.name, '1', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
            var sql = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            //console.log(sql);
            console.log('Table ' + table.name + ' initialized');
            self.query(sql);
        });

        //query("INSERT INTO listas (id, descricao,dataInclusao) VALUES (?,?,?)", [1,'LISTA 1', '23/10/2015'])

        $cordovaSQLite.execute(self.db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (1,'LISTA 1', '23/10/2015')");
        $cordovaSQLite.execute(self.db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (2,'LISTA 2', '23/10/2015')");
        $cordovaSQLite.execute(self.db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (3,'LISTA 3', '23/10/2015')");
        $cordovaSQLite.execute(self.db, "INSERT INTO listas (id, descricao,dataInclusao) VALUES (4,'LISTA 4', '23/10/2015')");

    };

    self.query = function(sql, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        return $cordovaSQLite.execute(self.db, sql, bindings);
    };

    self.fetchAll = function (query, parameters) {
      var deferred = $q.defer();
      parameters = typeof parameters !== 'undefined' ? parameters : [];
      self.executeSql(query, parameters).then(function (res) {
          var items = [];
          for (var i = 0; i < res.rows.length; i++) {
              items.push(res.rows.item(i));
          }
          return deferred.resolve(items);
      }, function (err) {
          return deferred.reject(err);
      });

      return deferred.promise;
    };

    /*self.fetch = function(result) {
        return result.rows.item(0);
    };*/

    self.executeSql = function (query, parameters) {
      //console.log(self.db);
        return $cordovaSQLite.execute(self.db, query, parameters);
    };

    return self;
}])

.factory('Listas',['$q','DB', function($q, DB){

  var self = this;

  self.all = function() {
    var sql = "select * from listas";
    //console.log(DB);
    return $q.when(DB.fetchAll(sql))
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

  return self;
}])
