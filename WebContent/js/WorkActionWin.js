Ext.ns("homework","homeworks.js");
Ext.define("homework.js.WorkActionWin",{
	extend:'Ext.Window',
	title:null,
	id:'workAction',
	actionText:null,
	initComponent:function(){
		Ext.apply(this,{
			title:this.title,
			id:'workAction',
			width:500,
			height:480,
			plain:true,
			modal:true,
			border:false,
			constrain:true,
			layout:'form',
			x:450,  
		    y:100,  
			frame:true,
			items:[new Ext.form.FormPanel({
				layout:'column',
				id:'workActionForm',
				frame:true,
				items:[{
					columnWidth:.5,
					layout:'form',
					plain:true,
					border:false,
					frame:true,
					items:[{
						xtype:'datefield',
						format:'Y-m-d',
						editable:false,
						fieldLabel:'开始时间',
						id:'stareTime',
						name:'stareTime',
						allowBlank:false,//不允许为空  
		                blankText:"开始时间不能为空"
					}]
				},{
					columnWidth:.5,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						xtype:'datefield',
						format:'Y-m-d ',
						editable:false,
						fieldLabel:'结束时间',
						id:'endTime',
						name:'endTime',
						allowBlank:false,//不允许为空  
		                blankText:"结束时间不能为空"
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						xtype:'textarea',
						height:70,
						fieldLabel:'作业题目',
						id:'workTitle',
						name:'workTitle'
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					hidden:true,
					hideLabel:true,
					layout:'form',
					items:[{
						xtype:'textfield',
						id:'workId',
						border:false,
						name:'workId',
						hidden:true,
						hideLabel:true
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						/*id : 'upload',  
						name : 'upload',  
					    inputType : "file",  
						fieldLabel : '上传图片',  
						xtype : 'textfield',  
					    anchor : '60%' ,*/
						xtype: 'filefield',
		                id: 'upload',
		                name: 'upload',
		                fieldLabel: '上传图片',
		                buttonText: '浏览',
					    listeners: {
	                        'change': function checkFile(o) {
	                            //验证图片文件的正则  
	                            var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
	                            if (!img_reg.test(o.value)) {
	                                Ext.Msg.alert('提示', '文件类型错误,请选择图片文件(jpe/jpeg/gif/png/bmp)');
	                                o.setRawValue('');
	                            }
	                            //取控件DOM对象  
	                            var field = document.getElementById('upload');

	                            //取控件中的input元素  
	                            var inputs = field.getElementsByTagName('input');
	                            var fileInput = null;
	                            var il = inputs.length;
	                            //取出input 类型为file的元素  
	                            for (var i = 0; i < il; i++) {
	                                if (inputs[i].type == 'file') {
	                                    fileInput = inputs[i];
	                                    break;
	                                }
	                            }
	                            if (fileInput != null) {
	                                var fileSize = getFileSize(fileInput);
	                                //允许上传不大于1M的文件  
	                                if (fileSize > 1000) {
	                                    Ext.Msg.alert('提示', '文件太大，请选择小于1M的图片文件！');
	                                    Ext.getCmp("upload").setRawValue('');
	                                }
	                            }
	                        }
	                    }
					}]
				},{
					columnWidth:1,
					plain:true,
					border:false,
					frame:true,
					layout:'form',
					items:[{
						 xtype: 'box', //或者xtype: 'component',  
	                     id: 'box_picture',
	                     width: 100, //图片宽度  
	                     height: 150, //图片高度  
	                     autoEl: {
	                         tag: 'img',    //指定为img标签  
	                         src:path+url//指定url路径  
	                     }
					}]
				}]
			})],
			buttons:[{
				text:this.actionText,
				handler:function(){
					if(Ext.getCmp("stareTime").getValue()==""||Ext.getCmp("stareTime").getValue()==null){
						Ext.Msg.alert("操作失败","开始时间不能为空！！！");
					}else if(Ext.getCmp("endTime").getValue()==""||Ext.getCmp("endTime").getValue()==null){
						Ext.Msg.alert("操作失败","结束时间不能为空！！！");
					}else if(Ext.getCmp("workTitle").getValue()==""){
						Ext.Msg.alert("操作失败","题目不能为空！！！");
					}else{
						var stareTime=Ext.getCmp("stareTime").getValue();
						var endTime=Ext.getCmp("endTime").getValue();
						var workTitle=Ext.getCmp("workTitle").getValue();
						var upload=Ext.getCmp("upload").getValue();
						var workId=Ext.getCmp("workId").getValue();
						var name=Ext.getCmp("workAction").title;
						if(name=="添加作业"){
							action=path+'/workController/addWork.do';
						}else{
							action=path+'/workController/updateWork.do';
						}
						Ext.getCmp("workActionForm").getForm().submit({
							url:action,
							method:'post',
							waitTitle:'请稍等...',
							waitMsg:'正在提交作业',
							success:function(fp,o){
								 //var result=Ext.JSON.decode(res.responseText);
								 Ext.Msg.alert("操作结果","用户操作成功");
								 Ext.getCmp("workAction").close();
								 Ext.getCmp("workMangerGrid").getStore().reload();
								 //var obj = o.result.msg;
                                 /*var start = obj.indexOf("\data") ;
                                 var end = obj.length;
                                 var src = obj.substring(start, end);*/
								// console.log(obj);
                                 //Ext.getCmp("box_picture").autoEl.dom.src =path+obj.reason;
							},
							params:{
								stareTime:stareTime,
								endTime:endTime,
								workTitle:workTitle,
								loginUserId:loginUserId,
								classId:classId,
								workId:workId,
								upload:upload,
								path:path
							}
						});
					}
					
				}
			},{
				text:'关闭',
                handler:function(){
                	url='/upload/i07.png';
                	Ext.getCmp("workAction").close();
                }
			}]
		});
		var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/  
		this.callParent(arguments);
	}
});
