(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/itemlist/templates/item.html',
  bindings: {
    items: '<'
  }
});

})();
