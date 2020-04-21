<!-- 点击查看数据弹框-->
<template>
	<el-dialog :visible.sync="diaVisible" @close="close" width="70%">
		<p class="dialogTitle"><i class="el-icon-star-on"></i>实有人口详细信息</p>
		<ul class="dialogList clearfix">
			<li class="fl">
				<p>公民身份证号码</p>
				<p class="lineAuto">{{seeDataVal.idCard}}</p>
			</li>
			<li class="fl">
				<p>居住人姓名</p>
				<p>{{seeDataVal.personName}}</p>
			</li>
			<li class="fl">
				<p>性别</p>
				<p>{{seeDataVal.sex}}</p>
			</li>
			<li class="fl">
				<p>出生日期</p>
				<p>{{seeDataVal.birth}}</p>
			</li>
			<li class="fl">
				<p>死亡日期</p>
				<p>{{seeDataVal.deathTime}}</p>
			</li>
			<li class="fl">
				<p>民族</p>
				<p>{{seeDataVal.nation}}</p>
			</li>
			<li class="fl">
				<p>籍贯</p>
				<p>{{seeDataVal.nativePlace}}</p>
			</li>
			<li class="fl">
				<p>婚姻状况</p>
				<p>{{seeDataVal.maritalStatus}}</p>
			</li>
			<li class="fl">
				<p>政治面貌</p>
				<p>{{seeDataVal.politicalStatus}}</p>
			</li>
			<li class="fl">
				<p>特长</p>
				<p>{{seeDataVal.skills}}</p>
			</li>
			<li class="fl">
				<p>是否低保</p>
				<p>{{seeDataVal.isDibao}}</p>
			</li>
			<li class="fl">
				<p>是否大病</p>
				<p>{{seeDataVal.isDabing}}</p>
			</li>
			<li class="fl">
				<p>是否外出务工</p>
				<p>{{seeDataVal.isWaichuwugong}}</p>
			</li>
			<!--后加-->
			<li class="fl">
				<p>人户一致标志</p>
				<p>{{seeDataVal.consistencyFlag}}</p>
			</li>
			<li class="fl">
				<p>人户分类情况</p>
				<p>{{seeDataVal.consistencyType}}</p>
			</li>
			<li class="fl">
				<p>是否党员</p>
				<p>{{seeDataVal.isPartyMember}}</p>
				<!-- <p v-if="seeDataVal.isPartyMember == '1'">是</p>
				<p v-else-if="seeDataVal.isPartyMember == '0'">否</p> -->
			</li>
			<li class="fl">
				<p>是否政协委员</p>
				<p>{{seeDataVal.isCppccMember}}</p>
			</li>
			<li class="fl">
				<p>是否人大代表</p>
				<p>{{seeDataVal.isNpcMember}}</p>
			</li>
			<li class="fl">
				<p>是否户籍人口</p>
				<p>{{seeDataVal.isRegistry}}</p>
			</li>
			<li class="fl">
				<p>是否借住人口</p>
				<p>{{seeDataVal.isLodged}}</p>
			</li>
			<li class="fl">
				<p>是否空挂人口</p>
				<p>{{seeDataVal.isEmptyHanging}}</p>
			</li>
			<li class="fl">
				<p>是否流动人口</p>
				<p>{{seeDataVal.isFloating}}</p>
			</li>
			<li class="fl">
				<p>是否寄住人口</p>
				<p>{{seeDataVal.isHostfamily}}</p>
			</li>
			<li class="fl">
				<p>是否志愿者</p>
				<p>{{seeDataVal.isVolunteer}}</p>
			</li>
			<li class="fl">
				<p>是否残疾人</p>
				<p>{{seeDataVal.isCanji}}</p>
			</li>
			<li class="fl">
				<p>是否计生对象</p>
				<p>{{seeDataVal.isJisheng}}</p>
			</li>
			<li class="fl">
				<p>是否少数名族</p>
				<p>{{seeDataVal.isShaoshu}}</p>
			</li>
			<li class="fl">
				<p>是否孤寡独居老人</p>
				<p>{{seeDataVal.isGuguaduju}}</p>
			</li>
			<li class="fl">
				<p>是否重点关注人员</p>
				<p>{{seeDataVal.isAttention}}</p>
			</li>
			<li class="fl">
				<p>是否稳控对象</p>
				<p>{{seeDataVal.isWenkong}}</p>
			</li>
			<li class="fl">
				<p>是否社区矫正人员</p>
				<p>{{seeDataVal.isShequjiaozheng}}</p>
			</li>
			<li class="fl">
				<p>是否刑释解教人员</p>
				<p>{{seeDataVal.isXingshijiejiao}}</p>
			</li>
			<li class="fl">
				<p>是否涉外</p>
				<p>{{seeDataVal.isShewai}}</p>
			</li>
			<li class="fl">
				<p>是否问题青少年</p>
				<p>{{seeDataVal.isWentiqingshaonian}}</p>
			</li>
			<li class="fl">
				<p>是否涉毒</p>
				<p>{{seeDataVal.isShedu}}</p>
			</li>
			<li class="fl">
				<p>是否信访</p>
				<p>{{seeDataVal.isXinfang}}</p>
			</li>
			<li class="fl">
				<p>是否涉军</p>
				<p>{{seeDataVal.isShejun}}</p>
			</li>
			<li class="fl">
				<p>是否涉法涉诉</p>
				<p>{{seeDataVal.isShefashesu}}</p>
			</li>
			<li class="fl">
				<p>是否肇事肇祸精神障碍者</p>
				<p>{{seeDataVal.isJingshen}}</p>
			</li>
			<li class="fl">
				<p>是否涉邪</p>
				<p>{{seeDataVal.isShexie}}</p>
			</li>
			<!--后加-->
			<li class="fl">
				<p>职业现状</p>
				<p>{{seeDataVal.occupationStatus}}</p>
			</li>
			<li class="fl">
				<p>联系电话</p>
				<p>{{seeDataVal.contact}}</p>
			</li>
			<li class="fl">
				<p>工作单位</p>
				<p>{{seeDataVal.servicePlace}}</p>
			</li>
			<li class="fl">
				<p>租住时间</p>
				<p>{{seeDataVal.tenancyTime}}</p>
			</li>
			<li class="fl">
				<p>暂住人数</p>
				<p>{{seeDataVal.populations}}</p>
			</li>
			<li class="fl">
				<p>文化程度</p>
				<p>{{seeDataVal.qualifications}}</p>
			</li>
			<li class="fl">
				<p>房屋信息详情</p>
				<p>
					<el-button type="primary" @click="show" size="mini" round>查看</el-button>
				</p>
			</li>
		</ul>
		<el-dialog width="60%" :visible.sync="innerVisible" append-to-body>
			<p class="dialogTitle"><i class="el-icon-star-on"></i>房屋信息详情</p>
			<ul class="dialogList clearfix">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="hpType" label="户籍人口" width="80">
						<template slot-scope="scope">                   
                    <p v-if="scope.row.hpType=='1'">户籍人口</p>
										<p v-else-if="scope.row.hpType=='2'">借住人口</p>
										<p v-else-if="scope.row.hpType=='3'">空挂人口</p>
										<p v-else-if="scope.row.hpType=='4'">流动人口</p>
										<p v-else-if="scope.row.hpType=='5'">寄住人口</p>
            </template>
					</el-table-column>
					<el-table-column prop="householdNum" label="户号" width="90"></el-table-column>
					<el-table-column prop="householdAddress" label="该户详细地址" width="110"></el-table-column>
					<el-table-column prop="householder" label="户主姓名" width="80"></el-table-column>
					<el-table-column prop="householderIdCard" label="户主公民身份证号码" width="160"></el-table-column>
					<el-table-column prop="householderContact" label="户主联系方式" width="110"></el-table-column>
					<el-table-column prop="relations" label="与户主关系"  width="100"></el-table-column>
					<el-table-column prop="populations" label="暂住人数" width="80"></el-table-column>
					<el-table-column prop="houseOwnership" label="房屋权属" width="80"></el-table-column>
					<el-table-column prop="registryConsistency" label="户籍状况"></el-table-column>
					<el-table-column prop="address" label="租住时间"></el-table-column>
				</el-table>
			</ul>
		</el-dialog>
	</el-dialog>
