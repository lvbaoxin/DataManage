<template>
	<div class="pad10">
		<el-form :inline="true" label-position="top" label-width="80px" ref="WenKongFormData" :rules="rules" :model="WenKongFormData">
			<!-- <el-form-item label="身份证号：">
        <el-input v-model="WenKongFormData.idCard" placeholder="请输入户号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="personName">
        <el-input v-model="WenKongFormData.personName" placeholder="请输入户主姓名"></el-input>
      </el-form-item>
      <el-form-item label="户籍详址：" prop="registryAddress">
        <el-input v-model="WenKongFormData.registryAddress" placeholder></el-input>
      </el-form-item>
      <el-form-item label="现住地详情：" prop="domicileAddress">
        <el-input v-model="WenKongFormData.domicileAddress" placeholder></el-input>
      </el-form-item>
      <el-form-item label="人户一致标志：" prop="consistencyFlag">
        <el-select v-model="WenKongFormData.consistencyFlag" placeholder="请选择信访事项类别">
          <el-option
            v-for="item in GLOBAL.select.isOrNo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信访事项类别：" prop="xinfangType">
        <el-input v-model="WenKongFormData.xinfangType" placeholder></el-input>
      </el-form-item>
      <el-form-item label="主要问题：" prop="xinfangRemark">
        <el-input v-model="WenKongFormData.xinfangRemark" placeholder></el-input>
      </el-form-item>
      <el-form-item label="定级依据：" prop="wenkongTypeReason">
        <el-input v-model="WenKongFormData.wenkongTypeReason" placeholder></el-input>
      </el-form-item>
      <el-form-item label="责任单位：" prop="responsibleUnit">
        <el-input v-model="WenKongFormData.responsibleUnit" placeholder></el-input>
      </el-form-item>
      <el-form-item label="街道包保人员：" prop="streetPerson">
        <el-input v-model="WenKongFormData.streetPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="街道包保人员联系方式：" prop="streetContact">
        <el-input v-model="WenKongFormData.streetContact" placeholder></el-input>
      </el-form-item>
      <el-form-item label="派出所责任民警：" prop="policeStationPerson">
        <el-input v-model="WenKongFormData.policeStationPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="派出所责任民警联系方式：" prop="policeStationContact">
        <el-input v-model="WenKongFormData.policeStationContact" placeholder></el-input>
      </el-form-item>
      <el-form-item label="社区责任人：" prop="communityPerson">
        <el-input v-model="WenKongFormData.communityPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="社区责任人联系方式：" prop="communityContact">
        <el-input v-model="WenKongFormData.communityContact" placeholder></el-input>
      </el-form-item> -->
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
						<el-table-column label="最喜欢吃" align='center'>
							<template slot-scope="scope">
								<span v-if="!scope.row.isEgdit">{{['橙子','橘子','榴莲'][scope.row.fruitSort-1]}}</span>
								<el-select placeholder="请选择" v-if="scope.row.isEgdit" v-model="scope.row.fruitSort">
									<el-option v-for="(item, index) in ['橙子','橘子','榴莲']" :key="index+1" :label="item" :value="index+1">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="firstNum" label="第一周吃的数量" align='center'>
							<template slot-scope="scope">
								<span v-if="!scope.row.isEgdit">{{scope.row.firstNum}}</span>
								<el-input v-if="scope.row.isEgdit" v-model="scope.row.firstNum"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="secondNum" label="第二周吃的数量" align='center'>
							<template slot-scope="scope">
								<span v-if="!scope.row.isEgdit">{{scope.row.secondNum}}</span>
								<el-input v-if="scope.row.isEgdit" v-model="scope.row.secondNum"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="thirdNum" label="第三周吃的数量" align='center'>
							<template slot-scope="scope">
								<span v-if="!scope.row.isEgdit">{{scope.row.thirdNum}}</span>
								<el-input v-if="scope.row.isEgdit" v-model="scope.row.thirdNum"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="fourthNum" label="第四周吃的数量" align='center'>
							<template slot-scope="scope">
								<span v-if="!scope.row.isEgdit">{{scope.row.fourthNum}}</span>
								<el-input v-if="scope.row.isEgdit" v-model="scope.row.fourthNum"></el-input>
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" align='center'>
							<template slot-scope="scope">
								<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click='edit(scope.$index,scope.row)' icon="el-icon-edit"
								 circle></el-button>
								<el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)'
								 icon="el-icon-check" circle></el-button>
								<el-button @click.native.prevent="deleteItem(scope.$index, list)" type="danger" size="small" icon="el-icon-delete"
								 circle></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</template>
			<div style="margin:20px auto;text-align:center;">
				<el-form-item size="large">
					<el-button type="primary" @click="submit('WenKongFormData')">提交</el-button>					
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>
<script>
	import {
		mapState
	} from "vuex";
	export default {
		//props: ['tableval'],
		beforeMount() {
		var forhouselist = sessionStorage.getItem('houselist');
		//var daa = JSON.parse(forhouselist);
		//let homeObj = JSON.parse('<%- JSON.stringify(signoutBool) %>');
		console.log(forhouselist);
		},
		data() {
			return {
				rules: {},
				radio: '',
				send_radio: '',
				
				list: [{
					id: 1,
					fruitSort: 1,
					firstNum: 10,
					secondNum: 3,
					thirdNum: 4,
					fourthNum: 6,
				}, {
					id: 2,
					fruitSort: 2,
					firstNum: 7,
					secondNum: 6,
					thirdNum: 8,
					fourthNum: 2,
				}, {
					id: 3,
					fruitSort: 3,
					firstNum: 5,
					secondNum: 6,
					thirdNum: 8,
					fourthNum: 9,
				}, {
					id: 4,
					fruitSort: 3,
					firstNum: 10,
					secondNum: 3,
					thirdNum: 4,
					fourthNum: 6,
				}],
				
			};

		},
		computed: {
			...mapState(["WenKongFormData"])
		},
		
		methods: {
			submit(formName) {
				var _this = this;
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.postData();
					} else {
						this.$message.error("请完善必填信息");
						return;
					}
				});
			},
			postData() {
				var postObj = {};
				for (var key in this.WenKongFormData) {
					if (this.WenKongFormData[key]) {
						postObj[key] = this.WenKongFormData[key];
					}
				}
				var _this = this;
				this.$request.post(
					"zzHoseholdPopulationWenkong/update", { ...postObj
					},
					function(res) {
						if (res.result == 1) {
							_this.$message("操作成功");
							_this.$emit("success");
						} else {
							_this.$message.error(res.msg);
						}
					},
					function(res) {
						_this.$message.error("操作失败，请稍后重试");
					}
				);
			},

			reset(formName) {
				for (var key in this.WenKongFormData) {
					if (key != "id" && key != "popuId") {
						this.WenKongFormData[key] = "";
					}
				}
			},
			showRow(index, row) {
				//this.radio = this.tableData.indexOf(row);
				//this.send_radio = row.id;
				console.log(index, row);
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},

			//新增数据
			addItem() {
				// let item = {
				// 	id: null,
				// 	fruitSort: null,
				// 	firstNum: null,
				// 	secondNum: null,
				// 	thirdNum: null,
				// 	fourthNum: null,
				// 	isEgdit: true
				// }
				// this.list.push(item)
				//var signoutBool = sessionStorage.getItem('tableval');
				//this.tableval = JSON.toJSONString(signoutBool);
				//let homeObj = JSON.parse('<%- JSON.stringify(signoutBool) %>');
				//console.log(homeObj);
			},
			//删除数据
			deleteItem(index, list) {
				list.splice(index, 1);
			},
			//编辑数据
			edit(index, row) {
				this.$set(row, 'isEgdit', true)
			},
			//编辑成功
			editSuccess(index, row) {
				this.$set(row, 'isEgdit', false)
			},

		}
	};
</script>

<style>
</style>
