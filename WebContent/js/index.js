Ext.onReady(function(){
	var viewprot=new Ext.Viewport({
		frame:true,
		layout:'border',
		renderTo:Ext.getBody(),
		items:[{
			region:'north',
			height:100,
			bodyStyle:'background:url(images/loginlogo1.png) no-repeat left;background-color:#FFFFFF;',
			items:[{
				buttons:[{
					text:'关于我们',
					iconCls:'aboutus',
					handler:function(){
						Ext.Msg.alert("关于我们","版权所有计算机科学系");
					}
				},{
					text:'退出系统',
					iconCls:'loginout',
					handler:function(){
						Ext.MessageBox.show({
							title:'退出提示',
							width:200,
							msg:'您确定退出吗？',
							buttons:Ext.Msg.YESNO,
							fn:function(btn){
								if(btn=="yes"){
									Ext.Ajax.request({
										url:path+'/userController/loginOut.do',
										method:'post',
										success:function(res){
											window.location.href=path+'/login.jsp';
										}
									})
								}
							}
						})
					}
				}]
			}]
		},{
			region:'center',
			id:'tab',
			xtype:'tabpanel',
			items:[{
				title:'首页',
				iconCls:'openFile',
				bodyStyle:'background:url(images/centerbook.jpg) no-repeat;background-color:#FFFFFF;background-position:center;'
			}]
		},{ title:'作业管理系统',
			region:'west',
			width:180,
			collapsible:true,
			items:[new Ext.tree.Panel({
				id:'treePanl',
				border:false,
				listeners:{
					afterrender:function(obj,o){
						var node=obj.getRootNode().data.children;//获得所有节点
						var temp=new Array();
						var index=0;
						for(var i=0;i<node.length;i++){
							var t=node[i];
							if(t.flags.indexOf(authority)==-1){
								var s=obj.getRootNode().getChildAt(i);
								temp[index]=s;
								index++;
							}
						}
						for(var i=0;i<temp.length;i++){
							temp[i].remove();
						}
						if(authority == 'null'){
							Ext.getCmp("treePanl").hide();
						}
					},
					itemclick:function(tree,cor){
						var id=cor.raw.id;
						if(id=="searchusers"){
							if (!Ext.getCmp("userMangerTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'用户管理',
									id:'userMangerTab',
									closable:true,
									items:[new homework.js.UserMangerGrid({
										id:'userMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}
						}else if(id=="searchClass"){
							if (!Ext.getCmp("classMangerTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'班级管理',
									id:'classMangerTab',
									closable:true,
									items:[new homework.js.ClassMangerGrid({
										id:'classMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}
						}else if(id=="updateInfo"){
							if (!Ext.getCmp("infoMangerTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'个人信息修改',
									id:'infoMangerTab',
									closable:true,
									items:[new homework.js.LoginUserInformation({
										id:'infoMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}	
						}else if(id=="updatePassword"){
							if (!Ext.getCmp("passwordMangerTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'修改密码',
									id:'passwordMangerTab',
									closable:true,
									items:[new homework.js.LoginUserPassword({
										id:'passwordMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}	
						}else if(id=="selectWorkById"){
							if (!Ext.getCmp("workMangerTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'作业管理',
									id:'workMangerTab',
									closable:true,
									items:[new homework.js.WorkMangerGrid({
										id:'workMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}	
						}else if(id=="serachWork"){
							if (!Ext.getCmp("stuWorkTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'查看作业',
									id:'stuWorkTab',
									closable:true,
									items:[new homework.js.StuWorkGrid({
										id:'stuWorkMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}	
						}else if(id=="searchScore"){
							if (!Ext.getCmp("searchScoreTab")){
								var tab=Ext.getCmp("tab");
								var t=tab.add({
									title:'查看成绩',
									id:'searchScoreTab',
									closable:true,
									items:[new homework.js.SelectSoreGrid({
										id:'searchScoreMangerTabwer',
									})]
								});
								tab.setActiveTab(t);
							}	
						}
					}
				},
				root:{
					text:'系统菜单',
					floating:true,
					icon:'images/xitongguanli.gif',
					expanded:true,//自动展开
					children:[{
						text:'用户管理',
						expanded:true,
						flags:'管理员',
						icon:'images/add.gif',
						id:'searchusers'
					},{
						text:'作业管理',
						expanded:true,
						flags:'老师',
						id:'selectWorkById',
						icon:'images/baomingguanli.gif'
					}/*,{
						text:'成绩管理',
						flags:'老师',
						expanded:true,
						id:'scoreMangerById',
						icon:'images/chengjiguanli.gif'	
					}*/,{
						text:'班级管理',
						expanded:true,
						flags:'管理员',
						icon:'images/kechengguanli.gif',
						id:'searchClass'
					},{
						text:'查看作业',
						expanded:true,
						flags:'学生',
						id:'serachWork',
						icon:'images/kechengguanli.gif'
					},{
						text:'查看成绩',
						flags:'学生',
						expanded:true,
						id:'searchScore',
						icon:'images/chengjiguanli.gif'
					},{
						text:'修改个人信息',
						expanded:true,
						flags:'管理员,老师,学生',
						id:'updateInfo',
						icon:'images/yonghuguanli.gif'
					},{
						text:'修改密码',
						flags:'管理员,老师,学生',
						expanded:true,
						id:'updatePassword',
						icon:'images/baomingguanli.gif'
					}]
				}
			})]
		},{
			region:'south',
			border:false,
			height:30,
			tbar:['欢迎【'+authority+'】'+realName+'-->进入作业管理系统','->','地址：山东省济宁市曲阜市济宁学院','版权所有:计算机科学系']
		}]
	});
});