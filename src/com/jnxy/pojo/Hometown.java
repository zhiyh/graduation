package com.jnxy.pojo;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：Hometown
 *类描述：籍贯类
 *创建人：zhiyanhui
 *创建时间：2018年1月19日下午1:32:14
 *修改人：zhiyanhui
 *修改时间：2018年1月19日下午1:32:14
 *修改备注：
 *@version
 */
public class Hometown {
	private int id;
	private String hometownName;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getHometownName() {
		return hometownName;
	}
	public void setHometownName(String hometownName) {
		this.hometownName = hometownName;
	}
	public Hometown(int id, String hometownName) {
		super();
		this.id = id;
		this.hometownName = hometownName;
	}
	public Hometown() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
