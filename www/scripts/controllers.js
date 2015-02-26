angular.module('panicapp.controllers', [])

.controller("AppCtrl", function($scope, $ionicModal, $timeout, $http, $rootScope, $state) {
  $scope.user = $rootScope.current_user;
  $scope.logout = function() {
    console.log($rootScope);
    $http.delete("http://localhost:3000/sessions/" + $rootScope.current_user.id + ".json")
    .success(function(data) {
      return $state.go('main');
    })
    .error(function(data) {
      alert("Couldn't delete thing!")
    });
  }
  $scope.sendAlert = function() {
    console.log($rootScope)
    $http.post("http://localhost:3000/users/" + $rootScope.current_user.id + "/alert_all_contacts")
    .success(function() {
      $state.go('checkin-defense')
    })
    .error(function() {
      alert("Sorry, couldn't send text messages");
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

.controller('FriendsCtrl', function($scope, Friend, Defense, $ionicModal) {
  $scope.friends = Friend.query();
  $scope.defenses = Defense.query();
  // $ionicModal.fromTemplateUrl('edit-contacts-modal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  // $scope.openModal = function() {
  //   $scope.modal.show();
  // };
  // $scope.closeModal = function() {
  //   $scope.modal.hide();
  // };
  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friend) {
  $scope.friend = Friend.query($stateParams.friendId);
})

.controller('Defenses1Ctrl', function($scope, Defense) {
  $scope.defenses = Defense.query();
})

.controller('DefenseCheckinCtrl', function($scope, Defense) {
  console.log("im here at the Defense check in")
  $scope.defenses = Defense.query();
})

.controller('TriggersCtrl', function($scope, Trigger) {
  $scope.triggers = Trigger.query();
})

.controller('TriggerCheckinCtrl', function($scope, Trigger) {
  console.log("im here at trigger check in")
  $scope.triggers = Trigger.query();
  console.log("I did my trigger check in")
})

.controller('MoodCheckinCtrl', function($scope, $http) {
  console.log("im here at mood check in")
  $scope.moodSubmit = function() {
    console.log("im clicking");
    
  }
})

.controller('HomeCtrl', function($scope) {})



.controller('HistoryCtrl', function($scope, $http, $rootScope, $state) {})





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
