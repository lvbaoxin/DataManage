<template>
	<div class="pad10" style="background:rgba(206, 231, 253, 1);">
		<div class="maincontent">
			<div style="flex:1">
				<div class="bg-f rightInfo marb-10" style="height:330px;">
					<p class="baseheader"><img src="../../assets/u3590.png" alt="">登录用户权限信息</p>
					<div class="userInfo">
						<p>用户角色：{{userInfo.role}}</p>
						<p>用户名称：{{userInfo.userName}}</p>
						<p>所在部门：{{userInfo.department}}</p>
						<p>本次登录：{{nowTime}}</p>
						<p>上次登录：{{userInfo.lastLoginTime}}</p>
					</div>

				</div>
				<div class="base marb-10" style="min-height:300px;">
					<p class="baseheader"><img src="../../assets/u3878.png" alt="">基础信息</p>
					<el-collapse accordion>
						<el-collapse-item>
							<template slot="title">
								<p class="baseTitle"><img src="../../assets/u3599.png" />地域信息</p>
							</template>
							<div class="pad10">腾鳌镇办事处位于辽宁省海城市，辖区面积为184平方公里，是辽宁省对外开放的重要窗口，享有“关东康衢”之美誉，是一个具有几千年历史的文明古镇。</div>

						</el-collapse-item>
						<el-collapse-item>
							<template slot="title">
								<p class="baseTitle"><img src="../../assets/u3706.png" />人口信息</p>
							</template>
							<div class="pad10">人口12万，其中常住人口9万，粗略估计腾鳌镇人口日均流动量在 4-6万人左右。</div>

						</el-collapse-item>
						<el-collapse-item>
							<template slot="title">
								<p class="baseTitle"><img src="../../assets/u3710.png" />所辖社区情况</p>
							</template>
							<div class="pad10">腾鳌镇下辖腾鳌和温泉2个街道，33个村委会：永安、保安、福安、寿安、黄士、周正、安费黄、将军、名甲、金甲、双台、石桥、王铁、接官、东甘、西新、东新、前甘、老墙、单家、东开河城、西开河城、板桥、东四方、后房、西四方、火石、西荒、泥沟、周小、夏堡、堵墙、榆树台。</div>

						</el-collapse-item>
						<el-collapse-item>
							<template slot="title">
								<p class="baseTitle"><img src="../../assets/u3716.png" />本年综治情况重点、热点</p>
							</template>
							<div class="pad10">2个公安派出所、6个学校、5个医疗机构、32个物业小区、7支部队。</div>

						</el-collapse-item>
						<el-collapse-item>
							<template slot="title">
								<p class="baseTitle"><img src="../../assets/u3714.png" />痛点难点问题</p>
							</template>
							<div class="pad10"> 在区委、区政府正确领导下，街道按照“发展为先、百姓为重、和谐为本”思路，注重党建示范引领，创新工作模式，拓宽服务领域，完善功能，使各项事业蓬勃发展。</div>

						</el-collapse-item>
					</el-collapse>
				</div>
				<Pie :parameter="parameter1" :labelwidth="'100%'" :labelheigth="239"></Pie>
			</div>
			<div style="flex:4;position:relative;">
				<Map @mapClick="mapClick"></Map>
				<!-- <el-button @click='ondisplay'>a</el-button>
				<el-button @click='ondisplay1'>b</el-button> -->
				<div class="mart-10" style="width:100%;display:flex;justify-content: space-between">
					<Pie :parameter="parameter2" :labelwidth="'25%'" :labelheigth="239"></Pie>
					<Pie :parameter="parameter4" :labelwidth="'25%'" :labelheigth="239"></Pie>
					<Pie :parameter="parameter5" :labelwidth="'25%'" :labelheigth="239"></Pie>
					<Pie :parameter="parameter6" :labelwidth="'25%'" :labelheigth="239"></Pie>
				</div>

			</div>

			<div style="flex:1">
				<div class="bg-f rightInfo marb-10" style="height:260px">
					<p class="baseheader"><img src="../../assets/u3777.png" alt="">{{listPartyMemberForMaintitle}}</p>
					<ul class="listparty">
						<li v-for="(item,index) in listPartyMemberForMain" :key="index"><span class="line" :style="{background:bgcolor[index]}"></span>{{item.name}}
							: {{item.value}}人</li>
					</ul>
				</div>
				<div class="bg-f rightInfo marb-10" style="height:370px">
					<p class="baseheader"><img src="../../assets/u3753.png" alt="">{{listOrgTeamForMaintitle}}</p>
					<ul class="listparty">
						<li v-for="(item,index) in listOrgTeamForMain" :key="index"><span class="circle" :style="{background:bgcolor[index]}">{{item.value}}</span>{{item.name}}
							: {{item.value}}人</li>
					</ul>
				</div>
				<Pie :parameter="parameter3" :labelwidth="'100%'" :labelheigth="239"></Pie>
			</div>
		</div>
	</div>
