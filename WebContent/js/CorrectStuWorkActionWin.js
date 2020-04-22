Ext.ns("homework","homeworks.js");
Ext.define("homework.js.CorrectStuWorkActionWin",{
	extend:'Ext.Window',
	title:null,
	id:'correctstuworkAction',
	actionText:null,
	initComponent:function(){
		Ext.apply(this,{
			title:this.title,
			id:'correctstuworkAction',
			width:650,
			height:600,
			plain:true,
			modal:true,
			border:false,
			constrain:true,
			layout:'form',
			x:400,  
		    y:1,  
			frame:true,
			items:[new Ext.form.FormPanel({
				layout:'column',
				id:'correctworkActionForm',
				frame:true,
				items:[{
					xtype:'fieldset',
					title:'批改作业',
					collapsible:true,
					autoHeight:true,
					columnWidth:0.95,
					autoScroll:false,
					items:[{
						xtype:'panel',
						frame:true,
						height:50,
						html:null,
						id:'workTitle',
						name:'workTitle'
					},{
						xtype:'textfield',
						id:'stuId',
						name:'stuId',
						hidden:true,
						hideLabel:true
					},{
						xtype:'htmleditor',
						height:280,
						width:540,
						autoScroll : true,
						fieldLabel:'学生答案',
						id:'stuAnswer',
						name:'stuAnswer'
					},{
						xtype:'htmleditor',
						height:100,
						width:540,
						autoScroll : true,
						fieldLabel:'老师寄语',
						id:'teaAssess',
						name:'teaAssess'
					},{
				        xtype: 'numberfield',
				        fieldLabel: '得分',
				        maxValue: 100,
				        height:20,
				        minValue: 0,
				        allowBlank:false,//不允许为空  
		                blankText:"成绩不能为空",
		                id:'score',
						name:'score'
				    }]
				}]
			})],
			buttons:[{
				text:this.actionText,
				handler:function(){
					if(Ext.getCmp("score").getValue()==""){
						Ext.Msg.alert("操作失败","成绩不能为空！！！");
					}else{
						var teaAssess=Ext.getCmp("teaAssess").getValue();
						var stuAnswer=Ext.getCmp("stuAnswer").getValue();
						var stuId=Ext.getCmp("stuId").getValue();
						var score=Ext.getCmp("score").getValue();
						Ext.Ajax.request({
							url:path+'/workController/correctStuWork.do',
							method:'post',
							success:function(res){
								Ext.Msg.alert("操作结果","用户操作成功");
								Ext.getCmp("correctWorkGrid").getStore().reload();
								Ext.getCmp("correctstuworkAction").close();	
							},
							params:{
								teaAssess:teaAssess,
								stuAnswer:stuAnswer,
								score:score,
								workId:workId,
								stuId:stuId
							}
						})
					}
					
				}
			},{
				text:'关闭',
                handler:function(){
                	Ext.getCmp("correctstuworkAction").close();
                }
			}]
		});
		this.callParent(arguments);
	}
});