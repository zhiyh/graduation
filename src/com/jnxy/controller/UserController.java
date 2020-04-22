package com.jnxy.controller;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.jnxy.pojo.User;
import com.jnxy.pojo.UserInfo;
import com.jnxy.service.UserServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：UserController
 *类描述：用户的Controller类
 *创建人：zhiyanhui
 *创建时间：2018年1月20日上午11:34:59
 *修改人：zhiyanhui
 *修改时间：2018年1月20日上午11:34:59
 *修改备注：
 *@version
 */
@Controller
public class UserController{
	@Autowired
	private UserServiceImpl userService;
	@RequestMapping("/userController/login")
	public void login(HttpSession session,HttpServletRequest request,HttpServletResponse response) throws IOException{
		String userName=request.getParameter("username");
		String passWord=request.getParameter("password");
		User user =userService.login(userName, passWord);
		if (user==null){
			response.getWriter().write("{success:false,reason:'失败'}");	
		}else {
			session.setAttribute("loginUser", user);
			session.setAttribute("username", user.getUserName());
			response.getWriter().write("{success:true,reason:'成功'}");	
		}
	}
	@RequestMapping("/userController/loginOut")
	public void loginOut(HttpSession session,HttpServletRequest request,HttpServletResponse response) throws IOException{
		session.invalidate();	
		response.getWriter().write("{success:true,reason:'成功'}");	
	}
	@RequestMapping("/userController/selectUserName")
	public void selectUserName(HttpSession session,HttpServletRequest request,HttpServletResponse response) throws IOException{
		String userName=request.getParameter("userName");
		User user=null;
		user= userService.selectUserName(userName);
		if (user!=null) { 
			response.getWriter().write("{success:true,reason:'1'}");	
		}else {
			response.getWriter().write("{success:true,reason:'0'}");
		}
	}
	@RequestMapping("/userController/getPassword")
	public void getPassword(HttpSession session,HttpServletRequest request,HttpServletResponse response) throws IOException{
		String realName=request.getParameter("realName");
		String email=request.getParameter("email");
		String card=request.getParameter("card");
		String telephone=request.getParameter("telephone");
		String passWord=userService.getPassword(realName, card, email, telephone);
		if (passWord!=null&&!passWord.equals("")) { 
			response.getWriter().write("{success:true,reason:'您的密码是："+passWord+"'}");	
		}else {
			response.getWriter().write("{success:true,reason:'用户不存在'}");
		}
	}
	@RequestMapping("/userController/searchUsers")
	public void searchUsers(HttpServletRequest request,HttpServletResponse response) throws IOException{
		int start=request.getParameter("start")==null?0:Integer.parseInt(request.getParameter("start"));
		int limit=request.getParameter("limit")==null?10:Integer.parseInt(request.getParameter("limit"));
		List<UserInfo> userList=userService.getUserList(start,limit);
		JSONArray jsonItems=new JSONArray();
		for(UserInfo u:userList){
			jsonItems.add(JSONObject.fromObject(u));
		}
		JSONObject jsonBack =new JSONObject();
		int totalCount=userService.usersTotalCount();
		jsonBack.put("totalCount",totalCount);
		jsonBack.put("data",jsonItems);
		response.getWriter().print(jsonBack);
	}
	@RequestMapping("/userController/searchUserByLike")
	public void searchUserByLike(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String content=request.getParameter("content");
		List<UserInfo> userList=userService.searchUserByLike(content);
		if (userList!=null) {
			JSONArray jsonItems=new JSONArray();
			for(UserInfo u:userList){
				jsonItems.add(JSONObject.fromObject(u));
			}
			response.getWriter().write(jsonItems.toString());
		}
	}
	@RequestMapping("/userController/addUser")
	public void addUser(HttpServletRequest request,HttpServletResponse response,User user) throws IOException{
		String className=request.getParameter("className"); 
		user.setClassId(Integer.parseInt(className));
		String birth=request.getParameter("birth");
		Date date=null;
		SimpleDateFormat dataforment=new SimpleDateFormat("yyyy-MM-dd");
		try {
			date=dataforment.parse(birth);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		user.setBirth(dataforment.format(date));
		SimpleDateFormat format =new SimpleDateFormat("yyyy");
		Date date2 =new Date();
		String year= format.format(date2);
		StringBuffer buffer=new StringBuffer();
		if (user.getAuthority().equals("学生")) {
			String classid=String.valueOf(user.getClassId());
			if (classid.length()==1) {
				StringBuffer buffer1=new StringBuffer();
				classid=buffer1.append("0").append(classid).toString();
			}
			String stuCount=String.valueOf(userService.searchstuCountByClassId(user.getClassId())+1);
			if (stuCount.length()==1) {
				StringBuffer buffer1=new StringBuffer();
				stuCount=buffer1.append("0").append(stuCount).toString();
			}
			buffer.append(year).append(classid).append(stuCount+"").append("1");
		}else if (user.getAuthority().equals("老师")) {
			String classid=String.valueOf(user.getClassId());
			if (classid.length()==1) {
				StringBuffer buffer1=new StringBuffer();
				classid=buffer1.append("0").append(classid).toString();
			}
			String teaCount=String.valueOf(userService.searchteaCountByClassId(user.getClassId())+1);
			if (teaCount.length()==1) {
				StringBuffer buffer1=new StringBuffer();
				teaCount=buffer1.append("0").append(teaCount).toString();
			}
			buffer.append(year).append(classid).append(teaCount+"").append("2");
		}else {
			int num=(int)((Math.random()*9+1)*1000);
			buffer.append("11").append(String.valueOf(num)).append("3");
		}
		user.setUserNumber(buffer.toString());
		int result=userService.addUser(user);
		System.out.println("添加了"+result+"条记录");
	}
	@RequestMapping("/userController/delUser")
	public void delUser(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String ids=request.getParameter("ids");
		String[] str=ids.split(",");
		int[] arr=new int[str.length];
		for(int i=0;i<str.length;i++){
			arr[i]=Integer.parseInt(str[i]);
		}
		int result=userService.delUser(arr);
		if (result != 0) {
			response.getWriter().write("{success:true,reason:'用户删除成功！'}");
		}else {
			response.getWriter().write("{success:false,reason:'用户删除失败！'}");
		}
	}
	@RequestMapping("/userController/updateUser")
	public void updateUser(HttpServletRequest request,HttpServletResponse response,User user) throws IOException{
		String birth=request.getParameter("birth");
		String ido=request.getParameter("ido");
		user.setId(Integer.parseInt(ido));
		Date date=null;
		SimpleDateFormat dataforment=new SimpleDateFormat("yyyy-MM-dd");
		try {
			date=dataforment.parse(birth);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		user.setBirth(dataforment.format(date));
		String className=request.getParameter("className"); 
		user.setClassId(Integer.parseInt(className));
		int result=userService.updateUserById(user);
		System.out.println("修改了"+result+"条记录");
	}
	@RequestMapping("/userController/searchUserByid")
	public void searchUserByid(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String loginUserId=request.getParameter("loginUserId");
		User user =userService.searchUserByid(Integer.parseInt(loginUserId));
		if (user!=null) {
			JSONArray jsonItems=new JSONArray();
			jsonItems.add(JSONObject.fromObject(user));
			response.getWriter().write(jsonItems.toString());
		}
	}
	@RequestMapping("/userController/updataUserByid")
	public void updataUserByid(HttpServletRequest request,HttpServletResponse response,User user) throws IOException{
		String birth=request.getParameter("birth");
		Date date=null;
		SimpleDateFormat dataforment=new SimpleDateFormat("yyyy-MM-dd");
		try {
			date=dataforment.parse(birth);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		user.setBirth(dataforment.format(date));
		userService.updateUserInfoById(user);
	}
	@RequestMapping("/userController/updataPasswordByid")
	public void updataPasswordByid(HttpServletRequest request,HttpServletResponse response) throws IOException{
		int id=Integer.parseInt(request.getParameter("id"));
		String passWord=request.getParameter("passWord");
		String passWord1=request.getParameter("passWord1");
		if (passWord==null||passWord1==null) {
			response.getWriter().write("{success:true,reason:'密码不可以为空！'}");
		}else{
			String oldPassword=userService.searchPasswordById(id);
			if (oldPassword.equals(passWord)) {
				userService.updatePasswordById(passWord1, id);
				response.getWriter().write("{success:true,reason:'修改成功！'}");
			}else {
				response.getWriter().write("{success:true,reason:'原密码输入不正确！'}");
			}
		}
		
	}
}
