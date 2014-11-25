(function() {'use strict';
    function Fraction(x, y, oper) {
        angular.extend(this, {x: x, y: y, oper: oper});
    }

    var app = angular.module('app', ['ngAnimate']);

    app.controller('EquationCtrl', ['$scope', function($scope) {
        angular.extend($scope, {
            equation: [
                new Fraction(1, 2),
                new Fraction(2, 3, '+'),
                new Fraction(2, 3, '=')
            ]
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
                ngModel.$formatters.shift(function(viewValue) {
                    return parseInt(viewValue);
                });
                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || '');
                };

                element.attr('contenteditable', '').bind('blur input keyup change', function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(element.text());
                    });
                });
            }
        };
    });
})();