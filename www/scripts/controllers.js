angular.module('panicapp.controllers', [])

.controller("AppCtrl", function($scope, $ionicModal, $timeout, $http, $rootScope, $state) {
  $scope.user = $rootScope.current_user;
  return $scope.logout = function() {
    console.log($rootScope);
    return $http["delete"]("http://localhost:3000/sessions/" + $rootScope.current_user.id + ".json").success(function(data) {
      return $state.go('main');
    });
  }
})

.controller("UsersCtrl", [
  "$scope", "$http", '$stateParams', '$state', '$location', '$rootScope', 'User', function($scope, $http, $stateParams, $state, $location, $rootScope, User) {
    $scope.newUser = {};
    return $scope.createUser = function() {
      return User.post($scope.newUser).success(function(data) {
        $rootScope.current_user = data;
        return $state.go('welcome');
      });
    };
  }
])

.controller("SessionsCtrl", [
  "$scope", "$http", "$rootScope", "$location", '$state', function($scope, $http, $rootScope, $location, $state) {
    return $scope.addSession = function(loginUser) {
      return $http.post("http://localhost:3000/login.json", {
        user: loginUser
      }).success(function(user) {
        $rootScope.current_user = user;
        return $state.go('welcome');
      });
    };
  }
])

.controller('DefenseCheckinCtrl', function($scope) {
  console.log("im here")
  $scope.defenseSubmit = function() {
    // return $http.post("http://localhost:3000/")
    console.log("im clicking");
    return $state.go('checkin-triggers');
    console.log("i went to triggers")
    // post the data into the backend. http.post('route', {mood: value})
    //console values that were chosen.
  }
})

.controller('TriggerCheckinCtrl', function($scope) {
  console.log("im here")
  $scope.triggerSubmit = function() {
    // return $http.post("http://localhost:3000/")
    console.log("im clicking");
    // post the data into the backend. http.post('route', {mood: value})
    //console values that were chosen.
  }
})

.controller('MoodCheckinCtrl', function($scope, $http) {
  console.log("im here")
  $scope.moodSubmit = function() {
    console.log("im clicking");
    
  }
})

.controller('HomeCtrl', function($scope) {})

.controller('HistoryCtrl', function($scope) {})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ProfileCtrl', function($scope) {})

.controller('MynumberCtrl', function($scope) {})

.controller('DefensesCtrl', function($scope) {})

// ---- Possibly don't need the following ----
.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
