myApp.controller('UserController', ['UserService', function(UserService) {
  console.log('after registering the user is directed here after login and move into the app');

  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;


  // Referencing the service to add the item.
  self.addItem = function (data) {
    UserService.addItem(data);
  }

}]);


