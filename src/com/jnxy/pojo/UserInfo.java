package com.jnxy.pojo;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：UserInfo
 *类描述：保存返回的用户信息
 *创建人：zhiyanhui
 *创建时间：2018年1月28日上午10:55:30
 *修改人：zhiyanhui
 *修改时间：2018年1月28日上午10:55:30
 *修改备注：
 *@version
 */
public class UserInfo {
	private int id;//主键
	private String userName;//用户名（除空格换行以外的字符）
	private String passWord;//密码
	private int userNumber;//学号或者老师的工号
	private String realName;//真实姓名
	private String telephone;//电话
	private String address;//地址
	private String email;//邮箱
	private String card;//身份证号
	private String sex;//性别 男女
	private String birth;//出生日期 格式：yyyy-MM-dd
	private String className;//班级名
	private String education;//学历
	private String politicsStatus;//政治面貌
	private String authority;//权限 1 学生 2 老师 3管理员
	private String hometown;//籍贯
	private String introduction;//用户简介
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public int getUserNumber() {
		return userNumber;
	}
	public void setUserNumber(int userNumber) {
		this.userNumber = userNumber;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCard() {
		return card;
	}
	public void setCard(String card) {
		this.card = card;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getPoliticsStatus() {
		return politicsStatus;
	}
	public void setPoliticsStatus(String politicsStatus) {
		this.politicsStatus = politicsStatus;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getHometown() {
		return hometown;
	}
	public void setHometown(String hometown) {
		this.hometown = hometown;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	
}
