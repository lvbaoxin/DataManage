import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../components/Login/Login')
const Main = () => import('../components/Main/Index')
const Index = () => import('../components/Index/Index')
const Body = () => import('../components/Index/Body')
const IndexContent = () => import('../components/IndexContent')

//人口信息管理
const HujiPersion = () => import('../components/Content/Persion/HujiPersion')
const BorrowPersion = () => import('../components/Content/Persion/BorrowPersion')
const FloatPersion = () => import('../components/Content/Persion/FloatPersion')
const KongguaPersion = () => import('../components/Content/Persion/KongguaPersion')
const Realpopulation = () => import('../components/Content/Persion/Realpopulation')
const JiaoZheng = () => import('../components/Content/Persion/JiaoZheng')
const WenKong = () => import('../components/Content/Persion/WenKong')
const ImportHouse = () => import('../components/Content/Persion/ImportHouse')
const AddHouse = () => import('../components/Content/Persion/AddHouse')
const ImportantImport = () => import('../components/Content/Persion/ImportantImport')
const ImportantPersion = () => import('../components/Content/Persion/ImportantPersion')
const JiZhu = () => import('../components/Content/Persion/JiZhu')
// 组织
const Organization = () => import('../components/Content/Organization/Index')
// 机构
const Mechanism = () => import('../components/Content/Mechanism/Index')
const AddOrg = () => import('../components/Content/Mechanism/AddOrg')
const OrgPersion = () => import('../components/Content/Mechanism/Persion')
const Company = () => import('../components/Content/Mechanism/Company')
const Addteam = () => import('../components/Content/Mechanism/Addteam')
const AddCompany = () => import('../components/Content/Mechanism/AddCompany')
const PartyInfo = () => import('../components/Content/Mechanism/PartyInfo')
const PartyDetail = () => import('../components/Content/Mechanism/PartyDetail')
const PartyImport = () => import('../components/Content/Mechanism/PartyImport')
// 场所
const Building = () => import('../components/Content/Place/Building')
const Place = () => import('../components/Content/Place/Index')
const addPlace = () => import('../components/Content/Place/AddPlace')
//楼宇导入
const PlaceImport = () => import('../components/Content/Place/PlaceImport')
// 设置
const setting = () => import('../components/Content/setting/Index')
const updatePW = () => import('../components/Content/setting/updatePW')
const RoleManage = () => import('../components/Content/setting/RoleManage')
const menuUpdate = () => import('../components/Content/setting/menuUpdate')
const addUser = () => import('../components/Content/setting/AddUser')
// 统计分析
const Judgement = () => import('../components/Content/Judgement/Index')
const Partyorg = () => import('../components/Content/Judgement/Partyorg')
const Safe = () => import('../components/Content/Judgement/Safe')
const PersionH = () => import('../components/Content/Judgement/PersionH')
const PersionZ = () => import('../components/Content/Judgement/PersionZ')
const AddressJudge = () => import('../components/Content/Judgement/Address')
const MinQing = () => import('../components/Content/Judgement/MinQing')
// 研判分析
const YanPan = () => import('../components/Content/YanPan/Index')
const YPPersion = () => import('../components/Content/YanPan/Persion')
const YPPlace = () => import('../components/Content/YanPan/Place')
const YPOrg = () => import('../components/Content/YanPan/org')
const YPSentiment = () => import('../components/Content/YanPan/Sentiment')
// 报表管理
const Report = () => import('../components/Content/Report/Index')
const FillIn = () => import('../components/Content/Report/FillIn')
//GIS
const GIS = () => import('../components/Content/GIS/Index')
const Map = () => import('../components/Content/GIS/map')
const Mappersion = () => import('../components/Content/GIS/persion')
const MapOrg = () => import('../components/Content/GIS/Org')
const MapPlace = () => import('../components/Content/GIS/Place')

