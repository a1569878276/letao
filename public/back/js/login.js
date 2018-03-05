/**
 * Created by 刘成义 on 2018/3/4.
 */
$(function () {
  //校验表单
  $('form').bootstrapValidator({
    //配置校验规则
    fields: {
      //form中对应的属性
      username: {
        //校验器
        validators: {
          //非空规则
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 4,
            max: 7,
            message: '账号长度为4-7'
          }
        }
      },
      password: {
        //校验器
        validators: {
          //非空规则
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '密码长度为2-6位'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  })

  //给表单注册提交成功事件
  $('form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('form').serialize(),
      success:function(info){
        if(info.error===1000){
          alert("用户名不存在");
        }
        if(info.error===1001){
          alert("密码名不存在");
        }
        if(info.success){
          location.href = "index.html";
        }

      }
    })
  })

  //表单重置按钮
  $("[type='reset']").on("click",function(e){
    e.preventDefault();
    console.log("xxx");
    $("form").data("bootstrapValidator").resetForm(true);
  })
})


