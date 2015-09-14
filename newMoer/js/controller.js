/**
 * Created by wangshuai on 2015/9/6.
 */

var app = angular.module("moerApp",[]);
//自选股大盘指数 JSON
app.controller("stockIndex",function($scope,$http){
  $scope.stockdp = [];
  $http.get("./json/wapcommon_findStockIndexJson.json").success(function(result){
    if(result.success == true){
      result = eval(result);
      var data = result.data;
      var n = 0;
      for(var i in data){
        $scope.stockdp[n] = data[i];
        n++;
      }
    }
  }).error(function(){
    console.warn("error");
    $scope.stockdp = "error";
  })
});

//自选股组合 JSON
app.controller("stockMy",function($scope,$http){
  $scope.stockMy = [];
  $http.get("./json/frontindex_showOptionalStockNavJson.json").success(function(result){
    if(result.success == true){
      result = eval(result);
      var data = result.data;
      var n = 0;
      for(var i in data){
        $scope.stockMy[n] = data[i];
        n++;
      }
    }
  }).error(function(){
    console.warn("error");
    $scope.stockMy = result.message;
  })
});

/搜索 JSON
app.controller("headerSearch",function($scope,$http){
  $scope.searchKey = "";
  $scope.search = [];
  $http.get("./json/search.json").success(function(result){
    if(result.success == true){
      var data = result.message;
      for(var i in data){
        $scope.search[i] = data[i];
      }
    }
  }).error(function(){
    console.warn("error");
    $scope.search = result.success;
  })
});
