
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.SelectSoreGrid",{
	extend:'Ext.grid.Panel',
	id:'selectSoreGrid',
	title:'查看成绩',
	initComponent:function(){
		var ds=new Ext.data.Store({
			fields:['workId','workTitle','stuAnswer','teaAssess','score'],
			proxy:{
				type:'ajax',
				method:'post',
				url:path+'/workController/searchStuScore.do',
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
			pageSize:10,
			autoLoad:true
		});
		ds.loadPage(1);
		Ext.apply(this,{
			id:'selectSoreGrid',
			store:ds,
			border:true,
			forceFit:true,//列表宽度自动适应
			selType:'checkboxmodel',//选择框
			multiSelect:true,//设置为多选
			tbar:[{
				text:'查看评价',
				icon:'images/baomingguanli.gif',
				handler:function(){
					var selectRows=Ext.getCmp("selectSoreGrid").selModel.getSelection();
					var len=selectRows.length;
					if(len==0){
						Ext.Msg.alert("请注意","您要选中一条记录！！！");
					}else if(len>1){
						Ext.Msg.alert("请注意","您只能选中一条记录！！！");
					}else{
						var record=selectRows[0];
						new homework.js.SelectScoreActionWin({
							title:'查看评价'
						}).show();
						Ext.getCmp("workTitle").body.update(record.data.workTitle);
						Ext.getCmp("stuAnswer").setValue(record.data.stuAnswer);
						Ext.getCmp("teaAssess").setValue(record.data.teaAssess);
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
					new homework.js.SelectScoreActionWin({
						title:'查看评价'
					}).show();
					Ext.getCmp("workTitle").body.update(record.data.workTitle);
					Ext.getCmp("stuAnswer").setValue(record.data.stuAnswer);
					Ext.getCmp("teaAssess").setValue(record.data.teaAssess);
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