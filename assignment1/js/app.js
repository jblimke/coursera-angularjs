(function () {
  'use strict';

  var enjoyLunch = "Enjoy!";
  var tooMuchLunch = "Too much!";
  var enterDataFirst = "Please enter data first!";
  var invalidCommasMessage = "Commas at ends and multiple commas in between are removed!"

  angular.module("LunchCheckApp", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.lunchCheckButton = function() {
      var trimmedLunchMenu = removeAllSpaces($scope.lunchMenu);
      if(isValueEmpty(trimmedLunchMenu)) {
        $scope.message = enterDataFirst;
      } else {
        $scope.errorMessage = validateCommas(trimmedLunchMenu);
        trimmedLunchMenu = trimCommas(trimmedLunchMenu);
        $scope.lunchMenu = trimmedLunchMenu;
        $scope.message = countItems(trimmedLunchMenu);
      }
    };
  };

  function removeAllSpaces(lunchMenuInput) {
    if(!isValueEmpty(lunchMenuInput)) {
      return lunchMenuInput.replace(/[\s]/g, "");
    }
  }

  function validateCommas(lunchMenuInput) {
      var commasAtEnds = lunchMenuInput.match(/^,|,$/g);
      var commasInBetween = lunchMenuInput.indexOf(",,");
      var areCommasValid = isValueEmpty(commasAtEnds) && isValueEmpty(commasInBetween);
      if(!areCommasValid) {
        return invalidCommasMessage;
      }
  }

  function trimCommas(lunchMenuInput) {
      lunchMenuInput = lunchMenuInput.replace(/^,*|,*$/g, "");
      lunchMenuInput = lunchMenuInput.replace(/,,*/g, ",");
      return lunchMenuInput;
  }

  function countItems(trimmedLunchMenu) {
    var numberOfItems = countCommas(trimmedLunchMenu) + 1;

    if(numberOfItems > 3) {
       return tooMuchLunch;
    } else {
       return enjoyLunch;
    }
  }

  function countCommas(trimmedLunchMenu) {
    var commasFound = trimmedLunchMenu.match(/,/g);
    var numberOfCommas = 0;

    if(!isValueEmpty(commasFound)) {
	numberOfCommas = commasFound.length;
    }
      return numberOfCommas;
  }

  function isValueEmpty(undefinedValue) {
    var isValueEmpty = typeof undefinedValue == 'undefined'
                      || undefinedValue == null
                      || undefinedValue == ""
                      || undefinedValue == -1;
    return isValueEmpty;
  }
})();
