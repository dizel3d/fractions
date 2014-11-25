(function() {'use strict';
    var app = angular.module('app', []);

    // Provides fraction math functions
    app.factory('mathService', function() {
        return {
            // Reverse Polish Notation implementation for fractions
            calc: function (arr) {
                var fStack = [arr[0]];
                var oStack = [];

                // mul, div
                angular.forEach(arr.slice(1), function(f) {
                    if (f.oper === '*') {
                        fStack.push(this.mul(fStack.pop(), f));
                    } else if (f.oper === '/') {
                        fStack.push(this.div(fStack.pop(), f));
                    } else {
                        oStack.push(f.oper);
                        fStack.push(f);
                    }
                }, this);

                // add, sub
                while (oStack.length) {
                    var oper = oStack.pop();
                    var f = fStack.pop();
                    if (oper == '+') {
                        fStack.push(this.add(fStack.pop(), f));
                    } else if (oper == '-') {
                        fStack.push(this.sub(fStack.pop(), f));
                    } else {
                        return {x: NaN, y: NaN};
                    }
                }

                return fStack.pop();
            },

            add: function (f1, f2) {
                return this.reduce({
                    x: f1.x * f2.y + f2.x * f1.y,
                    y: f1.y * f2.y
                });
            },

            sub: function (f1, f2) {
                return this.reduce({
                    x: f1.x * f2.y - f2.x * f1.y,
                    y: f1.y * f2.y
                });
            },

            div: function (f1, f2) {
                return this.reduce({
                    x: f1.x * f2.y,
                    y: f1.y * f2.x
                });
            },

            mul: function (f1, f2) {
                return this.reduce({
                    x: f1.x * f2.x,
                    y: f1.y * f2.y
                });
            },

            reduce: function(f) {
                var d = this.gcd(f.x, f.y);
                var result = {
                    x: f.x / d,
                    y: f.y / d
                };
                var sign = result.y / Math.abs(result.y);
                return {
                    x: result.x * sign,
                    y: result.y * sign
                }
            },

            // Returns greatest common divisor
            gcd: function(a, b) {
                if (b) {
                    return this.gcd(b, a % b);
                } else {
                    return Math.abs(a);
                }
            }
        };
    });

    app.controller('EquationCtrl', ['$scope', 'mathService', '$location', function($scope, mathService, $location) {
        var equation = [{},{}, {}];
        try { equation = angular.fromJson($location.search()['equation']) || equation; } catch(e) { }

        angular.extend($scope, {
            equation: equation,
            insertFraction: function(index) {
                this.equation.splice(index, 0, {});
            },
            removeFraction: function(index) {
                this.canRemoveFraction() && this.equation.splice(index, 1);
            },
            canRemoveFraction: function() {
                return this.equation.length > 3;
            }
        });

        $scope.$watch(function() {
            $location.search('equation', angular.toJson($scope.equation));
            var result = mathService.calc($scope.equation.slice(0, $scope.equation.length - 1));
            angular.extend($scope.equation[$scope.equation.length - 1], result);
        });
    }]);

    app.directive('numberInput', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var regex = new RegExp(attrs['numberInput']);

                ngModel.$validators.number = function(modelValue, viewValue) {
                    return regex.test(viewValue);
                };
                ngModel.$parsers.unshift(function(viewValue) {
                    return parseInt(viewValue);
                });
                ngModel.$formatters.push(function(viewValue) {
                    return angular.isNumber(viewValue) ? viewValue.toString() : viewValue;
                });
                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || '');
                };

                element.attr('contenteditable', '').bind('blur input keyup change', function() {
                    // HACK IE contenteditable fix
                    element.text(element.text());

                    scope.$apply(function() {
                        ngModel.$setViewValue(element.text());
                    });
                });
            }
        };
    });
})();