//批量导入
<template>
	<div class="bg-b">
		<div class="ocontent import ">
			<p class="title clearfix bor-b">
				<span class="line"></span>
				<span>批量导入</span>
				<span class="fr">
				</span>
			</p>
			<div class="steps">
				<el-steps :active="step" align-center>
					<el-step title="上传文件"></el-step>
					<el-step title="执行导入"></el-step>
					<el-step title="导入完成"></el-step>
				</el-steps>
			</div>
			<div v-if="step==1">
				<div class="import-bolck">
					<div class="left bg-bl"><i class="icon-xiazai"></i></div>
					<div class="right ">
						<p class="right-title">填写导入人口的信息</p>
						<p class="right-secondtitle">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</p>
						<p class="c-blue"><a class="c-blue" download="模板.xlsx" :href="this.GLOBAL.loginUrl+'/static/excelTmp/社区人口数据录入表格样例.xlsx'">下载模板</a></p>
					</div>
				</div>
				<div class="import-bolck">
					<div class="left bg-g"><i class="icon-shangchuan"></i></div>
					<div class="right">
						<p class="right-title">上传填好的人口信息表 </p>
						<p class="right-secondtitle">文件后缀名必须为xls 或xlsx （即Excel格式），文件大小不得大于900M</p>

						<el-upload accept=".xls,.xlsx" ref="upload" class="upload-demo" :action="this.GLOBAL.domainUrl+'/filePopulation/upload'"
						 :headers="this.uploadHead" multiple :limit="1" :auto-upload="false" :on-success="handleSuccess" :on-change="fileChange"
						 :on-remove="fileRemove" :file-list="filelist">
							<p class="c-blue">点击上传</p>
						</el-upload>

					</div>
				</div>
			</div>
			<div v-else-if="step==2">
				<div class="import-bolck">
					<div class="left bg-bl"><i class="icon-xiazai"></i></div>
					<div class="right ">
						<p class="right-title">本次可导入户籍人口数量</p>
						<p class="c-blue">{{uploadRes.insertCount}}条</p>
					</div>
				</div>
				<div class="import-bolck">
					<div class="left bg-g"><i class="icon-shangchuan"></i></div>
					<div class="right">
						<p class="right-title">本次不可导入户籍人口数量 </p>
						<p class="c-blue">{{uploadRes.failCount}}条</p>
					</div>
				</div>


			</div>
			<div v-else class="importComplete">
				<p><i class="el-icon-success"></i></p>
				<h3>批量导入完成</h3>
				<p>成功导入人口数量:{{fileImportRes.insertCount}}条，没能成功导入{{fileImportRes.failCount}}条，更新数据{{fileImportRes.updateCount}}条</p>

			</div>
			<el-dialog title="" :visible.sync="dialogVisible" width="150" :close-on-click-modal='false' :before-close="handleClose">
				<el-progress :text-inside="true" :stroke-width="18" :percentage="progress"></el-progress>
				<p class="pad-t10">正在上传。。。</p>
			</el-dialog>

			<div class="import-next">
				<el-button v-show="step==1" type="primary" size="medium" @click="nextStep">下一步</el-button>
				<el-button v-show="step==2" type="primary" size="medium" @click="nextStep1">下一步</el-button>
				<el-button plain v-show="step==2" @click="backStep"> 返回重新上传</el-button>
				<el-button v-show="step==3" type="primary" size="medium" @click="complete">完成</el-button>
			</div>
			<!-- <div class="ocontent bor" v-show="step==1">
                <importForm @getCheck="getCheck" @changeImportList="changeImportList" @changeImportList1="changeImportList1" :needImportList="needImportList" :pagination='pagination'></importForm>
            </div> -->
			<div class="ocontent">
				<!-- v-show="step==2"-->
				<el-tabs type="border-card" v-model="editableTabsValue">
					<el-tab-pane label="不可导入人口列表" name="1">

						<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable" border :data="uploadRes.failList"
						 tooltip-effect="dark" style="width: 100%">
							<el-table-column label="行数" prop="excelLine">

							</el-table-column>
							<el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
							<el-table-column prop="householder" label="户主姓名"> </el-table-column>
							<el-table-column prop="contact" label="联系方式"> </el-table-column>
							<el-table-column prop="birth.year" label="出生日期">

							</el-table-column>
							<el-table-column prop="importErrorMsg" label="错误提示"></el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="可导入人口列表" name="2">
						<importForm @getCheck="getCheck" @changeImportList="changeImportList" :needImportList="needImportList"
						 @successImport='successImport' @changeImportList1="changeImportList1" :pagination='pagination'></importForm>
					</el-tab-pane>
					<el-tab-pane label="人口导入列表历史" name="3">
						<importHistoryForm></importHistoryForm>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

	</div>