// 决策分析
const JueCe = () => import('../components/Content/JueCe/Index')
const JueCeUpload = () => import('../components/Content/JueCe/Upload')
const listCasePage = () => import('../components/Content/JueCe/listCasePage')
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{
          path: '/main',
          component: Main,
          meta: {
            nav: []
          },
        },
        {
          path: '/index',
          component: Body,
          meta: {
            nav: []
          },
          children: [{
              path: 'HujiPersion',
              component: HujiPersion,
              meta: {
                nav: ['数据中心', '户籍人口信息管理'],
                requiresAuth: true
              }

            },
            {
              path: 'Realpopulation',
              component: Realpopulation,
              meta: {
                nav: ['数据中心', '实有信息管理'],
                requiresAuth: true
              }

            },
            {
              path: 'jcupload',
              component: JueCeUpload,
              meta: {
                nav: ['数据中心', '决策信息上传'],
                requiresAuth: true
              }

            },
            {
              path: 'ImportantImport',
              component: ImportantImport,
              meta: {
                nav: ['数据中心', '重点人口信息上传'],
                requiresAuth: true
              }

            },
            {
              path: 'ImportantPersion/:id',
              component: ImportantPersion,
              meta: {
                nav: ['数据中心', '重点人口'],
                requiresAuth: true
              }

            },
            {
              path: 'BorrowPersion',
              component: BorrowPersion,
              meta: {
                nav: ['数据中心', '借住人口信息管理'],
                requiresAuth: true
              }

            },
            {
              path: 'FloatPersion',
              component: FloatPersion,
              meta: {
                nav: ['数据中心', '流动人口信息管理'],
                requiresAuth: true
              }

            },
            {
              path: 'KongguaPersion',
              component: KongguaPersion,
              meta: {
                nav: ['数据中心', '空挂人口信息管理'],
                requiresAuth: true
              }
            },
            {
              path: 'JiZhu',
              component: JiZhu,
              meta: {
                nav: ['数据中心', '寄住人口信息管理'],
                requiresAuth: true
              }
            },
            {
              path: 'WenKong',
              component: WenKong,
              meta: {
                nav: ['数据中心', '稳控人口信息管理'],
                requiresAuth: true
              }
            },
            {
              path: 'JiaoZheng',
              component: JiaoZheng,
              meta: {
                nav: ['数据中心', '矫正人口信息管理'],
                requiresAuth: true
              }
            },
            {
              name: 'ImportHouse',
              path: 'ImportHouse',
              component: ImportHouse,
              meta: {
                nav: ['数据中心', '人口信息批量导入'],
                requiresAuth: true
              }
            },
            {
              name: 'AddHouse',
              path: 'AddHouse',
              component: AddHouse,
              meta: {
                nav: ['数据中心', '添加数据'],
                requiresAuth: true
              }
            },
            {
              name: 'Organization',
              path: 'Organization',
              component: Organization,
              meta: {
                nav: ['数据中心', '队伍信息管理'],
                requiresAuth: true
              }
            },
            {
              name: 'PartyInfo',
              path: 'PartyInfo',
              component: PartyInfo,
              meta: {
                nav: ['数据中心', '党员信息'],
                requiresAuth: true
              }
            },
            {
              name: 'PartyDetail',
              path: 'PartyDetail',
              component: PartyDetail,
              meta: {
                nav: ['数据中心', '党员信息'],
                requiresAuth: true
              }
            },
            {
              name: 'PartyImport',
              path: 'PartyImport',
              component: PartyImport,
              meta: {
                nav: ['数据中心', '党员信息上传'],
                requiresAuth: true
              }
            },
            {
              name: 'Mechanism',
              path: 'Mechanism/:id',
              component: Mechanism,
              meta: {
                nav: ['数据中心', '组织信息管理'],
                requiresAuth: true
              }
            },
            {
              name: 'Place',
              path: 'Place/:id',
              component: Place,
              meta: {
                nav: ['数据中心', '场所信息管理'],
                requiresAuth: true
              }
            },
            {
              name: 'addPlace',
              path: 'addPlace',
              component: addPlace,
              meta: {
                nav: ['数据中心', '添加场所'],
                requiresAuth: true
              }
            },
						 {
						  name: 'Building',
						  path: 'Building',
						  component: Building,
						  meta: {
						    nav: ['数据中心', '添加楼宇'],
						    requiresAuth: true
						  }
						},
						{
						  name: 'PlaceImport',
						  path: 'PlaceImport',
						  component: PlaceImport,
						  meta: {
						    nav: ['数据中心', '楼宇导入'],
						    requiresAuth: true
						  }
						},
            {
              name: 'AddOrg',
              path: 'AddOrg',
              component: AddOrg,
              meta: {
                nav: ['数据中心', '新增组织信息'],
                requiresAuth: true
              }
            },
            {
              name: 'Addteam',
              path: 'Addteam/:id',
              component: Addteam,
              meta: {
                nav: ['数据中心', '新增成员'],
                requiresAuth: true
              }
            },
            {
              name: 'AddCompany',
              path: 'AddCompany/:id',
              component: AddCompany,
              meta: {
                nav: ['数据中心', '新增单位'],
                requiresAuth: true
              }
            },
            {
              name: 'OrgPersion',
              path: 'OrgPersion/:id',
              component: OrgPersion,
              meta: {
                nav: ['数据中心', '组织成员'],
                requiresAuth: true
              }
            },
            {
              name: 'Company',
              path: 'Company/:id',
              component: Company,
              meta: {
                nav: ['数据中心', '组织所在单位'],
                requiresAuth: true
              }
            },
            
          ]
        },
        {
          path: '/Judgement',
          name: 'Judgement',
          component: Judgement,
          children: [{
              path: 'partyorg',
              component: Partyorg,
              meta: {
                nav: ['统计分析', '党员分析'],
                requiresAuth: true
              }
            },
            {
              path: 'Safe', //
              component: Safe,
              meta: {
                nav: ['统计分析', '综合治理分析'],
                requiresAuth: true
              }
            },
            {
              path: 'PersionH', //
              component: PersionH,
              meta: {
                nav: ['统计分析', '人口信息统计', '宏观信息专题'],
                requiresAuth: true
              }
            },
            {
              path: 'PersionZ', //
              component: PersionZ,
              meta: {
                nav: ['统计分析', '人口信息统计', '综合治理专题'],
                requiresAuth: true
              }
            },
            {
              path: 'AddressJudge', //
              component: AddressJudge,
              meta: {
                nav: ['统计分析', '重点场所信息统计'],
                requiresAuth: true
              }
            },
            {
              path: 'MinQing', //MinQing
              component: MinQing,
              meta: {
                nav: ['统计分析', '民情统计分析'],
                requiresAuth: true
              }
            },
          ]
        },
        {
          path: '/setting',
          name: 'setting',
          component: setting,
          children: [
            {
              name: 'updatePW',
              path: 'updatePW',
              component: updatePW,
              meta: {
                nav: ['用户与角色管理', '修改当前用户密码'],
                requiresAuth: true
              }
            },
            {
              name: 'RoleManage',
              path: 'RoleManage',
              component: RoleManage,
              meta: {
                nav: ['用户与角色管理', '角色信息管理'],
                requiresAuth: true
              }
            },
            {
              name: 'menuUpdate',
              path: 'menuUpdate',
              component: menuUpdate,
              meta: {
                nav: ['用户与角色管理', '菜单权限更新'],
                requiresAuth: true
              }
            },
            {
              name: 'addUser',
              path: 'addUser',
              component: addUser,
              meta: {
                nav: ['用户与角色管理', '用户新增'],
                requiresAuth: true
              }
            },
          ]
        },
        {
          path: '/gis',
          name: 'gis',
          component: GIS,
          children: [
            {
              name: 'gispersion',
              path: 'persion',
              component: Mappersion,
              meta: {
                nav: ['GIS应用', 'GIS展示'],
                requiresAuth: true
              }
            },
            {
              name: 'gisorg',
              path: 'org',
              component: MapOrg,
              meta: {
                nav: ['GIS应用', 'GIS展示'],
                requiresAuth: true
              }
            },
            {
              name: 'gisplace',
              path: 'place',
              component: MapPlace,
              meta: {
                nav: ['GIS应用', 'GIS展示'],
                requiresAuth: true
              }
            },
						 {
						  name: 'gisindex',
						  path: '/',
						  component: Map,
						  meta: {
						    nav: ['GIS应用', 'GIS展示'],
						    requiresAuth: true
						  }
						},
          ]
        },
        {
          path: '/yanpan',
          name: 'yanpan',
          component: YanPan,
          children: [
            {
              name: 'persion',
              path: 'persion',
              component: YPPersion,
              meta: {
                nav: ['研判分析', '人口同、环比分析'],
                requiresAuth: true
              }
            },
            {
              name: 'place',
              path: 'place',
              component: YPPlace,
              meta: {
                nav: ['研判分析', '重点场所同、环比分析'],
                requiresAuth: true
              }
            },
            {
              name: 'org',
              path: 'org',
              component: YPOrg,
              meta: {
                nav: ['研判分析', '组织同、环比分析'],
                requiresAuth: true
              }
            },
            {
              name: 'sentiment',
              path: 'sentiment',
              component: YPSentiment,
              meta: {
                nav: ['研判分析', '民情同、环比分析'],
                requiresAuth: true
              }
            },
          ]
        },
        {
          path: '/report',
          name: 'report',
          component: Report,
          children: [
            {
              name: 'fillin',
              path: 'fillin',
              component: FillIn,
              meta: {
                nav: ['报表管理', '报表填报'],
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/juece',
          name: 'juece',
          component: JueCe,
          children: [
            {
              name: 'jcupload',//
              path: 'upload',
              component: JueCeUpload,
              meta: {
                nav: ['决策分析', '决策信息上传'],
                requiresAuth: true
              }
            },
            {
              name: 'listCasePage',
              path: 'listCasePage',
              component: listCasePage,
              meta: {
                nav: ['决策分析', '决策列表'],
                requiresAuth: true
              }
            }
          ]
        }

      ]
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
