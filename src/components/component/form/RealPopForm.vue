<template>
	<div class="pad10">
		<el-form :inline="true" label-position="top" label-width="80px" ref="PersonFormData" :rules="rules" :model="PersonFormData">
			<el-form-item label="户号：">
				<el-input v-model="PersonFormData.householdNumber" placeholder="请输入户号"></el-input>
			</el-form-item>
			<el-form-item label="户主姓名：" prop="householder">
				<el-input v-model="PersonFormData.householder" placeholder="请输入户主姓名"></el-input>
			</el-form-item>

			<el-form-item label="户主关系：">
				<el-select @change="changeRelations" v-model="PersonFormData.relations" placeholder="请选择户主关系">
					<el-option v-for="item in relation" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="居住人姓名：" prop="personName">
				<el-input v-model="PersonFormData.personName" placeholder="请输入居住人姓名"></el-input>
			</el-form-item>
			<el-form-item label="楼栋地址：" prop="buildingPlace">
				<el-input v-model="PersonFormData.buildingPlace" placeholder="请输入楼栋地址"></el-input>
			</el-form-item>
			<el-form-item label="房屋权属：">
				<el-select v-model="PersonFormData.houseOwnership" placeholder="请选择房屋权属">
					<el-option v-for="item in Ownership" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="户籍状况：">
				<el-select v-model="PersonFormData.registryConsistency" placeholder="请选择户籍状况 ">
					<el-option v-for="item in Status" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别：" prop="sex">
				<el-select v-model="PersonFormData.sex" placeholder="请选择性别 ">
					<el-option v-for="item in Sex" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="文化程度：" prop="qualifications">
				<el-select v-model="PersonFormData.qualifications" placeholder="请选择文化程度  ">
					<el-option v-for="item in Culture" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="联系电话：" prop="contact">
				<el-input v-model="PersonFormData.contact" placeholder="请输入联系电话"></el-input>
			</el-form-item>
			<el-form-item label="政治面貌：">
				<el-select v-model="PersonFormData.politicalStatus" placeholder="请选择政治面貌">
					<el-option v-for="item in Politics" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="民族：" prop="nation">
				<el-select v-model="PersonFormData.nation" placeholder="请选择民族 ">
					<el-option v-for="item in Nation" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="公民身份证号：" prop="idCard">
				<el-input @blur="getBirth" v-model="PersonFormData.idCard" placeholder="请输入公民身份证号"></el-input>
			</el-form-item>
			<!--  -->
			<el-form-item label="是否低保户:">
				<el-select class="oinput" v-model="PersonFormData.isDibao" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否大病：">
				<el-select class="oinput" v-model="PersonFormData.isDabing" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否外出务工：">
				<el-select class="oinput" v-model="PersonFormData.isWaichuwugong" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人户一致标志：">
				<el-select class="oinput" v-model="PersonFormData.consistencyFlag" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人户分类情况：">
				<el-select class="oinput" v-model="PersonFormData.consistencyType" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否党员：">
				<el-select class="oinput" v-model="PersonFormData.isPartyMember" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否政协委员：">
				<el-select class="oinput" v-model="PersonFormData.isCppccMember" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否人大代表：">
				<el-select class="oinput" v-model="PersonFormData.isNpcMember" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否户籍人口：">
				<el-select class="oinput" v-model="PersonFormData.isRegistry" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否借住人口：">
				<el-select class="oinput" v-model="PersonFormData.isLodged" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否空挂人口：">
				<el-select class="oinput" v-model="PersonFormData.isEmptyHanging" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否流动人口：">
				<el-select class="oinput" v-model="PersonFormData.isFloating" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否寄住人口：">
				<el-select class="oinput" v-model="PersonFormData.isHostfamily" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否志愿者：">
				<el-select class="oinput" v-model="PersonFormData.isVolunteer" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否残疾人：">
				<el-select class="oinput" v-model="PersonFormData.isCanji" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否计生对象：">
				<el-select class="oinput" v-model="PersonFormData.isJisheng" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否少数名族：">
				<el-select class="oinput" v-model="PersonFormData.isShaoshu" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否孤寡独居老人：">
				<el-select class="oinput" v-model="PersonFormData.isGuguaduju" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否重点关注人员：">
				<el-select class="oinput" v-model="PersonFormData.isAttention" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否稳控对象：">
				<el-select class="oinput" v-model="PersonFormData.isWenkong" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否社区矫正人员：">
				<el-select class="oinput" v-model="PersonFormData.isShequjiaozheng" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否刑释解教人员：">
				<el-select class="oinput" v-model="PersonFormData.isXingshijiejiao" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否涉外：">
				<el-select class="oinput" v-model="PersonFormData.isShewai" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否问题青少年：">
				<el-select class="oinput" v-model="PersonFormData.isWentiqingshaonian" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否涉毒：">
				<el-select class="oinput" v-model="PersonFormData.isShedu" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否信访：">
				<el-select class="oinput" v-model="PersonFormData.isXinfang" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否涉军：">
				<el-select class="oinput" v-model="PersonFormData.isShejun" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否涉法涉诉：">
				<el-select class="oinput" v-model="PersonFormData.isShefashesu" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否肇事肇祸精神障碍者：">
				<el-select class="oinput" v-model="PersonFormData.isJingshen" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否涉邪：">
				<el-select class="oinput" v-model="PersonFormData.isShexie" placeholder="请选择">
					<el-option v-for="item in Whether" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<!--  -->
			<el-form-item label="出生日期：">
				<el-date-picker v-model="PersonFormData.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="死亡日期：">
				<el-date-picker v-model="PersonFormData.deathTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="婚姻状况：" prop="maritalStatus">
				<el-select v-model="PersonFormData.maritalStatus" placeholder="请选择婚姻状况 ">
					<el-option v-for="item in this.GLOBAL.select.marry" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人户分类情况：" prop="consistencyType">
				<el-select class="oinput" v-model="PersonFormData.consistencyType" placeholder="请选择人户分类情况">
					<el-option v-for="item in GLOBAL.select.personClass" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="籍贯：" prop="nativePlace">
				<el-input v-model="PersonFormData.nativePlace" placeholder="请输入籍贯"></el-input>
			</el-form-item>
			<el-form-item label="职业现状：" prop="occupationStatus">
				<el-select v-model="PersonFormData.occupationStatus" placeholder="请选择职业现状 ">
					<el-option v-for="item in Occupation" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="工作单位：">
				<el-input v-model="PersonFormData.servicePlace" placeholder="请输入工作单位"></el-input>
			</el-form-item>
			<el-form-item label="特长：">
				<el-select v-model="PersonFormData.skills" placeholder="请选择特长 ">
					<el-option v-for="item in Speciality" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="暂住人数：">
				<el-input v-model="PersonFormData.populations" placeholder="请输入暂住人数"></el-input>
			</el-form-item>
			<el-form-item label="租住时间：">
				<el-date-picker v-model="PersonFormData.tenancyTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<!-- <el-form-item label="详细地址：" prop="domicileAddress">
				<el-input type="textarea" v-model="PersonFormData.domicileAddress" placeholder="请输入详细地址"></el-input>
			</el-form-item> -->
			<el-form-item label="详细地址：" prop="domicileAddress">
				<el-button type="primary" @click="sendPost" size="mini" round>详情</el-button>
				<!-- <el-button type="primary" @click="sendGet" size="mini" round>详情</el-button> -->
				
				
				
				<!-- <el-table ref="singleTable" :data="tableData" highlight-current-row @row-click="showRow" style="width:500px" border>
					<el-table-column label="选择" width="70" header-align="center" align="center">
						<template slot-scope="scope">
							<el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
					<el-table-column prop="role" label="角色" header-align="center" align="center"></el-table-column>
					<el-table-column prop="tel" label="手机号" header-align="center" align="center"></el-table-column>
				</el-table> -->
			</el-form-item>

			<!-- <div style="margin:20px auto;text-align:center;">
				<el-form-item size="large">
					<el-button type="primary" @click="submit('PersonFormData','wenkong')">添加到稳控人口</el-button>
					<el-button type="primary" @click="submit('PersonFormData','jiaozheng')">添加到矫正人口</el-button>
					<el-button @click="reset('PersonFormData')">重置</el-button>
				</el-form-item>
			</div> -->
			<div style="margin:20px auto;text-align:center;">
				<el-form-item size="large">
					<el-button type="primary" @click="submit('PersonFormData')">确认修改</el-button>
					<el-button @click="reset('PersonFormData')">重置</el-button>
				</el-form-item>
			</div>
		</el-form>
		<!---->
		<el-dialog width="70%" :visible.sync="box" append-to-body>
			<p class="dialogTitle"><i class="el-icon-star-on"></i>修改房屋信息</p>
			<ul class="dialogList clearfix">
				<el-form :inline="true" label-position="top" label-width="80px" width="100%">
					<template>
							<div class="table_box">
								<div class="btn" style="text-align: left;">
									<el-button type="primary" @click="addItem">新增</el-button>
								</div>
								<el-table :data="list" border style="width: 100%;" stripe height="260" highlight-current-row @row-click="showRow">
									<el-table-column label="选择" width="70" header-align="center" align="center">
										<template slot-scope="scope">
											<el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
										</template>
									</el-table-column>
									 <el-table-column label="户籍人口" align='center' width="170">
										<template slot-scope="scope">
											<span v-if="!scope.row.isEgdit">{{['户籍人口','借住人口','空挂人口','流动人口','寄住人口'][scope.row.hpType-1]}}</span>
											<el-select placeholder="请选择" v-if="scope.row.isEgdit" v-model="scope.row.hpType">
												<el-option v-for="(item, index) in ['户籍人口','借住人口','空挂人口','流动人口','寄住人口']" :key="index+1" :label="item" :value="index+1">
												</el-option>
											</el-select>
										</template>
									</el-table-column>
									<el-table-column prop="householdAddress" label="详细地址" align='center' width="170">
										<template slot-scope="scope">
											<span v-if="!scope.row.isEgdit">{{scope.row.householdAddress}}</span>
											<el-input  v-if="scope.row.isEgdit" v-model="scope.row.householdAddress"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="houseOwnership" label="产权" align='center' width="170">
										<template slot-scope="scope">
											<span v-if="!scope.row.isEgdit">{{scope.row.houseOwnership}}</span>
											<el-input v-if="scope.row.isEgdit" v-model="scope.row.houseOwnership"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="relations" label="户主关系" align='center' width="170">
										<template slot-scope="scope">
											<span v-if="!scope.row.isEgdit">{{scope.row.relations}}</span>
											<el-input v-if="scope.row.isEgdit" v-model="scope.row.relations"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="populations" label="暂住人数" align='center' width="170">
										<template slot-scope="scope">
											<span v-if="!scope.row.isEgdit">{{scope.row.populations}}</span>
											<el-input v-if="scope.row.isEgdit" v-model="scope.row.populations"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="householdNum" label="楼号" align='center' width="170">
										<template slot-scope="scope">
											<span v-if="!scope.row.isEgdit">{{scope.row.householdNum}}</span>
											<el-input v-if="scope.row.isEgdit" v-model="scope.row.householdNum"></el-input>
										</template>
									</el-table-column>
									
									<el-table-column fixed="right" label="操作" align='center' width="110">
										<template slot-scope="scope">
											<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click='edit(scope.$index,scope.row)' icon="el-icon-edit"
											 circle></el-button>
											<el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)'
											 icon="el-icon-check" circle></el-button>
											<el-button @click.native.prevent="deleteItem(scope.$index, list,scope.row)" type="danger" size="small" icon="el-icon-delete"
											 circle></el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</template>
						<!-- <div style="margin:20px auto;text-align:center;">
							<el-form-item size="large">
								<el-button type="primary" @click="addhouse">提交</el-button>					
							</el-form-item>
						</div> -->
					</el-form>
			</ul>
		</el-dialog>
		<!---->
		<el-dialog :visible.sync="wenkongFormVisble" width="80%" :modal="false">
			<WenKong @success="editSuccess"></WenKong>
		</el-dialog>
		<el-dialog :visible.sync="jiaozhengFormVisble" width="80%" :modal="false">
			<JiaoZheng @success="editSuccess"></JiaoZheng>
		</el-dialog>
		<el-dialog :visible.sync="tableedit" width="80%" :modal="false">
			<TableEdit @success="editSuccess"></TableEdit>
		</el-dialog>
	</div>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import WenKong from './editformWenKong.vue'
	import JiaoZheng from './editformJiaoZheng.vue'
	import TableEdit from './TableEdit.vue'
	import axios from 'axios'
	export default {
		components: {
			WenKong,
			JiaoZheng,
			TableEdit
		},
		data() {
			var checkID = (rule, value, callback) => {
				if (!this.GLOBAL.check.idCard(value)) {
					return callback(new Error('身份证号码填写错误'));
				}
				callback();
			}
			return {
				relation: this.GLOBAL.select.relation,
				Ownership: this.GLOBAL.select.Ownership,
				Culture: this.GLOBAL.select.Culture,
				Politics: this.GLOBAL.select.Politics,
				Occupation: this.GLOBAL.select.Occupation,
				Sex: this.GLOBAL.select.Sex,
				Status: this.GLOBAL.select.Status,
				Nation: this.GLOBAL.select.Nation,
				Speciality: this.GLOBAL.select.Speciality,
				tableval: {},
				list: [],
				radio: '',
				send_radio: '',
				Whether: [{
						value: '1',
						label: '是'
					},
					{
						value: '0',
						label: '否'
					}
				],
				rules: {
					idCard: [{
						validator: checkID,
						required: true,
						message: '请输入公民身份证号',
						trigger: 'blur'
					}],
					householder: [{
						required: true,
						message: '请输入户主姓名',
						trigger: 'change'
					}],
					personName: [{
						required: true,
						message: '请输入居住人姓名',
						trigger: 'change'
					}],
					nativePlace: [{
						required: true,
						message: '请输入籍贯',
						trigger: 'change'
					}],
					qualifications: [{
						required: true,
						message: '请选择文化程度',
						trigger: 'change'
					}],
					occupationStatus: [{
						required: true,
						message: '请选择职业现状',
						trigger: 'change'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					maritalStatus: [{
						required: true,
						message: '请选择婚姻状况',
						trigger: 'change'
					}],
					nation: [{
						required: true,
						message: '请选择民族',
						trigger: 'change'
					}],
					domicileAddress: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					consistencyFlag: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					consistencyType: [{
						required: false,
						message: '请选择',
						trigger: 'change'
					}],
					isPartyMember: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isCppccMember: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isNpcMember: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isRegistry: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isLodged: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isEmptyHanging: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isFloating: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isHostfamily: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isVolunteer: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isCanji: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isJisheng: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShaoshu: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isGuguaduju: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isAttention: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isWenkong: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShequjiaozheng: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isXingshijiejiao: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShewai: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isWentiqingshaonian: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShedu: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isXinfang: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShejun: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShefashesu: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isJingshen: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					isShexie: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}]
				},
				wenkongFormVisble: false,
				jiaozhengFormVisble: false,
				tableedit: false,
				box:false

			}
		},
		computed: {
			...mapState([
				'PersonFormData',
			])
		},
		props: ['requestUrl'],
		methods: {
			...mapMutations([
				'AddWenKongData',
				'AddJiaoZhengData',
				'AddTableEditData'
			]),
			// editSuccess() {
			// 	this.wenkongFormVisble = false;
			// 	this.jiaozhengFormVisble = false;
			// 	this.tableedit = false;
			// 	this.$emit('success')
			// },
			postData(val) {
				this.sendData(val, () => {
					if (val == 'wenkong') {
						this.getWenkong(this.PersonFormData.id);
					}
					if (val == 'wenkong') {
						this.getJiaoZheng(this.PersonFormData.id);
					} else {
						this.getTableEdit(this.PersonFormData.id)
					}
				})
			},
			getWenkong(id) {
				this.$request.get('zzHoseholdPopulationWenkong/find?popuId=' + id, {}, res => {
					if (res.data) {
						this.AddWenKongData(res.data)
						this.wenkongFormVisble = true;
						return;
					}
				})
			},
			getJiaoZheng(id) {
				this.$request.get('zzHoseholdPopulationJiaozheng/find?popuId=' + id, {}, res => {
					if (res.data) {
						this.AddWenKongData(res.data)
						this.jiaozhengFormVisble = true;
						return;
					}
				})
			},
			getTableEdit(id) {
				this.$request.get('zzHoseholdPopulationJiaozheng/find?popuId=' + id, {}, res => {
					if (res.data) {
						this.AddWenKongData(res.data)
						this.tableedit = true;
						return;
					}
				})
			},
			sendData(val, callback) {
				var _this = this;
				var postObj = {};
				for (var key in this.PersonFormData) {
					if (this.PersonFormData[key]) {
						postObj[key] = this.PersonFormData[key];
					}
				}
				postObj.popuId = postObj.id;
				delete postObj.createTime;
				delete postObj.createUser;
				delete postObj.dataRoleId;
				delete postObj.modifyTime;
				delete postObj.modityUser;
				var url = '';
				if (val == 'wenkong') {
					url = 'zzHoseholdPopulationWenkong/update'
				} else {
					url = 'zzHoseholdPopulationJiaozheng/update'
				}
				this.$request.post(url, { ...postObj
				}, function(res) {
					if (res.result == 1) {
						if (callback) callback();
						// _this.$message('操作成功');
						// _this.$emit('success')
					} else {
						_this.$message.error(res.msg);
					}

				}, function(res) {
					_this.$message.error('操作失败，请稍后重试');
				})
			},
			//选择“本人”时，户主姓名复制到居住人姓名
			changeRelations(val) {
				if (val == '本人') {
					this.PersonFormData.personName = this.PersonFormData.householder;
				}
			},
			getBirth() {
				var birth = this.getBirthdatByIdNo(this.PersonFormData.idCard);
				if (birth) {
					this.PersonFormData.birth = birth;
				}
			},
			trim(s) {
				return s.replace(/^\s+|\s+$/g, "");
			},
			getBirthdatByIdNo(iIdNo) {
				var tmpStr = "";
				var idDate = "";
				var tmpInt = 0;
				var strReturn = "";

				iIdNo = this.trim(iIdNo);

				if ((iIdNo.length != 15) && (iIdNo.length != 18)) {
					strReturn = "输入的身份证号位数错误";
					return;
				}

				if (iIdNo.length == 15) {
					tmpStr = iIdNo.substring(6, 12);
					tmpStr = "19" + tmpStr;
					tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

					return tmpStr + ' 00:00:00';
				} else {
					tmpStr = iIdNo.substring(6, 14);
					tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

					return tmpStr + ' 00:00:00';
				}
			},
			reset(PersonFormData) {
				this.$refs[PersonFormData].resetFields();
			},
// 			sendGet() {
// 				var forid = this.PersonFormData.id;
// 				axios.get('/zzHoseholdPopulation/findListByHpId', {
// 					params: {
// 						hpId: forid,
// 					}
// 				}).then(resp => {
// 					console.log(forid);
// 
// 					//console.log(this.tableval.data);
// 					//this.tableval.data = resp.data;
// 					var houselist = resp.data.data;
// 					console.log(houselist);
// 					sessionStorage.setItem("houselist", houselist);
// 					//console.log(this.tableval)
// 					this.tableedit = true;
// 				}).catch(resp => {
// 					console.log('请求失败');
// 				});
// 			},
			// show(id){
			// 	this.tableedit = true;
			// 	//console.log(this.PersonFormData.id);
			// 	var forid = this.PersonFormData.id;
			// 	console.log(forid);
			// 	var _this = this;
			// 	this.$request.get('/zzHoseholdPopulation/find',{...forid},function(res){
			// 	    if(res.result == 1){
			// 			console.log("成功");
			// 	       // _this.$message('操作成功');
			// 	       // _this.reset('PersonFormData')
			// 	    }else{
			// 	        console.log(res.msg);
			// 	    }
			// 				
			// 	},function(res){
			// 	    _this.$message.error('操作失败，请稍后重试');
			// 	})
			// 	
			// },
			// submit(formName, type) {
			// 	console.log(this.PersonFormData.id)
			// 	var _this = this;
			// 	this.$refs[formName].validate((valid) => {
			// 		if (valid) {
			// 			this.postData(type);
			// 		} else {
			// 			this.$message.error('请完善必填信息');
			// 			return;
			// 		}
			// 	});
			// },
			submit(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {					
						this.postDa();
					} else {
						this.$message.error('请完善必填信息');
						return;
					}
				});

			},
			postDa() {
				var _this = this;
				var postObj = this.PersonFormData;
				for (var key in postObj) {
					if (postObj[key] == "是" ) {
						postObj[key] = 1;
					}
					if (postObj[key] == "否" ) {
						postObj[key] = 0;
					}
				}	
				delete postObj.createTime;
				delete postObj.importDate;
				delete postObj.modifyTime;
				delete postObj.registryDate;
				delete postObj.termEnd;
				if(postObj.birth == null ){
					delete postObj.birth;				
				}else{
					postObj.birth = postObj.birth +' 00:00:00'
				}
				if(postObj.deathTime == null ){
					delete postObj.deathTime;	
				}else{
					postObj.deathTime = postObj.deathTime +' 00:00:00'
				}
				if(postObj.tenancyTime == null){
					delete postObj.tenancyTime;	
				}else{
					postObj.tenancyTime = postObj.tenancyTime +' 00:00:00'
				}
				this.$request.post('/zzHoseholdPopulation/update', { ...postObj
				}, function(res) {
					console.log(res)
					if (res.result == 1) {
						for (var key in postObj) {
							if (postObj[key] == 1 ) {
								postObj[key] = "是";
							}
							if (postObj[key] == 0 ) {
								postObj[key] = "否";
							}
						}	
						postObj.birth =/\d{4}-\d{1,2}-\d{1,2}/g.exec(postObj.birth)
						postObj.deathTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(postObj.deathTime)
						postObj.tenancyTime =/\d{4}-\d{1,2}-\d{1,2}/g.exec(postObj.tenancyTime)
						_this.$message('操作成功');
						_this.reset('PersonFormData')
					} else {
						console.log(res.msg);
					}

				}, function(res) {
					_this.$message.error('操作失败，请稍后重试');
				})
			},
			sendPost(){
				this.box = true;
				var forid = this.PersonFormData.id;
				axios.get('/zzHoseholdPopulation/findListByHpId', {
					params: {
						hpId: forid,
					}
				}).then(resp => {
					console.log(resp.data.data);
					this.list = resp.data.data;
				}).catch(resp => {
					console.log('请求失败');
				});
			},
			//新增数据
			addItem() {
				let item = {
					id:null,
					hpType: null,
					householdAddress: null,
					houseOwnership: null,
					relations: null,
					populations: null,
					householdNum: null,
					isEgdit: true,
					isAdd:true
				}
				this.list.push(item)
				//console.log(item)
			},
			//删除数据
			deleteItem(index, list ,row) {
				var _this = this;
				this.$request.get('/zzHoseholdPopulation/delInfoById', { id:row.id
				}, function(res) {
					console.log(res)
					if (res.result == 1) {
						_this.$message('操作成功');
						_this.reset('PersonFormData')
						_this.list.splice(index, 1);
					} else {
						console.log(res.msg);
					}
				
				}, function(res) {
					_this.$message.error('操作失败，请稍后重试');
				})
			},
			//编辑数据
			edit(index, row) {
				this.$set(row, 'isEgdit', true)
			},
			//编辑
			editSuccess(index, row) {
				var _this = this;
				//console.log(row);
				delete row.hpId
				var forid = this.PersonFormData.id;
				row.hpId = forid
				if(row.householdAddress == null || row.householdAddress == ""){
					_this.$message.error('详细地址必须填写');
					return;
				}
				//console.log(row)
				this.$request.get('/zzHoseholdPopulation/addOrUpdateInfoById', { ...row
				}, function(res) {
					if (res.result == 1) {
						_this.$message('操作成功！');
						_this.reset('PersonFormData')
						_this.$set(row, 'isEgdit', false);
					} else {
						console.log(res.msg);
					}
				
				}, function(res) {
					_this.$message.error('操作失败，请稍后重试');
				})
				
				
				
				
				
			},
			showRow(index, row) {
				//this.radio = this.tableData.indexOf(row);
				//this.send_radio = row.id;
				//console.log(index);
				
			},
			addhouse(index, row){
				//this.$set(row, 'isEgdit', false);
				console.log(index);
			}
		},
	}
</script>

<style>

</style>
