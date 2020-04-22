
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.ClassMangerGrid",{
	extend:'Ext.grid.Panel',
	id:'classMangerGrid',
	title:'班级管理',
	initComponent:function(){
		var ds=new Ext.data.Store({
			fields:['classId','className','stuCount','teaCount'],
			proxy:{
				type:'ajax',
				method:'post',
				url:path+'/classController/searchClassInfo.do',
				reader:{
					type:'json',
					totalProperty:'totalCount',
					root:'data'
				}
			},
			pageSize:10,
			autoLoad:true
		});
		ds.loadPage(1);
		Ext.apply(this,{
			id:'classMangerGrid',
			store:ds,
			border:true,
			forceFit:true,//列表宽度自动适应
			selType:'checkboxmodel',//选择框
			multiSelect:true,//设置为多选
			tbar:[{
				text:'添加班级',
				icon:'images/add.gif',
				handler:function(){
					new homework.js.classActionWin({
						title:'添加班级',
						actionText:'添加班级',
						edtionClassName:false
					}).show();
				}
			},{
				text:'删除班级',
				icon:'images/del.gif',
				handler:function(){
					var selectRows=Ext.getCmp("classMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					var ids="";
					if(len==0){
						Ext.Msg.alert("请注意","您至少要选中一条记录！！！");
					}else{
						for(var i=0;i<len;i++){
							var rec=selectRows[i];
							var teaCount=selectRows[i].data.teaCount;
							if(teaCount!=0){
								Ext.Msg.alert("警告",selectRows[i].data.className+"下有老师不能删除！！！");
								return;
							}
							var stuCount=selectRows[i].data.stuCount;
							if(stuCount!=0){
								Ext.Msg.alert("警告",selectRows[i].data.className+"下有学生不能删除！！！");
								return;
							}
							ids+=selectRows[i].data.classId+",";
						}
						Ext.MessageBox.show({
							title:'删除提示',
							width:200,
							msg:'您确定删除吗？',
							buttons:Ext.Msg.YESNO,
							fn:function(btn){
								if(btn=="yes"){
									Ext.Ajax.request({
										url:path+'/classController/delClass.do',
										method:'post',
										success:function(res){
											var result=Ext.JSON.decode(res.responseText);
											Ext.getCmp("classMangerGrid").getStore().reload();
											Ext.getCmp("userMangerGrid").getStore().reload();
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
				text:'修改班级',
				icon:'images/updata.bmp',
				handler:function(){
					var selectRows=Ext.getCmp("classMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						new homework.js.classActionWin({
							title:'修改班级',
							actionText:'保存修改',
							edtionUserName:false
						}).show();
						Ext.getCmp("className").setValue(record.data.className);
						Ext.getCmp("classId").setValue(record.data.classId);
					}
				}
			},{
				icon:'images/Serch.gif',
				handler:function(){
					var content=Ext.getCmp("content").getValue();
					if(content==null||content==""){
						Ext.Msg.alert("警告","尊敬的用户您输入的内容为空");
					}else{
						Ext.Ajax.request({
							url:path+'/classController/searchClassByLike.do',
							method:'post',
							success:function(res){
								var data=Ext.JSON.decode(res.responseText);
								console.log(data);
								Ext.getCmp("classMangerGrid").getStore().removeAll();
								Ext.getCmp("classMangerGrid").getStore().add(data);
							},
							params:{
								content:content
							}
						})
					}
				
				}
			},{
				xtype:'textfield',
				id:'content',
				emptyText:'请输入',
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
				header:'班级',
				sortable:true,
				dataIndex:'className'
			},{
				header:'学生数',
				sortable:true,
				dataIndex:'stuCount'
			},{
				header:'老师数',
				sortable:true,
				dataIndex:'teaCount'
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
					new homework.js.classActionWin({
						title:'修改班级',
						actionText:'保存修改',
						edtionUserName:false
					}).show();
					Ext.getCmp("className").setValue(record.data.className);
					Ext.getCmp("classId").setValue(record.data.classId);
				}
			}
		});
		this.callParent(arguments);
		ds.load({
				params:{
					start:0,
					limit:10
				}
		});
	}
});