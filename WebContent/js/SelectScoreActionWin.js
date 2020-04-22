Ext.ns("homework","homeworks.js");
Ext.define("homework.js.SelectScoreActionWin",{
	extend:'Ext.Window',
	title:null,
	id:'selectScoreAction',
	initComponent:function(){
		Ext.apply(this,{
			title:this.title,
			id:'selectScoreAction',
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
				id:'selectScoreActionForm',
				frame:true,
				items:[{
					xtype:'fieldset',
					title:'查看评价',
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
						xtype:'htmleditor',
						height:280,
						width:540,
						fieldLabel:'学生答案',
						id:'stuAnswer',
						name:'stuAnswer'
					},{
						xtype:'htmleditor',
						height:100,
						width:540,
						fieldLabel:'老师寄语',
						id:'teaAssess',
						name:'teaAssess'
					}]
				}]
			})],
			buttons:[{
				text:'关闭',
                handler:function(){
                	Ext.getCmp("selectScoreAction").close();
                }
			}]
		});
		this.callParent(arguments);
	}
});