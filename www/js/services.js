angular.module('starter.services',[])

.service('LoginService', function($q, $ionicLoading, endpointBase, $http, $templateCache) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name != undefined && pw != undefined) {
                $ionicLoading.show({
                    noBackdrop :false,
                    template: ' <ion-spinner icon="spiral"></ion-spinner>',
                });

                var req = {
                    method: 'POST',
                    url: endpointBase + '/api/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        email: name,
                        password: pw
                    }
                }

                $http(req).then(function(ret){
                    
                    if (ret.data.error) {
                        deferred.reject(ret.data.message);
                    } else {
                        //window.localStorage.setItem('access_token', ret.data.token);
                        window.localStorage.setItem('user_id', ret.data.id);
                        window.localStorage.setItem('user_name', ret.data.name);
                        window.localStorage.setItem('user_email', ret.data.email);
                        window.localStorage.setItem('user_phone', ret.data.phone);
                        window.localStorage.setItem('user_birthday', ret.data.birthday);
                        deferred.resolve('');
                    }
                    $ionicLoading.hide();
                }, function(ret){
                    $ionicLoading.hide();
                    deferred.reject('Usuário/Senha incorretos.');
                });
            } else {
                deferred.reject('Usuário e Senha são obrigatórios.');
            }

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        registerUser: function(name, email, phone, birthday, pw, pw_confirm) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (pw == undefined || pw != pw_confirm) {
                deferred.reject('Confirmação de senha incorreta.');
            }

            if (name != undefined && email != undefined && phone != undefined && birthday != undefined) {
                $ionicLoading.show({
                    noBackdrop :false,
                    template: ' <ion-spinner icon="spiral"></ion-spinner>',
                });

                var req = {
                    method: 'POST',
                    url: endpointBase + '/api/register',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        name: name,
                        email: email,
                        phone: phone,
                        birthday: birthday,
                        password: pw
                    }
                }

                $http(req).then(function(ret){
                    
                    if (ret.data.error) {
                        deferred.reject(ret.data.message);
                    } else {
                        //window.localStorage.setItem('access_token', ret.data.token);
                        window.localStorage.setItem('user_id', ret.data.id);
                        window.localStorage.setItem('user_name', ret.data.name);
                        window.localStorage.setItem('user_email', ret.data.email);
                        window.localStorage.setItem('user_phone', ret.data.phone);
                        window.localStorage.setItem('user_birthday', ret.data.birthday);
                        deferred.resolve('');
                    }
                    $ionicLoading.hide();
                }, function(ret){
                    $ionicLoading.hide();
                    deferred.reject('Usuário/Senha incorretos.');
                });
            } else {
                deferred.reject('Campos são obrigatórios.');
            }

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('AgreementService', function($q, $ionicLoading, endpointBase, $http, $state, $templateCache) {
    var auth = window.localStorage.getItem('access_token');

    return {
        list: function() {
            $ionicLoading.show({
                noBackdrop :false,
                template: ' <ion-spinner icon="spiral"></ion-spinner>',
            });
            var deferred = $q.defer();
            var promise = deferred.promise;

            var req = {
                method: 'GET',
                url: endpointBase + '/api/convenio',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth
                }
            }

            $http(req).then(function(ret){
                $ionicLoading.hide();
                if (ret.data.length == 0) {
                    deferred.reject('Nenhum item localizado.');
                } else {
                    deferred.resolve(ret.data);
                }
            }, function(ret){
                $ionicLoading.hide();
                deferred.reject('Erro.');
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('ApplicationDetailsService', function($q, $ionicLoading, endpointBase, $http, $state, $templateCache) {
    var auth = window.localStorage.getItem('access_token');

    return {
        list: function() {
            $ionicLoading.show({
                noBackdrop :false,
                template: ' <ion-spinner icon="spiral"></ion-spinner>',
            });
            var deferred = $q.defer();
            var promise = deferred.promise;

            var req = {
                method: 'GET',
                url: endpointBase + '/api/paciente/'+ window.localStorage.getItem('user_id') +'/aplicacao',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth
                }
            }

            $http(req).then(function(ret){
                $ionicLoading.hide();
                if (ret.data.length == 0) {
                    deferred.reject('Nenhum item localizado.');
                } else {
                    deferred.resolve(ret.data);
                }
            }, function(ret){
                $ionicLoading.hide();
                deferred.reject('Erro.');
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
;
