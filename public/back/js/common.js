/**
 * Created by 刘成义 on 2018/3/4.
 */
$(function(){
  //侧边栏的控制功能
  $(".on_off").on("click",function(){
    if($(".lt_aside").offset().left==0){
      $(".lt_aside").css("left","-180px");
      $(".set").css("padding-left","10px");
      $(".content").css("padding-left","0");
    }else{
      $(".lt_aside").css("left","0").show;
      $(".set").css("padding-left","190px");
      $(".content").css("padding-left","180px");
    }
  })

//二级菜单逻辑
  $(".nav_b").on("click",function(){
    $(".nav_b").height()==40? $(".nav_b").css("height","120px"):$(".nav_b").css("height","40px");
  })
//推出功能
  $(".lt_detrusion").on("click",function(){
    $.ajax({
      type:'GET',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href="login.html";
        }

      }
    })
  })

//验证登陆状态
  if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"GET",
      url:"/employee/checkRootLogin",
      success:function (info) {
        //判断，info.error是否是400
        if(info.error === 400) {
          location.href = "login.html";
        }
      }
    })
  }
})
