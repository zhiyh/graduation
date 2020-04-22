package com.jnxy.pojo;

import java.util.Date;

/**
 *项目名称：HomeworkManagerSystem
 *类名称：Homework
 *类描述：家庭作业类
 *创建人：zhiyanhui
 *创建时间：2018年1月19日下午1:31:06
 *修改人：zhiyanhui
 *修改时间：2018年1月19日下午1:31:06
 *修改备注：
 *@version
 */
public class Homework{
	private int workId;//主键Id
	private int teaId;//发布作业的老师；
	private int classId;//接受作业的班级；
	private String className;//作业题目
	private String workTitle;//作业题目
	private String answer;//答案
	private Date stareTime;//开始时间
	private Date endTime;//结束时间
	private String workState;//是否发布 未发布，已发布
	private int stuNumber;//已交作业人数
	private int stuCount;//班级总人数
	private String img_path;
	
	public String getImg_path() {
		return img_path;
	}
	public void setImg_path(String img_path) {
		this.img_path = img_path;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public int getStuNumber() {
		return stuNumber;
	}
	public void setStuNumber(int stuNumber) {
		this.stuNumber = stuNumber;
	}
	public int getStuCount() {
		return stuCount;
	}
	public void setStuCount(int stuCount) {
		this.stuCount = stuCount;
	}
	public int getWorkId() {
		return workId;
	}
	public void setWorkId(int workId) {
		this.workId = workId;
	}
	public int getTeaId() {
		return teaId;
	}
	public void setTeaId(int teaId) {
		this.teaId = teaId;
	}
	public int getClassId() {
		return classId;
	}
	public void setClassId(int classId) {
		this.classId = classId;
	}
	public String getWorkTitle() {
		return workTitle;
	}
	public void setWorkTitle(String workTitle) {
		this.workTitle = workTitle;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public Date getStareTime() {
		return stareTime;
	}
	public void setStareTime(Date stareTime) {
		this.stareTime = stareTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getWorkState() {
		return workState;
	}
	public void setWorkState(String workState) {
		this.workState = workState;
	}
}
