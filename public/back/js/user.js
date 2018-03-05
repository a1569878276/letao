/**
 * Created by 刘成义 on 2018/3/5.
 */
$(function(){
  var page = 1;
  var pageSize = 5;

  $.ajax({
    type:'GET',
    url:'/user/queryUser',
    data:{
      page:page,
      pageSize:pageSize
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var html=template("user",info);

      $('tbody').html(html);
    }
  })
})