/**
 * Created by wangshuai on 2015/8/24.
 */


function validate(){
  this.wdtitle = function(t){
    var titleLength = t.length;
    var titleLast = t.charAt((titleLength-1));
    return (titleLast == "?" || titleLast == "？");
  };
  this.userpwd = function(p){
    var pwdTest=/^[a-zA-Z\d]{5,16}$/;
    return pwdTest.test(p);
  }
}

var moerValidate = new validate();