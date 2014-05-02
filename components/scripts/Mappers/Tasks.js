(function(undefined) {
    'use strict';
    
    var Task = this.Models.Task;
    
    function Mapper() {
        function mapOne(data) {
            var task = new Task();
            
            task.id = data.id;
            task.name = data.name;

            return task;
        }
                
        function map(data) {
            return _.map(data, mapOne);
        }

        return {
            mapOne: mapOne,
            map: map
        };
    }
    
    this.extend('Mappers.Tasks', Mapper);

}).call(this.scrap);