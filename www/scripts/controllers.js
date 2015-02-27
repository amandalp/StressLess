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

.controller('FriendsCtrl', function($scope, Friend, $ionicModal, $http) {
  $scope.friends = Friend.query();
  $scope.friend = {};

  $ionicModal.fromTemplateUrl('templates/edit-contacts-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    console.log($scope.modal);
  });

  $scope.openModal = function(friend) {
     $scope.friend = friend;
    console.log(friend);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.updateContact = function() {
    $http.put("http://localhost:3000/contacts/" + $scope.friend.id, {contact: {name: $scope.friend.name, phone: $scope.friend.phone}})
    // .success(function() {
    //   $state.go('tab.friends')
    // })
    // .error(function() {
    //   alert("Sorry, couldn't save");
    // });
    $scope.modal.hide();
  }

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

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

.controller('Defenses1Ctrl', function($scope, Defense, $ionicModal, $http) {
  $scope.defenses = Defense.query();
  $scope.defense = {};

  $ionicModal.fromTemplateUrl('templates/edit-defenses-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    console.log($scope.modal);
  });

  $scope.openModal = function(defense) {
     $scope.defense = defense;
    console.log(defense);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.updateDefenses = function() {
    $http.put("http://localhost:3000/defenses/" + $scope.defense.id, {defense: {body: $scope.defense.body}})
    // .success(function() {
    //   $state.go('tab.friends')
    // })
    // .error(function() {
    //   alert("Sorry, couldn't save");
    // });
    $scope.modal.hide();
  }

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('DefenseCheckinCtrl', function($scope, Defense) {
  console.log("im here at the Defense check in")
  $scope.defenses = Defense.query();
})

.controller('TriggersCtrl', function($scope, Trigger, $ionicModal, $http) {
  $scope.triggers = Trigger.query();
  $scope.trigger = {};

  $ionicModal.fromTemplateUrl('templates/edit-triggers-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    console.log($scope.modal);
  });

  $scope.openModal = function(trigger) {
     $scope.trigger = trigger;
    console.log(trigger);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.updateTriggers = function() {
    $http.put("http://localhost:3000/triggers/" + $scope.trigger.id, {trigger: {body: $scope.trigger.body}})
    // .success(function() {
    //   $state.go('tab.friends')
    // })
    // .error(function() {
    //   alert("Sorry, couldn't save");
    // });
    $scope.modal.hide();
  }

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
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
