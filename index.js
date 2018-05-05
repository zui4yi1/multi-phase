var routes = {
	'404': {
		js: []
	},
	todoAssits: {	// 人力--待办事项
		html: "pages/hr/todoAssits/todoAssits.html",
		js:  ["pages/hr/common/hrCommon.js", "pages/hr/common/components/StaffPopup.js", "pages/hr/common/standardCode.js","pages/hr/todoAssits/todoAssits.js"],
		css: ["pages/hr/common/common.css", "pages/hr/todoAssits/todoAssits.css"]
	},
	ckmLeaveForm:{ // 人力--请休假，第一步
		html: "pages/hr/ckmLeaveForm/ckmLeaveForm.html",
		js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/ckmLeaveForm/ckmLeaveForm.js"],
		css: ["pages/hr/common/common.css", "pages/hr/ckmLeaveForm/ckmLeaveForm.css"]
	},
	ckmLeaveReason:{ // 人力--请休假，第二步
		html: "pages/hr/ckmLeaveForm/ckmLeaveReason.html",
		js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/common/components/StaffPopup.js",  "pages/hr/ckmLeaveForm/ckmLeaveReason.js"],
		css: ["pages/hr/common/common.css", "pages/hr/ckmLeaveForm/ckmLeaveForm.css"]

		
	},
	pCertificate: { // 人力--人事证明（测试）
		html: "pages/hr/pCertificate/pCertificate.html",
		js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/common/components/FlowDetailTwo.js", "pages/hr/pCertificate/pCertificate.js"],
        css: ["pages/hr/common/common.css"]
	},
	personalAbroadForm:{// 人力--我的出国申请单
		html:"pages/hr/personalAbroadForm/abroadForm.html",
		js:["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js","pages/hr/common/components/StaffPopup.js", "pages/hr/personalAbroadForm/abroadForm.js"],
		css:["pages/hr/common/common.css","pages/hr/personalAbroadForm/abroadForm.css"]
	},
	abroadApplyInfo:{// 人力--我的出国申请单详情
		html:"pages/hr/personalAbroadForm/abroadApplyInfo.html",
		js:["pages/hr/common/hrCommon.js","pages/hr/common/standardCode.js","pages/hr/common/components/FlowDetailTwo.js","pages/hr/personalAbroadForm/abroadApplyInfo.js"],
		css:["pages/hr/common/common.css","pages/hr/personalAbroadForm/abroadForm.css"]
	},
  abroadList: {// 人力--我的出国申请列表
    html: "pages/hr/personalAbroadForm/abroadList.html",
    js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/personalAbroadForm/abroadList.js"],
    css: ["pages/hr/common/common.css","pages/hr/myFlow/myFlow.css"]
  },
	myFlow: { // 人力--我的流程
		html: "pages/hr/myFlow/myFlow.html",
		js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/myFlow/myFlow.js"],
		css: ["pages/hr/common/common.css","pages/hr/myFlow/myFlow.css"]
	},
  flowDetail: { // 人力--我的流程（流程详情）
    html: "pages/hr/myFlow/flowDetail.html",
    js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/common/components/FlowDetail.js", "pages/hr/myFlow/flowDetail.js"],
    css: ["pages/hr/common/common.css","pages/hr/myFlow/myFlow.css"]
  },
	ckmLeaveList:{ // 人力--我的请休假列表
		html: "pages/hr/ckmLeaveForm/ckmLeaveList.html",
		js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/ckmLeaveForm/ckmLeaveList.js"],
		css: ["pages/hr/common/common.css", "pages/hr/myFlow/myFlow.css"]
	},
	ckmLeaveDetail:{ // 人力--我的请休假详情
		html: "pages/hr/ckmLeaveForm/ckmLeaveDetail.html",
		js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/common/components/StaffPopup.js", "pages/hr/common/components/FlowDetailTwo.js", "pages/hr/ckmLeaveForm/ckmLeaveDetail.js"],
		css: ["pages/hr/common/common.css", "pages/hr/ckmLeaveForm/ckmLeaveForm.css"]
	},
  furloughMaintain: { // 人力--请休假管理
    html: "pages/hr/hrManage/furloughMaintain.html",
    js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/hrManage/furloughMaintain.js"],
    css: ["pages/hr/common/common.css","pages/hr/hrManage/hrMaintain.css"]
  },
  goabroadMaintain: { // 人力--因私出国管理
    html: "pages/hr/hrManage/goabroadMaintain.html",
    js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/hrManage/goabroadMaintain.js"],
    css: ["pages/hr/common/common.css","pages/hr/hrManage/hrMaintain.css"]
  },
  returnStatistics: { // 人力--因私出国未归还预警
    html: "pages/hr/hrManage/returnStatistics.html",
    js: ["pages/hr/common/hrCommon.js", "pages/hr/common/standardCode.js", "pages/hr/hrManage/returnStatistics.js"],
    css: ["pages/hr/common/common.css","pages/hr/hrManage/hrMaintain.css"]
  }
};

PJF.router = PJF.spa.start ("app", routes);