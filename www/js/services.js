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
                    url: endpointBase + '/api/v1/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        email: name,
                        password: pw
                    }
                }

                $http(req).then(function(ret){
                    window.localStorage.setItem('access_token', ret.data.token);
                    window.localStorage.setItem('user_id', ret.data.user.id);
                    window.localStorage.setItem('user_name', ret.data.user.name);
                    window.localStorage.setItem('user_email', ret.data.user.email);
                    deferred.resolve('');
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
                    url: endpointBase + '/api/v1/register',
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
                    window.localStorage.setItem('access_token', ret.data.token);
                    window.localStorage.setItem('user_id', ret.data.user.id);
                    window.localStorage.setItem('user_name', ret.data.user.name);
                    window.localStorage.setItem('user_email', ret.data.user.email);
                    deferred.resolve('');
                    $ionicLoading.hide();
                }, function(ret){
                    $ionicLoading.hide();
                    deferred.reject('Dados incorretos.');
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

.service('ItemService', function($q, $ionicLoading, endpointBase, $http, $state, $templateCache) {
    var auth = window.localStorage.getItem('access_token');

    return {
        findList: function(tax_document, cod) {
            $ionicLoading.show({
                noBackdrop :false,
                template: ' <ion-spinner icon="spiral"></ion-spinner>',
            });
            var deferred = $q.defer();
            var promise = deferred.promise;

            var req = {
                method: 'GET',
                url: endpointBase + '/api/v1/stores/find-by?tax_document=' + tax_document + '&cod=' + cod,
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
                if (ret.status == 401) {
                    $state.go('app.login');
                }
                deferred.reject('Usuário/Senha incorretos.');
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
        },
        edit: function(id, status) {
            $ionicLoading.show({
                noBackdrop :false,
                template: ' <ion-spinner icon="spiral"></ion-spinner>',
            });
            var deferred = $q.defer();
            var promise = deferred.promise;

            var req = {
                method: 'PUT',
                url: endpointBase + '/api/v1/orders/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth
                },
                data: {
                    order: {
                        // status aceitos: pending, received, delivered
                        status: status
                    }
                }
            }

            $http(req).then(function(ret){
                $ionicLoading.hide();
                deferred.resolve(ret);
            }, function(ret){
                $ionicLoading.hide();
                if (ret.status == 401) {
                    $state.go('app.login');
                }
                deferred.reject('Erro ao editar.');
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
        },
        editWithPhoto: function(id, photo) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            if (photo != undefined) {
                $ionicLoading.show({
                    noBackdrop :false,
                    template: ' <ion-spinner icon="spiral"></ion-spinner>',
                });
                var req = {
                    method: 'PUT',
                    url: endpointBase + '/api/v1/stores/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth
                    },
                    data: {
                        image: photo,
                        user_id: window.localStorage.getItem('user_id')
                    }
                }

                $http(req).then(function(ret){
                    $ionicLoading.hide();
                    deferred.resolve(ret);
                }, function(ret){
                    $ionicLoading.hide();
                    if (ret.status == 401) {
                        $state.go('app.login');
                    }
                    deferred.reject('Erro ao subir imagem.');
                });
            } else {
                deferred.reject('Foto é obrigatória.');
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
        storeDetails: function(id, detail) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            if (detail != undefined) {
                $ionicLoading.show({
                    noBackdrop :false,
                    template: ' <ion-spinner icon="spiral"></ion-spinner>',
                });
                var req = {
                    method: 'PUT',
                    url: endpointBase + '/api/v1/stores/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth
                    },
                    data: {
                        obs: detail,
                        user_id: window.localStorage.getItem('user_id')
                    }
                }

                $http(req).then(function(ret){
                    $ionicLoading.hide();
                    deferred.resolve(ret);
                }, function(ret){
                    $ionicLoading.hide();
                    if (ret.status == 401) {
                        $state.go('app.login');
                    }
                    deferred.reject('Erro salvar.');
                });
            } else {
                deferred.reject('Descição é Obrigatória.');
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

;