</template>
<script>
	import importForm from '../../component/form/importForm.vue'
	import importHistoryForm from '../../component/form/importHistoryForm.vue'
	export default {
		data() {
			return {
				step: 1,
				filelist: [],
				tableData: [],
				uploadRes: {},
				progress: 30,
				progresstimer: '',
				dialogVisible: false,
				fileName: '',
				pagination: {
					total: 0,
					current: 1,
					size: 10
				},
				fileImportRes: {},
				failList: [],
				uploadHead: {
					"Authorization": "Bearer " + localStorage.getItem('token')
				},
				person: {

				},
				needImportList: [],
				ids: [],
				editableTabsValue: '2'
			}
		},
		components: {
			importForm,
			importHistoryForm
		},
		mounted: function() {
			this.getUploadList();
		},
		methods: {
			nextStep() {
				if (this.filelist.length > 0) {
					this.$refs.upload.submit();
					this.dialogVisible = true;
					this.progressstart();
				} else {
					this.$message.error('请选择上传文件');
				}
			},
			backStep() {
				this.step = 1;
				this.filelist = [];
			},
			handleClose() {
				this.dialogVisible = false;
				this.filelist = []
				this.$refs.upload.clearFiles()
			},
			fileChange(file, fileList) {
				this.filelist = fileList;
			},
			handleSuccess(response, file, fileList) {
				this.progress = 100;
				this.dialogVisible = false;
				this.step = 2;
				this.fileName = response.data.fileName;
				this.uploadRes = response.data;
				this.getUploadList();
				clearInterval(this.progresstimer);

			},
			fileRemove() {
				this.filelist = [];
			},
			progressstart() {
				var _this = this;
				var time = 30;
				this.progresstimer = setInterval(() => {
					time += 2;
					_this.progress = time;
					if (time > 95) {
						clearInterval(this.progresstimer)
					}
				}, 100)
			},
			nextStep1() {
				var _this = this;
				if (this.ids.length == 0) {
					this.$message.error('请选择导入数据');
					return;
				}
				this.$request.post('/filePopulation/dataImport', {
					ids: this.ids.toString()
				}, function(res) {
					if (res.result == 1) {
						_this.fileImportRes = res.data;
						_this.step = 3;
					} else {
						_this.$message.error('导入失败，请稍后重试')
					}

				})
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
			getCheck(val) {
				this.ids = val;
			},
			getUploadList() {
				var _this = this;
				this.$request.get('/filePopulation/listNeedImport', {
					personName: this.person.personName,
					idCard: this.person.idCard,
					contact: this.person.contact,
					community: this.person.community,
					grid: this.person.grid,
					current: this.pagination.current,
					size: this.pagination.size
				}, function(res) {
					_this.needImportList = res.data.records;
					_this.pagination.total = res.data.total
				})
			},
			changeImportList(val) {
				this.person = val;
				this.getUploadList();
			},
			changeImportList1(val) {
				this.pagination = val;
				this.getUploadList();
			},
			successImport(val, val1) {
				this.fileImportRes = val
				this.step = val1
			},
			complete() {
				this.filelist = [];
				this.ids = [];
				this.step = 1;
			}
		}
	}
</script>

<style>
	.bor {
		border: 1px solid #f2f2f2;
	}

	.import {
		margin-left: 20px;
		width: 80%;
		padding-bottom: 20px;
		box-shadow: 0px 0px 8px #888888;
	}

	.steps {
		width: 100%;
		margin: 30px auto;
	}

	.import-bolck {
		width: 75%;
		box-shadow: 0 0 3px #888888;
		margin: 0 auto 20px auto;
		position: relative;
		display: flex;
	}

	.import-bolck .left {
		width: 12%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		color: #cccccc;
	}

	.import-bolck .right {
		width: 88%;
		padding: 15px 10px 15px 20px;
		display: inline-block;
	}

	.import-bolck .right p {
		font-size: 16px;
		line-height: 30px;
	}

	.import-bolck .right .right-title {
		color: #666666;
		font-weight: bold;
	}

	.import-bolck .right-secondtitle {
		font-size: 14px !important;
		color: #999;
	}

	.c-blue {
		cursor: pointer;
		color: #0079FE;
	}

	.import-bolck .bg-bl {
		background: rgba(51, 153, 255, 1);
	}

	.import-bolck .bg-g {
		background: rgba(170, 235, 82, 1);
	}

	.import-next {
		margin: 50px auto;
		text-align: center;
	}

	.importComplete {
		text-align: center;
	}

	.importComplete i {
		font-size: 60px;
		color: #4BD863;
	}

	.importComplete h3 {
		color: #666666;
		line-height: 24px;
		margin-top: 15px;
	}

	.importComplete p:nth-of-type(2) {
		font-size: 14px;
		color: #999999;
		margin-top: 5px;
	}
</style>
