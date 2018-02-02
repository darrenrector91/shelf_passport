myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  console.log('login page is displayed');  
  console.log('LoginController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';
    self.items = UserService.items
    self.login = function() {
      if(self.user.username === '' || self.user.password === '') {
        console.log('this message is displayed if the user did not enter ANY credentials');
        
        self.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', self.user);
        console.log('the user enters their login info and if successful is directed to the user.html page ');
        console.log('the data is sent to the server and then passed along for verification');
        
        $http.post('/api/user/login', self.user).then(
        function(response) {
          if(response.status == 200) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user');
          } else {
            console.log('user mis-entered their credentials');
            
            console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          }
        },
        function(response) {
          console.log('failure error: ', response);
          self.message = "Incorrect credentials. Please try again.";
        });
      }
    };

    console.log('register here');
    
    self.registerUser = function() {
      console.log('option to register is selected');
      console.log('when username and password are submitted the user is redirected to /api/user/register');
      
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/api/user/register', self.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          self.message = "Something went wrong. Please try again."
        });
      }
    }
}]);
