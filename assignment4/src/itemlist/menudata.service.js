(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/categories.json")
    }).then(function(response) {
       return response.data;
     }).catch(function (error) {
       console.log("Something went terribly wrong.");
     });
  };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    }).then(function(response) {
       return response.data;
     }).catch(function (error) {
       console.log("Something went terribly wrong.");
     });
  };
}
})();
