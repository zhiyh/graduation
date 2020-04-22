package com.jnxy.pojo;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：Class
 *类描述：班级类
 *创建人：zhiyanhui
 *创建时间：2018年3月19日下午1:32:39
 *修改人：zhiyanhui
 *修改时间：2018年3月19日下午1:32:39
 *修改备注：
 *@version
 */
public class Class {
	private int classId;//班级Id
	private String className;//班级名称
	private int stuCount;//学生人数
	private int teaCount;//老师人数
	public int getStuCount() {
		return stuCount;
	}
	public void setStuCount(int stuCount) {
		this.stuCount = stuCount;
	}
	public int getTeaCount() {
		return teaCount;
	}
	public void setTeaCount(int teaCount) {
		this.teaCount = teaCount;
	}
	public int getClassId() {
		return classId;
	}
	public void setClassId(int classId) {
		this.classId = classId;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public Class(int classId, String className) {
		this.classId = classId;
		this.className = className;
	}
	public Class() {
		
	}
	
}
