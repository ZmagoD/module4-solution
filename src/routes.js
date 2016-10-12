(function () {
  'use strict';

  angular
    .module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', { url: '/',
                       templateUrl: 'src/menuApp/home.html' })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories/categories.html',
        controller: 'CategoriesController as categoryList',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        templateUrl: 'src/items/items.html',
        controller: 'ItemsController as itemList',
        params: {
          categoryId: null
        },
        resolve: {
          items: ['$stateParams',
                  'MenuDataService',
                  function($stateParams, MenuDataService) {
                    return MenuDataService
                            .getItemsForCategory($stateParams.categoryId);
                  }]
        }
      });

    $urlRouterProvider.otherwise('/');
  }
})();
