/**
 * Created by wangshuai on 2015/9/6.
 */

var app = angular.module("moerApp",[]);

app.controller("userInfo",function($scope,$http){
  $scope.userinfo = [];
  $http.get("/businessCard.json").success(function(result){
    if(result.success == true){
      $scope.userinfo = eval(result.data);
    }
  }).error(function(){});
});

//自选股大盘指数 JSON
app.controller("stockIndex",function($scope,$http){
  $scope.stockdp = [];
  $http.get("/wapcommon_findStockIndexJson.json").success(function(result){
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
  $http.get("/frontindex_showOptionalStockNavJson.json").success(function(result){
    if(result.success == true){
      result = eval(result);
      $scope.stockMy = result.data;
    }
  }).error(function(){
    console.warn("error");
    $scope.stockMy = result.message;
  })
});

//搜索 JSON
app.controller("headerSearch",function($scope,$http){
  $scope.searchKey = "";
  $scope.search = [];
  $scope.searchdisplay = {display:"none"};
  $scope.searchStart = function(){
    alert("提交内容"+$scope.searchKey);
  }
  $scope.searchTo = function(e){
    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){
      $scope.searchStart();
    }
  };
  $scope.$watch("searchKey",function(val){
    console.log(val);
    if(val.length > 0){
      $scope.searchdisplay = {display:"block"};
    }else{
      $scope.searchdisplay = {display:"none"};
    }
    $http.get("/search.json").success(function(result){
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
});

//股票搜索 stock_findVstock.json

//市场动态和财经要闻
app.controller("marketNews",function($scope,$http){
  $scope.market = [];
  $scope.finance = [];
  $http.get("/marketDyna_getMarketIndexDynaListJson.json").success(function(result){
    if(result.success == true){
      var data = eval(result.data.list);
      for(var i=0;i<data.length;i++){
        $scope.market[i] = data[i];
      }
    }
  }).error(function(){
    console.warn("error");
  });
  $http.get("/investment_findIndexFinanceListJson.json").success(function(result){
    if(result.success == true){
      var data = eval(result.data.list);
      for(var i=0;i<data.length;i++){
        $scope.finance[i] = data[i];
      }
    }
  }).error(function(){
    console.warn("error");
  });
});

//排行榜
app.controller("moerRanking",function($scope,$http){
  $scope.rankweek = [];
  $scope.rankmonth = [];
  $scope.rankyear = [];
  $http.get("/frontindex_articleRankingJson.json?day=7").success(function(result){
    if(result.success == true){
      var data = eval(result.data);
      var i = 0;
      for(var w in data){
        $scope.rankweek[i] = data[w];
        i++;
      }
    }
  }).error(function(){});
  $http.get("/frontindex_articleRankingJson.json?day=30").success(function(result){
    if(result.success == true){
      var data = eval(result.data);
      var i = 0;
      for(var m in data){
        $scope.rankmonth[i] = data[m];
        i++;
      }
    }
  }).error(function(){});
  $http.get("/frontindex_articleRankingJson.json?day=365").success(function(result){
    if(result.success == true){
      var data = eval(result.data);
      var i = 0;
      for(var y in data){
        $scope.rankyear[i] = data[y];
        i++;
      }
    }
  }).error(function(){});
});

//热门问题
app.controller("hotQuestion",function($scope,$http){
  $scope.hotquestion = [];
  $http.get("/findHotQuestion.json").success(function(result){
    if(result.success == true){
      $scope.hotquestion = result.data.list;
    }
  }).error(function(){});
});

//顶部导航
app.controller("headerMsg",function($scope,$http){
  $http.get("/promptInfo.json").success(function(result){
    if(result.success == true){
      var data = eval(result.data);
      $scope.shopping = data.shoppingCnt;
      $scope.letter = data.letterCount;
      $scope.msg = data.msgCount;
      $scope.msgCount = data.msgList;
    }
  }).error(function(){});
});
