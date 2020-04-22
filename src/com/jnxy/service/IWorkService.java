package com.jnxy.service;

import java.util.Date;
import java.util.List;
import com.jnxy.pojo.Homework;
import com.jnxy.pojo.StuWork;
/**
 * 
 *项目名称：HomeworkManagerSystem
 *类名称：IWorkService
 *类描述：
 *创建人：zhiyanhui
 *创建时间：2018年4月7日下午9:52:35
 *修改人：zhiyanhui
 *修改时间：2018年4月7日下午9:52:35
 *修改备注：
 *@version
 */
public interface IWorkService {
	public List<Homework> getHomeworkList(int teaId,int start,int limit);
	public int  getWorkTotalCount(int teaId);
	public int  addWork(Homework homework);
	public int  pulishWork(int[] arr);
	public int cancelWork(int[] arr);
	public int delWork(int[] arr);
	public int updateWork(Homework homework);
	public List<Homework> searchWorkByLike(String content);
	public List<Homework> getStuHomeworkList(Date time,int classId,int start,int limit);
	public int getStuWorkTotalCount(int classId);
	public int getStuWorkCount(int workId,int stuId);
	public int addStuWork(StuWork stuwork);
	public int updateStuWork(StuWork stuwork);
	public StuWork selectStuWorkSelf(int workId,int stuId);
	public List<StuWork> correctStuWorkInit(int workId,int start,int limit);
	public int getStuWorkfromStuwork(int workId);
	public int correctStuWork(StuWork stuwork);
	public List<StuWork> searchStuScore(int stuId,int start,int limit);
	public int searchStuScoreTotalcount(int stuId);
}
