var app = angular.module('customers',
  [
    'ngRoute',
    'templates'
  ]
);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when("/", {
    controller: "CustomerSearchController",
    templateUrl: "customer_search.html"
  }).when("/:id",{
    controller: "CustomerDetailController",
    templateUrl: "customer_detail.html"
  });
}]);

app.controller("CustomerSearchController", ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.customers = [];

  var page = 0;

  $scope.search = function(searchTerm) {
    if (searchTerm.length < 3) {
      return;
    }

    $http.get("/customers.json",
      { "params":
        {
          "keywords": searchTerm,
          "page": page
        }
      }
    )
    .success(
      function(data,status,headers,config) {
        $scope.customers = data;
      }
    )
    .error(
      function(data,status,headers,config) {
        alert("There was a problem: " + status);
      }
    );
  }

  $scope.previousPage = function() {
    if (page > 0) {
      page = page - 1;
      $scope.search($scope.keywords);
    }
  }

  $scope.nextPage = function() {
    page = page + 1;
    $scope.search($scope.keywords);
  }

  $scope.viewDetails = function(customer) {
    $location.path("/" + customer.id);
  }
}]);

app.controller("CustomerDetailController", ["$scope","$http","$routeParams",
  function($scope , $http , $routeParams) {
    var customerId = $routeParams.id;
    $scope.customer = {};

    $http.get(
      "/customers/" + customerId + ".json"
    ).success(function(data,status,headers,config) {
      $scope.customer = data;
    }).error(function(data,status,headers,config) {
      alert("There was a problem: " + status);
    });
  }
]);
