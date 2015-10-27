angular.module('minhalista.constants',[])
.constant('DB_CONFIG', {
    name: 'minhalista.db',
    tables: [
        {
            name: 'listas',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'descricao', type: 'text'},
                {name: 'dataInclusao', type: 'date'}
            ]
        },
        {
            name: 'itensLista',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'listaid', type: 'integer'},
                {name: 'descricao', type: 'text'},
                {name: 'quantidade', type: 'integer'},
                {name: 'preco', type: 'number'},
                {name: 'dataInclusao', type: 'date'},
                {name: 'foreign key(listaid) references listas(id)', type: ''}
            ]
        }
    ]
});
