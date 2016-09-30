(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItems)
.constant('MenuItemBasePath', "https://davids-restaurant.herokuapp.com");

function foundItems() {
  var ddo = {
    templateUrl: 'loader/menuItemList.html',
    scope: {
      found: '<',
      myTitle: '@',
      badRemove: '=',
      onRemove: '&',
      onSearchterm: '<',
      onNothingfound: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.menuItemsInList = function() {
      if(list.onNothingfound) {
        if(list.onSearchterm) {
          return true;
        } else {
          if(list.found === undefined || list.found.length == 0) {
            return true;
          }
        }
      } else {
        return false;
      }
      return false;
  };
}

NarrowItDownController.$inject = ['$timeout', 'MenuSearchService'];
function NarrowItDownController($timeout, MenuSearchService) {
  var list = this;
  var foundItems = MenuSearchService;

  list.collectMenuItems = function() {
    list.emptySearchTerm = isSearchTermEmpty(list.searchTerm);
    var found = foundItems.getMatchedMenuItems(list.searchTerm);
    found.then(function(menuItems) {
      list.found = menuItems;
    });
    $timeout(function() {
      list.showNothingFound = true;
    }, 2000)
  };

  list.title = showMenuTitle();
  list.emptySearchTerm = !isSearchTermEmpty(list.searchTerm);
  list.showNothingFound = false;

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
    list.emptySearchTerm = isSearchTermEmpty(list.searchTerm);
    list.showNothingFound = false;
  };
}

MenuSearchService.$inject = ['$http', 'MenuItemBasePath']
function MenuSearchService($http, MenuItemBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (MenuItemBasePath + "/menu_items.json")
    }).then(function(response) {
       var menuItems = response.data;
       var foundItems = [];

       var noOfMenuItems = menuItems.menu_items.length;
       for(var menuItemIndex = 0;  menuItemIndex < noOfMenuItems; menuItemIndex++) {
         var foundItem = {};
         var menuItem = menuItems.menu_items[menuItemIndex];
         if(filterMenuItem(searchTerm, menuItem, foundItem)) {
           foundItems.push(foundItem);
         }
       }
       return foundItems;
     }).catch(function (error) {
       console.log("Something went terribly wrong.");
     });
   };
}

function filterMenuItem(searchTerm, menuItem, foundItem) {
  if(!isSearchTermEmpty(searchTerm)) {
    var searchTermLowerCased = searchTerm.toLowerCase();
    var itemNameLowerCased = menuItem.description.toLowerCase();
    var menuItemCheck = itemNameLowerCased.indexOf(searchTermLowerCased);
    if (menuItemCheck !== -1) {
      foundItem.shortName = menuItem.short_name;
      foundItem.name = menuItem.name;
      foundItem.description = menuItem.description;
      return true;
    }
  }
  return false;
}

  function isSearchTermEmpty(searchTerm) {
    return searchTerm === undefined || searchTerm.length == 0;
  }

  function showMenuTitle() {
    return "Chinese Menus (Name, Short Name, Description)";
  }
})();
