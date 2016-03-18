angular.module('mid', [])
    .controller('midcontron', function($http, $scope) {
        $scope.find = []
        $http.get("/findall").then(
                function(res) {

                    $scope.find = res.data
                        // console.log($scope.find);
                }
            )
            //////////////////////

        $scope.save = function() {
                var data = { name: $scope.name, surname: $scope.surname, age: $scope.age }
                $http.post("/save", data)
                    .then(
                        function(res) {
                            console.log('save');
                            $scope.find.push(data)

                        },
                        function(err) { console.log(err); }
                    )
            }
            /////////////////////////////////

        $scope.delete = function(_id, index) {
                console.log(_id);
                var id = _id
                $http.delete("/delete/" + _id).then(
                    function(res) {
                        console.log(res.data);
                    })
                 $scope.find.splice(index, 1);
            }
            //////////////////////////////////
        $scope.sub = true
        $scope.index
        $scope.update = function(_id, index) {
                $scope.index = index
                console.log(index);
                $http.get("/findall/" + _id).then(
                    function(res) {
                        $scope.newfind = res.data
                        $scope.name = res.data[0].name
                        $scope.surname = res.data[0].surname
                        $scope.age = res.data[0].age
                        $scope.sub = false
                            //console.log($scope.age);
                    }

                )
            }
            ////////////////////////////////
        $scope.confirmup = function() {
            // console.log($scope.newfind[0]._id); 
            var data = { _id: $scope.newfind[0]._id, name: $scope.name, surname: $scope.surname, age: $scope.age }
            console.log(data);
            $http.put("/putupdate", data).then(
                function(res) {
                    console.log(res.data);
                    $scope.find[$scope.index] = data
                }, // compleate
                function(err) { console.log(err.data); } // error
            )
        }
    });