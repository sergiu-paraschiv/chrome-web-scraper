describe('Multiplication', function() {
    it('shout multiply two numbers ', function() {
        var a = 2;
        var b = 3;
        var m = mul(a, b);
        
        expect(m).toEqual(6);
    });
});