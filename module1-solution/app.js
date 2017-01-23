(function () {
'use strict'
  var moduleObj = angular.module('LunchCheck',[])

  .controller('LunchController', lunchChecker);

  lunchChecker.$inject = ['$scope'];
  function lunchChecker($scope){
    $scope.msg = "Please enter items";


    $scope.onButtonClick = function(){
      var inputText = $scope.foodItems;

       validateText(inputText);
    }

    // Validation of text
    function validateText( value){
      if( undefined !== value && value.length > 0){

        var inputArray = value.split(',');
        // check if number of items is greater than three
        if(inputArray.length <= 3){
          $scope.msg ="Enjoy!";
        }else{
          $scope.msg ="Too much!";
        }
      }else{
          $scope.msg = "Please enter data first";
      }

    }
  }
})();
