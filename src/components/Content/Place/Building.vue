<!-- 点击查看数据弹框-->
<template>
	<div>
	<el-dialog customClass="customH" :visible.sync="diaVisible" @close="close" width="80%">
		<p class="dialogTitle"><i class="el-icon-star-on"></i>楼宇信息添加</p>
		<div class="dialogList clearfix">
		<el-table :header-cell-style="getRowClass" :data="setdata" height="106" border style="width: 100%">
			<el-table-column :show-overflow-tooltip="true" prop="villageName" label="小区名称">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="buildingName" label="建筑物名称">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="placeAddress" label="地址">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="buildingArea" label="建筑面积">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="buildingFloor" label="楼层数">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="groundFloor" label="地上层数">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="undergroundFloor" label="地下层数">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="unitNum" label="单元数">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="families" label="户数">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="manager" label="楼栋长姓名">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="idCard" label="楼栋长身份号码">
			</el-table-column>
			<el-table-column prop="" label="操作">
				<template slot-scope="scope">
					<el-button @click="BuildingEditor(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click='addUnitBtn(scope.row)' type="text" size="small">添加单元</el-button>
				</template>
			</el-table-column>
		</el-table>
		</div>
		<div class="wrap1">
			<div class="unit">
				<p class="title">单元信息</p>
				<el-table :header-cell-style="getRowClass" @row-click="displayFloor" :data="UnitData" height="410" border style="width: 100%">
					<el-table-column width="100" :show-overflow-tooltip="true" prop="unitNum" label="单元号">
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="unitManager" label="单元长">
					</el-table-column>
					<el-table-column width="120" prop="" label="操作">
						<template slot-scope="scope">
							<el-button @click="modifyUnit(scope.row)" type="text" size="small">编辑</el-button>
							<el-button @click='addFloorBtn(scope.row)' type="text" size="small">添加楼层</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="floor">
				<p class="title">单元楼层信息</p>
				<el-table :header-cell-style="getRowClass" @row-click="displayHousehold" :data="floordata" height="410" border style="width: 100%">
					<el-table-column width="100" :show-overflow-tooltip="true" prop="floorNum" label="楼层数">
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="floorManager" label="楼层长">
					</el-table-column>
					<el-table-column width="120" prop="" label="操作">
						<template slot-scope="scope">
							<el-button @click="modifyFloor(scope.row)" type="text" size="small">编辑</el-button>
							<el-button @click='addHouseholdBtn(scope.row)' type="text" size="small">添加住户</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="household">
				<p class="title">单元楼层住户信息</p>
				<el-table :header-cell-style="getRowClass"  :data="Household" height="410" border style="width: 100%">
					<el-table-column width="100" :show-overflow-tooltip="true" prop="householdNum" label="户号">
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="householdAddress" label="户号详细地址">
					</el-table-column>
					<el-table-column width="50" prop="" label="操作">
						<template slot-scope="scope">
							<el-button @click="modifyHousehold(scope.row)" type="text" size="small">编辑</el-button>
							<!-- <el-button type="text" size="small">添加人员</el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</el-dialog>
	
	<el-dialog customClass="customH1" :visible.sync="diaVisible1"  width="70%" :before-close="handleDialogClose">
		<AddPlace :isUpdate="'1'"></AddPlace>
	</el-dialog>	
 	<!-- 添加修改单元 -->
	<el-dialog :visible.sync="diaVisible2" width="50%">
			<p class="dialogTitle"><i class="el-icon-star-on"></i>单元添加</p>
			<el-form :inline="true" label-position="top" label-width="80px" ref="addUnit"  :model="addUnit">
				<el-form-item label="单元数：">
				    <el-input class="oinput" v-model="addUnit.unitNum" placeholder="请输入单元数"></el-input>
				</el-form-item>
					<el-form-item label="单元长：">
				    <el-input class="oinput" v-model="addUnit.unitManager" placeholder="请输入单元长"></el-input>
				</el-form-item>
					<el-form-item label="身份证号：">
				    <el-input class="oinput" v-model="addUnit.idCard" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				 <div style="margin:20px auto;text-align:center;">
				    <el-form-item size="large" >
				        <el-button type="primary" @click="submitUnit()">提交</el-button>
						<el-button type="danger" @click="deleteUnit(addUnit)">删除该单元</el-button>
				    </el-form-item>
				</div>
			</el-form>	
	</el-dialog>
	<!-- 添加修改楼层 -->
		<el-dialog :visible.sync="diaVisible3" width="50%">
			<p class="dialogTitle"><i class="el-icon-star-on"></i>楼层添加</p>
			<el-form :inline="true" label-position="top" label-width="80px" ref="addFloor"  :model="addFloor">
				<el-form-item label="楼层数：">
				    <el-input class="oinput" v-model="addFloor.floorNum" placeholder="请输入楼层数"></el-input>
				</el-form-item>
					<el-form-item label="楼层长：">
				    <el-input class="oinput" v-model="addFloor.floorManager" placeholder="请输入楼层长"></el-input>
				</el-form-item>
					<el-form-item label="身份证号：">
				    <el-input class="oinput" v-model="addFloor.idCard" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				 <div style="margin:20px auto;text-align:center;">
				    <el-form-item size="large" >
				        <el-button type="primary" @click="submitFloor()">提交</el-button>
						<el-button type="danger" @click="deleteFloor(addFloor)">删除该层</el-button>
				    </el-form-item>
				</div>
			</el-form>	
	</el-dialog>
	<!-- 添加修改户 -->
		<el-dialog :visible.sync="diaVisible4" width="50%">
			<p class="dialogTitle"><i class="el-icon-star-on"></i>楼层户添加</p>
			<el-form :inline="true" label-position="top" label-width="80px" ref="addHousehold"  :model="addHousehold">
				<el-form-item label="楼层户号：">
				    <el-input class="oinput" v-model="addHousehold.householdNum" placeholder="请输入楼层户号"></el-input>
				</el-form-item>
					<el-form-item label="该户详细地址：">
				    <el-input class="oinput" v-model="addHousehold.householdAddress" placeholder="请输入该户详细地址"></el-input>
				</el-form-item>
				 <div style="margin:20px auto;text-align:center;">
				    <el-form-item size="large" >
				        <el-button type="primary" @click="submitHousehold()">提交</el-button>
						<el-button type="danger" @click="deleteHousehold(addHousehold)">删除该户</el-button>
				    </el-form-item>
				</div>
			</el-form>	
	</el-dialog>
	</div>
