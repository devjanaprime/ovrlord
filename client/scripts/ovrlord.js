var myApp = angular.module( 'myApp', [] );
myApp.controller( 'OvrlordController', [ '$scope', '$http', function( $scope, $http ){
  $scope.issues  = [];
  $scope.allIssues = [];
  $scope.getIssues = function(){
    console.log( 'asdf' );
    $http({
        method : "GET",
        url : "../server/issues.php"
    }).then(function succes( response ) {
        console.log( 'success:', response.data );
        for( var i in response.data ){
          $scope.allIssues.push( response.data[i] );
        } // end for
        $scope.setFilter( 0 );
    }, function error( response ) {
        console.log( 'error:', response );
    });
  } // end setIssues

  $scope.setFilter = function( filter ){
    console.log( ' setting issue filter:', filter );
    $scope.issues=[];
    for (var i = 0; i < $scope.allIssues.length; i++) {
      if( $scope.allIssues[i].status == filter ){
        $scope.issues.push( $scope.allIssues[i] );
      } // end match
    } // end for
  } // end setFilter
}]); // end controller
