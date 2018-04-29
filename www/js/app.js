// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.services', 'starter.controllers', 'starter.constants', 'ionic-material', 'ionMdInput', 'ionic-timepicker', 'angularMoment', 'ui.rCalendar'])

.run(function($ionicPlatform, $state) {

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.localStorage.getItem('access_token')  != '') {
            $state.go('app.home');
        }

        if (window.cordova && window.cordova.plugins.Keyboard) {
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            //window.cordova.plugins.someFunction().then(success, error);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicTimePickerProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    var timePickerObj = {
        inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
        format: 12,
        step: 15,
        setLabel: 'Set',
        closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                     document.getElementById('fab-profile').classList.toggle('on');
                     }, 800);*/
                }
            }
        }
    })

    .state('app.schedule', {
        url: '/schedule',
        views: {
            'menuContent': {
                templateUrl: 'templates/schedule.html',
                controller: 'ScheduleCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                     document.getElementById('fab-profile').classList.toggle('on');
                     }, 800);*/
                }
            }
        },
        params:
				{
            'data': ''
  			}
    })

    .state('app.schedule_date', {
        url: '/schedule-date',
        views: {
            'menuContent': {
                templateUrl: 'templates/schedule_date.html',
                controller: 'ScheduleDateCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                     document.getElementById('fab-profile').classList.toggle('on');
                     }, 800);*/
                }
            }
        },
        params:
                {
            'data': ''
            }
    })

    .state('app.informations', {
        url: '/informations',
        views: {
            'menuContent': {
                templateUrl: 'templates/informations.html',
                controller: 'InfoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.locations', {
        url: '/locations',
        views: {
            'menuContent': {
                templateUrl: 'templates/locations.html',
                controller: 'LocationCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    .state('app.about_us', {
        url: '/about-us',
        views: {
            'menuContent': {
                templateUrl: 'templates/about_us.html',
                controller: function($scope, $ionicLoading, $http, $stateParams, endpointBase) {
                    $http({
                        method: 'GET',
                        url: endpointBase + '/api/sobre-nos',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(ret){
                        $ionicLoading.hide();
                        console.log(ret);
                        $scope.data = ret.data;
                    }, function(ret){
                        $ionicLoading.hide();
                        deferred.reject('Erro.');
                    });
                }
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    .state('app.contact', {
        url: '/contact',
        views: {
            'menuContent': {
                templateUrl: 'templates/contact.html',
                controller: 'ContactCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    .state('app.agreement', {
        url: '/agreement',
        views: {
            'menuContent': {
                templateUrl: 'templates/agreement.html',
                controller: 'AgreementCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.options', {
        url: '/options',
        views: {
            'menuContent': {
                templateUrl: 'templates/options.html',
                controller: 'OptionsCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.applications', {
        url: '/applications',
        views: {
            'menuContent': {
                templateUrl: 'templates/applications.html',
                controller: 'ApplicationCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.application_orientations', {
        url: '/application-orientations',
        views: {
            'menuContent': {
                templateUrl: 'templates/application_orientations.html',
                controller: 'ApplicationOrientationCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.application_details', {
        url: '/application_details',
        views: {
            'menuContent': {
                templateUrl: 'templates/application_details.html',
                controller: 'ApplicationDetailsCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.info_vasculares', {
        url: '/info_vasculares',
        views: {
            'menuContent': {
                templateUrl: 'templates/info_vasculares.html',
                controller: 'InfoVascularesCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.info_preparo', {
        url: '/info_preparo',
        views: {
            'menuContent': {
                templateUrl: 'templates/info_preparo.html',
                controller: 'InfoVascularesCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.info_type', {
        url: '/info/:type/:name',
        views: {
            'menuContent': {
                templateUrl: 'templates/info.html',
                controller: function($scope, $ionicLoading, $http, $stateParams, endpointBase) {
                    $http({
                        method: 'GET',
                        url: endpointBase + '/api/orientacoes/'+ $stateParams.type +'/' + $stateParams.name,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(ret){
                        $ionicLoading.hide();
                        console.log(ret);
                        $scope.data = ret.data;
                    }, function(ret){
                        $ionicLoading.hide();
                        deferred.reject('Erro.');
                    });
                }
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
