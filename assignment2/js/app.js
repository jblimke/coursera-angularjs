(function () {
  'use strict';

  var initialToBuyItems = [
  {
    name: "Milk bottles",
    quantity: "10"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate Candies",
    quantity: "500"
  },
  {
    name: "Peanuts",
    quantity: "5000"
  },
  {
    name: "Cakes",
    quantity: "50"
  }
];

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyShoppingController", ToBuyShoppingController)
  .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var list = this;

    ShoppingListCheckOffService.setToBuyItems(initialToBuyItems);
    list.items = ShoppingListCheckOffService.getToBuyItems();

    list.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };

    list.isEmpty = function() {
      return ShoppingListCheckOffService.areToBuyItemsGone();
    };
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var list = this;
    list.items = ShoppingListCheckOffService.getBoughtItems();

    list.isEmpty = function() {
      return ShoppingListCheckOffService.areBoughtItemsGone();
    };    console.log("list: ", list);
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [];
    var boughtItems = [];


    service.buyItem = function(itemIndex) {
        var item = toBuyItems[itemIndex];
        boughtItems.push(item);
        toBuyItems.splice(itemIndex,1);
      };

    service.setToBuyItems = function(initialToBuyItems) {
      if(toBuyItems === undefined || toBuyItems.length == 0) {
          toBuyItems = initialToBuyItems;
      }
    };

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.areToBuyItemsGone = function() {
      return toBuyItems.length == 0;
    };

    service.areBoughtItemsGone = function() {
      return boughtItems.length == 0;
    };
}
})();
