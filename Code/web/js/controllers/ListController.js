angular.module("myApp", ["ngTable", "ngTableDemos", "ngSanitize"]);

(function () {
    "use strict";

    angular.module("myApp").controller("simpleValueDemoController", simpleValueDemoController);

    simpleValueDemoController.$inject = ["NgTableParams", "ngTableSimpleList", "$interpolate", "$sce"];

    function simpleValueDemoController(NgTableParams, simpleList, $interpolate, $sce) {
        var self = this;

        self.cols = [{
            field: "name",
            title: "Name",
            show: true,
            getValue: htmlValue
        }, {
            field: "age",
            title: "Age",
            show: true,
            getValue: interpolatedValue,
            interpolateExpr: $interpolate("<em class='text-danger'>{{ user.age | number:1}}</em>")
        }, {
            field: "money",
            title: "Money",
            show: true,
            getValue: evaluatedValue,
            valueFormatter: "currency:'$'"
        }];
        self.tableParams = new NgTableParams({}, {
            dataset: simpleList
        });

        function htmlValue($scope, row) {
            var value = row[this.field];
            var html = "<a href='https://www.google.co.uk/search?q=" + value + "' target='_blank'><em>" + value + "</em></a>";
            return $sce.trustAsHtml(html);
        }

        function evaluatedValue($scope, row) {
            return $scope.$eval("user." + this.field + " | " + this.valueFormatter, {
                user: row
            });
        }

        function interpolatedValue($scope, row) {
            return this.interpolateExpr({
                user: row
            });
        }
    }
})();

(function () {
    "use strict";

    angular.module("myApp").controller("advancedValueDemoController", simpleValueDemoController);

    simpleValueDemoController.$inject = ["NgTableParams", "ngTableSimpleList"];

    function simpleValueDemoController(NgTableParams, simpleList) {
        var self = this;

        self.cols = [{
            field: "name",
            title: "Name",
            show: true,
            getValue: renderedInput,
            inputType: "text"
        }, {
            field: "age",
            title: "Age",
            show: true,
            getValue: renderedInput,
            inputType: "number"
        }, {
            field: "money",
            title: "Money",
            show: true,
            getValue: renderedInput,
            disabledExpr: "row.age > 40"
        }];
        self.tableParams = new NgTableParams({}, {
            dataset: simpleList
        });

        function renderedInput($scope, row) {
            return "<input type='" + this.inputType + "' class='form-control input-sm' ng-model='row[col.field]' ng-disabled='$eval(col.disabledExpr)'/>";
        }
    }
})();

(function () {
    "use strict";

    angular.module("myApp").directive("demoBindCompiledHtml", bindCompiledHtml);
    bindCompiledHtml.$inject = [];

    function bindCompiledHtml() {
        var directive = {
            restrict: "A",
            controller: bindCompiledHtmlController
        };
        return directive;
    }

    bindCompiledHtmlController.$inject = ["$scope", "$element", "$attrs", "$compile"];
    function bindCompiledHtmlController($scope, $element, $attrs, $compile) {
        $scope.$watch($attrs.demoBindCompiledHtml, compileHtml);

        function compileHtml(html) {
            debugger;
            var compiledElements = $compile(html)($scope);
            $element.append(compiledElements);
        }
    }
})();

(function () {
    "use strict";

    angular.module("myApp").run(configureDefaults);
    configureDefaults.$inject = ["ngTableDefaults"];

    function configureDefaults(ngTableDefaults) {
        ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];
    }
})();