Ext.ns("homework","homeworks.js");
Ext.define("homework.js.StuWorkViewWin",{
	extend:'Ext.Window',
	title:null,
	id:'stuworkView',
	actionText:null,
	initComponent:function(){
		Ext.apply(this,{
			title:this.title,
			id:'stuworkView',
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
				id:'workActionForm',
				frame:true,
				items:[{
					xtype:'fieldset',
					title:'查看作业',
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
						 xtype: 'box', //或者xtype: 'component',  
	                     id: 'box_picture',
	                     width:300, //图片宽度  
	                     height:400, //图片高度  
	                     autoEl: {
	                         tag: 'img',    //指定为img标签  
	                         src:path+url//指定url路径  
	                     }
					}]
				}]
			})],
			buttons:[{
				text:'关闭',
                handler:function(){
                	Ext.getCmp("stuworkView").close();
                }
			}]
		});
		this.callParent(arguments);
	}
});