</template>
<script>
	import AddPlace from './AddPlace.vue'
	import { mapMutations } from 'vuex'
	export default {
		props: ['tableData','Visible', 'title', 'seeDataVal','UnitData'],
		watch: {
			Visible() {
				this.diaVisible = this.Visible
			},
			seeDataVal(val) {
				this.setdata=[]
				this.setdata.push(val) 
			},
			tableData(){
				for(let i=0;i<this.tableData.length;i++){
					if(this.tableData[i].id==this.seeDataVal.id){
						this.setdata=[]
						this.setdata.push(this.tableData[i]) 
					}
				}
			}
		},
		data() {
			return {
				diaVisible: false,
				diaVisible1:false,
				diaVisible2:false,
				diaVisible3:false,
				diaVisible4:false,
				addUnit:{//单元
					'unitNum':'',
					'unitManager':'',
					'idCard':'',
					'idBuilding':'',
					'id':''
				},
				addFloor:{ //楼层
					'idBuildingUnit':'',
					'floorNum':'',
					'floorManager':'',
					'idCard':'',
					'id':''
				},
				addHousehold:{
					'householdNum':'',
					'householdAddress':''
				},
				floordata:[],//楼层数据
				Household:[],//户数据
				setdata: [],
			}
		},
		components:{
			AddPlace
		},
		methods: {
			 ...mapMutations([
			  'AddAddressFormData',
			  'AddshowAddressForm'
			]),
			close: function() {
				this.$emit('close')
			},
			displayFloor:function(row, column){	//点击单元显示楼层	
			//console.log(rowIndex)
				//if(column.label!='操作'){
					this.addUnit.id = row.id
					//console.log(this.addUnit.id)
					//获取楼层列表
					this.getFloor(row);
				//}
			},
			getFloor:function(row){
				this.$request.get('/zzPlace/listUnitFloors',{
					buildingUnitId:row.id,
				},(res)=>{
				    if(res.result == 1){
				        this.floordata=res.data
				    }else{
				        _this.$message.error(res.msg);
				    } 
				})
			},
			displayHousehold:function(row, column){	//点击单元显示户	
				//if(column.label!='操作'){
					this.addFloor.id = row.id
					//获取楼层列表
					this.getHousehold(row)
				//}
			},
			getHousehold:function(row){
				this.$request.get('/zzPlace/listUnitFloorHouseholds',{
						buildingUnitFloorId:row.id,
					},(res)=>{
					    if(res.result == 1){
					        this.Household=res.data
					    }else{
					        _this.$message.error(res.msg);
					    } 
					})
			},
			getRowClass:function ({ row, column, rowIndex, columnIndex }) { //设置表头颜色
				if (rowIndex == 0) {
						return 'background:#f5f5f5'
				} else {
						return ''
				}
			},
			BuildingEditor:function(row){ //楼宇编辑信息更新
				var rows = {...row};
				this.AddAddressFormData(rows);
				this.diaVisible1=true
			},
			handleDialogClose:function(){ // 关闭更新数据
				this.diaVisible1=false
				this.$emit('updata')
			},
			addUnitBtn:function(row){ //添加单元
				//this.addUnit.id=row.id
				this.diaVisible2=true
				//console.log('添加单元')
			},
			addFloorBtn:function(row){ // 添加层
				this.addUnit.id=row.id
				//console.log(row.id)
				this.diaVisible3=true
				//console.log('添加层')
			},
			addHouseholdBtn:function(row){ // 添加户
				this.addFloor.id=row.id
				this.diaVisible4=true
			},
			submitUnit:function(){ //提交单元
			
				this.$request.post('/zzPlace/insertOrUpdateUnit',{
					idBuilding:this.setdata[0].id,
					unitNum:this.addUnit.unitNum,
					unitManager:this.addUnit.unitManager,
					idCard:this.addUnit.idCard
				},(res)=>{
				    if(res.result == 1){
				        this.$message({
				        	type: 'success',
				        	message: '添加成功!'
				        });	
						this.$emit('getUnit',this.setdata[0])
				    }else{
				         this.$message({
				        	type: 'info',
				        	message: '添加失败!'
				        });
				    } 
				})
			},
			submitFloor:function(){ //提交楼层
				//console.log(this.addUnit.id)
				this.$request.post('/zzPlace/insertOrUpdateUnitFloor',{
					idBuildingUnit:this.addUnit.id,
					floorNum:this.addFloor.floorNum,
					floorManager:this.addFloor.floorManager,
					idCard:this.addFloor.idCard
				},(res)=>{
				    if(res.result == 1){
				        this.$message({
				        	type: 'success',
				        	message: '添加成功!'
				        });		
						this.getFloor(this.addUnit)
				    }else{
				         this.$message({
				        	type: 'info',
				        	message: '添加失败!'
				        });
				    } 
				})
			},
			submitHousehold:function(){ //提交楼层户
				this.$request.post('/zzPlace/insertOrUpdateUnitFloorHousehold',{
					idBuildingUnitFloor:this.addFloor.id,
					householdNum:this.addHousehold.householdNum,
					householdAddress:this.addHousehold.householdAddress,
				},(res)=>{
				    if(res.result == 1){
				        this.$message({
				        	type: 'success',
				        	message: '添加成功!'
				        });		
						this.getHousehold(this.addFloor)
				    }else{
				         this.$message({
				        	type: 'info',
				        	message: '添加失败!'
				        });
				    } 
				})
			},
			modifyUnit:function(row){
				this.diaVisible2=true
				this.addUnit=row
			},
			modifyFloor:function(row){
				this.diaVisible3=true
				this.addFloor=row
			},
				modifyHousehold:function(row){
				this.diaVisible4=true
				this.addHousehold=row
			},
			deleteHousehold:function(res){ // 删除户
				this.$confirm('此操作将删除该户, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$request.post('/zzPlace/deleteUnitFloorHousehold',{
						unitFloorHouseholdId:res.id
					},(res)=>{
					    if(res.result == 1){
							this.diaVisible4=false;
					        this.$message({
					        	type: 'success',
					        	message: '删除成功!'
					        });		
							this.getHousehold(this.addFloor)
					    }else{
					         this.$message({
					        	type: 'info',
					        	message: '删除失败!'
					        });
					    } 
					})
				
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			deleteFloor:function(res){ // 删除层
				console.log(res.id)
				this.$confirm('此操作将删除该层, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$request.post('/zzPlace/deleteUnitFloor',{
						unitFloorId:res.id
					},(res)=>{
					    if(res.result == 1){
							this.diaVisible3=false;
					        this.$message({
					        	type: 'success',
					        	message: '删除成功!'
					        });		
							this.getFloor(this.addUnit)
							this.Household=[]
					    }else{
					         this.$message({
					        	type: 'info',
					        	message: '删除失败!'
					        });
					    } 
					})
				
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			deleteUnit:function(res){ // 删除单元
				this.$confirm('此操作将删除该单元, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$request.post('/zzPlace/deleteUnit',{
						unitId:res.id
					},(res)=>{
					    if(res.result == 1){
							this.diaVisible2=false;
					        this.$message({
					        	type: 'success',
					        	message: '删除成功!'
					        });		
							this.$emit('getUnit',this.setdata[0])
							this.Household=[]
							this.floordata=[]
					    }else{
					         this.$message({
					        	type: 'info',
					        	message: '删除失败!'
					        });
					    } 
					})
				
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			}
		}
	}
</script>
<style>
	.wrap1 {
		display: flex;
		justify-content: space-between;
	}

	.wrap1 .content {
		overflow: auto;
		height: 420px;
	}

	.wrap1>div {
		width: 31%;
		height: 450px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px;
	}

	.customH {
		max-height: 800px;
		border-radius: 10px;
	}

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

	.dialogList {
		display: flex;
		border: 1px solid #ccc;
			border-radius: 10px;
		overflow: hidden;
		margin-bottom: 10px;
	}

	.dialogList li P {
		min-width: 100px;
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
