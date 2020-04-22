package com.jnxy.mapper;
import java.util.List;
import com.jnxy.pojo.Class;

public interface ClassMapper {
	public List<Class> getClassList();
	public int  classTotalCount();
	public List<Class> getClassInfoList(int start,int limit);
	public int  addClass(String className);
	public int updateClass(Class clas);
	public int delClass(int[] arr);
	public List<Class> searchClassByLike(String content);
}
