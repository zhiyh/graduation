<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.jnxy.pojo.User"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
User loginUser=(User)session.getAttribute("loginUser");
int loginUserId=0;
int classId=0;
String authority=null;
String realName="";
if (loginUser!=null){
	 loginUserId=loginUser.getId();
	 classId=loginUser.getClassId();
	 authority=loginUser.getAuthority();
	 realName=loginUser.getRealName();
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhml">
<head >
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8" />
<title>作业管理系统</title>
<link rel="stylesheet" type="text/css" href="css/index.css">
<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">
<script type="text/javascript" src="extjs/ext-all.js"></script>
<script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>
<script language="javascript">
	var path='<%=path %>';
	var loginUserId='<%=loginUserId%>';
	var authority='<%=authority%>';
	var classId='<%=classId%>';
	var realName='<%=realName%>';
	var workId=0;
</script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/UserMangerGrid.js"></script>
<script type="text/javascript" src="js/UsersAction.js"></script>
<script type="text/javascript" src="js/ClassMangerGrid.js"></script>
<script type="text/javascript" src="js/ClassActionWin.js"></script>
<script type="text/javascript" src="js/LoginUserInformation.js"></script>
<script type="text/javascript" src="js/LoginUserPassword.js"></script>
<script type="text/javascript" src="js/WorkMangerGrid.js"></script>
<script type="text/javascript" src="js/StuWorkGrid.js"></script>
<script type="text/javascript" src="js/WorkActionWin.js"></script>
<script type="text/javascript" src="js/StuWorkActionWin.js"></script>
<script type="text/javascript" src="js/StuWorkViewWin.js"></script>
<script type="text/javascript" src="js/CorrectWorkMangerGrid.js"></script>
<script type="text/javascript" src="js/CorrectStuWorkActionWin.js"></script> 
<script type="text/javascript" src="js/SelectScoreGrid.js"></script>
<script type="text/javascript" src="js/SelectScoreActionWin.js"></script>             
<script type="text/javascript" src="js/pulic.js"></script>
<script language="javascript">var role=homework.js.role;</script>
</head> 
<body>
</body>
</html>