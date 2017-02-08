(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('menuSearchService', menuSearchService)
  .service('menuFetchService', menuFetchService)
  .directive('foundItems',FoundItemsDirective);

  NarrowItDownController.$inject = ['$scope','menuSearchService'];
  function NarrowItDownController($scope,menuSearchService){
    var narrowItDownController = this;

    narrowItDownController.testText="Sample";

    narrowItDownController.getFoundList = function(){
      return menuSearchService.getFoundList();
    };


    menuSearchService.fetchData();

    narrowItDownController.onButtonClickListener = function(){
      menuSearchService.getMatchedMenuItems(narrowItDownController.searchItem);

    };

    narrowItDownController.deleteFoundInItem = function(index){
      console.log("delete Item in Parent Controller :: yeahh "+ index);
      menuSearchService.deleteItem(index);
    };

  }


  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items:'<',
        deleteItem:'&',
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }






  function ShoppingListDirectiveController(){

  }




  menuSearchService.$inject = ['menuFetchService']
  function menuSearchService(menuFetchService){

    var menuSearchService = this;
    var temp;

    var foundItemsList=[];

    menuSearchService.fetchData = function(){
      var menuItmes = menuFetchService.fetchData()
      .then(function success(response){
        console.log("Success :: "+ response);

         temp=  response.data.menu_items;


        return response.data.menu_items;

      }, function error(error){
        console.log("error :: "+ error);
        return error;
      });

      menuSearchService.getMatchedMenuItems = function(searchString){
        foundItemsList = [];
        if(searchString.trim().length > 0){
          for(var i=0; i < temp.length; i++){

            if(temp[i].description.indexOf(searchString) !== -1){
              foundItemsList.push(temp[i]);
            }

          }
        }


      }

      menuSearchService.deleteItem = function(index){
        foundItemsList.splice(index, 1);
      }

      menuSearchService.getFoundList = function(){
        return foundItemsList;
      }


    }
  }





  menuFetchService.$inject = ['$http'];
  function menuFetchService($http){

    var menuFetchService = this;

    menuFetchService.fetchData = function(){
      var result  = $http({
        method: 'GET',
        url:'https://davids-restaurant.herokuapp.com/menu_items.json'

      })

      return result;
    }


  }
})();
