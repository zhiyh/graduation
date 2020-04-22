
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.LoginUserPassword",{
	extend:'Ext.Panel',
	id:'passwordMangerPanl',
	initComponent:function(){
		Ext.apply(this,{
			id:'passwordMangerPanl',
			border:false,
			layout:'fit',
			bodyStyle:'padding 5px',
			items:[new Ext.form.FormPanel({
				id:'passwordMangerForm',
				border:false,
				items:[{
					xtype:'fieldset',
					title:'修改密码',
					collapsible:true,
					autoHeight:true,
					width:600,
					autoScroll:false,
					layout:'column',
					items:[{
						columnWidth:0.6,
						layout:'form',
						border:false,
						items:[{
							xtype:'textfield',
							fieldLabel:'原密码',
							id:'passWord',
							name:'passWord',
							inputType:'password',
							allowBlank:false,//不允许为空  
			                blankText:"原密码不能为空"
						},{
							xtype:'textfield',
							fieldLabel:'密码',
							id:'passWord1',
							name:'passWord1',
							inputType:'password',
							allowBlank:false,//不允许为空  
			                blankText:"密码不能为空"
						},{
							xtype:'textfield',
							fieldLabel:'确认密码',
							id:'passWord2',
							name:'passWord2',
							inputType:'password',
							allowBlank:false,//不允许为空  
			                blankText:"确认密码不能为空"
						}],
						buttons:[{
							text:'保存修改',
							handler:function(){
							var passWord =Ext.getCmp("passWord").getValue();
							var passWord1 =Ext.getCmp("passWord1").getValue();
							var passWord2 =Ext.getCmp("passWord2").getValue();
								if(passWord==""||passWord1==""||passWord2==""){
									Ext.Msg.alert("警告","请全部输入！！！");
									return;
								}else if(passWord1!=passWord2){
									Ext.Msg.alert("警告","新密码输入不一致！！！");
								}else{
									Ext.Ajax.request({
										url:path+'/userController/updataPasswordByid.do',
										method:'post',
										waitMsg:'请等待数据提交中',
										waitTitle:'修改',
										success:function(res){
											var result=Ext.JSON.decode(res.responseText);
											Ext.Msg.alert("修改结果",result.reason);
										},
										params:{
											id:loginUserId,
											passWord1:passWord1,
											passWord:passWord
										}
									});
								}
								
							}
						}]
					}]
				}]
			})]	
		});
		this.callParent(arguments);
	}
});