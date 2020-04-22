package com.jnxy.pojo;

import java.util.Date;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：Score
 *类描述：成绩
 *创建人：zhiyanhui
 *创建时间：2018年1月19日下午1:31:42
 *修改人：zhiyanhui
 *修改时间：2018年1月19日下午1:31:42
 *修改备注：
 *@version
 */
public class Score {
	private int id;//主键Id
	private String userNumber;//学生学号
	private int homeworkId;//所选作业Id ，与作业表Id对应；
	private double score;//成绩
	private Date year;//年份 格式yyyy
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserNumber() {
		return userNumber;
	}
	public void setUserNumber(String userNumber) {
		this.userNumber = userNumber;
	}
	public int getHomeworkId() {
		return homeworkId;
	}
	public void setHomeworkId(int homeworkId) {
		this.homeworkId = homeworkId;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	public Date getYear() {
		return year;
	}
	public void setYear(Date year) {
		this.year = year;
	}
	public Score(int id, String userNumber, int homeworkId, double score, Date year) {
		super();
		this.id = id;
		this.userNumber = userNumber;
		this.homeworkId = homeworkId;
		this.score = score;
		this.year = year;
	}
	public Score() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
