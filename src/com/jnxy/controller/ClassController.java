package com.jnxy.controller;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.jnxy.service.ClassServiceImpl;
import com.jnxy.pojo.Class;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class ClassController {
	@Autowired
	private ClassServiceImpl classService;
	@RequestMapping("/classController/searchclass")
	public void searchClass(HttpServletRequest request,HttpServletResponse response) throws IOException{
		List<Class> classList=classService.getClassList();
		JSONArray jsonItems=new JSONArray();
		for(Class c:classList){
			jsonItems.add(JSONObject.fromObject(c));
		}
		JSONObject jsonBack =new JSONObject();
		
		jsonBack.put("data",jsonItems);
		response.getWriter().print(jsonBack);
	}
	@RequestMapping("/classController/searchClassInfo")
	public void searchClassInfo(HttpServletRequest request,HttpServletResponse response) throws IOException{
		int start=request.getParameter("start")==null?0:Integer.parseInt(request.getParameter("start"));
		int limit=request.getParameter("limit")==null?10:Integer.parseInt(request.getParameter("limit"));
		List<Class> classList=classService.getClassInfoList(start,limit);
		System.out.println(classList.size());
		JSONArray jsonItems=new JSONArray();
		for(Class c:classList){
			jsonItems.add(JSONObject.fromObject(c));
		}
		JSONObject jsonBack =new JSONObject();
		int totalCount=classService.classTotalCount();
		jsonBack.put("totalCount",totalCount);
		jsonBack.put("data",jsonItems);
		response.getWriter().print(jsonBack);
	}
	@RequestMapping("/classController/addClass")
	public void addClass(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String className=request.getParameter("className");
		int result=classService.addClass(className);
		System.out.println("新增了"+result+"个班级");
	}
	@RequestMapping("/classController/updateClass")
	public void updateClass(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String className=request.getParameter("className");
		int classId=Integer.parseInt(request.getParameter("ido"));
		if (classId!=0&&className!=null) {
			Class clas=new Class();
			clas.setClassId(classId);
			clas.setClassName(className);
			int result=classService.updateClass(clas);
			System.out.println("更新了"+result+"个班级");
		}
	}
	@RequestMapping("/classController/delClass")
	public void delUser(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String ids=request.getParameter("ids");
		String[] str=ids.split(",");
		int[] arr=new int[str.length];
		for(int i=0;i<str.length;i++){
			arr[i]=Integer.parseInt(str[i]);
		}
		int result=classService.delClass(arr);
		if (result != 0) {
			response.getWriter().write("{success:true,reason:'班级删除成功！'}");
		}else {
			response.getWriter().write("{success:false,reason:'班级删除失败！'}");
		}
	}
	@RequestMapping("classController/searchClassByLike")
	public void searchClassByLike(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String content=request.getParameter("content");
		List<Class> classList=classService.searchClassByLike(content);
		if (classList!=null) {
			JSONArray jsonItems=new JSONArray();
			for(Class c:classList){
				jsonItems.add(JSONObject.fromObject(c));
			}
			response.getWriter().write(jsonItems.toString());
		}
	}
}
