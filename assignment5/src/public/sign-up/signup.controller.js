(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['regService'];
function SignupController(regService) {
    var $ctrl = this;
    initialize($ctrl);
    $ctrl.customer = regService.getCustomerInfo();

    $ctrl.clearEntries = function() {
      initialize($ctrl);
      regService.clearCustomerInfo();
      $ctrl.customer = regService.getCustomerInfo();
    }

    $ctrl.submit = function (invalidEntries) {
      $ctrl.invalid = invalidEntries;
      regService.saveCustomerInfo($ctrl.customer);
      var menuItem = regService.getMenuItem();

      menuItem.then(function(selectedMenuItem) {
        $ctrl.isMenuItemExisted = selectedMenuItem !== undefined;;
        if($ctrl.invalid || !$ctrl.isMenuItemExisted) {
          registerCustomer($ctrl, regService, selectedMenuItem, false);
          $ctrl.infoSaved = "";
        } else {
          registerCustomer($ctrl, regService, selectedMenuItem, true);
          $ctrl.infoSaved = "Your information has been saved.";
        }
      });
    };
  }

  function initialize($ctrl) {
    $ctrl.infoSaved = "";
    $ctrl.isMenuItemExisted = true;
    $ctrl.invalid = false;
  }

  function registerCustomer($ctrl, regService, selectedMenuItem, registered) {
    $ctrl.customer.registered = registered;
    $ctrl.customer.selectedMenuItem = selectedMenuItem;
    regService.saveCustomerInfo($ctrl.customer);
  }
})();