</template>
<script>
	export default {
		props: ['Visible', 'title', 'seeDataVal'],
		watch: {
			Visible() {
				this.diaVisible = this.Visible
			},

		},
		data() {
			return {
				diaVisible: false,
				innerVisible: false,
				tableData: [],
			}
		},
		methods: {
			close: function() {
				this.$emit('close')
			},
			show() {
				this.innerVisible = true;
				this.$request.get('/zzHoseholdPopulation/findListByHpId', {
						hpId: this.seeDataVal.id,
						//...this.post
					},
					res => {
						this.tableData = res.data;
						console.log(res);
						console.log(this.tableData);
						
					}
				);
			}

		},
		mounted() {
		},
	}
</script>
<style>
	.dialogTitle {
		padding: 10px;
		border: 1px dashed #f1f1f1;
		color: #000;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.dialogTitle i {
		margin-right: 5px;
	}

	.dialogList {
		display: flex;
		flex-wrap: wrap;
	}

	.dialogList li P {
		min-width: 120px;
		height: 30px;
		padding: 10px 10px;
		line-height: 30px;
		text-align: center;
		border-right: 1px solid #f3f3f3;
		border-bottom: 1px solid #f3f3f3;
		word-break: break-all;
	}

	.dialogList li P:nth-of-type(1) {

		background: #f5f5f5;
	}

	.dialogList li P:nth-of-type(2) {
		color: #000;
	}

	.lineAuto {
		line-height: 20px !important;
	}
</style>
