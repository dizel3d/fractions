describe('mathService', function() {
    beforeEach(module('app'));

    var mathService;

    beforeEach(inject(function(_mathService_) {
        mathService = _mathService_;
    }));

    it('gcd', function() {
        expect(mathService.gcd(4, 2)).toBe(2);
        expect(mathService.gcd(2, 3)).toBe(1);
    });

    it('reduce', function() {
        expect(mathService.reduce({x: 3, y: 15})).toEqual({x: 1, y: 5});
        expect(mathService.reduce({x: 6, y: 2})).toEqual({x: 3, y: 1});
    });

    it('add', function() {
        expect(mathService.add({x: 3, y: 2}, {x: 2, y: 3})).toEqual({x: 13, y: 6});
        expect(mathService.add({x: 1, y: 4}, {x: 1, y: 4})).toEqual({x: 1, y: 2});
    });

    it('sub', function() {
        expect(mathService.sub({x: 3, y: 4}, {x: 1, y: 4})).toEqual({x: 1, y: 2});
    });

    it('div', function() {
        expect(mathService.div({x: 1, y: 2}, {x: 1, y: 4})).toEqual({x: 2, y: 1});
    });

    it('mul', function() {
        expect(mathService.mul({x: 1, y: 2}, {x: 2, y: 3})).toEqual({x: 1, y: 3});
    });

    it('calc', function() {
        expect(mathService.calc([{x: 1, y: 4}, {oper: '+', x: 1, y: 2}, {oper: '*', x: 1, y: 2}])).toEqual({x: 1, y: 2});
        expect(mathService.calc([{x: 1, y: 4}, {oper: '-', x: 1, y: 2}, {oper: '/', x: 1, y: 2}])).toEqual({x: -3, y: 4});
        expect(mathService.calc([{x: 1, y: 4}, {oper: '/', x: 1, y: 2}, {oper: '-', x: 1, y: 2}])).toEqual({x: 0, y: 1});
        expect(mathService.calc([{x: 1, y: 4}, {oper: '*', x: 1, y: 2}, {oper: '/', x: 1, y: 2}])).toEqual({x: 1, y: 4});
    });

    it('calc with bad arguments', function() {
        expect(mathService.calc([{x: 1, y: undefined}, {oper: '+', x: 1, y: 2}])).toEqual({x: NaN, y: NaN});
    });

    it('minus test', function() {
        expect(mathService.add({x: 1, y: 2}, {x: 2, y: -2})).toEqual({x: -1, y: 2});
    })
});
