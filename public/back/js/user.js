/**
 * Created by 刘成义 on 2018/3/5.
 */
$(function(){
  var page = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      type:'GET',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){

        var html=template("user",info);
        $('tbody').html(html);

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:page,//当前页
          totalPages:Math.ceil(info.total / pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,p){
            //为按钮绑定点击事件 page:当前点击的按钮值
            page=p;
            render()
          }
        });
      }
    })
  }
  render()

  var id =0;
  var set =0;
  $('tbody').on('click','.set',function(){
    id =$(this).data("id");
    set =$(this).hasClass("btn-success")?1:0;
    //var set = $(this).data("isdelete");
    //console.log(id);

  })

  $('.set_confirm').on("click",function(){
    $.ajax({
      type:"POST",
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:set
      },
      success:function(info){
        console.log(info);
        $('#myModal2').modal('hide');
        render()
      }
    })
  })
})