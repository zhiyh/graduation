package com.jnxy.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jnxy.mapper.ClassMapper;
import com.jnxy.pojo.Class;

@Service
public class ClassServiceImpl implements IClassService{
	@Autowired
	private ClassMapper classMapper;
	@Override
	public List<Class> getClassList() {
		return classMapper.getClassList();
	}
	@Override
	public List<Class> getClassInfoList(int start,int limit) {
		
		return classMapper.getClassInfoList(start,limit);
	}
	@Override
	public int classTotalCount() {
		
		return classMapper.classTotalCount();
	}
	@Override
	public int addClass(String className) {
		return classMapper.addClass(className);
	}
	@Override
	public int updateClass(Class clas) {
		
		return classMapper.updateClass(clas);
	}
	@Override
	public int delClass(int[] arr) {
		
		return classMapper.delClass(arr);
	}
	@Override
	public List<Class> searchClassByLike(String content) {
		
		return classMapper.searchClassByLike(content);
	}

}
