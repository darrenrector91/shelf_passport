myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  
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
    
    $http.get('/api/user/logout')
      .then(function (response) {
        $location.path("/home");
      },
    function(response) {
      $location.path("/home");
    });
  }

  
  self.getItems = function () {
    $http.get('/api/data')
      .then(function (response) {
        self.items.list = response.data
      },
    function(response) {
    });
  }
  self.getItems();


  // Sends item list to the server to be authenticated before adding. 
  self.addItem = function (data) {
    $http.post('/api/data/addItem', data)
      .then(function(response) {
        // PUT GET REQUEST HERE TO REFRESH THE LIST
        self.getItems();
        self.newItem = ''
        alert('Item has been added!')
      })
      .catch(function(err) {
        // self.message = "Something went wrong. Please try again."; ---> to send a message on failure to add item.
      })
  }
  

  self.removeItem = function (id) {
    $http.delete(`/api/data/removeItem/${id}`)
    .then(function (response) {
        self.getItems();  
    })
    .catch(function (response) {
    })
}


}]);
