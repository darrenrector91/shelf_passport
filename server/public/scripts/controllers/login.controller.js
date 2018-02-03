myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';
    self.items = UserService.items
    self.login = function() {
      if(self.user.username === '' || self.user.password === '') {
        
        self.message = "Enter your username and password!";
      } else {
        
        $http.post('/api/user/login', self.user).then(
        function(response) {
          if(response.status == 200) {
            // location works with SPA (ng-route)
            $location.path('/user');
          } else {
            
            self.message = "Incorrect credentials. Please try again.";
          }
        },
        function(response) {
          self.message = "Incorrect credentials. Please try again.";
        });
      }
    };

    
    self.registerUser = function() {
      
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      } else {
        $http.post('/api/user/register', self.user).then(function(response) {
          $location.path('/home');
        },
        function(response) {
          self.message = "Something went wrong. Please try again."
        });
      }
    }
}]);
