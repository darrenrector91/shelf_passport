var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial'])

// Available palettes: 
// red, pink, purple, deep-purple, indigo, blue, light-blue, 
// cyan, teal, green,light-green, lime, yellow, amber, orange, 
// deep-orange, brown, grey, blue-grey

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .warnPalette('red')
      .accentPalette('lime')
      .backgroundPalette('grey');
      // .dark();
  });



/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    //the user is brought back here after registering or if they already have the proper 
    //registration credentials they can go ahead and sign-in
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    // the user registers here
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    //this page shows after the user has properly signed in 
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    //another direction option
    // commented out because its not applicable for the assignment
    // .when('/info', {
    //   templateUrl: '/views/templates/info.html',
    //   controller: 'InfoController as vm',
    //   resolve: {
    //     getuser: function (UserService) {
    //       return UserService.getuser();
    //     }
    //   }
    // })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);