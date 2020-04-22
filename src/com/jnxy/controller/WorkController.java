package com.jnxy.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.jnxy.pojo.Homework;
import com.jnxy.pojo.StuWork;
import com.jnxy.service.WorkServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 
 *项目名称：HomeworkManagerSystem
 *类名称：WorkController
 *类描述：
 *创建人：zhiyanhui
 *创建时间：2018年4月8日下午9:04:11
 *修改人：zhiyanhui
 *修改时间：2018年4月8日下午9:04:11
 *修改备注：
 *@version
 */
@Controller
public class WorkController {
	@Autowired
	private WorkServiceImpl workService;
	@RequestMapping("/workController/searchWorkInfoById")
	public void searchWorkInfoById(HttpServletRequest request,HttpServletResponse response) throws IOException{
		int teaId=Integer.parseInt(request.getParameter("loginUserId"));
		int start=request.getParameter("start")==null?0:Integer.parseInt(request.getParameter("start"));
		int limit=request.getParameter("limit")==null?10:Integer.parseInt(request.getParameter("limit"));
		List<Homework> homeworkList=workService.getHomeworkList(teaId, start, limit);
		JSONArray jsonItems=new JSONArray();
		for(Homework u:homeworkList){
			jsonItems.add(JSONObject.fromObject(u));
		}
		JSONObject jsonBack =new JSONObject();
		int totalCount=workService.getWorkTotalCount(teaId);
		jsonBack.put("totalCount",totalCount);
		jsonBack.put("data",jsonItems);
		response.getWriter().print(jsonBack);
		System.out.println(0);
	}
	@RequestMapping("/workController/addWork")
	public void addWork(@RequestParam("upload") MultipartFile file,HttpServletRequest request,HttpServletResponse response) throws IOException{
		try {
			String path="C:/WorkSpace/HomeworkManagerSystem/WebContent/upload/";
			//文件重命名  
		    //时间(毫秒数)+随机数  
		    //1970-1-1~今天   System.currentTimeMillis();  
			String username=(String) request.getSession().getAttribute("username");
		    String newFileName = System.currentTimeMillis()+new Random().nextInt(1000000)+username; 
		    String fileName =file.getOriginalFilename();//文件的全名
		    String img_path="";
		    if (fileName!=null&&!"".equals(fileName)) {
		    	String imgname=newFileName+fileName.substring(fileName.lastIndexOf("."));
            	File dir = new File(path,imgname);
    		    if (!dir.exists()) {
    				dir.mkdirs();
    			}
    	        //MultipartFile自带的解析方法  
         	    file.transferTo(dir);
         	    img_path="/upload/"+imgname;
			}
			SimpleDateFormat dataforment=new SimpleDateFormat("yyyy-MM-dd");
		    String workTitle=request.getParameter("workTitle");
		    int loginUserId=Integer.parseInt(request.getParameter("loginUserId"));
		    int classId=Integer.parseInt(request.getParameter("classId"));
		    Date stareTime=dataforment.parse(request.getParameter("stareTime"));
		    Date endTime=dataforment.parse(request.getParameter("endTime"));
		    Homework homework = new Homework();
		    homework.setImg_path(img_path);
		    homework.setClassId(classId);
		    homework.setEndTime(endTime);
		    homework.setWorkTitle(workTitle);
		    homework.setTeaId(loginUserId);
		    homework.setStareTime(stareTime);
		    workService.addWork(homework);
		    response.getWriter().write("{success:true,reason:'"+img_path+"'}");
		} catch (ParseException e) {
			e.printStackTrace();
		}		
	}
	@RequestMapping("/workController/pulishWork")
	public void pulishWork(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String ids=request.getParameter("ids");
		String[] str=ids.split(",");
		int[] arr=new int[str.length];
		for(int i=0;i<str.length;i++){
			arr[i]=Integer.parseInt(str[i]);
		}
		int result=workService.pulishWork(arr);
		if (result != 0) {
			response.getWriter().write("{success:true,reason:'发布成功！'}");
		}else {
			response.getWriter().write("{success:false,reason:'发布失败！'}");
		}
	}
	@RequestMapping("/workController/cancelWork")
	public void cancelWork(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String ids=request.getParameter("ids");
		String[] str=ids.split(",");
		int[] arr=new int[str.length];
		for(int i=0;i<str.length;i++){
			arr[i]=Integer.parseInt(str[i]);
		}
		int result=workService.cancelWork(arr);
		if (result != 0) {
			response.getWriter().write("{success:true,reason:'取消成功！'}");
		}else {
			response.getWriter().write("{success:false,reason:'取消失败！'}");
		}
	}
	@RequestMapping("/workController/delWork")
	public void dellWork(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String ids=request.getParameter("ids");
		String[] str=ids.split(",");
		int[] arr=new int[str.length];
		for(int i=0;i<str.length;i++){
			arr[i]=Integer.parseInt(str[i]);
		}
		int result=workService.delWork(arr);
		if (result != 0) {
			response.getWriter().write("{success:true,reason:'删除成功！'}");
		}else {
			response.getWriter().write("{success:false,reason:'删除失败！'}");
		}
	}
	@RequestMapping("/workController/updateWork")
	public void updateWork(@RequestParam("upload") MultipartFile file,HttpServletRequest request,HttpServletResponse response) throws IOException{
		try {
			String path="C:/WorkSpace/HomeworkManagerSystem/WebContent/upload/";
			//文件重命名  
		    //时间(毫秒数)+随机数  
		    //1970-1-1~今天   System.currentTimeMillis();  
			String username=(String) request.getSession().getAttribute("username");
		    String newFileName = System.currentTimeMillis()+new Random().nextInt(1000000)+username; 
		    String fileName =file.getOriginalFilename();//文件的全名
		    String img_path="";
		    if (fileName!=null&&!"".equals(fileName)) {
		    	String imgname=newFileName+fileName.substring(fileName.lastIndexOf("."));
            	File dir = new File(path,imgname);
    		    if (!dir.exists()) {
    				dir.mkdirs();
    			}
    	        //MultipartFile自带的解析方法  
         	    file.transferTo(dir);
         	    img_path="/upload/"+imgname;
			}
			SimpleDateFormat dataforment=new SimpleDateFormat("yyyy-MM-dd");
		    String workTitle=request.getParameter("workTitle");
		    int workId=Integer.parseInt(request.getParameter("workId"));
		    Date stareTime=dataforment.parse(request.getParameter("stareTime"));
		    Date endTime=dataforment.parse(request.getParameter("endTime"));
		    Homework homework = new Homework();
		    homework.setImg_path(img_path);
		    homework.setWorkId(workId);
		    homework.setEndTime(endTime);
		    homework.setWorkTitle(workTitle);
		    homework.setStareTime(stareTime);
		    workService.updateWork(homework);
		    response.getWriter().write("{success:true,reason:'"+img_path+"'}");
		} catch (ParseException e) {
			e.printStackTrace();
		}		
	}
	@RequestMapping("/workController/searchWorkByLike")
	public void searchUserByLike(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String content=request.getParameter("content");
		List<Homework> workList=workService.searchWorkByLike(content);
		if (workList!=null) {
			JSONArray jsonItems=new JSONArray();
			for(Homework u:workList){
				jsonItems.add(JSONObject.fromObject(u));
			}
			response.getWriter().write(jsonItems.toString());
		}
	}
	@RequestMapping("/workController/searchStuWorkByClassId")
	public void searchStuWorkByClassId(HttpServletRequest request,HttpServletResponse response) throws IOException{
		try {
			int classId=Integer.parseInt(request.getParameter("classId"));
			int start=request.getParameter("start")==null?0:Integer.parseInt(request.getParameter("start"));
			int limit=request.getParameter("limit")==null?10:Integer.parseInt(request.getParameter("limit"));
			SimpleDateFormat dataforment=new SimpleDateFormat("yyyy-MM-dd");
			Date time=dataforment.parse(dataforment.format(new Date())) ;
			List<Homework> homeworkList=workService.getStuHomeworkList(time,classId, start, limit);
			JSONArray jsonItems=new JSONArray();
			for(Homework u:homeworkList){
				jsonItems.add(JSONObject.fromObject(u));
			}
			JSONObject jsonBack =new JSONObject();
			int totalCount=workService.getStuWorkTotalCount(classId);
			jsonBack.put("totalCount",totalCount);
			jsonBack.put("data",jsonItems);
			response.getWriter().print(jsonBack);
			System.out.println(0);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
	}
	@RequestMapping("/workController/stuAddWork")
	public void stuAddWork(HttpServletRequest request,HttpServletResponse response) throws IOException{
		int workId=Integer.parseInt(request.getParameter("workId"));
		int stuId=Integer.parseInt(request.getParameter("loginUserId"));
		int classId=Integer.parseInt(request.getParameter("classId"));
		int teaId=Integer.parseInt(request.getParameter("teaId"));
		String stuAnswer=request.getParameter("stuAnswer");
		int result=workService.getStuWorkCount(workId, stuId);
		StuWork work=new StuWork();
		work.setClassId(classId);
		work.setStuAnswer(stuAnswer);
		work.setStuId(stuId);
		work.setWorkId(workId);
		work.setTeaId(teaId);
		if (result==0) {//执行插入操作
			workService.addStuWork(work);
		}else{//执行更新新操作
			workService.updateStuWork(work);
		}
	}
	@RequestMapping("/workController/selectStuWorkSelf")
	public void selectStuWorkSelf(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String stuId=request.getParameter("loginUserId");
		String workId=request.getParameter("workId");
		StuWork work =workService.selectStuWorkSelf(Integer.parseInt(workId), Integer.parseInt(stuId));
		if (work==null) {
			StuWork work2=new StuWork();
			work2.setStuAnswer("");
			JSONArray jsonItems=new JSONArray();
			jsonItems.add(JSONObject.fromObject(work2));
			response.getWriter().write(jsonItems.toString());
		}else {
			JSONArray jsonItems=new JSONArray();
			jsonItems.add(JSONObject.fromObject(work));
			response.getWriter().write(jsonItems.toString());
		}
	}
	@RequestMapping("/workController/correctStuWorkInit")
	public void correctStuWorkInit(HttpServletRequest request,HttpServletResponse response) throws IOException{
			int workId=Integer.parseInt(request.getParameter("workId"));
			int start=request.getParameter("start")==null?0:Integer.parseInt(request.getParameter("start"));
			int limit=request.getParameter("limit")==null?10:Integer.parseInt(request.getParameter("limit"));
			
			List<StuWork> homeworkList=workService.correctStuWorkInit(workId, start, limit);
			JSONArray jsonItems=new JSONArray();
			for(StuWork u:homeworkList){
				jsonItems.add(JSONObject.fromObject(u));
			}
			JSONObject jsonBack =new JSONObject();
			int totalCount=workService.getStuWorkfromStuwork(workId);
			jsonBack.put("totalCount",totalCount);
			jsonBack.put("data",jsonItems);
			response.getWriter().print(jsonBack);
		
	}
	@RequestMapping("/workController/selectStuWorkOrCorrect")
	public void selectStuWorkOrCorrect(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String stuId=request.getParameter("stuId");
		String workId=request.getParameter("workId");
		StuWork work =workService.selectStuWorkSelf(Integer.parseInt(workId), Integer.parseInt(stuId));
		if (work.getTeaAssess()==null) {
			work.setTeaAssess("");
			JSONArray jsonItems=new JSONArray();
			jsonItems.add(JSONObject.fromObject(work));
			response.getWriter().write(jsonItems.toString());
		}else {
			JSONArray jsonItems=new JSONArray();
			jsonItems.add(JSONObject.fromObject(work));
			response.getWriter().write(jsonItems.toString());
		}
	}
	@RequestMapping("/workController/correctStuWork")
	public void correctStuWork(HttpServletRequest request,HttpServletResponse response) throws IOException{
		int stuId=Integer.parseInt(request.getParameter("stuId"));
		int workId=Integer.parseInt(request.getParameter("workId"));
		double score=Double.parseDouble(request.getParameter("score"));
		String teaAssess=request.getParameter("teaAssess");
		String stuAnswer=request.getParameter("stuAnswer");
		StuWork stuWork=new StuWork();
		stuWork.setScore(score);
		stuWork.setStuAnswer(stuAnswer);
		stuWork.setWorkId(workId);
		stuWork.setStuId(stuId);
		stuWork.setTeaAssess(teaAssess);
		stuWork.setState("已批");
		workService.correctStuWork(stuWork);
		
	}
	@RequestMapping("/workController/searchStuScore")
	public void searchStuScore(HttpServletRequest request,HttpServletResponse response) throws IOException{
			int stuId=Integer.parseInt(request.getParameter("loginUserId"));
			int start=request.getParameter("start")==null?0:Integer.parseInt(request.getParameter("start"));
			int limit=request.getParameter("limit")==null?10:Integer.parseInt(request.getParameter("limit"));
			List<StuWork> stuworkList=workService.searchStuScore(stuId, start, limit);
			JSONArray jsonItems=new JSONArray();
			for(StuWork u:stuworkList){
				jsonItems.add(JSONObject.fromObject(u));
			}
			JSONObject jsonBack =new JSONObject();
			int totalCount=workService.searchStuScoreTotalcount(stuId);
			jsonBack.put("totalCount",totalCount);
			jsonBack.put("data",jsonItems);
			response.getWriter().print(jsonBack);
		
	}
}
