
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.CorrectWorkMangerGrid",{
	extend:'Ext.grid.Panel',
	id:'correctWorkGrid',
	title:'批改作业',
	minWidth:'',
	initComponent:function(){
		var ds=new Ext.data.Store({
			fields:['stuId','className','workTitle','realName','stuAnswer','score','teaAssess'],
			proxy:{
				type:'ajax',
				method:'post',
				url:path+'/workController/correctStuWorkInit.do',
				reader:{
					type:'json',
					totalProperty:'totalCount',
					root:'data'
				}
			},
			listeners: {  
		        'beforeload': function (store, op, options) {  
		            var params = {  
		            		workId:workId 
		            };  
		            Ext.apply(store.proxy.extraParams, params);   
		        }  
			}, 
			pageSize:10,
			autoLoad:true
		});
		ds.loadPage(1);
		Ext.apply(this,{
			id:'correctWorkGrid',
			store:ds,
			border:true,
			forceFit:true,//列表宽度自动适应
			selType:'checkboxmodel',//选择框
			multiSelect:true,//设置为多选
			tbar:[{
				text:'批改作业',
				icon:'images/add.gif',
				handler:function(){
					var selectRows=Ext.getCmp("correctWorkGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						var stuId=record.data.stuId;
						Ext.Ajax.request({
							url:path+'/workController/selectStuWorkOrCorrect.do',
							method:'post',
							success:function(res){
								var result=Ext.JSON.decode(res.responseText);
								new homework.js.CorrectStuWorkActionWin({
									title:'批改作业',
									actionText:'提交'
								}).show();
								Ext.getCmp("teaAssess").setValue(result[0].teaAssess);
								Ext.getCmp("workTitle").body.update(record.data.workTitle);
								Ext.getCmp("stuId").setValue(record.data.stuId);
								Ext.getCmp("stuAnswer").setValue(result[0].stuAnswer);
								Ext.getCmp("score").setValue(result[0].score);
							},
							params:{
								stuId:stuId,
								workId:workId
							}
						})
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
				header:'班级',
				sortable:true,
				dataIndex:'className'
			},{
				header:'姓名',
				sortable:true,
				dataIndex:'realName'
			},{
				header:'成绩',
				sortable:true,
				dataIndex:'score'
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
					var stuId=record.data.stuId;
					Ext.Ajax.request({
						url:path+'/workController/selectStuWorkOrCorrect.do',
						method:'post',
						success:function(res){
							var result=Ext.JSON.decode(res.responseText);
							new homework.js.CorrectStuWorkActionWin({
								title:'批改作业',
								actionText:'提交'
							}).show();
							Ext.getCmp("teaAssess").setValue(result[0].teaAssess);
							Ext.getCmp("workTitle").body.update(record.data.workTitle);
							Ext.getCmp("stuId").setValue(record.data.stuId);
							Ext.getCmp("stuAnswer").setValue(result[0].stuAnswer);
							Ext.getCmp("score").setValue(result[0].score);
						},
						params:{
							stuId:stuId,
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
					limit:10
				}
		});
	}
});