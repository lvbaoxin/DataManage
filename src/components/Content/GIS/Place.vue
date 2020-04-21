<template>
	<div class="map-right" v-loading.fullscreen.lock="fullscreenLoading">
		<div class="map-form">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="社区">
					<el-select v-model="form.communityId" placeholder="请选择社区" @change="changeCommunity">
						<el-option :label="item.name" :value="item.code" v-for="(item,index) in CommunityForSelect" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="网格">
					<el-select v-model="form.gridId" placeholder="请选择网格">
						<el-option :label="item.name" :value="item.code" v-for="(item,index) in GridForSelect" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<maps ref="mychild2" :listPoCntForGIS="listPoCntForGIS" :classes="'place'" @showInfo="seeInfo" style="width:100%;top:120px;"></maps>
		<div class="box-card" style="left:auto;right:0">
			<div class="headers">
				基本信息
			</div>
			<div class="text" style="text-indent:10px;">腾鳌镇</div>
			<div v-for="(item,index) in baseInfo" :key="index" class="text">
				<span class="bg" :style="{ background: colorList[index] }"></span><span>{{item.name}}</span>：{{item.value}}
				<span v-if="item.name == '总户数'">户</span>
				<span v-else>个</span>
			</div>
		</div>
		
		<div class="eldialog_wrap">
			<el-dialog :visible.sync="dialogVisible" width="80%" @close='closeDialog1'>
				<div class="wrap">
					<div v-show="switch1" class="buildingDetails" style="display: block;">
						<p class="title">楼幢房屋信息</p>
						<div class="unit_nav">
							<ul>
								<li v-for="(item,index) in buildingData.units" :key='index' :data-index='index' :class="isactive == index ? 'ac' : '' "
								 @click='addactive(index)'>
									{{item.unitNum}}单元
								</li>
							</ul>
						</div>
						<div class="P1">
							<div>
								<p style="color: #00CC00;">党员中心户：{{buildingData.centerNum}}</p>
								<p>人口数：{{buildingData.poNum}}人</p>
								<p style="color: #FF9900;">重点人群：{{buildingData.zdpoNum}}户</p>
							</div>
							<div>
								<p>普通党员：{{buildingData.partyNum}}人</p>
								<p style="color: #FF6600;">党员数：{{buildingData.units[isactive].partyUnitNum}}人</p>
							</div>
						</div>
						<div style="padding: 0 10px;"><hr style="border: 1px solid #199ed8;"></div>
						<div class="floorLists">
							<ul>
								<li v-for="item in buildingData.units[isactive].floors" :key='item.floorNum'>
									<span class="floorNum">{{item.floorNum}}</span>
									<div class="houseBox">
										<span class="houseNum" :key='house.householdId' @click="houselist(house.householdId)" v-for="house in item.households"
										 :data-houseID='house.householdId'>{{house.householdNum}}</span>
									</div>
									<div>
										<p>层长</p>
										<p class="floorLong">{{item.floorManager}}</p>
									</div>
								</li>
							</ul>
						</div>
						<p class="unit_long" @click='open_long(buildingData.units[isactive].unitManager,buildingData.units[isactive].unitManagerIDCard)'>单元长：{{buildingData.units[isactive].unitManager}}</p>
					</div>
					 <div v-show="!switch1" class="residentDetails">
						<div class="top">
							<ul>
								<li>
									<p>总人口</p>
									<span style="border: 0;color: #66FFFF;">{{ResidentData.poNum}}</span>
								</li>
								<li>
									<p>常驻人口</p>
									<span style="color: #FFCC00;">{{ResidentData.registryNum}}</span>
								</li>
								<li>
									<p>流动人口</p>
									<span style="color: #00CC00;">{{ResidentData.lodgedNum}}</span> 
								</li>
								<li>
									<p>挂空人口</p>
									<span style="color: #FE9400;">{{ResidentData.emptyNum}}</span>
								</li>
							</ul>
						</div>
						<div class="hr">
							<hr>
						</div>
						<div class="bot">
							<div class="bot_l">
								<ul>
									<li>共产党员：{{ResidentData.partyNum}}</li>
									<li>涉访重点人：{{ResidentData.attentionNum}}</li>
									<li>社区矫正人口：{{ResidentData.shequjiaozhengNum}}</li>
									<li>退休人员：{{ResidentData.retiredNum}}</li>
									<li>失业人员：{{ResidentData.noJobNum}}</li>
									<li>刑满释放人员：{{ResidentData.xingmanshifangNum}}</li>
								</ul>
							</div>
							<div class="bot_r">
								<ul>
									<li>0-6 <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po6Num"></el-progress>
										</div>{{ResidentData.po6Num}}</li>
									<li>7-17 <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po7_17Num"></el-progress>
										</div>{{ResidentData.po7_17Num}}</li>
									<li>18-44 <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po18_44Num"></el-progress>
										</div>{{ResidentData.po18_44Num}}</li>
									<li>45-59 <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po45_59Num"></el-progress>
										</div>{{ResidentData.po45_59Num}}</li>
									<li>60-74 <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po60_74Num"></el-progress>
										</div>{{ResidentData.po60_74Num}}</li>
									<li>75-89 <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po75_89Num"></el-progress>
										</div>{{ResidentData.po75_89Num}}</li>
									<li>90+ <div class="jdt">
											<el-progress :show-text='false' :text-inside="true" :stroke-width="14" :percentage="ResidentData.po90Num"></el-progress>
										</div>{{ResidentData.po90Num}}</li>
								</ul>
							</div>
						</div>
						<p class="details_btn" @click="residenList()">查看详情></p>
					</div>
					 <div class="buildingIntroduce">
						<div class="top">
							<span>楼栋名称</span>
							<span @click="open_long(buildingData.manager,buildingData.managerIDCard)" class="floor_long" style="margin: 0 6px;">楼长：<i>{{buildingData.manager}}</i></span>
							<el-switch @change="onSwitch()" v-model="switch1" active-text="楼栋" inactive-text="居民">
							</el-switch>
						</div>
						<div class="bot">
							<div class="buildingName">
								<p>{{buildingData.buildingName}}</p>
							</div>
							<div class="buildingXY">
								<p>N:{{buildingData.gpsy}}</p>
								<p>E:{{buildingData.gpsx}}</p>
							</div>
						</div>
					</div>
				</div>

			</el-dialog>
		</div> 

		<el-dialog @close='closeDialog' custom-class='residentList list_title' title="业主居民信息列表" :visible.sync="dialogVisible1" width="60%">
			<table border="1" width="100%">
				<thead>
					<tr>
						<th>户号</th>
						<th>公民身份证号码</th>
						<th>户主姓名</th>
						<th>居住人姓名</th>
						<th>居住关系</th>
						<th>性别</th>
						<th>出生日期</th>
						<th>民族</th>
						<th>工作单位</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in houseData" :key='index'>
						<td>{{item.householdNumber}}</td>
						<td>{{item.idCard}}</td>
						<td>{{item.householder}}</td>
						<td style="color: #0000FF;cursor: pointer;" @click="peopleDetails(item.personName,item.idCard)">{{item.personName}}</td>
						<td>{{item.relations}}</td>
						<td>{{item.sex}}</td>
						<td>{{item.birth}}</td>
						<td>{{item.nation}}</td>
						<td>{{item.servicePlace}}</td>
					</tr>
				</tbody>
			</table>
			<el-pagination v-show="paginationVisible"  @current-change="handleCurrentChange1" :current-page="CurrentPage"
			 :page-sizes="[10]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-dialog>

		<el-dialog custom-class='resident_details list_title' title="居民详细信息" :visible.sync="dialogVisible2" width="60%">
			<span class="resident_details_title">基本信息</span>
			<table border="1" width="100%">
				<tr>
					<th>党员中心户（楼长）</th>
					<td>{{peopleData.zhongxinhu}}</td>
					<th>重点人口</th>
					<td>{{peopleData.zhongdianrenkou}}</td>
				</tr>
				<tr>
					<th>楼栋长（党员）</th>
					<td>{{peopleData.loudongzhang}}</td>
					<th>党员联系群众</th>
					<td>{{peopleData.danglianxiqunzhong}}</td>
				</tr>
				<tr>
					<th>户号</th>
					<td>{{peopleData.householdNumber}}</td>
					<th>户主姓名</th>
					<td>{{peopleData.householder}}</td>
				</tr>
				<tr>
					<th>房屋权属</th>
					<td>{{peopleData.houseOwnership}}</td>
					<th>户籍状况</th>
					<td>{{peopleData.registryConsistency}}</td>
				</tr>
				<tr>
					<th>居住者姓名</th>
					<td>{{peopleData.personName}}</td>
					<th>户主关系</th>
					<td>{{peopleData.relations}}</td>
				</tr>
				<tr>
					<th>暂住人数</th>
					<td>{{peopleData.populations}}</td>
					<th>租住时间</th>
					<td>{{peopleData.tenancyTime}}</td>
				</tr>
				<tr>
					<th>性别</th>
					<td>{{peopleData.sex}}</td>
					<th>文化程度</th>
					<td>{{peopleData.qualifications}}</td>
				</tr>
				<tr>
					<th>联系电话</th>
					<td>{{peopleData.contact}}</td>
					<th>政治面貌</th>
					<td>{{peopleData.politicalStatus}}</td>
				</tr>
				<tr>
					<th>民族</th>
					<td>{{peopleData.nation}}</td>
					<th>籍贯</th>
					<td>{{peopleData.nativePlace}}</td>
				</tr>
				<tr>
					<th>出生日期</th>
					<td>{{peopleData.birth}}</td>
					<th>公民身份号码</th>
					<td>{{peopleData.idCard}}</td>
				</tr>
				<tr>
					<th>婚姻状况</th>
					<td>{{peopleData.maritalStatus}}</td>
					<th>特长</th>
					<td>{{peopleData.skills}}</td>
				</tr>
				<tr>
					<th>职业现状</th>
					<td>{{peopleData.occupationStatus}}</td>
					<th>工作单位</th>
					<td>{{peopleData.servicePlace}}</td>
				</tr>
				<tr>
					<th>土地</th>
					<td>无</td>
					<th>村/社区</th>
					<td>{{peopleData.communityName}}</td>
				</tr>
				<tr>
					<th>网格</th>
					<td>{{peopleData.gridName}}</td>
					<th>是否外出务工</th>
					<td>{{peopleData.isWaichuwugong}}</td>
				</tr>
				<tr>
					<th>是否低保户</th>
					<td>{{peopleData.isDibao}}</td>
					<th>是否大病人群</th>
					<td>{{peopleData.isDabing}}</td>
				</tr>
				<tr>
					<th>楼栋长</th>
					<td>{{peopleData.zhongxinhu}}</td>
					<th></th>
					<td></td>
				</tr>
			</table>
		</el-dialog>
	
		<el-dialog custom-class='residentList list_title' :title="buildingData.buildingName" :visible.sync="dialogVisible3" width="60%">
			<ul class="residenList">
				<li @click="residenDetailsList(residenListData.poIds)"><img src="../../../assets/u658.png"><span>总人口(总户数)：<i>{{residenListData.poNum}}({{residenListData.houNum}})</i></span></li>
				<li @click="residenDetailsList(residenListData.manIds)"><img src="../../../assets/u640.png"><span>男性：<i>{{residenListData.manNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.womanIds)"><img src="../../../assets/u648.png"><span>女性：<i>{{residenListData.womanNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.registryIds)"><img src="../../../assets/u660.png"><span>常驻人口：<i>{{residenListData.registryNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.lodgedIds)"><img src="../../../assets/u642.png"><span>流动人口：<i>{{residenListData.lodgedNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.emptyIds)"><img src="../../../assets/u654.png"><span>挂空人口：<i>{{residenListData.emptyNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.po15Ids)"><img src="../../../assets/u662.png"><span>0-15岁人口：<i>{{residenListData.po15Num}}</i></span></li>
				<li @click="residenDetailsList(residenListData.po16_59Ids)"><img src="../../../assets/u656.png"><span>16-59岁人口：<i>{{residenListData.po16_59Num}}</i></span></li>
				<li @click="residenDetailsList(residenListData.po60Ids)"><img src="../../../assets/u650.png"><span>60岁以上人口：<i>{{residenListData.po60Num}}</i></span></li>
				<li @click="residenDetailsList(residenListData.partyIds)"><img src="../../../assets/u646.png"><span>党员：<i>{{residenListData.partyNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.noJobIds)"><img src="../../../assets/u644.png"><span>失业人员：<i>{{residenListData.noJobNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.attentionIds)"><img src="../../../assets/u652.png"><span>涉访重点人：<i>{{residenListData.attentionNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.shequjiaozhengIds)"><img src="../../../assets/u652.png"><span>社区矫正人口：<i>{{residenListData.shequjiaozhengNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.xingmanshifangIds)"><img src="../../../assets/u652.png"><span>刑满释放人员：<i>{{residenListData.xingmanshifangNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.dibaoIds)"><img src="../../../assets/u650.png"><span>低保户：<i>{{residenListData.dibaoNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.dabingIds)"><img src="../../../assets/u652.png"><span>大病人群：<i>{{residenListData.dabingNum}}</i></span></li>
				<li @click="residenDetailsList(residenListData.wugongIds)"><img src="../../../assets/u642.png"><span>外出务工：<i>{{residenListData.wugongNum}}</i></span></li>
			</ul>
		</el-dialog>
	</div>
</template>
<script>
	import maps from './map.vue'
	import titles from '../../component/title.vue'
	export default {
		data() {
			return {
				isactive: 0,//单元导航下标
				paginationVisible:false,//分页显示隐藏
				CurrentPage: 1, //楼用户详细列表 当前页
				CurrentPagelist:10,//每页显示数据
				total:10,//总数据
				residenIDlist:'',
				switch1: true,
				form: {},
				form1: {},
				screen: {},
				CommunityForSelect: [],
				GridForSelect: [],
				baseInfo: [],
				current: 1,
				size: 10,
				listPoCntForGIS: [],
				type: '',
				classes: '',
				colorList: ['#3399ff', '#3bb19c', '#ffcc00', '#06f', '#f60', '#dcdcdc', '#ffff66', '#6361f2'],
				fullscreenLoading: false,
				persionIcon: require('../../../assets/u3907.png'),
				wenjianicon: require('../../../assets/u6936.png'),
				headeIcon: require('../../../assets/u6537.png'),
				dialogVisible: false,
				dialogVisible1: false,
				dialogVisible2: false,
				dialogVisible3: false,
				buildingData: { //楼数据
					buildingName: "",
					manager: "",
					managerIDCard: "",
					partyNum: "",
					partyPoNum: "",
					poNum: "",
					zdpoNum:'',
					units:[
						{
							floors:[
								{
									floorManager:'',
									floorManagerIDCard:'',
									floorNum:'',
									households:[
										{
											householdId:'',
											householdNum:''
										}
									]
								}
							],
							unitManager:'',
							unitManagerIDCard:'',
							unitNum:''
						}
					]
				}, 
				houseData: {}, // 户列表数据
				peopleData: {}, //人详情信息
				ResidentData:{},//居民信息
				residenListData:{}, //居民详情信息列表
				persionInfo: {},
				totalNum: 0,
				org: {}
			}
		},
		components: {
			maps,
			titles
		},
		mounted() {
			let gridId=JSON.parse( localStorage.getItem('gridId')) 
			this.getCommunity();
			this.getBaseinfo(gridId)
			this.getlistPoPageForGIS();
		},
		watch: {
			$route(to, from) {
				this.form1 = {};
				this.screen = {};
				this.type = to.query.type;
				this.classes = to.query.class;
				if (this.type) this.screen[this.type] = '1';
				this.getlistPoPageForGIS();
			}
		},
		methods: {
			open_long(name,peopleID){
				this.$request.post('/GISBuilding/findPoInfoByParams', {
					personName: name,
					idCard: peopleID
				}, res => {
					//console.log(res)
					this.residenDetailsList(res.data.popuId)
				})
			},
			closeDialog1(){ // 关闭楼信息弹窗
				this.dialogVisible=false
				this.switch1=true
				this.isactive=0
			},
			closeDialog(){ //关闭居民列表弹出事件
				this.dialogVisible1=false;
				this.CurrentPage=1;
				this.paginationVisible=false;
			},	
			residenDetailsList(val){  //获取指定分类居民列表
				this.residenIDlist=val;
				if(val!=''){
					this.$request.post('/GISBuilding/findPosByIds', {
						ids:val,
						current:this.CurrentPage,
						size:this.CurrentPagelist
					}, res => {
						this.total=res.data.total;
						this.houseData=res.data.records;
						this.dialogVisible1=true;
						this.paginationVisible=true;
					})
					//this.dialogVisible3=true
				}			
			},
			residenList(){ //居民 分类查看详情获取数据
				this.$request.post('/GISBuilding/findPoTypeInfo', {
					id: this.buildingData.id
				}, res => {
					this.residenListData=res.data
					//console.log(res.data)
				})
				this.dialogVisible3=true
			},
			onSwitch(){ // 楼宇滑块 按钮 获取居民信息
				if(!this.switch1){
					this.$request.post('/GISBuilding/findPoInfo', {
						id: this.buildingData.id
					}, res => {
						this.ResidentData=res.data
						//console.log(res)
					})
				}
				
			},
			obtainFloor(item) { //通过 楼ID 获取楼信息
				this.$request.post('/GISBuilding/findBuildingInfo', {
					id: item.id
				}, res => {
					console.log(res)
					this.buildingData = res.data
					this.buildingData.gpsx=item.gpsx
					this.buildingData.gpsy=item.gpsy
					this.buildingData.id=item.id
					//console.log(res.data)
				})
			},
			houselist(houseID) { // 通过户ID 查找人列表
				//houseID = 875
				this.$request.post('/GISBuilding/findPosByHId', {
					id: houseID
				}, res => {
					//console.log(res)
					this.dialogVisible1 = true
					this.houseData = res.data
				})
			},
			peopleDetails(name, peopleID) { // 通过身份证 名称找到人信息
				this.$request.post('/GISBuilding/findPoInfoByParams', {
					personName: name,
					idCard: peopleID
				}, res => {
					//console.log(res)
					this.dialogVisible2 = true
					this.peopleData = res.data
				})
			},
			handleCurrentChange1(val) { //分页点击请求
				this.CurrentPage=val
				this.$request.post('/GISBuilding/findPosByIds', {
					ids:this.residenIDlist,
					current:this.CurrentPage,
					size:this.CurrentPagelist
				}, res => {
					this.total=res.data.total;
					this.houseData=res.data.records;
					this.dialogVisible1=true;
				})
			},
			getCommunity() {
				this.$request.get('GISPopulation/listCommunityForSelect', {}, res => {
					this.CommunityForSelect = res.data;
				})
			},
			getGrid(id) {
				this.$request.get('GISPopulation/listGridForSelect', {
					gridId: id
				}, res => {
					this.GridForSelect = res.data;
				})
			},
			search() {
				this.form1 = { ...this.form
				};
				this.getlistPoPageForGIS();
			},
			changeCommunity(val) {
				this.getGrid(val)
			},
			getBaseinfo(id) {
				this.$request.get('GISPlace/listPlaceCntForGIS', {
					gridId: id
				}, res => {
					//console.log(res)
					this.baseInfo = res.data;
				})
			},
			getlistPoPageForGIS() {
				this.fullscreenLoading = true;
				this.$request.get('/GISPlace/listPlacePageForGIS', {
					current: this.current,
					size: this.size,
					...this.form1,
					...this.screen
				}, res => {
					//console.log(res.data)
					// for(let i = 0; i<res.data.length; i++){
					// 	if(res.data[i].placeName=='周正新村1号楼'){
					// 		console.log(res.data[i])
					// 	}
					// }
					this.fullscreenLoading = false;
					this.$refs.mychild2.renderMark(res.data);
					this.totalNum = res.data.total;
				}, res => {
					this.fullscreenLoading = false;
				})
			},
			seeInfo(item) {
				this.dialogVisible = true;
				//item.id=116
				this.obtainFloor(item);
				this.buildingData.gpsx=item.gpsx
				this.buildingData.gpsy=item.gpsy
				this.persionInfo = item;
			},
			handleCurrentChange(val) {
				this.current = val;
				this.getlistPoPageForGIS();
			},
			addactive(index) {
				this.isactive = index
			}
		}
	}
</script>
<style>
	.resident_details table {
		border-color: #1f41ee;
	}
	.residenList{
		display: flex;
		flex-wrap: wrap;
	}
	.residenList li{
		width: 33%;
		height: 40px;
		display: flex;
		align-items: center;
		cursor: pointer;
		font-size: 14px;
		color:rgb(0, 121, 254);
	}
	.residenList li img{
		margin-right: 5px;
	}
	.residenList li i{
		color: rgb(255, 102, 0);
	}
	.resident_details tr {
		height: 48px;
	}

	.resident_details td {
		font-size: 16px;
		text-align: center;

	}

	.residentList .el-dialog__body {
		height: 600px;
	}

	.resident_details_title {
		text-align: center;
		line-height: 40px;
		display: inline-block;
		width: 83px;
		height: 40px;
		background: inherit;
		background-color: rgba(255, 255, 255, 1);
		border: none;
		border-radius: 10px;
		border-bottom-right-radius: 0px;
		border-bottom-left-radius: 0px;
		-moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.349019607843137);
		-webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.349019607843137);
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.349019607843137);
		font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
		font-weight: 700;
		font-style: normal;
		font-size: 14px;
		color: #999999;
	}

	.list_title {
		overflow: hidden;
		border-radius: 15px;
	}

	.list_title .el-pagination {
		text-align: right;
		margin-top: 20px;
	}

	.list_title .el-dialog__header {
		background-color: rgba(220, 235, 254, 1);
	}

	.list_title .el-dialog__title {
		position: relative;
	}

	.list_title .el-dialog__title:before {
		content: '';
		display: inline-block;
		width: 4px;
		height: 25px;
		background-color: rgba(0, 204, 0, 1);
		position: absolute;
		top: -3px;
		left: -9px;
	}

	.residentList th,
	.residentList td {
		height: 50px;
		text-align: center;
	}

	.residentList thead tr {
		background-color: #F6FEFE;
	}

	.map-form {
		padding: 10px;
		margin-top: 50px;
	}

	.eldialog_wrap .el-dialog {
		background-color: #666666;
	}

	.eldialog_wrap .el-dialog__headerbtn .el-dialog__close {
		color: #FFFFFF;
	}

	.wrap {
		display: flex;
	}

	.residentDetails {
		width: 320px;
		min-height: 450px;
		background: url(../../../assets/u0.png) no-repeat;
		background-size: 100% 100%;
		font-weight: bold;
		padding: 10px;
		font-weight: 700;
		font-style: normal;
		padding-bottom: 20px;
	}

	.residentDetails .hr {
		padding: 20px;

	}

	.residentDetails .hr hr {
		width: 100%;
		height: 2px;
		background-color: #199ED8;
		border: 0;
	}

	.residentDetails .top ul {
		display: flex;
	}

	.residentDetails .top ul li {
		width: 25%;
	}

	.residentDetails .top ul li p {
		font-size: 18px;
		color: #199ED8;
		text-align: center;
		padding-top: 10px;
	}

	.residentDetails .top ul li span {
		width: 100%;
		display: inline-block;
		text-align: center;
		height: 40px;
		line-height: 40px;
		border-left: 2px solid #199ED8;
		box-sizing: border-box;
	}

	.residentDetails .bot {
		display: flex;
		font-size: 18px;
		color: #199ED8;
	}

	.residentDetails .bot .jdt {
		width: 80px;
		margin: 0 5px;
	}

	.residentDetails .details_btn {
		font-size: 18px;
		color: #FFFF00;
		text-align: right;
		padding: 10px;
		cursor: pointer;
	}

	.residentDetails .bot>div {
		width: 50%;
	}

	.residentDetails .bot .bot_l {
		border-right: 2px solid #199ED8;
		font-size: 18px;
		color: #199ED8;
		text-align: center;
	}

	.residentDetails .bot .bot_l li {
		margin: 10px 0;
	}

	.residentDetails .bot .bot_r li {
		display: flex;
		align-items: center;
		margin: 10px 0 0 2px;
		font-size: 14px;
	}

	.buildingDetails {
		width: 320px;
		min-height: 500px;
		font-family: '微软雅黑';
		background: url(../../../assets/u0.png) no-repeat;
		background-size: 100% 100%;
		font-weight: bold;
		padding: 10px;
		font-weight: 700;
		font-style: normal;
		padding-bottom: 50px;
	}

	.buildingDetails .floorLong {
		cursor: pointer;
	}

	.buildingDetails .floorLong:hover {
		color: #199ED8;
	}

	.buildingDetails .title {
		font-size: 28px;
		color: #199ED8;
		padding-left: 10px;
	}

	.buildingDetails .unit_nav {
		width: 300px;
		min-height: 40px;
		max-height: 120px;
		overflow: auto;
	}

	.buildingDetails .unit_nav li {
		width: 33.3%;
		height: 40px;
		font-size: 14px;
		color: #66FFFF;
		text-align: center;
		line-height: 40px;
		float: left;
		cursor: pointer;
	}

	.buildingDetails .unit_nav li:hover {
		color: #FF6600;
	}

	.buildingDetails .unit_nav li.ac {
		color: #FF6600;
	}

	.buildingDetails .P1 {
		font-size: 16px;
		text-align: left;
		color: #199ED8;
		line-height: 30px;
		padding:0 10px;
		display: flex;
		justify-content: space-between;
	}

	.buildingDetails .floorLists {
		display: flex;
		justify-content: center;
	}

	.buildingDetails .floorLists li {
		width: 240px;
		display: flex;
		background-color: rgba(26, 188, 156, 1);
		margin: 12px 0;
		align-items: center;
		padding: 5px 0;
	}

	.buildingDetails .floorLists .floorNum {
		font-size: 18px;
		color: #fff;
		width: 30px;
		text-align: center;
	}

	.buildingDetails .floorLists .houseNum {
		font-size: 14px;
		color: #FFFF00;
		cursor: pointer;
	}

	.buildingDetails .floorLists .houseNum.ac {
		color: #199ED8;
	}

	.buildingDetails .floorLists .houseNum:hover {
		color: #199ED8;
	}

	.buildingDetails .floorLists .houseBox {
		width: 150px;
		display: flex;
		justify-content: space-around;
		min-height: 20px;
		max-height: 60px;
		overflow: auto;
		flex-wrap: wrap;
	}

	.buildingDetails .floorLists p {
		font-size: 14px;
		color: #333;
	}

	.buildingDetails .unit_long {
		font-size: 18px;
		color: #FF9900;
		text-align: right;
		padding-right: 20px;
		cursor: pointer;
	}

	.buildingDetails .unit_long:hover {
		color: #199ED8;
	}

	.buildingIntroduce {
		font-family: '微软雅黑';
		width: 400px;
		height: 146px;
		background: url(../../../assets/u0.png) no-repeat;
		background-size: 100% 100%;
	}

	.buildingIntroduce .floor_long {
		cursor: pointer;
	}

	.buildingIntroduce .top {
		padding: 8px 0 0 20px;
	}

	.buildingIntroduce .bot {
		padding: 8px 0 0 20px;
		display: flex;
	}

	.buildingIntroduce .buildingName {
		width: 150px;
		height: 69px;
		color: #66FFFF;
		font-size: 22px;
	}

	.buildingIntroduce .buildingXY {
		flex: 1;
		color: #66FFFF;
		font-size: 26px;
	}

	.buildingIntroduce .top span {
		font-size: 18px;
		color: #199ED8;
		font-weight: bold;
	}

	.buildingIntroduce .top i {
		color: #00CC00;
	}
</style>
