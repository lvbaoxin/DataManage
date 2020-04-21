var domainUrl;
var loginUrl;
var MapUrl;
if (window.location.href.indexOf('192.168.0.252') >= 0) {
  //正式环境
	domainUrl = 'http://192.168.0.252:8930/largeData';
	loginUrl = 'http://192.168.0.252:8930';
	MapUrl = 'http://192.168.0.252:8950/grid/findGridCoordinate'
} else {
  //测试环境局域
/* domainUrl = 'http://192.168.0.29:8930/largeData';
  loginUrl = 'http://192.168.0.29:8930'; */
	//本地测试
	//domainUrl = 'http://116.62.128.194:8930/largeData';
	//loginUrl = 'http://116.62.128.194:8930';
  //MapUrl = 'http://116.62.128.194:8950/grid/findGridCoordinate'
	domainUrl = 'http://116.62.128.194:8930/largeData';
	loginUrl = 'http://116.62.128.194:8930';
	MapUrl = 'http://116.62.128.194:8950/grid/findGridCoordinate'
/* 	domainUrl = 'http://localhost:8930/largeData';
	loginUrl = 'http://localhost:8930';
	MapUrl = 'http://localhost:8950/grid/findGridCoordinate' */
}
const select = {
  relation: [{
      value: '本人',
      label: '本人'
    },
    {
      value: '妻子',
      label: '妻子'
    },
    {
      value: '丈夫',
      label: '丈夫'
    },
    {
      value: '儿子',
      label: '儿子'
    },
    {
      value: '女儿',
      label: '女儿'
    },
    {
      value: '父亲',
      label: '父亲'
    },
    {
      value: '母亲',
      label: '母亲'
    },
    {
      value: '爷爷',
      label: '爷爷'
    },
    {
      value: '奶奶',
      label: '奶奶'
    },
    {
      value: '兄',
      label: '兄'
    },
    {
      value: '弟',
      label: '弟'
    },
    {
      value: '姐',
      label: '姐'
    },
    {
      value: '妹',
      label: '妹'
    },
    {
      value: '其他',
      label: '其他'
    },
    {
      value: '承租',
      label: '承租'
    },
  ],
  Ownership: [{
      value: '产权',
      label: '产权'
    },
    {
      value: '使用权',
      label: '使用权'
    },
    {
      value: '租住',
      label: '租住'
    },
    {
      value: '借住',
      label: '借住'
    },
    {
      value: '集体宿舍',
      label: '集体宿舍'
    },
    {
      value: '其他',
      label: '其他'
    },
  ],
  Culture: [{
      value: '文盲',
      label: '文盲'
    },
    {
      value:'学龄前儿童',
      label:'学龄前儿童',
    },
    {
      value: '小学',
      label: '小学'
    },
    {
      value: '初中',
      label: '初中'
    },
    {
      value: '高中',
      label: '高中'
    },
    {
      value: '专科',
      label: '专科'
    },
    {
      value: '本科',
      label: '本科'
    },
    {
      value: '研究生',
      label: '研究生'
    },
    {
      value: '硕士',
      label: '硕士'
    },
    {
      value: '博士',
      label: '博士'
    },
    {
      value: '不明',
      label: '不明'
    },
  ],
  Politics: [{
      value: '中共党员',
      label: ''
    },
    {
      value: '中共预备党员',
      label: '中共预备党员'
    },
    {
      value: '共青团员',
      label: '共青团员'
    },
    {
      value: '民革党员',
      label: '民革党员'
    },
    {
      value: '民盟盟员',
      label: '民盟盟员'
    },
    {
      value: '民建会员',
      label: '民建会员'
    },
    {
      value: '民进会员',
      label: '民进会员'
    },
    {
      value: '农工党党员',
      label: '农工党党员'
    },
    {
      value: '致公党党员',
      label: '致公党党员'
    },
    {
      value: '九三学社社员',
      label: '九三学社社员'
    },
    {
      value: '台盟盟员',
      label: '台盟盟员'
    },
    {
      value: '无党派人士',
      label: '无党派人士'
    },
    {
      value: '群众',
      label: '群众'
    },
  ],
  Occupation: [{
      value: "就业",
      label: "就业"
    },
    {
      value:'在读',
      label:'在读'
    },
    {
      value: "失业",
      label: "失业"
    },
    {
      value: "退休",
      label: "退休"
    }
  ],
  Sex: [{
      value: "男",
      label: "男"
    },
    {
      value: "女",
      label: "女"
    },
    {
      value: "不明",
      label: "不明"
    },
  ],
  Status: [{
      value: "人在户在",
      label: "人在户在"
    },
    {
      value: "人在户不在",
      label: "人在户不在"
    },
    {
      value: "户在人不在",
      label: "户在人不在"
    },
    {
      value: "其他",
      label: "其他"
    },
  ],
  Nation: [{
      value: "汉族",
      label: "汉族"
    },
    {
      value: "壮族",
      label: "壮族"
    },
    {
      value: "满族",
      label: "满族"
    },
    {
      value: "回族",
      label: "回族"
    },
    {
      value: "苗族",
      label: "苗族"
    },
    {
      value: "维吾尔族",
      label: "维吾尔族"
    },
    {
      value: "土家族",
      label: "土家族"
    },
    {
      value: "彝族",
      label: "彝族"
    },
    {
      value: "蒙古族",
      label: "蒙古族"
    },
    {
      value: "藏族",
      label: "藏族"
    },
    {
      value: "布依族",
      label: "布依族"
    },
    {
      value: "侗族",
      label: "侗族"
    },
    {
      value: "瑶族",
      label: "瑶族"
    },
    {
      value: "朝鲜族",
      label: "朝鲜族"
    },
    {
      value: "白族",
      label: "白族"
    },
    {
      value: "哈尼族",
      label: "哈尼族"
    },
    {
      value: "哈萨克族",
      label: "哈萨克族"
    },
    {
      value: "黎族",
      label: "黎族"
    },
    {
      value: "傣族",
      label: "傣族"
    },
    {
      value: "畲族",
      label: "畲族"
    },
    {
      value: "傈僳族",
      label: "傈僳族"
    },
    {
      value: "仡佬族",
      label: "仡佬族"
    },
    {
      value: "东乡族",
      label: "东乡族"
    },
    {
      value: "高山族",
      label: "高山族"
    },
    {
      value: "拉祜族",
      label: "拉祜族"
    },
    {
      value: "水族",
      label: "水族"
    },
    {
      value: "佤族",
      label: "佤族"
    },
    {
      value: "纳西族",
      label: "纳西族"
    },
    {
      value: "羌族",
      label: "羌族"
    },
    {
      value: "土族",
      label: "土族"
    },
    {
      value: "仫佬族",
      label: "仫佬族"
    },
    {
      value: "锡伯族",
      label: "锡伯族"
    },
    {
      value: "柯尔克孜族",
      label: "柯尔克孜族"
    },
    {
      value: "达斡尔族",
      label: "达斡尔族"
    },
    {
      value: "景颇族",
      label: "景颇族"
    },
    {
      value: "毛南族",
      label: "毛南族"
    },
    {
      value: "撒拉族",
      label: "撒拉族"
    },
    {
      value: "布朗族",
      label: "布朗族"
    },
    {
      value: "塔吉克族",
      label: "塔吉克族"
    },
    {
      value: "阿昌族",
      label: "阿昌族"
    },
    {
      value: "普米族",
      label: "普米族"
    },
    {
      value: "鄂温克族",
      label: "鄂温克族"
    },
    {
      value: "怒族",
      label: "怒族"
    },
    {
      value: "京族",
      label: "京族"
    },
    {
      value: "基诺族",
      label: "基诺族"
    },
    {
      value: "德昂族",
      label: "德昂族"
    },
    {
      value: "保安族",
      label: "保安族"
    },
    {
      value: "俄罗斯族",
      label: "俄罗斯族"
    },
    {
      value: "裕固族",
      label: "裕固族"
    },
    {
      value: "乌孜别克族",
      label: "乌孜别克族"
    },
    {
      value: "门巴族",
      label: "门巴族"
    },
    {
      value: "鄂伦春族",
      label: "鄂伦春族"
    },
    {
      value: "独龙族",
      label: "独龙族"
    },
    {
      value: "塔塔尔族",
      label: "塔塔尔族"
    },
    {
      value: "赫哲族",
      label: "赫哲族"
    },
    {
      value: "珞巴族",
      label: "珞巴族"
    },
  ],
  Speciality: [{
      value: "驾车",
      label: "驾车"
    },
    {
      value: "驾船",
      label: "驾船"
    },
    {
      value: "驾机",
      label: "驾机"
    },
    {
      value: "射击",
      label: "射击"
    },
    {
      value: "爆破",
      label: "爆破"
    },
    {
      value: "枪械",
      label: "枪械"
    },
    {
      value: "绘画",
      label: "绘画"
    },
    {
      value: "书法",
      label: "书法"
    },
    {
      value: "摄影",
      label: "摄影"
    },
    {
      value: "摄像",
      label: "摄像"
    },
    {
      value: "表演",
      label: "表演"
    },
    {
      value: "雕刻",
      label: "雕刻"
    },
    {
      value: "通讯技术",
      label: "通讯技术"
    },
    {
      value: "计算机技术",
      label: "计算机技术"
    },
    {
      value: "法律咨询",
      label: "法律咨询"
    },
    {
      value: "心理咨询",
      label: "心理咨询"
    },
    {
      value: "医疗救护",
      label: "医疗救护"
    },
    {
      value: "武术",
      label: "武术"
    },
    {
      value: "维修",
      label: "维修"
    },
    {
      value: "外语",
      label: "外语"
    },
    {
      value: "民族语言",
      label: "民族语言"
    },
    {
      value: "手语",
      label: "手语"
    },
    {
      value: "其他",
      label: "其他"
    }
  ],
  marry: [{
      value: "未婚",
      label: "未婚"
    },
    {
      value: "已婚",
      label: "已婚"
    },
    {
      value: "离婚",
      label: "离婚"
    },
    {
      value: "再婚",
      label: "再婚"
    },
    {
      value: "丧偶",
      label: "丧偶"
    }
  ],
  Community: [{
      value: "平安社区",
      label: "平安社区"
    },
    {
      value: "迎宾社区",
      label: "迎宾社区"
    },
    {
      value: "中兴社区",
      label: "中兴社区"
    },
    {
      value: "杏花社区",
      label: "杏花社区"
    },
    {
      value: "虎山社区",
      label: "虎山社区"
    }
  ],
  grid: [{
      value: "第一网格",
      label: "第一网格"
    },
    {
      value: "第二网格",
      label: "第二网格"
    },
    {
      value: "第三网格",
      label: "第三网格"
    },
    {
      value: "第四网格",
      label: "第四网格"
    },
    {
      value: "第五网格",
      label: "第五网格"
    },
    {
      value: "第六网格",
      label: "第六网格"
    }
  ],
  category: [{
      value: "registryPopulation/insert",
      label: "户籍人口"
    },
    {
      value: "lodgedPopulation/insert",
      label: "借住人口"
    },
    {
      value: "floatingPopulation/insert",
      label: "流动人口"
    },
    {
      value: "emptyHangingPopulation/insert",
      label: "空挂人口"
    }
  ],
  orgCategory: [{
      value: "党委机构",
      label: "党委机构"
    },
    {
      value: "政府机构",
      label: "政府机构"
    },
    {
      value: "人大机构",
      label: "人大机构"
    },
    {
      value: "政协机构",
      label: "政协机构"
    },
    {
      value: "社会机构 ",
      label: "社会机构 "
    },
  ],
  orgType: [{
      value: "组织",
      label: "组织"
    },
    {
      value: "队伍",
      label: "队伍"
    },
  ],
  orgUnitStatus: [{
      value: 3,
      label: "法人单位"
    },
    {
      value: 1,
      label: "与上级机构相同"
    },
    {
      value: 2,
      label: "联合支部"
    },
  ],
  placeClass: [
    {
      value: "幼儿园",
      label: "幼儿园"
    },
    {
      value: "学校",
      label: "学校"
    },
		{
		  value: "楼",
		  label: "楼栋"
		},
    {
      value: "商业场所",
      label: "商业场所"
    },
    {
      value: "车站码头",
      label: "车站码头"
    },
    {
      value: "服务场所",
      label: "服务场所"
    },
    {
      value: "宗教场所",
      label: "宗教场所"
    },
    {
      value: "党政机关",
      label: "党政机关"
    },
    {
      value: "文体活动场所",
      label: "文体活动场所"
    },
    {
      value: "医院",
      label: "医院"
    },
    {
      value: "地下场所",
      label: "地下场所"
    }
  ],
  isOrNo: [{
      value: 1,
      label: "是"
    },
    {
      value: 0,
      label: "否"
    },
  ],
  isOrNo1: [{
      value: '是',
      label: "是"
    },
    {
      value: '否',
      label: "否"
    },
  ],
  personStatus: [{
      value: "正式党员",
      label: "正式党员"
    },
    {
      value: "预备党员",
      label: "预备党员"
    },
  ],
  dangjiStatus: [{
      value: "正常",
      label: "正常"
    },
    {
      value: "停止党籍",
      label: "停止党籍"
    },
  ],
  personClass:[
    {
      value: "0",
      label: "农业户口"
    },
    {
      value: "1",
      label: "非农业户口"
    },
  ],
  reportCategory:[
    {
      value: "一级",
      label: "一级"
    },
    {
      value: "二级",
      label: "二级"
    },
    {
      value: "三级",
      label: "三级"
    },
  ],
  jueceClass:[
    {
      value: "事件",
      label: "事件"
    },
    {
      value: "家庭关系",
      label: "家庭关系"
    },
    {
      value: "稳控",
      label: "稳控"
    },
    {
      value: "帮扶",
      label: "帮扶"
    },
  ],
  roleClass:[
    {
      value: "1",
      label: "网格员"
    },
    {
      value: "2",
      label: "社区管理员"
    },
    {
      value: "3",
      label: "街道管理员"
    },
    {
      value: "4",
      label: "综治管理员"
    },
  ]
}

