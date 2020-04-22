package com.jnxy.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jnxy.mapper.WorkMapper;
import com.jnxy.pojo.Homework;
import com.jnxy.pojo.StuWork;
/**
 * 
 *项目名称：HomeworkManagerSystem
 *类名称：WorkServiceImpl
 *类描述：
 *创建人：zhiyanhui
 *创建时间：2018年4月6日下午10:14:33
 *修改人：zhiyanhui
 *修改时间：2018年4月6日下午10:14:33
 *修改备注：
 *@version
 */
@Service
public class WorkServiceImpl implements IWorkService{
	@Autowired
	private WorkMapper workMapper;
	
	@Override
	public List<Homework> getHomeworkList(int teaId, int start, int limit) {
		return workMapper.getHomeworkList(teaId, start, limit);
	}
	@Override
	public int getWorkTotalCount(int teaId) {
		
		return workMapper.getWorkTotalCount(teaId);
	}
	@Override
	public int addWork(Homework homework) {
		
		return workMapper.addWork(homework);
	}
	@Override
	public int pulishWork(int[] arr) {
		
		return workMapper.pulishWork(arr);
	}
	@Override
	public int cancelWork(int[] arr) {
		
		return workMapper.cancelWork(arr);
	}
	@Override
	public int delWork(int[] arr) {
		
		return workMapper.delWork(arr);
	}
	@Override
	public int updateWork(Homework homework) {
		
		return workMapper.updateWork(homework);
	}
	@Override
	public List<Homework> searchWorkByLike(String content) {
		
		return workMapper.searchWorkByLike(content);
	}
	@Override
	public List<Homework> getStuHomeworkList(Date time,int classId, int start, int limit) {
		
		return workMapper.getStuHomeworkList(time,classId, start, limit);
	}
	@Override
	public int getStuWorkTotalCount(int classId) {
		
		return workMapper.getStuWorkTotalCount(classId);
	}
	@Override
	public int getStuWorkCount(int workId, int stuId) {
		
		return workMapper.getStuWorkCount(workId, stuId);
	}
	@Override
	public int addStuWork(StuWork stuwork) {
		
		return workMapper.addStuWork(stuwork);
	}
	@Override
	public int updateStuWork(StuWork stuwork) {
		
		return workMapper.updateStuWork(stuwork);
	}
	@Override
	public StuWork selectStuWorkSelf(int workId, int stuId) {
		
		return workMapper.selectStuWorkSelf(workId, stuId);
	}
	@Override
	public List<StuWork> correctStuWorkInit(int workId, int start, int limit) {
		
		return workMapper.correctStuWorkInit(workId, start, limit);
	}
	@Override
	public int getStuWorkfromStuwork(int workId) {
		
		return workMapper.getStuWorkfromStuwork(workId);
	}
	@Override
	public int correctStuWork(StuWork stuwork) {
		
		return workMapper.correctStuWork(stuwork);
	}
	@Override
	public List<StuWork> searchStuScore(int stuId, int start, int limit) {
		
		return workMapper.searchStuScore(stuId, start, limit);
	}
	@Override
	public int searchStuScoreTotalcount(int stuId) {
		
		return workMapper.searchStuScoreTotalcount(stuId);
	}

}
