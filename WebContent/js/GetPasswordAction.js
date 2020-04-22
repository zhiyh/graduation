
Ext.ns("homework","homeworks.js");
Ext.define("homework.js.GetPasswordAction",{
	extend:'Ext.Window',
	title:null,
	id:'getPasswordAction',
	actionText:null,
	initComponent:function(){
		Ext.apply(this,{
			title:this.title,
			id:'getPasswordAction',
			width:350,
			height:280,
			plain:true,
			modal:true,
			border:false,
			constrain:true,
			layout:'form',
			x:550,  
		    y:120,  
			frame:true,
			items:[new Ext.form.FormPanel({
				layout:'column',
				id:'getPasswordActionForm',
				frame:true,
				items:[{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'真实姓名',
						id:'realName',
						name:'realName',
						maxLength: 10,
					    minLength: 1,
						regex : /[\u4e00-\u9fa5]/, //正则表达式在/...../之间. [\u4e00-\u9fa5] : 只能输入中文.   
						regexText:"只能输入中文!", //正则表达式错误提示 
						allowBlank:false,//不允许为空  
		                blankText:"真实姓名不能为空"
		              /*regex:/[/u4e00-/u9fa5]/,      
		                regexText:"只能输入中文!"*/
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'邮箱',
						id:'email',
						vtype:"email",//email格式验证  
					    vtypeText:"不是有效的邮箱地址",
						name:'email',
						allowBlank:false,//不允许为空  
		                blankText:"不能为空"
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'身份证号',
						id:'card',
						name:'card',
						regex: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
						regexText : "输入的身份证号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X",
						allowBlank:false,//不允许为空  
		                blankText:"身份证号不能为空"
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'电话',
						id:'telephone',
						name:'telephone',
						regex:/^1[34578]\d{9}$/,
						regexText:'请输入正确的手机号码',
						allowBlank:false,//不允许为空  
		                blankText:"电话不能为空"
					}]
				}]
			})],
			buttons:[{
				text:this.actionText,
				handler:function(){
					if(Ext.getCmp("realName").getValue()==""){
						Ext.Msg.alert("操作失败","真实姓名不能为空！！！");
					}else if(Ext.getCmp("email").getValue()==""){
						Ext.Msg.alert("操作失败","邮箱不能为空！！！");
					}else if(Ext.getCmp("card").getValue()==""){
						Ext.Msg.alert("操作失败","身份证号不能为空！！！");
					}else if(Ext.getCmp("telephone").getValue()==""){
						Ext.Msg.alert("操作失败","电话不能为空！！！");
					}else{
						var result=Ext.getCmp("getPasswordActionForm").getForm().isValid();
						if(result){
							var realName=Ext.getCmp("realName").getValue();
							var email=Ext.getCmp("email").getValue();
							var card=Ext.getCmp("card").getValue();
							var telephone=Ext.getCmp("telephone").getValue();
							Ext.Ajax.request({
								url:path+'/userController/getPassword.do',
								method:'post',
								success:function(res){
									Ext.getCmp("getPasswordAction").close();	
									var result=Ext.JSON.decode(res.responseText);
									Ext.Msg.alert("操作结果",result.reason);
								},
								params:{
									realName:realName,
									email:email,
									card:card,
									telephone:telephone	
								}
							})
						}else{
							Ext.Msg.alert("操作结果","表单输入不合法");
						}
					}
					
				}
			},{
				text:'关闭',
                handler:function(){
                	Ext.getCmp("getPasswordAction").close();
                }
			}]
		});
		this.callParent(arguments);
	}
});