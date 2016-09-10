(function () {
    angular
        .module('Wemorse')
        .controller('MainCtrl', MainController);

    MainController.$inject = ['$scope', '$state', '$http', 'MessageService'];


    function MainController($scope, $state, $http, MessageService) {

        $scope.message = {};

        $scope.submit = function () {
            $http.get('***api url***' + $scope.message.Text).then(function (resp) {
                console.log('Success');
            }, function (err) {
                console.log('Error');
            })
        }
    }
})();