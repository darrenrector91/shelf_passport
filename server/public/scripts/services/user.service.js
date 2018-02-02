myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  console.log('UserService Loaded');
  
  var self = this;

  self.userObject = {};
  self.items = {list: []};

  // ask the server if this user is logged in
  self.getuser = function () {
    $http.get('/api/user')
      .then(function (response) {
        if (response.data.username) {
          // user has a current session on the server
          self.userObject.userName = response.data.username;
          console.log('the user is checked to still be in the current session');
          
          console.log('User Data: ', self.userObject.userName);
        } else {
          // unlikely to get here, but if we do, bounce them back to the login page
          $location.path("/home");
        }
      },
      // error response of unauthorized (403)
      function(response) {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      });
  }

  self.logout = function () {
    console.log('the user can logout from here');
    
    $http.get('/api/user/logout')
      .then(function (response) {
        console.log('logged out');
        $location.path("/home");
      },
    function(response) {
      console.log('logged out error');
      $location.path("/home");
    });
  }

  
  self.getItems = function () {
    $http.get('/api/data')
      .then(function (response) {
        console.log('got data', response);
        self.items.list = response.data
      },
    function(response) {
      console.log('logged out error');
    });
  }
  self.getItems();


  // Sends item list to the server to be authenticated before adding. 
  self.addItem = function (data) {
    console.log(data);
    $http.post('/api/data/addItem', data)
      .then(function(response) {
        console.log('Added item', response);
        // PUT GET REQUEST HERE TO REFRESH THE LIST
        self.getItems();
        self.newItem = ''
        alert('Item has been added!')
      })
      .catch(function(err) {
        console.log('error in adding item', err);
        // self.message = "Something went wrong. Please try again."; ---> to send a message on failure to add item.
      })
  }
  

}]);
