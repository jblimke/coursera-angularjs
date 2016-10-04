(function () {
'use strict';

angular.module('data', [])
.controller('DataController', DataController);

DataController.$inject = ['items']
function DataController(items) {
  var list = this;
  list.items = items;
}

})();
