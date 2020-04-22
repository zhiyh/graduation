url='/upload/i07.png';
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.WorkMangerGrid",{
	extend:'Ext.grid.Panel',
	id:'workMangerGrid',
	title:'作业管理',
	initComponent:function(){
		var ds=new Ext.data.Store({
			fields:['workId','teaId','classId','className','workTitle','img_path','stareTime','endTime','workState','stuNumber','stuCount'],
			proxy:{
				type:'ajax',
				method:'post',
				url:path+'/workController/searchWorkInfoById.do',
				reader:{
					type:'json',
					totalProperty:'totalCount',
					root:'data'
				}
			},
			listeners: {  
		        'beforeload': function (store, op, options) {  
		            var params = {  
		            	loginUserId:loginUserId 
		            };  
		            Ext.apply(store.proxy.extraParams, params);   
		        }  
			}, 
			pageSize:18,
			autoLoad:true
		});
		ds.loadPage(1);
		Ext.apply(this,{
			id:'workMangerGrid',
			store:ds,
			border:true,
			forceFit:true,//列表宽度自动适应
			selType:'checkboxmodel',//选择框
			multiSelect:true,//设置为多选
			tbar:[{
				text:'添加作业',
				icon:'images/add.gif',
				handler:function(){
					new homework.js.WorkActionWin({
						title:'添加作业',
						actionText:'添加作业'
					}).show();
				}
			},{
				text:'批改作业',
				icon:'images/kechengguanli.gif',
				handler:function(){
					var selectRows=Ext.getCmp("workMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						workId=record.data.workId;
						if (!Ext.getCmp("correctWorkMangerTab")){
							var tab=Ext.getCmp("tab");
							var t=tab.add({
								title:'批改作业',
								id:'correctWorkMangerTab',
								closable:true,
								items:[new homework.js.CorrectWorkMangerGrid({
									id:'correctWorkMangerTabwer'
								})]
							});
							tab.setActiveTab(t);
						}
					}
				}
			},{
				text:'发布作业',
				icon:'images/baomingguanli.gif',
				handler:function(){
					var selectRows=Ext.getCmp("workMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					var ids="";
					if(len==0){
						Ext.Msg.alert("请注意","您至少要选中一条记录！！！");
					}else{
						for(var i=0;i<len;i++){
							var rec=selectRows[i];
							ids+=selectRows[i].data.workId+",";
						}
						Ext.Ajax.request({
							url:path+'/workController/pulishWork.do',
							method:'post',
							success:function(res){
								var result=Ext.JSON.decode(res.responseText);
								Ext.getCmp("workMangerGrid").getStore().reload();
								Ext.Msg.alert("发布结果","发布成功");
							},
							params:{
								ids:ids
							}
						})
					}
				}
			},{
				text:'取消发布',
				icon:'images/baomingguanli.gif',
				handler:function(){
					var selectRows=Ext.getCmp("workMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					var ids="";
					if(len==0){
						Ext.Msg.alert("请注意","您至少要选中一条记录！！！");
					}else{
						for(var i=0;i<len;i++){
							var rec=selectRows[i];
							ids+=selectRows[i].data.workId+",";
						}
						Ext.Ajax.request({
							url:path+'/workController/cancelWork.do',
							method:'post',
							success:function(res){
								var result=Ext.JSON.decode(res.responseText);
								Ext.getCmp("workMangerGrid").getStore().reload();
								Ext.Msg.alert("取消结果","取消成功");
							},
							params:{
								ids:ids
							}
						})
					}
				}
			},{
				text:'删除作业',
				icon:'images/del.gif',
				handler:function(){
					var selectRows=Ext.getCmp("workMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					var ids="";
					if(len==0){
						Ext.Msg.alert("请注意","您至少要选中一条记录！！！");
					}else{
						for(var i=0;i<len;i++){
							var rec=selectRows[i];
							ids+=selectRows[i].data.workId+",";
						}
						Ext.MessageBox.show({
							title:'删除提示',
							width:200,
							msg:'您确定删除吗？',
							buttons:Ext.Msg.YESNO,
							fn:function(btn){
								if(btn=="yes"){
									Ext.Ajax.request({
										url:path+'/workController/delWork.do',
										method:'post',
										success:function(res){
											var result=Ext.JSON.decode(res.responseText);
											Ext.getCmp("workMangerGrid").getStore().reload();
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
				text:'修改作业',
				icon:'images/updata.bmp',
				handler:function(){
					var selectRows=Ext.getCmp("workMangerGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						new homework.js.WorkActionWin({
							title:'修改作业',
							actionText:'保存修改'
						}).show();
						Ext.getCmp("stareTime").setValue(Ext.Date.format(new Date(record.data.stareTime.time),"Y-m-d"));
						Ext.getCmp("endTime").setValue(Ext.Date.format(new Date(record.data.endTime.time),"Y-m-d"));
						Ext.getCmp("workTitle").setValue(record.data.workTitle);
						Ext.getCmp("workId").setValue(record.data.workId);
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
							url:path+'/workController/searchWorkByLike.do',
							method:'post',
							success:function(res){
								var data=Ext.JSON.decode(res.responseText);
								console.log(data);
								Ext.getCmp("workMangerGrid").getStore().removeAll();
								Ext.getCmp("workMangerGrid").getStore().add(data);
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
				align:'center',
				renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
					return rowIndex+1;
				}
			},{
				header:'题目',
				sortable:true,
				dataIndex:'workTitle'
			},{
				header:'开始时间',
				sortable:true,
				dataIndex:'stareTime',
				renderer:function(v){
					return Ext.Date.format(new Date(v.time),"Y-m-d");
				}
			},{
				header:'结束时间',
				sortable:true,
				dataIndex:'endTime',
				renderer:function(v){
					return Ext.Date.format(new Date(v.time),"Y-m-d");
				}
			},{
				header:'班级',
				sortable:true,
				dataIndex:'className'
			},{
				header:'班级人数',
				sortable:true,
				dataIndex:'stuCount'
			},{
				header:'已交人数',
				sortable:true,
				dataIndex:'stuNumber'
			},{
				header:'作业状态',
				sortable:true,
				dataIndex:'workState'
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
					url=record.data.img_path;
					new homework.js.WorkActionWin({
						title:'修改作业',
						actionText:'保存修改'
					}).show();
					Ext.getCmp("stareTime").setValue(Ext.Date.format(new Date(record.data.stareTime.time),"Y-m-d"));
					Ext.getCmp("endTime").setValue(Ext.Date.format(new Date(record.data.endTime.time),"Y-m-d"));
					Ext.getCmp("workTitle").setValue(record.data.workTitle);
					Ext.getCmp("upload").setValue(record.data.img_path);
					Ext.getCmp("workId").setValue(record.data.workId);
					//Ext.getCmp("box_picture").autoEl.src =path+record.data.img_path;
					Ext.getCmp("upload").setRawValue(record.data.img_path);
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
