myApp.controller('UserController', ['UserService', function(UserService) {
  console.log('after registering the user is directed here after login and move into the app');

  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items
  console.log(self.items);
  

  // Referencing the service to add the item.
  self.addItem = function (data) {
    UserService.addItem(data);
    self.newItem = UserService.newItem
  }

  self.removeItem = function (id) {
    if (confirm('Are you sure you want to remove this from the Shelf?') == true) {
      UserService.removeItem(id);  
    } 
  } 

}]);


