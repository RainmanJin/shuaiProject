/**
 * Created by wangshuai on 2015/9/6.
 */

angular.module("Myapp",[]).controller("MyCtrl",function($scope,$http){
  $scope.msg = {title:"hello",color:"red"};
  $scope.cli = function(){
      $scope.msg.color = "blue";
  };
  $scope.user = [];
  $http.get("./js/mytest.json").success(function(data){
    console.log("123");
    data = eval(data);
    //$scope.user = data.name;
    for(var i=0;i<data.length;i++){
      $scope.user[i] = data[i].name;
    }
  }).error(function(){
    console.warn("error");
    $scope.user = "error";
  })
});