</template>
<script>
	import Map from '../map/map.vue'
	import Pie from '../component/charts/Pie.vue'
	var map;
	var toolBarFlag = true;
	var scaleFlag = true;
	export default {
		components: {
			Pie,
			Map
		},
		data() {
			return {
				/* 	display:true, */
				userInfo: {},
				parameter1: {
					id: 'listPoTypeForMain',
					stack: false,
					showlabl: true,
					url: 'main/listPoTypeForMain?gridId=',
					title: '实有人口分析'
				},
				parameter2: {
					id: 'listPlaceTypeForMain',
					stack: false,
					showlabl: false,
					url: 'main/listPlaceTypeForMain?gridId=',
					title: '重点场所分布'
				},
				parameter3: {
					id: 'listOrgTypeForMain',
					stack: false,
					showlabl: true,
					url: 'main/listOrgTypeForMain?gridId=',
					title: '街道组织占比分布'
				},
				parameter4: {
					id: 'anjiantongji',
					stack: false,
					showlabl: true,
					url: 'main/listOrgTypeForMain?gridId=',
					title: '街道案件统计'
				},
				parameter5: {
					id: 'cityfenbu',
					stack: false,
					showlabl: true,
					url: 'main/listOrgTypeForMain?gridId=',
					title: '城市部件分布'
				},
				parameter6: {
					id: 'cityfenbu',
					stack: false,
					showlabl: true,
					url: 'main/listOrgTypeForMain?gridId=',
					title: '社区民情统计'
				},
				listPartyMemberForMain: [],
				listPartyMemberForMaintitle: '',
				listOrgTeamForMain: [],
				listOrgTeamForMaintitle: '',
				bgcolor: ['#0079fe', '#3bb19c', '#ff0000', '#665df3', '#73b9ff', '#ff6600', '#6c0', '#fc6', '#3498db', '#9900cc',
					'#868686'
				],
				nowTime: ''
			}
		},
		mounted: function() {
			this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
			this.getfindTopGridId()
			this.nowTime = this.GLOBAL.check.getNowFormatDate()
			
			if (location.href.indexOf("#reloaded") == -1) {
				location.href = location.href + "#reloaded";
				location.reload();
			}
			
		},
		methods: {
			getfindTopGridId() { // 获取最高网格id
				var _this = this
				_this.$request.get('/main/findTopGridId', {},
					function(res) {
						
						if (res.result == '1') {
							localStorage.setItem('gridId',JSON.stringify(res.data.gridId))
							_this.listPartyMember(res.data.gridId);
							_this.listOrgTeam(res.data.gridId);
							_this.parameter1.url = _this.parameter1.url+ res.data.gridId
							_this.parameter2.url = _this.parameter2.url+ res.data.gridId
							_this.parameter3.url = _this.parameter3.url+ res.data.gridId
							_this.parameter4.url = _this.parameter4.url+ res.data.gridId
							_this.parameter5.url = _this.parameter5.url+ res.data.gridId
							_this.parameter6.url = _this.parameter6.url+ res.data.gridId
						}
					})
			},
			listPartyMember(id) {
				var _this = this;
				this.$request.get('/main/listPartyMemberForMain', {
					gridId: id
				}, function(res) {
					if (res.result == '1') {
						_this.listPartyMemberForMain = res.data;
						_this.listPartyMemberForMaintitle = res.mainName;
					}
				})
			},
			listOrgTeam(id) {
				var _this = this;
				this.$request.get('/main/listOrgTeamForMain', {
					gridId: id
				}, function(res) {
					if (res.result == '1') {
						_this.listOrgTeamForMaintitle = res.mainName;
						_this.listOrgTeamForMain = res.data;
					}
				})
			},
			mapClick(val) {
				this.listOrgTeam(val);
				this.listPartyMember(val);
				this.parameter1.url = 'main/listPoTypeForMain?gridId=' + val;
				this.parameter2.url = 'main/listPlaceTypeForMain?gridId=' + val;
				this.parameter3.url = 'main/listOrgTypeForMain?gridId=' + val;
			}
		}
	}
</script>

<style>
	.maincontent {
		display: flex;
	}

	.userInfo {
		padding: 10px;
	}

	.userInfo p {
		line-height: 30px;
		margin-bottom: 15px;
		text-indent: 10px;
		border-radius: 4px;
		font-size: 13px;
	}

	.userInfo p:nth-of-type(2n) {
		background: #3498db;
		color: #fff;
	}

	.userInfo p:nth-of-type(2n-1) {
		background: #f9f9f9;
	}

	.base {
		border-radius: 6px;
		overflow: hidden;
	}

	.baseheader {
		display: flex;
		align-items: center;
		line-height: 50px;
		padding-left: 10px;
		background: #fff;
		color: #868686;
		font-size: 14px;
	}

	.baseTitle {
		padding-left: 10px;
		display: flex;
		align-items: center;
	}

	.baseTitle img,
	.baseheader img {
		width: 30px;
		margin-right: 6px;
	}

	.map {
		margin: 0 10px;
		height: 640px;
	}

	.maplist {
		width: 150px;
		position: absolute;
		right: 20px;
		top: 0;
		color: #999999;
	}

	.maplist li {
		display: flex;
		align-items: center;

		margin-bottom: 10px;
		background: #fff;
	}

	.maplist li span {
		display: inline-block;
		text-indent: 5px;
	}

	.maplist li span:nth-of-type(1) {
		width: 40px;
		height: 40px;
		padding: 3px 0;

	}

	.maplist img {

		width: 30px;
	}

	.rightInfo {
		width: 100%;
		border-radius: 6px;
		overflow: hidden;
	}

	.listparty {
		padding: 25px 20px 10px 20px;
		display: flex;
		flex-wrap: wrap;
		color: #333333;
		font-size: 14px;
	}

	.listparty li {
		display: flex;
		align-items: center;
		width: 150px;
		margin-bottom: 20px;
	}

	.listparty .line {
		width: 5px;
		height: 28px;
		margin-right: 15px;
		display: inline-block;
		background: #9900cc;
	}

	.listparty .circle {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 50%;
		margin-right: 15px;
		color: #fff;
		display: inline-block;
		background: #9900cc;
	}

	.bg-green {
		background-color: rgba(75, 216, 99, 1);
	}

	.bg-0099ff {
		background-color: #0099ff;
	}

	.bg-fc6 {
		background-color: #fc6;
	}

	.bg-47c9af {
		background-color: #47c9af;
	}

	.bg-ff6600 {
		background-color: #ff6600;
	}
</style>