const check = {
  idCard: function (card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    }
    return true;
  },
  phone: function (str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },

  showXing: function (frontLen, endLen, cellValue) {
    var len = cellValue.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return cellValue.substring(0, frontLen) + xing + cellValue.substring(cellValue.length - endLen);
  },
  formatID: function (row, column, cellValue, index) {
    var frontLen = 6;
    var endLen = 6;
    var len = cellValue.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return cellValue.substring(0, frontLen) + xing + cellValue.substring(cellValue.length - endLen);
    // return this.showXing(frontLen,endLen,cellValue)
  },
  formatPhone: function (row, column, cellValue, index) {
    var frontLen = 3;
    var endLen = 4;
    var len = cellValue.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return cellValue.substring(0, frontLen) + xing + cellValue.substring(cellValue.length - endLen);

  },
  formatIsNo: function (row, column, cellValue, index) {
    switch (cellValue) {
      case 1:
        return '是'
        break;
      case '1':
        return '是'
        break;
      case '0':
        return '否'
        break;
      case 0:
        return '否'
        break;
      default:
        return cellValue
        break;
    }
  },
  getNowFormatDate:function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate+ " " + hour + seperator2 + minutes + seperator2 + seconds;
    return currentdate;
  }
}
var format = {
  tableRowClassName({
    row,
    rowIndex
  }) {
    if (rowIndex % 2) {
      return "bg-f6";
    }
    return "";
  },
}

export default {
  select,
  check,
  domainUrl,
  loginUrl,
	MapUrl,
  format
}
