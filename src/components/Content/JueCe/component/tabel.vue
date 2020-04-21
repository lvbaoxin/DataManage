<template>
	<div>
		<div class="ocontent">
			<p style="margin-bottom:20px;">选择类别：
				<el-select v-model="jueceClass" placeholder="请选择类别">
					<el-option v-for="item in this.GLOBAL.select.jueceClass" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</p>
			<!-- 事件 -->
			<el-tabs type="border-card" v-model="editableTabsValue" v-show="jueceClass=='事件'">
				<el-tab-pane label="不可导入事件列表" name="2">
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable1" border :data="faildata.case"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column label="行数" prop="excelLine"></el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="caseType" label="事件类别"></el-table-column>
						<el-table-column prop="caseRemark" label="问题状况"></el-table-column>
						<el-table-column prop="caseAddress" label="发生地详址"></el-table-column>
						<el-table-column prop="importErrorMsg" label="错误提示"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="可导入事件列表" name="1">
					<search @search="getlistCaseNeedImport" :postUrl='CasePostUrl' :dataLists='listCaseNeedImport'></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable2" border :data="listCaseNeedImport"
					 tooltip-effect="dark" style="width: 100%" @selection-change="listCaseSelectionChange">
						<el-table-column type="selection" width="55"> </el-table-column>
						<el-table-column label="行数" prop="excelLine"></el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="caseType" label="事件类别"></el-table-column>
						<el-table-column prop="caseRemark" label="问题状况"></el-table-column>
						<el-table-column prop="caseAddress" label="发生地详址"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,1)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="caseImportSizeChange" @current-change="caseImportCurrentChange" layout="sizes,prev, pager, next"
						 :total="caseImportTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="导入事件列表历史" name="3">
					<search @search="getlistCaseImportHisPage"></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable3" border :data="listCaseImportHisPage"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="caseType" label="事件类别"></el-table-column>
						<el-table-column prop="caseRemark" label="问题状况"></el-table-column>
						<el-table-column prop="caseAddress" label="发生地详址"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,1)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="caseSizeChange" @current-change="caseCurrentChange" layout="sizes,prev, pager, next"
						 :total="caseTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>

			<!-- 家庭 -->
			<el-tabs type="border-card" v-model="editableTabsValue" v-show="jueceClass=='家庭关系'">
				<el-tab-pane label="不可导入家庭关系列表" name="1">
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable1" border :data="faildata.relation"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column label="行数" prop="excelLine"></el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="relationType" label="关系类型"></el-table-column>
						<el-table-column prop="relationPerson" label="关系人名称"></el-table-column>
						<el-table-column prop="incomeStatus" label="收入状况"></el-table-column>
						<el-table-column prop="isGuardian" label="是否监护人"></el-table-column>
						<el-table-column prop="importErrorMsg" label="错误提示"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="可导入家庭关系列表" name="2">
					<search @search="getlistFamilyRelationNeedImport" :postUrl='familyPostUrl' :dataLists='listFamilyRelationNeedImport'></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable2" border :data="listFamilyRelationNeedImport"
					 tooltip-effect="dark" style="width: 100%" @selection-change="listFamilySelectionChange">
						<el-table-column type="selection" width="55"> </el-table-column>
						<el-table-column label="行数" prop="excelLine"></el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="relationType" label="关系类型"></el-table-column>
						<el-table-column prop="relationPerson" label="关系人名称"></el-table-column>
						<el-table-column prop="incomeStatus" label="收入状况"></el-table-column>
						<el-table-column prop="isGuardian" label="是否监护人"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,2)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="familyImportSizeChange" @current-change="familyImportCurrentChange"
						 layout="sizes,prev, pager, next" :total="familyImportTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="导入家庭关系列表历史" name="3">
					<search @search="getlistFamilyRelationImportHisPage"></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable3" border :data="listFamilyRelationImportHisPage"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="relationType" label="关系类型"></el-table-column>
						<el-table-column prop="relationPerson" label="关系人名称"></el-table-column>
						<el-table-column prop="incomeStatus" label="收入状况"></el-table-column>
						<el-table-column prop="isGuardian" label="是否监护人"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,2)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="familySizeChange" @current-change="familyCurrentChange"
						 layout="sizes,prev, pager, next" :total="familyTotal">
					</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>

			<!-- 帮扶 -->

			<el-tabs type="border-card" v-model="editableTabsValue" v-show="jueceClass=='帮扶'">
				<el-tab-pane label="不可导入帮扶列表" name="1">
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable1" border :data="faildata.bangfu"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="excelLine" label="行数"></el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="bangfuType" label="事件类别"></el-table-column>
						<el-table-column prop="bangfuRemark" label="问题状况"></el-table-column>
						<el-table-column prop="importErrorMsg" label="错误提示"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="可导入帮扶列表" name="2">
					<search @search="getlistBangfuNeedImport" :postUrl='bangfuPostUrl' :dataLists='listBangfuNeedImport'></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable2" border :data="listBangfuNeedImport"
					 tooltip-effect="dark" style="width: 100%" @selection-change="listBangfuSelectionChange">
						<el-table-column type="selection" width="55"> </el-table-column>
						<el-table-column prop="excelLine" label="行数"></el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="bangfuType" label="事件类别"></el-table-column>
						<el-table-column prop="bangfuRemark" label="问题状况"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,3)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="bangfuImportSizeChange" @current-change="bangfuImportCurrentChange"
						 layout="sizes,prev, pager, next" :total="bangfuImportTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="导入帮扶列表历史" name="3">
					<search @search="getlistBangfuImportHisPage"></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable3" border :data="listBangfuImportHisPage"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="bangfuType" label="事件类别"></el-table-column>
						<el-table-column prop="bangfuRemark" label="问题状况"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,3)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="bangfuSizeChange" @current-change="bangfuCurrentChange"
						 layout="sizes,prev, pager, next" :total="bangfuTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>

			<!-- 稳控 -->

			<el-tabs type="border-card" v-model="editableTabsValue" v-show="jueceClass=='稳控'">
				<el-tab-pane label="不可导入稳控列表" name="1">
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable1" border :data="faildata.wenkong"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column label="行数" prop="excelLine"> </el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="wenkongTime" label="稳控日"></el-table-column>
						<el-table-column prop="wenkongPerson" label="稳控责任人"></el-table-column>
						<el-table-column prop="wenkongRemark" label="稳控情况"></el-table-column>
						<el-table-column prop="importErrorMsg" label="错误提示"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="可导入稳控列表" name="2">
					<search @search="getlistWenkongNeedImport" :postUrl='wenkongPostUrl' :dataLists='listWenkongNeedImport'></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable2" border :data="listWenkongNeedImport"
					 tooltip-effect="dark" style="width: 100%" @selection-change="listWenkongSelectionChange">
						<el-table-column type="selection" width="55"> </el-table-column>
						<el-table-column label="行数" prop="excelLine"> </el-table-column>
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="wenkongTime" label="稳控日"></el-table-column>
						<el-table-column prop="wenkongPerson" label="稳控责任人"></el-table-column>
						<el-table-column prop="wenkongRemark" label="稳控情况"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,4)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="wenkongImportSizeChange" @current-change="wenkongImportCurrentChange"
						 layout="sizes,prev, pager, next" :total="wenkongImportTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="导入稳控列表历史" name="3">
					<search @search="getlistWenkongImportHisPage"></search>
					<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable3" border :data="listWenkongImportHisPage"
					 tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="personName" label="姓名"> </el-table-column>
						<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
						<el-table-column prop="wenkongTime" label="稳控日"></el-table-column>
						<el-table-column prop="wenkongPerson" label="稳控责任人"></el-table-column>
						<el-table-column prop="wenkongRemark" label="稳控情况"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row,4)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align:right;margin:20px 0;">
						<el-pagination background @size-change="wenkongSizeChange" @current-change="wenkongCurrentChange"
						 layout="sizes,prev, pager, next" :total="wenkongTotal">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog title="事件信息" :visible.sync="dialogVisible1" width="60%">
			<el-form :inline="true" :model="caseVal" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="caseVal.personName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="公民身份号码">
					<el-input v-model="caseVal.idCard" placeholder="公民身份号码"></el-input>
				</el-form-item>
				<el-form-item label="发生时间">
					<el-input v-model="caseVal.caseTime" placeholder="发生时间"></el-input>
				</el-form-item>
				<el-form-item label="发生地详址">
					<el-input v-model="caseVal.caseAddress" placeholder="发生地详址"></el-input>
				</el-form-item>
				<el-form-item label="事件类型">
					<el-input v-model="caseVal.caseType" placeholder="事件类型"></el-input>
				</el-form-item>
				<el-form-item label="案件情况">
					<el-input v-model="caseVal.caseRemark" placeholder="案件情况"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="confirmCase">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="家庭信息" :visible.sync="dialogVisible2" width="60%">
			<el-form :inline="true" :model="familyVal" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="familyVal.personName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="公民身份号码">
					<el-input v-model="familyVal.idCard" placeholder="公民身份号码"></el-input>
				</el-form-item>
				<el-form-item label="关系类型">
					<el-input v-model="familyVal.relationType" placeholder="关系类型"></el-input>
				</el-form-item>
				<el-form-item label="关系人名称">
					<el-input v-model="familyVal.relationPerson" placeholder="关系人名称"></el-input>
				</el-form-item>
				<el-form-item label="关系人身份证号">
					<el-input v-model="familyVal.relationIdCard" placeholder="关系人身份证号"></el-input>
				</el-form-item>
				<el-form-item label="收入状况">
					<el-input v-model="familyVal.incomeStatus" placeholder="收入状况"></el-input>
				</el-form-item>
				<el-form-item label="是否监护人">
					<el-input v-model="familyVal.isGuardian" placeholder="是否监护人"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="confirmFamily">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="帮扶信息" :visible.sync="dialogVisible3" width="60%">
			<el-form :inline="true" :model="bangfuVal" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="bangfuVal.personName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="公民身份号码">
					<el-input v-model="bangfuVal.idCard" placeholder="公民身份号码"></el-input>
				</el-form-item>
				<el-form-item label="帮扶发生时间">
					<el-input v-model="bangfuVal.bangfuTime" placeholder="帮扶发生时间"></el-input>
				</el-form-item>
				<el-form-item label="帮扶类型">
					<el-input v-model="bangfuVal.bangfuType" placeholder="帮扶类型"></el-input>
				</el-form-item>
				<el-form-item label="帮扶情况">
					<el-input v-model="bangfuVal.bangfuRemark" placeholder="帮扶情况"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="confirmBangfu">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="稳控信息" :visible.sync="dialogVisible4" width="60%">
			<el-form :inline="true" :model="wenkongVal" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="wenkongVal.personName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="公民身份号码">
					<el-input v-model="wenkongVal.idCard" placeholder="公民身份号码"></el-input>
				</el-form-item>
				<el-form-item label="稳控日">
					<el-input v-model="wenkongVal.wenkongTime" placeholder="稳控日"></el-input>
				</el-form-item>
				<el-form-item label="稳控责任人">
					<el-input v-model="wenkongVal.wenkongPerson" placeholder="稳控责任人"></el-input>
				</el-form-item>
				<el-form-item label="稳控情况">
					<el-input v-model="wenkongVal.wenkongRemark" placeholder="稳控情况"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="confirmWenkong">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import search from './search.vue'
	export default {
		data() {
			return {
				jueceClass: '事件',
				editableTabsValue: '1',
				// 事件
				listCaseNeedImport: [],
				listCaseImportHisPage: [],
				caseVal: {},
				dialogVisible1: false,
				CasePostUrl: 'decisions/dataImportCaseAll',
				caseImportCurrent: 1,
				caseImportSize: 10,
				caseImportTotal: 0,
				caseCurrent: 1,
				caseSize: 10,
				caseTotal: 0,
				// 家庭
				listFamilyRelationNeedImport: [],
				listFamilyRelationImportHisPage: [],
				familyVal: {},
				dialogVisible2: false,
				familyPostUrl: 'decisions/dataImportFamilyRelationAll',
				familyImportCurrent: 1,
				familyImportSize: 10,
				familyImportTotal: 0,
				familyCurrent: 1,
				familySize: 10,
				familyTotal: 0,
				// 帮扶
				listBangfuNeedImport: [],
				listBangfuImportHisPage: [],
				bangfuVal: {},
				dialogVisible4: false,
				bangfuPostUrl: 'decisions/dataImportBangfuAll',
				bangfuImportCurrent: 1,
				bangfuImportSize: 10,
				bangfuImportTotal: 0,
				bangfuCurrent: 1,
				bangfuSize: 10,
				bangfuTotal: 0,
				// 稳控
				listWenkongNeedImport: [],
				listWenkongImportHisPage: [],
				wenkongVal: {},
				dialogVisible3: false,
				wenkongPostUrl: 'decisions/dataImportWenkongAll',
				wenkongImportCurrent: 1,
				wenkongImportSize: 10,
				wenkongImportTotal: 0,
				wenkongCurrent: 1,
				wenkongSize: 10,
				wenkongTotal: 0,

				formInline: {},
				listCaseSelect: [],
				listFamilySelect: [],
				listWenkongSelect: [],
				listBangfuSelect: []
			}
		},
		props: {
			faildata: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		mounted() {
			this.getlistCaseNeedImport({}, this.caseImportCurrent, this.caseImportSize);
			this.getlistCaseImportHisPage({}, this.caseCurrent, this.caseSize);

			this.getlistFamilyRelationNeedImport({}, this.familyImportCurrent, this.familyImportSize);
			this.getlistFamilyRelationImportHisPage({}, this.familyCurrent, this.familySize);

			this.getlistBangfuNeedImport({}, this.bangfuImportCurrent, this.bangfuImportSize);
			this.getlistBangfuImportHisPage({}, this.bangfuCurrent, this.bangfuSize);

			this.getlistWenkongNeedImport();
			this.getlistWenkongImportHisPage();
		},
		components: {
			search
		},
		methods: {
			confirmCase() {
				var obj = this.formatObj(this.caseVal)
				this.$request.post('decisions/updateCase', { ...obj
				}, res => {
					this.dialogVisible1 = false;
					this.getlistCaseNeedImport();
				})
			},
			confirmFamily() {
				var obj = this.formatObj(this.familyVal)
				this.$request.post('decisions/updateFamilyRelation', { ...obj
				}, res => {
					this.dialogVisible2 = false;
					this.getlistFamilyRelationNeedImport();
				})
			},
			confirmBangfu() {
				var obj = this.formatObj(this.bangfuVal)
				this.$request.post('decisions/updateBangfu', { ...obj
				}, res => {
					this.dialogVisible3 = false;
					this.getlistBangfuNeedImport();
				})
			},
			confirmWenkong() {
				var obj = this.formatObj(this.wenkongVal)
				this.$request.post('decisions/updateWenkong', { ...obj
				}, res => {
					this.dialogVisible4 = false;
					this.getlistWenkongNeedImport();
				})
			},
			// 事件
			getlistCaseNeedImport(obj = {}, current = 1, size = 10) {
				var _this = this
				this.$request.get('/decisions/listCaseNeedImport', {
					current,
					size,
					...obj
				}, (res) => {
					console.log(res)
					this.listCaseNeedImport = res.data.records;
					this.caseImportTotal = res.data.total;
				})
			},
			getlistCaseImportHisPage(obj = {}, current = 1, size = 10) {
				this.$request.get('/decisions/listCaseImportHisPage', {
					current,
					size,
					...obj
				}, (res) => {
					this.listCaseImportHisPage = res.data.records;
					this.caseTotal = res.data.total;
				})
			},
			caseCurrentChange(val) {
				this.caseCurrent = val
				this.getlistCaseImportHisPage({}, this.caseCurrent, this.caseSize)
			},
			caseSizeChange(val) {
				this.caseSize = val
				this.getlistCaseImportHisPage({}, this.caseCurrent, this.caseSize)
			},
			caseImportSizeChange(val) {
				this.caseImportSize = val
				this.getlistCaseNeedImport({}, this.caseImportCurrent, this.caseImportSize);
			},
			caseImportCurrentChange(val) {
				this.caseImportCurrent = val
				this.getlistCaseNeedImport({}, this.caseImportCurrent, this.caseImportSize);
			},
			// 家庭
			getlistFamilyRelationNeedImport(obj = {}, current = 1, size = 10) {
				this.$request.get('/decisions/listFamilyRelationNeedImport', {
					current,
					size,
					...obj
				}, (res) => {
					this.listFamilyRelationNeedImport = res.data.records;
					this.familyImportTotal = res.data.total;
				})
			},
			getlistFamilyRelationImportHisPage(obj = {}, current = 1, size = 10) {
				this.$request.get('/decisions/listFamilyRelationImportHisPage', {
					current,
					size,
					...obj
				}, (res) => {
					this.listFamilyRelationImportHisPage = res.data.records;
					this.familyTotal = res.data.total;
				})
			},
			familyCurrentChange(val) {
				this.familyCurrent = val
				this.getlistFamilyRelationImportHisPage({}, this.familyCurrent, this.familySize)
			},
			familySizeChange(val) {
				this.familySize = val
				this.getlistFamilyRelationImportHisPage({}, this.familyCurrent, this.familySize)
			},
			familyImportSizeChange(val) {
				this.familyImportSize = val
				this.getlistFamilyRelationNeedImport({}, this.familyImportCurrent, this.familyImportSize);
			},
			familyImportCurrentChange(val) {
				this.familyImportCurrent = val
				this.getlistFamilyRelationNeedImport({}, this.familyImportCurrent, this.familyImportSize);
			},
			// 帮扶
			getlistBangfuNeedImport(obj = {},current = 1, size = 10) {
				this.$request.get('/decisions/listBangfuNeedImport', {
					current,
					size,
					...obj
				}, (res) => {
					this.listBangfuNeedImport = res.data.records;
					this.bangfuImportTotal = res.data.total;
				})
			},
			getlistBangfuImportHisPage(obj = {}, current = 1, size = 10) {
				this.$request.get('/decisions/listBangfuImportHisPage', {
					current,
					size,
					...obj
				}, (res) => {
					console.log(res)
					this.listBangfuImportHisPage = res.data.records;
					this.bangfuTotal = res.data.total;
				})
			},
			bangfuCurrentChange(val) {
				this.bangfuCurrent = val
				this.getlistBangfuImportHisPage({}, this.bangfuCurrent, this.bangfuSize)
			},
			bangfuSizeChange(val) {
				this.bangfuSize = val
				this.getlistBangfuImportHisPage({}, this.bangfuCurrent, this.bangfuSize)
			},
			bangfuImportSizeChange(val) {
				this.bangfuImportSize = val
				this.getlistBangfuNeedImport({}, this.bangfuImportCurrent, this.bangfuImportSize);
			},
			bangfuImportCurrentChange(val) {
				this.bangfuImportCurrent = val
				this.getlistBangfuNeedImport({}, this.bangfuImportCurrent, this.bangfuImportSize);
			},
			// 稳控
			getlistWenkongNeedImport(obj = {}, current = 1, size = 10) {
				this.$request.get('/decisions/listWenkongNeedImport', {
					current,
					size,
					...obj
				}, (res) => {
					
					this.listWenkongNeedImport = res.data.records;
					this.wenkongImportTotal = res.data.total;
				})
			},
			getlistWenkongImportHisPage(obj = {}, current = 1, size = 10) {
				this.$request.get('/decisions/listWenkongImportHisPage', {
					current,
					size,
					...obj
				}, (res) => {
					this.listWenkongImportHisPage = res.data.records;
					this.wenkongTotal = res.data.total;
				})
			},
			wenkongCurrentChange(val) {
				this.wenkongCurrent = val
				this.getlistWenkongImportHisPage({}, this.wenkongCurrent, this.wenkongSize)
			},
			wenkongSizeChange(val) {
				this.wenkongSize = val
				this.getlistWenkongImportHisPage({}, this.wenkongCurrent, this.wenkongSize)
			},
			wenkongImportSizeChange(val) {
				
				this.wenkongImportSize = val
				this.getlistWenkongNeedImport({}, this.wenkongImportCurrent, this.wenkongImportSize);
			},
			wenkongImportCurrentChange(val) {
				
				this.wenkongImportCurrent = val
				this.getlistWenkongNeedImport({}, this.wenkongImportCurrent, this.wenkongImportSize);
			},
			
			
			/* ---- */
			listCaseSelectionChange(val) {
				var ids = this.getId(val);
				this.listCaseSelect = ids;
			},
			listFamilySelectionChange(val) {
				var ids = this.getId(val);
				this.listFamilySelect = ids;
			},
			listBangfuSelectionChange(val) {
				var ids = this.getId(val);
				this.listBangfuSelect = ids;
			},
			listWenkongSelectionChange(val) {
				var ids = this.getId(val);
				this.listWenkongSelect = ids;
			},
			edit(row, index) {
				switch (index) {
					case 1:
						this.dialogVisible1 = true;
						this.caseVal = { ...row
						};
						break;
					case 2:
						this.dialogVisible2 = true;
						this.familyVal = { ...row
						};
						break;
					case 3:
						this.dialogVisible3 = true;
						this.bangfuVal = { ...row
						};
						break;
					case 4:
						this.dialogVisible4 = true;
						this.wenkongVal = { ...row
						};
						break;
					default:
						break;
				}
				// console.log(row);
			},
			casesearch() {},
			getId(array) {
				var ary = []
				for (let index = 0; index < array.length; index++) {
					if (array[index].id) {
						ary.push(array[index].id)
					}
				}
				return ary;
			},
			formatObj(val) {
				var obj = {};
				for (var key in val) {
					if (val[key]) {
						obj[key] = val[key]
					}
				}
				return obj;
			}
		}
	}
</script>
