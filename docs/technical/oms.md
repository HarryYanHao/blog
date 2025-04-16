=迅策OMS API文档=

==公共部分==
===接口响应参数===
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| time || int || 接口逻辑处理结束时间戳，单位：秒
|-
| timeConsumption || float ||接口调用处理总共耗时，单位：秒

|}

===全局浮窗提示===
CGI：/sync/notice/get_list<br/>
使用说明：获取右下角全局浮窗列表 <br/>
请求方法：GET <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| count || int || 每页显示条数，请传递一个大整数，例如：count=9999
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/notice/get_list
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "category": "fail_entrust",   //消息分类     具体使用可查阅 sync/api/set_notification_info 接口中的说明
            "type": "",                         //消息类型      具体使用可查阅 sync/api/set_notification_info 接口中的说明
            "common_msg": "IMS100111", //可选字段，消息摘要
            "msg": "Undefined index: 000683.SZ",//消息详情
            "title": "委托结果异常", //消息标题
            "is_read": 0,//是否已读
            "created_at": "2017-12-01 14:55:13",
            "msg_id": 16,//消息id
            "ins_id": 1, //可选，对应的指令id，用于前端跳转
            "entrust_id": 1, //可选，对应的委托内部id，用于前端跳转
            "order_id": 1, //可选，对应的委托第三方编号，用于前端跳转
            "product_id": 1, //可选，对应的交易单元id，用于前端跳转
            "timestamp": 1513739515//时间戳
        }
    ],
    "timestamp": 1512114944.8218,
    "timeConsumption": 2.2591288089752,
    "requestStartTime": null,
    "input": []
}



 </pre>

===修改全局浮窗提示为已读状态===
CGI：/sync/notice/change_read_status<br/>
使用说明：修改全局浮窗已读状态 <br/>
请求方法：POST <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| msg_id || int || 消息id，如果是要忽略所有消息，则该字段传空值
|-
| category || string || 当msg_id传空时，该字段才生效。 标示要忽略的消息类别。支持 new_ins/cancel_ins/fail_entrust/risk.  若传空则忽略所有类型数据
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/notice/change_read_status
{
    "code": 0,
    "msg": "ok",
    "data": []
}
 </pre>

===获取右上角浮窗信息===
CGI：/sync/notice/notice_list<br/>
使用说明：用于获取右上角浮窗数据信息 <br/>
socket推送时，接口调用category传參为空，获取计数信息及各类列表数据各六条，用于展示 <br/>
当用户在某类列表中往下滚动，想要看该类的更多数据时，再次调用接口传參category为具体类别值。此时接口单独返回该类的所有数据<br/>
请求方法：GET <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| category || string || 空值/new_ins/cancel_ins/fail_entrust/risk
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/notice/notice_list
响应：(以下为category为空时的返回。若category为具体类别值，则直接给到数组对象列表)
{
    "code":0,
    "msg":"ok",
    "data":[
        {    //未读计数信息
            "risk":0,           //风控类未读计数
            "new_ins":0,    //提交指令类未读计数
            "cancel_ins":0,   //撤销指令类未读计数
            "fail_entrust":0     //异常订单类未读计数
        },
        [    //风控类列表-最多6条
            {
                "title":"触发风控",
                "common_msg":"中信讯投_21",
                "msg":"触发基金风控：基金投资非现金类资产，个股持仓成本/T-1日基金净资产≥0.00%，预警 ，生效时间：2019-05-10起 当前值：733487.SH 亨通发债个股持仓成本/T-1日基金净资产=4.03%（个股持仓成本：10,000,000.00，T-1日基金净资产：248,023,376.32）",
                "category":"risk",
                "product_id":"10808",   
                "created_at":"2019-05-30 11:34:49",
                "timestamp":1559187289,
                "msg_id":3050,     
                "is_read":1         //是否已读 1是0否
            },
            {
                "title":"触发风控",
                "common_msg":"中信讯投_21",
                "msg":"触发基金风控：基金投资非现金类资产，个股持仓市值/T-1日基金净资产≥0.00%，预警 ，生效时间：2019-05-10起 当前值：733487.SH 亨通发债个股持仓市值/T-1日基金净资产=4.03%（个股持仓市值：10,000,000.00，T-1日基金净资产：248,023,376.32）",
                "category":"risk",
                "product_id":"10808",
                "created_at":"2019-05-30 11:34:49",
                "timestamp":1559187289,
                "msg_id":3049,
                "is_read":1
            }
        ],
        [    //指令提交类列表-最多6条
            {
                "category":"new_ins",
                "ins_id":7303,
                "title":"收到指令",
                "common_msg":"[万科A000002.SZ]买入-广发恒生港股单元",
                "msg":"请及时处理",
                "created_at":"2019-05-30 13:54:15",
                "timestamp":1559195655,
                "msg_id":3081,
                "is_read":1
            }
        ],
        [       //指令撤销类列表-最多6条
            {
                "category":"cancel_ins",
                "ins_id":7282,
                "title":"撤销指令",
                "common_msg":"000001.SZ平安银行_海通讯投A股(...)_test_zhou_买入",
                "msg":"指令已撤销",
                "created_at":"2019-05-30 13:17:51",
                "timestamp":1559193471,
                "msg_id":3054,
                "is_read":1
            }
        ],
        [      //异常订单类列表-最多6条
            {
                "category":"fail_entrust",
                "ins_id":"7302",
                "entrust_id":220212,
                "msg":"该产品119该组合309对该市场1的该股东代码B887734002无操作权限",
                "title":"订单异常",
                "common_msg":"7302广发恒生港股单元",
                "created_at":"2019-05-30 13:50:46",
                "timestamp":1559195446,
                "msg_id":3080,
                "is_read":1
            }
        ],
        
        [
            {//收益互换类列表-最多6条
                "category":"swap_ins",
                "ins_id":19231,
                "title":"邮件发送失败",
                "common_msg":"收益互换交易单元-收益互换指令当前暂不支持爱建证券",
                "msg":"",
                "created_at":"2021-08-17 10:00:53",
                "timestamp":1629165653,
                "msg_id":211,
                "is_read":0
            }
        ],
        {      //总条数信息 - 包含已读和未读
            "risk":3019,
            "new_ins":38,
            "cancel_ins":8,
            "fail_entrust":15,
            "swap_ins":1,
        }
    ],
    "timestamp":1559195707.5158,
    "timeConsumption":0.20836806297302,
    "requestStartTime":null
}





 </pre>

===全局浮窗内容写入===
CGI：/sync/api/set_notification_info<br/>
使用说明：全局浮窗内容写入，在右下角弹窗显示 <br/>
请求方法：POST <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| user_id || array || 有权限的用户id
|-
| info || array ||
{| class="wikitable"
! 参数 !! 类型 !! 说明
|-
| category || string ||  通知类型,会对不同值进行分别计数统计及分类列表存储。会在右上角浮窗中分类展示。有需求的才用，否则不要乱赋该值   目前前端已支持5种类别展示
|-
| type || string ||  定义不同消息类型，用于和前端约定做一些不同的交互使用。默认情况可不填。可较灵活使用
|-
| title || string ||  通知标题
|-
| common_msg || string ||消息摘要，可选字段
|-
| msg || string ||具体消息详情
|-
| ins_id || string || 可选，对应的指令id，用于前端跳转
|-
| entrust_id || string || 可选，对应的委托 id，用于前端跳转
|-
| order_id || string || 可选，对应的委托 order_id，用于前端跳转
|-
| product_id || string || 可选，对应的交易单元id，用于前端必要的跳转
|-
| review_id || string || 可选，对应的人员权限的审核单id，用于前端必要的跳转
|}
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

已支持的各种消息来源：<br/>
{| class="wikitable"
|-
! 消息类型 !! category !! type !! 代码调用点
|-
| tb3系统状态异常 ||   ||  || BMS - checkTb3Status.php
|-
| 收到指令 || new_ins || || IPB - Service/Sync/Instruction/InsService.php
|-
| 指令撤销 || cancel_ins || || IPB - Service/Sync/Instruction/InsService.php
|-
| 收益互换邮件发送成功失败 || swap_ins || || IPB - Service/Sync/Instruction/InsService.php
|-
| 废单 || fail_entrust || || OMS -  Services/BrokerSync/SyncEntrustService.php
|-
| 订单异常 || fail_entrust || || OMS -  Services/Sync/Workflow/SyncWorkflowV2EntrustService.php
|-
| 指令自动审批异常 || fail_review（前端暂未支持展示） || || OMS -  Services/BrokerSync/SyncInsReviewService.php
|-
| 触发事后风控 || risk || || RMS -  Libs/Scene/BaseScene.php
|-
| 人员权限需要审批提醒 || review（前端暂未支持展示） || || BMS -  RoleOspController.php UserOspController.php
|-
| 人员权限审批结果通知 || || || BMS - ReviewController.php
|-
| 因授权而无法登陆 || || prov_auth（该值将触发前端强制性中央弹框） || BMS - UserOspController.php
|-
| 盘后风控弹窗 || || after_market_risk（该值将触发前端强制性中央弹框） || RMS - RuleStatusReFreshAfter.php
|-
| 投研绩效历史清算完成 ||  || research_history_settle（该值将触发前端强制性中央弹框） || BMS - Comand/HistorySettle.php
|-
| 发行人数据更新提醒 || update_issuer（前端暂未支持展示）   ||  || BMS - IssuerController.php
|-
| 改单撤单成功 || || cancel_order || OMS -  Services/BrokerSync/SyncEntrustService.php
|-
| 算法委托风控计算结果由通过变为触发禁止 ||   || algo_risk_hit || IPB - Service/Sync/Instruction/InsService.php
|-
| 算法委托风控计算结果由触发禁止变为通过 ||   || algo_risk_ok || IPB - Service/Sync/Instruction/InsService.php
|-
| 风控审核消息 ||   || new_audit || RMS - App/Http/Controllers/Rule/RiskAuditController.php
|}
category	通知类型,会对不同值进行分别计数统计及分类列表存储。会在右上角浮窗中分类展示。有需求的才用，否则不要乱赋该值 目前前端已支持5种类别展示<br/>
type 定义不同消息类型，用于和前端约定做一些不同的交互使用。默认情况可不填。可较灵活使用


示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/sync/api/set_notification_info

响应：
{
"code": 0,//撤销失败时返回失败的状态码
"msg": "ok",//撤销失败时返回失败的错误提示
"data":""
}
</pre>

===关闭强制性弹窗===
CGI：/sync/notice/close_tips<br/>
使用说明：关闭强制性弹窗 <br/>
请求方法：POST <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type || int || 1 公募版收到新提交指令的强制弹窗  2公募版收到新分发指令的强制弹窗
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/notice/close_tips
{
    "code": 0,
    "msg": "ok",
    "data": []
}
 </pre>

===获取后台配置项===
CGI：/sync/helper/front_config<br/>
使用说明：获取后台配置项 <br/>
请求方法：GET <br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| is_auth || int || 0不需要鉴权信息，1需要鉴权信息
|-
| need_front_config || int || 0不需要前端配置信息，1需要前端配置信息; 不传默认为0
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/sync/helper/front_config
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"logined_info": {
			"user_id": "570000",
			"nick_name": "刘军",
			"real_name": "刘军",
			"user_property_type": "0",
			"avatar_url": "/omsv2/images/avatar-operator/default/avatar.png",
			"account_type": "0",
			"role_id": [
				"1"
			],
			"org_id": "57",
			"cellphone": "",
			"is_checkPhone": "0",
			"mac": "",
			"is_checkMac": "0",
			"ip": "",
			"status": "1",
			"is_fresh": "1",
			"permission": {
				"20": [],
			},
			"is_logined": true,
			"my_permission": {
				"501": {
					"product_do_trade": 1,
					"product_do_risk": 1,
					"product_do_ins_submit": 1,
					"product_do_ins_exec": 1,
					"product_do_ins_submit_mobile": 1
				}
			},
			"role_permission": {
			
				"98": [
					
				]
			},
			"org_info": {
				"id": "57",
				"app_name": "dev2",
				"max_user": "1000",
				"company": "",
				"theme": "1",
				"version": "2",
				"allow_asset": "E,F",
				"created_at": "2018-05-23 16:03:47",
				"updated_at": "2018-05-23 16:03:47",
				"password_expire_day": "0",
				"active": "1",
				"broker": "60",
                                "is_hide_check_phone":0, // 是否隐藏勾选手机验证登录 1：隐藏 0：保留
                                "is_hide_remote_control":0, // 是否隐藏远程控制 1：隐藏 0：保留
			}
		},
		"path_prefix": "/omsv2",
		"custom": {
			"app": "cpm",
			"app_name": "和聚",
			"app_name_suffix": "资产管理平台",
			"app_name_en": "Standard",
			"app_name_suffix_en": "Asset Management System",
			"company": "深圳迅策科技有限公司",
			"app_title": "标准版资产管理平台",
			"login_view": "user.login_v2",
			"top_view": "common.top_navbar_standard",
			"nav_view": [
				"common.content_side_nav.standard",
				"common.content_side_nav.product_list"
			],
			"index_uri": "/user/welcome",
			"format_user_id": 0,
			"background_image": "https://dn-gmf-product-face.qbox.me/water_print/water_print_xunce.png",
			"theme": "gaoyi",
			"showProductType": "0",
			"queryDataType": "0",
			"showProductDetail": "0",
			"getPolicyGridData": "0",
			"showBasicTop": "0"
		},
                "last_manage_product":[123,234]
		"nav_permission": {
			"ins_add": 0,
			"instruct_add": 1,
			"entrust_add": 1,
			"strategy_adv": 0,
			"strategy_ins": 0,
			"risk_manage": 1,
			"product_risk": 1,
			"sec_pool_manage": 1,
			"advanced_manage": 0,
			"user_manage": 1,
			"user_edit": 1,
			"password_reset": 1,
			"user_delete": 1,
			"unlock_user": 0,
			"view_instruct": 0,
			"view_entrust": 1,
			"view_deal": 1,
			"view_position": 1,
			"view_fee": 0,
			"view_cash": 1,
			"report_view": 1,
			"position_report_view": 1,
			"concern_stock": 1,
			"product_manage": 0,
			"product_manage_v2": 0,
			"product_split": 0,
			"product_base": 0,
			"product_user": 0,
			"cost_set": 1,
			"product_cash": 0,
			"otc_capital": 1,
			"account_list": 1,
			"suspension": 1,
			"view_data": 1,
			"select_cash": 1,
			"select_fee": 0,
			"select_position": 1,
			"select_deal": 1,
			"select_entrust": 1,
			"select_instruct": 0,
			"view_data_v2": 1,
			"sys_setting": 1,
			"ins_notify": 1,
			"ins_review": 1,
			"ins_submit": 1,
			"ins_exec": 1,
			"ins_manage": 1,
			"fund_valuation": 1,
			"valuation_manage": 1,
			"data_acceptance": 1,
			"file_center": 1,
			"ir_system": 1,
			"portfolio_analysis": 1,
			"system_property_setting": 1,
			"org_manage": 0
		}
	},
        "front_config": { //3.26新添加配置项，前端配置的参数
	"ins_add": {
		"config": [
			"1",
			"3"
		],
		"type": "ins_add"
	      }
      },
	"timestamp": 1530523161.1241,
	"timeConsumption": 0.58138608932495,
	"requestStartTime": null,
	"input": []
}
</pre>

===设置前台配置项===
CGI：sync/helper/set_front_config<br/>
使用说明：获取后台配置项 <br/>
请求方法：POST <br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type || string || 前台配置类型，需要与后端协商
|-
| config || array || 前台配置项，数组形式
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/helper/set_front_config
POST参数：
type=ins_add&config[]=1&config[]=3
响应：
{
	"code": 0,
	"msg": "配置更新成功",
	"data": []
}
</pre>

===获取配置项===
CGI：sync/helper/get_front_config<br/>
使用说明：获取后台配置项 <br/>
请求方法：GET <br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type || string || 前台配置类型，需要与后端协商
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/helper/get_front_config?type=ins_exec_list
响应：
{
	"code": 0,
	"msg": "ok",
	"data":  {
		"config": [
			"1",
			"3"
		],
		"type": "ins_add"
	}
}
</pre>

===证券代码模糊匹配===
CGI：omsv2/oms/helper/code_genius<br/>
使用说明：证券代码模糊匹配，获取匹配到的代码结果集<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| stock_code || string || 输入的代码
|-
| assets_class || string || 匹配的范围 枚举值有e,f,repo,bond,ehksh,ehksz,ft 等
|-
| hk_mode || int || 可选参数。是否对输入的code额外在港股hk后缀中进行匹配。用于支持港股通代码调出时的持仓相关代码的卖出
|-
| product_ids || string || 可选参数。当hk_mode=1时，传值当前勾选的交易单元id。多个间以逗号隔开
|}
注意：当hk_mode=1时，返回的匹配结果中，如果数据里有match_from_hk字段且为1，则代表该条结果为额外匹配出来的。<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://42.159.94.59/omsv2/oms/helper/code_genius?stock_code=03700&assets_class=ehksz&hk_mode=1&product_ids=10983

响应：
{
    "code":0,
    "msg":"",
    "data":[
        {
            "stock_id":"03700.HKSZ",
            "stock_code":"03700",
            "stock_name":"映客",
            "trading_unit":"1000",
            "total_share_capital":"2006956000",
            "free_share_capital":"2047661000",
            "issued_share":null,
            "swindex_1st_code":0,
            "swindex_1st_name":0,
            "swindex_2nd_code":0,
            "swindex_2nd_name":0,
            "swindex_3rd_code":0,
            "swindex_3rd_name":0,
            "amac_index":null,
            "amac_name":null,
            "dr_conversion_ratio":null,
            "is_suspension":"0",
            "exchange":"HKSZ",
            "last_price":"1.3100",
            "prev_close_price":"1.3100",
            "change":"0.0000",
            "change_ratio":"0",
            "asset_class":"0",
            "market_status":"1",
            "market_info":"已收盘",
            "sec_timestamp":"1581494481.689",
            "industry":"其他",
            "detail_classify":"HK_STOCK",
            "sec_ids_with_same_issuer":[

            ],
            "wind_industry_1st_name":"信息技术",
            "wind_industry_2nd_name":"软件与服务",
            "wind_industry_3rd_name":"软件",
            "wind_industry_4th_name":"家庭娱乐软件",
            "asset_sub_class_2nd":"普通股",
            "share_pledged_rate":null,
            "match_from_hk":1
        }
    ]
}

</pre>

===高毅版 交易单元基础信息列表===
CGI：omsv2/oms/api/get_permission_products<br/>
使用说明：获取交易单元列表<br/>
请注意，返回的交易单元列表有排序，根据基金管理页面的排序而排序<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| filter_notrade || int || 是否要过滤未开放交易功能的交易单元 1是0否
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/oms/api/get_permission_products?filter_notrade=1

响应：
{
    "code":0,
    "msg":"ok",
    "data":[
        {
            "id":"10087",
            "org_id":"19",
            "name":"嘉实O32",     //交易单元名称
            "operator_uid":"190001",
            "trader_uid":"0",
            "start_time":"0",
            "stop_time":"0",
            "status":"5",
            "order_number":"0",
            "created_at":"2018-12-24 14:14:40",
            "updated_at":"2018-12-28 16:20:23",
            "base_id":"30081",      //所属底层账户id
            "fund_type":"1",
            "auto_verify":"1",
            "volume":"0.00000000",
            "is_forever":"1",
            "begin_capital":"0.000",
            "collect_capital":"0.000",
            "loan_capital":"0.000",
            "assure_capital":"0.000",
            "lever_ratio":"0.00",
            "margin_trading":"0",
            "group_id":"103",    //所属基金id
            "ins_auto_exec":"0",
            "deleted_at":null,
            "use_in_trade":"1",     //是否开放了交易属性
            "is_future":"0",   //是否期货交易单元 0否1是
            "left_running_day":0,
            "clearance_day":"2018-12-29",
            "is_recruiting":false,
            "is_running":true,
            "is_stoped":false,
            "channel":"5",
            "fee_mode":"1",
            "stock_type":"0",
            "market":"0",
            "trade_asset_class":"",
            "lock_status":"1",
            "pb_info":{
                "fund_id":"18",
                "unit_id":"32",
                "combi_id":"32",
                "account_id":"",
                "fund_name":"",
                "unit_name":"",
                "pb_ins_type":"",
                "ins_auto_exec":0,
                "investment_advisor":""
            },
            "group_order_number":"0",
            "settlement_type":1,
            "fund_inner_type":"1",
            "left_buy_day":0,
            "is_disable":false,
            "stop_loss":0.75,
            "early_warning":0.85,
            "support_market":1,
            "operator_name":"高毅体验",
            "group_name":"嘉实O32"       //所属基金名称
        }
    ]
}

</pre>

==【机构版】指令管理==

===指令提交试算资产比例===
CGI：ipb-pub/sync/instruction/trial_asset_ratio<br/>
使用说明：提交指令接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| param || json || json格式 [{"is_future":0,"product_id":"159",stock_id="000001.SZ","stock_name":"平安银行","product_name":"利伟维实","ins_volume":100,"front_ratio":1.1,"direction":1,"quote_type":1,quote_price:12.3},{"product_id":"155",stock_id="000001.SZ""stock_name":"平安银行","product_name":"利伟维实","ins_volume":200,"front_ratio":1.1,"direction":1,"quote_type":1,quote_price:12.3,"is_future":0}]
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/trial_asset_ratio

响应：
{
"code": 0,
"msg": "ok",
"data": {
   "159_000001.SZ" : { //交易单元_证券代码
     "product_id" : 159,
     "stock_id" : "000001.SZ",
     "front_ratio" : 0.25, //前端传入比例
     "asset_ratio" : 0.24, //后端算出比例
     "diverge" : 0.02, //偏移度
     "is_except" : false //是否异常
     “ins_volume”: 1000,
     "status" : 0,
     "msg" : "ok"
   },
   "155_000001.SZ" : {
     "product_id" : 155,
     "stock_id" : "000001.SZ",
     "front_ratio" : 0.25, //前端传入比例
     "asset_ratio" : 0.24, //后端算出比例
     "diverge" : 0.02, //偏移度
     "is_except" : false //是否异常
     “ins_volume”: 1000,
     "status" : 0,
     "msg" : "ok"
   },
}
}
 </pre>

===获取交易单元资产数据===
CGI：/oms/api/get_multi_settlement_info_v2<br/>
使用说明：获取交易单元资产数据,用于委托管理或指令交易-指令提交页面定时轮询获取 <br/>
请求方法：GET <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || array || 产品id的数组
|-
| channel || string || ins表示来自指令交易页面的请求，entrust表示来自委托管理页面的请求。不传默认ins
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/oms/api/get_multi_settlement_info_v2?product_id[]=1600347&channel=ins

响应：
{
"code": 0,//撤销失败时返回失败的状态码
"msg": "ok",//撤销失败时返回失败的错误提示
"data":{ 
     "1600347": {
               {
                 "code":0,
                 "msg":"ok",
                 "data":{
                    "total_assets": "100000009.00000",//基金总资产
                    "balance_amount": 99998886,//交易单元余额
                    "net_assets": 100000009,//基金净资产
                    "net_assets_sys": 100000009,//基金净资产-系统实际计算的值，用于展示
                    "net_assets_import": 100000009,//基金净资产-导入值，用于展示。  机构未启用开关时，没有该字段返回
                    "product_net_assets": 100000009,//交易单元净资产
                    "enable_cash": "99997806.00000",//交易可用余额
                    "enable_cash_hksz": "99997806.00000",//深港通交易可用余额
                    "enable_cash_hksh": "99997806.00000",//沪港通交易可用余额
                    "net_value": 12500.001125,//基金净值
                    "stock_position": 0,//股票仓位
                    "stock_etf_position": 0//股票+etf仓位
                    "ins_enable_cash": 907190001.44 //指令层可用余额
                    "ins_enable_cash_hksh": 907190001.44//指令层沪港通可用
                    "ins_enable_cash_hksz": 907190001.44//指令层深港通可用
                    "ins_usable0_cash" : 0,//指令层收益互换可用
                    "usable0_cash" : 0,//收益互换可用资金 模版导入
                   
                  //期货返回     
                    future_margin_usable：100   //期货保证金可用
                    future_right:100 //期货权益
                    future_risk_degree:100 //期货风险度
                   stare_market_profit: 100 //盯市盈亏
                   today_close_profit: 100 //平仓盈亏
                   margin_occupation: 100  //保证金占用
                   directive_margin: 1000  //指令保证金
                   ins_enable_future: -1512712140 //指令层期货可用
              }
         }
     },
     "total": {
               {
                 "net_assets":0,//公司层总的净资产
              }
     }
}
</pre>

===指令撤销===
CGI：/sync/instruction/manage_cancel<br/>
注：已迁移至IPB,前端调用请使用IPB前缀<br/>
使用说明：多(单)指令撤销接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id_arr || array || 要撤销的对象列表，支持批量多个，数组形式。如果撤整个指令，值为{ins_id}，如果撤子项，值为{ins_id}_{stock_id}_{product_id} 见示例
|-
| ignore_tips || int || 可选参数，是否忽略提示性风控 1是0否 默认0
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/manage_cancel?ins_id_arr[]=112&ins_id_arr[]=113_000683.SZ_100001
响应：
{
"code": 20052,//撤销失败时返回失败的状态码
"msg": "error",//撤销失败时返回失败的错误提示
"data": [
     "112":{
                "code":0,
                "msg":"撤销成功",
                "data":"",
          }，
     "113":{
                "code":-1,//撤销失败，这里的code统一为-1
                "msg":"指令撤销失败，关联委托撤销失败！"
                "data":"",
                "debug_info":[]//调试信息
          }，
 ]
}
 </pre>

===指令提交===
CGI：ipb-pub/sync/instruction/manage_add<br/>
使用说明：提交指令接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| stock_id|| string||股票代码，例如000683.sz，若为系统无法识别的代码，此值传0
|-
| stock_name|| string||股票名称，若为期货，此值为必须填写；若代码为无法识别，则把代码传入该值
|-
| direction|| string ||报价方向，1买入，2卖出 ，3买入开仓 4卖出开仓 5买入平仓 6卖出平仓 9卖空 10买平 （3-6期货 1,2,9,10收益互换）
|-
| add_ins_method|| int ||添加指令的方法，1按目标仓位 2按基金净资产比例 3按指令数量 4按持仓比例 5按多交易单元总量 6按单元净资产比例 7按基金目标仓位
|-
| method_sub_type|| int ||下单方式附属选项 当add_ins_method=5时，1平均分配2产品净值比例3单元可用金额比例4最大量5自定义比例6单元净值比例7单元可用数量比例 收益互换时add_ins_method为4时，method_sub_type 按基金经理：1， 按交易券商：2， 按基金：3
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
| quote_type|| string ||指令级报价类型：1限价，10不限价
|-
| quote_price|| double ||指令级报价价格，为根据百分比计算得到的极值(买入限最高，卖出限最低)  不限价模式时填0
|-
| quote_price_percent|| double ||基于基础价格计算价格区间的百分比
|-
| product_id|| array ||产品id数组，用于鉴定权限，请跟sub_list参数的第1维的产品id列表保持一致
|-
| cal_price_percent|| float ||计算价格百分比，默认为0
|-
| cal_price_type|| int ||计算价格百分比类型，0现价 1最新价
|-
|sub_list|| array||具体子项的下单信息，具体包含值见下面各行
|-
|sub_list[产品id]['add_ins_method']|| int||子项的下单方式 如果不传，则默认按指令级的下单方式  1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|sub_list[产品id]['add_ins_value']|| double ||对应子项下单方式的具体数量或百分比或交易权重值
|-
|sub_list[产品id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[产品id]['quote_price']|| double ||子项的报价价格，如果不传则默认按指令级报价价格。
|-
|sub_list[产品id]['ins_volume']|| double ||子项的具体下单股数
|-
| ignore_tips|| int ||1忽略提示性风控，0不忽略提示性风控
|-
|ins_memo|| string ||可选，指令备忘
|-
|from|| string ||可选参数，选项：pc，h5，其它则默认为pc，此参数用以统计指令来源
|-
|is_future|| string ||是否为期货，可选参数，1为是，其它表示不是
|-
|clearance|| int ||是否为全部清仓 提交，可选参数，1为是，默认0不是
|-
|is_auto_execute|| int ||是否自动执行 1为是，默认0不是
|-
|fund_manager_id|| int || 基金经理id
|-
|deadline_at|| string || 指令过期时间 Y-m-d
|-
| risk_batch_id || string || 前端请求风控试算时使用的对应的batch_id值，用于后端识别风控结果
|-
| ignore_risk || int || 0默认不忽略风控，收益互换自定义代码忽略风控1 
|-
| executor_id || int || -1 默认不指定交易员 或者指定交易员的id如9990000
|-
|is_swap|| string ||是否为收益互换，可选参数，1为是，其它表示不是
|-
|fix_algo_type|| int ||fix算法类型1-oneOrder,2-TWAP,3-VWAP,4-POV,5-Iceberg'
|-
|fix_start_time|| string ||fix算法开始时间
|-
|fix_end_time|| string ||fix算法结束时间
|-
|fix_mp || string ||fix市场参与度
|-
|fix_open|| boolean||fix参与开盘 1是 0否
|-
|fix_close|| boolean||fix参与收盘 1是 0否
|-
|fix_memo|| string ||交易说明
|-
|fix_ds|| string ||显示数量
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/manage_add
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&stock_id=000683.sz&quote_type=1&quote_price=6.83
&quote_price_percent=0&product_id[]=10032&sub_list[10032][ins_volume]=200&
ignore_tips=0&priority=4&ins_memo=&ignore_risk=1
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===修改指令===
CGI：/sync/instruction/manage_modify<br/>
注：已迁移至IPB,前端调用请使用IPB前缀<br/>
使用说明：修改指令接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id|| int ||指令id
|-
| add_ins_method|| int ||添加指令的方法，1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 5按多交易单元总量 6按单元净资产比例 7按基金目标仓位
|-
| method_sub_type|| int ||下单方式附属选项 当add_ins_method=5时，1平均分配2产品净值比例3单元可用金额比例4最大量5自定义比例6单元净值比例7单元可用数量比例
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
| quote_price|| double ||报价价格，为根据百分比计算得到的极值(买入限最高，卖出限最低)  不限价模式时填0
|-
| quote_type|| string ||报价类型：1限价，10不限价
|-
| quote_price_percent|| double ||基于基础价格计算价格区间的百分比
|-
| product_id|| array ||产品id数组，用于鉴定权限，请跟sub_list参数的第1维的产品id列表保持一致
|-
| cal_price_percent|| float ||计算价格百分比，默认为0
|-
| cal_price_type|| int ||计算价格百分比类型，0现价 1最新价
|-
|sub_list|| array||具体子项的下单信息，具体包含值见下面各行
|-
|sub_list[产品id]['add_ins_method']|| int||子项的下单方式 如果不传，则默认按指令级的下单方式  1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|sub_list[产品id]['add_ins_value']|| double ||对应子项下单方式的具体具体数量或百分比或交易权重
|-
|sub_list[产品id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[产品id]['quote_price']|| double ||子项的报价价格，如果不传则默认按指令级报价价格。
|-
|sub_list[产品id]['ins_volume']|| double ||子项的具体下单股数
|-
|sub_list[产品id]['deadline_at']|| string ||子项截止日期
|-
|ignore_risk|| int ||1忽略风控，0不忽略风控，3.12迭代的请传入1
|-
| ignore_tips|| int ||1忽略提示性风控，0不忽略提示性风控
|-
|priority|| int ||可选，不传此参数则表示优先级为空，4低优先级，7中优先级，10高优先级
|-
|ins_memo|| string ||可选，指令备忘
|-
|from|| string ||可选参数，选项：pc，h5，其它则默认为pc，此参数用以统计指令来源
|-
|is_auto_execute|| int ||是否自动执行 1为是，默认0不是
|-
|deadline_at|| string ||指令截止日期 Y-m-d （如果修改子项 这个参数传当前值）
|-
| risk_batch_id || string || 前端请求风控试算时使用的对应的batch_id值，用于后端识别风控结果
|-
| executor_id || int|| 默认-1不指定交易员 指定则传交易员id
|-
| old_executor_id || int|| 修改前的交易员id没指定则为-1，用于后端判断是否需要重新分发(分发模式下)
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/manage_modify
POST参数：
ins_id=1116&add_ins_method=3&quote_price=6.83&product_id[]=1600497&product_id[]=1600499&sub_list[1600497][ins_volume]=300&sub_list[1600499]
[ins_volume]=300&ignore_tips=1&priority=4&ins_memo=&ignore_risk=1&front_add_ins_value=300&quote_price_percent=0
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
                //修改成功的交易单元
		"pass_product": { 
			"1600497": {
				"code": 0,
				"msg": "ok",
				"data": []
			}
		},
                 //不能修改的交易单元
		"reject_product": {
			"1600499": {
				"code": 0,
				"msg": "修改指令数量小于已成交数量",
				"data": []
			}
		}
	}
}
 </pre>

===组合指令-指令提交===
CGI：ipb-pub/sync/instruction/combi_add<br/>
使用说明：组合指令提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| string||交易单元id
|-
| direction|| int ||实际报价方向，1买入，2卖出
|-
|quote_type|| int||1限价 10不限价   11-15 买1-买5  16-20 卖1-卖5
|-
| method_sub_type|| int ||前端下单权重方式 3按持仓市值权重 4按平均权重   仅透传用，无后端逻辑
|-
| front_direction|| int ||前端委托方向，1买入，2卖出，3调整到   仅透传用，无后端逻辑
|-
| add_ins_method|| int ||添加指令的方法，1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
|sub_list|| array||子列表的下单信息,第一维以证券id为key（如000683.SZ）,第二维可能包含以下字段
|-
|sub_list[证券id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价  11-15 买1-买5  16-20 卖1-卖5
|-
|sub_list[证券id]['quote_price']|| double ||子项的报价价格，不限价时填0即可
|-
|sub_list[证券id]['ins_volume']|| double ||子项的具体下单股数
|-
|ins_memo|| string ||可选，指令备忘
|-
|deadline_at|| string || 指令过期时间 Y-m-d
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/combi_add
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&sub_list[000683.SZ][quote_price]=3.88
&product_id=10032&sub_list[000683.SZ][ins_volume]=200&ins_memo=
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===组合指令-获取持仓列表数据===
CGI：omsv2/sync/api/product_position_info<br/>
使用说明：组合指令-获取持仓列表数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| string||交易单元id
|-
| ins_id|| int||可选参数   用于修改指令或复制指令时传參指令id，会返回对应指令涉及的股票的持仓信息
|-
| need_raw_position|| int|| 可选参数，默认1    是否需要返回交易单元的所有持仓 0否1是 场景：修改指令时否，新增或复制时是
|-
| position_type|| int||    1 A股持仓 2港股持仓
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://42.159.94.59/omsv2/sync/api/product_position_info?product_id=10910

响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[      //持仓列表
            {
                "market":1,          //1沪A 2深A 3沪港通 4深港通
                "stock_id":"000001.SZ",    //证券id
                "stock_name":"平安银行",    //证券名称
                "trading_unit":100,               //每手股数
                "is_suspension":1,               //是否停牌 1是0否
                "last_price":"16.97",             //最新价      港股时，币种为港币
                "bid1_price":"16.97",             //盘口价-买1      港股时，币种为港币
                "bid2_price":"16.97",             //盘口价-买2      港股时，币种为港币
                "bid3_price":"16.97",             //盘口价-买3      港股时，币种为港币
                "bid4_price":"16.97",             //盘口价-买4      港股时，币种为港币
                "bid5_price":"16.97",             //盘口价-买5      港股时，币种为港币
                "ask1_price":"16.97",             //盘口价-卖1      港股时，币种为港币
                "ask2_price":"16.97",             //盘口价-卖2      港股时，币种为港币
                "ask3_price":"16.97",             //盘口价-卖3      港股时，币种为港币
                "ask4_price":"16.97",             //盘口价-卖4      港股时，币种为港币
                "ask5_price":"16.97",             //盘口价-卖5      港股时，币种为港币
                "stop_top":"18.94",              //涨停价      港股时，币种为港币
                "stop_down":"15.50",           //跌停价      港股时，币种为港币
                "price_level":"0.01",             
                "market_value":"87959065.74000",    //持仓市值      港股时，币种为港币
                "hold_volume":"5046418.00",            //持仓数量
                "usable_volume":"5046418.00"          //可用数量
            }
        ],
        "net_assets":-11380.4595 //基金净资产
    }
}
 </pre>

===篮子指令-指令提交===
CGI：ipb-pub/sync/instruction/basket_add<br/>
使用说明：篮子指令提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| string||交易单元id
|-
| add_ins_method|| int|| 3按绝对数量
|-
| direction|| string ||报价方向，1买入，2卖出
|-
| quote_type|| int ||指令报价方式，-1最新价 1限价 3买卖1 4买卖2 5买卖3 6买卖4 7买卖5档 10不限价
|-
|sub_list|| array||子列表的下单信息,第一维以证券id为key（如000683.SZ）,第二维可能包含以下字段
|-
|sub_list[证券id]['quote_price']|| double||下单价格
|-
|sub_list[证券id]['ins_volume']|| int||指令数量
|-
|sub_list[证券id]['quote_type']|| int||子项报价方式 可选，若不传值则使用公共quote_type值。-1最新价 1限价 3买卖1 4买卖2 5买卖3 6买卖4 7买卖5档 10不限价
|-
|from|| string || h5
|-
|basket_from|| int || 篮子来源 0文件导入 1组合模板
|-
|deviation_type|| int || 价格偏离类型 0按绝对价格 1按比例
|-
|deviation_amount|| float || 偏离值 浮点数 数值或百分比
|-
|target_type|| int || 目标类型  0按照份数 1按照金额 2按持仓数量比例
|-
|copies|| int || 指令份数
|-
|proportion|| float || 持仓比例
|-
|ins_price|| int || 指令金额
|-
| ignore_tips|| int ||1忽略提示性风控，0不忽略提示性风控
|-
|template_type|| int || 模板类型 1自定义 2当前持仓
|-
|template_id|| string || 模板id
|-
|mark|| array || 勾选id数组
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/basket_add
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&sub_list[000683.SZ][quote_price]=3.88
&product_id=10032&sub_list[000683.SZ][ins_volume]=200&ins_memo=
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===篮子指令-文件导入后获取数据接口===
CGI：ipb-pub/sync/instruction/get_basket_file_list?filepath=lanzi.xlsx<br/>
使用说明：文件导入后获取数据接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| filepath || string||上传后返回的文件名
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回文件内容 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/get_basket_file_list?filepath=lanzi.xlsx
响应：
{
"code": 0,
"msg": "ok",
"data": []
}
 </pre>

===篮子指令-选择篮子获取数据接口===
CGI：ipb-pub/sync/instruction/get_templet_list?tmp_id=4<br/>
使用说明：篮子指令-选择篮子获取数据接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id|| int||所选择模板的id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回当前模板下的证券数据 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/get_templet_list?tmp_id=4
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "tmp_type": {
            "type_id": "2",
            "type_name": "权重模板"
        },
        "security_list": [
            {
                "tmp_id": 13,
                "security_id": 123,
                "stock_id": "600703",
                "stock_name": "三安光电",
                "num_per": null,
                "weight_per": "0.0337",
                "trade_market": ""
            },
            {
                "tmp_id": 13,
                "security_id": 122,
                "stock_id": "002236",
                "stock_name": "大华股份",
                "num_per": null,
                "weight_per": "0.0639",
                "trade_market": ""
            },
            {
                "tmp_id": 13,
                "security_id": 121,
                "stock_id": "002415",
                "stock_name": "海康威视",
                "num_per": null,
                "weight_per": "0.17",
                "trade_market": ""
            }
        ]
    },
    }
}
</pre>

===篮子指令-模板列表接口===
CGI：ipb-pub/sync/instruction/templet_list<br/>
使用说明：模板列表接口<br/>
请求方法：GET<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回的模板列表数据(注意这里仅返回模板数据，需要展示模板下证券数据，需继续请求下面接口【篮子指令-模板列表接口请求证券接口】)

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/templet_list
响应：
{
"code": 0,
"msg": "ok",
"data": [ 
         {
            "tmp_id": 17,
            "tmp_name": "测试模板1",
            "tmp_type": "1",
            "tmp_remark": "测试模板1的备注",
            "tmp_number":1,
            "updated_at": "2018-05-23 13:35:15"
        },
        {
            "tmp_id": 16,
            "tmp_name": "测试模板1的名称",
            "tmp_type": "1",
            "tmp_remark": "测试模板1的备注",
            "tmp_number":1,
            "updated_at": "2018-05-23 10:39:07"
        },
      ]
}
 </pre>

===篮子指令-模板列表接口请求证券接口===
CGI：ipb-pub/sync/instruction/security_list/{tmp_id}<br/>
使用说明：篮子指令-模板列表接口请求证券接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id|| int||需要请求证券数据的模板id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回当前模板下的证券数据 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/security_list/16
响应：
{
"code": 0,
"msg": "ok",
"data": "tmp_id":16,
}
 </pre>
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "security_id": 9,
            "stock_id": "000082",
            "stock_name": "平安银行",
            "num_per": 200,
            "trade_market": "1"
        },
        {
            "security_id": 10,
            "stock_id": "000082",
            "stock_name": "平安银行",
            "num_per": 200,
            "trade_market": "1"
        },
      ]
}

===篮子指令-模板新增接口===
CGI：ipb-pub/sync/instruction/templet_add<br/>
使用说明：篮子交易自定义模板新增接口<br/>
请求方法：POST<br/>
请求参数：<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的模板id 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/templet_add
POST参数：
tmp_name=测试模板1&tmp_type=1&tmp_remark=测试模板1的备注
响应：
{
"code": 0,
"msg": "ok",
"data": "tmp_id":16,
}
 </pre>

===篮子指令-模板修改接口===
CGI：ipb-pub/sync/instruction/templet_mod<br/>
使用说明：模板修改接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id| int||模板的id
|-
| tmp_name/tmp_type/tmp_remark|| string/int ||模板名称／模板类型(1:数量模板2:权重模板)/模板备注 【注意：这三个字段三选一，不能同时发送】
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 模板修改结果数据，这里为空 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/templet_mod
POST参数：
tmp_id=16&tmp_name=测试修改模板
或者
tmp_id=16&tmp_type=2
响应：
{
"code": 0,
"msg": "ok",
"data": []
}
 </pre>

===篮子指令-模板复制接口===
CGI：ipb-pub/sync/instruction/templet_copy?tmp_id=<br/>
使用说明：组合指令提交接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id|| int||需要复制的模板id，若超过一个，id按照逗号隔开
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 复制之后的结果信息，此处为空 

|}

示例：<br/>
<pre>
请求：
curl http://127.0.0.1:8282/pub/sync/instruction/templet_copy?tmp_id=14,15,16
响应：
{
"code": 0,
"msg": "ok",
"data": []
}
 </pre>

===篮子指令-模板删除接口===
CGI：ipb-pub/sync/instruction/templet_del?tmp_id=14,15,16<br/>
使用说明：模板删除接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id|| string||将要删除的模板id，多个id用逗号隔开
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回结果信息，这里为空 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/templet_del?tmp_id=14,15,16
响应：
{
"code": 0,
"msg": "ok",
"data": []
}
 </pre>

===篮子指令-模板下证券新增接口===
CGI：ipb-pub/sync/instruction/security_add<br/>
使用说明：模板下证券新增接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id|| int||证券所属模板的模板id
|-
| stock_id|| string ||股票代码
|-
| stock_name|| string ||股票名称
|-
|num_per|| int ||单位数量（模板类型为权重模板，此值为空）
|-
|weight_per|| float||单位权重（模板类型为数量模板，此值为空）
|-
|trade_market|| int ||交易市场 1深交所A,2上交所A,3深港通,4沪港通
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的证券id 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/security_add
POST参数：
tmp_id=6&stock_id=000082&stock_name=平安银行&num_per=&weight_per=2.87&trade_market=1
响应：
{
"code": 0,
"msg": "ok",
"data": "security_id":"3028"
}
 </pre>

===篮子指令-模板下证券数量修改接口===
CGI：ipb-pub/sync/instruction/security_mod<br/>
使用说明：组合指令提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| security_id|| int||证券id
|-
| weight_per/num_pre|| float/int ||证券占比权重／证券数量 【注意：修改的时候只能是二者选其一，不能同时发送】
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 修改结果，这里为空 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/security_mod
POST参数：
security_id=16&weight_per=0.36
或者
security_id=16&num_per=400
响应：
{
"code": 0,
"msg": "ok",
"data": []
}
 </pre>

===篮子指令-模版下证券删除接口===
CGI：ipb-pub/sync/instruction/security_del?security_id=1,2,3<br/>
使用说明：模版下证券删除接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| security_id|| string || 要删除的证券id，多个id用逗号隔开
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 处理结果信息，这里为空

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/security_del?security_id=1,2,3
响应：
{
"code": 0,
"msg": "ok",
"data": []
}
 </pre>

===篮子指令-模板下证券导入接口===
CGI：ipb-pub/sync/instruction/security_file_upload?tmp_id=3&filepath=weight_tmp.xls<br/>
使用说明：模板下证券导入接口<br/>
请求方法：get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| tmp_id || int||对应上行模板的id
|-
| filepath|| string ||文件名
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 导入的文件信息总条数

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8282/pub/sync/instruction/security_file_upload?tmp_id=3&filepath=weight_tmp.xls
响应：
{
"code": 0,
"msg": "ok",
"data": [ 
         3//总共导入的文件信息总条数
        ]
}
 </pre>

===组合指令-指令修改===
CGI：ipb-pub/sync/instruction/combi_modify<br/>
使用说明：组合指令修改接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id|| int||要修改的指令id
|-
|quote_type|| int||1限价 10不限价
|-
| method_sub_type|| int ||前端下单权重方式 3按持仓市值权重 4按平均权重   仅透传用，无后端逻辑
|-
| front_direction|| int ||前端委托方向，1买入，2卖出，3调整到   仅透传用，无后端逻辑
|-
| add_ins_method|| int ||添加指令的方法，2按总资产比例 3按指令数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
|sub_list|| array||子列表的下单信息,第一维以证券id为key（如000683.SZ）,第二维可能包含以下字段。这里证券id列表需要与指令提交保持一致，即不能修改证券
|-
|sub_list[证券id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[证券id]['quote_price']|| double ||子项的报价价格，不限价时填0即可
|-
|sub_list[证券id]['ins_volume']|| double ||子项的具体下单股数
|-
|ins_memo|| string ||可选，指令备忘
|-
|deadline_at|| string || 指令过期时间 Y-m-d
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回修改指令的结果，包括成功和失败的

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/combi_modify
POST参数：
add_ins_method=3&front_add_ins_value=200&sub_list[000683.SZ][quote_price]=3.88
&sub_list[000683.SZ][ins_volume]=200&ins_memo=
响应：
{
    "code":0,
    "msg":"修改成功",
    "data":{
        ////修改成功的子项
        "pass":{
            "000568.SZ":{
                "code":0,
                "msg":"ok",
                "data":[

                ]
            }
        },
        //不能修改的子项
        "reject":{
            "000683.SZ":{
                "code":505202,
                "msg":"修改指令数量小于已报委托数量",
                "data":[

                ]
            }
        }
    }
}
 </pre>

===篮子指令-指令修改===
CGI：ipb-pub/sync/instruction/basket_modify<br/>
使用说明：篮子指令修改接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|-
| ins_id|| string||指令id
|-
| direction|| string ||报价方向，1买入，2卖出
|-
| add_ins_method|| int || 3按绝对数量
|-
|sub_list|| array||子列表的下单信息,第一维以证券id为key（如000683.SZ）,第二维可能包含以下字段
|-
| quote_type|| int ||指令报价类型，-1最新价 1限价 3买卖1 4买卖2 5买卖3 6买卖4 7买卖5档 10不限价
|-
|sub_list[证券id]['quote_type']|| int||子项报价类型：不传则使用公共quote_type。 -1最新价 1限价 3买卖1 4买卖2 5买卖3 6买卖4 7买卖5档 10不限价
|-
|sub_list[证券id]['quote_price']|| double||下单价格
|-
|sub_list[证券id]['ins_volume']|| int||指令数量
|-
|from|| string || h5
|-
|basket_from|| int || 篮子来源 0文件导入 1组合模板
|-
|deviation_type|| int || 价格偏离类型 0按绝对价格 1按比例
|-
|deviation_amount|| float || 偏离值 浮点数 数值或百分比
|-
|target_type|| int || 目标类型  0按照份数 1按照金额 2按持仓数量比例
|-
|copies|| int || 指令份数
|-
|proportion|| float || 持仓比例
|-
|ins_price|| int || 指令金额
|-
|template_type|| int || 模板类型 1自定义 2当前持仓
|-
|template_id|| string || 模板id
|-
|mark|| array || 勾选id数组
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回修改指令的结果，包括成功和失败的

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/market_modify
POST参数：
add_ins_method=3&front_add_ins_value=200&sub_list[000683.SZ][quote_price]=3.88
&sub_list[000683.SZ][ins_volume]=200&ins_memo=
响应：
{
    "code":0,
    "msg":"修改成功",
    "data":{
        ////修改成功的子项
        "pass":{
            "000568.SZ":{
                "code":0,
                "msg":"ok",
                "data":[

                ]
            }
        },
        //不能修改的子项
        "reject":{
            "000683.SZ":{
                "code":505202,
                "msg":"修改指令数量小于已报委托数量",
                "data":[

                ]
            }
        }
    }
}
 </pre>

===指令编辑===
CGI：/sync/instruction/manage_edit<br/>
注：已迁移至IPB,前端调用请使用IPB前缀<br/>
使用说明：指令编辑 - 对未适配的交易单元，手动编辑指令完成情况<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 指令id
|-
| sub_list || int || 需要手动填入完成数量时，见POST请求示例，deal_amount为完成数量，deal_avg_price为成交均价，normal_status:默认1正常，-1未指定，2待撤，3已撤，4已成
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/manage_edit
POST参数：
ins_id=112&
sub_list[1123][deal_amount]=1000&
sub_list[1123][deal_avg_price]=11.23&
sub_list[1123][normal_status]=3
响应：
{
    "code":0,
    "msg":"ok",
    "data":[

    ]
}
 </pre>
===指令设置===
CGI：/sync/instruction/manage_set<br/>
使用说明：指令编辑 - 对未适配的交易单元，手动编辑指令完成情况<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 指令id
|-
| fund_manager_id || int || 基金经理id
|-
| fund_manager_name || string || 基金经理名称
|-
| commission || float || 手续费
|-
| hedge_flag || int || 策略id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/manage_set
POST参数：

ins_id:25380
fund_manager_id:1
fund_manager_name:harry
commission:8.8
hedge_flag:100

响应：
{
    "code":0,
    "msg":"保存成功，指令无对应成交，未更新成交数据",
    "data":[

    ]
}
 </pre>

===组合指令-指令编辑===
CGI：ipb-pub/sync/instruction/combi_edit<br/>
使用说明：组合指令编辑 -手动编辑指令完成情况<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 指令id
|-
| sub_list || int || 需要手动填入完成数量时，见POST请求示例，deal_amount为完成数量，deal_avg_price为成交均价，normal_status:默认1正常，-1未指定，2待撤，3已撤，4已成
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/combi_edit
POST参数：
ins_id=112&
sub_list[000683.SZ][deal_amount]=1000&
sub_list[000683.SZ][deal_avg_price]=11.23&
sub_list[000683.SZ][normal_status]=3
响应：
{
    "code":0,
    "msg":"ok",
    "data":[

    ]
}
 </pre>
===篮子指令-指令编辑===
CGI：ipb-pub/sync/instruction/basket_edit<br/>
使用说明：篮子指令编辑 -手动编辑指令完成情况<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 指令id
|-
| sub_list || int || 需要手动填入完成数量时，见POST请求示例，deal_amount为完成数量，deal_avg_price为成交均价，normal_status:默认1正常，-1未指定，2待撤，3已撤，4已成
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/basket_edit
POST参数：
ins_id=112&
sub_list[000683.SZ][deal_amount]=1000&
sub_list[000683.SZ][deal_avg_price]=11.23&
sub_list[000683.SZ][normal_status]=3
响应：
{
    "code":0,
    "msg":"ok",
    "data":[

    ]
}
 </pre>

===算法指令提交===
CGI：ipb-pub/sync/instruction/algo_add<br/>
使用说明：算法指令提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| stock_id|| string||股票代码，例如000683.sz
|-
| stock_name|| string||股票名称
|-
| direction|| string ||报价方向，1买入，2卖出
|-
| add_ins_method|| int ||下单方式，1按目标仓位 2按总资产比例 3按绝对数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应下单方式的具体数量或百分比
|-
| quote_type|| string ||报价类型：1限价 2市价  3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价
|-
| quote_price|| double ||报价价格 当quote_type=1时，传值具体的价格
|-
| product_id|| array ||产品id数组，用于鉴定权限，请跟sub_list参数的第1维的产品id列表保持一致
|-
|sub_list|| array||具体子项的下单信息，具体包含值见下面各行
|-
|sub_list[产品id]['add_ins_method']|| int||子项的下单方式 如果不传，则默认按指令级的下单方式  1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|sub_list[产品id]['add_ins_value']|| double ||对应子项下单方式的具体具体数量或百分比
|-
|sub_list[产品id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[产品id]['quote_price']|| double ||子项的报价价格，如果不传则默认按指令级报价价格。
|-
|sub_list[产品id]['ins_volume']|| double ||子项的具体下单股数
|-
|volume_type||int|| 单笔数量模式  1 卖1量, 2 卖1-2量, 3 卖1-3量, 4 卖1-4量, 5 卖1-5量, 6 绝对数量
|-
|volume_value||float||单笔数量值：volume_type为1～5时，填比例值；为6时填绝对数量股
|-
|volume_offset_type||int|| 波动区间比例偏移方式 1比例偏移 2数量偏移
|-
|volume_offset_value||float||比例偏移值：offset_type为1时，填比例值；为2时三个可选值（1:0-5手。2:0-10手。 3:0-20手）
|-
|split_interval||int||下单时间间隔，1:10s, 2:20秒，3:30秒 ，4:40s, 5:50s, 6:60秒，7:90s, 8:120秒，9:300
|-
|split_interval_offset||int||下单时间间隔偏移值，1:0-10秒，2:0-20秒，3:0-30秒
|-
|start_time||string||算法开始时间 H:i:s
|-
|end_time||string||算法结束时间 H:i:s
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/algo_add
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&stock_id=000683.sz&quote_type=1&quote_price=6.83
&product_id[]=10032&sub_list[10032][ins_volume]=200
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===算法指令修改===
CGI：ipb-pub/sync/instruction/algo_modify<br/>
使用说明：算法指令修改接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id|| int ||算法母指令id
|-
| add_ins_method|| int ||下单方式，1按目标仓位 2按总资产比例 3按绝对数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应下单方式的具体数量或百分比
|-
| quote_type|| string ||报价类型：1限价 2市价  3买1/卖1, 4买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5。   8竞价限价  9增强限价
|-
| quote_price|| double ||报价价格 当quote_type=1时，传值具体的价格
|-
| product_id|| array ||产品id数组，用于鉴定权限，请跟sub_list参数的第1维的产品id列表保持一致
|-
|sub_list|| array||产品账户子列表的下单信息，格式:目标仓位=sub_list[产品id]['target_position']，总资产比例=sub_list[产品id]['total_asset_ratio']，指令数量=sub_list[产品id]['ins_volume']，持仓比例=sub_list[产品id]['position_ratio']
|-
|volume_type||int|| 单笔数量模式  1 卖1量, 2 卖1-2量, 3 卖1-3量, 4 卖1-4量, 5 卖1-5量, 6 绝对数量
|-
|volume_value||float||单笔数量值：volume_type为1～5时，填比例值；为6时填绝对数量股
|-
|volume_offset_type||int|| 波动区间比例偏移方式 1比例偏移 2数量偏移
|-
|volume_offset_value||float||比例偏移值：offset_type为1时，填比例值；为2时三个可选值（1:0-5手。2:0-10手。 3:0-20手）
|-
|split_interval||int||下单时间间隔，1:10s, 2:20秒，3:30秒 ，4:40s, 5:50s, 6:60秒，7:90s, 8:120秒，9:300
|-
|split_interval_offset||int||下单时间间隔偏移值，1:0-10秒，2:0-20秒，3:0-30秒
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/algo_modify
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&stock_id=000683.sz&quote_type=1&quote_price=6.83
&product_id[]=10032&sub_list[10032][ins_volume]=200
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===算法指令 暂停===
CGI：ipb-pub/sync/instruction/algo_ins_pause<br/>
使用说明：算法指令 母指令暂停 功能<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 母指令id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/algo_ins_pause

响应：


</pre>

===算法指令 继续===
CGI：ipb-pub/sync/instruction/algo_ins_start<br/>
使用说明：算法指令 母指令继续拆分 功能<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 母指令id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/algo_ins_start

响应：


</pre>

===指令列表===
CGI：/sync/instruction/search_list<br/>
使用说明：使用IPB前缀！  指令执行页面的指令列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| data_type || int || 不传默认为0，对分发模式下(1提交页数据，2分发页数据，3执行页数据) 非分发模式下(4指令提交 5指令执行)  不同类型的条数不一样。每条里的具体字段都一样
|-
| from || string || 'h5' or  'pc'
|-
| swap || int || 0默认无收益互换指令的列表 1只有收益互换指令的列表
|-
| backend || int || 0默认前端处理，1后端处理分页排序
|-
| count || int || 每页显示条数
|-
| page || int || 当前页
|-
| order || string || asc 正序 desc倒序
|-
| order_by || string || 排序字段
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://42.159.94.59/ipb-pub/sync/instruction/search_list?count=9999

以下注意区分 算法指令  与  指令算法执行   二者的概念：
算法指令            对指令提交层面而言。区分于普通指令，在提交指令时设置了某些参数，从而把该指令以特定的算法拆分为多个单独的子指令分别提交
指令算法执行     对指令执行层面而言。 设置某些参数，让已提交的指令自动以特定的算法执行，拆分为多笔委托下达出去

响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"cur_page_no": 1, //当前页
		"total_page_count": 1,//总页面数量
		"page": 1,//当前页
		"count": 9999,//每页数量
		"max": 1,//总页面数量
		"total": 1,//总条数
		"list": [{
			"instruction": {
				"id": 1180,
                                "is_doubt_exist": 1, //是否存在置疑委托单 1是0否
				"add_ins_method": 3, //下单方式 1按目标仓位 2按基金总资产比例 3按指令数量 4按持仓比例 5按多交易单元指令总量 6按单元净资产比例
				"method_sub_type": 1, //下单方式附属选项 当add_ins_method=5时，1平均分配2产品净值比例3单元可用金额比例4最大量5自定义比例6单元净值比例7单元可用数量比例   ; 
				                      //组合指令时：3按持仓权重 4按平均权重;收益互换时 add_ins_method为4时，method_sub_type 按基金经理：1， 按交易券商：2， 按基金：3
				"add_ins_value": "2000.00000", //与add_ins_method绑定的值
                                "clearance":0,   //是否h5全部清仓类指令
				"creator_id": 20000,
				"assigner_name": "bbb",     //指令分发人
				"executor_name": "aaa",     //指令分发对象，即执行人
				"creator_name": "高毅超管呀",
                                "pb_account":[{"name":"天丰恒生", "account":"123456"}],
				"fund_manager_id": 20042,
				"fund_manager_name": "陈陈陈",
				"quote_price_percent": "0.00", //价格浮动百分比
				"target_position": "--", //指令的实际目标仓位，后台计算，用于详情展示。当指令为单一方式按目标仓位时，且每个子项值一样时，有具体数值
				"total_asset_ratio": "--", //指令的实际基金净资产比例，后台计算，用于详情展示。当指令为单一方式按基金总资产比例时，且每个子项值一样时，有具体数值
                                "position_ratio": "--", ////指令的实际持仓比例比例，后台计算，用于详情展示。当指令为单一方式按持仓比例时，且每个子项值一样时，有具体数值
                                "product_asset_ratio": "--", //指令的实际单元净资产比例，后台计算，用于详情展示。当指令为单一方式按单元净资产比例时，且每个子项值一样时，有具体数值
				"deadline_at": "2019-08-25 00:00:00", //指令截止日期
                                "has_deadline": "Y", //是否是跨期指令 Y是 N不是
                                "front_direction": 1, //前端指令方向，组合指令使用 1买入2卖出3调整到
                                "deal_direction": 1,
				"deal_direction_name": "买入",
				"status": 2, //后端实际指令流程流转使用(2提交成功，3正在执行，4执行完毕，-1终止执行)
                                "exec_status": 1, // 前端展示执行状态用 （1未执行 2执行中 3已执行）
                                "assign_status":1,    //指令分发状态 0未分发 1已分发 2已拒绝
                                "assign_time":1343294720,    //分发操作时间，为时间戳数值。未分发则为0
                                "refuse_reason": "hahahahah",  //分发拒绝原因
				"status_name": "提交成功",
				"created_at": "2018-05-02 13:51:25",
				"quote_type": 1, //1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
				"price": "6.83000",
                                "weight": "0.34112",
				"ins_memo": "全部清仓",
				"algorithm_status": null, //指令 算法执行状态 状态,1运行中，2暂停中，其它为非算法指令状态
				"is_exception": -1, //指令 算法执行 是否出现异常，-1没有出现，1出现
				"predict_complete_time": "--", //预期完成时间，仅当启动算法执行时此字段才有效，可能包含错误信息
				"refresh_predict_complete_time": "--", //对算法执行而言，跟前端同步刷新的预计完成时间
				"normal_status": 1, //默认1正常，-1未指定，2待撤，3已撤
				"normal_status_name": "正常",
				"ins_volume": 2000,
				"deal_avg_price": "0.000", //成交均价,
				"valid_entrust_amount": "--", //有效委托数量
				"deal_amount": "--", //成交数量
				"pending_order_number": 0, //汇总挂单总数
				"entrust_progress": "0.0000000000", //汇总委托进度
				"complete_progress": "0.0000000000", //汇总成交完成进度
				"is_read": 0, //是否已读 0未读 1已读
				"is_execute": 1, //指令是否可以执行 0不可以执行 1可以执行
                                "is_auto_execute": 1,   //是否自动执行
				"is_combi": 0, //是否组合指令
				"is_algo": 0, //是否算法指令
				"parent_id": 0,
				"algo_ins_status": 1, //算法指令 状态  1执行中2已暂停3已完成
			},
			//当为算法指令且是母指令时，有该对象，存储算法指令的算法相关参数
			"algo_param": {
				"split_interval": "3",
				"split_interval_offset": "1",
				"volume_type": "6",
				"volume_value": "100",
				"volume_offset_type": "2",
				"volume_offset_value": "1"
			},
			//当为算法指令时，子指令数据列表
			"child": [{
				"instruction": {
					"id": 1314,
					"add_ins_method": 3,
					"add_ins_value": "2000.00000",
					"front_add_ins_value": "2000.00000",
					"creator_id": 570000,
					"creator_name": "刘军",
					"fund_manager_id": 570001,
					"fund_manager_name": "基金经理1",
					"quote_price_percent": "0.00",
					"target_position": "--",
					"total_asset_ratio": "--",
					"deal_direction": 1,
					"deal_direction_name": "买入",
					"status": 2,
					"status_name": "提交成功",
					"created_at": "2018-05-25 14:49:11",
					"quote_type": 3,
					"price": "3.06000",
					"ins_memo": "0",
					"algorithm_status": null,
					"is_exception": -1,
					"predict_complete_time": "--",
					"refresh_predict_complete_time": "--",
					"normal_status": 1,
					"normal_status_name": "正常",
					"ins_volume": 200,
					"deal_avg_price": "0.000",
					"valid_entrust_amount": "--",
					"deal_amount": "--",
					"pending_order_number": 0,
					"progress": "0.0000000000",
					"complete_progress": "0.0000000000",
					"is_read": 0,
					"is_execute": 1,
					"is_combi": 0,
					"is_basket": 0,
					"is_algo": 1, //是否算法指令
					"parent_id": 1313, //对应的算法母指令id
					"algo_ins_status": 1
				},
				"algo_param": [

				]
			}]
			"stock": [{
				"stock_id": "000683.SZ",
				"stock_name": "远兴能源",
				"is_future": 0, //是否为期货，1是，-1或其它值表示不是
				"is_new_ipo": 0, //0不是新股，1是新股
				"market": 1,//0未知 1沪深交易 2沪港通 3深港通 4国债逆回购 5新股申购
                                "quote_type": 1, //1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
                                "sec_type": 1//证券类别
			}],
			"product": [{
				"id": 1600518,
				"name": "测试产品"
			}],
			"group": [{        //存储指令中交易单元所属的基金层映射关系
				"id": 54,
				"name": "基金1",
                                "product_id_list": ["10069", "10068"]
			},
                        {
                                "id": 56,
				"name": "基金2",
                                "product_id_list": ["10067"]
                        }],
			"sub_list": [{
				"product_id": 1600518,
				"group_id": 10067,
				"product_name": "测试产品",
				"stock_id": "000683.SZ",
				"stock_name": "远兴能源",
				"deal_amount": 0,
				"deal_avg_price": 0,
				"deal_direction": 1,
				"deal_direction_name": "买入",
				"weight": "0.34112", // 子项权重
                                "deadline_at": "2019-08-25 00:00:00"//指令子项截止日期
                                "quote_type": 1, //1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
                                "price": "10.20", //子项下单价格
				"ins_volume": 2000,   
                                "add_ins_method": 3,   //指令子项的指令下单方式
                                "add_ins_value": 1000,  //指令子项的下单方式对应的比例值(或交易权重值)或具体数值
				"target_position": "--", //指令子项的实际目标仓位，后台计算得出
				"position_ratio": "--", //指令子项的实际持仓比例，后台计算得出
				"total_asset_ratio": "--", //指令子项的实际资产比例，后台计算得出
				"pending_order_number": 0,
				"valid_entrust_amount": 0,
				"entrust_progress": "0.0000000000", //委托进度
				"current_volume": "600.00",
				"hold_volume": 600,   //指令创建时的持仓数量
				"usable_volume": 600, //指令创建时的可卖数量
				"diff_number": 2000, //缺口数量
				"diff_number_no_entrust": 2000,
				"complete_progress": "0.0000000000", //成交进度
				"exec_status": 1, // 前端展示执行状态用 （1未执行 2执行中 3已执行）
                                "normal_status": 1, //默认1正常，-1未指定，2待撤，3已撤
				"normal_status_name": "正常",
				"is_support_asset": 1, //是否为支持的交易品种，0代表这个子项走的是手动指令模式
				"show_highLight": 0, //是否展示标注 0不展示 1展示
				"sync_ins_id": null, //pb同步的指令id
				"is_highLight": 0, //是否勾选标注0未勾选 1勾选
				"is_sync_pb": 0, //该交易单元是否支持同步指令模式 0不支持 1支持
				"enable_edit": 1, //该交易单元是否支持修改 0不支持 1支持
				"total_amount": "13660.00000",
                                "algo_status": 1, //子项算法委托的状态 0未执行1执行中2暂停中3执行完成
                                "doubt_num": 1, //该子项的所有置疑委托总笔数
                                "total_doubt_volume": 100, //该子项的所有置疑委托总量
                                "manual_matched_num": 1, //已手工匹配的委托笔数
                                "manual_matched_volume": 100, //已手工匹配的委托数量
                                "release_doubt_volume": 100, //已释放的置疑委托量
                                "last_error": "错误信息",       //指令交易单元最后一笔委托单的pb_revoke_mark值 - 有可能是空的值，正常的委托。可以用于算法执行中执行详情处的文案展示
                                "current_msg": "错误信息",  //指令交易单元执行中的最后一次异常信息(取自entrust表的msg或exception表的comment) 
                                "canceller_name": "aaa",   //撤销人
                                "cancel_time": 1232323230, //撤销时间戳，注意是时间戳
                                "recent_algo_risk_hit": 1,     //该子项最后一次算法委托是否触发禁止风控 1是0否  用于前端指令列表详情按钮显示红色
                                "ever_algo_risk_hit": 1,     //该子项算法委托是否曾经触发过禁止风控 1是0否  用于前端指令列表详情按钮显示逻辑
                                "predict_info": {     //有在算法委托执行中时，有值
                                     "predict_complete_time": 0,    //预期完成时间戳
                                     "can_be_complete": 1            //是否能完成
                                },
                                "risk_data": {
                                     "msg": [
                                     "已触发提示性风控(公司):test买入,预警提示"
                                      ],
                                     "limit_action": 0
                                 }
			     }],
			"ins_log": {
				"pre_val": {
					"ins_memo": "",
                                        "ins_volume": 500,
					"price": "2.87000",
                                        "quote_type": 1, 
					"stock_id": "000100.SZ",    //单票时有该字段
					"productList": [{     //单票时有该字段
							"ins_volume": 500,
							"price": "2.87000",
                                                        "quote_type": 1,     
							"product_id": "507"
						},
						{
							"ins_volume": 200,
							"price": "2.87000",
							"quote_type": 1,     
							"product_id": "516"
						}
					],
                                        "product_id": "507",    //多票时有该字段
					"stockList ": [{          //多票时有该字段
							"stock_id": "000683.SZ",
							"ins_volume": 200,
							"quote_type": 1,     
							"price": "2.81000"
						},
						{
							"stock_id": "000100.SZ",
							"ins_volume": 1000,
							"quote_type": 1,     
							"price": "2.88000"
						}
					]
				}
			}
		}]
		"timestamp": 1525243638.1516,
		"timeConsumption": 1.4945828914642,
		"requestStartTime": null,
		"input": {
			"count": "9999"
		}
	}

</pre>

===篮子指令列表===
CGI：/sync/instruction/search_basket_list<br/>
使用说明：获取篮子指令列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| count || int || 每页显示条数，请传递一个大整数，例如：count=9999
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/search_basket_list?count=9999

响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "cur_page_no": 1,
        "total_page_count": 1,
        "page": 1,
        "count": 9999,
        "max": 1,
        "total": 1,
        "list": [
            {
                "instruction": {
                    "id": 1300,
                    "add_ins_method": 3,
                    "add_ins_value": "100.00000",
                    "front_add_ins_value": "100.00000",
                    "creator_id": 0,
                    "creator_name": "--",
                    "fund_manager_id": 570001,
                    "fund_manager_name": "基金经理1",
                    "quote_price_percent": "0.00",
                    "target_position": "0.00000",
                    "total_asset_ratio": "0.00000",
                    "deal_direction": 1,
                    "deal_direction_name": "买入",
                    "status": 2,
                    "status_name": "提交成功",
                    "created_at": "2018-05-23 19:48:54",
                    "quote_type": 1,  //-1最新价 1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
                    "price": "3.20000",
                    "ins_memo": "",
                    "algorithm_status": null,
                    "is_exception": -1,
                    "predict_complete_time": "--",
                    "refresh_predict_complete_time": "--",
                    "normal_status": 1,
                    "normal_status_name": "正常",
                    "ins_volume": 200,
                    "deal_avg_price": "0.000",
                    "valid_entrust_amount": "--",
                    "deal_amount": "--",
                    "pending_order_number": 0,
                    "progress": "0.0000000000",
                    "complete_progress": "0.0000000000",
                    "is_read": 0,
                    "is_execute": 1,
                    "is_combi": 0,
                    "is_basket": 1,
                    "basket_from": "1",//篮子来源 0文件导入 1组合模板
                    "deviation_type": "1",//价格偏离类型 0按绝对价格 1按比例
                    "deviation_amount": "0.00000",//偏离值 浮点数 数值或百分比
                    "target_type": "0",//目标类型  0按照份数 1按照金额
                    "copies": null,//指令份数
                    "proportion": null,//持仓比例
                    "ins_price": "0.00000",//指令金额
                    "template_type": null,//模板类型 1自定义 2当前持仓
                    "template_id": null,//模板id
                    ""mark": null",//勾选项目
                },
                "stock": [
                    {
                        "stock_id": "000683.SZ",
                        "stock_name": "远兴能源",
                        "is_future": 0,
                        "is_new_ipo": 0,
                        "market": 1
                    },
                    {
                        "stock_id": "000100.SZ",
                        "stock_name": "TCL 集团",
                        "is_future": 0,
                        "is_new_ipo": 0,
                        "market": 1,
                        "quote_type": 1, //-1最新价 1限价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
                    }
                ],
                "product": [
                    {
                        "id": 502,
                        "name": "中信证券9659"
                    }
                ],
                "sub_list": [
                    {
                        "product_id": 502,
                        "product_name": "中信证券9659",
                        "stock_id": "000683.SZ",
                        "stock_name": "远兴能源",
                        "deal_amount": 0,
                        "deal_avg_price": 0,
                        "deal_direction": 1,
                        "deal_direction_name": "买入",
                        "price": "3.20000",
                        "ins_volume": 100,
                        "target_position": "--",
                        "total_asset_ratio": "--",
                        "pending_order_number": 0,
                        "valid_entrust_amount": 0,
                        "progress": "0.0000000000",
                        "current_volume": 0,
                        "diff_number": 100,
                        "diff_number_no_entrust": 100,
                        "complete_progress": "0.0000000000",
                        "normal_status": 1,
                        "normal_status_name": "正常",
                        "is_support_asset": 0,
                        "show_highLight": 1,
                        "sync_ins_id": null,
                        "is_highLight": 0,
                        "is_sync_pb": 0,
                        "enable_edit": 1,
                        "total_amount": "320.00000"
                    },
                    {
                        "product_id": 502,
                        "product_name": "中信证券9659",
                        "stock_id": "000100.SZ",
                        "stock_name": "TCL 集团",
                        "deal_amount": 0,
                        "deal_avg_price": 0,
                        "deal_direction": 1,
                        "deal_direction_name": "买入",
                        "price": "3.28000",
                        "ins_volume": 100,
                        "target_position": "--",
                        "total_asset_ratio": "--",
                        "pending_order_number": 0,
                        "valid_entrust_amount": 0,
                        "progress": "0.0000000000",
                        "current_volume": 0,
                        "diff_number": 100,
                        "diff_number_no_entrust": 100,
                        "complete_progress": "0.0000000000",
                        "normal_status": 1,
                        "normal_status_name": "正常",
                        "is_support_asset": 0,
                        "show_highLight": 1,
                        "sync_ins_id": null,
                        "is_highLight": 0,
                        "is_sync_pb": 0,
                        "enable_edit": 1,
                        "total_amount": "328.00000"
                    }
                ]
            }
        ]
    }
}

</pre>

===历史指令列表===
CGI：omsv2/sync/instruction/history_list<br/>
使用说明：历史指令列表-支持查询今天之前的具体时间段内的指令数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| query_channel || string || 【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
| query_sec_name || string || 【仅厦门信托生效】券商名 直接中文查询对应 
|-
| page_type || string || 页面类型 h5 pc 
|-
| is_summary || int || 0不需要汇总，1汇总 h5不需要传，pc需要传
|-
| fund_manager || string || 基金经理id
|-
| stock_id || string || 股票代码
|-
| count || int || 每页显示条数，h5默认为20,pc默认为10条，请避免过大值
|-
| product_id || string || 交易单元,支持逗号拼接。(若查询全部，可逗号拼接全部交易单元。也可不传值，不传值默认所有交易单元，建议不传)
|-
| trade_direction || 1:买入，2卖出 || 买卖方向。（若查询全部，可以逗号拼接全部，也可以不传，默认不传查询所有方向，建议不传）
|-
| page || int || 第几页 
|-
| start_time || string || 查询范围开始日期 ，如2018-05-01
|-
| end_time || string || 查询范围结束日期 ，如2018-05-01
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data.list || string || 返回的指令列表信息。每条指令的数据与search_list的字段一致
|-
| data.total_count || string || 满足查询条件的所有指令数目，用于分页请求计算
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/history_list?start_time=2018-05-01&end_time=2018-05-06&page=2&count=20

响应：
//非代码汇总： （字段释义可参考search_list接口的返回）
{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            { //这条是组合指令
                "instruction":{
                    "id":11666,
                    "add_ins_method":3,
                    "add_ins_value":"995450.00000",
                    "front_add_ins_value":"995450.00000",
                    "method_sub_type":4,
                    "quote_type":1,
                    "price":"37.750",
                    "ins_volume":"20,000",
                    "ins_memo":"",
                    "normal_status":1,
                    "normal_status_name":"正常",
                    "status":1,
                    "status_name":"未执行",
                    "assign_status":1,
                    "assign_status_name":"已分发",
                    "assign_time":"--",
                    "refuse_reason":"",
                    "front_direction":1,
                    "deal_direction":1,
                    "deal_direction_name":"买入",
                    "created_at":"2019-10-23 15:17:35",
                    "deadline_at":"2019-10-23 00:00:00",
                    "has_deadline":"N",
                    "complete_progress":"0.0000000000",
                    "creator_name":"王文",
                    "fund_manager_id":1110001,
                    "fund_manager_name":"经理",
                    "assigner_name":"--",
                    "executor_name":"--",
                    "is_combi":1
                },
                "stock":[
                    {
                        "stock_id":"00001.HKSH",
                        "stock_name":"长和",
                        "is_future":0,
                        "is_new_ipo":0,
                        "market":2,
                        "quote_type":1,
                        "sec_type":9
                    },
                    {
                        "stock_id":"00012.HKSZ",
                        "stock_name":"恒基地产",
                        "is_future":0,
                        "is_new_ipo":0,
                        "market":3,
                        "quote_type":1,
                        "sec_type":9
                    }
                ],
                "product":[
                    {
                        "id":10899,
                        "name":"测试交易单元00"
                    }
                ],
                "sub_list":[
                    {
                        "product_id":10899,
                        "product_name":"测试交易单元00",
                        "channel":0,
                        "stock_id":"00001.HKSH",
                        "stock_name":"长和",
                        "deal_direction":1,
                        "deal_direction_name":"买入",
                        "price":"72.100",
                        "last_price":"37.7500",
                        "quote_type":1,
                        "add_ins_method":3,
                        "add_ins_value":"0",
                        "ins_volume":"7,000",
                        "complete_progress":"0.0000000000",
                        "normal_status":1,
                        "normal_status_name":"正常",
                        "status":1,
                        "status_name":"未执行",
                        "is_support_asset":1,
                        "sync_ins_id":null,
                        "is_sync_pb":0,
                        "deadline_at":"2019-10-23 00:00:00",
                        "cancel_time":"--",
                        "canceller_name":"--"
                    },
                    {
                        "product_id":10899,
                        "product_name":"测试交易单元00",
                        "channel":0,
                        "stock_id":"00012.HKSZ",
                        "stock_name":"恒基地产",
                        "deal_direction":1,
                        "deal_direction_name":"买入",
                        "price":"37.750",
                        "last_price":"37.7500",
                        "quote_type":1,
                        "add_ins_method":3,
                        "add_ins_value":"0",
                        "ins_volume":"13,000",
                        "complete_progress":"0.0000000000",
                        "normal_status":1,
                        "normal_status_name":"正常",
                        "status":1,
                        "status_name":"未执行",
                        "is_support_asset":1,
                        "sync_ins_id":null,
                        "is_sync_pb":0,
                        "deadline_at":"2019-10-23 00:00:00",
                        "cancel_time":"--",
                        "canceller_name":"--"
                    }
                ]
            },
            {   // 这条是普通指令
                "instruction":{
                    "id":11665,
                    "add_ins_method":3,
                    "add_ins_value":"400.00000",
                    "front_add_ins_value":"400.00000",
                    "method_sub_type":1,
                    "quote_type":1,
                    "price":"16.45",
                    "ins_volume":"1,200",
                    "ins_memo":"",
                    "normal_status":1,
                    "normal_status_name":"正常",
                    "status":1,
                    "status_name":"未执行",
                    "assign_status":1,
                    "assign_status_name":"已分发",
                    "assign_time":"--",
                    "refuse_reason":"",
                    "front_direction":0,
                    "deal_direction":1,
                    "deal_direction_name":"买入",
                    "created_at":"2019-10-23 15:13:25",
                    "deadline_at":"2019-10-23 00:00:00",
                    "has_deadline":"N",
                    "complete_progress":"0.0000000000",
                    "creator_name":"王文",
                    "fund_manager_id":1110002,
                    "fund_manager_name":"111柜员",
                    "assigner_name":"--",
                    "executor_name":"--",
                    "is_combi":0
                },
                "stock":[
                    {
                        "stock_id":"000001.SZ",
                        "stock_name":"平安银行",
                        "is_future":0,
                        "is_new_ipo":0,
                        "market":1,
                        "quote_type":1,
                        "sec_type":1
                    }
                ],
                "product":[
                    {
                        "id":10910,
                        "name":"东方阿尔法KCBP"
                    },
                    {
                        "id":10789,
                        "name":"ims测试单元"
                    },
                    {
                        "id":10819,
                        "name":"景林资产测试"
                    }
                ],
                "sub_list":[
                    {
                        "product_id":10910,
                        "product_name":"东方阿尔法KCBP",
                        "channel":0,
                        "stock_id":"000001.SZ",
                        "stock_name":"平安银行",
                        "deal_direction":1,
                        "deal_direction_name":"买入",
                        "price":"16.45",
                        "last_price":"16.4500",
                        "quote_type":1,
                        "add_ins_method":3,
                        "add_ins_value":"400",
                        "ins_volume":"400",
                        "complete_progress":"0.0000000000",
                        "normal_status":1,
                        "normal_status_name":"正常",
                        "status":1,
                        "status_name":"未执行",
                        "is_support_asset":1,
                        "sync_ins_id":null,
                        "is_sync_pb":0,
                        "deadline_at":"2019-10-23 00:00:00",
                        "cancel_time":"--",
                        "canceller_name":"--"
                    },
                    {
                        "product_id":10789,
                        "product_name":"ims测试单元",
                        "channel":3,
                        "stock_id":"000001.SZ",
                        "stock_name":"平安银行",
                        "deal_direction":1,
                        "deal_direction_name":"买入",
                        "price":"16.45",
                        "last_price":"16.4500",
                        "quote_type":1,
                        "add_ins_method":3,
                        "add_ins_value":"400",
                        "ins_volume":"400",
                        "complete_progress":"0.0000000000",
                        "normal_status":1,
                        "normal_status_name":"正常",
                        "status":1,
                        "status_name":"未执行",
                        "is_support_asset":1,
                        "sync_ins_id":null,
                        "is_sync_pb":0,
                        "deadline_at":"2019-10-23 00:00:00",
                        "cancel_time":"--",
                        "canceller_name":"--"
                    },
                    {
                        "product_id":10819,
                        "product_name":"景林资产测试",
                        "channel":3,
                        "stock_id":"000001.SZ",
                        "stock_name":"平安银行",
                        "deal_direction":1,
                        "deal_direction_name":"买入",
                        "price":"16.45",
                        "last_price":"16.4500",
                        "quote_type":1,
                        "add_ins_method":3,
                        "add_ins_value":"400",
                        "ins_volume":"400",
                        "complete_progress":"0.0000000000",
                        "normal_status":1,
                        "normal_status_name":"正常",
                        "status":1,
                        "status_name":"未执行",
                        "is_support_asset":1,
                        "sync_ins_id":null,
                        "is_sync_pb":0,
                        "deadline_at":"2019-10-23 00:00:00",
                        "cancel_time":"--",
                        "canceller_name":"--"
                    }
                ]
            }
        ],
        "data_page_html":""
    }
}

pc端汇总数据结构：
{
	"code": 0,
	"msg": "ok",
	"data": [{
                "ins_id":"--",
                "pb_account":"--",
                "fund_manager_name":"经理",
                "stock_id":"600701.SH",
                "stock_name":"*ST工新",
                "product_name":"测试交易单元00",
                "deal_direction_name":"买入",
                "ins_volume":"100",
                "volume":"100",
                "ins_price":"--",
                "quote_price":"--",
                "normal_status":"--",
                "status":"--",
                "assign_status":"--",
                "assign_time":"--",
                "cancel_time":"--",
                "assigner_name":"--",
                "executor_name":"--",
                "canceller_name":"--",
                "refuse_reason":"--",
                "complete_progress":"--",
                "ins_memo":"--",
                "created_at":"2019-10-23",
                "deadline_at":"2019-10-23 00:00:00"
            }]
}


</pre>

===获取基金经理列表===
CGI：sync/instruction/manager_list<br/>
使用说明：获取基金经理<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://localhost:8000/omsv2/sync/instruction/manager_list


响应：
{
	"code": 0,
	"msg": "ok",
	"data": [{
		"user_id": 20000,
		"org_id": 2,
		"nick_name": "高毅超管呀",
		"real_name": "高毅超管呀",
		"avatar_url": "",
		"last_login_time": "2018-04-28 16:32:45",
		"role_id": 1,
		"created_at": "2016-09-27 22:10:00",
		"updated_at": "2018-04-28 16:32:45",
		"is_specify": 0,
		"user_type": 1,
		"is_fresh": 1
	}]
}
</pre>

===指令已读状态修改===
CGI：sync/instruction/ins_set_read<br/>
注：已迁移至IPB,前端调用请使用IPB前缀<br/>
使用说明：修改指令已读状态<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || string || 指令id，支持批量传參，逗号隔开
|-
| is_read || int || 是否已读 0未读 1已读
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://localhost:8000/ipb-pub/sync/instruction/ins_set_read
post参数示例：
ins_id=920&is_read=1

响应：
{
    "code": 0,
    "msg": "修改未读/已读状态成功",
    "data": []
}
</pre>

===指令标注修改===
CGI：sync/instruction/ins_set_highLight<br/>
注：已迁移至IPB,前端调用请使用IPB前缀<br/>
使用说明：修改指令标注<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 指令id
|-
| type || string || 要对哪一种维度进行修改 product/stock.  前者时传参product_id;后者传参stock_id
|-
| product_id || int || 交易单元id
|-
| stock_id || int || 股票id
|-
| is_highLight || int || 是否勾选标注0未勾选 1勾选
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://localhost:8000/ipb-pub/sync/instruction/ins_set_highLight
post参数示例：
ins_id=920&product_id=101492&is_highLight=1

响应：
{
    "code": 0,
    "msg": "ok",
    "data": []
}
</pre>

===指令分发 批量风控试算===
CGI：/sync/instruction/assign_trial_risk<br/>
使用说明：IPB前缀； 指令分发 批量并行风控试算<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| params || object || 对象数据，每个key-value代表一条指令，其中key为指令id，value值为：按原来请求trial-multi-check的参数encode成json后的值
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/assign_trial_risk
POST参数:


正确响应：
{
"code": 0,
"msg": "ok",
"data": {
		"sign": "2faa4rt42fsat4fv3",     //试算风控的结果签名。后续继续调用分发接口时，需要携带此参数
		"data": {}   //风控具体结果，即拼装了多个原trial-multi-check的返回结果
	}
}

</pre>

===指令分发 同向历史分发信息检查===
CGI：/sync/instruction/assign_history_check<br/>
使用说明：IPB前缀； 指令分发 同向历史分发信息检查，会返回与历史不一样的差异数据<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_ids || string || 勾选的指令id，支持多个，逗号隔开
|-
| uid || int || 要分发的交易员id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/assign_history_check
POST参数:
ins_ids=1001,1002&uid=100001

正确响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
                "list": [             //具体的不同历史分发信息
                     {
		          "pre_user": "小瘪三",     //之前分发的对象用户名称
		          "pre_ins_id": 2,     //之前的同向指令id
		          "ins_id": 222     //这次要分配的指令id
	             },
                     {
		          "pre_user": "小瘪三",     //之前分发的对象用户名称
		          "pre_ins_id": 21,     //之前的同向指令id
		          "ins_id": 22     //这次要分配的指令id
	             }
                ]
        }
}
</pre>

===指令分发 分发===
CGI：/sync/instruction/assign_pass<br/>
使用说明：IPB前缀； 指令分发 分发动作<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_ids || string || 勾选的指令id，支持多个，逗号隔开
|-
| uid || int || 要分发的交易员id
|-
| risk_sign || string || 上一步试算风控时接口返回的sign值
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/assign_pass
POST参数:
ins_ids=1001,1002&uid=100001&risk_sign=dr50f2lf3l4g3qg

正确响应：
{
"code": 0,
"msg": "ok",
"data": {}
}
</pre>

===指令分发 拒绝===
CGI：/sync/instruction/assign_refuse<br/>
使用说明：IPB前缀； 指令分发 拒绝动作<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_ids || string || 勾选的指令id，支持多个，逗号隔开
|-
| refuse_reason || string || 拒绝原因
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/assign_refuse
POST参数:
ins_ids=1001,1002&refuse_reason=心累

正确响应：
{
"code": 0,
"msg": "ok",
"data": {}
}
</pre>

===指令分发 状态查询===
CGI：/sync/instruction/get_assign_settings<br/>
使用说明：IPB前缀； 指令分发功能中，获取自动分发设置，拒收设置等信息<br/>
请求方法：GET<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/get_assign_settings


正确响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "login_auto_assign_state":0,    //登陆者的自动分发开关状态 0关闭 1开启
        "absent_users":[           //当前不在线（即拒收状态）的交易员id列表
            "1140000"
        ],
        'rule_state':1   //自定义分发规则1  默认分发规则0
    }
}
</pre>

===指令分发 自动分发开关设置===
CGI：/sync/instruction/set_auto_assign<br/>
使用说明：IPB前缀； 指令分发 自动分发开关设置<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| state || int || 0关闭自动分发 1开启自动分发
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/set_auto_assign
POST参数:
state=1

正确响应：
{
"code": 0,
"msg": "ok",
"data": {}
}
</pre>

===指令分发 拒收指令开关设置===
CGI：/sync/instruction/set_absent<br/>
使用说明：IPB前缀； 指令分发 交易员拒收指令开关设置<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| state || int || 0关闭拒收状态 1开启拒收状态
|-
| step || int || state=1时使用。 1验证是否可拒 2最终确定 详见下面补充说明
|}
step用法：先传step=1,返回不能拒收(code 508120)则弹框提示当前不能拒收；返回ok时则弹框提示是否确认，确认则继续传step=2再调用一次，完成设置。
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/set_absent
POST参数:
state=1&step=1

正确响应：
{
"code": 508120,
"msg": "当前不能拒收指令！",
"data": {}
}
</pre>

===指令分发 获取自动分发规则===
CGI：/sync/instruction/get_auto_assign_rules<br/>
使用说明：IPB前缀； 指令分发 获取机构自动分发规则<br/>
请求方法：GET<br/>

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/get_auto_assign_rules
//3.57.0 增加了基金经理列表(含交易单元权限) 和 交易员列表(含交易单元权限)
正确响应：

{
    "code":0,
    "msg":"ok",
    "data":{
        "rules":[
            {
                "id":251,
                "org_id":999,
                "operator_uid":9991359,
                "product_id":"11110",
                "trader_uid":"",
                "auto_exec":0,
                "market": "all,SH,SZ,BJ,HKSH,HKSZ,NQ,SH_B,SZ_B,HK,US,CFFEX,DCE,ZCE,SHFE,INE,OTHER",
                "state":1,
                "products":{
                    "11137":"hs期货下行测试",
                    "11091":"hs期货测试交易单元",
                    "11090":"期货测试交易单元",
                    "11162":"华泰-测试",
                    "11161":"收益互换-中信-1",
                    "11155":"收益互换交易单元",
                }
            },
            {
                "id":252,
                "org_id":999,
                "operator_uid":9991359,
                "product_id":"11012",
                "trader_uid":"",
                "auto_exec":0,
                "state":1,
                "products":{
                    "11137":"hs期货下行测试",
                    "11091":"hs期货测试交易单元",
                    "11090":"期货测试交易单元",
                    "11162":"华泰-测试",
                    "11161":"收益互换-中信-1",
                    "11155":"收益互换交易单元",
                }
            }
        ],
        "users":{
            "operator":{
                "9991359":{
                    "uid":9991359,
                    "name":"冯一一",
                    "products":{
                        "11137":"hs期货下行测试",
                        "11091":"hs期货测试交易单元",
                        "11090":"期货测试交易单元",
                        "11162":"华泰-测试",
                        "11161":"收益互换-中信-1",
                        "11155":"收益互换交易单元",
                        "11146":"收益互换交易单元3",
                        "11143":"收益互换交易单元2",
                        "11141":"中金-测试-2",
                        "11138":"test1-中金2",
                        "11135":"测试基金关联-中金",
                        "10994":"交易单元ly",
                        "11116":"IMS模拟交易测试",
                        "11110":"中信建投文件单",
                        "11015":"申万恒生文件导出",
                        "11013":"浙商迅投日志解析",
                        "11152":"收益互换-中信",
                        "11151":"收益互换-华泰",
                        "11029":"Golden China Master Fund",
                        "11012":"IMS日志解析",
                        "11134":"ike测试",
                        "10999":"A-Account1",
                        "10966":"清长安资产景林新三板2期 缺省组合",
                        "10977":"金元证券",
                        "11000":"沣京凤凰二期私募证券投资基金测试产品 沣京凤凰二期私募证券投资基金测试产品"
                    }
                }
            },
            "trader":{
                "9990111":{
                    "uid":9990111,
                    "name":"111",
                    "products":[
                        "11015",
                        "11013",
                        "11012",
                        "10999",
                        "10966",
                        "10977",
                        "11000"
                    ]
                },
                "9991144":{
                    "uid":9991144,
                    "name":"plq",
                    "products":[
                        "11091",
                        "11090",
                        "11110",
                        "11015",
                        "11013",
                        "11029",
                        "11012",
                        "10999",
                        "10966",
                        "10977",
                        "11000"
                    ]
                }
            }
        }
    }
}
</pre>

===指令分发 设置自动分发规则===
CGI：/sync/instruction/set_auto_assign_rules<br/>
使用说明：IPB前缀； 指令分发 设置机构自动分发规则<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| rules || 数组|| 默认规则时后台会忽略rules数组
|-
| rules[]['operator_uid'] || int || 基金经理id
|-
| rules[]['product_id'] || string || 交易单元id 逗号分隔
|-
| rules[]['market'] || string || 交易市场 逗号分隔
|-
| rules[]['trader_uid']|| int || 交易员id
|-
| rules[]['auto_exec'] || int || 是否自动执行 1是，0否
|}
示例：<br/>
<pre>
http://192.168.0.81:8081/ipb-pub/sync/instruction/set_auto_assign_rules?rules[0][operator_uid]=570003&rules[0][product_id]=0,1,2,3&rules[0][trader_uid]=570013&rules[0][auto_exec]=0&rules[1][operator_uid]=570004&rules[1][product_id]=0,1,2,3&rules[1][trader_uid]=570014&rules[1][auto_exec]=0
</pre>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/instruction/set_auto_assign_rules

正确响应：
{
    "code": 0,
    "msg": "ok",
    "data": {}
}
</pre>

===委托下单（指令执行）===
CGI：/oms/workflow/{product_id}/add_hand_order<br/>
使用说明：委托下单<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| risk_batch_id || string || 可选参数。下单流程上一步中调用trial-multi-check算风控时前端生成的batch_id。若传该值则下单接口中不会再做风控请求
|-
| is_manual_order || int || 是否为手工单，0为否，同步模式传0
|-
| price || float ||委托价格
|-
| stock_id|| string || 股票代码，000001.SZ
|-
| trade_direction || int || 交易方向  1买入 2卖出  收益互换独有（9卖空 10买平） 期货独有（3买开 4卖开 5买平 6卖平 11买入平今 12卖出平今）
|-
| market || int || 交易市场  1A股 2沪港通 3深港通 8收益互换A股 9收益互换港股 10收益互换美股
|-
| trade_mode || int || 非收益互换时，沪市，限价1，市价(五档即成剩撤6 五档即成转剩8） 
|-
| || ||   非收益互换时，深市，限价1，市价(对方最优价格3 本方最优价格4 即时成交剩余撤消5 五档即成剩撤6 全额成交或撤销7)  
|-
| || ||   非收益互换时，北交所，限价1，市价(对方最优价格3 本方最优价格4 五档即成剩撤6 五档即成转剩8)  
|-
| || ||   非收益互换时，港股通代码，(竞价限价4 增强限价5 零股限价6)
|-
| || ||   期货时，限价1
|-
| || ||   收益互换时，1限价 2市价
|-
| trade_number_method || string || 交易的方法，有volume...
|-
| volume || int ||交易股数，100的整数倍
|-
| ins_id || int ||指令id
|-
| is_algo_supplement || int || 是否属于算法中补单 0否1是 默认0
|-
|is_future || int || 是否是期货下委托 1 是 0 否
|-
|is_swap || int || 是否是收益互换下委托 1 是 0 否
|-
|swap_algo_type || int || 收益互换类pb算法-  2 TWAP, 3 VWAP, 4 POV, 5 ICEBERG, 6 MANUAL, 7 VOLINLINE
|-
|swap_start_time || string || 收益互换类pb算法-起始时间 格式XX:XX:XX
|-
|swap_end_time || string || 收益互换类pb算法-起始时间 格式XX:XX:XX
|-
|swap_mp || int || 收益互换类pb算法-市场参与度 （部分算法选填参数）
|-
|swap_open || int || 收益互换类pb算法- FIX券商算法参与开收盘参数
|-
|swap_close || int || 收益互换类pb算法- FIX券商算法参与开收盘参数
|-
|swap_ds || int || 收益互换类pb算法- 显示数量（ICEBERG算法时选填参数）
|-
|swap_memo || string || 收益互换类pb算法-备注（MANUAL算法时选填参数）
|-
|exec_mode || string || 收益互换类pb fix专用 执行模式 1-自动 2-需要人工干预 3-手动
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/oms/workflow/100112/add_hand_order
POST参数:
batch_no=20000-1501748476778-9613922495&is_manual_order=0&market=1&price=2.45&stock_code=333683.sz&trade_direction=2&trade_market=1&trade_mode=1&trade_number_method=volume&volume=1000

正确响应：
{
"code": 0,
"msg": "ok",
"data":null
}


</pre>
错误响应：
{| class="wikitable"
|-
! 错误码 !! 错误信息 !! 返回数据 !! 说明
|-
| 5502212 || 交易单元未开启XXX交易功能||  ||
|-
| 5502213 || 交易数据异常||  ||
|-
| 5022110 || 系统异常，请联系管理员！ || 
{
"000683.SZ": {
"code": 5022110,
"msg": "缓存异常",
"data": []
}  
|| 
|-
| 5502210 || 返回产品数据格式错误 ||  ||
|-
| 5502211 || 该交易单元未关联基金 ||  ||
|-
| 400001 || 不能在非交易日进行交易 ||  ||
|-
| 400002 || 不在限定的交易时间范围内，时间必须小于XXX || ||
|-
| -1 || 
1.指令不存在
2.委托与指令交易方向不一致 
3.委托价格不得高于指令价格！
4.委托价格不得低于指令价格
|| ||
|-
| 20014 || 当前委托操作过于频繁，请稍后再试！ || ||
|-
| 5022301 || 获取到交易单元信息失败 || ||
|-
| 5022302 || 获取到交易单元剩余可买天数失败 || ||
|-
| 5022303 || 暂未指定买卖方向 || ||
|-
| 5022304 || 最后清仓日期不允许买入股票 || ||
|-
| 5022310 || 获取指数缺口数量失败 || ||
|-
| 5022311 || 输入数量超过缺口数量，最大可买/卖XXX股 || ||
|}
[http://192.168.0.22:12080/index.php?title=Xc_rms_api#api.E5.A4.9A.E8.82.A1.E7.A5.A8.E9.A3.8E.E6.8E.A7.E6.A3.80.E6.B5.8B.E6.8E.A5.E5.8F.A3 风控触发文档]

===算法指令 手动执行===
CGI：/oms/workflow/algo_ins_exec<br/>
使用说明：算法指令的 手动执行<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id || int || 算法指令母指令id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/oms/workflow/algo_ins_exec
POST参数:
ins_id=1212

正确响应：
{
"code": 0,
"msg": "ok",
"data":null
}


</pre>

===指令 算法执行 启动===
CGI：/sync/instruction/algo_auto_entrust<br/>
使用说明：指令 算法执行<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|algorithm_param|| object ||请参考下面的算法参数字段说明
|-
|algorithm_type || int ||  3 TWAP算法  4 POV算法  不传为普通算法
|-
|ins_id|| int ||指令id
|}
algorithm_param（算法参数字段）描述 注意不同情形时参数的适用性不一样，详见下述说明
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|auto_cancel_before_auction||int|| 集合竞价前自动撤单 1是0否
|-
|auto_cancel_interval||int||自动撤单时间间隔，0:0,即不自动撤单，1:10s(默认), 2:20s, 3:30s, 4:40s, 5:50s, 6:60秒 ，7:90s, 8:120秒，9:300秒， 10:600秒  11:5秒
|-
|price_mode||int|| 价格模式，1 买1, 2 买2, 3 买3, 4 买4, 5 买5, 6 A股限价 7港股-竞价限价 8港股-增强限价，11 卖1, 12 卖2, 13 卖3, 14 卖4, 15 卖5, 
|-
|sub_price_mode||int|| 当price_mode=6，7，8时，批量指令时，本字段生效。枚举值同price_mode。后端无逻辑，只透传。用于前端展示限价模式时指定具体的限价值。
|-
|volume_type||int|| 普通算法参数   单笔数量模式  1 买1量(默认), 2 买1-2量, 3 买1-3量, 4 买1-4量, 5 买1-5量, 6 绝对数量，11 卖1量, 12 卖1-2量, 13 卖1-3量, 14 卖1-4量, 15 卖1-5量
|-
|volume_value||float||普通算法参数   单笔数量值：volume_type为1～5或11～15时，填比例值；为6时填绝对数量股
|-
|volume_offset_type||int|| 普通算法参数   波动区间比例偏移方式 1比例偏移 2数量偏移
|-
|volume_offset_value||float||普通算法参数   比例偏移值：offset_type为1时，填比例值；为2时三个可选值（1:0-5手。2:0-10手。 3:0-20手）
|-
|entrust_interval_offset||int||普通算法参数   自动下单时间间隔偏移值，1:0-10秒，2:0-20秒，3:0-30秒，默认0-10秒请填1 
|-
|entrust_interval||int||委托时间间隔，不同算法类型的定义不一样。如下：
|-
|||||普通算法交易： 1:10s, 2:20秒，3:30秒 ，4:40s, 5:50s, 6:60秒，7:90s, 8:120秒，9:300s 10:5s 默认60秒请填6
|-
|||||TWAP & POV ： 单位s ，可填任意大于10小于500的int
|-
|entrust_cycle||int|| TWAP参数   下单次数
|-
|entrust_rate||float|| POV参数    成交速率，30% = 0.3
|-
|price||float||单票指令参数   价格 当price_mode=6，7，8时，传值具体的价格 组合指令不传
|-
|sub_list|| array||组合指令参数。子列表的下单信息,第一维以要跑算法的证券id为key（如000683.SZ）,第二维包含以下字段
|-
|sub_list[证券id]['price']|| double ||子项的报价价格 当对应price_mode=6，7，8时，传值具体的价格；其他情况传0
|-
|ins_algo_weight_mode|| int || 0关闭，1开启按照各组合指令数量的权重来分配
|-
|sub_algo_weight_mode|| int ||补单 0关闭，1开启按照各组合指令数量的权重来分配
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/algo_auto_entrust

POST参数：
entrust_unit=1000&price=11.01&price_mode=1&entrust_unit_offset=1&auto_cancel_interval=2&entrust_interval=1&entrust_interval_offset=1
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
		"ins_algo_id": null,     //该指令的上一条算法id 。无则null
		"compare_result": -1.  //此次算法和该指令上一条算法信息的对比结果 0算法不变 -1之前无算法 -2算法参数发生变化 -3算法不变但执行人发生变化
	}
}
</pre>

===指令 算法执行 暂停===
CGI：/sync/instruction/algo_pause<br/>
使用说明：指令 算法执行 暂停<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/algo_pause

POST参数：
ins_id=11
响应：
{
    "code": 0,
    "msg": "ok",
    "data":null
}
</pre>

===指令 算法执行 子项暂停/继续===
CGI：/sync/instruction/algo_change_detail_status<br/>
使用说明：算法委托中，对某一个交易单元子项进行暂停或继续<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|product_id|| int ||交易单元id
|-
|status|| string || 要修改的状态 goon继续  pause暂停
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.150:38080/omsv2/sync/instruction/algo_change_detail_status

POST参数：
ins_id=1000&product_id=11001&status=pause
响应：
{
    "code": 0,
    "msg": "修改成功",
    "data": []
}
</pre>

===获取指令 算法执行 参数===
CGI：/sync/instruction/algo_get_param<br/>
使用说明：获取指令 算法执行参数<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/algo_get_param?ins_id=112
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"algorithm_type": 2, //算法交易v2
		"algorithm_status": 1, //1运行中2暂停
		"algorithm_param": { //以下参数，取值情况请参考上面自动委托api中的传参
                        "auto_cancel_before_auction": 1,     //集合竞价前自动撤单 0否1是
			"auto_cancel_interval": 0, 
			"entrust_interval": 2,
			"entrust_interval_offset": 1,
			"price": 4.8,
			"price_mode": 6,
			"volume_offset_type": 6,
			"volume_offset_value": 1,
			"volume_type": 6,
			"volume_value": 2000
		}
	}
}
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/algo_get_param?ins_id=113
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"algorithm_type": 3, //Twap 算法
		"algorithm_status": 1, //1运行中2暂停
		"algorithm_param": { //以下参数，取值情况请参考上面自动委托api中的传参
                        "auto_cancel_before_auction": 1,     //集合竞价前自动撤单 0否1是
			"auto_cancel_interval": 0, 
			"entrust_interval": 2,
                        "entrust_cycle": 5,
			"price": 4.8,
			"price_mode": 6,
		}
	}
}

请求：
http://192.168.0.81:8081/omsv2/sync/instruction/algo_get_param?ins_id=114
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"algorithm_type": 4, //Pov 算法
		"algorithm_status": 1, //1运行中2暂停
		"algorithm_param": { //以下参数，取值情况请参考上面自动委托api中的传参
                        "auto_cancel_before_auction": 1,     //集合竞价前自动撤单 0否1是
			"auto_cancel_interval": 0, 
			"entrust_interval": 2,
                        "entrust_rate": 0.5,
			"price": 4.8,
			"price_mode": 6,
		}
	}
}
</pre>
[https://www.tapd.cn/20345271/prong/stories/view/1120345271001003882 1.支持算法指令] <br/>
[https://www.tapd.cn/20345271/prong/stories/view/1120345271001004119 2.国债逆回购支持算法指令]
===设置指令 算法执行参数===
CGI：/sync/instruction/algo_set_param<br/>
使用说明：设置指令 算法执行参数<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|algorithm_param|| string || 算法指令参数json格式
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/algo_set_param

响应：
{
    "code": 0,
    "msg": "ok",
    "data":修改成功
}
</pre>

===指令 算法执行 置疑提醒悬浮框 关闭===
CGI：/sync/instruction/close_algo_doubt_notice<br/>
使用说明：指令 算法执行 置疑提醒悬浮框 关闭接口<br/>
请求方法：POST<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/close_algo_doubt_notice

响应：
{
    "code": 0,
    "msg": "ok",
    "data":null
}
</pre>

===指令验资验券===
CGI：sync/api/verification_ins<br/>
使用说明：指令验资验券（包含指令提交和委托）<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ignore || int || 是否忽略预警
|-
| is_basket || int || 是否是篮子指令 0不是 1是
|-
| is_combi || int || 是否是组合指令 0不是 1是
|-
| is_execute || int || 是否是执行指令(下委托) 0不是 1是
|-
| ins_id || int || 可选参数 。当修改指令验资验券时，需要传该值，对应修改指令的指令id
|-
| list || array ||
{| class="wikitable"
! 参数 !! 类型 !! 说明
|-
| stock_id || string || 股票代码
|-
| input || float || 前端输入参数（数量，比例）
|-
| trade_number || int || 前端输入的子项的实际绝对数量
|-
| add_ins_method || int ||  下单方式 1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例
|-
| product_id || int || 交易单元id
|-
| price || float || 价格
|-
| direction || int || 交易方向 1买 2卖 9收益互换卖空 10收益互换买平
|}
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/api/verification_ins
post参数：list[0][stock_id]=000683.SZ&list[0][input]=100&list[0][add_ins_method]=1&list[0][product_id]=526&list[0][price]=12.01&list[0][direction]=1
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"526": {
			"code": 505201,
			"msg": "超出最大可买量,指令无法提交",
			"data": 2682687900
		}
	},
	"timestamp": 1534130132.6007,
	"timeConsumption": 4.3898818492889,
	"requestStartTime": null,
	"input": {
		"list": [{
			"stock_id": "000683.SZ",
			"input": "100",
			"add_ins_method": "1",
			"product_id": "526",
			"price": "12.01",
			"direction": "1"
		}]
	}
}
</pre>
<br/>

===指令委托列表===
CGI：/sync/instruction/entrust_list<br/>
使用说明：指令委托列表（包含算法指令下的委托）<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|product_id|| int ||指定交易单元id。多交易单元的子项调用。 
|-
|stock_id|| string ||指定证券id。多证券的子项调用。 
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/entrust_list?ins_id=112
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
    "cur_page_no": 1,
    "total_page_count": 0,
    "page": 1,
    "count": 9999,
    "max": 0,
    "total": 0,
    "list": [
             {
              "id":1,    //系统内部委托id
              "sid": "000001.SZ",     //组合指令时才有，证券id
              "sname": "平安银行",    //组合指令时才有，证券名称
              "entrust_id": 101,    //第三方委托编号
              "is_algo_supplement": 0, //是否算法补单 0否1是
              "order_status_text": "失败", //订单状态
              "entrust_price":"11.23",//委托价格
              "entrust_amount":"200",//委托数量
              "deal_amount":"200",//成交数量
              "deal_avg_price":"11.23",//成交均价
              "cancel_amount":"100",//已撤数量
              "entrust_at":"2017-10-11 11:11:11",//委托时间
              "updated_at":"2017-10-11 11:11:17",//更新时间
              "comment":“触发禁止性风控：超过最大可用金额1000元”,//备注
              "forbidden_risk": 1   //本条数据是否属于触发了禁止风控的记录 1是0否
              }  
         ]
  },
}
</pre>
<br/>

===指令 置疑处理 未匹配委托列表===
CGI：/sync/instruction/dismatch_entrust_list<br/>
使用说明：指令执行 - 置疑处理 -未匹配委托列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|product_id|| int || 对应的交易单元id
|-
|stock_id|| string || 对应的证券id 可选参数
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.150:38080/omsv2/sync/instruction/dismatch_entrust_list?product_id=10001&ins_id=1001&stock_id=000001.SZ
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "dismatch_entrust_list":[
            {
                "id":"151215",       //委托表id
                "entrust_id":"151215",    //委托编号
                "order_status_desc": "废单",    //委托状态
                "entrust_price":"9.05000",  //委托价格
                "entrust_amount":1000,     //委托数量. -- 注意如果前端要展示有效委托，需要entrust_amount减去cancel_amount
                "cancel_amount":100,     //已撤单数量 
                "deal_amount":100,        //成交数量
                "deal_avg_price":"9.0500",   //成交价格
                "entrust_at":"2018-08-03 11:21:37",     //委托时间
                "auto_selected":1       //是否模糊匹配推荐的
            }
        ],
        "manual_matched_num": 3,       //已手工匹配委托笔数
        "manual_matched_volume": 3000   //已手工匹配委托数量
    },
    "timestamp":1533274960.5771,
    "timeConsumption":0.58996295928955,
    "requestStartTime":null
}


</pre>
<br/>
===指令 置疑处理 未匹配委托列表 （多指令版本）===
CGI：/sync/instruction/multi_dismatch_entrust_list<br/>
使用说明：指令执行 - 置疑处理 -未匹配委托列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id 多个指令id 逗号分隔
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.150:38080/omsv2/sync/instruction/multi_dismatch_entrust_list?ins_id=1001,1002
{
	"code": 0,
	"msg": "ok",
	"data": {
		"dismatch_entrust_list": [ //待匹配委托数据
			[{
				"id": 679284,
				"entrust_id": "82383",
				"entrust_type": 1,
				"stock_code": "000301.SZ",
				"order_status_text": "已成",
				"entrust_price": "18.35000",
				"entrust_amount": 200,
				"cancel_amount": 0,
				"deal_avg_price": "18.2300",
				"deal_amount": 200,
				"entrust_at": "2021-05-25 10:15:39",
				"auto_selected": 0
			}]
		],
		"dismatch_ins_list": [{}], //同search_list获取到的指令列表数据
		"manual_data": [{ //已匹配数据
			"ins_id": 18247,
			"product_id": 11110,
			"manual_matched_num": 2,
			"manual_matched_volume": 400
		}]
	}
}


</pre>
<br/>

===指令详情  已手工匹配委托列表===
CGI：/sync/instruction/manual_matched_entrust_list<br/>
使用说明：指令执行 - 指令单项详情 -已手工匹配委托列表. 指令总项详情无该接口 <br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|product_id|| int || 对应的交易单元id
|-
|stock_id|| string || 对应的股票id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.150:38080/omsv2/sync/instruction/manual_matched_entrust_list?product_id=10001&ins_id=1001&stock_id=000001.SZ
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "entrust_list":[
            {
                "entrust_id":"151215",    //委托编号
                "order_status_desc": "废单",    //委托状态
                "entrust_price":"9.05000",  //委托价格
                "entrust_amount":100,     //委托数量. -- 注意如果前端要展示有效委托，需要entrust_amount减去cancel_amount
                "cancel_amount":100,     //已撤单数量 
                "deal_amount":100,        //成交数量
                "deal_avg_price":"9.0500",   //成交价格
                "entrust_at":"2018-08-03 11:21:37",     //委托时间
                "auto_selected":1       //是否模糊匹配推荐的
            }
        ]
    },
    "timestamp":1533274960.5771,
    "timeConsumption":0.58996295928955,
    "requestStartTime":null
}


</pre>
<br/>

===指令 委托手动匹配 提交===
CGI：/sync/instruction/manual_match<br/>
使用说明：指令 手动匹配委托 提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|product_id|| int || 对应的交易单元id
|-
|stock_id|| string || 对应的证券id
|-
|entrust_ids|| string || 勾选匹配的委托id（对应未匹配列表接口中的list里的id），支持多个，下划线分割
|-
|release_volume|| int || 释放的委托数量
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.150:38080/omsv2/sync/instruction/manual_match
post参数：ins_id=1001&product_id=10001&stock_id=000001.SZ&entrust_ids=201_202_203&release_volume=100

响应：
{
    "code": 0,
    "msg": "匹配成功",
    "data":null
}
</pre>
===批量处理 指令 委托手动匹配 提交===
CGI：omsv2/sync/instruction/multi_manual_match<br/>
使用说明：批量处理 指令 手动匹配委托 提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| params || string ||
{| class="wikitable"
! 参数 !! 类型 !! 说明
|-
|ins_id|| int ||指令id
|-
|product_id|| int || 对应的交易单元id
|-
|stock_id|| string || 对应的证券id
|-
|entrust_ids|| string || 勾选匹配的委托id（对应未匹配列表接口中的list里的id），支持多个，下划线分割
|-
|release_volume|| int || 释放的委托数量
|}
|}
示例：<br/>
<pre>
请求：
http://192.168.0.150:38080/omsv2/sync/instruction/multi_manual_match
post参数：[{
	"ins_id": 18247,
	"product_id": 11110,
	"stock_id": "000100.SZ",
	"entrust_ids": "679283",
	"release_volume": ""
}]

响应：
{
	"code": 0,
	"msg": "ok",
	"data": [{
			"ins_id": 18247,
			"product_id": 11110,
			"code": 50304,
			"msg": "委托263281-82365-20210525已被指令18247匹配过" 
		},
		{
			"ins_id": 18247,
			"product_id": 11110,
			"code": 0,
			"msg": "ok"
		}
	]
}
</pre>

===提交时获取股票持仓信息===
CGI：omsv2/sync/api/stock_position_info<br/>
使用说明：委托管理&指令交易- 选定交易单元及股票后，获取对应的持仓信息，用于右侧持仓数量及仓位的展示<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string ||交易单元id,多个则以下划线分隔。如 10776_10778(可选，不传返回所有权限下的product_id)
|-
| stock_id || string || 证券id
|-
| hold_direction || int || 0只返回多头持仓数据， 1多空头持仓数据都返回
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://114.55.219.85/omsv2/sync/api/stock_position_info?product_ids=&stock_id=000001.SZ&hold_direction=0
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "11012":{
            "hold_volume":"5,400",//多头持仓 前端展示带千分位
            "enable_sell":"5,000",//可卖数量 前端展示带千分位
            "market_value":100062,//市值 供前端计算
            "short_hold_volume":"0",
            "short_market_value":0,
            "today_amount":"800",
            "lastday_amount":"10,000",
            "margin_occupation":"0"
        },
        "11015":{
            "hold_volume":"1,000",//多头持仓 前端展示带千分位
            "enable_sell":"0",//可卖数量 前端展示带千分位
            "market_value":161440,//市值 供前端计算
            "short_hold_volume":"0",
            "short_market_value":0,
            "today_amount":"0",
            "lastday_amount":"0",
            "margin_occupation":"0"
        },
        "11162":{
            "hold_volume":"1,000",
            "enable_sell":"0",
            "market_value":161440,
            "short_hold_volume":"0",
            "short_market_value":0,
            "today_amount":"0",
            "lastday_amount":"0",
            "margin_occupation":"0"
        },
        "total":{
            "hold_volume":"7,400",
            "short_hold_volume":"0",
            "enable_sell":"5,000",
            "margin_occupation":"0",
            "today_amount":"400",
            "lastday_amount":"5,000",
            "market_value":422942,
            "short_market_value":0
        }
    }
}
//请求
https://114.55.219.85/omsv2/sync/api/stock_position_info?product_ids=&stock_id=IF2109.CFFEX&hold_direction=1
//相应
{
    "code":0,
    "msg":"ok",
    "data":{
        "11137_0":{ //11137 多头
            "hold_volume":"2",
            "enable_sell":"0",
            "market_value":2296776,
            "short_hold_volume":"0",
            "short_market_value":0,
            "today_amount":"0",
            "lastday_amount":"4",
            "margin_occupation":"459,355.2"
        },
        "11193_1":{//11193 空头
            "hold_volume":"0",
            "enable_sell":"0",
            "market_value":0,
            "short_hold_volume":"156", //空头持仓
            "short_market_value":225576000,
            "today_amount":"0",
            "lastday_amount":"312",
            "margin_occupation":"45,483,984"
        },
        "11193_0":{//11193 多头
            "hold_volume":"53",//多头持仓
            "enable_sell":"0",
            "market_value":76638000,
            "short_hold_volume":"0",
            "short_market_value":0,
            "today_amount":"100",
            "lastday_amount":"6",
            "margin_occupation":"30,715,704"
        },
        "total":{
            "hold_volume":"55",
            "short_hold_volume":"156",
            "enable_sell":"0",
            "margin_occupation":"38,329,521.6",
            "today_amount":"50",
            "lastday_amount":"161",
            "market_value":78934776,
            "short_market_value":225576000
        }
    }
}
</pre>

===提交指令时获取空头保证金比例和多头保证金比例===
CGI：omsv2/sync/api/product_margin_rate<br/>
使用说明：指令交易- 选定交易单元及股票后，获取对应的空头保证金比例和多头保证金比例，用于右侧保证金计算展示<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string ||交易单元id,多个则以逗号分隔。如 10776,10778 
|-
| stock_id || string || 证券id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://114.55.219.85/omsv2/sync/api/product_margin_rate?product_ids=11029,11028&stock_id=000001.SZ
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "11029":{
            "market":"",
            "name":"",
            "code":"000001.SZ",
            "product_id":"11029",
            "rate_long":10, //多头
            "rate_short":10, //空头
            "default": ture, //是否为默认值
        },
        "11028":{
            "market":"",
            "name":"",
            "code":"000001.SZ",
            "product_id":"11028",
            "rate_long":"10",
            "rate_short":"10"
        }
    }
}
</pre>

===当前持仓列表===
CGI：omsv2/sync/api/position_list<br/>
使用说明：委托管理&指令交易- 当前持仓列表 - 通版使用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string ||交易单元id,多个则以下划线分隔。如 10776_10778
|-
| order_by || string ||排序字段，分别支持stock_id,stock_name,product_id,cost_price,latest_price,hold_volume,enable_sell,market_value,profit_loss_amount,profit_loss_rate,weight,change_ratio
|-
| order || string ||排序方式，支持asc，desc
|-
| page || int ||页数，从1开始，默认1
|-
| count || int ||每页条数，默认50
|-
| product_name || string ||要筛选的交易单元名称 支持模糊匹配
|-
| stock_id || string ||要筛选的证券id
|-
| position_type || int || 1时只包含收益互换持仓，0默认所有持仓
|-
| group_id || string || 基金id，多个以逗号分隔
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/omsv2/sync/api/position_list?product_ids=10785_10776&order_by=weight&order=desc&product_name=海通&stock_id=000979.SZ
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "count":3,      //总条数
        "list":[           //当页条数
            {
                "product_id":10785,        //交易单元id
                "product_name":"海通通达信-a股",   //交易单元名称
                "stock_id":"601288.SH",     //股票id
                "stock_name":"农业银行",     //股票名称
                "cost_price":"3.692",           //成本价
                "latest_price":"3.850",         //最新价
                "hold_volume":"100",           //持仓数量
                "enable_sell":"100",              //可卖数量
                "market_value":"385.000",        //市值
                "profit_loss_amount":"15.820",    //浮动盈亏
                "profit_loss_rate":"4.28",           //浮盈率
                "weight":"25.1473%"                  //所占仓位
                 margin_occupation:    0      //保证金占用
                hold_direction :  '多'          //持仓方向 多 和 空头
                market_name : 中金所      //交易市场
                maket: 5                          //交易市场id
                sec_type:      2         //代表期货
                 hedge_flag: '投机‘   //投保标志
                change_ratio: 0.12    //涨跌幅
                position_type: 1    //收益互换的持仓，1-是，0-否
                group_id: 1    //基金id
            },
            {
                "product_id":10776,
                "product_name":"海通通达信-a股", 
                "stock_id":"000979.SZ",
                "stock_name":"中弘股份",
                "cost_price":"1.03",
                "latest_price":"0.97",
                "hold_volume":"100",
                "enable_sell":"0",
                "market_value":"97.00",
                "profit_loss_amount":"-6.00",
                "profit_loss_rate":"-5.82",
                "weight":"4.1367%"
            }
        ],
        "total_weight":"49.0723%"           //交易单元总仓位
    },
    "timestamp":1537958331.5294,
    "timeConsumption":0.19349408149719,
    "requestStartTime":null
}


</pre>

===委托明细列表===
CGI：/oms/order/get_entrust_list<br/>
使用说明：指令交易 - 委托明细列表<br/>
请求方法：GET<br/>
               指令提交/指令执行 - 委托列表页签，传product_id和market
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type || string ||委托类型
|-
| product_id|| array || 产品id数组
|-
| market|| int || 交易市场    1 A股tab 2港股通tab 6期货tab 在指令提交/执行 的 委托明细tab中筛选用到
|-
| ins_id|| int || 指令id，用于在指令执行-执行-指令委托里 使用 。此时不需要传market
|-
| stock_id|| string || 证券id，可选
|-
| direction|| int || 指定方向，1买2卖3开仓买入4开仓卖出5平仓买入6平仓卖出 ，可选参数,公平交易中用到
|-
| count|| int || 每页显示条数，请传递一个大整数，例如：count=9999
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.33/omsv2/oms/order/get_entrust_list?permission_type=product&type=all&count=9999&market=1&product_id[]=101232
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "cur_page_no": 1,
        "total_page_count": 1,
        "page": 1,
        "count": 9999,
        "max": 1,
        "total": 14,
        "list": [
            {
                "id": "7877",
                "product_id": "241",//单元id
                "product_name": "信托产品",//单元名称
                "group_name": "广发证券",//基金名称
                "order_id": "112-19299-20171026",//订单 id
                "created_at": 1508998263,//委托时间
                "updated_at": 1508998264,//更新时间戳
                "is_auto": 1,
                "entrust": {
                    "price": "3.180",//委托价格
                    "amount": "100",//委托数量
                    "model": 1,//委托交易方式
                    "type": "1",//委托方向
                    "state": "0",//操盘手委托声明, 下单/改单/撤单
                    "batch_no": "",//所属批量订单号
                    "cancel_volume": "0",//撤单数量
                    "vendor_status_text": "废单",//状态描述
                    "quote_type_text": "限价",//报价类型
                    "bs_symbol_text": "买入",//买卖标志
                    "exchange_rate": "--"//人民币汇率
                },
                "stock": {
                    "code": "000683.SZ",//股票代码
                    "name": "远兴能源"//股票名称
                },
                "last_handler": [],
                "deal": {
                    "price": "0.0000",//成交价格
                    "amount": "0",//成交数量
                    "total": "0.000",//成交金额
                    "date": "",
                    "time": ""
                },
                "cancel_status": "",// 提交撤单 / 执行撤单
                "order_status": 3,// 提交订单 / 审核分配订单 / 委托订单 / 成交反馈
                "status": 8// 等待执行 / 已委托 / 已退回 / 部分成交 / 全部成交 / 等待撤单 / 已撤单 / 废单 / 已删除
            }
        ]
    }
}
</pre>

===指令层委托明细列表===
CGI：/oms/order/get_entrust_list_v2<br/>
使用说明：指令交易 - 指令级委托明细列表<br/>
请求方法：GET<br/>
              
               指令执行-执行-指令委托，要查当前指令时，传ins_id和product_id（指令下的product_id即可）
               指令执行-执行-指令委托，要查公平交易指令时，传stock_id和direction
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type || string ||委托类型
|-
| product_id|| array || 产品id数组
|-
| market|| int || 交易市场    1 A股tab 2港股通tab 6期货tab 在指令提交/执行 的 委托明细tab中筛选用到
|-
| ins_id|| int || 指令id，用于在指令执行-执行-指令委托里 使用 。此时不需要传market
|-
| stock_id|| string || 证券id，可选
|-
| direction|| int || 指定方向，1买2卖3开仓买入4开仓卖出5平仓买入6平仓卖出 ，可选参数,公平交易中用到
|-
| count|| int || 每页显示条数，请传递一个大整数，例如：count=9999
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.33/omsv2/oms/order/get_entrust_list_v2?permission_type=product&type=all&count=9999&market=1&product_id[]=101232
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "cur_page_no": 1,
        "total_page_count": 1,
        "page": 1,
        "count": 9999,
        "max": 1,
        "total": 14,
        "list": [
            {
                "id": "7877",
                "product_id": "241",//单元id
                "product_name": "信托产品",//单元名称
                "group_name": "广发证券",//基金名称
                "order_id": "112-19299-20171026",//订单 id
                "created_at": 1508998263,//委托时间
                "updated_at": 1508998264,//更新时间戳
                "is_auto": 1,
                "ins_id": 122, //指令id
                "ins_num": 1220521001, //委托批号
                "entrust": {
                    "price": "3.180",//委托价格
                    "amount": "100",//委托数量
                    "model": 1,//委托交易方式
                    "type": "1",//委托方向
                    "state": "0",//操盘手委托声明, 下单/改单/撤单
                    "batch_no": "",//所属批量订单号
                    "cancel_volume": "0",//撤单数量
                    "vendor_status_text": "废单",//状态描述
                    "quote_type_text": "限价",//报价类型
                    "bs_symbol_text": "买入",//买卖标志
                    "exchange_rate": "--"//人民币汇率
                },
                "stock": {
                    "code": "000683.SZ",//股票代码
                    "name": "远兴能源"//股票名称
                },
                "last_handler": [],
                "deal": {
                    "price": "0.0000",//成交价格
                    "amount": "0",//成交数量
                    "total": "0.000",//成交金额
                    "date": "",
                    "time": ""
                },
                "cancel_status": "",// 提交撤单 / 执行撤单
                "complete_progress": 0.000,// 成交进度
                "order_status": 3,// 提交订单 / 审核分配订单 / 委托订单 / 成交反馈
                "status": 8// 等待执行 / 已委托 / 已退回 / 部分成交 / 全部成交 / 等待撤单 / 已撤单 / 废单 / 已删除
                "child": [
                      {
                       "id": "7877",
                        "product_id": "241",//单元id
                        "product_name": "信托产品",//单元名称
                        "group_name": "广发证券",//基金名称
                        "order_id": "112-19299-20171026",//订单 id
                        "created_at": 1508998263,//委托时间
                        "updated_at": 1508998264,//更新时间戳
                        "is_auto": 1,
                        "entrust": {
                            "price": "3.180",//委托价格
                            "amount": "100",//委托数量
                            "model": 1,//委托交易方式
                            "type": "1",//委托方向
                            "state": "0",//操盘手委托声明, 下单/改单/撤单
                            "batch_no": "",//所属批量订单号
                            "cancel_volume": "0",//撤单数量
                            "vendor_status_text": "废单",//状态描述
                            "quote_type_text": "限价",//报价类型
                            "bs_symbol_text": "买入",//买卖标志
                            "exchange_rate": "--"//人民币汇率
                        },
                    "stock": {
                        "code": "000683.SZ",//股票代码
                        "name": "远兴能源"//股票名称
                    },
                    "last_handler": [],
                    "deal": {
                        "price": "0.0000",//成交价格
                        "amount": "0",//成交数量
                        "total": "0.000",//成交金额
                        "date": "",
                        "time": ""
                    },
                    "cancel_status": "",// 提交撤单 / 执行撤单
                    "complete_progress": 0.000,// 成交进度
                    "order_status": 3,// 提交订单 / 审核分配订单 / 委托订单 / 成交反馈
                    "status": 8// 等待执行 / 已委托 / 已退回 / 部分成交 / 全部成交 / 等待撤单 / 已撤单 / 废单 / 已删除
                }
                ],// 子委托
            }
        ]
    }
}
</pre>

===成交汇总列表===
CGI：oms/order/getEntrustAndDealList<br/>
使用说明：指令交易 获取委托成交汇总<br/>
请求方法：GET<br/>
               指令提交/指令执行 - 成交汇总页签，传product_id '''(group_ids和fund_manager_id前端筛选暂时只做了这个)'''
               指令执行-执行-指令成交，要查当前指令时，传ins_id和product_id（指令下的product_id即可）
               指令执行-执行-指令成交，要查公平交易指令时，传stock_id和direction
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| string || 产品id，多个以逗号分割
|-
| ins_id|| int || 指定指令id，可选参数，用于指令执行-执行-指令成交 使用
|-
| stock_id|| string || 指定证券id，可选参数
|-
| direction|| int || 指定方向，1买2卖3开仓买入4开仓卖出5平仓买入6平仓卖出 ，可选参数,公平交易中用到
|-
| collect || int ||汇总维度 0:交易单元+证券代码+委托方向(默认)  1:证券代码+委托方向
|-
| group_ids || string || 基金筛选，多选，以逗号分割
|-
| fund_manager_id || int || 基金经理筛选，单选
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.187:8080/omsv2/oms/order/getEntrustAndDealList?product_id[]=101423

响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "cur_page_no": 1,
        "total_page_count": 1,
        "page": 1,
        "count": 20,
        "max": 1,
        "total": 2,
        "list": [
            {
                "stock_code": "600006.SH",//股票ID
                "stock_name": "东风汽车",//股票名称
                "entrust_type": "1",//委托类型，1买，2卖
                "deal_volume_by_group": "100",//成交股数
                "deal_amount_by_group": "591",//成交金额
                "entrust_amount_by_group": 200,//委托股数
                "product_name": "专户测试02",//产品名称
                "group_name": "专户测试02",//基金名称
                "entrust_type_name": "买入",//买入|卖出，标志
                "deal_avg_price": "5.910"//成交均价
            },
            {
                "stock_code": "601288.SH",
                "stock_name": "农业银行",
                "entrust_type": "1",
                "deal_volume_by_group": "0",
                "deal_amount_by_group": "0",
                "entrust_amount_by_group": 100,
                "product_name": "专户测试02",
                "group_name": "专户测试02",//基金名称
                "entrust_type_name": "买入",
                "deal_avg_price": "--"
            }
        ]
    },
    "timestamp": 1504513601.7883,
    "timeConsumption": 0.20126390457153
}
</pre>

===指令挂单列表===
CGI：oms/order/getCanBeCanceledList<br/>
使用说明：指令交易 - 指令挂单<br/>
请求方法：GET<br/>
               指令执行-执行-所有挂单，要查当前指令时，传ins_id和product_id（指令下的product_id）
               指令执行-执行-所有挂单，要查公平交易指令时，传stock_id和direction
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| array || 产品id数组，可选参数
|-
| ins_id|| int || 指定指令id，可选参数，用于指令执行-撤单-指令挂单 使用
|-
| stock_id|| string || 指定证券id，支持多个，逗号隔开。可选参数
|-
| direction|| int || 指定方向，1买2卖3开仓买入4开仓卖出5平仓买入6平仓卖出 ，可选参数,公平交易中用到
|-
| count|| int || 每页显示条数，请传递一个大整数，例如：count=9999
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/oms/order/getCanBeCanceledList?permission_type=product&type=all&count=9999&product_id[]=5&market=1
响应：
{
    "code": 0,
    "msg": "",
    "data": {
        "cur_page_no": 1,
        "total_page_count": 1,
        "page": 1,
        "count": 9999,
        "max": 1,
        "total": 2,
        "list": [
            {
                "product_id": "5",//产品id
                "product_name": "信托产品",//单元名称
                "group_name": "广发证券",//基金名称
                "entrust_id": "366270",//委托id
                "order_id": "366270",//订单id
                "ins_id":"112",//指令id，-1表示当前委托非指令委托
                "ins_num":"1120521001",//委托批号
                "complete_progress":"0.000",//成交进度
                "entrust_at": 1507617912,//委托时间戳
                "created_at": 1507617912,//创建时间戳
                "updated_at": 1507617912,//更新时间戳
                "is_auto": 0,
                "entrust": {
                    "price": "3.4100",//委托价格
                    "amount": "100",//委托数量
                    "model": 1,////1限价 2市价
                    "type": 1,//委托方向
                    "state": 0,//操盘手委托声明, 下单/改单/撤单
                    "batch_no": "",//所属批量订单号
                    "cancel_volume": "0",//撤单数量
                    "vendor_status_text": "已报",//状态描述
                    "quote_type_text": "--",//报价类型
                    "bs_symbol_text": "证券买入",//买卖标志
                    "exchange_rate": "--", //人民币汇率，例如1美元除以1人民币=6.xxx
                    "is_algo_supplement": 1     //是否算法补单，0否1是
                },
                "stock": {
                    "code": "601288.SH",
                    "name": "农业银行"
                },
                "last_handler": {
                    "user_id": null
                },
                "deal": {
                    "price": "0",//成交价格
                    "amount": "0",//成交金额
                    "total": "0",//成交数量
                    "date": "",
                    "time": ""
                },
                "ins": {
                    "ins_volume": 300,//指令数量
                    "ins_price": "6.58"//指令价格
                },
                "cancel_status": "",//提交撤单 / 执行撤单
                "order_status": 3,//提交订单 / 审核分配订单 / 委托订单 / 成交反馈
                "status": 2 //等待执行 / 已委托 / 已退回 / 部分成交 / 全部成交 / 等待撤单 / 已撤单 / 废单 / 已删除
            }
        ]
    },
    "timestamp": 1507623803.0265
}
</pre>

===收益互换邮件结果回调内网api接口===
CGI：/api/swapInsSendEmail/email_result <br/>
使用说明：指令交易 - 收益互换邮件<br/>
请求方法：post<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || array || 产品id数组
|-
| name || string || 券商名称
|-
| ins_id || int || 指令id
|-
| code || int || 错误码 0为成功 其他为失败
|-
| msg || string || 错误信息
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|}

示例：<br/>
<pre>
请求：
http://172.16.0.22:8011/api/swapInsSendEmail/email_result?product_ids[]=11116&name=中金&ins_id=2000&code=0&msg=ok
响应：

</pre>

===运维与测试注意事项===
<pre>
1.清理所有机构的指令缓存：http://192.168.0.33/omsv2/sync/instruction/manage_admin_console?action=clearAllOrgInsList  (如果指令列表的数据结构有变化，则需要在上线发布完成时，调用此接口)
2.查询指定id的指令信息：http://192.168.0.33/omsv2/sync/instruction/manage_admin_console?action=getInsInfo&ins_id=112 (快速获取指令提交的完整信息)
</pre>

==【高毅版】指令管理==
===GY交易单元资产信息列表===
CGI：/oms/api/get_multi_settlement_info<br/>
使用说明：指令交易 指令提交页面-交易单元资产信息获取 <br/>
请求方法：GET <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || array || 产品id的数组
|-
| from || string ||可选，默认pc  h5,pc
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/oms/api/get_multi_settlement_info?product_id[]=1600347

响应：
{
"code": 0,//撤销失败时返回失败的状态码
"msg": "ok",//撤销失败时返回失败的错误提示
"data":{ 
     "1600347": {
               {
                 "code":0,
                 "msg":"ok",
                 "data":{
                    "fund_currency": 3,//基金币种 0未设置1人民币2港币3美元
                    "total_assets": "100000009.00000",//总资产
                    "cash_amount": 99998886,//资产余额
                    "balance_amount": 99998886,//资产余额
                    "enable_cash": "99997806.00000",//交易单元可用余额
                    "enable_cash_hksh": "99997806.00000",//沪港通可用余额
                    "enable_cash_hksz": "99997806.00000",//深港通可用余额
                    "net_assets": 100000009,//净资产
                    "net_value": 12500.001125,//净值
                    "position": 0.00001,//仓位
                    'stock_position':0.00060120447//股票仓位
                    "stock_etf_position": 0,//股票+etf仓位

                    //以下字段为期货交易单元时使用到
                    "future_assure_capital": 0,//可用保证金
                    "risk_position": 0,//总敞口
                    "net_risk_position": 0,//净敞口
                    "stock_long": 0,//股票多头市值
                    "stock_short": 0,//期货空头市值
                    "stock_long_position": 0,//股票多头仓位
                    "zero_position": 0//期货空头仓位
              }
         }
     }
}
</pre>

===GY指令提交===
CGI：ipb-pub/sync/instruction/manage_add<br/>
使用说明：提交指令接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| is_future|| int ||是否期货指令
|-
| stock_id|| string||股票代码，例如000683.sz，若为系统无法识别的代码，此值传0
|-
| stock_name|| string||股票名称  若代码为无法识别，则把代码传入该值
|-
| direction|| string ||报价方向，股票类(1买入，2卖出) 期货类(3买入开仓、4卖出开仓、5买入平仓、6卖出平仓)
|-
| add_ins_method|| int ||添加指令的方法，1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
| quote_type|| string ||指令级报价类型：1限价，10不限价
|-
| quote_price|| double ||指令级报价价格，为根据百分比计算得到的极值(买入限最高，卖出限最低)  不限价模式时填0
|-
| quote_price_percent|| double ||基于基础价格计算价格区间的百分比
|-
| product_id|| array ||产品id数组，用于鉴定权限，请跟sub_list参数的第1维的产品id列表保持一致
|-
|sub_list|| array||具体子项的下单信息，具体包含值见下面各行
|-
|sub_list[产品id]['add_ins_method']|| int||子项的下单方式 如果不传，则默认按指令级的下单方式  1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|sub_list[产品id]['total_asset_ratio']|| double ||对应子项下单方式的具体百分比
|-
|sub_list[产品id]['target_position']|| double ||对应子项下单方式的具体百分比
|-
|sub_list[产品id]['position_ratio']|| double ||对应子项下单方式的具体百分比
|-
|sub_list[产品id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[产品id]['quote_price']|| double ||子项的报价价格，如果不传则默认按指令级报价价格。
|-
|sub_list[产品id]['ins_volume']|| double ||子项的具体下单股数
|-
|ignore_risk|| int ||1忽略风控，0不忽略风控，3.12迭代的请传入1
|-
| ignore_tips|| int ||1忽略提示性风控，0不忽略提示性风控
|-
|ins_memo|| string ||可选，指令备忘
|-
|from|| string ||可选参数，选项：pc，h5，其它则默认为pc，此参数用以统计指令来源
|-
|clearance|| int ||是否为全部清仓 提交，可选参数，1为是，默认0不是
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/manage_add
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&stock_id=000683.sz&quote_type=1&quote_price=6.83
&quote_price_percent=0&product_id[]=10032&sub_list[10032][ins_volume]=200&
ignore_tips=0&priority=4&ins_memo=&ignore_risk=1
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===GY组合指令-指令提交===
CGI：ipb-pub/sync/instruction/combi_add<br/>
使用说明：组合指令提交接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| string||交易单元id
|-
| direction|| string ||报价方向，1买入，2卖出
|-
|quote_type|| int||1限价 10不限价
|-
| add_ins_method|| int ||添加指令的方法，1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
|sub_list|| array||子列表的下单信息,第一维以证券id为key（如000683.SZ）,第二维可能包含以下字段
|-
|sub_list[证券id]['add_ins_method']|| int||子项的下单方式 如果不传，则默认按指令级的下单方式  1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|sub_list[证券id]['add_ins_value']|| double ||对应子项下单方式的具体具体数量或百分比
|-
|sub_list[证券id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[证券id]['quote_price']|| double ||子项的报价价格，如果不传则默认按指令级报价价格。
|-
|sub_list[证券id]['ins_volume']|| double ||子项的具体下单股数
|-
|ins_memo|| string ||可选，指令备忘
|-
|from|| string || h5
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回新增的指令id 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/combi_add
POST参数：
add_ins_method=3&front_add_ins_value=200&direction=1&sub_list[000683.SZ][quote_price]=3.88
&product_id=10032&sub_list[000683.SZ][ins_volume]=200&ins_memo=
响应：
{
"code": 0,
"msg": "ok",
"data": [3028]
}
 </pre>

===GY组合指令-指令修改===
CGI：ipb-pub/sync/instruction/combi_modify<br/>
使用说明：组合指令修改接口<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_id|| int||要修改的指令id
|-
|quote_type|| int||1限价 10不限价
|-
| add_ins_method|| int ||指令数量方法，1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|front_add_ins_value|| float ||对应添加指令方法的具体数量或百分比
|-
|sub_list|| array||子列表的下单信息,第一维以证券id为key（如000683.SZ）,第二维可能包含以下字段。这里证券id列表需要与指令提交保持一致，即不能修改证券
|-
|sub_list[证券id]['add_ins_method']|| int||子项的下单方式 如果不传，则默认按指令级的下单方式  1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例 
|-
|sub_list[证券id]['add_ins_value']|| double ||对应子项下单方式的具体具体数量或百分比
|-
|sub_list[证券id]['quote_type']|| int||子项的报价类型，如果不传则默认按指令级的报价类型。  1限价，10不限价
|-
|sub_list[证券id]['quote_price']|| double ||子项的报价价格，如果不传则默认按指令级报价价格。
|-
|sub_list[证券id]['ins_volume']|| double ||子项的具体下单股数
|-
|ins_memo|| string ||可选，指令备忘
|-
|from|| string || h5
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || array || 返回修改指令的结果，包括成功和失败的

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/ipb-pub/sync/instruction/combi_modify
POST参数：
add_ins_method=3&front_add_ins_value=200&sub_list[000683.SZ][quote_price]=3.88
&sub_list[000683.SZ][ins_volume]=200&ins_memo=
响应：
{
    "code":0,
    "msg":"修改成功",
    "data":{
        ////修改成功的子项
        "pass":{
            "000568.SZ":{
                "code":0,
                "msg":"ok",
                "data":[

                ]
            }
        },
        //不能修改的子项
        "reject":{
            "000683.SZ":{
                "code":505202,
                "msg":"修改指令数量小于已报委托数量",
                "data":[

                ]
            }
        }
    }
}
 </pre>

===GY指令列表===
CGI：/sync/instruction/search_list<br/>
使用说明：指令执行页面的指令列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| count || int || 每页显示条数，请传递一个大整数，例如：count=9999
|-
| from || string || 'h5' or  'pc'
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/search_list?count=9999

响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"cur_page_no": 1,
		"total_page_count": 1,
		"page": 1,
		"count": 9999,
		"max": 1,
		"total": 1,
		"list": [{
			"instruction": {
				"id": 1180,
                                "is_doubt_exist": 1, //是否存在置疑委托单 1是0否
				"add_ins_method": 3, //添加指令的方法，1按目标仓位 2按总资产比例 3按指令数量 4按持仓比例
				"add_ins_value": "2000.00000", //与add_ins_method绑定的值
                                "clearance":0,   //是否h5全部清仓类指令
				"creator_id": 20000,
				"creator_name": "高毅超管呀",
				"fund_manager_id": 20042,
				"fund_manager_name": "陈陈陈",
				"quote_price_percent": "0.00", //价格浮动百分比
				"target_position": "--", //指令的实际目标仓位，后台计算，用于详情展示。当指令为单一方式按目标仓位时，且每个子项值一样时，有具体数值
				"total_asset_ratio": "--", //指令的实际净资产比例，后台计算，用于详情展示。当指令为单一方式按总资产比例时，且每个子项值一样时，有具体数值
                                "position_ratio": "--", ////指令的实际持仓比例比例，后台计算，用于详情展示。当指令为单一方式按持仓比例时，且每个子项值一样时，有具体数值
				"deal_direction": 1,
				"deal_direction_name": "买入",
				"status": 2, //(2提交成功，3正在执行，4执行完毕，-1终止执行)
				"status_name": "提交成功",
				"created_at": "2018-05-02 13:51:25",
				"quote_type": 1, //1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
				"price": "6.83000",
                                "weight": "0.34112",
				"ins_memo": "全部清仓",
				"algorithm_status": null, //指令 算法执行状态 状态,1运行中，2暂停中，其它为非算法指令状态
				"is_exception": -1, //指令 算法执行 是否出现异常，-1没有出现，1出现
				"predict_complete_time": "--", //预期完成时间，仅当启动算法执行时此字段才有效，可能包含错误信息
				"refresh_predict_complete_time": "--", //对算法执行而言，跟前端同步刷新的预计完成时间
				"normal_status": 1, //默认1正常，-1未指定，2待撤，3已撤
				"normal_status_name": "正常",
				"ins_volume": 2000,
				"deal_avg_price": "0.000", //成交均价,
				"valid_entrust_amount": "--", //有效委托数量
				"deal_amount": "--", //成交数量
				"pending_order_number": 0, //汇总挂单总数
				"progress": "0.0000000000", //汇总执行进度
				"complete_progress": "0.0000000000", //汇总完成进度
				"is_read": 0, //是否已读 0未读 1已读
				"is_execute": 1, //指令是否可以执行 0不可以执行 1可以执行
				"is_combi": 0, //是否组合指令
				"is_algo": 0, //是否算法指令
				"parent_id": 0,
				"algo_ins_status": 1, //算法指令 状态  1执行中2已暂停3已完成
			},
			"stock": [{
				"stock_id": "000683.SZ",
				"stock_name": "远兴能源",
				"is_future": 0, //是否为期货，1是，-1或其它值表示不是
				"is_new_ipo": 0, //0不是新股，1是新股
				"market": 1,//0未知 1沪深交易 2港股交易 4国债逆回购 5新股申购 6期货 21美股
                                "quote_type": 1, //1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
			}],
			"product": [{
				"id": 1600518,
				"name": "测试产品"
			}],
			"group": [{        //存储指令中交易单元所属的基金层映射关系
				"id": 54,
				"name": "基金1",
                                "product_id_list": ["10069", "10068"]
			},
                        {
                                "id": 56,
				"name": "基金2",
                                "product_id_list": ["10067"]
                        }],
			"sub_list": [{
				"product_id": 1600518,
				"group_id": 10067,
				"product_name": "测试产品",
				"stock_id": "000683.SZ",
				"stock_name": "远兴能源",
				"deal_amount": 0,
				"deal_avg_price": 0,
				"deal_direction": 1,
				"deal_direction_name": "买入",
				"weight": "0.34112", // 子项权重
                                "quote_type": 1, //1限价 2市价 3买1/卖1, 4 买2/卖2, 5 买3/卖3, 6 买4/卖4, 7 买5/卖5   8竞价限价  9增强限价 10不限价
                                "price": "10.20", //子项下单价格
				"ins_volume": 2000,   
                                "add_ins_method": 3,   //指令子项的指令下单方式
                                "add_ins_value": 1000,  //指令子项的下单方式对应的比例值或具体数值
				"target_position": "--", //指令子项的实际目标仓位，后台计算得出
				"position_ratio": "--", //指令子项的实际持仓比例，后台计算得出
				"total_asset_ratio": "--", //指令子项的实际资产比例，后台计算得出
				"pending_order_number": 0,
				"valid_entrust_amount": 0,
				"progress": "0.0000000000",
				"current_volume": "600.00",
				"diff_number": 2000, //缺口数量
				"diff_number_no_entrust": 2000,
				"complete_progress": "0.0000000000",
				"normal_status": 1, //默认1正常，-1未指定，2待撤，3已撤
				"normal_status_name": "正常",
				"is_support_asset": 1, //是否为支持的交易品种，1支持，其它为不支持
				"show_highLight": 0, //是否展示标注 0不展示 1展示
				"sync_ins_id": null, //pb同步的指令id
				"is_highLight": 0, //是否勾选标注0未勾选 1勾选
				"is_sync_pb": 0, //该交易单元是否支持同步指令模式 0不支持 1支持
				"enable_edit": 1, //该交易单元是否支持修改 0不支持 1支持
				"total_amount": "13660.00000",
                                "algo_status": 1, //子项算法委托的状态 0未执行1执行中2暂停中3执行完成
                                "doubt_num": 1, //该子项的所有置疑委托总笔数
                                "total_doubt_volume": 100, //该子项的所有置疑委托总量
                                "manual_matched_num": 1, //已手工匹配的委托笔数
                                "manual_matched_volume": 100, //已手工匹配的委托数量
                                "release_doubt_volume": 100, //已释放的置疑委托量
                                "last_error": "错误信息",       //指令交易单元最后一次委托的错误信息
                                "current_msg": "错误信息",  //指令交易单元最后一次异常信息 （不一定是对应最后一次委托）
                                "predict_info": {     //有在算法委托执行中时，有值
                                     "predict_complete_time": 0,    //预期完成时间戳
                                     "can_be_complete": 1            //是否能完成
                                },
                                "risk_data": {
                                     "msg": [
                                     "已触发提示性风控(公司):test买入,预警提示"
                                      ],
                                     "limit_action": 0
                                 }
			     }],
			"ins_log": {
				"pre_val": {
					"ins_memo": "",
					"stock_id": "000100.SZ",
					"productList": [{
							"ins_volume": 500,
							"price": "2.87000",
							"product_id": "507"
						},
						{
							"ins_volume": 200,
							"price": "2.87000",
							"product_id": "516"
						}
					]
					"stockList ": [{
							"stock_id": "000683.SZ",
							"ins_volume": 200,
							"price": "2.81000"
						},
						{
							"stock_id": "000100.SZ",
							"ins_volume": 1000,
							"price": "2.88000"
						}
					]
				},

				"update_val": {
					"ins_memo": "",
					"stock_id": "000100.SZ",
					"productList": [{
							"ins_volume": "900",
							"price": "2.86",
							"product_id": 507
						},
						{
							"ins_volume": "200",
							"price": "2.86",
							"product_id": 516
						}
					]
				}
			}
		}]
		"timestamp": 1525243638.1516,
		"timeConsumption": 1.4945828914642,
		"requestStartTime": null,
		"input": {
			"count": "9999"
		}
	}

</pre>

===GY当前持仓列表===
CGI：omsv2/oms/api/multi_position_realtime<br/>
使用说明：指令交易-当前持仓列表 - 高毅版使用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || array ||交易单元id
|-
| from || string ||可选，默认pc  h5,pc
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/oms/api/multi_position_realtime?product_id[]=44
响应：
{
    "code": 0,
    "msg": "0",
    "data": {
        "44": {
            "code": 0,
            "msg": "",
            "data": [
                {
                    "product_id": "44",//交易单元ID
                    "product_name": "单元1",//交易单元名称
                    "stock_id": "600218.SH",//证券ID
                    "stock_name": "全柴动力",//证券名称
                    "market_value": "16,073,969.60000",//市值
                    "cost_price": "262.50102",//成本价
                    "latest_price": "284.800",//最新价
                    "earning": "1,031,629.39362",//浮动盈亏
                    "earning_ratio": "6.8582",//浮盈率
                    "sec_type": "1", //证券类型 1股票 2期货 3债券 4回购 5期权 6基金 7国债 8其他 9港股 10货币基金
                    "origin_market": "1",//持仓市场 0其他 1沪A 2深A 3沪港通 4深港通 5中金 6大商 7郑商 8上期 9银行间
                    "weight": "0.0000%", //所占仓位
                    "total_amount": "65,000.00",//持仓数量
                    "enable_sell_volume": "65,000.00"//可卖份数

                    //以下为期货持仓时用到
                    "margin_occupation": 0, //保证金占用
                    "hold_direction": "多头", //持仓方向
                    "hedge_flag": "套利". //投保标志
                }
            ]
        }
            ]
        }
    },
    "timestamp": 1507971307.2848
}
</pre>

===GY委托明细列表===
CGI：/oms/order/get_entrust_list<br/>
使用说明：指令交易 指令执行-委托明细列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| array || 产品id数组
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.33/omsv2/oms/order/get_entrust_list?product_id[]=101232
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "list": [
            {
                "product_id": "241",//单元id
                "product_name": "241",//交易单元名称
                "created_at": 1508998263,//委托时间
                "updated_at": 1508998264,//更新时间戳
                "entrust": {
                    "price": "3.180",//委托价格
                    "amount": "100",//委托数量
                    "cancel_volume": "0",//撤单数量
                    "vendor_status_text": "废单",//状态描述
                    "quote_type_text": "限价",//报价类型
                    "bs_symbol_text": "买入",//买卖标志
                    "exchange_rate": "--"//人民币汇率
                },
                "stock": {
                    "code": "000683.SZ",//股票代码
                    "name": "远兴能源",//股票名称
                    "origin_market": "1"//持仓市场 0其他 1沪A 2深A 3沪港通 4深港通 5中金 6大商 7郑商 8上期 9银行间
                },
                "deal": {
                    "price": "0.0000",//成交价格
                    "amount": "0"//成交数量
                },
                "cancel_status": "",// 提交撤单 / 执行撤单
                "order_status": 3,// 提交订单 / 审核分配订单 / 委托订单 / 成交反馈
                "status": 8// 等待执行 / 已委托 / 已退回 / 部分成交 / 全部成交 / 等待撤单 / 已撤单 / 废单 / 已删除
            }
        ]
    }
}
</pre>

===GY成交汇总列表===
CGI：oms/order/getEntrustAndDealList<br/>
使用说明：指令交易 指令执行-成交汇总<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| array || 产品id数组
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.187:8080/omsv2/oms/order/getEntrustAndDealList?permission_type=product&type=all&product_id[]=101423

响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "cur_page_no": 1,
        "total_page_count": 1,
        "page": 1,
        "count": 20,
        "max": 1,
        "total": 2,
        "list": [
            {
                "product_id": "101423",//产品ID
                "origin_market": "1",//持仓市场 0其他 1沪A 2深A 3沪港通 4深港通 5中金 6大商 7郑商 8上期 9银行间
                "stock_code": "600006.SH",//股票ID
                "stock_name": "东风汽车",//股票名称
                "entrust_type": "1",//委托类型，1买，2卖
                "deal_volume_by_group": "100",//成交股数
                "deal_amount_by_group": "591",//成交金额
                "entrust_amount_by_group": 200,//委托股数
                "product_name": "专户测试02",//产品名称
                "entrust_type_name": "买入",//买入|卖出，标志
                "deal_avg_price": "5.910",//成交均价
                "fund_manager_id": -1 //基金经理id
                "fund_manager_name": "--"//基金经理名称
            },
            {
                "product_id": "101423",
                "stock_code": "601288.SH",
                "stock_name": "农业银行",
                "entrust_type": "1",
                "deal_volume_by_group": "0",
                "deal_amount_by_group": "0",
                "entrust_amount_by_group": 100,
                "product_name": "专户测试02",
                "entrust_type_name": "买入",
                "deal_avg_price": "--",
                "fund_manager_id": -1 //基金经理id
                "fund_manager_name": "--"//基金经理名称
            }
        ]
    },
    "timestamp": 1504513601.7883,
    "timeConsumption": 0.20126390457153
}
</pre>

===GY设置保证金比例===
CGI：ipb-pub/sync/helper/set_margin_rate<br/>
使用说明：设置保证金比例 <br/>
请求方法：POST <br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| if || int || if比例值
|-
| ih || int || ih比例值
|-
| ic || int || ic比例值
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/helper/set_margin_rate
POST参数：
if=30&ih=23&ic=11
响应：
{
	"code": 0,
	"msg": "修改成功",
	"data": []
}
</pre>
===GY获取保证金比例===
CGI：ipb-pub/sync/helper/get_margin_rate<br/>
使用说明：获取保证金比例设置值 <br/>
请求方法：GET <br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/ipb-pub/sync/helper/get_margin_rate

响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
            "ih": 1,
            "if": 1,
            "ic": 1
        }
}
</pre>

===GY提交指令时获取股票持仓信息===
CGI：omsv2/oms/api/get_stock_position_info<br/>
使用说明：指令交易- 选定交易单元及股票后，获取对应的持仓信息，用于右侧持仓数量及仓位的展示<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string ||交易单元id,多个则以下划线分隔。如 10776_10778
|-
| stock_id || string || 证券id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/omsv2/oms/api/get_stock_position_info?product_ids=10785_10776&stock_id=601288.SH
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "10776":{
            "hold_volume":"0",   //持仓数量。有千分位！
            "enable_sell":"0",      //可卖数量。有千分位！
            "market_value":"0",     //市值，用于计算仓位
            "group_id" : 58         //基金id
        },
        "10785":{
            "hold_volume":"100",
            "enable_sell":"0",
            "market_value":"383.000",
            "group_id" : 58  
        }
    }
}

</pre>

===GY指令执行进度列表===
CGI：ipb-pub/sync/query/ins_progress_list<br/>
使用说明：指令进度- 当前指令执行进度列表 - 高毅使用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string ||交易单元id,多个则以下划线分隔。如 10776,10778
|-
| stock_id || string ||要筛选的证券id
|-
| order_by || string ||排序字段，stock_id, stock_name,
|-
|order || string || 排序方向 asc , desc
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/ipb-pub/sync/query/ins_progress_list?product_ids=10785,10776&stock_id=000979.SZ
响应：

{
	"code": 0,
	"msg": "ok",
	"data": {
		"list": [{
			"ins_id": 3386,
			"product_id": 1496,
			"group_id": 1042,
			"product_name": "测试产品091928",
			"stock_name": "平安银行",
			"stock_id": "000001.SZ",
			"deal_amount": "0",
			"deal_avg_price": "0",
			"deal_direction": 1,
			"deal_direction_name": "买入",
			"price": "12.07",
			"quote_type": 1,
			"ins_volume": 16,
			"net_asset_ratio": "--",
			"valid_entrust_amount": "0",
			"normal_status": 1,
			"normal_status_name": "正常",
			"is_support_asset": 0,
			"sync_ins_id": null,
			"is_highLight": 0,
			"trading_unit": 100,
		        //增加字段
			"pb_deal_status": 1, // 下行成交状态 ，1 正常 2 异常
			"pb_deal_amount": "--", // 下行成交总数量
			"total_deal_amount": 0, //录入成交总数量
                        "pb_deal_excet_time": '11:50:00', //下行数据异常时间
			"sub_list": [{
				"ins_id": 3386, 
				"product_id": 1496, 
				"group_id": 1042,
				"product_name": "测试产品091928", 
				"stock_id": "000001.SZ",
				"stock_name": "平安银行",
				"deal_amount": "0", //成交数量
				"deal_avg_price": "0", //成交均价
				"deal_direction": 1, //买卖方向
				"deal_direction_name": "买入",
				"price": "12.07",
				"quote_type": 1, // 限价，不限价
				"ins_volume": "8,000.00", //指令数量
				"net_asset_ratio": "--", //占净资产比例
				"valid_entrust_amount": "0", //有效委托
				"normal_status": 1, //状态
				"normal_status_name": "正常",
				"is_support_asset": 0, 
				"sync_ins_id": null,
				"is_highLight": 0,
				"trading_unit": 100
			}]
		}]
	},
	"timestamp": 1551077622.0614,
	"timeConsumption": 0.69176197052002,
	"requestStartTime": null,
	"input": []
}

</pre>

===GY指令执行进度列表导出===
CGI：ipb-pub/sync/query/export_progress_list<br/>
使用说明：指令进度- 指令执行进度列表导出 - 高毅使用<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string ||交易单元id,多个则以下划线分隔。如 10776,10778
|-
| stock_id || string ||要筛选的证券id
|-
| order_by || string ||排序字段，stock_id, stock_name,
|-
| fields || string || 导出字段，stock_id, stock_name,
|-
|order || string || 排序方向 asc , desc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/ipb-pub/sync/query/export_progress_list?product_ids=10785,10776&stock_id=000979.SZ
响应：
{
    "code" : 0,
    "msg"  : 'ok',
    'data' : {
      
    }
}

</pre>

===GY提交指令时获取套保额度信息===
CGI：omsv2/oms/api/get_futures_hedging_info<br/>
使用说明：指令交易- 选定交易单元及股票后，输入指定的合约代码，用于右侧空头套保额度及当前空头持仓的展示<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || array || 产品id的数组
|-
| stock_id || string || 合约id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:32080/omsv2/oms/api/get_futures_hedging_info?product_id[]=10087&product_id[]=645&assets_class=if&stock_id=IF1902
响应：
{
    "code": 0,
    "msg": "0",
    "data": {
        "645": 
            {
                "short_hedging_quota": "23.333333333333333",   //空头套保额度
                "short_hold_volume": "1000.00"  //当前空头持仓
            },
        "10087": 
            {
                "short_hedging_quota": "173.800000000000000",  //空头套保额度
                "short_hold_volume": "7000.00"  //当前空头持仓
            }
    }
}
</pre>


===GY资讯数据指数成分股===
CGI：omsv2/oms/information/constituent_stocks<br/>
使用说明：获取最新指定成份股<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| stock_id|| string || 指数代码    上证50：510050、 中证500：512510、沪深300：510300* 
|-
| constituent_stocks || string || 成分股代码   存在就模糊搜索使用
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:32080/omsv2/oms/information/constituent_stocks?stock_id=512510&constituent_stocks=
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "date": "2019-02-26",    // 更新日期
        "total": 500,            //总条数
        "data": [
            {
                "stock_code": "000006",             //股票代码
                "stock_name": "深振业Ａ",           //"股票名称"
                "stock_number": "600",              //"股票数量"
                "cash_substitution_mark": "深市退补",               // "现金替代标志"
                "cash_substitution_premium_ratio": "10.0%",    //"现金替代溢价比例"
                "fixed_replacement_amount": "3582.00"         //"固定替代金额"
            },
            {
                "stock_code": "000008",
                "stock_name": "神州高铁",
                "stock_number": "1300",
                "cash_substitution_mark": "深市退补",
                "cash_substitution_premium_ratio": "10.0%",
                "fixed_replacement_amount": "5746.00"
            }
        ]
     },
    "timestamp": 1551149511.2029,
    "timeConsumption": 0.32117509841919,
    "requestStartTime": null,
    "input": {
        "stock_id": "512510"
    }
   
</pre>

===获取下行成交数据异常信息===
CGI：/sync/instruction/get_deal_except<br/>
使用说明：获取下行成交数据异常信息。 用于顶部悬浮框及左侧栏等提示<br/>
请求方法：GET<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/get_deal_except
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"is_exist": 1,
		"tip_list": ["深港通测试 深港通测试-默认资产单元", "沪港通测试 沪港通测试-默认资产单元", "中信建投恒生", "嘉实O32"]
	},
	"timestamp": 1551159416.7101,
	"timeConsumption": 0.132817029953,
	"requestStartTime": null
}
</pre>

===下行成交数据异常信息 关闭接口===
CGI：/sync/instruction/close_deal_except_notice<br/>
使用说明： 用于关闭顶部悬浮框提示的下行成交数据异常信息<br/>
请求方法：GET<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/instruction/close_deal_except_notice
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
	},
	"timestamp": 1551159416.7101,
	"timeConsumption": 0.132817029953,
	"requestStartTime": null
}
</pre>
===高毅资讯数据导出===
使用说明：生成excel文件接口<br/>
请求方法：get<br/>
CGI：/omsv2/oms/report/download_report/constituent_stocks<br/>

{| class="wikitable"
|-
! 参数 !! 类型 !! 取值 
|-
| stock_id || string || 指数代码 上证50：510050、 中证500：512510、沪深300：510300*
|-
| constituent_stocks || string || 股票代码
|}
示例：<br/>
<pre>
请求：
http://192.168.0.173/omsv2/oms/report/download_report/constituent_stocks?stock_id=512510&constituent_stocks=
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1551250923.5617,
    "timeConsumption": 1.6441969871521,
    "requestStartTime": null
}
</pre>

===高毅当前持仓===
使用说明：返回当前持仓数据<br/>
请求方法：get<br/>
CGI：/omsv2/oms/report/current_position_report<br/>

{| class="wikitable"
|-
! 参数 !! 类型 !! 取值 
|-
| type || string || A: A股 HK：港股 CCS：中概股 FI：固定收益 SPIF:股指期货 DERIVATIVES：衍生品类资产 OTHER:其他 CASH:现金 TOTAL:汇总; 传数组，逗号分隔如 A,HK,CCS
|-
| group_id || int || 基金id
|-
| manager_id || int || 基金经理id
|-
| date || string || 日期：2019-10-22
|}
示例：<br/>
<pre>
请求：
http://192.168.0.235/omsv2/oms/report/current_position_report
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"A": {
			"list": [{
				"id": 1,
				"stock_id": "000002.SZ",
				"stock_name": "万 科Ａ",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "60.00",
				"cost_price": "-2.30000",
				"prev_close_price": "27.39",
				"hold_direction": "多头",
				"latest_price": "27.02",
				"floating_pl": 1759.2,
				"exchange_rate": 1,
				"market_value": 1621.2,
				"ratio": "0.13%",
				"change_ratio": -0.001755
			}],
			"total": {
				"market_value": 90524.8,
				"ratio": 7.32
			}
		},
		"HK": {
			"list": [{
				"id": 1,
				"stock_id": "002415.SZ",
				"stock_name": "海康威视",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "-100.00",
				"cost_price": "29.67000",
				"prev_close_price": "29.87",
				"hold_direction": "--",
				"latest_price": "29.03",
				"floating_pl": 64,
				"exchange_rate": 1.1551345731778,
				"market_value": -3353.36,
				"ratio": "-0.27%",
				"change_ratio": 0.007587
			}],
			"total": {
				"market_value": -3353.36,
				"ratio": -0.27
			}
		},
		"CCS": {
			"list": [{
				"id": 1,
				"stock_id": "080002.SZ",
				"stock_name": "万科配股",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "100.00",
				"cost_price": "0.00000",
				"prev_close_price": 0,
				"hold_direction": "--",
				"latest_price": 0,
				"floating_pl": 0,
				"exchange_rate": "6.7821",
				"market_value": 0,
				"ratio": "0%",
				"change_ratio": 0
			}],
			"total": {
				"market_value": 0,
				"ratio": 0
			},
			"stock_subtotal": {
				"floating_pl": -3008727.5,
				"market_value": 87171.44,
				"change_ratio": -0.0182965,
				"ratio": 7.05
			}
		},
		"FI": {
			"list": [{
				"id": 1,
				"stock_id": "100303.SZ",
				"stock_name": "国债0303",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "-300970.00",
				"cost_price": "0.00000",
				"prev_close_price": "100.469",
				"hold_direction": "--",
				"latest_price": "100.488",
				"floating_pl": -30243873.36,
				"exchange_rate": 1,
				"market_value": -30243873.36,
				"ratio": "-2449.79%",
				"change_ratio": -0.489958
			}],
			"total": {
				"market_value": -30284073.36,
				"ratio": -2453.05
			}
		},
		"SPIF": {
			"list": [{
				"id": 1,
				"stock_id": "IF3001.SH",
				"stock_name": "奥康国际",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "500.00",
				"cost_price": "15.33100",
				"prev_close_price": 0,
				"hold_direction": "多头",
				"latest_price": 0,
				"floating_pl": -7665.5,
				"exchange_rate": 300,
				"margin_occupation": 0,
				"contract_value": 0,
				"ratio": "0%",
				"change_ratio": 0
			}],
			"total": {
				"margin_occupation": 0,
				"ratio": 0
			},
			"net_long": 7.05
		},
		"DERIVATIVES": {
			"list": [{
				"id": 1,
				"stock_id": "002153.SZ",
				"stock_name": "石基信息",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "-200.00",
				"cost_price": "29.19000",
				"prev_close_price": "27.92",
				"hold_direction": "--",
				"latest_price": "28.1",
				"floating_pl": 218,
				"exchange_rate": 1,
				"market_value": -5620,
				"ratio": "-0.46%",
				"change_ratio": -0.002944
			}],
			"total": {
				"market_value": -5620,
				"ratio": -0.46
			}
		},
		"OTHER": {
			"list": [{
				"id": 1,
				"stock_id": "080002.SZ",
				"stock_name": "万科配股",
				"product_name": "111",
				"group_name": "中信证券",
				"hold_volume": "100.00",
				"cost_price": "0.00000",
				"prev_close_price": 0,
				"hold_direction": "--",
				"latest_price": "0.00000",
				"floating_pl": 0,
				"exchange_rate": 1,
				"market_value": "0.00000",
				"ratio": "0%",
				"change_ratio": 0
			}],
			"total": {
				"market_value": 0,
				"ratio": 0
			}
		},
		"CASH": {
			"amount": 6000.98,
			"ratio": "0.49%"
		},
		"TOTAL": {
			"volume": "0.00000000",
			"net_estimation": 0,
			"net_growth": -1,
			"hkd_cny": 0.87,
			"net_value": -30196520.94
		}
	},
	"timestamp": 1557393652.1294,
	"timeConsumption": 1.134104013443,
	"requestStartTime": null,
	"input": []
}
注：其他type字段大同小异，格式相仿
</pre>

===GY 瀑布流当前持仓列表===
CGI：omsv2/oms/api/get_waterfall_multi_position_realtime<br/>
使用说明：指令交易-当前持仓列表 - 高毅版使用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || array ||交易单元id
|-
| is_type || int ||1股票  2期货
|-
| stock_id || string ||股票id
|-
| order_code || int || 1证劵代码，2证劵名称，3交易市场，4持仓交易单元，5成本均价，6最新价，7持仓数量，8可卖数量，9市值，10浮动盈亏，11浮盈率，12占仓位 ,13合约名称，14合约代码，15持仓方向，16投保标志，17持仓市值，18保证金占用
|-
| order || string ||顺序 desc 或 asc
|-
| product_id || array ||交易单元id
|-
| page || int || 页数 (注：为空，则显示全部数据，不为空，第一页0-100条，第二页0-200条 以此类推)
|-
| from || string ||可选，默认pc  h5,pc
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.235/omsv2/oms/api/get_waterfall_multi_position_realtime?product_id[]=10101&page=1
响应：
{
    "code": 0,
    "msg": "0",
    "data": {
        "10101": {
            "code": 0,
            "msg": "",
            "data": [
                {
                    "product_id": "10101",//交易单元ID
                    "product_name": "单元1",//交易单元名称
                    "stock_id": "600218.SH",//证券ID
                    "stock_name": "全柴动力",//证券名称
                    "market_value": "16,073,969.60000",//市值
                    "cost_price": "262.50102",//成本价
                    "latest_price": "284.800",//最新价
                    "earning": "1,031,629.39362",//浮动盈亏
                    "earning_ratio": "6.8582",//浮盈率
                    "sec_type": "1", //证券类型 1股票 2期货 3债券 4回购 5期权 6基金 7国债 8其他 9港股 10货币基金
                    "origin_market": "1",//持仓市场 0其他 1沪A 2深A 3沪港通 4深港通 5中金 6大商 7郑商 8上期 9银行间
                    "weight": "0.0000%", //所占仓位
                    "total_amount": "65,000.00",//持仓数量
                    "enable_sell_volume": "65,000.00"//可卖份数

                    //以下为期货持仓时用到
                    "margin_occupation": 0, //保证金占用
                    "hold_direction": "多头", //持仓方向
                    "hedge_flag": "套利". //投保标志
                }
            ]
        }
            ]
        }
    },
    "timestamp": 1507971307.2848
}
</pre>

===GY指令汇总列表===
CGI：omsv2/sync/instruction/summary_history_list<br/>
使用说明：指令汇总列表-支持查询今天之前的具体时间段内的指令数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
| page_type || string || 页面类型 h5 pc 
|-
| fund_manager || string || 基金经理id
|-
| stock_id || string || 股票代码
|-
| product_id || string || 交易单元,支持逗号拼接。(若查询全部，可逗号拼接全部交易单元。也可不传值，不传值默认所有交易单元，建议不传)
|-
| trade_direction || 1:买入，2卖出 || 买卖方向。（若查询全部，可以逗号拼接全部，也可以不传，默认不传查询所有方向，建议不传）
|-
| type || int || 1交易单元+证券代码+买卖方向汇总  2证券代码+买卖方向汇总
|-
| order_code ||  int  || 1 基金经理  2 产品账户  3证劵名称 4证劵代码 5 买卖方向  6指令数 7指令价格 8指令状态 9进度 10时间  11备注 12 指令id
|-
| order ||  string  || desc 倒序  asc 正序
|-
| start_time || string || 查询范围开始日期 ，如2018-05-01
|-
| end_time || string || 查询范围结束日期 ，如2018-05-01
|}
返回值：<br/>
示例：<br/>
<pre>
请求：
http://192.168.0.235/omsv2/sync/instruction/summary_history_list?page_type=pc&stock_id=000001.SZ&start_time=2019-05-05&end_time=2019-05-05&page=1&type=1

响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "190001_10073_000001.SZ_1": 
            {
                "id": "--",    //指令序号
                "fund_manager_id": 190001,    //基金经理id
                "fund_manager_name": "高毅-冯DD",  //基金经理
                "product_name": "",     //产品信息
                "stock_name": "平安银行",  //证劵名称
                "stock_id": "000001.SZ",   //证劵代码
                "volume": "584,800",        //指令数
                "price": "13.85",                 //价格
                "normal_status": 1,    //指令状态
                "normal_status_name": "正常",      //指令状态
                "progress": "--",      //进度
                "desc": "--",            // 备注
                "created_at": "--",    //时间
                "is_combi": 0,          //是否是组合指令
                "direction": 1          //买卖方向
               "children": [
                    {
                        "ins_ids": 10986,       //指令序号
                        "stock_name": "平安银行",    //证劵名称
                        "product_name": null,     //产品信息
                        "stock_id": "000001.SZ",  //证劵代码
                        "volume": "2,000",     //指令数
                        "price": "13.85",      /指令价格
                        "normal_status_name": "正常",    //指令状态
                        "progress": "0.00000",    //进度
                        "desc": "",     //备注
                        "created_at": "2019-05-05 11:04:00"    //时间
                         "direction": 1          //买卖方向
                    },
                    {
                        "ins_ids": 10985,
                        "stock_name": "平安银行",
                        "product_name": null,
                        "stock_id": "000001.SZ",
                        "volume": "290,400",
                        "price": "13.85",
                        "normal_status_name": "正常",
                        "progress": "0.00000",
                        "desc": "",
                        "created_at": "2019-05-05 10:42:26"
                         "direction": 1          //买卖方向
                    }
                ]
            },
        "190001_10084_000001.SZ_1":
            {
                "id": "--",
                "fund_manager_id": 190001,
                "fund_manager_name": "高毅-冯DD",
                "product_name": "",
                "stock_name": "平安银行",
                "stock_id": "000001.SZ",
                "volume": "581,000",
                "price": "13.85",
                "normal_status": 1,
                "normal_status_name": "正常",
                "progress": "--",
                "desc": "--",
                "created_at": "--",
                "is_combi": 0,
                "children": [
                    {
                        "ins_ids": 10985,
                        "stock_name": "平安银行",
                        "product_name": null,
                        "stock_id": "000001.SZ",
                        "volume": "290,400",
                        "price": "13.85",
                        "normal_status_name": "正常",
                        "progress": "0.00000",
                        "desc": "",
                        "created_at": "2019-05-05 10:42:26"
                         "direction": 1          //买卖方向
                    },
                    {
                        "ins_ids": 10982,
                        "stock_name": "平安银行",
                        "product_name": null,
                        "stock_id": "000001.SZ",
                        "volume": "100",
                        "price": "13.85",
                        "normal_status_name": "正常",
                        "progress": "0.00000",
                        "desc": "",
                        "created_at": "2019-05-05 09:54:21"
                         "direction": 1          //买卖方向
                    }
                ]
            },
        "190001_10101_000001.SZ_1":
            {
                "id": 10984,
                "fund_manager_id": 190001,
                "fund_manager_name": "高毅-冯DD",
                "product_name": "",
                "stock_name": "平安银行",
                "stock_id": "000001.SZ",
                "volume": "2,000",
                "price": "13.85",
                "normal_status": 1,
                "normal_status_name": "正常",
                "progress": "0.50000",
                "desc": "--",
                "created_at": "--",
                "is_combi": 0,
                 "direction": 1          //买卖方向
                "children": [
                    {
                        "ins_ids": 10984,
                        "stock_name": "平安银行",
                        "product_name": null,
                        "stock_id": "000001.SZ",
                        "volume": "1,000",
                        "price": "13.85",
                        "normal_status_name": "正常",
                        "progress": "0.50000",
                        "desc": "",
                        "created_at": "2019-05-05 10:06:21"
                         "direction": 1          //买卖方向
                    },
                    {
                        "ins_ids": 10982,
                        "stock_name": "平安银行",
                        "product_name": null,
                        "stock_id": "000001.SZ",
                        "volume": "100",
                        "price": "13.85",
                        "normal_status_name": "正常",
                        "progress": "0.00000",
                        "desc": "",
                        "created_at": "2019-05-05 09:54:21"
                         "direction": 1          //买卖方向
                    }
                ]
            }
    },
    "timestamp": 1557221974.1225,
    "timeConsumption": 0.38184213638306,
    "requestStartTime": null
}
</pre>

===GY指令执行汇总列表===
CGI：omsv2/sync/instruction/summary_list<br/>
使用说明：指令汇总列表-支持查询今天之前的具体时间段内的指令数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
| type || int || 1 交易单元方向汇总 
|-
| order_code ||  int  || 1编号 2基金经理  3交易单元  4证劵代码
|-
| order ||  string  || desc 倒序  asc 正序
|-
| status ||  int  ||  是否隐藏已结束指令 0 否 1是
|}
返回值：<br/>
示例：<br/>
<pre>
请求：
http://192.168.0.235/omsv2/sync/instruction/summary_list?type=1

响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "190001_10073_000001.SZ_1": [
            {
                "id": "--",    //指令序号
                "fund_manager_id": 190001,    //基金经理id
                "fund_manager_name": "高毅-冯DD",  //基金经理
                "product_name": "",     //产品信息
                "stock_name": "平安银行",  //证劵名称
                "stock_id": "000001.SZ",   //证劵代码
                "volume": "584,800",        //指令数
                "price": "13.85",                 //价格
                "normal_status": 1,    //指令状态
                "normal_status_name": "正常",      //指令状态
                "progress": "--",      //进度
                "desc": "--",            // 备注
                "created_at": "--",    //时间
                "is_combi": 0,          //是否是组合指令
                "direction": 1          //买卖方向
                "is_read": 0,      //是否已读
                "valid_entrust_volume": "--",    //有效委托数量
                "deal_amount": "--",       //成交量
                "deal_avg_price": "--",    //成交均价
                "predict_complete_time": "--",   //预期完成时间
               "children": [
                    {
                        "ins_ids": 10986,       //指令序号
                        "stock_name": "平安银行",    //证劵名称
                        "product_name": null,     //产品信息
                        "stock_id": "000001.SZ",  //证劵代码
                        "volume": "2,000",     //指令数
                        "price": "13.85",      /指令价格
                        "normal_status_name": "正常",    //指令状态
                        "progress": "0.00000",    //进度
                        "desc": "",     //备注
                        "created_at": "2019-05-05 11:04:00"    //时间
                        "is_read": 0,     //是否已读
                        "valid_entrust_volume": null,    //有效委托数量
                        "deal_amount": "0.00",            //成交量
                        "deal_avg_price": "0.00000",    //成交均价
                        "predict_complete_time": "--",    //预期完成时间
                        "direction": 1          //买卖方向
                        "pre_val": {     //修改前指令和价格 备注
                               "ins_volume": "327,700",
                                "price": "12.7"
                                "ins_memo": "testtest"
                           }
                    },
                   {
                    "ins_ids": 11328,
                    "stock_name": "中电控股",
                    "product_name": "光大恒生181",
                    "product_id": 10074,
                    "fund_manager_id": 190005,
                    "fund_manager_name": "test2",
                    "stock_id": "00002.HK",
                    "volume": "8,000",
                    "price": "87.45",
                    "normal_status_name": "正常",
                    "progress": "0",
                    "desc": "",
                    "created_at": "2019-05-15 10:06:37",
                    "is_read": 0,
                    "valid_entrust_volume": null,
                    "deal_amount": "0.00",
                    "deal_avg_price": "0.00000",
                    "direction": 1,
                    "direction_name": "买入",
                    "show_highLight": 0,
                    "ins_log":“”
                    }
                }
                ]
            }
        ]
    },
    "timestamp": 1557221974.1225,
    "timeConsumption": 0.38184213638306,
    "requestStartTime": null
}
</pre>

===高毅指令查询汇总导出===
使用说明：生成excel文件接口<br/>
请求方法：get<br/>
CGI：omsv2/oms/report/download_report/ins_summary<br/>

{| class="wikitable"
|-
| fund_manager || string || 基金经理id
|-
| stock_id || string || 股票代码
|-
| product_id || string || 交易单元,支持逗号拼接。(若查询全部，可逗号拼接全部交易单元。也可不传值，不传值默认所有交易单元，建议不传)
|-
| trade_direction || 1:买入，2卖出 || 买卖方向。（若查询全部，可以逗号拼接全部，也可以不传，默认不传查询所有方向，建议不传）
|-
| type || int || 1交易单元+证券代码+买卖方向汇总  2证券代码+买卖方向汇总
|-
| order_code ||  int  || 1 基金经理  2 产品账户  3证劵名称 4证劵代码 5 买卖方向  6指令数 7指令价格 8 指令状态 9进度 10时间  11备注 12 指令id
|-
| order ||  string  || desc 倒序  asc 正序
|-
| start_time || string || 查询范围开始日期 ，如2018-05-01
|-
| end_time || string || 查询范围结束日期 ，如2018-05-01
|}
示例：<br/>
<pre>
请求：
http://192.168.0.235/omsv2/oms/report/download_report/ins_summary?start_time=2019-05-08&end_time=2019-05-08&type=1&order_code=1
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1551250923.5617,
    "timeConsumption": 1.6441969871521,
    "requestStartTime": null
}
</pre>
===高毅新保证金比例获取===
请求方法：get<br/>
CGI：/omsv2/oms/api/get_margin_rate<br/>

{| class="wikitable"
|-
| name || string || 基金名称
|-
| group_id || string || 基金id
|}
示例：<br/>
<pre>
请求：
http://127.0.0.1:32080/omsv2/oms/api/get_margin_rate
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "name": "dashan",
            "group_id": 106,
            "content": {
                "IF": 10,
                "IH": 10,
                "IC": 15
            }
        },
        {
            "name": "DXFOS_晓峰海外3号",
            "group_id": 74,
            "content": {
                "IF": 10,
                "IH": 10,
                "IC": 15
            }
        }
     ],
    "timestamp": 1559356764.1559,
    "timeConsumption": 0.1315860748291,
    "requestStartTime": null,
    "input": []
}
</pre>

===高毅新保证金比例修改===
请求方法：post<br/>
CGI：/omsv2/oms/api/modify_margin_rate<br/>

{| class="wikitable"
|-
| data || string || 修改数据，为json 数据 例如 {"999":{"IF":14,"IH":4,"IC":2},"1041":{"IF":15,"IH":2222,"IC":3}}
|}
示例：<br/>
<pre>
请求：
http://127.0.0.1:32080/omsv2/oms/api/modify_margin_rate
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [
        1
    ],
    "timestamp": 1559529428.1076,
    "timeConsumption": 0.20382404327393,
    "requestStartTime": null,
    "input": {
        "data": "{\"999\":{\"IF\":14,\"IH\":4,\"IC\":2},\"1041\":{\"IF\":15,\"IH\":2222,\"IC\":3}}"
    }
}
</pre>

==【高毅版】数据导入==
===资产导入模板字段定义===
<pre>
注意以下都是指在基金管理-数据导入中的对应功能，不包含高毅的特殊资产日报解析导入
balance：对应资产查询的现金余额
cash：对应资产查询的可用资金
frozen_cash：冻结资金
total_asset：对应资产查询的单元净资产
market_value：对应资产查询的持仓市值
stock_asset：股票资产
fund_asset：基金资产
bond_asset：债券资产
full_bond_asset：债券资产-全价
repurchase_asset：回购资产
future_profit：期货盈亏
future_right：期货权益
future_margin_usable：期货保证金可用
future_margin_occupation：期货保证金占用
future_risk_degree：期货风险度
</pre>

===持仓导入模板字段定义===
<pre>
stock_name： 证券名称
stock_code： 证券code，会经过后缀转换对应到系统持仓查询中的证券id
market_value：当前市值
hold_amount：持仓量
enable_sell：可卖量
cost_price：成本价
total_cost：持仓总成本
latest_price：最新价
market：市场定义，取值：0其他 1:沪A 2:深A 3:沪港通 4:深港通 5中金 6大商 7郑商 8上期 9银行间
profit_loss_amount：浮动盈亏
profit_loss_rate：浮盈率
exchange_rate：汇率 对应数据查询的汇率
currency：币种  对应数据查询的币种 0人民币 1港币 2美元
hold_direction：对应持仓查询的持仓方向 0多头1空头 非期货不传或传0
hedge_flag：文案，对应持仓查询的投保标志。 非期货不传或-- 
sec_type：证券类型，取值：1股票 2期货 3债券 4回购 5期权 6基金 7国债 8其他 9港股 10货币基金
margin_occupation：期货保证金
</pre>

===委托导入模板字段定义===
<pre>
entrust_id：委托id
entrust_time：委托时间
stock_name： 证券名称
stock_code： 证券code，会经过后缀转换对应到系统委托查询中的证券id
enrust_price：委托价格
entrust_amount：委托数量
entrust_value：委托总金额
bs_symbol：文案，对应委托查询的买卖标志
exchange_rate：汇率 对应数据查询的汇率
currency：币种  对应数据查询的币种 0人民币 1港币 2美元
status_desc：文案，对应委托查询的订单状态
cancel_amount：撤单数量
deal_amount：成交数量
deal_price：成交单价
deal_value：成交总金额
quote_type：文案，对应委托查询的报价方式
</pre>

===成交导入模板字段定义===
<pre>
entrust_id：委托id
deal_id：成交id
deal_time：成交时间
stock_name： 证券名称
stock_code： 证券code，会经过后缀转换对应到系统成交查询中的证券id
bs_symbol：文案，对应委托查询的买卖标志
deal_amount：成交数量
deal_price：成交单价
deal_value：成交总金额
exchange_rate：汇率 对应数据查询的汇率
currency：币种  对应数据查询的币种 0人民币 1港币 2美元
</pre>

==【指令同步】==
===指令审核列表===
CGI：/sync/pb_ins/review_lists<br/>
使用说明：指令审核和指令同步页面的列表 <br/>
请求方法：GET <br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date || string ||  起始日期 2018-01-01
|-
| end_date || string ||  结束日期 2018-01-01
|-
| status || string ||  是否审核，wait 未审核  done 已审核
|-
| order_column || string ||  可选，排序条件，默认按时间排序
|-
| order_by || string ||  可选，根据指令时间指令排序方式，asc 正序  desc 倒序,默认倒序
|-
| securities_id || int ||  券商id(过滤条件，可选)
|-
| channel || int ||    系统类型(过滤条件，可选)
|-
| group_id || int ||  基金id(过滤条件，可选)
|-
| auto_review_status || int ||  是否只展示异常，如果需要展示异常传递1 (过滤条件，可选)
|-
| page || int ||  当前页
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.20:23080/omsv2/sync/pb_ins/review_lists?status=done
响应：
{
"code": 0,
"msg": "ok",
"data": {
    "cur_page_no": 1,
    "total_page_count": 0,
    "page": 1,
    "count": 9999,
    "max": 0,
    "total": 0,
    "list": [
           {
              "instruction":{
                    "id"=>"12",
                    "creator_name"=>"指令下单员",
                    "created_at" =>"2017-09-18 10:09:18"
                    "ins_id" => 1656  //原委托编号
                    "review_status" => 1  //审核状态 1,已审核，0待审核
                    "status_desc" => '审批状态描述'
                    "refuse_reason" => '拒绝原因'  
                    "invest_type" => '普通单'  //投资类型
                    'review_time'=>'2017-09-18 10:09:18'   //审核时间 ,
                    'review_username'=> '老板',  //审核人名,
                    "ins_review_name": "刘军",//迅策审核人名称
                    "ins_review_id": "570000",//迅策审核人id
                    'entrust_flag'=> '委托', // 标示 
                    'cancel_entrust_no'=> '0001',//原委托编号
                    'comment'=>{
                         '0'=>'备注字段1',
                         '1'=>'备注字段2',
                               …… 
                    }
                    'check_condition'=>1/2    //1，审核通过，2审核未通过,
                    "limit_action": 1, //风控类型 1禁止0提醒 通过时为-1
                    "risk_comment": "质疑"
              },
             "stock"=>{ 
                    "stock_code":"000683.sz", 
                    "stock_name":"远兴能源",
                    "market_name" : "港股"
              },
             /* 产品汇总，请参考sub_list的字段描述 */
             "gathering"=> {
                   "product_id":"10018",//产品id列表
                   "product_name_list":"产品名称"
                   "unit_name_list" : "单元名称"
                   "deal_direction":1,
                   "deal_direction_name":"买入",
                   "price":"8.980",
                   "ins_amount":"2000",      //指令数量
                   "ins_balance":"8226.980",  //指令金额
              },
          }
  ]
  },
"data_page_html": "<ul class=\"pagination\"><li><a href=\"/?page=1\" rel=\"prev\">&laquo;</a></li> <li><a href=\"/?page=1\">1</a></li><li class=\"active\"><span>2</span></li><li><a href=\"/?page=3\">3</a></li> <li><a href=\"/?page=3\" rel=\"next\">&raquo;</a></li></ul>"
"timestamp": 1500431442.2484,//接口开始处理时间戳
"timeConsumption": 2.2985339164734,//接口响应耗时，单位：秒

}

 </pre>

===指令审核===
CGI：/sync/pb_ins/review<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! id  !!string!! 指令列表返回的id,多个ID用 , 连接，如：12,15,16
|-
! review_status  !!int!! 审核状态 , 1 审核通过  2 审核拒绝
|-
! refuse_reason  !!string!! 拒绝原因(非必须) 
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.20:23080/omsv2/sync/pb_ins/review
POST参数：
id=15,16,18&review_status=1

响应：
{
"code": 0,
"msg": "ok",
"data": null,
"timestamp": 1500431442.2484,//接口开始处理时间戳
"timeConsumption": 2.2985339164734,//接口响应耗时，单位：秒

}
</pre>
===指令审核tb2===
CGI：/sync/pb_ins/tb2review<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! id  !!string!! 指令列表返回的id,多个ID用 , 连接，如：12,15,16
|-
! review_status  !!int!! 审核状态 , 1 审核通过  2 审核拒绝
|-
! refuse_reason  !!string!! 拒绝原因(非必须) 
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.20:23080/omsv2/sync/pb_ins/tb2review
POST参数：
id=15,16,18&review_status=1

响应：
{
"code": 0,
"msg": "ok",
"data": null,
"timestamp": 1500431442.2484,//接口开始处理时间戳
"timeConsumption": 2.2985339164734,//接口响应耗时，单位：秒

}
</pre>

===指令审核刷新===
CGI：/sync/pb_ins/sync_pb_ins<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! investment_advisor  !!string!! 投顾模式 （多选的情况下，英文逗号分隔）
|-
! type  !!int!! 选择类型，1普通单，2策略单
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data.id || string || id 
|-
| data.name || string || json数据格式 , 返回API 响应结果 
|-
| data.investment_advisor || string || 投顾名称
|-
| data.securities_name || string || 证券名称
|-
| data.code || string || 审核结果返回码 
|-
| data.msg || string || 审核结果返回信息 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.20:23080/omsv2/sync/pb_ins/sync_pb_ins
POST参数：
investment_advisor=15,16,18&review_status=1

响应：
{
"code": 0,
"msg": "ok",
"data": [ 
        id:691,
        name:'test',
        investment_advisor:'投顾模式',
        securities_name:'证券名称',
        code:'20386',
        msg:'网络异常'
    ]
}
</pre>
===投顾模式展示===
CGI：/bms-pub/product/investment_advisor_list<br/>
请求方法：GET<br/>
请求参数：<br/>
{不需要参数}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || 返回数据,投顾模式名称
|-
|}

示例：<br/>
<pre>
请求：
https://192.168.0.37:8085/bms-pub/product/investment_advisor_list
响应：
{
"code": 0,
"msg": "ok",
"data": [ 
        0:
        1:
        2:
        ……
    ]
}
</pre>
===指令审核导出===
CGI：/sync/pb_ins/export_reviewed<br/>
使用说明：导出已审核列表 <br/>
请求方法：GET <br/>
请求参数：
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date || string ||  起始日期 2018-01-01
|-
| end_date || string ||  结束日期 2018-01-01
|-
| order_column || string ||  可选，排序
|-
| order_by || string ||  可选，根据指令时间指令排序方式，asc 正序  desc 倒序,默认倒序
|-
| securities_id || int ||  券商id(过滤条件，可选)
|-
| channel || int ||    系统类型(过滤条件，可选)
|-
| group_id || int ||  基金id(过滤条件，可选)
|-
| org_id || int ||    机构id
|-
| check_condition || string ||  审批状态，1,审批通过，2审批未通过
|-
| status || int ||    wait待审核 done已审核
|-
| auto_review_status || int ||  是否只展示异常，如果需要展示异常传递1 (过滤条件，可选)
|}<br/>

===指令数据校验导出===
CGI：/sync/pb_ins/export_check_data<br/>
使用说明：指令数据校验结果导出 <br/>
请求方法：GET <br/>
请求参数：
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| order_column || string ||  可选，排序
|-
| order_by || string ||  可选，根据指令时间指令排序方式，asc 正序  desc 倒序,默认倒序
|-
|}<br/>
<br/>

===指令数据校验===
CGI：/sync/pb_ins/ins_ data_check<br/>
使用说明：获取指令数据校验结果 <br/>
请求方法：GET <br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.20:23080/omsv2/sync/pb_ins/ins_ data_check
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "stock": {
                "stock_code": "000009.SZ",
                "stock_name": "中国宝安"
            },
            "gathering": {
                "product_id": 1600433,
                "unit_name": "海通恒生",
                "deal_direction_name": "卖出",
                "price": "1",//指令均价
                "ins_amount": 200,//指令数量
                "entrust_price": "7",//委托均价
                "entrust_amount": 200,//委托数量
                "check_status": 0,//校验结果枚举值 0异常 1 正常
                "check_status_text": "异常"//校验结果文本
            }
        }
    ],
    "timestamp": 1512465317.1335,
    "timeConsumption": 0.48211002349854,
    "requestStartTime": null,
    "input": []
}

 </pre>
===pb指令展示===
CGI：/sync/instruction/inspb_list<br/>
使用说明：获取指令数据校验结果 <br/>
请求方法：GET <br/>
参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| query_channel ||str || 【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
| query_sec_name ||str || 【仅厦门信托生效】券商名 直接中文查询对应 
|-
| start_time || datetime || 开始时间
|-
| end_time || datetime || 截止时间
|-
| group_id || string || 基金id，默认逗号隔开
|-
| operator_uid || string || 基金经理id,默认逗号隔开
|-
| stock_id || int || 股票id
|-
| is_summary || int || 是否按照代码汇总1:正常，2:展示，默认为1
|-
| page || int || 分页信息，默认为1
|-
| order_by  || str || 排序字段 
|-
| order || str || 顺序desc,asc默认asc 
|-
| product_id || str || 交易单元
|-
|  query_market  || SZ 深A, SH沪A, HKSZ深港通,HKSH沪港通,YHJ银行间,CW场外,ZJ中金所,SQ上期所,DS大商所,ZS郑商所,BJ北交所,OT其他 || 交易市场
|-
| trade_direction || 1:买入，2:卖出 || 买卖方向
|-
|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:38080/sync/instruction/inspb_list?start_time=2018-08-09\&end_time=2018-08-09\&group_id=\&group_user=\&stock_id=\&is_summary=
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "list": [
            {
                "stock_id": "601000.SH",//证券代码
                "stock_name": "唐山港",  //证券名称
                "market": "沪A",        //证券市场
                "ins_user": "--",       //指令下达人
                "group_name": "--",     //基金
                "unit_name": 553,      //交易单元
                "bs_symbol": 0,         //买卖方向
                "price_type": "--",     //价格类型
                "ins_price": 8512.28,   //指令价格
                "ins_amount": 150500,   //指令数量
                "entrust_amount": 481600,//已委托数量
                "entrust_value": 240800,//已委托金额
                "deal_amount": 270900,   //已成交数量
                "deal_value": 778386,    //已成交金额
                "currency": 0,           //币种
                "date": "2018-08-09"     //发生日期
            }
        ],
        "data_page_html": "<ul class=\"pagination\"><li class=\"disabled\"><span>&laquo;</span></li> <li class=\"active\"><span>1</span></li><li><a href=\"/?page=2\">2</a></li><li><a href=\"/?page=3\">3</a></li><li><a href=\"/?page=4\">4</a></li><li><a href=\"/?page=5\">5</a></li><li><a href=\"/?page=6\">6</a></li><li><a href=\"/?page=7\">7</a></li><li><a href=\"/?page=8\">8</a></li><li class=\"disabled\"><span>...</span></li><li><a href=\"/?page=24\">24</a></li><li><a href=\"/?page=25\">25</a></li> <li><a href=\"/?page=2\" rel=\"next\">&raquo;</a></li></ul>"}
    },
    "timestamp": 1534150378.3158,
    "timeConsumption": 0.4796929359436,
    "requestStartTime": null,
    "input": {
        "start_time": "2018-08-09",
        "end_time": "2018-08-09",
        "group_id": "156",
        "operator_uid": "56001,56002,56003,56004,56000",
        "stock_id": "",
        "is_summary": "2"
    }
}

 </pre>

===pb指令导出===
CGI：/sync/instruction/down_inspb_list<br/>
使用说明：获取指令数据校验结果 <br/>
请求方法：GET <br/>
参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_time || datetime || 开始时间
|-
| end_time || datetime || 截止时间
|-
| operator_uid || int || 基金id
|-
| group_user || int || 基金经理
|-
| stock_id || int || 股票id
|-
| is_summary || int || 是否按照代码汇总1:汇总，2:正常展示
|-
| field_sort || str || 字段拖拽后的顺序
|-
|order_by || str || 排序字段
|-
|order || str || 顺序desc,asc默认asc
|-
|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:38080/sync/instruction/down_inspb_list?start_time=2018-08-09\&end_time=2018-08-09\&group_id=156\&operator_uid=56001,56002,56003,56004,56000\&stock_id=\&is_summary=2\&order_by=ins_price\&
order=asc\&field_sort=date,deal_value,stock_id,stock_name,market,ins_user,group_name,product_id,bs_symbol,
price_type,ins_price,ins_amount,entrust_amount,entrust_value,deal_amount,currency
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1534151179.3935,
    "timeConsumption": 1.9689838886261,
    "requestStartTime": null,
    "input": {
        "start_time": "2018-08-09",
        "end_time": "2018-08-09",
        "group_id": "156",
        "operator_uid": "56001,56002,56003,56004,56000",
        "stock_id": "",
        "is_summary": "2",
        "order_by": "ins_price",
        "order": "desc",
        "field_sort": "date,deal_value,stock_id,stock_name,market,ins_user,group_name,product_id,bs_symbol,price_type,ins_price,ins_amount,entrust_amount,entrust_value,deal_amount,currency"
    }
}

 </pre>

===待审核指令右上角浮窗===
CGI：sync/pb_ins/wait_list_notice<br/>
使用说明：获取待审核指令右上角浮窗数据 <br/>
请求方法：GET <br/>
参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/omsv2/sync/pb_ins/wait_list_notice
响应：
{
	{
	"code": 0,
	"msg": "ok",
	"data": [{
		"base_id": 1050,
		"security_name": "长江证券",//券商名称
		"pb_system": "恒生",//系统名称
		"name": "长江恒生",//账户名称
		"wait_ins": 1,//待审批条数
		"wait_ins_text": "未知",//文字提示
		"remain_time": "02h 57m 33s",//待审批停留时间
		"review_mode": "自动审批",//自动审批or手工审批
		"last_review_time": "17:22:30",//上次审批时间
		"error_msg": "Citrix通信时间超时"//异常错误
	}]
}
}

 </pre>

===pb截屏异常===
CGI：omsv2/sync/pb_ins/get_screen_shots<br/>
使用说明：获取指令数据校验结果 <br/>
请求方法：GET <br/>
参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| base_id || int || 账户id
|-
|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8000/omsv2/sync/pb_ins/get_screen_shots?base_id=800
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"all": [{
			"id": 1,
			"base_id": 800,
			"date": 20190102,
			"img_type": 1,
			"img_uri": "/images/pb_shot/demo.jpg",
			"created_at": "-0001-11-30 00:00:00",
			"updated_at": "-0001-11-30 00:00:00"
		}],
		"auto": [{
			"id": 1,
			"base_id": 800,
			"date": 20190102,
			"img_type": 1,
			"img_uri": "/images/pb_shot/demo.jpg",
			"created_at": "-0001-11-30 00:00:00",
			"updated_at": "-0001-11-30 00:00:00"
		}],
		"manual": []
	},
	"timestamp": 1546412828.9674,
	"timeConsumption": 0.32483601570129,
	"requestStartTime": null
}

 </pre>
===发送截屏请求===
CGI：omsv2/sync/pb_ins/do_screen_shot<br/>
使用说明：发送截屏请求 <br/>
请求方法：POST <br/>
参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| base_id || int || 账户id
|-
|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8000/omsv2/sync/pb_ins/do_screen_shot
post参数：
base_id=293
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
	},
	"timestamp": 1546412828.9674,
	"timeConsumption": 0.32483601570129,
	"requestStartTime": null
}

 </pre>

==【机构版】国债逆回购支持==
===国债逆回购下单(借出)===
CGI：/oms/workflow/{product_id}/add_hand_order<br/>
使用说明：国债逆回购借出<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| batch_no || string || 本批次的国债逆回购批次号，由前端生成
|-
| is_manual_order || int || 是否为手工单，0为否，这里传0
|-
| price || float ||借出价格，实际为国债逆回购的年化利率百分点
|-
| stock_id|| string || 国债逆回购代码，为了兼容前端写法，有后缀
|-
| trade_direction || int || 交易方向
|-
| trade_market || int || 交易市场
|-
| trade_mode || int || 限价1，市价为其它
|-
| trade_number_method || string || 交易的方法，此处固定为volume
|-
| volume || int ||交易张数，1张100元，上海：1000的整数倍，深圳：10的整数倍
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/oms/workflow/100112/add_hand_order
POST参数:
batch_no=20000-1501748476778-9613922495&is_manual_order=0&market=1&price=2.45&stock_code=204001.sh&trade_direction=2&trade_market=1&trade_mode=1&trade_number_method=volume&volume=1000

响应：
{
"code": 0,
"msg": "ok",
"data":null
}

</pre>

[http://192.168.0.22:12080/index.php?title=Xc_rms_api#api.E5.A4.9A.E8.82.A1.E7.A5.A8.E9.A3.8E.E6.8E.A7.E6.A3.80.E6.B5.8B.E6.8E.A5.E5.8F.A3 风控触发文档]

==【专户版】委托成交查询==
==【专户版】账户持仓查询==
===账户持仓查询===
CGI：oms/report/report_list/base_position<br/>
使用说明：获取委托成交汇总<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明

|-
| start || string ||查询时间
|-
| base_id|| array || 产品id数组
|-
| start|| date || 查询时间
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.37:8056/omsv2/oms/report/report_list/base_position?base_id[]=1600465&start=2018-07-18

响应：
{
	"code": 0,
	"msg": "ok",
	"data": [{
		"id": "1781",
		"base_id": "1600465",
		"stock_id": "600022.SH",
		"stock_name": "山东钢铁",
		"hold_amount": "100",//持仓数量
		"enable_sell": "100",//可卖数量
		"cost_price": "2.400",//成本价
		"latest_price": "2.020",//最新价
		"market_value": "202.000",//当前市值
		"profit_loss_amount": "-43.240",//浮动盈亏
		"profit_loss_rate": "-17.670", //浮动盈亏率
		"market": "上海",
		"created_at": "2018-07-18 17:53:04",
		"updated_at": "2018-07-18 17:53:04",
                "name": "通达信测试"//账户名称

	}],
	"timestamp": 1531913838.9918,
	"timeConsumption": 0.12335205078125,
	"requestStartTime": null
}
</pre>

===账户列表===
CGI：oms/api/get_base_list<br/>
使用说明：获取账户列表<br/>
请求方法：GET<br/>

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.37:8056/omsv2/oms/report/report_list/base_position?base_id[]=1600465&start=2018-07-18

响应：
{
	"code": 0,
	"msg": "cache",
	"data": [{
		"id": "286",
		"org_id": "56",
		"name": "中信模拟",
		"account_id": "67260000",
		"securities_id": "pb",
		"securities_name": "中信建投",
		"server_host": "",
		"server_port": "0",
		"fee_mode": "2",
		"fund_id": "",
		"asset_id": "",
		"combi_id": "",
		"need_entrust": "0",
		"need_deal": "0",
		"need_ins": "0",
		"need_ins_risk": "0",
		"status": "1",
		"created_at": "2018-05-23 16:04:28",
		"updated_at": "2018-06-25 17:29:32",
		"ctp_id": "0",
		"stock_type": "0",
		"market": "0",
		"group_id": "0",
		"channel": "1",
		"auto_login": "0",
		"auto_review": "0",
		"auto_refuse": "0",
		"order_model": "0",
		"trade_asset_class": "",
		"review_type": "0",
		"trader_name": "",
		"sync_interval": "0.00",
		"inter_code_type": "",
		"tb_mode": "2",
		"use_in_trade": "1",
		"password_reset_time": "0",
		"more_param": "",
		"virtual_desk_username": "",
		"virtual_desk_password": "",
		"virtual_desk_host": "",
		"virtual_desk_name": "",
		"sign_id": -1,
		"is_benchmarking": 0,
		"tb2_auto_time": "",
		"tb2_auto_type": ""
	}]
}
</pre>

==【机构版】委托管理==
===新股申购===
CGI：oms/workflow/{product_id}/apply_new_ipo<br/>
使用说明：新股申购<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| stock_id || string || 股票代码或申购代码
|-
| volume || int || 申购数量
|-
| unique_request || string || 每次委托请求唯一值
|-
| ins_id || int || 指令id
|-
| is_swap || int || 是否收益互换单元，可选，不传默认0
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/oms/workflow/152542/apply_new_ipo
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
     },
}
</pre>

===篮子指令批量下单===
CGI：/sync/workflow/basket_hand_order<br/>
使用说明：篮子批量创建委托单<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || int ||交易单元id
|-
| ins_id || int ||指令id
|-
| multi || array ||
{| class="wikitable"
! 参数 !! 类型 !! 说明
|-
| market || int || 交易市场
|-
| price || float || 委托价格
|-
| stock_id || string || 证券id
|-
| stock_name || string || 证券名称
|-
| trade_direction || int || 交易方向
|-
| trade_mode || int || -1最新价 1限价 3买卖1 4买卖2 5买卖3 6买卖4 7买卖5档 10不限价
|-
| volume || int || 交易张数，1张100元，上海：1000的整数倍，深圳：10的整数倍
|}
|}


返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.81:8081/omsv2/sync/workflow/basket_hand_order
POST参数:
multi[0][price]:8.778
multi[0][trade_direction]:1
multi[0][trade_mode]:2
multi[0][market]:1
multi[0][volume]:100
multi[0][stock_id]:000017.SZ
multi[0][stock_name]:深中华A
multi[1][price]:27.016000000000002
multi[1][trade_direction]:1
multi[1][trade_mode]:2
multi[1][market]:1
multi[1][volume]:100
multi[1][stock_id]:000023.SZ
multi[1][stock_name]:深天地Ａ

错误响应：
{
    "code": 5502212,
    "msg": "交易单元未开启沪深交易交易功能",
    "data": {
        "000017.SZ": {
            "code": 5502212,
            "msg": "交易单元未开启沪深交易交易功能",
            "data": null
        },
        "000023.SZ": {
            "code": 5502212,
            "msg": "交易单元未开启沪深交易交易功能",
            "data": null
        }
    }
}
</pre>

===委托撤单===
CGI：/sync/workflow/{product_id}/direct_cancel<br/>
使用说明：委托撤单<br/>
请求方式：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明 !! 必填
|-
| entrust_id || string ||委托ID || 是
|-
| stock_id || string ||证券ID || 是
|-
| market || string ||交易市场 1沪深A 2沪港通 3深港通 || 是
|-
| ignore_tips || int ||是否忽略提示性风控 1 忽略 0 不忽略 默认为0 || 否
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/oms/workflow/25244/direct_cancel?entrust_id=10000614&stock_id=600741.SH&market=1&ignore_tips=0
POST参数：
entrust_id: 10000614
stock_id:600741.SH
market:1
ignore_tips:0

错误响应：
{
    "code": 5022111,
    "msg": "已触发提示性风控(公司):触发公司风控：公司全天委托笔数≥1笔，全天撤单笔数/全天委托笔数≥0.00%，预警 当前值：公司全天委托笔数=145笔，全天撤单笔数/全天委托笔数=35.86%（全天撤单笔数：52，全天委托笔数：145）",
    "data": {
        "msg": [
            "已触发提示性风控(公司):触发公司风控：公司全天委托笔数≥1笔，全天撤单笔数/全天委托笔数≥0.00%，预警 当前值：公司全天委托笔数=145笔，全天撤单笔数/全天委托笔数=35.86%（全天撤单笔数：52，全天委托笔数：145）"
        ],
        "limit_action": 0  // 1 禁止性错误信息  0 提示性错误信息  
    },
    "timestamp": 1548396366.2045,
    "timeConsumption": 1.5010099411011,
    "requestStartTime": null
}

</pre>
===委托改单===
CGI：/sync/workflow/{product_id}/direct_modify<br/>
使用说明：委托改单<br/>
请求方式：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明 !! 必填
|-
| entrust_id || string ||委托ID || 是
|-
| stock_id || string ||证券ID || 是
|-
| market || string ||交易市场 1沪深A 2沪港通 3深港通 || 是
|-
| entrust_amount || float ||委托数量 || 是
|-
| entrust_price || float ||委托价格 || 是
|-
| price_type || int ||报价方式|| 是
|-
|swap_algo_type || int || 收益互换类pb算法-  2 TWAP, 3 VWAP, 4 POV, 5 ICEBERG, 6 MANUAL, 7 VOLINLINE || 是
|-
|swap_start_time || string || 收益互换类pb算法-起始时间 格式XX:XX:XX || 否
|-
|swap_end_time || string || 收益互换类pb算法-起始时间 格式XX:XX:XX || 否
|-
|swap_mp || int || 收益互换类pb算法-市场参与度 （部分算法选填参数）|| 否
|-
|swap_open || int || 收益互换类pb算法- FIX券商算法参与开收盘参数 || 否
|-
|swap_close || int || 收益互换类pb算法- FIX券商算法参与开收盘参数 || 否
|-
|swap_ds || int || 收益互换类pb算法- 显示数量（ICEBERG算法时选填参数）|| 否
|-
|swap_memo || string || 收益互换类pb算法-备注（MANUAL算法时选填参数）|| 否
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}

示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/oms/workflow/25244/direct_cancel?entrust_id=10000614&stock_id=600741.SH&market=1&price_type=1&entrust_price=100.00&entrust_amount=100&swap_algo_type=1
POST参数：
entrust_id: 10000614
stock_id:600741.SH
market:1
price_type:1
entrust_price:100.00
entrust_amount:100
swap_algo_type:1

</pre>

===刷新私募版委托/成交/资金/持仓等数据===
CGI：oms/command/update_sync<br/>
使用说明：前端触发同步数据刷新 - 在提交委托／撤单请求后 调用<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
!product_id  !! string  !! 交易单元ID 多个以 ,分隔  如: 16562,156565,16556
|-
!type  !! string  !!   刷新类型,枚举值 cash 资金  position 持仓 entrust 委托 deal 成交  all 所有  默认all
|-
!market  !! int  !!   市场 A股 1 沪港通 2 深港通 3
|-
!order_ids  !! array  !!   在改单中的撤单环节时，传参所撤的每个委托的order_id（列表中有该字段）。注意如果不是改单流程，则不需要传。

|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.33/omsv2/oms/command/update_sync
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "order_info":{   //传了order_ids数组时才有这些返回
            "263277-10024-20210222":{       //order_id
                "cancel_volume":300,                //撤单数量
                "entrust_status":31,                   //委托单状态  31表示已撤，其他都不是已撤
                "vendor_status_text":"已撤"        //状态文案
            },
            "263281-10004-20210222":{
                "cancel_volume":0,
                "entrust_status":0,
                "vendor_status_text":"提交中"
            }
        }
    }
}
</pre>
===自由委托-委托明细列表===
CGI：/oms/order/get_free_entrust_list <br/>
使用说明： 委托管理-自由交易 挂单列表/委托列表<br/>
               挂单列表时，传only_pending=1<br/>
               委托列表时，传only_pending=0<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| array || 产品id数组
|-
| market|| int || 交易市场    1 A股tab 2港股通tab 
|-
| only_pending|| int || 是否仅挂单数据
|-
| count|| int || 每页显示条数，请传递一个大整数，例如：count=9999
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
https://192.168.0.33/omsv2/oms/order/get_free_entrust_list?count=9999&market=1&product_id[]=101232
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "cur_page_no":1,
        "total_page_count":1,
        "page":1,
        "count":9999,
        "max":1,
        "total":1,
        "list":[
            {
                "id":724226,
                "product_id":10994,
                "product_name":"模拟网关-ada",
                "group_id":748,
                "group_name":"模拟网关-Ada",
                "order_id":"263294-10001-20221029",
                "entrust_id":"10001",
                "created_at":1667008073,
                "updated_at":1667037693,
                "ins_id":0,
                "sec_type":1,
                "ins_num":"297021029001",
                "origin_from":"自由委托",
                "complete_progress":1,
                "entrust":{
                    "price":"28.90",
                    "amount":"200",
                    "cancel_volume":"0",
                    "vendor_status_text":"已成",
                    "quote_type_text":"限价",
                    "trade_mode":1,
                    "bs_symbol_text":"买入",
                    "exchange_rate":"--",
                    "is_algo_supplement":0
                },
                "stock":{
                    "code":"688001.SH",
                    "name":"华兴源创"
                },
                "deal":{
                    "price":"28.88",
                    "amount":"200"
                },
                "ins":{
                    "ins_volume":0,
                    "ins_price":0
                },
                "cancel_status":"",
                "order_status":4,
                "status":5
            }
        ]
    },
    "timestamp":1667039226.8991,
    "timeConsumption":0.43793296813965,
    "requestStartTime":null
}
</pre>

===自由委托-成交汇总列表===
CGI：oms/order/get_free_deal_stat<br/>
使用说明：委托管理-自由委托 获取委托成交汇总<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id|| array || 产品id数组
|-
| collect || int ||汇总维度 0:交易单元+证券代码+委托方向(默认)  1:证券代码+委托方向
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.187:8080/omsv2/oms/order/get_free_deal_stat?product_id[]=101423

响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "cur_page_no":1,
        "total_page_count":1,
        "page":1,
        "count":9999,
        "max":1,
        "total":1,
        "list":[
            {
                "stock_code":"688001.SH",
                "stock_name":"华兴源创",
                "deal_volume_by_group":"200",
                "deal_amount_by_group":"5,776.04",
                "entrust_amount_by_group":"200",
                "deal_amount_by_group_from_price":5776.04,
                "product_name":"模拟网关-ada",
                "group_name":"模拟网关-Ada",
                "entrust_type_name":"买入",
                "deal_avg_price":"28.88"
            }
        ]
    },
    "timestamp":1667039150.1437,
    "timeConsumption":0.39088797569275,
    "requestStartTime":null
}


</pre>

==前端事件通知映射表==
===机构版===
{| class="wikitable"
|-
! System Version !! Event!! 动作解释 !! 需要刷新的CGI ID !! 补充说明
|-
|机构||do_add_ins|| 添加指令|| 1 || 如果socket数据中包含assigner_id字段（数组），则登录用户id在该字段中的，需要额外弹窗
|-
|机构||do_assign_ins|| 分发指令|| 1 || 如果socket数据中包含executor_id字段（数组），则登录用户id在该字段中的，需要额外弹窗
|-
|机构||do_modify_ins|| 修改指令|| 1 ||
|-
|机构||do_assign_setting|| （指令分发模式）设置自动分发or拒收指令 || 17 ||
|-
|机构||do_modify_entrust|| 指令交易中的委托变化 || 2,3,4,5 || 包括新提交委托，委托下行状态变化或成交数量变化等
|-
|机构||do_direct_entrust|| 委托管理中的委托变化 || 6,7 || 包括新提交委托，委托下行状态变化或成交数量变化等
|-
|机构||do_notification|| 右下角消息新增 || 9 || 
|-
|机构||do_ins_doubt_entrust|| 委托置疑信息更新 || 11 || 包括新出现置疑，置疑被完全处理等
|-
|机构||do_ins_review|| 指令审批数据更新 || 12 || 主线无此推送
|-
|机构||do_readcount|| 未读数量变化|| 15 || 目前计数仅有指令未读数量一类
|-
|机构||do_auto_reader_stock_notice|| 自动读取股本数据异常|| 16 ||
|-
|机构||do_dividend_payable_notice|| 读取股利类型数据异常|| 18 ||
|-
|机构||research_stock_deal|| 投研绩效-投研成交流水导入出错 || 19 ||
|-
|机构||do_industry_notice|| 投研绩效-行业信息导入出错 || 20 ||
|-
|}

{| class="wikitable"
|-
! CGI ID !! CGI Name!! CGI 
|-
|1||指令（执行）列表 || /ipb-pub/sync/instruction/search_list[?type=execute&count=9999]
|-
|2 ||指令交易-成交汇总，指令交易-指令执行右下tab-指令成交 ||/omsv2/oms/order/getEntrustAndDealList
|-
|3 ||指令交易-指令执行右下tab-指令挂单 ||/omsv2/oms/order/getCanBeCanceledList
|-
|4 ||指令交易-委托明细 ||/omsv2/oms/order/get_entrust_list
|-
|5 ||指令交易-指令执行右下tab-指令委托 ||/omsv2/oms/order/get_entrust_list_v2
|-
|6 ||委托管理-挂单列表，委托管理-委托列表 ||/omsv2/oms/order/get_free_entrust_list
|-
|7 ||委托管理-成交汇总 ||/omsv2/oms/order/get_free_deal_stat
|-
|9||获取全局弹窗通知||/omsv2/sync/notice/get_list
|-
|11||获取置疑信息||/omsv2/sync/instruction/get_algo_doubt_notice
|-
|12||获取指令审批列表||/omsv2/sync/pb_ins/review_lists
|-
|15||获取全局未读数量||/omsv2/oms/get_notice
|-
|16||自动读取股本数据异常提醒||/bms-pub/system/auto_reader_stocknotice
|-
|17||指令分发-机构状态||/ipb-pub/sync/instruction/get_assign_settings
|-
|18||读取股利类型数据异常提醒||/bms-pub/research/unknow_dividend_type
|-
|19||投研成交流水错误信息||//omsv2/oms/analyze/dashboard#/performance
|-
|20||投研行业信息错误信息||//bms-pub/research/get_industry_list?q=&page=1
|-
|}

== OMS内网开放API ==
===广义持仓明细 - 风控调用===
CGI：omsv2/oms/api/get_stock_position<br/>
使用说明：持仓成本市值 - 风控使用，返回持仓，挂单委托，指令剩余未挂单等多种情况组合<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| org_id || string ||机构id 公司层风控时使用
|-
| product_ids || string ||交易单元id,多个则以下划线分隔。如 10776_10778    org_id和product_ids不可都为空
|-
| stock_ids || string ||股票代码 支持批量,可不填
|-
| range || int ||0单纯持仓  1持仓+挂单委托+指令剩余未挂单  2持仓+挂单委托   3挂单委托+指令剩余未挂单  4挂单委托
|-
| need_ft_close || int || 是否需要考虑指令/委托里的平仓类期货数据  0否1是   默认0
|-
| undo_summary_method || int || 对未完成数据的汇总方式 1直接汇总到多空持仓里 2单独按交易方向分类展示.   默认值为1
|-
| filter_ins_id || string ||需要特殊考虑的指令id，指令修改时传参。会反向扣减该指令的已成部分
|}
额外说明：<br/>
undo_summary_method=1时，具体的汇总规则为：买对多头累加，卖对多头累减，买入开仓对多头累加，卖出开仓对空头累加，买平对空头累减，卖平对多头累减<br/>
undo_summary_method=2时，分类展示的方向枚举为3,4,5,6,7,8，详见下文数据举例<br/>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://127.0.0.1:8000/omsv2/oms/api/get_stock_position?product_ids=516,517,518&stock_ids=000001.SZ,000002.SZ,000005.SZ,000683.SZ&range=2
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"000002.SZ": {                         //股票代码
			"0": {                                 // 0：多头持仓数据 1空头持仓 3期货买入开仓的未完成数据 4卖开 5买平 6卖平 7买入的未完成 8卖出的未完成
				"hold_volume": -40,//持仓数量
				"total_cost": -2969,//持仓成本
				"total_market": -2969//持仓市值
			},
			"sec_type": 1,                //证券类型
                        "stock_name": '万科A'
		},
		"000683.SZ": {
			"0": {
				"hold_volume": 1700,
				"total_cost": 254,
				"total_market": 254
			},
			"sec_type": 1,
                        "stock_name": '万科A'
		},
		"000005.SZ": {
			"0": {
				"hold_volume": -100,
				"total_cost": -366,
				"total_market": -366
			},
			"sec_type": 1,
                        "stock_name": '万科A'
		}
	}
}


</pre>

===获取持仓列表===
CGI：/oms/api/multi_risk_position_data<br/>
使用说明：获取交易单元持仓列表,供rms调用<br/>
请求方法：GET<br/>
请求参数：<br/>
product_id支持批量传值，逗号隔开
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|product_id|| array ||交易单元id，数组格式
|-
|trade_date|| string ||日期 YYYY-mm-dd
|-
|org_id || string || 机构id，如有传product_id，则该字段无效
|-
|stock_id || string || 只返回该股票的对应结果，可选
|-
|with_entrust || int || 是否包含委托挂单的从严数据
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/oms/api/multi_risk_position_data?api_secret=afwefwefewfwefwwefwefew&product_id=25233&trade_date=2018-11-27
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "25233":{         //交易单元id
            "position_list":[
                {
                    "stock_id":"002436.SZ",
                    "sec_type":"1",
                    "market":"2",                  //如果是实际持仓，则有该值1:沪A 2:深A 3:沪港通 4:深港通 5中金所 6大商所 7郑商所 8上期所 9银行间 11北交所(新三板) 12场外 13沪股通 14深股通 15沪B 16深B 17港股 18美股 0其他
                    "stock_name":"兴森科技",       
                    "usable_volume":"2400.00",       //可卖量
                    "market_value":"10896.00000",  //市值，如传递了with_entrust，包含了委买挂单金额
                    "cost_price":"4.09500",       //成本价
                    "latest_price":"4.54000",     //最新价
                    "hold_cost":"9828.000",     //总成本，如传递了with_entrust，包含了委买挂单金额
                    "hold_volume":"2400.00",   //持仓量，如传递了with_entrust，包含了委买挂单数
                    "entrust_lock_volume":0     //委买挂单的数量
                }
            ]
        }
    }
}

</pre>

===广义持仓列表 - 多监管版举牌风控专用===
CGI：/oms/api/org_placards_position<br/>
使用说明：获取广义持仓列表，包含挂单委托，指令未完成等部分预估信息。供rms调用，举牌风控专用，对持仓表是按standard_sec_id索引<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|org_id || string || 机构id
|-
|stock_id || string || 股票id，支持批量，逗号分割
|-
|sel_type || int || 0纯持仓 1带挂单委托+指令未挂单 2带挂单委托.  默认为1
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://42.159.94.59/omsv2/oms/api/org_placards_position?org_id=111&stock_id=000004.SZ,600928.SH
响应：

{
    "code":0,
    "msg":"ok",
    "data":{
        "000625.SZ":{     //第一层：股票id
            "2":{         //第二层：持仓对应的市场 1:沪A 2:深A 3:沪港通 4:深港通 5中金所 6大商所 7郑商所 8上期所 9银行间 11北交所(新三板) 12场外 13沪股通 14深股通 15沪B 16深B 17港股 18美股 0其他
                //第三层：业务类别。  1ADR 2A股 3B股 4H股 5QDII(港股) 6QDII(美股) 7QFII/RQFII 8港股通 9沪股通 10美股 11其他 12其他股票 
                //               13深股通 14收益互换CFD/P NOTE(AB股) 15收益互换CFD/P NOTE(港股) 16收益互换TRS(港股) 17收益互换TRS(美股) 18收益互换TRS(其他) 19收益互换(美股) 20收益互换(其他)  21QDII(其他)
                "2":[                         
                    {                  //第四层：持仓对应的方向 0多1空
                        "10800":{           //第五层：交易单元id
                            "volume":600            //持仓量volume
                        }
                    }
                ]
            }
        },
        "200625.SZ":{
            "0":{
                "12":[
                    {
                        "10833":{
                            "volume":1
                        }
                    }
                ]
            },
            "16":{
                "3":[
                    {
                        "10800":{
                            "volume":1000000000
                        }
                    }
                ]
            }
        }
    },
    "timestamp":1561708191.9229,
    "timeConsumption":0.17901706695557,
    "requestStartTime":null
}

</pre>

===风控指令审批列表===
CGI：/oms/api/multi_risk_review_data<br/>
使用说明：获取指令审批(投资建议)列表,供rms调用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|product_id|| string ||交易单元id 说明
|-
|stock_id|| string ||股票代码 
|-
|trade_type|| string ||买卖类型  1：买 2：卖
|-
|date|| string ||日期 YYYY-mm-dd
|-
|is_valid|| string || 是否过滤无效审批单  1过滤, 0不过滤  默认为0
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/oms/api/multi_risk_review_data?product_id=25233&stock_id=600571.SH&trade_type=1&date=2019-02-20
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"3": {
			"ins_id": 104,          //投资建议id
			"status_desc": "\u5df2\u53d1\u9001", //投资建议状态
			"total_deal_amount": 300,     //总成交金额
			"total_deal_volume": 300,      //总成交量
			"stock_code": "000667.SZ",    //投资建议代码
			"ins_amount": 300,               //投资建议数量
			"ins_price": 2.86,               //投资建议价格
			"trade_type": 1                     //1买2卖
		},
		"4": {
			"ins_id": 105,
			"status_desc": "\u8fd0\u884c\u4e2d",
			"total_deal_amount": 200,
			"total_deal_volume": 300,
			"stock_code": "000667.SZ",
			"ins_amount": 300,
			"ins_price": 2.86, 
			"trade_type": 1
		}
	}
}

</pre>

===按机构获取风控指令审批列表===
CGI：/oms/api/multi_risk_review_data_byorg<br/>
使用说明：获取指令审批(投资建议)列表,按机构id传參获取，返回信息包含详细委托列表信息。供rms调用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|org_id|| int || 机构id
|-
|date|| string ||日期 YYYYmmdd
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/oms/api/multi_risk_review_data_byorg?org_id=128&date=20190225
响应：
{
    "code":0,
    "msg":"ok",
    "data":[
        {
            "id":"1212",
            "ins_id":"298022",
            "base_id":262988,
            "review_status":1,
            "status_desc":"审批通过",
            "invest_type":"普通单",
            "trade_type":1,
            "entrust_flag":"委托",
            "stock_code":"600036.SH",
            "ins_price":"31.570",
            "ins_amount":100,
            "ins_balance":"3157.000",
            "auto_review_status":0,
            "limit_action":-1,
            "entrust_info":[

            ]
        },
        {
            "ins_id":"298025",
            "base_id":262988,
            "review_status":1,
            "status_desc":"审批通过",
            "invest_type":"普通单",
            "trade_type":1,
            "entrust_flag":"委托",
            "stock_code":"600105.SH",
            "ins_price":"5.740",
            "ins_amount":1000,
            "ins_balance":"5740.000",
            "auto_review_status":0,
            "limit_action":0,
            "entrust_info":[

            ]
        }
    ]
}

</pre>

===获取委托列表===
CGI：/pub-api/entrust/product/{product_id}<br/>
使用说明：获取交易单元委托列表,供rms调用<br/>
请求方法：GET<br/>
请求参数：<br/>
product_id支持批量传值，逗号隔开
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|date|| string ||日期 YYYYmmdd
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/pub-api/entrust/product/112,113?api_secret=afwefwefewfwefwwefwefew&date=20181127
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "112":[
            {
                "id": 101,                            //内部委托id
                "stock_name":"深振业Ａ",    //证券名称
                "stock_code":"000006.SZ",   //证券id
                "entrust_price":"5.35000",     //委托价格
                "entrust_amount":200,         //委托数量
                "entrust_type":1,                 //委托方向 1买2卖
                "entrust_model":1,              //委托方式 1限价2市价
                "entrust_status":21,            //委托状态  0提交中 20已报 21已拒(废单) 31已撤
                "deal_status":0,                  //成交状态 0未成交 11部分成交 10全部成交
                "deal_price":"0.0000",       //成交均价
                "deal_volume":0,                //成交数量
                "deal_amount":"0.000",        //成交总价
                "entrust_at":"2018-11-27 09:41:50",    //委托时间
                "entrust_id":"280471" ，                    //pb委托编号
                "ins_id": 1221,            //所属指令id
                "is_doubt": 1,                       //是否质疑   1 质疑  0 否
                "is_down_data": 0,              //是否下行更新数据   1  是  0   否
                "is_cancel_ordel_request": 0,     //是否已发撤单请求  1 发送 0 否
            }
        ]
    }
}
</pre>

===获取成交列表===
CGI：/pub-api/deal/product/{product_id}<br/>
使用说明：获取成交列表,供rms调用<br/>
请求方法：GET<br/>
请求参数：<br/>
product_id支持批量传值，逗号隔开
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|date|| string ||日期 YYYYmmdd
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.165/omsv2/pub-api/deal/product/112,113?api_secret=afwefwefewfwefwwefwefew&date=20181127
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "25233":[
            {
                "deal_id":"1001",
                "stock_id":"IF1903",
                "stock_name":"IF1903",
                "deal_date":"20190212",
                "deal_type":1,    //1买2卖
                "deal_price":"3332.8000",
                "deal_volume":"1",
                "deal_amount":"999840.0000"
            },
            {
                "deal_id":"1002",
                "stock_id":"IF1903",
                "stock_name":"IF1903",
                "deal_date":"20190212",
                "deal_type":2,
                "deal_price":"3331.4000",
                "deal_volume":"1",
                "deal_amount":"999420.0000"
            }
        ]
    }
}
</pre>

===获取指令置疑情况===
CGI：omsv2/oms/api/risk_ins_doubt_data<br/>
使用说明：风控使用，返回指定指令的置疑情况，包括子项的总置疑量，匹配量，释放量<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| org_id || string ||机构id
|-
| ins_ids || string ||要查的指令id，支持批量，逗号隔开
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/omsv2/oms/api/risk_ins_doubt_data?org_id=57&ins_ids=10828,10829
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "10828":{                 //指令id
            "total":{                          //该指令总的统计
                "doubt_volume":0,     //累计总置疑量
                "matched_volume":0,     //有效匹配量
                "release_volume":0   //总释放量
            },
            "25286_600448.SH":{  //该指令各子项的统计。key的格式为 {product_id}_{stock_id}
                "doubt_volume":0,      //累计总置疑量
                "matched_volume":0,     //有效匹配量
                "release_volume":0     //总释放量
            }
        },
        "10829":{
            "total":{
                "doubt_volume":0,
                "matched_volume":0, 
                "release_volume":0
            },
            "25286_000001.SZ":{
                "doubt_volume":0,
                "matched_volume":0, 
                "release_volume":0
            }
        }
    }
}


</pre>

===获取指定机构的当日指令详情列表===
CGI：omsv2/oms/api/get_ins_list<br/>
使用说明：指令风控使用<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| org_id || string ||机构id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 

|}

示例：<br/>
<pre>
请求：
http://192.168.0.150/omsv2/oms/api/get_ins_list?org_id=57
响应：
{
    "code":0,
    "msg":"ok",
    "data":[
         {
             "deal_amount": 0,     //指令已成交数量
             "deal_total_amount": 0, //指令成交金额
             "direction": 1,          //指令方向 1买2卖 
            "ins_id": 23935,         //指令id
            "ins_volume": 1300,     //指令数量
            "product_id": 1676,      //交易单元id
            "stock_id": "000001.SZ",     //证券id
            "valid_entrust_volume": 1300,     //指令当前有效委托数量
            "quote_type": "1",//指令价格模式 1限价 10不限价
            "deal_avg_price" : 123, //委托成交均价
            "quote_price": "5.32",   //指令具体价格，不限价模式时为指令提交时的行情价
            "total_doubt_volume": 200,     //置疑总量
            "matched_doubt_volume": 100,  //已匹配置疑总量
            "release_doubt_volume": 100,  //释放置疑量
            "normal_status": "1"      //指令状态 1正常2待撤3已撤
         },
         {
             "deal_amount": 0,     //指令已成交数量
             "deal_total_amount": 0, //指令成交金额
             "direction": 1,          //指令方向 1买2卖 
            "ins_id": 23935,         //指令id
            "ins_volume": 1300,     //指令数量
            "product_id": 1676,      //交易单元id
            "stock_id": "000001.SZ",     //证券id
            "valid_entrust_volume": 1300,     //指令当前有效委托数量
            "quote_type": "1",//指令价格模式 1限价 10不限价
            "deal_avg_price" : 123, //委托成交均价
            "quote_price": "5.32"   //指令具体价格，不限价模式时为指令提交时的行情价
            "total_doubt_volume": 200,     //置疑总量
            "matched_doubt_volume": 100,  //已匹配置疑总量
            "release_doubt_volume": 100,  //释放置疑量
            "normal_status": "1"
         }
    ]
}


</pre>

===获取当日资产/持仓/委托/成交列表===
CGI：/sync/api/daily_data/{data_type}/{market_type}<br/>
使用说明：获取当日资产/持仓/委托/成交列表<br/>
该方法供ADC日常获取数据时调用<br/>

请求方法：GET<br/>
请求参数：<br/>
{data_type} :  asset/position/entrust/deal<br/>
{market_type}:  stock/future<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|page|| int ||分页列表，默认为1
|-
|page_size|| int ||每页计数，默认50
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || 具体数据
|-
| data.total_count || int || 符合请求的所有计数
|-
| data.list || array || 具体列表信息。其中字段参考下面例子
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/sync/api/daily_data/deal/stock?page=2&page_size=50
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "total_count":4836,
        "list":[
            {//资产样例
                "productid":1600526,
                "totalasset":"70752579.93300",
                "net_asset":"0.00000",
                "cashvalue":"70778856.93300"
            },
            {//资产-期货 样例
                "productid":100331,
                "totalasset":988548.45,
                "net_asset":988548.45,
                "cashvalue":"988548.45000"
            },
            {//持仓 样例
                "productid":1600542,
                "security_id":"000005.SZ",
                "hold_direction":1,
                "hold_volume":"10400.00",
                "usable_volume":"10400.00",
                "hold_cost":"38116.000",
                "currency":0    //0RMB 1HKD 2USD 3SGD
            },
            {//持仓 期货 样例
                "productid":1600545,
                "security_id":"a1807",
                "hold_direction":1,
                "hold_volume":"6",
                "usable_volume":"6",
                "hold_cost":"236040.00",
                "today_volume":"6.00000",
                "yesterday_volume":"0.00000",
                "presettle":"3934.00000",
                "settle":"3934.00000",
                "use margin":"1000.0000"
            },
            {//委托 样例
                "productid":223,
                "stock_id":"000683.SZ",
                "entrust_direction":1,   //1买2卖
                "entrust_operator":0,
                "entrust_id":"1600462-508974-20180504",
                "entrust_price":"2.880",
                "entrust_volume":100,
                "entrust_prop":1,   //1限价2市价
                "entrust_status":20,    //0未报20已报21被拒31委托撤销
                "deal_volume":0,
                "deal_amount":"0.000",
                "cancel_volume":0,
                "currency":0    //0RMB 1HKD 2USD 3SGD
            },
            {//委托 期货 样例
                "productid":41,
                "security_id":"FG801",
                "market":"CZCE",
                "entrust_direction":1,
                "entrust_operator":0,
                "entrust_id":"41-15061-1-20171129",
                "entrust_price":"1465.000",
                "entrust_volume":1,
                "entrust_prop":2,
                "entrust_status":0,
                "deal_volume":1,
                "cancel_volume":0
            },
            {//成交 样例
                "productid":100322,
                "stock_id":"150300.SZ",
                "hold_direction":1,
                "entrust_id":"1500588-9309-20170410",
                "deal_id":"0102000006642362",
                "deal_type":1,     //1买入2卖出
                "deal_price":"0.542",
                "deal_volume":"100",
                "deal_amount":"54.2",
                "currency":0      //0RMB 1HKD 2USD 3SGD
            },
           {//成交 期货 样例
                "productid":100347,
                "stock_id":"IF1707",
                "market":"CFFEX",
                "entrust_id":"1600063-4539-2-20170620",
                "deal_id":"217430-2",
                "deal_type":1,
                "deal_price":"3520.0000",
                "deal_volume":2
            }
        ]
      }
}


</pre>
===通知立即同步更新TB数据===
CGI：/omsv2/sync/api/quick_sync_data<br/>
使用说明：获取当日资产/持仓/委托/成交列表<br/>
该方法供ADC日常获取数据时调用<br/>

请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || string || 要通知的交易单元列表, 多个以英文 , 分隔
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || 具体数据
|-
| data.total_count || int || 符合请求的所有计数
|-
| data.list || array || 具体列表信息。其中字段参考下面例子
|}
示例：<br/>
<pre>
请求：
https://114.55.219.85/omsv2/sync/api/quick_sync_data?product_id=1730
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
          1155       // 账户ID列表
      }
}


</pre>
===获取基金层指令金额===
CGI：/sync/api/get_group_ins_amount<br/>
使用说明：获取基金层指令金额<br/>

请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_ids || string || 要通知的交易单元列表, 多个以英文 , 分隔
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || 具体数据
|}
示例：<br/>
<pre>
请求：
https://114.55.219.85/omsv2/sync/api/get_group_ins_amount?product_ids=11110,11115
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "620":67350,
        "703":486520
    }
}


</pre>
===修改审批指令状态===
CGI：/sync/api/set_ins_audit<br/>
使用说明：修改审批指令状态<br/>

请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| ins_ids || string || 需要修改的指令id 多个以英文 , 分隔
|-
| audit_status || string || 审批通过-2 审批拒绝-3
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || 具体数据
|}
示例：<br/>
<pre>
请求：
https://114.55.219.85/omsv2/sync/api/set_ins_audit
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        
    }
}


</pre>

==账户流水==
===账户流水===
CGI：/priv-api/capital-flow/product/{product_id}<br/>
使用说明：获取期货成交列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|start_date|| string ||开始时间 20170506
|-
|end_date|| string ||结束时间 20170506
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/priv-api/capital-flow/product/3?start_date=20171120&end_date=20171201
响应：
{
    "code": 0,
    "msg": "ok",
    "data":[
   ]
}

// 字段说明
currency: 币种（0: 人民币 1:  美元 2: 港币）
stock_name: 证券名称
deal_date: 成交日期
deal_price: 成交价格
deal_amount: 成交数量
deal_value: 发生金额
balance: 资金余额
remain_amount: 剩余数量
contract_no: 合同编号
name: 业务名称
fee: 手续费
stamp_duty: 印花税
transfer_fee: 过户费
settlement_fee: 结算费
stock_code: 证券代码
secuid: 股东代码
remark: 保留信息
type: 业务类型（0: 未知 ，1: 证券买入，2: 证券卖出，3: 证券转银行，4: 银行转证券）
</pre>

==【数据查询】==
===信托-数据刷新接口===
使用说明：信托 数据查询-数据刷新接口<br/>
请求方法：get<br/>

CGI:  192.168.0.33/omsv2/sync/pb_ins/sync_pb_data<br/>

请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 取值 !! 说明
|-
| type || string ||  asset资产 position持仓 entrust委托 deal成交 || 要刷新的数据类型
|-
| market || string ||   0-股票，1-期货，2-融资，3-沪港，4-深港，5-组合 || 讯投参数-导出类别,支持多选逗号隔开
|-
| channel || string || 1:恒生,2:金证,3:IMS,4:迅投 || 券商系统类型，支持多选逗号隔开
|}


示例：<br/>
<pre>
请求：
CGI：http://localhost:32080/omsv2/sync/pb_ins/sync_pb_data?type=asset&channel=3&market=0

响应：
{
"code": 0,//0成功
"msg": "ok",//返回失败的错误提示
"data":["1600451"]  //返回调用了刷新接口的baseid列表 
}


</pre>
===高毅 获取账户信息数据接口===
使用说明：账户信息读取接口<br/>
请求方法：get<br/>

CGI:  http://192.168.0.37:8021/oms/report/get_count_list

示例：<br/>
<pre>
请求：
CGI：http://127.0.0.1:38080/oms/report/get_count_list

响应：
{
"code": 0,//0成功
"msg": "ok",//返回失败的错误提示
"data":["{ 
        'id':1600454,
        'name':测试账户1
         }
         { 
        'id':1600455,
        'name':测试账户2
         }
         ……
       "]  //返回调用了刷新接口的baseid列表 
}


</pre>

===私募机构-数据查询===
使用说明：私募机构 数据查询-获取数据列表接口<br/>
请求方法：get<br/>

资产数据： 192.168.0.33/omsv2/oms/report/report_list/assets<br/>
持仓数据： 192.168.0.33/omsv2/oms/report/report_list/position<br/>
委托数据： 192.168.0.33/omsv2/oms/report/report_list/entrust<br/>
成交数据： 192.168.0.33/omsv2/oms/report/report_list/deal<br/>

请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 取值 !! 说明
|-
|  security_type  || int || 1:股票，2:期货，3:回购  || 进入页面筛选条件(默认为1)
|-
| fund_manager || string || 基金 || 查询基金经理id. 支持多选逗号隔开
|-
| group_id || string || 基金 || 查询基金id. 支持多选逗号隔开
|-
| product_id || string || 交易单元 || 交易单元id
|-
| stock_id || int || 证券代码 || 股票id, 查询持仓，委托，成交时生效; is_mobile=1时，可支持传代码名称
|-
| query_stock_type || string || 1股票 2期货 3债券 4回购 5期权 6基金 7国债 8其他 9港股 10货币基金 || 高级查询证券类别,   持仓，委托，成交时生效 支持多选逗号隔开(高级查询，也就是点查询后弹框里的参数)
|-
| query_market || string || SZ 深A, SH沪A, HKSZ深港通,HKSH沪港通,YHJ银行间,CW场外,ZJ中金所,SQ上期所,DS大商所,ZS郑商所,BJ北交所,OT其他 || 查询交易市场, 持仓，委托，成交时生效.   支持多选逗号隔开
|-
| start || date ||  yyyy-mm-dd || 开始日期
|-
| end || date ||  yyyy-mm-dd || 结束日期
|-
| order || string||  enum(desc,asc) || desc降序，asc升序。默认asc升序
|-
| order_by || string ||  string || 默认为证券id，stock_id
|-
| page || int || 页码 || 默认为1
|-
| trade_direction || int ||  1:买入，2:卖出 || 注意:委托，成交有此参数
|-
| hold_direction || int ||  0:多头，1:空头 || 注意:此字段仅持仓期货查询有
|-
| is_mobile || int ||  0：pc端 1:移动端 || 默认0
|}


示例1(普通版)：<br/>
<pre>
请求：
CGI：http://localhost:32080/omsv2/oms/report/report_list/assets?division_stock=1&start=2017-09-07&end=2017-09-07
&query_stock_type=0,1,2,3,4,5,6,9,10,8&query_market=SZ,SH,HK,FT,CW&stock_id=&group_id=1500605,1500604

响应：
{
"code": 0,//0成功
"msg": "ok",//返回失败的错误提示
"data":"{*}" 
}

返回的数据列表字段详细说明：
资产：
name基金
account_name交易单元
unit_assets净资产
volume份额
market_position仓位
market_value持仓市值
stock_market_value股票市值
future_ensure_assets期货占用保证金
stock_market_ratio股票占总市值
future_market_ratio期货占总市值
future_ensure_ratio风险度
unit_asset单元净资产
weight持仓资产/单元净资产
usable0_cashT日可用资金
usable1_cashT+1日可用资金
enable_cash_hksh  沪港通可用余额
enable_cash_hksz  深港通可用余额
fund_asset基金资产
bond_asset债券资产
full_bond_asset债券资产(全价)
repurchase_asset回购资产
cash现金余额
//20180522新增
future_profit 期货盈亏
future_right 期货权益
future_margin_usable 期货保证金可用
future_margin_occupation 期货保证金占用
future_risk_degree 期货风险度
//20220209新增融资融券
margin_debt 融资负债
short_debt 融券负债
total_debt 负债总额
maintain_guarantee_ratio 维持担保比例
margin_usable 可用保证金
available_funds 买券还券可用资金
security_available_funds 买担保品可用资金
margin_enable_quota 融资可用额度
short_enable_quota 融券可用额度


持仓：
stock_code证券代码
stock_name证券名称
market_name证券市场
group_name持仓基金
account_name持仓交易单元
stock_flag持仓方向
stock_type证券类别
hold_volume持仓数量
market_value持仓市值
full_market_value持仓市值(全价)
market_position仓位
full_weight仓位(全价)
hold_cost总成本
earning浮动盈亏
earning_ratio盈亏率
latest_price最新价
currency币种
cost_price持仓成本

//20180522新增
hedge_flag 投保标志 
pre_settle_price 昨结算价
margin_occupation 保证金占用
today_close_profit 平仓盈亏
lastday_amount 昨仓
today_amount 今仓
stare_market_profit 盯市盈亏

委托：
entrust_stock_code证券代码
entrust_stock_name证券名称
market_name证券市场
group_name基金
base_name交易单元
bs_symbol_text买卖标志
entrust_volume委托数量
entrust_price委托价格
total_entrust_amount委托金额
deal_volume成交数量
deal_price成交均价
full_deal_price成交均价(全价)
deal_amount成交金额
full_deal_amount成交金额(全价)
cancel_volume已撤数量
exchange_rate参考汇率
entrust_at委托时间
vendor_status_text订单状态
quote_type_text报价方式
currency币种

//20180522新增
hedge_flag 投保标志  (投机/保值/套利)
hold_direction 持仓方向(多/空)

成交：
entrust_stock_code证券代码
entrust_stock_name证券名称
market_name证券市场
group_name基金
base_name交易单元
entrust_type_name买卖标志
deal_volume成交数量
deal_price成交均价
full_deal_price成交均价(全价)
deal_amount成交金额
full_deal_amount成交金额(全价)
dealed_at最新成交时间
currency币种

//20180522新增
hedge_flag 投保标志  (投机/保值/套利)
hold_direction 持仓方向(多/空)

</pre>

示例2(成交查询版)：<br/>
<pre>


</pre>

===数据导出===
使用说明：私募机构&信托 数据查询-数据导出接口<br/>
请求方法：get<br/>

资产导出： 192.168.0.33/omsv2/oms/report/download_report/assets<br/>
持仓导出： 192.168.0.33/omsv2/oms/report/download_report/position<br/>
委托导出： 192.168.0.33/omsv2/oms/report/download_report/entrust<br/>
成交导出： 192.168.0.33/omsv2/oms/report/download_report/deal<br/>
指令导出： 192.168.0.33/omsv2/oms/report/download_report/ins<br/>
指令汇总导出： 192.168.0.33/omsv2/oms/report/download_report/ins_summary （其余参数请参照GY指令汇总列表接口）<br/>

请求参数：(除以下参数外，还需携带上相对应的数据查询接口的参数)<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 取值 !! 说明
|-
| order || string || asc升序 desc降序 || 数据排序类型
|-
| order_by || string ||  || 数据排序字段key
|-
| field_sort || string ||  || 列排序信息，逗号隔开。每个值与数据列表接口返回的字段key一致。如果传空值则按后台默认顺序输出
|}



示例：<br/>
<pre>
请求：
http://localhost:32080/omsv2/oms/report/download_report/position?division_stock=1&page=1&order=&order_by=&
query_stock_type=0&query_market=SZ,SH,HK,FT,CW&stock_id=&group_id=1500605,1500604

响应：
{
"code": 0,//0成功
"msg": "ok",//返回失败的错误提示
"data":"{*}" 
}

 </pre>
===基金经理修改===
使用说明：修改基金经理<br/>
请求方法：post<br/>
接口地址：/omsv2/oms/report/set_manager_name
<br/>

请求参数:<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 取值 !! 说明
|-
| order_id || string ||  || 订单 id
|-
| fund_manager_id || string ||  || 基金经理id
|-
| fund_manager_name || string ||  || 基金经理name
|}



示例：<br/>
<pre>
请求：
http://42.159.94.59/omsv2/oms/report/set_manager_name

响应：
{
"code": 0,//0成功
"msg": "ok",//修改成功
"data":"" 
}

 </pre>

===TB2数据查询，基金投顾关联列表===
使用说明：数据查询条件，基金和投顾模式的关联列表<br/>
请求方法：get<br/>

示例：<br/>
<pre>
请求：
http://127.0.0.1:38080/oms/report/get_group_advisor_list

响应：
{
"code": 0,//0成功
"msg": "ok",//返回失败的错误提示
"data":"{ 
         group_id : 156
         group_name : 基金名称
         investment_advisor:{ 
                             1:投顾模式
                             2:投顾模式
                             ……
                             }
        }" 
         { 
         group_id : 156
         group_name : 基金名称
         investment_advisor:{ 
                             1:投顾模式
                             2:投顾模式
                             ……
                             }
        }" 
}

 </pre>
===资产查询 信托版===
CGI：/oms/report/report_list/asset_v2<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统条件  1 恒生 2 金证 3 IMS 4 迅投
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|query_market || string || 市场         'SZ' => '深A', 'SH' => '沪A', 'HKSH' => '沪股通', 'HKSZ' => '深港通', 'FUTURE' => '期货'
|-
|stock_id || string || 股票ID  000001.SZ
|-
|group_id || string || 基金ID 逗号分隔
|-
|product_id || string || 交易单元ID  逗号分隔
|-
|investment_advisor || string || 投顾模式
|-
|start || string ||开始日期 20170506
|-
|end || string ||结束时间 20170506
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>
{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "fund_name":"1号测试产品",
                "unit_name":"",
                "unit_asset":0,                //单元净资产
                "stock_asset":"785337.03000",   //股票资产
                "market_value":"785337.03000",    //持仓市值
                "weight":"0.118300",                    //仓位
                "cash":"8333419.46000",        
                "date":"2018-05-11",
                "usable0_cash":"0.000",     //T+0可用
                "usable1_cash":"0.000",      //T+1可用
                "fund_asset":"0.000",                //基金资产
                "bond_asset":"0.000",               //债券资产
                "full_bond_asset":"--",         //债券资产-全价
                "repurchase_asset":"0.00000",        //回购资产
                "stock_asset_ratio":"0.230000",     //股票占总市值
                "volume":"0.000000"    //份额
               "future_profit" : "1099291906.240000",                      //期货盈亏
               "future_right" : "1099989766.64",                                 //期货权益
               "future_margin_usable": 697860.4,                                    //期货保证金可用
               "future_margin_occupation" : "1099291906.240000"    //期货保证金占用
              "future_risk_degree"  : 0.86                                               //期货风险度
            }
        ],
        "data_page_html":""
    }
}




</pre>

===持仓查询 信托版===
CGI：/oms/report/report_list/position_v2<br/>
使用说明：信托版 数据查询-持仓查询<br/>
请求方法：GET<br/>

示例：<br/>
<pre>
{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "stock_id":"000001.SZ",
                "market":"深A",
                "stock_name":"平安银行",
                "fund_name":"1号测试产品",
                "unit_name":"22222",
                "hold_direction":0,      //0多头1空头
                "stock_type":"股票",     //证券类别
                "hold_volume":"2600.00",  //持仓数量
                "usable_volume":"123", // 可卖数量
                "market_value":"30290.00000",  //持仓市值
                "full_market_value":"0.00000",   //持仓市值全价
                "weight":0,     //仓位
                "full_weight":0,    //仓位-全价
                "cost_price":"11.52000",   //持仓成本
                "hold_cost":"29952.000",   //总成本
                "latest_price":"11.65000",   //最新价
                "profit_loss_amount":"338.00000",  //浮动盈亏
                "profit_loss_rate":"1.1285",           //盈亏率
                "currency":"RMB"          //币种
                "hedge_flag": "投机",                                   //投保标志 
                "pre_settle_price": 12012,                             //昨结算价
                "margin_occupation" : "2",                        //保证金占用
                 "today_close_profit": 242455,                   //平仓盈亏
                "lastday_amount": 100,                               //昨仓
               "today_amount": 100,                                //今仓
               "stare_market_profit":154565                //盯市盈亏
            }
        ],
        "collect":{
            "total_capital":24891628.9932,
            "total_market_value":8300284.9235,
            "total_stock_volume":740410,
            "total_market_ratio":0.33345687924914
        },
        "data_page_html":"<ul class="pagination"><li class="disabled"><span>«</span></li> <li class="active"><span>1</span></li><li><a href="/?page=2">2</a></li> <li><a href="/?page=2" rel="next">»</a></li></ul>"
    }
}
</pre>

===委托查询 信托版===
CGI：/oms/report/report_list/entrust_v2<br/>
使用说明：信托版 数据查询-委托查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统  1 恒生 2 金证 3 IMS 4 迅投
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|query_market || string || 市场         'SZ' => '深A', 'SH' => '沪A', 'HKSH' => '沪股通', 'HKSZ' => '深港通', 'FUTURE' => '期货'
|-
|stock_id || string || 股票ID  000001.SZ
|-
|start || string ||开始日期 20170506
|-
|end || string ||结束时间 20170506
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/oms/report/report_list_entrust_v2
响应：
{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "entrust_date":"20180424",
                "stock_id":"000005.SZ",
                "market":"深A",
                "stock_name":"世纪星源",
                "fund_name":"上海映雪投资",
                "unit_name":"缺省单元",
                "entrust_volume":"100",    //委托数量
                "entrust_price":3.64,         //委托价格
                "entrust_amount":364,     //委托金额
                "cancel_volume":"0",         //撤单数量
                "deal_volume":"0",           //成交数量
                "deal_price":0,              //成交均价
                "full_deal_price":0,          //成交均价-全价
                "deal_amount":0,             //成交金额
                "full_deal_amount":0,       //成交金额-全价
                "entrust_at":"2018-04-24 15:57:03",
                "deal_at":"--",                 //
                "security_type":0,           //
                "exchange_rate":"--",        //参考汇率
                "entrust_status":"废单",     //订单状态
                "entrust_type":"限价",       //报价方式
                "bs_symbol":"买入",     //买卖标志
                "currency":"RMB"      //币种
                "hedge_flag": "投机" //投保标志  (投机/保值/套利)
                "hold_direction": 多 //持仓方向(多/空)
            }
        ],
        "data_page_html":""
    },
    "timestamp":1525781320.0572,
    "timeConsumption":0.15046000480652,
    "requestStartTime":null
}



</pre>

===成交查询 信托版===
CGI：/oms/report/report_list/entrust_v2<br/>
使用说明：信托版 数据查询-成交查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统  1 恒生 2 金证 3 IMS 4 迅投
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|query_market || string || 市场         'SZ' => '深A', 'SH' => '沪A', 'HKSH' => '沪股通', 'HKSZ' => '深港通', 'FUTURE' => '期货'
|-
|stock_id || string || 股票ID  000001.SZ
|-
|start || string ||开始日期 20170506
|-
|end || string ||结束时间 20170506
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/oms/report/report_list_entrust_v2
响应：
"list":[
            {
                "format_order_id":"20180505", // 委托编号
                "deal_id":"123434", // 成交编号
                "date":"20180505",
                "stock_id":"000061.SZ",
                "market":"SZ",
                "market_name":"深A",
                "stock_name":"农 产 品",
                "fund_name":"私募产品1期",
                "unit_name":"私募产品1期-默认资产单元",
                "bs_symbol":"证券买入",
                "deal_volume":"1,000",
                "deal_price":"7.08",
                "deal_amount":"7,080.00",
                "full_deal_price":"0.00",
                "full_deal_amount":"0.00",
                "currency":0, //0RMB 1HKD 2USD
                "dealed_at":"2018-03-22 20:00:28",
                "security_type":0
                "hedge_flag":投机 //投保标志
                "hold_direction":多头／空头
            },
            {
                "order_id":"20180505",
                "deal_id":"123434",
                "date":"20180505",
                "stock_id":"000061.SZ",
                "market":"SZ",
                "market_name":"深A",
                "stock_name":"农 产 品",
                "fund_name":"私募产品1期",
                "unit_name":"私募产品1期-默认资产单元",
                "bs_symbol":"证券买入",
                "deal_volume":"1,000",
                "deal_price":"7.08",
                "deal_amount":"7,080.00",
                "full_deal_price":"0.00",
                "full_deal_amount":"0.00",
                "currency":0,
                "dealed_at":"2018-03-22 20:00:28",
                "security_type":0
                "hedge_flag":投机 //投保标志
                "hold_direction":多头／空头
            },
</pre>

===外贸信托版数据查询===
====资产查询====
CGI：oms/report/report_list/assets<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|start || string ||开始日期 20170506
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/assets?start=2018-09-29&group_id=167&query_channel=&investment_advisor=&query_sec_name=

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "account_name":"0003测试1现货测试单元",  交易单元
                "name":"前端测试1",                    基金
                "unit_asset":--,                      单元净资产
                "volume":"0.0000",                    份额
                "weight":"0.118300",                  仓位
                "cash":"8333419.46000",               现金余额         
                "usable0_cash":"0.000",               T日可用资金(场内)
                "usable0_cash_outer":"0.000",               T日可用资金(场外)
                "usable1_cash":"0.000",               T+1日可用
                "fund_asset":"0.000",                 基金资产
                "bond_asset":"0.000",                 债券资产
                "market_value":"785337.03000",        持仓市值
                "full_bond_asset":"--",               债券资产-全价
                "repurchase_asset":"0.00000",         回购资产
                "date":"2018-05-11",                  日期
                "future_profit" : "1099291906.240000",期货盈亏
                "stock_market_value":'--'             股票市值
                "stock_asset_ratio":"0.230000",       股票占总市值
                "future_right" : "1099989766.64",     期货权益
                "future_margin_usable": 697860.4,     期货保证金可用
                "future_margin_occupation" : "106.2"  期货保证金占用
                "future_risk_degree"  : 0.86          期货风险度
            }
        ],
        "data_page_html":""
    }
}




</pre>

====持仓查询====
CGI：oms/report/report_list/position<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|security_type || int ||  1:股票，2:期货，3:回购	进入页面筛选条件(默认为1)
|-
|query_channel || string ||  系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|investment_advisor || string || 投顾模式
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|query_market|| string || 交易市场 SZ 深A, SH沪A, HKSZ深港通,HKSH沪港通,YHJ银行间,CW场外,ZJ中金所,SQ上期所,DS大商所,ZS郑商所,BJ北交所,OT其他 【注意：此查询条件仅现货有】
|-
|hold_direction|| int || 持仓方向 0:多头-买入，1:空头-卖出 【注意：此查询条件仅期货有】
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/position?start=2018-09-29&end=2018-09-29&group_id=154&query_channel=&investment_advisor=&security_type=1&query_sec_name=&query_market=SZ&stock_id=000001.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "account_name": "0003测试1期货测试单元", ／／交易单元
                "group_name": "xc-test1", ／／所属基金
                "stock_id": "000001.SZ",  ／／证券代码                 
                "stock_code": "000001",／／证券代码
                "market_name": "深A",／／交易市场
                "stock_name": "平安银行",／／证券名称
                "stock_flag": "--",／／持仓方向
                "busi_type": "沪股通",   //业务类别名称
                "stock_type": "股票",／／证券类别名称
                "hold_volume": "300",／／持仓数量
                "market_value": "1,182",／／持仓市值
                "market_position": "--",／／仓位
                "cost_price": 0,／／持仓成本
                "hold_cost": "0",／／总成本
                "latest_price": "9.240",／／最新价
                "earning": "1,182",／／浮动盈亏
                "earning_ratio": "-22.88%",／／盈亏率
                "hedge_flag": "--",／／投保标志
                "pre_settle_price": "--",／／昨结算价
                "stare_market_profit": "0",／／盯市盈亏
                "today_close_profit": "0",／／平仓盈亏
                "margin_occupation": "--",／／保证金占用
                "today_amount": "--",／／今仓
                "lastday_amount": "--"／／昨仓
                "date":"2018-10-02"
            }
        ],
        "collect"{
              "count": "4,718",//数据总数
              "total": {
                   "deal_volume": "9,434,500",//成交总数量
                   "deal_amount": "943,508,894",//成交总金额
                   "deal_price": "100.0062",//成交总均价
                   "dealed_at": "01-04 - 12-29"//成交总日期
               }
         }
        "data_page_html":""
    }
}




</pre>

====委托查询====
CGI：oms/report/report_list/entrust<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|investment_advisor || string || 投顾模式
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|trade_direction|| string || 买卖方向 1:买，2:卖
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/entrust?start=2018-09-29&end=2018-09-29&group_id=154&query_channel=&investment_advisor=&query_sec_name=&query_market=&stock_id=000001.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "stock_id": "000001.SZ",／／证券代码
                "date": "20180929",
                "market": "SZ",／／交易市场
                "entrust_stock_code": "000001",
                "market_name": "深A",／／交易市场
                "entrust_stock_name": "平安银行",／／证券名称
                "group_name": "前端测试1",／／基金
                "base_name": "篮子测试1号产品 篮子测试1号产品主资产单元",／／交易单元
                "entrust_model_name": "限价",
                "entrust_type_name": "证券买入",
                "entrust_volume": "10,000",／／委托数量
                "entrust_price": "100.011",／／委托价格
                "total_entrust_amount": "1,000,110",／／委托金额
                "cancel_volume": 0,／／已撤数量
                "deal_volume": "2,000",／／成交数量
                "deal_price": "100.011",／／成交均价
                "full_deal_price": 100.011,／／成交均价全价
                "deal_amount": "200,022",／／成交金额
                "full_deal_amount": 200022,／／成交金额全价
                "currency": "RMB",／／币种
                "entrust_at": "2018-07-26 09:37:45",／／委托日期
                "deal_at": "2018-09-29 17:52:33",
                "exchange_rate": "--",／／参考汇率
                "vendor_status_text": "已成",／／订单状态
                "quote_type_text": "限价",／／报价方式
                "bs_symbol_text": "证券买入",／／买卖方向
                "hedge_flag": "--",／／投保标志
                "hold_direction": "--",／／多空
                "security_type_name": "股票"／／证券类别
            }
        ],
        "data_page_html":""
    }
}




</pre>

====成交查询====
CGI：oms/report/report_list/deal<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|investment_advisor || string || 投顾模式
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|trade_direction|| string || 买卖方向 1:买，2:卖
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|is_summary || int || 是否按成交查询
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/deal?start=2018-09-29&end=2018-09-29&group_id=167&query_channel=&investment_advisor=&query_sec_name=&query_market=&stock_id=000683.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "stock_id": "000683.SZ",／／证券代码
                "stock_name": "远兴能源",／／证券名称
                "market": "FT",
                "entrust_stock_code": "000683.SZ",
                "market_name": "中金所",／／交易市场
                "sec_type": "期货",／／证券类别
                "group_name": "前端测试1",／／所属基金
                "base_name": "篮子测试1号产品 篮子测试1号产品主资产单元",／／交易单元
                "bs_symbol": "买入",／／买卖标志
                "deal_volume": "2,000",／／成交数量
                "deal_price": 100.011,／／成交均价
                "full_deal_amount": "200022",
                "dealed_at": "2017-06-28 18:22:18",／／成交时间
                "hold_direction": "多头",／／多空
                "currency": "RMB",／／币种
                "hedge_flag": "投保标志测试",／／投保标志
                "full_deal_price": "100.011",
                "deal_amount": "200,022"／／成交金额
            }
        ],
        "data_page_html":""
    }
}
</pre>


===TB1数据查询最新版===
====资产查询====
CGI：oms/report/report_list/assets<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 【仅厦门信托生效】券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|start || string ||开始日期 20170506
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 【涉及导出的字段以及字段顺序】字段行排序，按照顺序逗号隔开返回即可
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/assets?start=2018-09-29&group_id=167&query_channel=&investment_advisor=&query_sec_name=

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "account_name":"0003测试1现货测试单元",  交易单元
                "name":"前端测试1",                    基金
                "unit_asset":--,                      单元净资产
                "volume":"0.0000",                    份额
                "weight":"0.118300",                  仓位
                "cash":"8333419.46000",               现金余额         
                "usable0_cash":"0.000",               T日可用资金(场内)
                "usable0_cash_outer":"0.000",              T日可用资金(场外)
                "usable1_cash":"0.000",               T+1日可用
                "fund_asset":"0.000",                 基金资产
                "bond_asset":"0.000",                 债券资产
                "market_value":"785337.03000",        持仓市值
                "full_bond_asset":"--",               债券资产-全价
                "repurchase_asset":"0.00000",         回购资产
                "date":"2018-05-11",                  日期
                "future_profit" : "1099291906.240000",期货盈亏
                "stock_market_value":'--'             股票市值
                "stock_asset_ratio":"0.230000",       股票占总市值
                "future_right" : "1099989766.64",     期货权益
                "future_margin_usable": 697860.4,     期货保证金可用
                "future_margin_occupation" : "106.2",  期货保证金占用
                "future_risk_degree"  : 0.86,          期货风险度
                "group_net_value": 2.2056352163131 基金净值
            }
        ],
        "data_page_html":""
    }
}




</pre>

====私募版持仓查询====
CGI：oms/report/report_list/position<br/>
使用说明：信托版 数据查询-持仓查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|security_type || int ||  1:股票，2:期货，3:回购	进入页面筛选条件(默认为1)
|-
|query_channel || string ||  【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 【仅厦门信托生效】券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|query_market|| string || 交易市场，逗号隔开  1:沪A 2:深A 3:沪港通 4:深港通 5中金所 6大商所 7郑商所 8上期所 9银行间 11北交所(新三板) 12场外 13沪股通 14深股通 15沪B 16深B 17港股 18美股 19沪A1 20深A1 0其他    【支持股票&期货页签】
|-
|query_stock_type|| string || 证券类别，逗号隔开  1股票 2期货(其他) 3债券(除国债) 4回购 5期权 6基金(其他) 7国债 8其他 9港股 10货币基金 11美股 12债券型基金 13股票型基金 14混合型基金 15股指期货 16商品期货   【支持股票页签】
|-
|query_busi_type|| string || 业务类别，逗号隔开 1ADR 2A股 3B股 4H股 5QDII(港股) 6QDII(美股) 7QFII/RQFII 8港股通 9沪股通 10美股 11其他 12其他股票 13深股通 14收益互换CFD/P NOTE(AB股) 15收益互换CFD/P NOTE(港股) 16收益互换TRS(港股) 17收益互换TRS(美股) 18收益互换TRS(其他) 19收益互换(美股) 20收益互换(其他) 21QDII(其他)  【支持股票页签】
|-
|hold_direction|| int || 持仓方向 0:多头-买入，1:空头-卖出 【注意：此查询条件仅期货有】
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|combine_key || int || 汇总维度 默认0无汇总 1后台根据不同security_type进行不同维度汇总
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

无汇总数据
http://127.0.0.1:38080/oms/report/report_list/position?start=2018-09-29&end=2018-09-29&group_id=154&query_channel=&investment_advisor=&security_type=1&query_sec_name=&query_market=SZ&stock_id=000001.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "account_name": "0003测试1期货测试单元", ／／交易单元
                "group_name": "xc-test1", ／／所属基金
                "stock_id": "000001.SZ",  ／／证券代码                 
                "relate_stock_id": "000001.SZ",  ／／关联正股               
                "market": "SZ",／／交易市场
                "stock_code": "000001",／／证券代码
                "market_name": "深A",／／交易市场
                "stock_name": "平安银行",／／证券名称
                "stock_flag": "--",／／持仓方向
                "sec_type": 1,
                "stock_type": "股票",／／证券类别
                "hold_volume": "300",／／持仓数量
                "usable_volume": "300",／／可用数量
                "market_value": "1,182",／／持仓市值
                "full_market_value": "--",／／持仓市值全价
                "market_position": "--",／／仓位
                "full_weight": "--",／／仓位全价
                "cost_price": 0,／／持仓成本
                "hold_cost": "0",／／总成本
                "latest_price": "9.240",／／最新价
                "earning": "1,182",／／浮动盈亏
                "earning_ratio": "-22.88%",／／盈亏率
                "currency": 0,／／币种
                "hedge_flag": "--",／／投保标志
                "pre_settle_price": "--",／／昨结算价
                "stare_market_profit": "0",／／盯市盈亏
                "today_close_profit": "0",／／平仓盈亏
                "margin_occupation": "--",／／保证金占用
                "today_amount": "--",／／今仓
                "lastday_amount": "--"／／昨仓
                "date":"2018-10-02"
            }
        ],
        "data_page_html":""
    }
}

有汇总数据
https://114.55.219.85/omsv2/oms/report/report_list/position?security_type=1&group_id=620%2C649%2C703%2C600%2C592%2C648&hold_direction=&product_id=&query_market=&query_stock_type=&query_busi_type=&stock_id=&start=2021-07-21&end=2021-07-21&order=desc&order_by=date&combine_key=1&page=1

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "date":"2021-07-21",
                "account_name":"--",
                "group_name":"hs期货交易单元",
                "stock_id":"000001.SZ",
                "relate_stock_id":"",
                "stock_name":"平安银行",
                "usable_volume":"2,013",
                "market_name":"深A",
                "stock_type":"股票",
                "busi_type":"A股",
                "busi_type_no":2,
                "hold_volume":"2,013",
                "market_value":"47,929.5600",
                "raw_id":"000001.SZ",
                "market_position":"99.9962",
                "cost_price":"1.000",
                "hold_cost":"2,013",
                "latest_price":"--",
                "earning":"0.0000",
                "earning_ratio":"0.0000",
                "stock_flag":"多头",
                "volume_adjust":"0",
                "usable_volume_adjust":"0",
                "cost_adjust":"0.0000",
                "target_cost_adjust":"0",
                "buy_volume":"0.000",
                "sell_volume":"0.000",
                "total_fee":"0.0000",
                "sell_frozen_volume":"0.00",
                "frozen_volume":"0.00",
                "given_amount":"0.000",
                "net_market_value":"--",
                "full_market_value":"--",
                "exchange_rate":"0.0000",
                "full_weight":"--",
                "combine_key":"000001.SZ|hs期货交易单元",
                "sub_data":[
                    {
                        "date":"2021-07-21",
                        "account_name":"hs期货测试交易单元",
                        "group_name":"hs期货交易单元",
                        "stock_id":"000001.SZ",
                        "relate_stock_id":"",
                        "stock_name":"平安银行",
                        "usable_volume":"1,005",
                        "market_name":"深A",
                        "stock_type":"股票",
                        "busi_type":"A股",
                        "busi_type_no":2,
                        "hold_volume":"1,005",
                        "market_value":"23,919.0000",
                        "raw_id":"000001.SZ",
                        "market_position":"49.9026",
                        "cost_price":"1.000",
                        "hold_cost":"1,005.000",
                        "latest_price":"23.800",
                        "earning":"0.0000",
                        "earning_ratio":"--",
                        "stock_flag":"多头",
                        "volume_adjust":"0",
                        "usable_volume_adjust":"0",
                        "cost_adjust":"0.0000",
                        "target_cost_adjust":"0",
                        "buy_volume":"0.000",
                        "sell_volume":"0.000",
                        "total_fee":"0.0000",
                        "sell_frozen_volume":"0.00",
                        "frozen_volume":"0.00",
                        "given_amount":"0.000",
                        "net_market_value":"--",
                        "full_market_value":"--",
                        "exchange_rate":"0.0000",
                        "full_weight":"--"
                    },
                    {
                        "date":"2021-07-21",
                        "account_name":"期货测试交易单元",
                        "group_name":"hs期货交易单元",
                        "stock_id":"000001.SZ",
                        "relate_stock_id":"",
                        "stock_name":"平安银行",
                        "usable_volume":"1,008",
                        "market_name":"深A",
                        "stock_type":"股票",
                        "busi_type":"A股",
                        "busi_type_no":2,
                        "hold_volume":"1,008",
                        "market_value":"24,010.5600",
                        "raw_id":"000001.SZ",
                        "market_position":"50.0936",
                        "cost_price":"1.000",
                        "hold_cost":"1,008.000",
                        "latest_price":"23.820",
                        "earning":"0.0000",
                        "earning_ratio":"--",
                        "stock_flag":"多头",
                        "volume_adjust":"0",
                        "usable_volume_adjust":"0",
                        "cost_adjust":"0.0000",
                        "target_cost_adjust":"0",
                        "buy_volume":"0.000",
                        "sell_volume":"0.000",
                        "total_fee":"0.0000",
                        "sell_frozen_volume":"0.00",
                        "frozen_volume":"0.00",
                        "given_amount":"0.000",
                        "net_market_value":"--",
                        "full_market_value":"--",
                        "exchange_rate":"0.0000",
                        "full_weight":"--"
                    }
                ]
            },
        "total_count":243,
        "collect":{
            "total_market_value":"4385316490.32",
            "total_stock_volume":"191396115.00",
            "total_market_ratio":1.6738375406737
        },
        "data_page_html":"<ul class=\"pagination\"><li class=\"disabled\"><span>«<\/span><\/li> <li class=\"active\"><span>1<\/span><\/li><li><a href=\"\/?page=2\">2<\/a><\/li><li><a href=\"\/?page=3\">3<\/a><\/li><li><a href=\"\/?page=4\">4<\/a><\/li><li><a href=\"\/?page=5\">5<\/a><\/li> <li><a href=\"\/?page=2\" rel=\"next\">»<\/a><\/li><\/ul>"
    },
    "timestamp":1626857154.8145,
    "timeConsumption":0.72196412086487,
    "requestStartTime":"1626857153000",
    "input":{
        "security_type":"1",
        "group_id":"620,649,703,600,592,648",
        "hold_direction":"",
        "product_id":"",
        "query_market":"",
        "query_stock_type":"",
        "query_busi_type":"",
        "stock_id":"",
        "start":"2021-07-21",
        "end":"2021-07-21",
        "order":"desc",
        "order_by":"date",
        "combine_key":"1",
        "page":"1"
    }
}



</pre>

====国债逆回购查询====
CGI：oms/report/report_list/position<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|security_type || int || 3:回购	
|-
|group_id || string || 基金ID
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|query_market|| string || 交易市场 SZ 深A, SH沪A, HKSZ深港通,HKSH沪港通,YHJ银行间,CW场外,ZJ中金所,SQ上期所,DS大商所,ZS郑商所,BJ北交所,OT其他 【注意：此查询条件仅现货有】
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/position?start=2018-09-29&end=2018-09-29&group_id=154&query_channel=&investment_advisor=&security_type=3&query_sec_name=&query_market=SZ&stock_id=000001.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                    "id": 1,
                    "product_id": 25237,                            
                    "stock_id": "204001.SH",            //证券代码                   
                    "date": 20190522,                      //交易日期
                    "stock_name": "   GC001",          //证券名称
                    "bs_symbol": "融券回购",                           ///委托方向
                    "amount": "3000.000",                    //成交数量
                    "balance": "300000.000",               //成交金额
                    "cost_price": "2.79",                       //持仓成本
                    "ret_date": 20190523,               //购回日期
                    "ret_balance": "300005.000",               //购回金额
                    "market": 1, 
                    "market_name": 沪A,                      //市场名称
                    "created_at": "2019-05-22 11:02:58",
                    "updated_at": "2019-05-22 12:21:09", 
                    "account_name": "中兴建投恒生",            //交易单元
                    "group_name": "中信建投恒生"                //所属基金
            }
        ],
        "data_page_html":""
    }
}




</pre>

====委托查询====
CGI：oms/report/report_list/entrust<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 【仅厦门信托生效】券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|trade_direction|| string || 买卖方向 1:买，2:卖
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/entrust?start=2018-09-29&end=2018-09-29&group_id=154&query_channel=&investment_advisor=&query_sec_name=&query_market=&stock_id=000001.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "stock_id": "000001.SZ",／／证券代码
                "date": "20180929",
                "market": "SZ",／／交易市场
                "entrust_stock_code": "000001",
                "market_name": "深A",／／交易市场
                "entrust_stock_name": "平安银行",／／证券名称
                "group_name": "前端测试1",／／基金
                "base_name": "篮子测试1号产品 篮子测试1号产品主资产单元",／／交易单元
                "entrust_model_name": "限价",
                "entrust_type_name": "证券买入",
                "entrust_volume": "10,000",／／委托数量
                "entrust_price": "100.011",／／委托价格
                "total_entrust_amount": "1,000,110",／／委托金额
                "cancel_volume": 0,／／已撤数量
                "deal_volume": "2,000",／／成交数量
                "deal_price": "100.011",／／成交均价
                "full_deal_price": 100.011,／／成交均价全价
                "deal_amount": "200,022",／／成交金额
                "full_deal_amount": 200022,／／成交金额全价
                "currency": "RMB",／／币种
                "entrust_at": "2018-07-26 09:37:45",／／委托日期
                "deal_at": "2018-09-29 17:52:33",
                "exchange_rate": "--",／／参考汇率
                "vendor_status_text": "已成",／／订单状态
                "quote_type_text": "限价",／／报价方式
                "bs_symbol_text": "证券买入",／／买卖方向
                "hedge_flag": "--",／／投保标志
                "hold_direction": "--",／／多空
                "security_type_name": "股票"／／证券类别
            }
        ],
        "collect": {
            "count": 10,                  //数据条数
            "total": 20000,               //委托数量总数
            "sum_entrust_price": 2000220     //委托金额总数
        },
        "data_page_html":""
    }
}




</pre>

====委托查询 汇总版====
CGI：oms/report/report_list/entrust<br/>
使用说明：数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 【仅厦门信托生效】券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|trade_direction|| string || 买卖方向 1:买，2:卖
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|collect_type || int || 1-委托单笔、2-委托合笔、3-证券代码+委托方向、4-基金+证券代码+委托方向、5-基金+证券代码+委托方向+委托日期、6-基金+单元+证券代码+委托方向+委托日期; 注：1的话直接走普通模式，不走该接口
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/entrust?start=2018-09-29&end=2018-09-29&group_id=154&query_channel=&investment_advisor=&query_sec_name=&query_market=&stock_id=000001.SZ&collect_type=3

{
	"code": 0,
	"msg": "ok",
	"data": {
		"list": [{
			"collect": {
				"stock_id": "000839.SZ",
				"entrust_stock_name": "中信国安",
				"ins_num": "",
				"market_name": "深A",
				"group_name": null,
				"base_name": null,
				"entrust_type_name": "卖出",
				"hold_direction": "--",
				"hedge_flag": "--",
				"entrust_volume": 3800,
				"total_entrust_amount": 14288,
				"entrust_price": "3.760",
				"deal_volume": 1618,
				"deal_price": "--",
				"cancel_volume": 2991,
				"quote_type_text": "限价",
				"vendor_status_text": "--",
				"exchange_rate": "--",
				"date": "20200103",
				"currency": "RMB",
				"origin_from": "系统外",
                                "detail": [{
					"stock_id": "000839.SZ",
					"date": "20200103",
					"ins_num": "",
					"market": "SZ",
					"entrust_stock_code": "000839",
					"market_name": "深A",
					"entrust_stock_name": "中信国安",
					"product_id": 10910,
					"group_id": null,
					"group_name": null,
					"base_name": null,
					"entrust_model_name": "限价",
					"entrust_type_name": "卖出",
					"entrust_volume": "100",
					"entrust_price": "3.760",
					"total_entrust_amount": "376.0000",
					"cancel_volume": 0,
					"deal_volume": "100",
					"deal_price": "3.7600",
					"full_deal_price": "--",
					"deal_amount": "376.0000",
					"full_deal_amount": "0",
					"currency": "RMB",
					"entrust_at": "2020-01-03 13:08:36",
					"deal_at": "2020-12-04 10:42:57",
					"exchange_rate": "--",
					"vendor_status_text": "已成",
					"quote_type_text": "限价",
					"bs_symbol_text": "卖出",
					"hedge_flag": "--",
					"hold_direction": "--",
					"security_type_name": "股票",
					"origin_from": "系统外"
				},
				{
					"stock_id": "000839.SZ",
					"date": "20200103",
					"ins_num": "",
					"market": "SZ",
					"entrust_stock_code": "000839",
					"market_name": "深A",
					"entrust_stock_name": "中信国安",
					"product_id": 10910,
					"group_id": null,
					"group_name": null,
					"base_name": null,
					"entrust_model_name": "限价",
					"entrust_type_name": "卖出",
					"entrust_volume": "100",
					"entrust_price": "3.760",
					"total_entrust_amount": "376.0000",
					"cancel_volume": 0,
					"deal_volume": "100",
					"deal_price": "3.7600",
					"full_deal_price": "--",
					"deal_amount": "376.0000",
					"full_deal_amount": "0",
					"currency": "RMB",
					"entrust_at": "2020-01-03 13:08:25",
					"deal_at": "2020-12-04 10:42:57",
					"exchange_rate": "--",
					"vendor_status_text": "已成",
					"quote_type_text": "限价",
					"bs_symbol_text": "卖出",
					"hedge_flag": "--",
					"hold_direction": "--",
					"security_type_name": "股票",
					"origin_from": "系统外"
				}
			]
			}
		}],
		"collect": {
			"count": "9",
			"total": "",
			"sum_entrust_price": ""
		},
		"data_page_html": ""
	},
	"timestamp": 1625820284.6594,
	"timeConsumption": 1.4780070781708,
	"requestStartTime": null,
	"input": {
		"product_id": "10910",
		"query_market": "",
		"query_stock_type": "",
		"stock_id": "",
		"division_stock": "1",
		"start": "2020-01-03",
		"end": "2020-01-03",
		"page": "1",
		"order": "desc",
		"order_by": "entrust_at"
	}
}

</pre>

====成交查询====
CGI：oms/report/report_list/deal<br/>
使用说明：信托版 数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  【仅厦门信托需要】系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 【仅厦门信托生效】券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|trade_direction|| string || 买卖方向 1:买，2:卖
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|is_summary || int || 是否按代码汇总。 0不需要汇总，1汇总 h5不需要传，pc需要传 
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/deal?start=2018-09-29&end=2018-09-29&group_id=167&query_channel=&investment_advisor=&query_sec_name=&query_market=&stock_id=000683.SZ

{
    "code":0,
    "msg":"ok",
    "data":{
        "list":[
            {
                "stock_id": "000683.SZ",／／证券代码
                "stock_name": "远兴能源",／／证券名称
                "market": "FT",
                "entrust_stock_code": "000683.SZ",
                "market_name": "中金所",／／交易市场
                "sec_type": "期货",／／证券类别
                "group_name": "前端测试1",／／所属基金
                "base_name": "篮子测试1号产品 篮子测试1号产品主资产单元",／／交易单元
                "bs_symbol": "买入",／／买卖标志
                "deal_volume": "2,000",／／成交数量
                "deal_price": 100.011,／／成交均价
                "full_deal_amount": "200022",
                "dealed_at": "2017-06-28 18:22:18",／／成交时间
                "hold_direction": "多头",／／多空
                "currency": "RMB",／／币种
                "hedge_flag": "投保标志测试",／／投保标志
                "full_deal_price": "100.011",
                "deal_amount": "200,022"／／成交金额
                "ins_id":8983 //迅策系统指令id
            }
        ],
        "collect"{
              "count": "4,718",//数据总数
              "total": {
                   "deal_volume": "9,434,500",//成交总数量
                   "deal_amount": "943,508,894",//成交总金额
                   "deal_price": "100.0062",//成交总均价
                   "dealed_at": "01-04 - 12-29"//成交总日期
               }
         }
        "data_page_html":"",
        "fund_manager_tips": true //前端提示是否需要修改基金经理
    },
}
</pre>

====成交查询 汇总版====
CGI：oms/report/report_list/deal<br/>
使用说明：数据查询-资产查询<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|query_channel || string ||  系统 0:通达信，1:恒生，2:金证，3:ims，4:讯投，5:O32,6:华润信托，7:宽瑞柜台，100:ctp期货，11:铭创，12:投资赢家。多选情况下，逗号拼接分隔。(不选默认为全选)
|-
|query_sec_name || string || 券商名  直接中文查询对应
|-
|group_id || string || 基金ID
|-
|investment_advisor || string || 投顾模式
|-
|start || string || 开始日期 20170506
|-
|end|| string || 结束日期 20170506
|-
|stock_id|| string || 股票证券代码／期货合约代码
|-
|trade_direction|| string || 买卖方向 1:买，2:卖
|-
|order || string || 排序说明desc/asc,降序/升序
|-
|order_by || string || 排序按照此字段
|-
|field_sort || string || 字段行排序，按照顺序逗号隔开返回即可
|-
|is_summary || int || 是否按成交查询
|-
|collect_type || int || 2-证券代码、3-证券代码+委托方向、4-基金+证券代码+委托方向、5-基金+证券代码+委托方向+成交日期、6-基金+单元+证券代码+委托方向+成交日期. 注：1的话就不用请求该接口，直接请求普通模式
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：
<pre>

http://127.0.0.1:38080/oms/report/report_list/deal?start=2018-09-29&end=2018-09-29&group_id=167&query_channel=&investment_advisor=&query_sec_name=&query_market=&stock_id=000683.SZ&collect_type=2

{
	"code": 0,
	"msg": "ok",
	"data": {
		"list": [{
			"collect": {
				"format_order_id": "混合",
				"deal_id": "共[2]条",
				"stock_id": "00027.HKSH",
				"stock_name": "银河娱乐",
				"market_name": "沪港通",
				"group_name": null,
				"base_name": null,
				"sec_type": "港股",
				"fund_manager_name": "",
				"bs_symbol": "买入",
				"hold_direction": "--",
				"hedge_flag": "--",
				"deal_amount": 56864.964,
				"deal_amount_origin": 62270,
				"deal_volume": 1300,
				"dealed_at": "2020-04-21 13:55:36",
				"origin_from": "系统外",
				"deal_price": 47.9,
				"deal_price_cny": 43.74228,
                                "detail": [{
					"id": 335,
					"stock_id": "00027.HKSH",
					"stock_name": "银河娱乐",
					"product_id": 10797,
					"market": "HKSH",
					"entrust_stock_code": "00027",
					"market_name": "沪港通",
					"sec_type": "港股",
					"group_id": null,
					"group_name": null,
					"base_name": null,
					"bs_symbol": "买入",
					"deal_volume": "1,200",
					"deal_price": "47.9000",
					"deal_price_cny": "43.7423",
					"full_deal_amount": "57480",
					"deal_date": "20200421",
					"dealed_at": "2020-04-21 13:55:36",
					"hold_direction": "--",
					"currency": "HKD",
					"hedge_flag": "--",
					"full_deal_price": "47.9",
					"deal_amount": "52,490.7360",
					"deal_amount_origin": "57,480.0000",
					"fund_manager_id": -1,
					"fund_manager_name": "",
					"order_id": "262975-480939-20181123",
					"format_order_id": "480939",
					"deal_id": "2433614",
					"ins_id": -1,
					"origin_from": "系统外"
				},
				{
					"id": 338,
					"stock_id": "00027.HKSH",
					"stock_name": "银河娱乐",
					"product_id": 10797,
					"market": "HKSH",
					"entrust_stock_code": "00027",
					"market_name": "沪港通",
					"sec_type": "港股",
					"group_id": null,
					"group_name": null,
					"base_name": null,
					"bs_symbol": "买入",
					"deal_volume": "100",
					"deal_price": "47.9000",
					"deal_price_cny": "43.7423",
					"full_deal_amount": "4790",
					"deal_date": "20200421",
					"dealed_at": "2020-04-21 13:55:36",
					"hold_direction": "--",
					"currency": "HKD",
					"hedge_flag": "--",
					"full_deal_price": "47.9",
					"deal_amount": "4,374.2280",
					"deal_amount_origin": "4,790.0000",
					"fund_manager_id": -1,
					"fund_manager_name": "",
					"order_id": "262975-481274-20181123",
					"format_order_id": "481274",
					"deal_id": "2433611",
					"ins_id": -1,
					"origin_from": "系统外"
				}
			]
			}
		}],
		"collect": {
			"count": 11,
			"total": {
				"deal_volume": "15,000",
				"deal_amount": "593,773.28",
				"deal_price": "43.0013",
				"deal_amount_origin": "645,020",
				"dealed_at": "04-21 - 04-21",
				"deal_price_cny": "0"
			}
		},
		"data_page_html": "",
		"fund_manager_tips": true
	},
	"timestamp": 1625818565.1095,
	"timeConsumption": 0.23541688919067,
	"requestStartTime": null,
	"input": {
		"group_id": "",
		"trade_direction": "",
		"product_id": "",
		"query_market": "",
		"query_stock_type": "",
		"stock_id": "",
		"division_stock": "1",
		"start": "2020-04-21",
		"end": "2020-04-21",
		"page": "1",
		"is_summary": "0",
		"order": "desc",
		"order_by": "dealed_at"
	}
}
</pre>

==资产管理==
===证券代码模糊匹配===
CGI：/portfolio/adjust/code_quick_query<br/>
使用说明：用于资产管理-证券调整时，输入证券代码的模糊匹配，返回对应选择市场的匹配数据。最多十条<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|code|| string ||代码匹配
|-
|market|| int ||交易市场，1沪深A，3沪港通，4深港通，13沪股通，14深股通，17港股，18美股，19沪A1，20深A1
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/portfolio/adjust/code_quick_query?code=222
响应：
{
    "code":0,
    "msg":"",
    "data":[
        {
            "stock_id":"222111.SZ",
            "stock_name":"omygod",
            "market":19,           //市场枚举 1:沪A 2:深A 3:沪港通 4:深港通 5中金所 6大商所 7郑商所 8上期所 9银行间 11北交所(新三板) 12场外 13沪股通 14深股通 15沪B 16深B 17港股 18美股 19沪A1 20深A1 0其他
            "sec_type":10,       //证券类别枚举    1股票 2期货(其他) 3债券(除国债) 4回购 5期权 6基金(其他) 7国债 8其他 9港股 10货币基金 11美股 12债券型基金 13股票型基金 14混合型基金 15股指期货 16商品期货
            "is_mms":0,           //是否行情源数据 0否1是
            "relate_stock_id":"000001.SZ",     //is_mms=0时，有该值，标示对应的维护正股代码
            "relate_stock_name":"平安银行"     //is_mms=0时，有该值，标示对应的维护正股名称
        },
        {
            "stock_id":"105222.SZ",
            "stock_name":"广西1901",
            "market":2,
            "sec_type":7,
            "is_mms":1
        },
        {
            "stock_id":"106222.SZ",
            "stock_name":"海南1708",
            "market":2,
            "sec_type":7,
            "is_mms":1
        },
        {
            "stock_id":"107222.SZ",
            "stock_name":"四川1616",
            "market":2,
            "sec_type":7,
            "is_mms":1
        },
        {
            "stock_id":"116222.SZ",
            "stock_name":"远东委C",
            "market":2,
            "sec_type":3,
            "is_mms":1
        },
        {
            "stock_id":"127222.SH",
            "stock_name":"PR建湖债",
            "market":1,
            "sec_type":3,
            "is_mms":1
        },
        {
            "stock_id":"130222.SH",
            "stock_name":"15广东03",
            "market":1,
            "sec_type":7,
            "is_mms":1
        },
        {
            "stock_id":"136222.SH",
            "stock_name":"16疏浚01",
            "market":1,
            "sec_type":3,
            "is_mms":1
        },
        {
            "stock_id":"139222.SH",
            "stock_name":"16鲁经投",
            "market":1,
            "sec_type":3,
            "is_mms":1
        },
        {
            "stock_id":"140222.SH",
            "stock_name":"16四川26",
            "market":1,
            "sec_type":7,
            "is_mms":1
        }
    ]
}


</pre>

===校验信息获取===
CGI：/portfolio/adjust/pre_check_info<br/>
使用说明：用于资产管理中，前端必要校验信息的获取<br/>
type=1 返回对应product_id的可用资金数据信息<br/>
type=2 返回对应product_id stock_id的各条持仓的可用数量及总成本信息 如果没传product_id，则直接返回持仓数总和<br/>
详见下面示例<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|type|| int || 1资金调整 2证券调整
|-
|product_id|| int ||交易单元id
|-
|stock_id|| string ||证券id
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
（用于资产调整减少时前端可用资金判断）
请求：
http://192.168.0.33/omsv2/portfolio/adjust/pre_check_info?type=1&product_id=655
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "inter":"100000000.00"    //场内资金
    }
}
（用于证券维护信息删除前的确认框展示数据获取）
请求：
http://192.168.0.33/omsv2/portfolio/adjust/pre_check_info?stock_id=300173.SZ&type=2
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "holding":30000000    //持仓总和
    }
}
（用于证券调整减少时，或证券调整总成本调整时，前端判断的数据获取）
请求：
http://192.168.0.33/omsv2/portfolio/adjust/pre_check_info?stock_id=300173.SZ&type=2&product_id=10087
响应：
{
    "code":0,
    "msg":"",
    "data":[
        {
            "hold_direction":0,     //0多1空
            "usable_volume":30000000,   //可用数量
            "hold_volume":30000000,        //持仓数量
            "hold_cost":"30000000.00"        //总成本
        }
    ]
}
</pre>

===资金调整列表===
CGI：/portfolio/adjust/asset_list<br/>
使用说明：获取资金调整记录列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|group_id|| string ||查询的基金id，支持多个，逗号隔开
|-
|product_id|| string ||查询的交易单元id，支持多个，逗号隔开
|-
|product_name|| string ||模糊查询交易单元名称，product_id传空时才生效
|-
|list_type|| int ||1普通列表 2审核页面列表-带排序(未审核的在上)
|-
|review_result|| int || 0全部 1通过 2拒绝    list_type=2时生效
|-
|start_date|| string ||开始时间 20170506
|-
|end_date|| string ||结束时间 20170506
|-
|page|| int ||页码
|-
|count|| int ||每页几条
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/portfolio/adjust/asset_list?start_date=20190810&end_date=20190811&count=4&list_type=2&review_result=2
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "count":5,    //总条数
        "list":[          //列表详情
            {
                "id":11,                //记录id，用于审核时提交
                "submit_date":"2019-08-10",   //提交日期
                "review_date":"2019-08-10",    //审核日期，未审核则为空
                "group_name":"A",       //基金名称
                "product_name":"B",     //交易单元名称
                "op_type":1,               //1资金增加2资金减少
                "change_amount":"200020.01",     //调整金额
                "review_result":2        //0未审核1审核通过2审核拒绝
            },
            {
                "id":9,
                "submit_date":"2019-08-10",
                "review_date":"2019-08-10",
                "group_name":"A",
                "product_name":"B",
                "op_type":1,
                "change_amount":"200020.00",
                "review_result":2
            },
            {
                "id":7,
                "submit_date":"2019-08-10",
                "review_date":"2019-08-10",
                "group_name":"AA",
                "product_name":"BB",
                "op_type":1,
                "change_amount":"13120.00",
                "review_result":2
            },
            {
                "id":5,
                "submit_date":"2019-08-10",
                "review_date":"2019-08-10",
                "group_name":"AA",
                "product_name":"BB",
                "op_type":1,
                "change_amount":"31000.00",
                "review_result":2
            }
        ]
    }
}
</pre>

===添加资金调整===
CGI：/portfolio/adjust/post_asset<br/>
使用说明：提交一条资金调整<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|product_id|| int ||交易单元id
|-
|group_id|| int ||基金id
|-
|op_type|| int ||1资金增加2资金减少
|-
|change_amount|| float ||调整金额
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
curl -d 'product_id=10087&group_id=1014&op_type=1&change_amount=200020' 'http://127.0.0.1/omsv2/portfolio/adjust/post_asset'
响应：
{
    "code": 0,
    "msg": "添加成功",
    "data":[11]       //新增成功的记录id
}
</pre>

===资金调整审核===
CGI：/portfolio/adjust/asset_review<br/>
使用说明：资金调整审核<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|target_ids|| string ||要审核的目标记录id，支持多个，逗号隔开
|-
|action|| int ||1通过2拒绝
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
curl -d 'target_ids=11&action=2' 'http://127.0.0.1/omsv2/portfolio/adjust/asset_review'
响应：
{
    "code":561009,
    "msg":"目标中包含已复核数据！",
    "data":[

    ]
}
</pre>

===资金调整日志列表===
CGI：/portfolio/adjust/asset_log_list<br/>
使用说明：获取资金调整日志列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|op_uid|| string ||查询的柜员id，支持多个，逗号隔开
|-
|op_type|| string || 1资金增加2资金减少88复核通过99复核拒绝     支持多个，逗号隔开
|-
|start_date|| string ||开始时间 20170506
|-
|end_date|| string ||结束时间 20170506
|-
|page|| int ||页码
|-
|count|| int ||每页几条
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/portfolio/adjust/asset_log_list?start_date=20190810&end_date=20190811&count=4&page=1&op_type=99
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "count":3,
        "list":[
            {
                "date":"2019-08-10",
                "time":"10:59:38",
                "user_name":"帅哥",
                "action_type":99,          //1资金增加2资金减少88复核通过99复核拒绝
                "content":"复核拒绝A基金-B交易单元资金增加200020.00元"
            },
            {
                "date":"2019-08-10",
                "time":"10:45:36",
                "user_name":"帅哥",
                "action_type":99,
                "content":"复核拒绝A基金-B交易单元资金增加200020.00元"
            },
            {
                "date":"2019-08-10",
                "time":"10:40:14",
                "user_name":"帅哥",
                "action_type":99,
                "content":"复核拒绝A基金-B交易单元资金增加13120.00元"
            }
        ]
    }
}


</pre>

===证券调整列表===
CGI：/portfolio/adjust/position_list<br/>
使用说明：获取证券调整记录列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|group_id|| string ||查询的基金id，支持多个，逗号隔开
|-
|product_id|| string ||查询的交易单元id，支持多个，逗号隔开
|-
|product_name|| string ||模糊查询交易单元名称，product_id传空时才生效
|-
|list_type|| int ||1普通列表 2审核页面列表-带排序(未审核的在上)
|-
|review_result|| int || 0全部 1通过 2拒绝    list_type=2时生效
|-
|start_date|| string ||开始时间 20170506
|-
|end_date|| string ||结束时间 20170506
|-
|page|| int ||页码
|-
|count|| int ||每页几条
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/portfolio/adjust/position_list?start_date=20190810&end_date=20190811&count=10&list_type=2&review_result=1
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "count":2,     //总条数
        "list":[          //列表详情
            {
                "id":15,    //记录id，用于复核时提交用
                "submit_date":"2019-08-10",    //提交日期
                "review_date":"2019-08-10",     //复核日期
                "group_name":"",          //基金名称
                "product_name":"",     //交易单元名称
                "op_type":1,         //1证券增加2证券减少3成本调整
                "stock_id":"300173.SZ",     
                "stock_name":"iii",
                "market":2,    //1:沪A 2:深A 3:沪港通 4:深港通 5中金所 6大商所 7郑商所 8上期所 9银行间 11北交所(新三板) 12场外 13沪股通 14深股通 15沪B 16深B 17港股 18美股 19沪A1 20深A1 0其他
                "hold_direction":0,    //0多1空
                "change_volume":300,   //调整数量
                "is_usable_sync":1,   //是否应用到可用 0否1是
                "change_cost_price":"10.00",   //调整成本价
                "change_total_cost":"12.00",   //调整总成本
                "relate_stock_id":"300173.SZ",    //关联正股
                "target_total_cost":"0.00",     //成本调整后总成本
                "review_result":1       //0未审核 1通过 2拒绝
            },
            {
                "id":12,
                "submit_date":"2019-08-10",
                "review_date":"2019-08-10",
                "group_name":"",
                "product_name":"",
                "op_type":2,
                "stock_id":"300173.SZ",
                "stock_name":"iii",
                "market":2,
                "hold_direction":0,
                "change_volume":30000000,
                "is_usable_sync":1,   //是否应用到可用 0否1是
                "change_cost_price":"10.00",
                "change_total_cost":"12.00",
                "relate_stock_id":"300173.SZ",
                "target_total_cost":"0.00",
                "review_result":1
            }
        ]
    }
}


</pre>

===添加证券调整===
CGI：/portfolio/adjust/post_position<br/>
使用说明：提交一条证券调整<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|product_id|| int ||交易单元id
|-
|group_id|| int ||基金id
|-
|op_type|| int ||1证券增加2证券减少3成本调整
|-
|stock_id|| string ||证券id
|-
|stock_name|| int ||证券名称
|-
|market|| int ||交易市场，1沪A，2深A，3沪港通，4深港通，13沪股通，14深股通，17港股，18美股，19沪A1，20深A1    -注意市场下拉框中沪A和深A是合成一项，本接口提交传递给后端时要根据代码匹配返回的市场值来传
|-
|hold_direction|| int ||0多1空
|-
|change_volume|| int ||op_type=1或2时生效，证券调整数量
|-
|is_usable_sync|| int ||op_type=1或2时生效，证券调整数量是否应用到可用数量 1是0否
|-
|change_cost_price|| float ||op_type=1或2时生效，证券调整的成本价
|-
|change_total_cost|| float ||op_type=1或2时生效，证券调整的总成本
|-
|relate_stock_id|| string ||关联正股
|-
|target_total_cost|| float ||op_type=3时生效，成本调整类的目标总成本
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
curl -d 'product_id=10087&group_id=1014&stock_id=300173.SZ&stock_name=iii&market=2&op_type=1
&change_volume=300&change_cost_price=10.00&change_latest_price=12.00&relate_stock_id=300173.SZ'
 'http://127.0.0.1/omsv2/portfolio/adjust/post_position'
响应：
{
    "code": 0,
    "msg": "添加成功",
    "data":[11]       //新增成功的记录id
}
</pre>

===证券调整审核===
CGI：/portfolio/adjust/position_review<br/>
使用说明：证券调整审核<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|target_ids|| string ||要审核的目标记录id，支持多个，逗号隔开
|-
|action|| int ||1通过2拒绝
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
curl -d 'target_ids=11&action=2' 'http://127.0.0.1/omsv2/portfolio/adjust/position_review'
响应：
{
    "code":561009,
    "msg":"目标中包含已复核数据！",
    "data":[

    ]
}
</pre>

===证券调整日志列表===
CGI：/portfolio/adjust/position_log_list<br/>
使用说明：获取证券调整日志列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|op_uid|| string ||查询的柜员id，支持多个，逗号隔开
|-
|op_type|| string || 11证券增加12证券减少13成本调整14证券信息维护88复核通过99复核拒绝     支持多个，逗号隔开
|-
|start_date|| string ||开始时间 20170506
|-
|end_date|| string ||结束时间 20170506
|-
|page|| int ||页码
|-
|count|| int ||每页几条
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/portfolio/adjust/position_log_list?start_date=20190810&end_date=20190811&count=4&page=1&op_type=12
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "count":2,
        "list":[
            {
                "date":"2019-08-10",
                "time":"13:40:00",
                "user_name":"",
                "action_type":12,        //11证券增加12证券减少13成本调整14证券信息维护88复核通过99复核拒绝
                "content":"证券减少300173.SZ共30000000股"
            },
            {
                "date":"2019-08-10",
                "time":"13:39:56",
                "user_name":"",
                "action_type":12,
                "content":"证券减少300173.SZ共20000000股"
            }
        ]
    }
}

</pre>

===证券维护信息列表===
CGI：/portfolio/adjust/sec_info_list<br/>
使用说明：证券维护信息列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
http://192.168.0.33/omsv2/portfolio/adjust/sec_info_list
响应：
{
    "code":0,
    "msg":"",
    "data":{
        "count":2,
        "list":[
            {
                "id":3,     //记录id，用于删除及编辑时传參
                "stock_id":"113331.SZ",
                "stock_name":"omygod",
                "market":19,    //19沪A1 20深A1
                "sec_type":10,  //1股票 3债券(除国债) 4回购 5期权 6基金(其他) 7国债 8其他 9港股 10货币基金 11美股 12债券型基金 13股票型基金 14混合型基金
                "latest_price":"12.35",     //最新价
                "relate_stock_id":"000001.SZ",     //关联正股
                "relate_stock_name":"平安银行"
            },
            {
                "id":2,
                "stock_id":"222111.SZ",
                "stock_name":"omygod",
                "market":19,
                "sec_type":10,
                "latest_price":"12.35",     //最新价
                "relate_stock_id":"000001.SZ",
                "relate_stock_name":"平安银行"
            }
        ]
    }
}
</pre>

===证券维护信息增改===
CGI：/portfolio/adjust/edit_sec_info<br/>
使用说明：证券维护信息增改<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|id|| int ||要修改的目标记录id，如果是新增记录，则不传
|-
|stock_id|| string ||证券id
|-
|stock_name|| int ||证券名称
|-
|market|| int ||交易市场，19沪A1 20深A1
|-
|sec_type|| int ||证券类别 1股票 3债券(除国债) 4回购 5期权 6基金(其他) 7国债 8其他 9港股 10货币基金 11美股 12债券型基金 13股票型基金 14混合型基金
|-
|latest_price|| float ||最新价
|-
|relate_stock_id|| string ||关联正股
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
curl -d 'stock_id=113331.SZ&stock_name=omygod&relate_stock_id=000001.SZ&market=19&sec_type=10' 'http://127.0.0.1:38080/portfolio/adjust/edit_sec_info'
响应：
{
    "code": 0,
    "msg": "修改成功",
    "data":[]     
}
</pre>

===证券维护信息删除===
CGI：/portfolio/adjust/del_sec_info<br/>
使用说明：证券维护信息删除<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|id|| int ||要删除的目标记录id
|-
|action|| int ||1通过2拒绝
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
请求：
curl -d 'id=11' 'http://127.0.0.1/omsv2/portfolio/adjust/del_sec_info'
响应：
{
    "code":0,
    "msg":"删除成功",
    "data":[

    ]
}
</pre>
==组合分析==
===Brinson归因分析===
CGI：/sync/api/get_brinson<br/>
使用说明：获取Brinson归因数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| fund_id || int ||基金id
|-
| date_from || string ||查询起始日期 yyyy-mm-dd
|-
| date_to || string ||查询截止日期 yyyy-mm-dd
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"product_avg_position": { //A股维度 产品平均仓位
			"position_avg": 0,
			"front_position_avg": "0.0000" //前端取此值（小数点处理过后的数据）
		},
		"product_avg_stock": [{ //个股维度 产品平均仓位
			"position_ratio_value": [0, 0, 0, 0],
			"standard_value": [],
			"industry": "6112000000000000",
			"industry_name": "食品饮料",
			"stock_id": "000568.SZ",
			"stock_name": "泸州老窖",
			"product_avg": 0,
			"front_product_avg": "0.0000" //前端取此值（小数点处理过后的数据）
		}],
		"product_avg_industry": [{ //行业维度 产品平均仓位
			"product_value": [0, 0, 0],
			"standard_value": [],
			"industry": "6112000000000000",
			"industry_name": "食品饮料",
			"product_sum": 0,
			"front_product_sum": "0.0000"  //前端取此值（小数点处理过后的数据）
		}],
		"standard_avg_stock": [{ //个股维度基准平均仓位
			"stock_id": "000568.SZ",
			"standard_avg": 0.0047414090909091,
			"front_standard_avg": "0.0047" //前端取此值（小数点处理过后的数据）
		}],
		"hk_product_avg_stock": [{ //港股维度产品平均仓位
			"standard_value": [],
			"industry": "",
			"industry_name": "",
			"stock_id": "01186.HKSH",
			"stock_name": "中国铁建",
			"product_avg": 0,
			"front_product_avg": "0.0000"  //前端取此值（小数点处理过后的数据）
		}],
		"hk_product_avg_position": { //港股维度产品平均仓位
			"position_avg": 0,
			"front_position_avg": "0.0000" //前端取此值（小数点处理过后的数据）
		},
		"standard_avg_industry": [{ //行业维度基准平均仓位
			"industry_name": "电子",
			"standard_sum": 0.047223318181818,
			"front_standard_sum": "0.0472"//前端取此值（小数点处理过后的数据）
		}],
		"product_contribute_stock": [{ //个股维度产品贡献
			"trade_date": ["2019-08-01", "2019-08-02", "2019-08-05", "2019-08-06"],
			"industry": "6112000000000000",
			"industry_name": "食品饮料",
			"stock_id": "000568.SZ",
			"stock_name": "泸州老窖",
			"product_id": 12,
			"product_contribute": "0.000000000000000",
			"front_product_contribute": "0.0000" //前端取此值（小数点处理过后的数据）
		}],
		"product_contribute_industry": [{//行业维度产品贡献
			"industry": "6112000000000000",
			"industry_name": "食品饮料",
			"contribute_sum": 0,
			"front_contribute_sum": "0.0000"  //前端取此值（小数点处理过后的数据）
		}],
		"product_contribute_position": { // A股维度产品贡献
			"contribute_sum": "0.000000000000000",
			"front_contribute_sum": "0.0000"  //前端取此值（小数点处理过后的数据）
		},
		"hk_product_contribute_stock": [{ //港股个股维度产品贡献
			"trade_date": ["2019-08-01", "2019-08-02", "2019-08-05", "2019-08-06"],
			"industry": "",
			"industry_name": "",
			"stock_id": "01186.HKSH",
			"stock_name": "中国铁建",
			"product_id": 12,
			"product_contribute": "0.000000000000000",
			"front_product_contribute": "0.0000"  //前端取此值（小数点处理过后的数据）
		}],
		"hk_product_contribute_position": { //港股维度产品贡献
			"contribute_sum": "0.000000000000000",
			"front_contribute_sum": "0.0000" //前端取此值（小数点处理过后的数据）
		},
		"standard_contribute_stock": [{ //个股维度基准贡献
			"industry": "6112000000000000",
			"industry_name": "食品饮料",
			"stock_id": "000568.SZ",
			"stock_name": "泸州老窖",
			"standard_contribute": "0.000985906312224",
			"front_standard_contribute": "0.0010" //前端取此值（小数点处理过后的数据）
		}],
		"standard_contribute_industry": [{ //行业维度基准贡献
			"industry_name": "电子",
			"standard_contribute_sum": "0.001153488754666",
			"front_standard_contribute_sum": "0.0012" //前端取此值（小数点处理过后的数据）
		}],
		"standard_contribute_position": { //A股维度基准贡献
			"standard_contribute_value": [-0.009327054112198],
			"standard_contribute_sum": -0.009327054112198,
			"front_standard_contribute_sum": "-0.0093" //前端取此值（小数点处理过后的数据）
		},
		"car_list": { //超额收益
			"stock_car": {
				"000568.SZ": "-0.000985906312224",
			},
			"front_stock_car": { //股票维度超额收益
				"000568.SZ": "-0.0010", //前端取此值（小数点处理过后的数据）
			},
			"industry_car": {//行业维度超额收益
				"电子": {
					"industry_cal_sum": "-0.001153488754666",
					"front_industry_cal_sum": "-0.0012",  //前端取此值（小数点处理过后的数据）
					"industry_name": "电子"
				}
			},
			"position_car": "0.009327054112198",
			"front_position_car": "0.0093", // A股维度超额收益  前端取此值（小数点处理过后的数据）
			"hk_position_car": "0.000000000000000",
			"front_hk_position_car": "0.0000"//港股维度超额收益 前端取此值 （小数点处理过后的数据）
		},
		"brinson_data": {
			"a": "0.007880656198",
			"r_p": "0.022896821855",
			"c": "0.007610748930",
			"f": "0.001936000000",
			"i": "-0.012092396903",
			"date_to": "2019-08-31",
			"k": "0.993345647406",
			"l": "-0.064344467877",
			"n": "0.001577360623",
			"stocks": [{
				"swindex_3rd_code": "6110010100000000",
				"swindex_2nd_code": "6110010000000000",
				"swindex_1st_code": "1000012601000000",
				"in_standard": "false",
				"stock_id": "000066.SZ",
				"sa": "0.001522984987",
				"sr": "0.001522984987"
			}],
			"tr": "0.032223875969",
			"date_from": "2019-08-01"
		}
	},
	"timestamp": 1581501451.4303,
	"timeConsumption": 0.86848306655884,
	"requestStartTime": null
}
</pre>

===Brinson归因分析数据导出===
CGI：/oms/report/download_brinson<br/>
使用说明：导出Brinson归因数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| fund_id || int ||基金id
|-
| date_from || string ||查询起始日期 yyyy-mm-dd
|-
| date_to || string ||查询截止日期 yyyy-mm-dd
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{"code":0,"msg":"ok","data":[]}
</pre>

===研究员绩效===
====研究员信息====
CGI：/researcher/get_researcher_list<br/>
使用说明：研究员列表信息<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "361006": {
            "user_id": "361006", //用户id
            "real_name": "Cassie备用", //用户名
            "is_exist": 1,//是否存在研究员 1存在 0不存在 
            "currency": 1, //结算币种 1CNY 2USD is_exist = 0 不存在的情况下为空
            "user_busi_type": "",  //研究员类型：1股票 2期货  is_exist = 0 不存在的情况下为空
            "has_permission": 1,  //登录用户是否对该研究员有查阅权限 1是0否    --在一些特殊地方需要判断权限（比如研究员持仓报表）
        },
        "360001":{
            "user_id":"360001",
            "real_name":"11叶祎然",
            "is_exist":1,
            "currency":1,
            "user_busi_type":1,
            "has_permission":1
        },
    },
    "timestamp": 1690858583.8031,
    "timeConsumption": 0.89820313453674,
    "requestStartTime": null,
    "input": {
        "range": "all"
    }
}
</pre>

====研究员资产查询====
CGI：/researcher/report_list/assets<br/>
使用说明：研究员信息<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string || 指定某天的研究员信息 默认当日
|-
| type || int    || 期货或者股票研究员 默认股票1 期货2
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/report_list/assets?date=2023-05-10&type=1
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "id": 80,
            "org_id": 36,
            "user_id": 360028,
            "total_market_value": "87734.145",
            "capital_balance": "914,216.60",
            "frozen_balance": "0",
            "usable_balance": "914,216.60",
            "total_asset": "1,001,950.74",
            "net_asset": "1,001,950.74",
            "volume": "1,000,000.00",
            "net_value": "1.0020",
            "begin_capital": "100.00",
            "total_cash_cost": "100.00", //累计资金成本 股票研究员特有字段
            "cost_mv": "100.00", //成本市值 股票研究员特有字段
            "total_open_mv": "100.00", //累计开仓市值 股票研究员特有字段
            "leverage": "10",  // 货值杠杆 期货研究员特有字段
            "market_ratio": "10%",  // 持仓占比 股票研究员特有字段
            "created_at": "2023-05-10 16:03:07",
            "updated_at": "2023-05-12 14:44:41",
            "date": "2023-05-10",
            "research_name": "Moon"
        },
        {
            "id": 81,
            "org_id": 36,
            "user_id": 361005,
            "total_market_value": "284220.918",
            "capital_balance": "718,329.12",
            "frozen_balance": "0",
            "usable_balance": "718,329.12",
            "total_asset": "1,002,550.04",
            "net_asset": "1,002,550.04",
            "volume": "1,000,000.00",
            "net_value": "1.0026",
            "begin_capital": "0.00",
            "total_cash_cost": "100.00",
            "cost_mv": "100.00",
            "total_open_mv": "100.00",
            "created_at": "2023-05-10 16:03:07",
            "updated_at": "2023-05-12 14:44:41",
            "date": "2023-05-10",
            "research_name": "Cassie"
        }
    ],
    "timestamp": 1684136464.331,
    "timeConsumption": 0.42035508155823,
    "requestStartTime": null,
    "input": {
        "date": "2023-05-10"
    }
}

字段映射

基金经理 => researcher_name
单位净值 => net_value
净资产 => net_asset
总资产 => total_asset
资金额度 => capital_balance
资金可用额度 => usable_balance
绝对收益 => total_profit
累计资金成本 => total_cash_cost
成本市值 => cost_mv
累计开仓市值 => total_open_mv
持仓占比 => market_ratio
货值杠杆 => leverage
份额 => volume
初始资金 => begin_capital
清算币种 => currency 或者 currency_name(格式化后的)
</pre>

====研究员资产导出====
CGI：/researcher/download_report/assets<br/>
使用说明：研究员持仓信息<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string || 指定某天的研究员信息 默认当日
|-
| type || int    || 期货或者股票研究员 默认股票1 期货2
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/download_report/assets?date=2023-05-10&type=1
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1683872848.8913,
    "timeConsumption": 0.43990993499756,
    "requestStartTime": null,
    "input": {
        "date": "2023-05-10",
        "type": "1",
    }
}
</pre>

====额度调整====
CGI：researcher/do_edit_balance<br/>
使用说明：研究员信息<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| user_id || int || 研究员id
|-
| type || int || 修改类型 1:增加 2减少
|-
| change_value || int || 修改的值
|-
| is_sync || int || 是否同步0:不同步 1同步
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/do_edit_balance
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1683775314.4589,
    "timeConsumption": 0.42340397834778,
    "requestStartTime": null,
    "input": {
        "user_id": 360028,
        "change_value": 100,
        "type": 1
    }
}
</pre>

====份额和初始金修改====
CGI：/researcher/do_edit_by_type<br/>
使用说明：研究员信息<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| id || int || 编辑资产的 id
|-
| type || int || 1:份额 2初始金
|-
| change_value || int || 修改金额
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/do_edit_by_type
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1683775314.4589,
    "timeConsumption": 0.42340397834778,
    "requestStartTime": null,
    "input": {
        "id": 80,
        "change_value": 100,
        "type": 2
    }
}
</pre>

====研究员持仓查询====
CGI：/researcher/report_list/position<br/>
使用说明：研究员持仓信息<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| page || int || 页码
|-
| pageSize || int || 分页数量
|-
| user_id || string || 基金经理id 多个,符号隔开
|-
| start || string || 开始时间
|-
| end || string || 结束时间
|-
| order_by || string || 排序字段
|-
| order|| string || 正序: asc 倒序 desc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 total 总个数 list当前页数据
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/report_list/position?user_id=361005,360028,361144&page=1&pageSize=5&start=2023-05-01&end=2023-05-12
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": {
        "total": 336,
        "list": [
            {
                "id": 371,
                "org_id": 36,
                "user_id": 361005,
                "product_id": 11314,
                "stock_id": "600503.SH",
                "stock_name": "华丽家族",
                "market": 1,
                "sec_type": 1,
                "hold_volume": "100",
                "frozen_volume": "0",
                "usable_volume": "100",
                "cost_price": "2.720",
                "latest_price": "2.680",
                "hold_cost": "272",
                "market_value": "268",
                "float_profit": "-4",
                "stable_profit": "0",
                "hold_direction": 0,
                "created_at": "2023-05-10 16:02:58",
                "updated_at": "2023-05-11 16:25:46",
                "date": "2023-05-01",
                "account_name": "模拟网关-Ada",
                "group_name": "模拟网关-Ada",
                "researcher_name": "Cassie",
                "market_name": "其他",
                "stock_type": "股票",
                "stock_flag": "多头"
            },
            {
                "id": 372,
                "org_id": 36,
                "user_id": 361005,
                "product_id": 11313,
                "stock_id": "600503.SH",
                "stock_name": "华丽家族",
                "market": 1,
                "sec_type": 1,
                "hold_volume": "100",
                "frozen_volume": "0",
                "usable_volume": "100",
                "cost_price": "2.720",
                "latest_price": "2.680",
                "hold_cost": "272",
                "market_value": "268",
                "float_profit": "-4",
                "stable_profit": "0",
                "hold_direction": 0,
                "created_at": "2023-05-10 16:02:58",
                "updated_at": "2023-05-11 16:25:46",
                "date": "2023-05-01",
                "account_name": "模拟网关-Jyl",
                "group_name": "模拟网关-Ada",
                "researcher_name": "Cassie",
                "market_name": "其他",
                "stock_type": "股票",
                "stock_flag": "多头"
            },
            {
                "id": 373,
                "org_id": 36,
                "user_id": 360028,
                "product_id": 11317,
                "stock_id": "688004.SH",
                "stock_name": "博汇科技",
                "market": 1,
                "sec_type": 1,
                "hold_volume": "200",
                "frozen_volume": "0",
                "usable_volume": "200",
                "cost_price": "33.160",
                "latest_price": "36.010",
                "hold_cost": "6,632",
                "market_value": "7,202",
                "float_profit": "570",
                "stable_profit": "0",
                "hold_direction": 0,
                "created_at": "2023-05-10 16:02:58",
                "updated_at": "2023-05-11 16:25:46",
                "date": "2023-05-01",
                "account_name": "模拟网关-yanlong",
                "group_name": "开发基金-yanlong",
                "researcher_name": "Moon",
                "market_name": "其他",
                "stock_type": "股票",
                "stock_flag": "多头"
            },
            {
                "id": 374,
                "org_id": 36,
                "user_id": 361005,
                "product_id": 11337,
                "stock_id": "000501.SZ",
                "stock_name": "武商集团",
                "market": 2,
                "sec_type": 1,
                "hold_volume": "-200",
                "frozen_volume": "0",
                "usable_volume": "-200",
                "cost_price": "0.000",
                "latest_price": "11.380",
                "hold_cost": "0",
                "market_value": "-2,276",
                "float_profit": "-2276",
                "stable_profit": "2272",
                "hold_direction": 0,
                "created_at": "2023-05-10 16:02:58",
                "updated_at": "2023-05-11 16:25:46",
                "date": "2023-05-01",
                "account_name": "华泰maticA股",
                "group_name": "恒生2.0",
                "researcher_name": "Cassie",
                "market_name": "其他",
                "stock_type": "股票",
                "stock_flag": "多头"
            },
            {
                "id": 375,
                "org_id": 36,
                "user_id": 361005,
                "product_id": 11337,
                "stock_id": "688005.SH",
                "stock_name": "容百科技",
                "market": 1,
                "sec_type": 1,
                "hold_volume": "600",
                "frozen_volume": "0",
                "usable_volume": "600",
                "cost_price": "68.880",
                "latest_price": "66.480",
                "hold_cost": "41,328",
                "market_value": "39,888",
                "float_profit": "-1440",
                "stable_profit": "0",
                "hold_direction": 0,
                "created_at": "2023-05-10 16:02:58",
                "updated_at": "2023-05-11 16:25:46",
                "date": "2023-05-01",
                "account_name": "华泰maticA股",
                "group_name": "恒生2.0",
                "researcher_name": "Cassie",
                "market_name": "其他",
                "stock_type": "股票",
                "stock_flag": "多头"
            }
        ]
    },
    "timestamp": 1683872848.8913,
    "timeConsumption": 0.43990993499756,
    "requestStartTime": null,
    "input": {
        "user_id": "361005,360028,361144",
        "page": "1",
        "pageSize": "5",
        "start": "2023-05-01",
        "end": "2023-05-12"
    }
}

字段映射

日期 => date
基金经理 => researcher_name
基金 => group_name
交易单元 => account_name
证券代码 => stock_id
证券名称 => stock_name
持仓方向 => stock_flag
持仓数量 => hold_volume
最新价 => latest_price
持仓市值 => market_value
成本均价（原币）=> cost_price
可用数量 => usable_volume
浮动盈亏 => float_profit
实现盈亏 => stable_profit
交易市场 => market_name
证券类别 => stock_type
</pre>

====研究员持仓导出====
CGI：/researcher/download_report/position<br/>
使用说明：研究员持仓信息<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| user_id || string || 基金经理id 多个,符号隔开
|-
| start || string || 开始时间
|-
| end || string || 结束时间
|-
| order_by || string || 排序字段
|-
| order|| string || 正序: asc 倒序 desc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/download_report/position?user_id=361005,360028,361144&page=1&pageSize=5&start=2023-05-01&end=2023-05-12
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1683872848.8913,
    "timeConsumption": 0.43990993499756,
    "requestStartTime": null,
    "input": {
        "user_id": "361005,360028,361144",
        "page": "1",
        "pageSize": "5",
        "start": "2023-05-01",
        "end": "2023-05-12"
    }
}
</pre>

====成交汇总报表导出====
CGI：/researcher/download_report_deal<br/>
使用说明：成交汇总报表导出<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date|| string || 开始时间
|-
| order_by || string || 排序字段
|-
| order|| string || 正序: asc 倒序 desc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/download_report_deal?date=2023-05-01
<pre>
响应：
{"code":0,"msg":"ok","data":[],"timestamp":1683872848.8913,"timeConsumption":0.43990993499756,"requestStartTime":null,"input":{"user_id":"361005,360028,361144","page":"1","pageSize":"5","start":"2023-05-01","end":"2023-05-12"}}
</pre>

====研究员成交汇总报表====
CGI：/researcher/report_list/deal_summary<br/>
使用说明：研究员成交汇总报表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| page || int || 页码
|-
| pageSize || int || 分页数量
|-
| date|| string || 日期
|-
| order_by || string || 排序字段
|-
| order|| string || 正序: asc 倒序 desc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 total 总个数 list当前页数据
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/report_list/deal_summary?page=1&pageSize=5&date=2023-05-01
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    -"data": {
        "total": 2,
        -"list": [
            -{
                "product_name": "模拟网关-Ada",   //交易单元
                "research_name": "Cassie",   研究员
                "stock_id": "000001.SZ",   标的代码
                "stock_name": "平安银行",  标的名称
                "sec_type": 1,             标的类型
                "exchange_rate": "0.00000000",  汇率
                "total_deal_volume": 100,   成交均价
                "total_deal_price": 12.88   成交数量
            },
            -{
                "product_name": "模拟网关-Ada",
                "research_name": "Cassie",
                "stock_id": "600000.SH",
                "stock_name": "浦发银行",
                "sec_type": 1,
                "exchange_rate": "0.00000000",
                "total_deal_volume": 100,
                "total_deal_price": 8
            }
        ]
    },
    "timestamp": 1683875422.3788,
    "timeConsumption": 2.3594908714294,
    "requestStartTime": null,
    -"input": {
        "date": "2023-05-11"
    }
}
</pre>

====成交流水信息====
CGI：/researcher/get_deal_details<br/>
使用说明：成交流水信息<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| 请求参数参考 数据查询-成交流水，collect_type传1，field_sort只传这里页面需要的
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/get_deal_details
<pre>
响应：
{
	"code": 1000,
	"msg": "ok",
	"data": [],
}
</pre>

====成交流水信息导出====
CGI：/researcher/export_deal_details<br/>
使用说明：成交流水信息导出<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| 请求参数参考 数据查询-成交流水导出，新增category传researcher,collect_type传1，field_sort只传这里页面需要的,并额外添加'id'字段导出
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/export_deal_details
<pre>
响应：
{
	"code": 1000,
	"msg": "ok",
	"data": [],
}
</pre>

====成交流水清算====
CGI：/researcher/research_history_settle<br/>
使用说明：成交流水清算<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| managers || string || 基金经理id，逗号分隔
|-
| start || string || 开始日期
|-
| end || string || 结束日期
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/research_history_settle
<pre>
响应：
{
	"code": 1009,
	"msg": "当日内部交易数据未清算，不可进行外部数据清算",
	"data": [],
}
</pre>

====成交流水信息删除====
CGI：/researcher/del_deal_details<br/>
使用说明：成交流水信息删除，仅限系统外<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| product_id || int || 交易单元id
|-
| order_id || int || 委托id
|-
| deal_id || int || 成交id
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/del_deal_details
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>
====额度调整记录====
CGI：researcher/get_cash_bills<br/>
使用说明：研究员信息<br/>
请求方法：Get<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| pageNo || int || 当前页码
|-
| pageSize || int|| 分页数量默认:100
|-
| start_date || string || 开始时间 格式: 2023-06-06
|-
| end_date || string|| 结束时间 格式: 2023-06-06
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 total:总个数 list:当前数据列表
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/get_cash_bills?start_date=2023-06-06&end_date=2023-06-06
<pre>
响应：
{
  "code": 0,
  "msg": "ok",
  "data": {
    "total": 3,
    "list": [
      {
      "id": 63,
      "org_id": 36,
      "user_id": 361003,
      "change_value": "100",
      "currency": "",
      "adjust_volume": 0,
      "type": 2,
      "status": 0,
      "created_at": "2023-06-06 19:35:51",
      "updated_at": "2023-06-06 19:35:51",
      "date": "2023-06-06", //日期
      "stock_id": null,
      "product_id": null,
      "hold_direction": 0,
      "desc": "份额调整为100", //调整内容
      "operate_user": 360000,
      "operate_user_name": "机构管理员", //操作人信命
      "researcher_name": "Yanlong", //研究员姓名
      "time": "19:35:51"//时间
    },
    ]
  },
  "timestamp": 1686214199.877,
  "timeConsumption": 0.44176197052002,
  "requestStartTime": null,
  "input": {
    "start_date": "2023-06-06",
    "end_date": "2023-06-06",
    "pageNo": "1",
    "pageSize": "1"
  }
}
</pre>

====研究持仓报表====
CGI：/pms-pub/report-forms/researcher/research_position<br/>
使用说明：研究员持仓报表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型!! 必填 !! 说明
|-
| date || string || 是 || 日期 格式:2023-06-05
|-
| user_id || string || 否 || 研究员id 多个用,符号隔开 如 361018,361019
|-
| order || string || 否 || 排序 正序 asc 倒序 desc
|-
| order_by || string || 否 || 排序字段 按返回数据的position里面列名
|-
| empty || int || 否 || 是否展示空仓数据 0否 1是 
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 格式按用户id为key 返回数据 position内列表为持仓数据 sum为统计信息 其他为头部信息 具体说明如下
|}
示例：<br/>
https://10.150.3.27/pms-pub/report-forms/researcher/research_position?date=2023-06-06&user_id=361018
<pre>
响应：
{
  "data": {
    "361018": {
      "position": [
        {
          "org_id": 36,
          "user_id": 361018,
          "stock_id": "000002.SZ", //证券代码
          "stock_name": "万科A", //证券名称
          "market": 2,
          "hold_direction": 0,
          "sec_type": 1,
          "hold_volume": "300", //持仓数量
          "market_value": "0.44", //市值万元
          "latest_price": "14.54", //收盘价
          "hold_cost_total": 4299.9999,
          "float_profit": "0.006", //持仓盈亏(万元)
          "stable_profit": "0",//平仓盈亏(万元)
          "index": 1, //序号
          "cost_price": "14.333",//开仓均价(当地货币)
          "total_profit": "0.006",//累计盈亏(万元)
          "cost_mv": "0.006",//成本市值(万元)
          "total_cash_cost": "0.006",//累计资金成本(万元)
          "exchange_rate": 1,//汇率
          "dividend_cash": "0" //股票派息(万元)
        },
        {
          "org_id": 36,
          "user_id": 361018,
          "stock_id": "000301.SZ",
          "stock_name": "东方盛虹",
          "market": 2,
          "hold_direction": 0,
          "sec_type": 1,
          "hold_volume": "100",
          "market_value": "0.11",
          "latest_price": "11.49",
          "hold_cost_total": 1143,
          "float_profit": "0.001",
          "stable_profit": "0",
          "index": 2,
          "cost_price": "11.43",
          "total_profit": "0.001",
          "cost_mv": "0.006",
          "total_cash_cost": "0.006",
          "exchange_rate": 1,
          "dividend_cash": "0"
        }
      ],
      "begin_capital": "0.01", //右上角的初始资金(万元)
      "net_asset": "10,999.82", //右上角的当期权益(万元)
      "total_cash_cost": "10,999.82", //右上角的累计资金成本(万元)
      "total_open_mv": "10,999.82", //右上角的累计开仓市值(万元)
      "net_value": "1",//右上角的单位净值
      "username": "javier", //研究员名称
      "date": "2023-06-06", //日期
      "currency": 1, //清算币种 1人民币 2美元
      "market_ratio": "0.41%", //右上角的持仓占比
      "sum_market_value": "45.61", //合计-持仓市值
      "sum_float_profit": "-0.68",//合计-持仓盈亏
      "sum_stable_profit": "0.06",//合计-平仓盈亏
      "sum_dividend_cash": 0,//合计-股票派息
      "sum_cost_mv": 0,//合计-成本市值
      "sum_total_cash_cost": 0,//合计-累计资金成本
      "sum_total_profit": "-0.62"//合计-累计盈亏
    }
  },
  "code": 0,
  "msg": "ok"
}
</pre>

====研究持仓报表导出====
CGI：/bms-pub/report/export_researcher_user_position<br/>
使用说明：成交流水信息删除，仅限系统外<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 必填 !!说明
|-
| date || string || 是 || 日期 格式:2023-06-05
|-
| user_id || string || 否 || 研究员id 多个用,符号隔开 如 361018,361019
|-
| order || string || 否 || 排序 正序 asc 倒序 desc
|-
| order_by || string || 否 || 排序字段 按返回数据的position里面列名
|-
| empty || int || 否 || 是否展示空仓数据 0否 1是 
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/bms-pub/report/export_researcher_user_position?date=2023-06-07&empty=1
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>
====品种持仓报表====
CGI：/pms-pub/report-forms/researcher/variety_position<br/>
使用说明：品种持仓报表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| query_date || string || 查询日期
|-
| product_id || string || 交易单元id，多选 ，分隔
|-
| fund_manager_id || string || 基金经理id，多选 ，分隔
|-
| strategy_type || string || 策略类型 ，多选 ，分隔
|-
| hedge_flag || string || 策略id ，多选 ，分隔
|-
| stock_id || string || 证券代码
|-
| currency || string || 币种
|-
| page_size || string || 每页数量
|-
| page || string || 当前页码
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/pms-pub/report-forms/researcher/variety_position?fund_manager_id=80001&page_size=2&page=1
<pre>
响应：
{
  "data": {
    "list": [
      {
        "group_name": "模拟网关基金", //机构
        "fund_manager_name": "", //基金经理名称
        "exam_depart": "", //考核部门
        "product_name": "模拟网关单元1", //交易单元名称
        "strategy_name": "zz", //策略名称
        "stock_code": "000333.SZ",//品种合约
        "sector": "美的集团",//品种
        "ins_type": "内盘股票",//指令类别
        "bs": "买",//方向
        "currency": "CNY",//币种
        "lot": 600,//持仓手数
        "multiplier": "1",//每手数量
        "hold_volume": "600",//总数量
        "cost_price": "69.18166666",//持仓均价
        "float_profit": "2369.00000400",//持仓盈亏
        "float_profit_settle": "2369.00000400",//持仓盈亏结算价
        "latest_price": "73.13",//当日收盘价
        "settle_price": "73.13",//当日结算价
        "market_value": "43878.00000000",//总货值（收盘价）
        "market_value_settle": "43878.00000000",//总货值（结算价）
        "deposit": "1"//保证金
      },
      {
        "group_name": "模拟网关基金",
        "fund_manager_name": "",
        "exam_depart": "",
        "product_name": "模拟网关单元1",
        "strategy_name": "zz",
        "stock_code": "600036.SH",
        "sector": "招商银行",
        "ins_type": "内盘股票",
        "bs": "买",
        "currency": "CNY",
        "lot": 200,
        "multiplier": "1",
        "hold_volume": "200",
        "cost_price": "37.95000000",
        "float_profit": "-50.00000000",
        "float_profit_settle": "-50.00000000",
        "latest_price": "37.7",
        "settle_price": "37.7",
        "market_value": "7540.00000000",
        "market_value_settle": "7540.00000000",
        "deposit": "1"
      }
    ],
    "total": {
      "total_lot": 3810,
      "total_hold_volume": 13610,
      "total_float_profit": 17700.6000044001,
      "total_float_profit_settle": 17700.6000044001,
      "total_market_value": 12995941.6,
      "total_market_value_settle": 495941.605,
      "total_deposit": 51
    }
  },
  "code": 0,
  "msg": "ok"
}
</pre>
====品种合约盈亏汇总表====
CGI：/pms-pub/report-forms/researcher/variety_profit_summary<br/>
使用说明：品种合约盈亏汇总表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date || string || 查询开始日期
|-
| end_date || string || 查询结束日期
|-
| group_id || string ||机构id ，多选 ，分隔
|-
| product_id || string || 交易单元id，多选 ，分隔
|-
| exam_depart || string ||考核部门名称 ，多选 ，分隔
|-
| hedge_flag || string || 策略id ，多选 ，分隔
|-
| stock_id || string || 证券代码
|-
| currency || string || 币种 原币origin_currency 人民币CNY
|-
| page_size || string || 每页数量
|-
| page || string || 当前页码
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/pms-pub/report-forms/researcher/variety_profit_summary?start_date=2024-11-04&end_date=2024-11-05&product_id=11317&page_size=1&is_export=1&currency=CNY
<pre>
响应：
{
  "data": [
    {
      "id": 53050114
      "stock_id": "600004.SH",
      "product_id": 11317,
      "hold_direction": 0,
      "hedge_flag": "",
      "group_name": "开发基金-yanlong",//机构
      "fund_manager_name": "",//部门名称
      "exam_depart": "农产品部",//考核部门名称
      "product_name": "模拟网关-yanlong",//交易单元名称
      "ins_type": "股票",//指令类别
      "currency": "CNY",//币种
      "strategy_name": "",//策略名称
      "sector": "白云机场",//合约品种
      "contracts": "600004",//合约
      "bs": "买",//方向
      "close_lot": 0,//平仓盈亏手数
      "close_volume": 0,//平仓盈亏数量
      "close_profit_amount": "0.00000000",//平仓盈亏金额
      "hold_lot": "500",//持仓盈亏手数
      "hold_volume": 500,//持仓盈亏数量
      "hold_profit_amount": "0",//持仓盈亏金额
      "dividend_cash": "0.00000000",//分红金额
      "commission": "0.00000000",//手续费
      "net_profit_amount": "0.00000000"//期末净盈亏
    }
  ],
  "code": 0,
  "msg": "ok"
}
</pre>

====品种持仓报表导出====
CGI：/bms-pub/report/export_researcher_variety_position<br/>
使用说明：持仓分配报表导出<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
| query_date || string || 查询日期
|-
| product_id || string || 交易单元id，多选 ，分隔
|-
| fund_manager_id || string || 基金经理id，多选 ，分隔
|-
| strategy_type || string || 策略类型 ，多选 ，分隔
|-
| hedge_flag || string || 策略id ，多选 ，分隔
|-
| stock_id || string || 证券代码
|-
| currency || string || 币种
|-
| page_size || string || 每页数量
|-
| page || string || 当前页码
|-
| is_export || string || 1导出
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/report/export_researcher_variety_position
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>
====品种合约盈亏汇总表导出====
CGI：/bms-pub/report/export_variety_profit_summary<br/>
使用说明：品种合约盈亏汇总表导出<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date || string || 查询开始日期
|-
| end_date || string || 查询结束日期
|-
| group_id || string ||机构id ，多选 ，分隔
|-
| product_id || string || 交易单元id，多选 ，分隔
|-
| exam_depart || string ||考核部门名称 ，多选 ，分隔
|-
| hedge_flag || string || 策略id ，多选 ，分隔
|-
| stock_id || string || 证券代码
|-
| currency || string || 币种 原币origin_currency 人民币CNY
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/report/export_researcher_variety_position
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>
====品种合约盈亏汇总表推送====
CGI：/bms-pub/report/publish_variety_profit_summary<br/>
使用说明：品种合约盈亏汇总表推送<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date || string || 查询开始日期
|-
| end_date || string || 查询结束日期
|-
| currency || string || 币种 原币origin_currency 人民币CNY
|-
| check_id || string || 持仓id ,分割 全选传空
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/report/publish_variety_profit_summary
<pre>
响应：
{
	"code": 0,
	"msg": "推送成功",
	"data": [],
}
</pre>

====持仓分配报表====
CGI：/pms-pub/report-forms/researcher/position_distribute<br/>
使用说明：持仓分配报表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string || 2020-02-02
|-
| order_by || string || 字段名
|-
| order || string || asc,desc,默认asc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/pms-pub/report-forms/researcher/position_distribute?date=2023-06-08
<pre>
响应：
{
	"data": {
		"total": {
			"inland_total_value": "3,488.65",
                        "other_total_value": "3,488.65",
			"hk_total_value": "46.19",
			"us_total_value": "12.44",
			"stock_total_feature_value": "0.00",
                        "currency":"CNY",
			"total_value": "3,547.27"
		},
		"list": [{
				"research_name": "Harry",
				"inland_value": "0.00",
                                "other_value": "0.00",
				"hk_value": "0.00",
				"us_value": "0.00",
				"stock_feature_value": "0.00",
                                "currency":"CNY",
				"total": "0.00"
			},
			{
				"research_name": "sky",
				"inland_value": "0.00",
                                "other_value": "0.00",
				"hk_value": "0.00",
				"us_value": "0.00",
				"stock_feature_value": "0.00",
                                "currency":"CNY",
				"total": "0.00"
			}
		]
	},
	"code": 0,
	"msg": "ok"
}
</pre>

====持仓分配报表导出====
CGI：/bms-pub/report/export_researcher_position_distribute<br/>
使用说明：持仓分配报表导出<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string || 2020-02-02
|-
| order_by || string || 字段名
|-
| order || string || asc,desc,默认asc
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/report/export_researcher_position_distribute
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>
====期货持仓报表====
CGI：/pms-pub/report-forms/researcher/future_position<br/>
使用说明：持仓分配报表导出<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string || 2020-02-02
|-
| query_type || int || 汇总类型 1基金+单元+基金经理+策略+合约+方向 2基金+基金经理+策略+合约+方向 3基金+单元+策略+合约+方向 4基金+策略+合约+方向 5策略+合约+方向
|-
| group_id || int || 基金组id 非必填
|-
| user_id || int || 期货研究员id 非必填
|-
| flag_name || string || 策略名称 非必填
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/pms-pub/report-forms/researcher/future_position?date=2023-10-13&query_type=1
<pre>
响应：
{
    "data": [
        {
            "group_key": "伦镍套利_692", //汇总标志"
            "group_id": 692, //基金id
            "group_name": "期货基金", //基金名称
            "product_id": 11253, //交易单元id
            "product_name": "期货交易单元", //交易单元名称
            "user_id": 361015, //研究员id
            "user_name": "javier期货", //研究员名称
            "hedge_flag": "伦镍套利", //策略名称
            "flag_index": 98, //策略序号
            "stock_id": "LME-NI 12",//证券代码
            "hold_direction": 0, //持仓方向
            "hold_direction_name": "买", //持仓方向名称
            "hold_volume": 60, //持仓手数
            "multiplier": 1000, //每手数量
            "hold_volume_total": 60000, //持仓总量
            "cost_price": 894444444444.45, //开仓成本
            "latest_price": "9.10000", //最新价
            "day_stable_profit": 0,//当日平仓盈亏 
            "float_profit": 4666666687666.6,//浮动盈亏
            "solo_ratio": "--",//单边盈亏波动
            "flag_ratio": "--",//策略盈亏波动
            "market_value": 40444444626444, //总市值(万元)
            "volume_ratio": "--",按份额杠杆比例
            "exchange_rate": 0.00033354,//汇率
            "belong_group_name": "期货基金" //所属基金
        },
        {
            "group_id": 692,
            "group_name": "期货基金",
            "product_id": 11253,
            "product_name": "期货交易单元",
            "user_id": 361015,
            "user_name": "javier期货",
            "hedge_flag": "伦镍投机",
            "flag_index": 98,
            "stock_id": "LME-NI 12",
            "hold_direction": 0,
            "hold_direction_name": "买",
            "hold_volume": 30,
            "multiplier": 1000,
            "hold_volume_total": 30000,
            "cost_price": 877777777777.78,
            "latest_price": "9.10000",
            "day_stable_profit": 0,
            "float_profit": 2666666678666.6,
            "solo_ratio": "--",
            "flag_ratio": "--",
            "market_value": 20222222313222,
            "volume_ratio": "--",
            "exchange_rate": 0.00033354,
            "belong_group_name": "期货基金"
        },
    ],
    "code": 0,
    "msg": "ok"
}
</pre>


====策略页面====
CGI：/omsv2/researcher/strategy/get_list<br/>
使用说明：策略页面<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/strategy/get_list
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"list": [{
			"id": 1,
			"org_id": 36,
			"manager_id": 363639,
			"manager_name": "zhongyaer",
			"strategy_name": "投机",
			"strategy_type": 2, // 策略类型, 1套保、2投机、3场内期权、4场外期权、5国内套利、6内外套利
			"state": 0,
			"expiration_date": "2025-10-01",
			"VaR_limit": "100",
			"stop_loss_limit": "50",
			"busi_type": 2, // 业务类型, 1期货、2股票、3期权
			"company": "浙江四邦实业有限公司",
			"status": 0,
			"created_at": "-0001-11-30 00:00:00",
			"updated_at": "-0001-11-30 00:00:00"
		}],
		"company": [
			"浙江四邦实业有限公司",
			"旌泰物产(浙江)有限公司"
		]
	},
	"timestamp": 1733107566.859103,
	"timeConsumption": 0.15316486358642578,
	"requestStartTime": null,
	"input": []
}
</pre>

====有效策略====
CGI：/omsv2/researcher/strategy/get_valid_list<br/>
使用说明：有效策略<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/strategy/get_valid_list
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [{
		"id": 1,
		"org_id": 36,
		"manager_id": 363639,
		"manager_name": "zhongyaer",
		"strategy_name": "投机",
		"strategy_type": 2, // 策略类型, 1套保、2投机、3场内期权、4场外期权、5国内套利、6内外套利
		"state": 0,
		"expiration_date": "2025-10-01",
		"VaR_limit": "100",
		"stop_loss_limit": "50",
		"busi_type": 2, // 业务类型, 1期货、2股票、3期权
		"company": "浙江四邦实业有限公司",
		"status": 0,
		"created_at": "-0001-11-30 00:00:00",
		"updated_at": "-0001-11-30 00:00:00"
	}],
	"timestamp": 1733107964.544537,
	"timeConsumption": 0.14785504341125488,
	"requestStartTime": null,
	"input": []
}
</pre>
====设置策略启用停用====
CGI：/omsv2/researcher/strategy/set_state<br/>
使用说明：设置策略启用停用<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| id || int || id
|-
| state || int || 状态，0：启用 1：停用
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/strategy/set_state
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

====策略删除====
CGI：/omsv2/researcher/strategy/del<br/>
使用说明：策略删除<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| id || int || id
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/strategy/del
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

====设置策略延期====
CGI：/omsv2/researcher/strategy/delay<br/>
使用说明：设置策略启用停用<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| id || int || id
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/strategy/delay
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

====编辑，新增策略====
CGI：/omsv2/researcher/strategy/add_modify<br/>
使用说明：设置策略启用停用<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| id || int || id,如果是编辑的话要带上id，否则视为新增
|-
| manager_id || int || 基金经理id
|-
| manager_name || string || name
|-
| strategy_name || string || 策略名称
|-
| strategy_type || int || 策略类型, 1套保、2投机、3场内期权、4场外期权、5国内套利、6内外套利
|-
| state || int || 状态，0：启用 1：停用
|-
| expiration_date || date || 有效期
|-
| VaR_limit || float || VaR限额
|-
| stop_loss_limit || float || 止损限额
|-
| busi_type || int || 业务类型, 1期货、2股票、3期权
|-
| company || string || company
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/strategy/add_modify
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

====策略盈亏汇总表====
CGI：/pms-pub/report-forms/researcher/strategy_profit_summary<br/>
使用说明：策略盈亏汇总表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string || 2024-10-10
|-
| currency || int || 0: 原币 1：人民币
|-
| product_ids|| string|| 交易单元id，逗号分隔
|-
| managers|| string|| 基金经理用户id，逗号分隔
|-
| strategy_types|| string|| 策略类型(文字)，逗号分隔
|-
| strategy_names|| string|| 策略名称(文字)，逗号分隔
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/pms-pub/report-forms/researcher/strategy_profit_summary
<pre>
响应：
{
	"data": {
		"list": [{
				"org": "Cassie-PB测试", // 机构
				"product_id": 11354,
				"user_id": 361005,
				"manager": "Amy境内", // 基金经理
				"exam_depart": "", // 考核部门
				"product_name": "Cassie-股票测试1", // 交易单元
				"hedge_flag": "",
				"strategy_type": "未知策略类型", // 策略类型
				"strategy_name": null, // 策略名称
				"ins_type": "测试券商2期货", // 指令类别
				"hold_direction": "买", // 方向
				"currency": "CNY", // 币种
				"stable_profit": "0.00000000", // 平仓盈亏
				"float_profit": "0.00000000", // 持仓盈亏(收盘价)
				"float_profit_settle": "0.00000000", // 持仓盈亏(结算价)
				"dividend_cash": "0.00000000", // 累计分红
				"close_profit_amount": "0.00000000", // 盈亏合计(收盘价)
				"settle_profit_amount": "0.00000000", // 盈亏合计(结算价)
                                "manager_close_profit_amount": "123", // 基金经理盈亏(收盘价)：只有按人民币查询才出现此字段
                                "manager_settle_profit_amount": "123", // 基金经理盈亏(结算价)：只有按人民币查询才出现此字段
				"fee": "0.00000000", // 手续费
				"close_net_profit": "0.00000000", // 净盈亏(收盘价)
				"close_net_profit_settle": "0.00000000", // 净盈亏(结算价)
				"key": "2024-12-09_11354_361005__测试券商2期货_CNY",
				"today_close_net_profit": "0.00000000", // 当日盈亏(收盘价)
				"today_close_net_profit_settle": "0.00000000" // 当日盈亏(结算价)
			},
			{
				"org": "Cassie-PB测试",
				"product_id": 11354,
				"user_id": 361005,
				"manager": "Amy境内",
				"exam_depart": "",
				"product_name": "Cassie-股票测试1",
				"hedge_flag": "",
				"strategy_type": "未知策略类型",
				"strategy_name": null,
				"ins_type": "测试券商2未知",
				"hold_direction": "卖",
				"currency": "CNY",
				"stable_profit": "0.00000000",
				"float_profit": "0.00000000",
				"float_profit_settle": "0.00000000",
				"dividend_cash": "0.00000000",
				"close_profit_amount": "0.00000000",
				"settle_profit_amount": "0.00000000",
				"fee": "0.00000000",
				"close_net_profit": "0.00000000",
				"close_net_profit_settle": "0.00000000",
				"key": "2024-12-09_11354_361005__测试券商2未知_CNY",
				"today_close_net_profit": "0.00000000",
				"today_close_net_profit_settle": "0.00000000"
			}
		],
		"total": {
			"CNY": {
				"stable_profit": "0.00000000",
				"float_profit": "3763000587.91717000",
				"float_profit_settle": "10889662839.91717000",
				"dividend_cash": "-3110.40000000",
				"close_profit_amount": "3762997477.51717000",
				"settle_profit_amount": "10889659729.51717000",
				"fee": "0.00000000",
				"close_net_profit": "3762997477.51717000",
				"close_net_profit_settle": "10889659729.51717000"
			}
		}
	},
	"code": 0,
	"msg": "ok"
}
</pre>

====策略盈亏汇总报表单项明细====
CGI：/pms-pub/report-forms/researcher/strategy_profit_detail<br/>
使用说明：策略盈亏汇总报表单项明细<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| key || string || 报表单项中返回的字段key
|-
| currency || int || 0:原币 1：人民币
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/pms-pub/report-forms/researcher/strategy_profit_detail
<pre>
响应：
{
	"data": [{
			"id": 503486,
			"org_id": 36,
			"user_id": 361005,
			"product_id": 11372,
			"stock_id": "600000.SH", // 品种合约
			"stock_name": "浦发银行",
			"market": 1,
			"currency": "CNY", // 币种
			"sec_type": 1,
			"total_volume": "200", // 总数量
			"hold_volume": "200", // 持仓手数
			"frozen_volume": "0",
			"usable_volume": "200",
			"exchange_rate": "1",
			"multiplier": "1", // 每手数量
			"deposit": "1",
			"cost_price": "6.88", // 持仓均价
			"cost_price_cny": "6.88",
			"latest_price": "9.66", // 当日收盘价
			"settle_price": "9.66", // 当日结算价
			"hold_cost": "1376",
			"cost_mv": "1376.00000000",
			"lday_cash_cost": "51.48533793",
			"total_cash_cost": "51.63822681",
			"market_value": "1932.00000000",
			"market_value_raw": "1932.00000000",
			"market_value_settle_raw": "1932.00000000",
			"float_profit": "556.00000000", 
			"float_profit_raw": "556.00000000", // 持仓盈亏 收盘价
			"float_profit_settle_raw": "556.00000000", // 持仓盈亏 结算价
			"lday_float_profit": "564.00000000",
			"lday_float_profit_raw": "564.00000000",
			"lday_float_profit_settle_raw": "564.00000000",
			"stable_profit": "0",
			"stable_profit_raw": "0", // 平仓盈亏
			"day_stable_profit": "0",
			"day_stable_profit_raw": "0",
			"dividend_cash": "57.78", 
			"dividend_cash_raw": "0", // 累计分红
			"fee_raw": "0",
			"hold_direction": 0, // 方向：0：买 1：卖
			"hedge_flag": "",
			"created_at": "2024-12-09 00:10:03",
			"updated_at": "2024-12-09 15:30:05",
			"date": "2024-12-09"
		},
		{
			"id": 503547,
			"org_id": 36,
			"user_id": 361005,
			"product_id": 11372,
			"stock_id": "ACOR.US",
			"stock_name": "阿索尔达治疗",
			"market": 18,
			"currency": "CNY",
			"sec_type": 11,
			"hold_volume": "100000",
			"frozen_volume": "0",
			"usable_volume": "100000",
			"exchange_rate": "7.2708",
			"multiplier": "1",
			"deposit": "1",
			"cost_price": "1.234009",
			"cost_price_cny": "8.908188",
			"latest_price": "1.23020",
			"settle_price": "0",
			"hold_cost": "890818.8",
			"cost_mv": "897223.26372000",
			"lday_cash_cost": "19662.11050063",
			"total_cash_cost": "19761.80197437",
			"market_value": "888069.078",
			"market_value_raw": "0",
			"market_value_settle_raw": "0",
			"float_profit": "-2749.67901",
			"float_profit_raw": "0",
			"float_profit_settle_raw": "0",
			"lday_float_profit": "-2749.67901",
			"lday_float_profit_raw": "0",
			"lday_float_profit_settle_raw": "0",
			"stable_profit": "0",
			"stable_profit_raw": "0",
			"day_stable_profit": "0",
			"day_stable_profit_raw": "0",
			"dividend_cash": "0",
			"dividend_cash_raw": "0",
			"fee_raw": "0",
			"hold_direction": 0,
			"hedge_flag": "",
			"created_at": "2024-12-09 00:10:03",
			"updated_at": "2024-12-09 15:30:05",
			"date": "2024-12-09"
		}
	],
	"code": 0,
	"msg": "ok"
}
</pre>

====策略盈亏汇总报表导出====
CGI：/bms-pub/report/export_strategy_profit_summary<br/>
使用说明：策略盈亏汇总报表导出<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| currency || int || 0:原币 1：人民币
|-
| date || string || 2023-10-10
|-
| product_ids|| string|| 交易单元id，逗号分隔
|-
| managers|| string|| 基金经理用户id，逗号分隔
|-
| strategy_types|| string|| 策略类型(文字)，逗号分隔
|-
| strategy_names|| string|| 策略名称(文字)，逗号分隔
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/report/export_strategy_profit_summary
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>
====考核部门列表====
CGI：/omsv2/researcher/get_exam_depart_list<br/>
使用说明：获取考核部门列表<br/>
请求方法：GET<br/>
{| class="wikitable"
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/omsv2/researcher/get_exam_depart_list
<pre>
响应：
"code": 0,
  "msg": "ok",
  "data": {
    "exam_depart_list": [
      {
        "exam_depart": "农产品部",
        "user_list": "361144,363639,361018,361005,361001,361006,363602,360001,361007,361008,361009,361003"
      }
    ],
    "research_list": [
      {
        "user_id": 360000,
        "real_name": "36机构管理员"
      },
      {
        "user_id": 360159,
        "real_name": "冯一一境内"
      },
      {
        "user_id": 360259,
        "real_name": "冯二二境外"
      },
      {
        "user_id": 363639,
        "real_name": "zhongyaer"
      },
</pre>

====编辑考核部门====
CGI：http://10.150.3.27/omsv2/researcher/update_exam_depart<br/>
使用说明：编辑考核部门<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type || string || 'create'-创建考核部门 'save'-考核部门新增删除基金经理 'rename'-重命名考核部门 'delete'-删除考核部门
|-
| exam_depart || string || 考核部门名称 
|-
| new_exam_depart || string || 重命名-考核部门名称
|-
| user_id || string || 基金经理id save和create需要传递此参数
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
    "code": 0,
    "msg": "",
    "data": []
        
}
</pre>

====部门风控报表(旌泰)====

=====基金经理限额列表=====
CGI：http://10.150.3.27/omsv2/researcher/quota/get_list<br/>
使用说明：基金经理限额列表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "user_id": 80001,
            "real_name": "周珍珍", //姓名
            "var_value": "", //vaR限额
            "stop_loss": ""//止损限额
        },
        {
            "user_id": 80002,
            "real_name": "刘亮亮",
            "var_value": "",
            "stop_loss": ""
        },
        {
            "user_id": 80020,
            "real_name": "冯一一基金经理",
            "var_value": "",
            "stop_loss": ""
        },
        {
            "user_id": 80030,
            "real_name": "冯二二基金经理",
            "var_value": "",
            "stop_loss": ""
        }
    ],
    "timestamp": 1734509991.736458,
    "timeConsumption": 0.30162811279296875,
    "requestStartTime": null,
    "input": []
}
</pre>

=====基金经理限额设置=====
CGI：http://10.150.3.27/omsv2/researcher/quota/edit<br/>
使用说明：基金经理限额列表<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| items || array || 设置列表结构和上面list内容一致 如下:
|-
|}
<pre>
[
        {
            "user_id": 80001,
            "real_name": "周珍珍",
            "var_value": "",
            "stop_loss": ""
        },
        {
            "user_id": 80002,
            "real_name": "刘亮亮",
            "var_value": "",
            "stop_loss": ""
        },
        {
            "user_id": 80020,
            "real_name": "冯一一基金经理",
            "var_value": "",
            "stop_loss": ""
        },
        {
            "user_id": 80030,
            "real_name": "冯二二基金经理",
            "var_value": "",
            "stop_loss": ""
        }
    ]
</pre>
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
    "code": 0,
    "msg": "",
    "data": [],
    "timestamp": 1734509991.736458,
    "timeConsumption": 0.30162811279296875,
    "requestStartTime": null,
    "input": []
}
</pre>

=====部分风控接口=====
CGI：http://10.150.3.27/pms-pub/report-forms/researcher/dep_risk?date=2024-12-19&dimension=1<br/>
使用说明：部分风控接口<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string|| 日期:格式 2024-12-20
|-
| dimension|| int || 维度:1基金经理 2基金经理+策略
|-
| order_by|| string|| 排序字段
|-
| order|| string|| 排序顺序:asc 正序 desc倒序
|-
|}

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
  "data": [
    {
      "user_id": 80030,
      "user_name": "冯二二基金经理", //基金经理名称
      "hedge_flag": "19",
      "hedge_flag_name": "无", //策略名称:基金经理模式下不展示
      "var_value": "7,379.36",//当日var值
      "var_change": "--",//var变动
      "var_limit": "",//var限额
      "var_rate": "--",//风险度
      "stop_loss_rate": "--",
      "daily_profit_loss": "-25,185.9998", //当日累计盈亏(收盘价)
      "daily_net_profit_loss": "-25,185.9998", //当日累计净盈亏(收盘价)
      "profit_loss_change": "-6,498.8",//盈亏变动(收盘价)
      "net_profit_loss_change": "-6,498.8",//净盈亏变动(收盘价)
      "risk_text": "未设置VaR限额,未设置止损限额",//预警文案
      "stop_loss_limit": "--"
    },
    {
      "user_id": 80020,
      "user_name": "冯一一基金经理",
      "hedge_flag": "17",
      "hedge_flag_name": "无",
      "var_value": "473,147,288.98",
      "var_change": "--",
      "var_limit": "1",
      "var_rate": "47,314,728,897.53",
      "stop_loss_rate": -2116389.43,
      "daily_profit_loss": "1,384,778,122,670,074.5000",
      "daily_net_profit_loss": "1,384,778,122,670,074.5000",
      "profit_loss_change": "14,067,375.5",
      "net_profit_loss_change": "14,067,375.5",
      "risk_text": "vaR全部平仓预警",
      "stop_loss_limit": "-2,116,389.43"
    },
  ],
  "code": 0,
  "msg": "ok"
}
</pre>
=====部分风控导出接口=====
CGI：bms-pub/report/export_dep_risk_report?date=2024-12-19&dimension=1<br/>
使用说明：部分风控接口<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| date || string|| 日期:格式 2024-12-20
|-
| dimension|| int || 维度:1基金经理 2基金经理+策略
|-
| var_count|| int|| var统计天数250,90
|-
| order_by|| string|| 排序字段
|-
| order|| string|| 排序顺序:asc 正序 desc倒序
|-
|}

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
  "data":null,
  "code": 0,
  "msg": "ok"
}
</pre>


====研究员锁账====
=====锁账范围=====
CGI：/omsv2/researcher/locked/get_list?year=2025<br/>
使用说明：锁账范围<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| year|| string|| 年份:2024
|-
|}

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
  "data":{
    "init_date": "2024-01-01", //起始日期
    "start": null, //锁定开始日期
    "end": null //锁定结束日期
  },
  "code": 0,
  "msg": "ok"
}
</pre>

=====锁账=====
CGI：/omsv2/researcher/locked/do_locked/<br/>
使用说明：研究员锁账<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start|| string|| 开始日期:2024-01-01
|-
| end|| string|| 结束日期:2024-01-01
|-
|}

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
    "code": 1000,
    "msg": "无效操作：所选日期已全部锁定",
    "data": [],
}
</pre>

=====解账=====
CGI：/omsv2/researcher/locked/do_unlocked/<br/>
使用说明：研究员解账<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start|| string|| 开始日期:2024-01-01
|-
| end|| string|| 结束日期:2024-01-10
|-
|}

返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
<pre>
响应：
{
    "code": 0,
    "msg": "ok",
    "data": [],
    "timestamp": 1741331917.365532,
    "timeConsumption": 0.16638398170471191,
    "requestStartTime": null,
    "input": {
        "start": "2024-01-03",
        "end": "2024-01-10"
    }
}
</pre>

====盈亏平衡表====
CGI：/pms-pub/report-forms/researcher/break_even?date=2025-03-11&product_ids=11413,11414,11416,11417<br/>
使用说明：盈亏平衡表<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
| date || string || 2023-10-10
|-
| product_ids|| string|| 交易单元id，逗号分隔
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/pms-pub/report-forms/researcher/break_even?date=2025-03-11&product_ids=11413,11414,11416,11417
<pre>
响应：
{
	"data": {
		"in_stock": [{
				"ins_type": "内盘股票",
				"org": "模拟网关基金",
				"product_name": "模拟网关单元",
				"currency": "CNH",
				"deposit_withdrawal": 0, // 累计出入金
				"stable_profit_raw": "0.00", // 当年累计平仓
				"float_profit_settle_raw": "-20,000,006,418.00", // 当天持仓盈亏
				"dividend_cash_raw": "111.11", // 当年累计分红
				"year_beginning_equity": "116,550,002.22", // 年 期初权益
				"year_fee": "33,790,182,716.87", // 当年累计手续费
				"benefits_system": "116,550,002.22", // 权益合计 系统计算
				"account_fee": "0.00", // 手续费 账单
				"account_benefits": "0.00", // 权益合计 账单
				"fee_difference": "33,790,182,716.87", // 手续费差额
				"benefits_difference": "116,550,002.22" // 权益差额
			}

		],
		"out_stock": [{
				"ins_type": "外盘股票",
				"org": "模拟网关新基金",
				"product_name": "模拟网关单元2",
				"currency": "CNY",
				"deposit_withdrawal": 0,
				"stable_profit_raw": "4,651.09",
				"float_profit_settle_raw": "1,120.48",
				"dividend_cash_raw": "186.33",
				"year_beginning_equity": "27.33",
				"year_fee": "636.15",
				"benefits_system": "6,138.24",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "636.15",
				"benefits_difference": "27.33"
			}

		],
		"in_future": [{
				"ins_type": "内盘期货",
				"org": "模拟网关基金",
				"product_name": "模拟网关单元",
				"currency": "CNH",
				"deposit_withdrawal": 0,
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "-18,000.00",
				"dividend_cash_raw": "111.11",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "116,550,002.22",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			},
			{
				"ins_type": "内盘期货",
				"org": "模拟网关基金",
				"product_name": "模拟网关单元",
				"currency": "CNY",
				"deposit_withdrawal": 0,
				"stable_profit_raw": "33.33",
				"float_profit_settle_raw": "12,164,055,666.67",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "11,926,418,802.22",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			}
		],
		"out_future": [{
			"ins_type": "外盘期货",
			"org": "模拟网关新基金",
			"product_name": "模拟网关单元2",
			"currency": "CNY",
			"deposit_withdrawal": 0,
			"stable_profit_raw": "0.00",
			"float_profit_settle_raw": "0.00",
			"dividend_cash_raw": "0.00",
			"year_beginning_equity": "27.33",
			"year_fee": "636.15",
			"benefits_system": "-2,499,972.67",
			"account_fee": "0.00",
			"account_benefits": "0.00",
			"fee_difference": "636.15",
			"benefits_difference": "27.33"
		}],
		"stock": [{
				"ins_type": "股票",
				"org": "模拟网关基金",
				"product_name": "模拟网关单元3",
				"currency": "CNY",
				"deposit_withdrawal": 0,
				"stable_profit_raw": "-8,100.00",
				"float_profit_settle_raw": "1,111,109,307.23",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "-8,000.00",
				"year_fee": "-1,088.89",
				"benefits_system": "1,111,092,715.23",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "-1,088.89",
				"benefits_difference": "-8,000.00"
			},
			{
				"ins_type": "股票",
				"org": "模拟网关基金",
				"product_name": "模拟网关单元3",
				"currency": "USD",
				"deposit_withdrawal": 0,
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "567.60",
				"dividend_cash_raw": "1,466.71",
				"year_beginning_equity": "-8,000.00",
				"year_fee": "-1,088.89",
				"benefits_system": "-8,000.00",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "-1,088.89",
				"benefits_difference": "-8,000.00"
			}
		],
		"fund": [{
			"ins_type": "基金",
			"org": "模拟网关基金",
			"product_name": "模拟网关单元3",
			"currency": "CNY",
			"deposit_withdrawal": 0,
			"stable_profit_raw": "0.00",
			"float_profit_settle_raw": "-1.80",
			"dividend_cash_raw": "0.00",
			"year_beginning_equity": "-8,000.00",
			"year_fee": "-1,088.89",
			"benefits_system": "-8,000.00",
			"account_fee": "0.00",
			"account_benefits": "0.00",
			"fee_difference": "-1,088.89",
			"benefits_difference": "-8,000.00"
		}],
		"future": [{
			"ins_type": "期货",
			"org": "模拟网关基金",
			"product_name": "模拟网关单元3",
			"currency": "CNY",
			"deposit_withdrawal": 0,
			"stable_profit_raw": "0.00",
			"float_profit_settle_raw": "38,329,500.00",
			"dividend_cash_raw": "0.00",
			"year_beginning_equity": "-8,000.00",
			"year_fee": "-1,088.89",
			"benefits_system": "38,621,500.00",
			"account_fee": "0.00",
			"account_benefits": "0.00",
			"fee_difference": "-1,088.89",
			"benefits_difference": "-8,000.00"
		}],
		"in_stock_total": {
			"CNH": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "-20,000,006,418.00",
				"dividend_cash_raw": "111.11",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "116,550,002.22",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			},
			"CNY": {
				"stable_profit_raw": "330.00",
				"float_profit_settle_raw": "-56,790,063,159.09",
				"dividend_cash_raw": "93.62",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "-56,673,510,076.25",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			},
			"HKD": {
				"stable_profit_raw": "-680.00",
				"float_profit_settle_raw": "2,661.48",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "116,558,618.18",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			},
			"ZAR": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "3,366,676,958,343.33",
				"dividend_cash_raw": "20,200.00",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "116,550,002.22",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			}
		},
		"out_stock_total": {
			"CNY": {
				"stable_profit_raw": "4,651.09",
				"float_profit_settle_raw": "1,247.48",
				"dividend_cash_raw": "186.33",
				"year_beginning_equity": "27.33",
				"year_fee": "636.15",
				"benefits_system": "6,265.24",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "636.15",
				"benefits_difference": "27.33"
			},
			"HKD": {
				"stable_profit_raw": "6,315.00",
				"float_profit_settle_raw": "1,648.91",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "27.33",
				"year_fee": "636.15",
				"benefits_system": "2,581.39",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "636.15",
				"benefits_difference": "27.33"
			}
		},
		"in_future_total": {
			"CNH": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "-18,000.00",
				"dividend_cash_raw": "111.11",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "116,550,002.22",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			},
			"CNY": {
				"stable_profit_raw": "33.33",
				"float_profit_settle_raw": "12,280,797,666.67",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "116,550,002.22",
				"year_fee": "33,790,182,716.87",
				"benefits_system": "12,043,160,802.22",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "33,790,182,716.87",
				"benefits_difference": "116,550,002.22"
			}
		},
		"out_future_total": {
			"CNY": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "0.00",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "27.33",
				"year_fee": "636.15",
				"benefits_system": "-2,499,972.67",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "636.15",
				"benefits_difference": "27.33"
			}
		},
		"stock_total": {
			"CNY": {
				"stable_profit_raw": "-8,100.00",
				"float_profit_settle_raw": "1,111,109,344.23",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "-8,000.00",
				"year_fee": "-1,088.89",
				"benefits_system": "1,111,092,750.23",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "-1,088.89",
				"benefits_difference": "-8,000.00"
			},
			"USD": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "567.60",
				"dividend_cash_raw": "1,466.71",
				"year_beginning_equity": "-8,000.00",
				"year_fee": "-1,088.89",
				"benefits_system": "-8,000.00",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "-1,088.89",
				"benefits_difference": "-8,000.00"
			}
		},
		"fund_total": {
			"CNY": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "-0.50",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "-8,000.00",
				"year_fee": "-1,088.89",
				"benefits_system": "-8,000.00",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "-1,088.89",
				"benefits_difference": "-8,000.00"
			}
		},
		"future_total": {
			"CNY": {
				"stable_profit_raw": "0.00",
				"float_profit_settle_raw": "155,071,500.00",
				"dividend_cash_raw": "0.00",
				"year_beginning_equity": "-8,000.00",
				"year_fee": "-1,088.89",
				"benefits_system": "38,621,500.00",
				"account_fee": "0.00",
				"account_benefits": "0.00",
				"fee_difference": "-1,088.89",
				"benefits_difference": "-8,000.00"
			}
		}
	},
	"code": 0,
	"msg": "ok"
}
</pre>

====盈亏平衡报表导出====
CGI：/bms-pub/report/export_break_even<br/>
使用说明：策略盈亏汇总报表导出<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| currency || int || 0:原币 1：人民币
|-
| date || string || 2023-10-10
|-
| product_ids|| string|| 交易单元id，逗号分隔
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/report/export_break_even
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

====策略盈亏汇总表导入出入金====
CGI： /bms-pub/product/import_deposit_withdrawal<br/>
使用说明：策略盈亏汇总表导入出入金<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| upload_file || string || 上传后返回的文件名
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/product/import_deposit_withdrawal
模版下载:http://10.150.3.27/utility/files/%E5%87%BA%E5%85%A5%E9%87%91%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.csv
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

====策略盈亏汇总表导入权益====
CGI： /bms-pub/product/import_fee_benefits<br/>
使用说明：策略盈亏汇总表导入权益<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| upload_file || string || 上传后返回的文件名
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/bms-pub/product/import_fee_benefits
模版下载:http://10.150.3.27/utility/files/账单导入模版.csv
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [],
}
</pre>

===业绩归因分析===
====风险收益指标====
CGI：/omsv2/researcher/performance_analysis/relative_profit_attribute<br/>
使用说明：获取风险收益指标<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date|| string || 开始时间2023-09-07
|-
| end_date|| string || 结束时间2023-09-07
|-
| benchmark_index|| string || 基准指数代码 如000300.SH
|-
| user_id|| string || 研究员id 361005
|-
| combi_id|| id|| 虚拟组合id，用于虚拟组合查询，虚拟组合查询不会再请求风险收益数据接口
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/omsv2/researcher/performance_analysis/relative_profit_attribute?start_date=2023-09-01&end_date=2023-09-06&benchmark_index=000300.SH&user_id=361005
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"rb": {
			"2023-09-04": 0.015154991836982,//基准每日收益率
			"2023-09-05": -0.0074383922888059,
			"2023-09-06": -0.002169975290028
		},
		"rp": {
			"2023-09-04": -0.00055104008816631,//每日收益率
			"2023-09-05": 0.00055134390075806,
			"2023-09-06": 0.00013776002204158
		},
		"accu_rb": 0.0054173952720435,//基准指数区间收益率
		"accu_rp": 0.00013776002204158,//组合区间收益率
		"tar": 57.433508262311,//组合年化收益率
		"index_tar": 1.1638248350375,//基准指数年化收益率
		"rep": 0.005279635250002,//组合超额收益
		"avr": 0.008840328182535,//组合年化波动率
		"sharpe": 6213.9670754348,//夏普sharpe
		"ir": 6365.1125009635,//信息比率 information ratio
		"mdd": 0,//组合区间最大回撤
		"cr": "--",//卡玛比率Calmar ratio
		"turnover_rate": 0,//组合区间换手率
		"range_accu_rb": {
			"2023-09-04": 0.015154991836982,//基准某天的累计收益率
			"2023-09-05": 0.0076038707737591,
			"2023-09-06": 0.0054173952720435
		},
		"range_accu_rp": {
			"2023-09-04": -0.00055104008816631,//组合某天的累计收益率
			"2023-09-05": 0,
			"2023-09-06": 0.00013776002204158
		},
		"range_rep": {
			"2023-09-04": -0.015706031925149,//某天的累计超额收益
			"2023-09-05": -0.0076038707737591,
			"2023-09-06": -0.005279635250002
		},
		"benchmark_name": "沪深300",//基准指数名称
		"user_name": "Cassie境内"//用户名称
	},
	"timestamp": 1694054498.8799,
	"timeConsumption": 0.65225911140442,
	"requestStartTime": null,
	"input": {
		"start_date": "2023-09-01",
		"end_date": "2023-09-06",
		"benchmark_index": "000300.SH",
		"user_id": "361005"
	}
}
</pre>

====风险收益指标导出====
CGI：bms-pub/research/export_relative_profit_attr<br/>
使用说明：导出风险收益指标<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date|| string || 开始时间2023-09-07
|-
| end_date|| string || 结束时间2023-09-07
|-
| benchmark_index|| string || 基准指数代码 如000300.SH
|-
| user_id|| string || 研究员id 361005
|-
| org_id|| string || 机构id 36
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/bms-pub/research/export_relative_profit_attr?start_date=2023-08-01&end_date=2023-09-05&benchmark_index=000300.SH&user_id=361005&org_id=36
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": []
}
</pre>
====风险收益数据====
CGI：http://10.150.3.27/omsv2/researcher/performance_analysis/get_performance_analysis_data<br/>
使用说明：获取风险收益数据<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| start_date|| string|| 开始时间
|-
| end_dete|| string || 结束时间
|-
| benchmark_index|| string || 基准指数 
|-
| user_id|| string || 研究员id
|-
| brinson_type|| string || 0净资产归因 1全仓归因 
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/omsv2/researcher/performance_analysis/get_performance_analysis_data?start_date=2023-09-01&end_date=2023-09-07&benchmark_index=HSI.HI&user_id=361018&brinson_type=0
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": {
		"extra_profit_project": 0.0059431364934859,//组合超额贡献
		"industry_contribute_by_project": -0.0051185425945137,//行业配置贡献
		"stock_select_contribute_project": 0.00028665261217051,//个股选择贡献
		"other_extra_profit": 0.0012408789446168,//其它
		"residual": 0.0050506394406543,//残差
		"industry_attr": [
			{
				"weight_industry": 0.000039984901714286,//组合行业权重
				"weight_industry_index": 4.8569998774995e-20,//基准行业权重
				"weight_diff": 0.000039984901714286,//权重差
				"extra_contribute": -0.00064653158495792,//组合超额贡献
				"industry_contribute": -0.00064653158495792,//行业总贡献
				"industry_contribute_by_industry": -0.001167172388871,//行业配置贡献
				"stock_select_contribute_industry": 0//个券选择贡献
			},
			{},
            {},
		],
		"stock_attr": {
			"stock": {//区间维度
				"project_weight": 0.010645554492,//组合权重
				"weight_project_index": 0.991071428574,//基准权重
				"product_contribute_project": -0.00010049735876888,//组合贡献
				"ref_contribute_project": -0.0060436338522548,//基准贡献
				"extra_profit_project": 0.0059431364934859,//超额收益
				"industry_contribute_by_project": -0.0051185425945137,//行业配置贡献
				"stock_select_contribute_project": 0.00028665261217051,//个股选择贡献
				"child": [
					{// 行业维度
						"weight_position_industry": 0,//组合权重
						"weight_industry_index": "0.014828571429",//基准权重
						"product_contribute_industry": 0,//组合贡献
						"ref_contribute_industry": -0.0002956824618766,//基准贡献
						"extra_profit_industry": 0.0002956824618766,//超额收益
						"industry_contribute_by_industry": 0.00020662526664015,//行业配置贡献
						"stock_select_contribute_industry": 0,//个股选择贡献
						"industry_name": "综合",
						"child": [{ //个股维度
								"weight_position_stock": 0,//组合权重
								"weight_index_stock": "0.009900000000",//基准权重
								"product_contribute_stock": 0,//基准权重
								"ref_contribute_stock": -0.00015555955604761,//基准贡献
								"extra_profit_stock": 0.00015555955604761,//超额收益
								"industry_contribute_by_stock": 0.000099829319102384,//行业配置贡献
								"stock_select_contribute_stock": 0,//个股选择贡献
								"target_id": "00001.HK",//代码
								"hold_direction": "0//多空方向
							},
							{
								"weight_position_stock": 0,
								"weight_index_stock": "0.004928571429",
								"product_contribute_stock": 0,
								"ref_contribute_stock": -0.000140122905829,
								"extra_profit_stock": 0.000140122905829,
								"industry_contribute_by_stock": 0.00010679594753777,
								"stock_select_contribute_stock": 0,
								"target_id": "00267.HK",
								"hold_direction": "0"
							}
						]
					},
					{},
				]
			},
			"other": {} //类似stock_attr下的stock数据结构
		}
	},
</pre>


====新增虚拟组合====
CGI：https://10.150.3.27/omsv2/researcher/performance_analysis/set_researcher_combi<br/>
使用说明：获取风险收益数据<br/>
请求方法：POST<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| combi[]['id']    || array  || 虚拟组合id，用于更新现有，无id则为新增
|-
| combi[]['name']  || array  || 虚拟组合名称
|-
| combi[]['combi'] || array  || 组合权重map，json格式 {"360001":"1"}
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
https://10.150.3.27/omsv2/researcher/performance_analysis/set_researcher_combi
<pre>
响应：
{
    "code": 0,
    "msg": "成功",
    "data": [],
    "timestamp": 1701660429.647,
    "timeConsumption": 0.24192595481873,
    "requestStartTime": null,
    "input": {
        "combi": [
            {
                "id": "",
                "name": "1",
                "combi": "{\"360001\":\"1\"}"
            }
        ]
    }
}
</pre>

====盈亏分析报表-基金列表信息====
CGI：http://10.150.3.27/omsv2/researcher/profit_loss/get_group_list<br/>
使用说明：基金列表信息<br/>
请求方法：GET<br/>
请求参数：<br/>
无
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/bms-pub/research/export_relative_profit_attr?start_date=2023-08-01&end_date=2023-09-05&benchmark_index=000300.SH&user_id=361005&org_id=36
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [{
		"id": 769,//基金id
		"org_id": 36,
		"name": "冯大大enfusion基金_CNY",
		"currency": 1, //清算币种 1CNY 2USD
		"user_id": [360001, 3602590] //基金经理id
	}, {
		"id": 769,
		"org_id": 36,
		"name": "冯大大enfusion基金_USD",
		"currency": 1,
		"user_id": [360259]
	}],
	"timestamp": 1694003546.2772,
	"timeConsumption": 0.19625091552734,
	"requestStartTime": null,
	"input": []
}
</pre>

====盈亏分析报表-基金经理信息====
CGI：omsv2/researcher/profit_loss/get_user_list<br/>
使用说明：基金经理信息<br/>
请求方法：GET<br/>
请求参数：<br/>
无
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/omsv2/researcher/profit_loss/get_user_list
<pre>
响应：
{
	"code": 0,
	"msg": "ok",
	"data": [{
		"user_id": 361144, //基金经理id
		"real_name": "sky",//名称
		"nick_name": "sky",
		"is_virtual": 0,
		"currency": 1,//清算币种 1CNY 2USD
		"relate_users": ""
	}, {
		"user_id": 363639,
		"real_name": "zhongyaer",
		"nick_name": "zhongyaer",
		"is_virtual": 0,
		"currency": 1,
		"relate_users": ""
	}],
	"timestamp": 1694066284.3133,
	"timeConsumption": 0.48309588432312,
	"requestStartTime": null,
	"input": []
}
</pre>

====盈亏分析报表-主体内容信息====
CGI：omsv2/researcher/absolute_profit_attribution<br/>
使用说明：导出风险收益指标<br/>
请求方法：GET<br/>
请求参数：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| type|| int || 1 基金维度 2 基金经理维度 3期货基金维度 4期货经理维度 
|-
| user_id|| string || 基金经理/研究员id 361005 type为1的情况 需要把基金下面的 user_id 按,符号隔开一起传入 type为2时候只传一个基金经理id
|-
| group_id|| string || 基金id type为1的情况下必填
|-
| startDate|| string || 开始时间2023-09-07
|-
| endDate|| string || 结束时间2023-09-07
|-
| orderBy|| string || 排序字段 列表中的对应列值
|-
| order|| string || 正序 asc 倒序 desc
|-
| currency|| int || 1CNY 2USD (期货固定为 1CNY)
|-
| page|| int || 页码 默认1 (期货类型生效)
|-
| pageSize|| int || 分页数量 默认200 (期货类型生效)
|-
|}
返回值：<br/>
{| class="wikitable"
|-
! 参数 !! 类型 !! 说明
|-
| code || int || 调用结果返回码
|-
| msg || string || API调用结果以及出错信息
|-
| data || string || json数据格式 , 返回API 响应结果 
|}
示例：<br/>
http://10.150.3.27/omsv2/researcher/absolute_profit_attribution?org_id=36&user_id=363639&startDate=2023-08-01&endDate=2023-08-31&type=2&group_id=&currency=1&orderBy=&order=
<pre>
响应：
结构说明: assetDetail 为上面列表的数据 list为结构内容 sum为合计内容 结构一致 字段内容一致
name 名称
total_profit 总盈亏
end_market_value 期末市值
end_market_ratio 市值占比
start_market_value 期初市值
start_market_ratio 期初市值占比
buy_money 买入金额
sell_money 卖出金额
turnover_ratio 换手率
children 子集对象 结构和上面一致

期货新增字段说明
sector 版块
breed 品种
stock_code 合约
hedge_flag 策略
assetDetail 同样是列表数据 list为当前页内容 total为总条数

行业信息结构说明 industryData 全部行业 profitIndustryData盈利行业 lossIndustryData亏损行业
name 行业名称/版块名称
total_profit 收益总金额
total_profit_ratio 行业占比

{
	"code": 0,
	"msg": "ok",
	"data": {
		"assetDetail": {
			"list": [{
				"name": "内地股票",
				"total_profit": -339551.8959,
				"end_market_value": 1371845,
				"end_market_ratio": 55.235513961073,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": [{
					"name": "通信",
					"total_profit": -247599.996,
					"end_market_value": 1324400,
					"end_market_ratio": 53.325204152106,
					"start_market_value": 0,
					"start_market_ratio": 0,
					"buy_money": 0,
					"sell_money": 0,
					"turnover_ratio": 0,
					"children": [{
						"name": "603236.SH 移远通信",
						"total_profit": -247599.996,
						"end_market_value": "1324400",
						"end_market_ratio": 53.325204152106,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}]
				}, {
					"name": "建筑装饰",
					"total_profit": 2022.0004,
					"end_market_value": 37422,
					"end_market_ratio": 1.5067470475537,
					"start_market_value": 0,
					"start_market_ratio": 0,
					"buy_money": 0,
					"sell_money": 0,
					"turnover_ratio": 0,
					"children": [{
						"name": "600039.SH 四川路桥(空)",
						"total_profit": 3414.0008,
						"end_market_value": "24948",
						"end_market_ratio": 1.0044980317025,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}, {
						"name": "600039.SH 四川路桥",
						"total_profit": -1392.0004,
						"end_market_value": "12474",
						"end_market_ratio": 0.50224901585123,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}]
				}, {
					"name": "计算机",
					"total_profit": 886.1,
					"end_market_value": 0,
					"end_market_ratio": 0,
					"start_market_value": 0,
					"start_market_ratio": 0,
					"buy_money": 0,
					"sell_money": 0,
					"turnover_ratio": 0,
					"children": [{
						"name": "600446.SH 金证股份",
						"total_profit": 886.1,
						"end_market_value": "0",
						"end_market_ratio": 0,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}]
				}, {
					"name": "国防军工",
					"total_profit": -94860.0003,
					"end_market_value": 10023,
					"end_market_ratio": 0.40356276141389,
					"start_market_value": 0,
					"start_market_ratio": 0,
					"buy_money": 0,
					"sell_money": 0,
					"turnover_ratio": 0,
					"children": [{
						"name": "002414.SZ 高德红外",
						"total_profit": -94860.0003,
						"end_market_value": "10023",
						"end_market_ratio": 0.40356276141389,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}]
				}]
			}, {
				"name": "基金",
				"total_profit": 0,
				"end_market_value": 0,
				"end_market_ratio": 0,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": []
			}, {
				"name": "债券",
				"total_profit": 0,
				"end_market_value": 0,
				"end_market_ratio": 0,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": []
			}, {
				"name": "港股",
				"total_profit": -267414.396166,
				"end_market_value": 852263.56,
				"end_market_ratio": 34.315258478104,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": [{
					"name": "有色金属",
					"total_profit": 525.42,
					"end_market_value": 34167.96,
					"end_market_ratio": 1.3757274557996,
					"start_market_value": 0,
					"start_market_ratio": 0,
					"buy_money": 0,
					"sell_money": 0,
					"turnover_ratio": 0,
					"children": [{
						"name": "00358.HKSZ 江西铜业股份(空)",
						"total_profit": 604.2,
						"end_market_value": "22778.64",
						"end_market_ratio": 0.91715163719973,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}, {
						"name": "00358.HKSH 江西铜业股份",
						"total_profit": -78.78,
						"end_market_value": "11389.32",
						"end_market_ratio": 0.45857581859986,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}]
				}, {
					"name": "医药生物",
					"total_profit": -267939.816166,
					"end_market_value": 818095.6,
					"end_market_ratio": 32.939531022304,
					"start_market_value": 0,
					"start_market_ratio": 0,
					"buy_money": 0,
					"sell_money": 0,
					"turnover_ratio": 0,
					"children": [{
						"name": "06127.HKSH 昭衍新药",
						"total_profit": -267939.816166,
						"end_market_value": 818095.6,
						"end_market_ratio": 32.939531022304,
						"start_market_value": 0,
						"start_market_ratio": 0,
						"buy_money": 0,
						"sell_money": 0,
						"turnover_ratio": 0
					}]
				}]
			}, {
				"name": "美股",
				"total_profit": 0,
				"end_market_value": 0,
				"end_market_ratio": 0,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": []
			}, {
				"name": "期货",
				"total_profit": 0,
				"end_market_value": 0,
				"end_market_ratio": 0,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": []
			}],
			"sum": {
				"name": "合计",
				"total_profit": -606966.292066,
				"end_market_value": 2224108.56,
				"end_market_ratio": 89.550772439177,
				"start_market_value": 0,
				"start_market_ratio": 0,
				"buy_money": 0,
				"sell_money": 0,
				"turnover_ratio": 0,
				"children": []
			}
		},
		"industryData": [{
			"name": "建筑装饰",
			"total_profit": 2022,
			"profit_loss_ratio": 0
		}, {
			"name": "计算机",
			"total_profit": 886.1,
			"profit_loss_ratio": 0
		}, {
			"name": "有色金属",
			"total_profit": 525.42,
			"profit_loss_ratio": 0
		}, {
			"name": "国防军工",
			"total_profit": -94860,
			"profit_loss_ratio": 0
		}, {
			"name": "通信",
			"total_profit": -247600,
			"profit_loss_ratio": 0
		}, {
			"name": "医药生物",
			"total_profit": -267939.82,
			"profit_loss_ratio": 0
		}],
		"profitIndustryData": [{
			"name": "建筑装饰",
			"total_profit": 2022,
			"profit_loss_ratio": 0,
			"total_profit_ratio": 0.33
		}, {
			"name": "计算机",
			"total_profit": 886.1,
			"profit_loss_ratio": 0,
			"total_profit_ratio": 0.15
		}, {
			"name": "有色金属",
			"total_profit": 525.42,
			"profit_loss_ratio": 0,
			"total_profit_ratio": 0.09
		}],
		"lossIndustryData": [{
			"name": "医药生物",
			"total_profit": -267939.82,
			"profit_loss_ratio": 0,
			"total_profit_ratio": -7803.65
		}, {
			"name": "通信",
			"total_profit": -247600,
			"profit_loss_ratio": 0,
			"total_profit_ratio": -7211.26
		}, {
			"name": "国防军工",
			"total_profit": -94860,
			"profit_loss_ratio": 0,
			"total_profit_ratio": -2762.76
		}]
	},
	"timestamp": 1694066863.4416,
	"timeConsumption": 0.43391084671021,
	"requestStartTime": null,
	"input": {
		"org_id": "36",
		"user_id": "363639",
		"startDate": "2023-08-01",
		"endDate": "2023-08-31",
		"type": "2",
		"group_id": "",
		"currency": "1",
		"orderBy": "",
		"order": ""
	}
}
</pre>
