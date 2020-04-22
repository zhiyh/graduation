<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhml">
<head>
   <base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>欢迎登录作业管理系统</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">

<script type="text/javascript" src="extjs/ext-all.js"></script>
<script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/UsersAction.js"></script>
<script language="javascript">var path='<%=path %>';</script>
<script type="text/javascript" src="js/pulic.js"></script>
<script language="javascript">var role=homework.js.roleUser;</script>
<script language="JavaScript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/GetPasswordAction.js"></script>
<script src="js/cloud.js" type="text/javascript"></script>

<script language="javascript">
	$(function(){
    $('.loginbox').css({'position':'absolute','left':($(window).width()-660)/2});
	$(window).resize(function(){  
    $('.loginbox').css({'position':'absolute','left':($(window).width()-660)/2});
    })  
});  
	
</script> 
</head>
<body style="background-color:#1c77ac; background-image:url(images/light.png); background-repeat:no-repeat; background-position:center top; overflow:hidden;">
	<div id="mainBody">
	  <div id="cloud1" class="cloud"></div>
	  <div id="cloud2" class="cloud"></div>
	</div>  
	<div class="logintop">    
    	<span>欢迎登录作业管理系统平台</span>      
    </div>
    <div class="loginbody">
	    <span class="systemlogo"></span>   
	    <div class="loginbox"> 
		    <ul>
			    <li><input id="username"  type="text" class="loginuser"  style="width:345px;color:#999" value="用户名/邮箱/电话/学号" 
                           onfocus='if(this.value=="用户名/邮箱/电话/学号"){this.value="";this.style.color="#000"};'	
                           onblur='if(this.value==""){this.value="用户名/邮箱/电话/学号";this.style.color="#999"};'	onkeydown=KeyDown() /></li>
			    <li><input id="password1" type="text" class="loginpwd"  style="width:345px;color:#999" value="请输入密码" />
			        <input id="password" type="password" class="loginpwd" style="display:none;width:345px;color:#999" onkeydown=keyLogin() />
			    </li>
			    <li><input id ="login" type="button" class="loginbtn" value="登录"  onclick="login()"/>
			        <input type="button" class="loginbtn" value="注册"  onclick="register()"/>
			        <input type="button" class="loginbtn" value="找回密码" onclick="getPassword()"/>
			    </li>
		    </ul>
	    </div>
    </div>
    <div class="loginbm">版权所有济宁学院计算机科学系</div>
</body>
<script language="javascript">
	var password1 = document.getElementById("password1"), pwd = document.getElementById("password");
	password1.onfocus = function(){
		if(this.value != "请输入密码") return;
		this.style.display = "none";
		pwd.style.display = "";
		pwd.value = "";
		pwd.focus();
	}
	pwd.onblur = function(){
		if(this.value != "") return;
		this.style.display = "none";
		password1.style.display = "";
		password1.value = "请输入密码";
	}
	function login(){
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		console.log(username);
		if(username==null||username==""||username=="用户名/邮箱/电话/学号"){
			Ext.Msg.alert("警告","用户名不能为空");
		}else if(password==null||password==""){
			Ext.Msg.alert("警告","密码不能为空");
		}else{
			Ext.Ajax.request({
				url:path+'/userController/login.do',
				method:'post',
				success:function(res){
					var result=Ext.JSON.decode(res.responseText);
					if(result.reason=="成功"){
						window.location.href=path+'/index.jsp';
					}else{
						Ext.Msg.alert("登录失败","用户名或密码错误");
					}
				},
				params:{
					username:username,
					password:password
				}
			})
		}
	}
	function register(){
		new homework.js.UsersActionWin({
			title:'添加用户',
			actionText:'添加用户',
			edtionUserName:false
		}).show();
	}
    function getPassword(){
    	new homework.js.GetPasswordAction({
			title:'找回密码',
			actionText:'找回'
		}).show();
	}
    function KeyDown(){
      if (event.keyCode == 13)
      {
    	  document.getElementById("password1").focus();
      }
    }
    function keyLogin(){
   	  if (event.keyCode==13){//回车键的键值为13
   		 document.getElementById("login").click(); //调用登录按钮的登录事件
   	  }  
   }
</script> 
</html>