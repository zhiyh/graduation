
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.UserMangerGrid",{
	extend:'Ext.grid.Panel',
	id:'userMangerGrid',
	title:'用户管理',
	initComponent:function(){
		var ds=new Ext.data.Store({
			fields:['sex','birth','hometown','education','passWord','userNumber','id','authority',
			        'address','email','userName','card','realName','className','politicsStatus','telephone','introduction'],
			proxy:{
				type:'ajax',
				method:'post',
				url:path+'/userController/searchUsers.do',
				reader:{
					type:'json',
					totalProperty:'totalCount',
					root:'data'
				}
			},
			pageSize:18,
			autoLoad:true
		});
		ds.loadPage(1);
		Ext.apply(this,{
			id:'userMangerGrid',
			store:ds,
			border:true,
			forceFit:true,//列表宽度自动适应
			selType:'checkboxmodel',//选择框
			multiSelect:true,//设置为多选
			tbar:[{
				text:'添加用户',
				icon:'images/add.gif',
				handler:function(){
					new homework.js.UsersActionWin({
						title:'添加用户',
						actionText:'添加用户',
						edtionUserName:false
					}).show();
				}
			},{
				text:'删除用户',
				icon:'images/del.gif',
				handler:function(){
					var selectRows=Ext.getCmp("userMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					var ids="";
					if(len==0){
						Ext.Msg.alert("请注意","您至少要选中一条记录！！！");
					}else{
						for(var i=0;i<len;i++){
							var rec=selectRows[i];
							ids+=selectRows[i].data.id+",";
						}
						Ext.MessageBox.show({
							title:'删除提示',
							width:200,
							msg:'您确定删除吗？',
							buttons:Ext.Msg.YESNO,
							fn:function(btn){
								if(btn=="yes"){
									Ext.Ajax.request({
										url:path+'/userController/delUser.do',
										method:'post',
										success:function(res){
											var result=Ext.JSON.decode(res.responseText);
											Ext.getCmp("userMangerGrid").getStore().reload();
											Ext.getCmp("classMangerGrid").getStore().reload();
											Ext.Msg.alert("删除结果",result.reason);
										},
										params:{
											ids:ids
										}
									})
								}
							}
						})
					}
				}
			},{
				text:'修改用户',
				icon:'images/updata.bmp',
				handler:function(){
					var selectRows=Ext.getCmp("userMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						new homework.js.UsersActionWin({
							title:'修改用户--'+record.data.userName,
							actionText:'保存修改',
							edtionUserName:true
						}).show();
						Ext.getCmp("userName").setValue(record.data.userName);
						Ext.getCmp("passWord").setValue(record.data.passWord);
						Ext.getCmp("realName").setValue(record.data.realName);
						Ext.getCmp("sex").setValue(record.data.sex);
						Ext.getCmp("birth").setValue(record.data.birth);
						Ext.getCmp("hometown").setValue(record.data.hometown);
						Ext.getCmp("education").setValue(record.data.education);
						Ext.getCmp("email").setValue(record.data.email);
						Ext.getCmp("card").setValue(record.data.card);
						Ext.getCmp("className").setValue(record.data.className);
						Ext.getCmp("address").setValue(record.data.address);
						Ext.getCmp("telephone").setValue(record.data.telephone);
						Ext.getCmp("introduction").setValue(record.data.introduction);
						Ext.getCmp("authority").setValue(record.data.authority);
						Ext.getCmp("ido").setValue(record.data.id);
					}
				}
			},{
				/*text:'查询',*/
				icon:'images/Serch.gif',
				handler:function(){
					var content=Ext.getCmp("searchContent").getValue();
					if(content==null||content==""){
						Ext.Msg.alert("警告","尊敬的用户您输入的内容为空");
					}else{
						Ext.Ajax.request({
							url:path+'/userController/searchUserByLike.do',
							method:'post',
							success:function(res){
								var data=Ext.JSON.decode(res.responseText);
								console.log(data);
								Ext.getCmp("userMangerGrid").getStore().removeAll();
								Ext.getCmp("userMangerGrid").getStore().add(data);
							},
							params:{
								content:content
							}
						})
					}
				}
			},{
				xtype:'textfield',
				id:'searchContent',
				emptyText:'请输入查询内容',
				width:100
			}],
			columns:[{
				xtype:'rownumberer',
				header:'序号',
				//width:50,
				align:'center',
				renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
					return rowIndex+1;
				}
			},{
				header:'用户名',
				sortable:true,
				dataIndex:'userName'
			},{
				header:'密码',
				sortable:true,
				dataIndex:'passWord'
			},{
				header:'姓名',
				sortable:true,
				dataIndex:'realName'
			},{
				header:'班级',
				sortable:true,
				dataIndex:'className'
			},{
				header:'性别',
				sortable:true,
				dataIndex:'sex'
			},{
				header:'电话',
				sortable:true,
				dataIndex:'telephone'
			},{
				header:'学号/工号',
				sortable:true,
				dataIndex:'userNumber'
			},{
				header:'角色',
				sortable:true,
				dataIndex:'authority'
			}],
			viewConfig: {  
	            plugins: {  
	                ptype: "gridviewdragdrop",  
	                dragText: "可用鼠标拖拽进行上下排序"  
	            }  
	        },  
			bbar:new Ext.PagingToolbar({
			    store:ds,
			    displayInfo:true,
			    displayMsg:'当前显示第{0}条到第{1}条记录，总共有{2}条记录',
			    emptyMsg:'无记录'
			}),
			listeners:{
				itemdblclick:function(grid,record,e){
					new homework.js.UsersActionWin({
						title:'修改用户--'+record.data.userName,
						actionText:'保存修改',
						edtionUserName:true
					}).show();
					Ext.getCmp("userName").setValue(record.data.userName);
					Ext.getCmp("passWord").setValue(record.data.passWord);
					Ext.getCmp("realName").setValue(record.data.realName);
					Ext.getCmp("sex").setValue(record.data.sex);
					Ext.getCmp("birth").setValue(record.data.birth);
					Ext.getCmp("hometown").setValue(record.data.hometown);
					Ext.getCmp("education").setValue(record.data.education);
					Ext.getCmp("email").setValue(record.data.email);
					Ext.getCmp("card").setValue(record.data.card);
					Ext.getCmp("className").setValue(record.data.className);
					Ext.getCmp("address").setValue(record.data.address);
					Ext.getCmp("telephone").setValue(record.data.telephone);
					Ext.getCmp("introduction").setValue(record.data.introduction);
					Ext.getCmp("authority").setValue(record.data.authority);
					Ext.getCmp("ido").setValue(record.data.id);
				}
			}
		});
		this.callParent(arguments);
		ds.load({
				params:{
					start:0,
					limit:18
				}
		});
	}
});