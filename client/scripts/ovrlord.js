var myApp = angular.module( 'myApp', [] );
myApp.controller( 'OvrlordController', [ '$scope', '$http', function( $scope, $http ){
  // arrays
  $scope.issues = []; // for display
  $scope.allIssues = []; // all the things
  // ui control
  $scope.createMode = false;

  $scope.addNewTicket = function(){
    var url = '../server/newIssue.php?user=' + $scope.userIn + '&issue=' + $scope.issueIn + '&month=' + $scope.monthIn;
    $http({
        method : "GET",
        url : url,
    }).then( function succes( response ) {
        console.log( 'success:', response.data );
        // clear inputs
        $scope.userIn = '';
        $scope.issueIn = '';
        $scope.getIssues();
        $scope.setFilter( 0 );
    }, function error( response ) {
        console.log( 'error:', response );
    }); // end http
  }; // end addNewTicket

  $scope.applyFilter = function(){
    $scope.setFilter( $scope.filterIn );
  }; // end applyFilter

  $scope.getIssues = function(){
    $scope.issues = [];
    $scope.allIssues = [];
    $scope.issueCount = 0;
    $scope.openIssueCount = 0;
    $http({
        method : "GET",
        url : "../server/issues.php"
    }).then(function succes( response ) {
        console.log( 'success:', response.data );
        for( var i in response.data ){
          if( response.data[i].status == 0 ){
            response.data[i].displayStatus = 'open';
            $scope.issueCount++;
            $scope.openIssueCount++;
          } // end open
          else if( response.data[i].status == 1 ){
            response.data[i].displayStatus = 'queued';
            $scope.issueCount++;
            $scope.openIssueCount++;
          } // end queued
          else if( response.data[i].status == 2 ){
            response.data[i].displayStatus = 'wip';
            $scope.issueCount++;
            $scope.openIssueCount++;
          } // end wip
          else if( response.data[i].status == 3 ){
            response.data[i].displayStatus = 'closed';
            $scope.issueCount++;
          } // end closed
          else if( response.data[i].status == 4 ){
            response.data[i].displayStatus = 'ignored';
          } // end ignored
          else {
            response.data[i].displayStatus = 'wtf';
          } // end wtf
          $scope.allIssues.push( response.data[i] );
        } // end for
        console.log( 'Issues:', $scope.issueCount, $scope.openIssueCount );
        $scope.setFilter( 0 );
    }, function error( response ) {
        console.log( 'error:', response );
    }); // end http
  } // end setIssues

  $scope.setFilter = function( filter ){
    console.log( ' setting issue filter, motherfucker:', filter );
    if( filter >= 0 ){
      $scope.issues=[];
      $scope.logMode = false;
      for (var i = 0; i < $scope.allIssues.length; i++) {
        if( $scope.allIssues[i].status == filter ){
          $scope.issues.push( $scope.allIssues[i] );
        } // end match
      } // end for
    } //end !log
    else{
      $scope.logIssues=[];
      $scope.logMode = true;
      for (var i = 0; i < $scope.allIssues.length; i++) {
        if( $scope.allIssues[i].log === 1 ){
          $scope.logIssues.push( $scope.allIssues[i] );
        } // end match
      } // end for
      console.log( $scope.logIssues );
    } // end log
  } // end setFilter

  $scope.setStatus = function( index, status ){
    console.log( 'in setStatus:', $scope.issues[ index ], status );
    var url = '../server/setStatus.php?id=' + $scope.issues[ index ].id + '&status=' + status;
    $http({
        method : "GET",
        url : url
    }).then(function succes( response ) {
        console.log( 'success:', response );
        $scope.getIssues();
        $scope.setFilter( 0 );
    }, function error( response ) {
        console.log( 'error:', response );
    }); // end http
  }; // end update status

  $scope.toggleMode = function(){
    $scope.createMode = !$scope.createMode;
  }; // end toggleMode

}]); // end controller
