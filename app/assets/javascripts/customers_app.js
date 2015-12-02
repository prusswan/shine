var app = angular.module('customers',
  [
    'ngRoute',
    'ngResource',
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

app.controller("CustomerDetailController", ["$scope","$routeParams","$resource",
  function($scope , $routeParams , $resource) {
    var customerId = $routeParams.id;
    var Customer = $resource('/customers/:customerId.json');

    $scope.customer = Customer.get({ "customerId": customerId});
    // alert("AJAX Call Initiated!");
  }
]);

app.controller("CustomerCreditCardController", [
  "$scope","$resource",
  function($scope , $resource) {
    var CreditCardInfo = $resource('/fake_billing.json');
    $scope.creditCard = CreditCardInfo.get({ "cardholder_id": 1234});
  }
]);
