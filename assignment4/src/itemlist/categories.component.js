(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/itemlist/templates/category.html',
  bindings: {
    categories: '<'
  }
});

})();
