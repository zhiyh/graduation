package com.jnxy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jnxy.mapper.UserMapper;
import com.jnxy.pojo.User;
import com.jnxy.pojo.UserInfo;
/**
 *项目名称：HomeworkManagerSystem
 *类名称：UserServiceImpl
 *类描述：用户Service实现类
 *创建人：zhiyanhui
 *创建时间：2018年1月20日上午11:33:45
 *修改人：zhiyanhui
 *修改时间：2018年1月20日上午11:33:45
 *修改备注：
 *@version
 */
@Service
public class UserServiceImpl implements IUserService{
    @Autowired
	private UserMapper userMapper;
	@Override
	public User login(String userName, String passWord) {
		return userMapper.login(userName, passWord);
	}
	@Override
	public List<UserInfo> getUserList(int start,int limit) {
		return userMapper.getUserList(start,limit);
	}
	@Override
	public int usersTotalCount() {
		return userMapper.usersTotalCount();
	}
	@Override
	public List<UserInfo> searchUserByLike(String content) {
		return userMapper.searchUserByLike(content);
	}
	@Override
	public int addUser(User user) {	
		return userMapper.addUser(user);
	}
	@Override
	public int delUser(int[] arr) {
		return userMapper.delUser(arr);
	}
	@Override
	public int updateUserById(User user){
		return userMapper.updateUserById(user);
	}
	@Override
	public int searchstuCountByClassId(int classId) {
		return userMapper.searchstuCountByClassId(classId);
	}
	@Override
	public int searchteaCountByClassId(int classId) {
		return userMapper.searchteaCountByClassId(classId);
	}
	@Override
	public User searchUserByid(int id) {
		return userMapper.searchUserByid(id);
	}
	@Override
	public int updateUserInfoById(User user) {
		return userMapper.updateUserInfoById(user);
	}
	@Override
	public String searchPasswordById(int id) {
		return userMapper.searchPasswordById(id);
	}
	@Override
	public int updatePasswordById(String passWord, int id) {
		return userMapper.updatePasswordById(passWord, id);
	}
	@Override
	public User selectUserName(String userName) {
		return userMapper.selectUserName(userName);
	}
	@Override
	public String getPassword(String realName, String card, String email, String telephone) {
		return userMapper.getPassword(realName, card, email, telephone);
	}

}
