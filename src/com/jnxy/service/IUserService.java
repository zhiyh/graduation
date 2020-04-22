package com.jnxy.service;
import java.util.List;

import com.jnxy.pojo.User;
import com.jnxy.pojo.UserInfo;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：IUserService
 *类描述：用户Service接口
 *创建人：zhiyanhui
 *创建时间：2018年1月20日上午11:32:50
 *修改人：zhiyanhui
 *修改时间：2018年1月20日上午11:32:50
 *修改备注：
 *@version
 */
public interface IUserService {
	public User login(String userName,String passWord);
	public User selectUserName(String userName);
	public List<UserInfo> getUserList(int start,int limit);
	public List<UserInfo> searchUserByLike(String content);
	public int  usersTotalCount();
	public int  addUser(User user);
	public int  delUser(int[] arr);
	public int updateUserById(User user);
	public int searchstuCountByClassId(int classId);
	public int searchteaCountByClassId(int classId);
	public User searchUserByid(int id);
	public int updateUserInfoById(User user);
	public String searchPasswordById(int id);
	public int updatePasswordById(String passWord,int id);
	public String getPassword(String realName,String card,String email,String telephone);
}
