/**
 * Created by wangshuai on 2015/8/25.
 */

function showIdCard(obj,userId){
  $.ajax({
    url:"businessCard.json",
    data:{uid:userId},
    success:function(data){
      data = eval(data);
      var card = "";
      card += "<div class='businessCard'>";
      card += "<a href='authorHome.htm?theId="+ userId +"' target='_blank'><img src=http://moerfile.jiemian.com/staticFile"+ data.head +"/></a>";
      card += "<div class='bcard-user'><h3><a href='authorHome.htm?theId="+ userId +"' target='_blank'>"+ data.name +"</a>";
      if(data.user_level == 2){
        card += "<i></i></h3>";
      }else{
        card += "</h3>";
      }
      if(data.persion_describe.length > 30){
        data.persion_describe = data.persion_describe.substring(0,28)+"...";
      }
      card += "<p>"+data.persion_describe+"</p></div>";
      card += "<div class='business-message'><a href='authorHome.htm?theId="+ userId +"&returnAuPage=authorComment' target='_blank'>问答<strong>"+ data.wd +"</strong></a>";
      if(data.user_level == 2){
        card += "<a href='authorHome.htm?theId="+ userId +"&returnAuPage=authorArticle' target='_blank'>文章<strong>"+ data.articleCount +"</strong></a>";
      }else{
        card += "<a href='authorHome.htm?theId="+ userId +"&returnAuPage=authorArticle' target='_blank'>关注<strong>"+ data.follow +"</strong></a>";
      }
      if(Number(data.fans) > 100000){
        data.fans = Math.ceil(Number(data.fans)/10000) + "万";
      }
      card += "<a href='javascript:void(0)'>粉丝<strong>"+ data.fans +"</strong></a></div>";
      if(data.attention == 1){
        card += "<button type='button' class='bAttention bAttention-y' uid='"+ userId +"'>已关注</button>";
      }else{
        card += "<button type='button' class='bAttention bAttention-n' uid='"+ userId +"'>加关注</button>";
      }
      card += "<button type='button' class='bPrivateletter' uid='"+ userId +"'>私信</button></div>";
      console.log(card);
      $("body").html(card);
    }
  })
}
showIdCard(this,123);