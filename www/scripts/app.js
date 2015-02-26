angular.module('panicapp', ['ionic', 'panicapp.controllers', 'panicapp.services', 'panicapp.factories', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'UsersCtrl'
  }).state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'AppCtrl',
  }).state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'UsersCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'SessionsCtrl'
  });

  $stateProvider
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  .state('tab.home', {
    url: '/welcome',
    views: {
      'welcome': {
        templateUrl: 'templates/welcome.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.history', {
    url: '/history',
    views: {
      'tab-history': {
        templateUrl: 'templates/tab-history.html',
        controller: 'HistoryCtrl'
      }
    }
  })
  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'AppCtrl'
      }
    }
  })
  .state('tab.mynumber', {
    url: '/mynumber',
    views: {
      'tab-mynumber': {
        templateUrl: 'templates/tab-mynumber.html',
        controller: 'MynumberCtrl'
      }
    }
  })
  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  $stateProvider
  .state('edit-defenses', {
    url: '/edit-defenses',
    templateUrl: 'templates/edit-defenses.html'  
  })
  .state('defenses', {
    url: '/defenses',
    templateUrl: 'templates/defenses.html',
    controller: 'Defenses1Ctrl'
  })
  .state('edit-triggers', {
    url: '/edit-triggers',
    templateUrl: 'templates/edit-triggers.html'  
  })
  .state('triggers', {
    url: '/triggers',
    templateUrl: 'templates/triggers.html'  
  })
  .state('moods', {
    url: '/moods',
    templateUrl: 'templates/moods.html',
    controller: 'MoodCheckinCtrl'
  }).state('checkin-defense', {
    url: '/checkin-defense',
    templateUrl: 'templates/checkin-defense.html',
    controller: 'DefenseCheckinCtrl'
  }).state('checkin-triggers', {
    url: '/checkin-triggers',
    templateUrl: 'templates/checkin-triggers.html',
    controller: 'TriggerCheckinCtrl'
  }).state('loggedin', {
    url: '/loggedin',
    templateUrl: 'templates/loggedin.html',
  }).state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
  });

  


  $urlRouterProvider.otherwise('/main');

});




