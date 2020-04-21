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
						<p class="right-title">填写导入楼栋的信息</p>
						<p class="right-secondtitle">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</p>
						<p class="c-blue"><a class="c-blue" download="模板.xlsx"  :href="this.GLOBAL.loginUrl+'/static/excelTmp/楼栋信息录入表格样例.xlsx'" >下载模板</a></p>
					</div>
				</div>
				<div class="import-bolck">
					<div class="left bg-g"><i class="icon-shangchuan"></i></div>
					<div class="right">
						<p class="right-title">上传填好的楼栋信息表 </p>
						<p class="right-secondtitle">文件后缀名必须为xls 或xlsx （即Excel格式），文件大小不得大于900M</p>

						<el-upload accept=".xls,.xlsx" ref="upload" class="upload-demo" :action="this.GLOBAL.domainUrl+'/fileBuilding/upload'"
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
						<p class="right-title">本次可导入楼栋数量</p>
						<p class="c-blue">{{uploadRes.allCount}}条</p>
					</div>
				</div>
				<div class="import-bolck">
					<div class="left bg-g"><i class="icon-shangchuan"></i></div>
					<div class="right">
						<p class="right-title">本次不可导入楼栋数量 </p>
						<p class="c-blue">{{uploadRes.failCount}}条</p>
					</div>
				</div>


			</div>
			<div v-else class="importComplete">
				<p><i class="el-icon-success"></i></p>
				<h3>批量导入完成</h3>
				<p>成功导入楼栋数量:{{fileImportRes.insertCount}}条，没能成功导入{{fileImportRes.failCount}}条，更新数据{{fileImportRes.updateCount}}条</p>

			</div>
			<el-dialog title="" :visible.sync="dialogVisible" width="150" :before-close="handleClose" :close-on-click-modal='false'>
				<el-progress :text-inside="true" :stroke-width="18" :percentage="progress"></el-progress>
				<p class="pad-t10">正在上传。。。</p>
			</el-dialog>

			<div class="import-next">
				<el-button v-show="step==1" type="primary" size="medium" @click="nextStep">下一步</el-button>
				<el-button v-show="step==2" type="primary" size="medium" @click="nextStep1">下一步</el-button>
				<el-button plain v-show="step==2" @click="backStep"> 返回重新上传</el-button>
				<el-button v-show="step==3" type="primary" size="medium" @click="complete">完成</el-button>
			</div>
			<!--  <div class="ocontent bor" v-show="step==1">
                <importForm @getCheck="getCheck" @changeImportList="changeImportList" :needImportList="needImportList" ></importForm>
            </div> -->
			<div class="ocontent">
				<el-tabs type="border-card" v-model="editableTabsValue">
					<el-tab-pane label="不可导入楼栋列表" name="1">

						<el-table :header-cell-style="{background:'#f5f5f5',color:'#333'}" ref="multipleTable" border :data="uploadRes.failList"
						 tooltip-effect="dark" style="width: 100%">
							<el-table-column label="行数" prop="excelLine"></el-table-column>
							<el-table-column prop="villageName" label="小区名称"> </el-table-column>
							<el-table-column prop="building" label="楼栋名称"> </el-table-column>
							<el-table-column prop="buildingAddress" label="楼栋地址"> </el-table-column>
							<el-table-column prop="buildingArea" label="建筑面积"></el-table-column>
							<el-table-column prop="groundFloor" label="地上楼层"></el-table-column>
							<el-table-column prop="undergroundFloor" label="地下楼层"></el-table-column>
							<el-table-column prop="buildingManager" label="楼栋长"></el-table-column>
							<el-table-column prop="buildingManagerIdCard" label="楼栋长身份证号"></el-table-column>
							<el-table-column prop="unitManager" label="单元"></el-table-column>
							<el-table-column prop="unitManagerIdCard" label="单元长身份证号"></el-table-column>
							<el-table-column prop="floorNum" label="楼层"></el-table-column>
							<el-table-column prop="floorManager" label="层长"></el-table-column>
							<el-table-column prop="floorManagerIdCard" label="层长身份证号"></el-table-column>
							<el-table-column prop="householdNum" label="户号"></el-table-column>
							<el-table-column prop="householdAddress" label="该户详址"></el-table-column>
							<el-table-column prop="importErrorMsg" label="错误提示"></el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="可导入楼栋列表" name="2">
						<!-- <importForm @getCheck="getCheck" @changeImportList="changeImportList" :needImportList="needImportList" ></importForm> -->
						<div class="search">
							<p>
								<span>小区名称：</span>
								<el-input class="oinput" v-model="person1.villageName" placeholder="请输入小区名称"></el-input>
							</p>
							<p>
								<span>楼栋名称：</span>
								<el-input class="oinput" v-model="person1.building" placeholder="请输入楼栋名称"></el-input>
							</p>
							<p>
								<el-button slot="reference" type="primary" @click="getUploadList" icon="el-icon-search">查询</el-button>
								<el-button type="primary" @click="schnellImport">一键导入</el-button>
								<el-button type="" @click="reset">重置</el-button>
							</p>
						</div>
						<el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable1" border :row-class-name="tableRowClassName"
						 :data="needImportList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column fixed="left" type="selection" label="是否导入"></el-table-column>
							<el-table-column fixed="left" label="行号" type="index" width="50"></el-table-column>
							<el-table-column fixed="left" prop="villageName" label="小区名称"> </el-table-column>
							<el-table-column prop="building" label="楼栋名称"> </el-table-column>
							<el-table-column prop="buildingAddress" label="楼栋地址"> </el-table-column>
							<el-table-column prop="area" label="建筑面积"></el-table-column>
							<el-table-column prop="groundFloor" label="地上楼层"></el-table-column>
							<el-table-column prop="undergroundFloor" label="地下楼层"></el-table-column>
							<el-table-column prop="buildingManager" label="楼栋长"></el-table-column>
							<el-table-column prop="buildingManagerIdCard" label="楼栋长身份证号"></el-table-column>
							<el-table-column prop="unitManager" label="单元"></el-table-column>
							<el-table-column prop="unitManagerIdCard" label="单元长身份证号"></el-table-column>
							<el-table-column prop="floorNum" label="楼层"></el-table-column>
							<el-table-column prop="floorManager" label="层长"></el-table-column>
							<el-table-column prop="floorManagerIdCard" label="层长身份证号"></el-table-column>
							<el-table-column prop="householdNum" label="户号"></el-table-column>
							<el-table-column prop="householdAddress" label="该户详址"></el-table-column>
							<el-table-column fixed="right" label="操作" width="130">
								<template slot-scope="scope">
									<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
									<el-button style='color: red;' @click="deleteBuilding(scope.row)" type="text" size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div style="text-align:right;margin:20px 0;">
							<el-pagination background @size-change="PlaceImportSizeChange" @current-change="PlaceImportCurrentChange" layout="sizes,prev, pager, next"
							 :total="total">
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="楼栋导入列表历史" name="3">
						<importHistoryForm></importHistoryForm>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<el-dialog :visible.sync="diaVisible" width="80%">
			<p class="dialogTitle"><i class="el-icon-star-on"></i>编辑楼栋</p>
			<el-form :inline="true" label-position="top" label-width="80px" ref="editBuilding" :model="editBuilding">
				<el-form-item label="小区名称：">
					<el-input class="oinput" v-model="editBuilding.villageName" placeholder="请输入小区名称"></el-input>
				</el-form-item>
				<el-form-item label="楼栋名称：">
					<el-input class="oinput" v-model="editBuilding.building" placeholder="请输入楼栋名称"></el-input>
				</el-form-item>
				<el-form-item label="楼栋地址：">
					<el-input class="oinput" v-model="editBuilding.buildingAddress" placeholder="请输入楼栋地址"></el-input>
				</el-form-item>
				<el-form-item label="建筑面积：">
					<el-input class="oinput" v-model="editBuilding.area" placeholder="请输入建筑面积"></el-input>
				</el-form-item>
				<el-form-item label="地上楼层：">
					<el-input class="oinput" v-model="editBuilding.groundFloor" placeholder="请输入地上楼层"></el-input>
				</el-form-item>
				<el-form-item label="地下楼层：">
					<el-input class="oinput" v-model="editBuilding.undergroundFloor" placeholder="请输入地下楼层"></el-input>
				</el-form-item>
				<el-form-item label="楼栋长：">
					<el-input class="oinput" v-model="editBuilding.buildingManager" placeholder="请输入楼栋长"></el-input>
				</el-form-item>
				<el-form-item label="楼栋长身份证号码：">
					<el-input class="oinput" v-model="editBuilding.buildingManagerIdCard" placeholder="请输入楼栋长身份证号码"></el-input>
				</el-form-item>
				<el-form-item label="楼层：">
					<el-input class="oinput" v-model="editBuilding.floorNum" placeholder="请输入楼层"></el-input>
				</el-form-item>
				<el-form-item label="层长：">
					<el-input class="oinput" v-model="editBuilding.floorManager" placeholder="请输入层长"></el-input>
				</el-form-item>
				<el-form-item label="层长身份证号：">
					<el-input class="oinput" v-model="editBuilding.floorManagerIdCard" placeholder="请输入层长身份证号"></el-input>
				</el-form-item>
				<el-form-item label="户号：">
					<el-input class="oinput" v-model="editBuilding.householdNum" placeholder="请输入户号"></el-input>
				</el-form-item>
				<el-form-item label="该户详址：">
					<el-input class="oinput" v-model="editBuilding.householdAddress" placeholder="请输入该户详址"></el-input>
				</el-form-item>
				<div style="margin:20px auto;text-align:center;">
					<el-form-item size="large">
						<el-button type="primary" @click="submitBuilding()">提交</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import importForm from '../../component/form/importForm.vue'
	import importHistoryForm from './importHistoryForm.vue'
	export default {
		data() {
			return {
				diaVisible: false,
				editBuilding: {},
				step: 1,
				filelist: [],
				tableData: [],
				uploadRes: {},
				select: [],
				progress: 30,
				progresstimer: '',
				dialogVisible: false,
				fileName: '',
				fileImportRes: {},
				failList: [],
				uploadHead: {
					"Authorization": "Bearer " + localStorage.getItem('token')
				},
				person1: {
					
				},
				current: 1,
				size: 10,
				total:0,
				person: {
					current: 1,
					size: 10
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
			schnellImport(){ //一键导入
				var _this =this
				if(_this.needImportList.length<1){
					_this.$message.error('没有可导入数据');
					return
				}
				var loading = _this.$loading({
				  lock: true,
				  text: '正在导入，请耐心等待...',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.7)'
				});
				_this.$request.post('fileBuilding/dataImportAll',{
					..._this.person1
				},res=>{
				   if(res.result=='1'){
						loading.close();
						_this.step=3;
						_this.fileImportRes=res.data
						_this.getUploadList()
				   }
				})
			},
			PlaceImportSizeChange(val){
				this.size=val
				this.getUploadList();
			},
			PlaceImportCurrentChange(val){
				this.current=val
				this.getUploadList();
			},
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
				this.filelist=[]
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
				//console.log(this.ids.toString())
				this.$request.post('/fileBuilding/dataImport ', {
					ids: this.ids.toString()
				}, function(res) {
					//console.log(res)
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
				this.$request.get('/fileBuilding/listNeedImport', {
					villageName: this.person1.villageName,
					building: this.person1.building,
					current:this.current,
					size:this.size
				}, function(res) {
					
					_this.needImportList = res.data.records;
					_this.total = res.data.total
				})
			},
			changeImportList(val) {
				this.person = val;
				this.getUploadList();
			},
			complete() {
				this.filelist = [];
				this.ids = [];
				this.step = 1;
			},
			handleSelectionChange(val) {
				this.select = [];
				for (let index = 0; index < val.length; index++) {
					this.select.push(val[index].id)
				}
				this.getCheck(this.select)
			},
			reset() {
				this.person1 = {}
				this.getUploadList();
			},
			edit(rowData) { //编辑当前楼宇
				this.editBuilding = rowData
				this.diaVisible = true
			},
			deleteBuilding(rowData) { // 删除可导入数据
				var _this = this
				this.$request.post('/fileBuilding/delete', {
					id: rowData.id
				}, function(res) {
					_this.getUploadList();
				})
			},
			submitBuilding() { // 提交编辑楼宇
				var _this = this
				this.$request.post('/fileBuilding/update ', {
					id: _this.editBuilding.id,
					createTime: _this.editBuilding.createTime+' 00:00:00',
					createUser: _this.editBuilding.createUser,
					modifyTime: _this.editBuilding.modifyTime+' 00:00:00',
					modityUser: _this.editBuilding.modityUser,
					villageName: _this.editBuilding.villageName,
					building: _this.editBuilding.building,
					buildingAddress: _this.editBuilding.buildingAddress,
					area: _this.editBuilding.area,
					groundFloor: _this.editBuilding.groundFloor,
					undergroundFloor: _this.editBuilding.undergroundFloor,
					buildingManager: _this.editBuilding.buildingManager,
					buildingManagerIdCard: _this.editBuilding.buildingManagerIdCard,
					unitNum: _this.editBuilding.unitNum,
					unitManager: _this.editBuilding.unitManager,
					unitManagerIdCard: _this.editBuilding.unitManagerIdCard,
					floorNum: _this.editBuilding.floorNum,
					floorManager: _this.editBuilding.floorManager,
					floorManagerIdCard: _this.editBuilding.floorManagerIdCard,
					householdNum: _this.editBuilding.householdNum,
					householdAddress: _this.editBuilding.householdAddress,
					importFlag: _this.editBuilding.importFlag,
					dataRoleId: _this.editBuilding.dataRoleId,
					excelLine: _this.editBuilding.excelLine,
					delFlag: _this.editBuilding.delFlag
				}, function(res) {
					
					 if(res.result == 1){
					    _this.$message({
					    	type: 'success',
					    	message: '提交成功!'
					    });		
						_this.diaVisible=false
						_this.getUploadList()
					}else{
					     _this.$message({
					    	type: 'info',
					    	message: '提交失败失败!'
					    });
					} 
				})
			}

		}
	}
</script>

<style>
	.dialogTitle {
		padding: 10px;
		border: 1px dashed #f1f1f1;
		color: #000;
		font-weight: bold;
		margin-bottom: 0px;
	}

	.dialogTitle i {
		margin-right: 5px;
	}

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
