<template>
	<div>
		<div class="search">

			<p>
				<span>社区：</span>
				<el-select v-model="person.community" placeholder="请选择">
					<el-option v-for="item in this.GLOBAL.select.Community" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</p>
			<p>
				<span>网格：</span>
				<el-select v-model="person.grid" placeholder="请选择">
					<el-option v-for="item in this.GLOBAL.select.grid" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</p>
			<p>
				<span>公民身份证号：</span>
				<el-input class="oinput" v-model="person.idCard" placeholder="公民身份证号"></el-input>
			</p>
			<p>
				<span>户主姓名：</span>
				<el-input class="oinput" v-model="person.personName" placeholder="请输入户主姓名"></el-input>
			</p>
			<p>
				<el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click='fastImport'>一建导入</el-button>
				<el-button type="" @click="reset">重置</el-button>
			</p>
		</div>
		<el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
		 :data="needImportList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" label="是否导入">

			</el-table-column>
			<el-table-column label="行号" type="index" width="50">
			</el-table-column>
			<el-table-column prop="idCard" :formatter="GLOBAL.check.formatID" label="公民身份证号码"></el-table-column>
			<el-table-column prop="personName" label="姓名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isXingshijiejiao" :formatter="GLOBAL.check.formatIsNo" label="是否刑释解教人员" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isShewai" :formatter="GLOBAL.check.formatIsNo" label="是否涉外" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isWentiqingshaonian" :formatter="GLOBAL.check.formatIsNo" label="是否问题青少年"
			 show-overflow-tooltip></el-table-column>
			<el-table-column prop="isShedu" :formatter="GLOBAL.check.formatIsNo" label="是否涉毒" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isXinfang" :formatter="GLOBAL.check.formatIsNo" label="是否信访" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isShejun" :formatter="GLOBAL.check.formatIsNo" label="是否涉军" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="isShefashesu" :formatter="GLOBAL.check.formatIsNo" label="是否涉法涉诉" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="isJingshen" :formatter="GLOBAL.check.formatIsNo" label="是否肇事肇祸精神障碍者" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="isShexie" :formatter="GLOBAL.check.formatIsNo" label="是否涉邪" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="操作" width="130">
				<template slot-scope="scope">
					<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="text-align:right;margin:20px 0;">
			<el-pagination background @size-change="sizeChange" @current-change="currentChange" layout="sizes,prev, pager, next"
			 :total="pagination.total">
			</el-pagination>
		</div>
		<el-dialog title="编辑重点人口" :visible.sync="dialogTableVisible">
			<importantEditForm :importantFormData="formData" @editsuccess="editsuccess"></importantEditForm>
		</el-dialog>

	</div>
</template>
<script>
	import importantEditForm from './importantEditForm.vue'
	export default {
		data() {
			return {
				tableData: [],
				person: {},
				select: [],
				formData: {},
				dialogTableVisible: false
			}
		},
		props: ['needImportList','pagination'],
		components: {
			importantEditForm
		},
		methods: {
			edit(val) {
				this.formData = val;
				this.dialogTableVisible = true;
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2) {
					return 'bg-f6'
				}
				return ''
			},
			handleSelectionChange(val) {
				this.select = [];
				for (let index = 0; index < val.length; index++) {
					this.select.push(val[index].id)
				}
				this.$emit('getCheck', this.select)
			},
			sizeChange(val) {
				this.pagination.size = val
				this.$emit('changeImportList1', this.pagination);
			},
			currentChange(val) {
				this.pagination.current = val
				this.$emit('changeImportList1', this.pagination);
			},
			find() {
				this.$emit('changeImportList', this.person);
			},
			editsuccess() {
				this.dialogTableVisible = false;
				this.find();
			},
			reset() {
				for (const key in this.person) {
					if (this.person.hasOwnProperty(key)) {
						this.person[key] = '';
					}
				}
				this.$emit('changeImportList', this.person);
			
			},
			fastImport() {
				if (this.needImportList.length < 1) {
					this.$message.error('没有可导入数据');
					return
				}
				var loading = this.$loading({
					lock: true,
					text: '正在导入，请耐心等待...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				var _this = this
				this.$request.post('/fileImportantPopulation/dataImportAll', {
					...this.person
				}, function(res) {
					if (res.result == '1') {
						_this.$message({
							showClose: true,
							message: '导入成功',
							type: 'success'
						});
						_this.$emit('successImport', res.data, 3);
						_this.person = {}
						_this.reset();
						loading.close();
					}
				})
			
			}
		}
	}
</script>
