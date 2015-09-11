/**
 * Created by wangshuai on 2015/9/6.
 */

var app = angular.module("moerApp",[]);
//自选股大盘指数 JSON
app.controller("stockIndex",function($scope,$http){
  $scope.stockdp = [];
  $http.get("./json/wapcommon_findStockIndexJson.json").success(function(data){
    if(data.success == true){
      data = eval(data);
      var data1 = data.data;
      var n = 0;
      for(var i in data1){
        $scope.stockdp[n] = data1[i];
        n++;
      }
    }
  }).error(function(){
    console.warn("error");
    $scope.stockdp = "error";
  })
});

//文章收益排行榜 JSON
app.controller("articleRanking",function($scope,$http){
  $scope.hotArticle = [];
  $http.get("./json/frontindex_articleRankingJson.json").success(function(data){
    if(data.success == true){
      data = eval(data);
      var data1 = data.data;
      var n = 0;
      for(var i in data1){
        $scope.hotArticle[n] = data1[i];
        n++;
      }
    }
  }).error(function(){
    console.warn("error");
    $scope.stockdp = "error";
  })
});
