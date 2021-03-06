'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmailsListCtrl
 * @description
 * # EmailsListCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmailsUListCtrl', function ($scope, $state, $stateParams, Emails, ProspectService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        $scope.prospect_id = '';
   /* $scope.emails = [
      {subject: "Initied Yvolver",body:"New",_id:"1",date:"12/10/2014"},
      {subject: "Initied PayWize",body:"Internal Preparation",_id:"2",date:"02/10/2014"},
      {subject: " Initied CNM Connect",body:"Initiation",_id:"3",date:"12/12/2014"}
    ];*/
        $scope.prospectList = ProspectService.getAllProspects()
            .success (function (data){
            $scope.prospects = data;
            console.log("in controler:" + $scope.prospects);
        })
            .error (function (error){
            console.log (error);});

        //uncategorized emails
        Emails.getUncategorizedEmails()
            .success (function (data){
            $scope.emails = data;
            //console.log("uncategorized emails:"+$scope.emails[0].stage);
           /* $scope.emails.forEach(function (eml) {
                console.log("subject:"+eml.subject);
            });*/
        })
            .error (function (error){
            console.log (error.msg);}
        );

        $scope.emailsSelected = new Array();

        $scope.prospectSelected=function(item){
            $scope.prospect = item._id;

        }
        $scope.selectEmail = function(email_id){
            $scope.emailsSelected[$scope.emailsSelected.length] = email_id;
        };
        $scope.moveEmail = function(){
            console.log("selected emails:"+$scope.emailsSelected);
            console.log("selected stage:"+$scope.stage);
            console.log("selected prospect:"+$scope.prospect);

            for(var i=0;i<$scope.emailsSelected.length;i++)
            {
                //update emails
                Emails.updateEmail($scope.emailsSelected[i], $scope.prospect , $scope.stage )
                    .success (function (data){
                    console.log("Email is moved"+data);
                })
                    .error (function (error){
                        console.log (error.msg);}
                );
            }
            alert("Email moved");
            $scope.prospect = '';
            $scope.stage = '';
            window.location.reload();

            //$scope.emailsSelected = new Array();
        };

    });
