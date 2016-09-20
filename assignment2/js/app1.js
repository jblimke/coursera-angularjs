(function () {
  'use strict';

  var shoppingList2 = [
  {
    name: "Milk bottles",
    quantity: "10",
    brought; false
  },
  {
    name: "Donuts",
    quantity: "200",
    brought; false
  },
  {
    name: "Cookies",
    quantity: "300",
    brought; false
  },
  {
    name: "Chocolate Candies",
    quantity: "500",
    brought; false
  },
  {
    name: "Peanuts",
    quantity: "5000",
    brought; false
  },
  {
    name: "Cakes",
    quantity: "50",
    brought; false
  }
];

  angular.module("ShoppingListCheckOffApp", [])
  .controller("ItemsBoughtController", ItemsBoughtController).
  .controller("ItemsAlreadyBoughtController", ItemsAlreadyBoughtController)
  .service('ShoppingListService', ShoppingListService);
  
  ItemsBoughtController.$inject = ['$scope'];
  function ItemsBoughtController($scope) {
    $scope.shoppingList1 = shoppingList1;
    $scope.shoppingList2 = shoppingList2;

    $scope.addToList = function() {
      var newItem = {
        name: $scope.newItemName,
        quantity: $scope.newItemQuantity
      };

      $scope.shoppingList2.push(newItem);
    };
  };
})();
