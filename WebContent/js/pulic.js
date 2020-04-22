Ext.ns("homework","homeworks.js");
var sexData =[['男','男'],['女','女']];
homework.js.sex=new Ext.data.SimpleStore({
	fields:['display','value'],
	data:sexData
});

var roleData=[['学生','学生'],['老师','老师'],['管理员','管理员']];
homework.js.role=new Ext.data.SimpleStore({
	fields:['display','value'],
	data:roleData
});
var roleDataUser=[['学生','学生'],['老师','老师']];
homework.js.roleUser=new Ext.data.SimpleStore({
	fields:['display','value'],
	data:roleDataUser
});
var politicalData=[['党员','党员'],['预备党员','预备党员'],['团员','团员'],['群众','群众']];
homework.js.political=new Ext.data.SimpleStore({
	fields:['display','value'],
	data:politicalData
});

var educationData=[['博士','博士'],['研究生','研究生'],['大学本科','大学本科'],['高中','高中'],['初中','初中'],['小学','小学']];
homework.js.education=new Ext.data.SimpleStore({
	fields:['display','value'],
	data:educationData
});
var hometownData=[['北京市','北京市'],['上海市','上海市'],['天津市','天津市'],
                 ['重庆市','重庆市'],['黑龙江省','黑龙江省'],['辽宁省','辽宁省'],
                 ['吉林省','吉林省'],['河北省','河北省'],['河南省','河南省'],
                 ['湖北省','湖北省'],['湖南省','湖南省'],['山东省','山东省'],
                 ['山西省','山西省'],['陕西省','陕西省'],['安徽省','安徽省'],
                 ['浙江省','浙江省'],['江苏省','江苏省'],['福建省','福建省'],
                 ['广东省','广东省'],['海南省','海南省'],['四川省','四川省'],
                 ['云南省','云南省'],['贵州省','贵州省'],['青海省','青海省'],
                 ['甘肃省','甘肃省'],['江西省','江西省'],['台湾省','台湾省'],
                 ['内蒙古自治区','内蒙古自治区'],['宁夏回族自治区','宁夏回族自治区'],
                 ['新疆维吾尔族自治区','新疆维吾尔族自治区'],['广西壮族自治区','广西壮族自治区'],
                 ['西藏自治区','西藏自治区'],['香港特别区','香港特别区'],['澳门特别区','澳门特别区'],
                 ];
homework.js.hometown=new Ext.data.SimpleStore({
	fields:['display','value'],
	data:hometownData
});
homework.js.className=new Ext.data.SimpleStore({
	fields:['classId','className'],
	proxy:{
		type:'ajax',
		url:path+'/classController/searchclass.do',
		method:'post',
		reader:{
			type:'json',
			root:'data'
		}
	}
});