(function () {
  'use strict';

  var service;

  var customer = {
    firstName : "",
    lastName : "",
    email : "",
    phone : "",
    menuNumber : "",
    registered : false,
    selectedMenuItem : {}
  }

  angular.module('common')
  .factory('RegistrationServiceFactory', RegistrationServiceFactory);

  function RegistrationService($http) {
    var service = this;

    service.saveCustomerInfo = function(customerInfo) {
      saveCustomerInfo(customerInfo);
    };
    service.getCustomerInfo = function() {
      return customer;
    };
    service.clearCustomerInfo = function() {
      clearCustomerInfo();
    };
    service.getMenuItem = function () {
      return getMenuItem($http, customer.menuNumber);
    };
  } // end of SignupService

  RegistrationServiceFactory.$inject = ['$http']
  function RegistrationServiceFactory($http) {
    var factory = function() {
      if(service === undefined) {
        service = new RegistrationService($http);
      }
      return service
    };
    return factory;
  }

  function getMenuItem($http, shortName) {
    try {
      return $http({
        method: "GET",
        url: ('https://jblimke-coursera5a.herokuapp.com/menu_items/' + shortName + '.json')
      }).then(function(response) {
         return response.data;
       }).catch(function (error) {
         return undefined;
       });
    } catch(ex) {
      return undefined;
    }
  }

  function clearCustomerInfo() {
    customer = {
      firstName : "",
      lastName : "",
      email : "",
      phone : "",
      menuNumber : "",
      registered : false,
      selectedMenuItem : {}
    };
  }

  function saveCustomerInfo(customerInfo) {
    customer = {
      firstName : customerInfo.firstName,
      lastName : customerInfo.lastName,
      email : customerInfo.email,
      phone : customerInfo.phone,
      menuNumber : customerInfo.menuNumber,
      registered : customerInfo.registered,
      selectedMenuItem : customerInfo.selectedMenuItem
    };
  }
})();
