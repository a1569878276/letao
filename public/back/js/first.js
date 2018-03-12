/**
 * Created by 刘成义 on 2018/3/12.
 */
$(function(){
  var page = 1;
  var pageSize=4;
 //动态渲染数据方法封装；
  function reader(){

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('tmp',info))
      }
    })
  }

//给添加按钮注册带你几事件；
  $('.btn-first').on('click',function(){
    var categoryName = $('.addName').val();//拿到输入的值；
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:{categoryName:categoryName},
      success:function(info){
        $('#myModal2').modal('hide')
        reader()
      }
    })
  })

reader()
})
