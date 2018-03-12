/**
 * Created by 刘成义 on 2018/3/7.
 */
//商品管理js
$(function(){
  //商品渲染的封装
  var page= 1;
  var pageSize=2;
  var result = [];
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){

        $('tbody').html(template('tmp',info));

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

  //二级分类的获取
  $.ajax({
    type:'get',
    url:'/category/querySecondCategoryPaging',
    data:{
      page:1,
      pageSize:100
    },
    success:function(info){
      //console.log(info);
      $('.class2').html(template('tmp2',info));
    }
  })

  //二级分类选择选中功能
  $('.class2').on('click','a',function(){
    $('.dropdown-text').text($(this).text());
    $("[name='brandId']").val($(this).data("id"));
    //让brandId验证成功；
    $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  //初始化上传图片
  $("#xFile").fileupload({
    dataType:'json',
    done:function(e,data){
      if(result.length >= 3){
        return;
      }
      var pic =data.result.picAddr;
      $('<img src="'+pic+'" alt="" width=100>').appendTo(".img-box");
      //图片上传为3张
      result.push(data.result);
      if(result.length === 3){
        $("form").data("bootstrapValidator").updateStatus("productLogo","VALID")
      }else{
        $("form").data("bootstrapValidator").updateStatus("productLogo","INVALID")
      }



    }
  })

  //表单验证

  var $form = $("form");
  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //校验1i
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择品牌"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
              regexp:/^[1-9]\d*$/,
              message:'请输入一个有效的商品库存'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入一个有效的尺码 例如：34-40'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          },
          regexp:{
            regexp:/^\d*$/,
            message:'请输入一个有效的商品价格'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          },
          regexp:{
            regexp:/^\d*$/,
            message:'请输入一个有效的商品价格'
          }
        }
      },
      productLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
    }

  })


    //给表单注册校验成功事件
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    var param =$form.serialize();

    param += "&picName1=" + result[0].picName + "&picAddr1=" + result[0].picAddr;
    param += "&picName2=" + result[1].picName + "&picAddr2=" + result[1].picAddr;
    param += "&picName3=" + result[2].picName + "&picAddr3=" + result[2].picAddr;

    console.log(param);

    $.ajax({
      type:'POST',
      url:'/product/addProduct',
      data:param,
      success:function(info){
        console.log(info);

        if(info.success) {
          //1. 关闭模态框
          $("#productModal").modal('hide');
          //2. 重新渲染第一页
          page = 1;
          render();

          //3. 重置样式
          $("form").data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择二级分类");
          $(".img-box img").remove();

          result = [];
        }
      }
    })

  })
  })