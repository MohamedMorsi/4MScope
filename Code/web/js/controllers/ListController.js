angular.module('enozomApp').controller('ListController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {

    $scope.models = {
        changeInfo: [],
        searchText: '',
        carsForSale: [
          {
              id: 1,
              name: 'Audi A4',
              modelYear: 2009,
              price: 34000
          },
          {
              id: 2,
              name: 'BMW 328i',
              modelYear: 2012,
              price: 39000
          },
          {
              id: 3,
              name: 'Audi A6',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 4,
              name: 'Audi S8',
              modelYear: 2014,
              price: 100000
          },
          {
              id: 5,
              name: 'Audi A4',
              modelYear: 2009,
              price: 34000
          },
          {
              id: 6,
              name: 'BMW 328i',
              modelYear: 2012,
              price: 39000
          },
          {
              id: 7,
              name: 'Audi A6',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 8,
              name: 'Audi S8',
              modelYear: 2014,
              price: 100000
          },
          {
              id: 9,
              name: 'Audi A6',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 10,
              name: 'Audi S8',
              modelYear: 2014,
              price: 100000
          },
          {
              id: 11,
              name: 'Audi A6',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 12,
              name: 'Audi S8',
              modelYear: 2014,
              price: 100000
          }
        ]
    };

    $scope.carsTableColumnDefinition = [
      {
          columnHeaderDisplayName: 'Model',
          displayProperty: 'name',
          sortKey: 'name'
      },
      {
          columnHeaderTemplate: '<span><i class="glyphicon glyphicon-calendar"></i> Model Year</span>',
          template: '<strong>{{ item.modelYear }}</strong>',
          sortKey: 'modelYear'
      },
      {
          columnHeaderTemplateUrl: 'tpl/grid_tpl/priceHeader.html',
          displayProperty: 'price',
          sortKey: 'price'
      },
      {
          columnHeaderDisplayName: 'Buy',
          templateUrl: 'tpl/grid_tpl/buyCell.html'
      }
    ];


    // ========== ui handlers ========== //
    $scope.buyCar = function (car) {
        alert(car.name);
    };


}]);