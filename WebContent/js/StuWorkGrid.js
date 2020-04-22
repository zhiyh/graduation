url='/upload/i07.png';
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.StuWorkGrid",{
	extend:'Ext.grid.Panel',
	id:'stuWorkGrid',
	title:'查看作业',
	initComponent:function(){
		var ds=new Ext.data.Store({
			fields:['workId','teaId','classId','className','workTitle','stareTime','endTime','stuCount','stuNumber','img_path'],
			proxy:{
				type:'ajax',
				method:'post',
				url:path+'/workController/searchStuWorkByClassId.do',
				reader:{
					type:'json',
					totalProperty:'totalCount',
					root:'data'
				}
			},
			listeners: {  
		        'beforeload': function (store, op, options) {  
		            var params = {  
		            		classId:classId 
		            };  
		            Ext.apply(store.proxy.extraParams, params);   
		        }  
			}, 
			pageSize:18,
			autoLoad:true
		});
		ds.loadPage(1);
		Ext.apply(this,{
			id:'stuWorkGrid',
			store:ds,
			border:true,
			forceFit:true,//列表宽度自动适应
			selType:'checkboxmodel',//选择框
			multiSelect:true,//设置为多选
			tbar:[{
				text:'编写作业',
				icon:'images/add.gif',
				handler:function(){
					var selectRows=Ext.getCmp("stuWorkGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						var workId=record.data.workId;
						Ext.Ajax.request({
							url:path+'/workController/selectStuWorkSelf.do',
							method:'post',
							success:function(res){
								var result=Ext.JSON.decode(res.responseText);
								new homework.js.StuWorkActionWin({
									title:'编写作业',
									actionText:'提交'
								}).show();
								Ext.getCmp("stuAnswer").setValue(result[0].stuAnswer);
								Ext.getCmp("workTitle").body.update(record.data.workTitle);
								Ext.getCmp("workId").setValue(record.data.workId);
								Ext.getCmp("teaId").setValue(record.data.teaId);
							},
							params:{
								loginUserId:loginUserId,
								workId:workId
							}
						})
					}
				}
			},{
				text:'查看作业',
				icon:'images/add.gif',
				handler:function(){
					var selectRows=Ext.getCmp("stuWorkGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						url=record.data.img_path;
						new homework.js.StuWorkViewWin({
							title:'查看作业'
						}).show();
						Ext.getCmp("workTitle").body.update(record.data.workTitle);
					}
				}
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
					var workId=record.data.workId;
					Ext.Ajax.request({
						url:path+'/workController/selectStuWorkSelf.do',
						method:'post',
						success:function(res){
							var result=Ext.JSON.decode(res.responseText);
							new homework.js.StuWorkActionWin({
								title:'编写作业',
								actionText:'提交'
							}).show();
							Ext.getCmp("stuAnswer").setValue(result[0].stuAnswer);
							Ext.getCmp("workTitle").body.update(record.data.workTitle);
							Ext.getCmp("workId").setValue(record.data.workId);
							Ext.getCmp("teaId").setValue(record.data.teaId);
						},
						params:{
							loginUserId:loginUserId,
							workId:workId
						}
					})
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