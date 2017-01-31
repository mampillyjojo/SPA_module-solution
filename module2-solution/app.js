(function(){

angular.module('ShoppingListCheckOff',[])
.controller('AlreadyBoughtController', alreadyBoughtController)
.controller('ToBuyController', toBuyController)
.service('ShoppingListCheckOffService', shoppingListCheckOffService);

//Implementing the controllers
toBuyController.inject=['$scope','ShoppingListCheckOffService'];
function toBuyController($scope,ShoppingListCheckOffService){
  var toBuy = this;
  toBuy.buyingList = ShoppingListCheckOffService.getShoppingList();

  this.boughtButtonClickHandler = function(index){
   ShoppingListCheckOffService.buyItemAtIndex(index);
  }
  function sampleClick(index){
    console.log(index);


  }
}


//Implementing the controllers
alreadyBoughtController.inject=['$scope','ShoppingListCheckOffService'];
function alreadyBoughtController($scope,ShoppingListCheckOffService){
  $scope.errorMsg = "Sample";
  var alreadyBoughtController = this;
  alreadyBoughtController.boughtList = ShoppingListCheckOffService.getBoughtList();
}

//Service
function shoppingListCheckOffService(){
  var shoppingList = getDefaultShoppingList();
  var boughtList;

  this.getShoppingList = function(){
    return shoppingList;
  }

  this.getBoughtList = function(){
    return boughtList =[];
  }

  this.buyItemAtIndex = function (index){
    if( shoppingList.length > 0){
      var item = shoppingList[index];
      boughtList.push(item);
      shoppingList.splice(index,1);
    }
  }

  function getDefaultShoppingList(){
    return [
      { name: "cookies", quantity: 10 },
      { name: "MIlk", quantity: 3 },
      { name: "Sugar", quantity: 2 },
      { name: "Ice cream", quantity: 5 },
      { name: "Bread", quantity: 4 }
    ]
  }
}
})();
