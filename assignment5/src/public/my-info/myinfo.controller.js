(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['regService'];
function MyinfoController(regService) {
    var $ctrl = this;

    $ctrl.customer = regService.getCustomerInfo();
    $ctrl.menuItem = $ctrl.customer.selectedMenuItem;
    $ctrl.hasCustomerRegistered = $ctrl.customer.registered;
  }
})();
