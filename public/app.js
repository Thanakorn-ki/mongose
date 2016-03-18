angular.module('mid', [])
    .controller('midcontron', function($http, $scope) {

        $scope.save = function() {
            var data = { name: $scope.name, surname: $scope.surname, age: $scope.age }
            $http.post("/save", data)
                .then(
                    function(res) {
                        console.log('save');
                    },
                    function(err) { console.log(err); }
                )

        }
        $scope.find = []
        $http.get("/findall").then(
            function(res) {

                $scope.find = res.data
                console.log($scope.find);
            }
        )
    });
