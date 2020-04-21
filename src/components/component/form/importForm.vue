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
				<span>联系电话：</span>
				<el-input type="number" class="oinput" v-model="person.contact" placeholder="请输入联系电话"></el-input>
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
			<el-table-column prop="householdNumber" label="户号"> </el-table-column>
			<el-table-column prop="idCard" :formatter="GLOBAL.check.formatID" label="公民身份证号码"></el-table-column>
			<el-table-column prop="householder" label="户主姓名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="personName" label="居住人姓名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="relations" label="居住关系" show-overflow-tooltip></el-table-column>
			<el-table-column prop="houseOwnership" label="房屋权属" show-overflow-tooltip></el-table-column>
			<el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
			<el-table-column prop="birth" label="出生日期" show-overflow-tooltip></el-table-column>
			<el-table-column prop="nation" label="民族" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="nativePlace" label="籍贯" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="contact" :formatter="GLOBAL.check.formatPhone" label="联系电话" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="servicePlace" label="工作单位" show-overflow-tooltip> </el-table-column>
		</el-table>
		<div style="text-align:right;margin:20px 0;">
			<el-pagination background @size-change="sizeChange" @current-change="currentChange" layout="sizes,prev, pager, next"
			 :total="pagination.total">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [],
				person: {},
				select: []
			}
		},
		props: ['needImportList', 'pagination'],
		methods: {

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
				this.$request.post('/filePopulation/dataImportAll', {
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
