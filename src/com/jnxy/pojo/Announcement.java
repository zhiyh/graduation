package com.jnxy.pojo;
import java.util.Date;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：Announcement
 *类描述：公告表
 *创建人：zhiyanhui
 *创建时间：2018年1月19日下午1:38:05
 *修改人：zhiyanhui
 *修改时间：2018年1月19日下午1:38:05
 *修改备注：
 *@version
 */
public class Announcement {
	private int id;//主键Id
	private String title;//公告标题
	private String contents;//公告内容
	private Date time;//公告发布时间 格式：yyyy-MM-dd hh:mm:ss
	private String author;//公告发布作者
	private String ip;//公告发布者IP
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Announcement(int id, String title, String contents, Date time, String author, String ip) {
		super();
		this.id = id;
		this.title = title;
		this.contents = contents;
		this.time = time;
		this.author = author;
		this.ip = ip;
	}
	public Announcement() {
		super();
	}
	
}
