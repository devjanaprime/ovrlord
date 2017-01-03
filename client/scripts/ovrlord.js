var myApp = angular.module( 'myApp', [] );
myApp.controller( 'OvrlordController', [ '$scope', '$http', function( $scope, $http ){
  // arrays
  $scope.issues = []; // for display
  $scope.allIssues = []; // all the things
  // ui control
  $scope.createMode = false;
  $scope.loggedIn = false;
  $scope.lastFilter = 0;

  $scope.addNewTicket = function(){
    var url = '../server/newIssue.php?user=' + $scope.userIn + '&issue=' + $scope.issueIn + '&month=' + $scope.monthIn;
    $http({
        method : "GET",
        url : url,
    }).then( function succes( response ) {
        if( response.data == 'success' ){
          // clear inputs
          $scope.userIn = '';
          $scope.issueIn = '';
          $scope.getIssues();
          $scope.setFilter( $scope.lastFilter );
        } // end success
        else {
          alert( 'error:',response.data );
        } // end !success
    }, function error( response ) {
        console.log( 'error:', response );
    }); // end http
  }; // end addNewTicket

  $scope.applyFilter = function( ){
    $scope.setFilter( $scope.filterIn );
    $scope.lastFilter = $scope.filterIn;
  }; // end applyFilter

  $scope.checkLogIn = function(){
    if( localStorage.getItem( "ovrlordLoggedIn" ) == 'true' ){
      $scope.loggedIn = true;
      $scope.getIssues();
    } // end if loggedIn
    else{
      $scope.logOut();
    }
  }; //end checkLogIn

  $scope.checkPassCode = function(){
    var passcode = $scope.passcode0 + $scope.passcode1 + $scope.passcode2 + $scope.passcode3;
    var passcodeHash = md5( passcode );
    if( passcodeHash == 'bf5cd8b2509011b9502a72296edc14a0' ){
      $scope.loggedIn = true;
      localStorage.setItem( "ovrlordLoggedIn", "true" );
      $scope.getIssues();
    };
  }; // end checkPassCode

  $scope.getIssues = function(){
    $scope.issues = [];
    $scope.allIssues = [];
    $scope.issueCount = 0;
    $scope.openIssueCount = 0;
    $http({
        method : "GET",
        url : "../server/issues.php"
    }).then(function succes( response ) {
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
    }, function error( response ) {
        alert( 'error:', response );
    }); // end http
  } // end setIssues

  $scope.logIssue = function( index, logValue ){
    var url = '../server/log.php?id=' + $scope.allIssues[ index ].id + '&log=' + logValue;
    console.log( url );
    $http({
        method : "GET",
        url : url,
    }).then( function succes( response ) {
      if( response.data == 'success' ){
        console.log( 'log success:', response.data );
        $scope.getIssues();
      } // end success
      else {
        alert( 'error:', response.data );
      } // end !success
    }, function error( response ) {
        alert( 'error:', response );
    }); // end http
  }; // end addNewTicket

  $scope.logOut = function(){
    localStorage.setItem( "ovrlordLoggedIn", "false" );
    $scope.loggedIn = false;
    $scope.passcode0 = '';
    $scope.passcode1 = '';
    $scope.passcode2 = '';
    $scope.passcode3 = '';
  }; // end log out

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
        $scope.setFilter( $scope.lastFilter );
    }, function error( response ) {
        alert( 'error:', response );
    }); // end http
  }; // end update status

  $scope.toggleMode = function(){
    if( $scope.loggedIn ){
      $scope.createMode = !$scope.createMode;
      $scope.filterIn = '';
      $scope.applyFilter( $scope.lastFilter );
    } //end if
  }; // end toggleMode

}]); // end controller
