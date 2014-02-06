(function(undefined) {
    'use strict';
    
    var Multiply = scrap.utils.math.Multiply;
    
    describe('Multiplication', function() {

        it('should multiply two numbers ', function() {
            var a = 2;
            var b = 3;
            var m = Multiply(a, b);
            
            expect(m).toEqual(6);
        });
    });

}).call(this);
