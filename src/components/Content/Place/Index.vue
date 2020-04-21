// 组织模块
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        <p>
          <span>场所名称：</span>
          <el-input class="oinput" v-model="place.placeName" placeholder="请输入场所名称"></el-input>
        </p>
        
        <p>
          <span>所属网格：</span>
          <el-select v-model="place.gridName" placeholder="请选择">
            <el-option
              v-for="item in this.GLOBAL.select.grid"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      
        <p>
          <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
          <el-button type="" @click="reset">重置</el-button>
        </p>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'场地数据列表'">
				  <span class="fr">
						<el-button type="primary" @click="biaodian">标点</el-button>
				    <el-button type="primary" @click="add">添加</el-button>
				    <el-button type="primary" @click="imports">导入</el-button>
					</span>
      </titles>
      <div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
          :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">  </el-table-column>
          <el-table-column v-if="showTabel.indexOf('buildingName')>=0" prop="buildingName" label="建筑物名称" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('placeAddress')>=0" prop="placeAddress" label="场所地址" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('villageName')>=0" prop="villageName" label="小区名称" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('buildingArea')>=0" prop="buildingArea" label="建筑面积" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('buildingFloor')>=0" prop="buildingFloor" label="楼层数" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('placeArea')>=0" prop="placeArea" label="场所占地面积" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('unitNum')>=0" prop="unitNum" label="单元数" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('families')>=0" prop="families" label="楼栋户数" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('manager')>=0" prop="manager" label="楼栋长姓名" show-overflow-tooltip> </el-table-column>
					<el-table-column v-if="showTabel.indexOf('idCard')>=0" prop="idCard" label="楼栋长身份号码" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('placeTelephone')>=0" prop="placeTelephone" label="办公电话" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('teacherNum')>=0" prop="teacherNum" label="教师人数" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('studentNum')>=0" prop="studentNum" label="学生人数" show-overflow-tooltip>  </el-table-column>
          <el-table-column v-if="showTabel.indexOf('boyNum')>=0" prop="boyNum" label="男生数量" show-overflow-tooltip>  </el-table-column>
          <el-table-column v-if="showTabel.indexOf('grileNum')>=0" prop="grileNum" label="女生数量" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('classroomArea')>=0" prop="classroomArea" label="教室面积" show-overflow-tooltip>  </el-table-column>
          <el-table-column v-if="showTabel.indexOf('bedroomArea')>=0" prop="bedroomArea" label="寝室面积" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('isBasement')>=0" prop="isBasement" :formatter="GLOBAL.check.formatIsNo" label="是否存在地下场所" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('undergroundArea')>=0" prop="undergroundArea" label="地下面积" show-overflow-tooltip>  </el-table-column>
          <el-table-column v-if="showTabel.indexOf('undergroundFloor')>=0" prop="undergroundFloor" label="地下层数" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('groundFloor')>=0" prop="groundFloor" label="地上层数" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('isUnsafe')>=0" prop="isUnsafe" :formatter="GLOBAL.check.formatIsNo" label="有无安全隐患" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('gridName')>=0" prop="gridName" label="所属网格" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('buildingUnderground')>=0" prop="buildingUnderground" label="建筑结构" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('contacter')>=0" prop="contacter" label="联系人" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('scopeOperation')>=0" prop="scopeOperation" label="经营范围" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('hospitalClass')>=0" prop="hospitalClass" label="医院级别" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('hospitalOwnership')>=0" prop="hospitalOwnership" label="医院所有制性质" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('serviceType')>=0" prop="serviceType" label="服务类别" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('legalRepresentative')>=0" prop="legalRepresentative" label="法人代表" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('galleryfulNum')>=0" prop="galleryfulNum" label="容纳人数" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('workNum')>=0" prop="workNum" label="工作人员人数" show-overflow-tooltip> </el-table-column>
          <el-table-column v-if="showTabel.indexOf('placeRemark')>=0" prop="placeRemark" label="备注" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <!-- <el-button @click="see(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button @click="edit(scope.row)"v-if="id!=1" type="text" size="small">编辑</el-button>
						 <el-button @click="Building(scope.row)" v-if="id==1" type="text" size="small">操作</el-button>
						 <el-button style='color: red;' @click="deleteBuilding(scope.row)" v-if="id==1" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pad10 clearfix">

          <div class="inline fr">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]" :page-size="this.size" layout="sizes, prev, pager, next" :total="this.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <seeData :Visible="dialogTabelVisible"  :seeDataVal="seeDataVal" @close="dialogTabelVisible=false"></seeData>
    <Building :Visible="dialogBuildingVisble" @getUnit='getUnit' :UnitData='UnitData' :tableData='tableData' @updata='getVal' :seeDataVal="seeDataVal" @close="dialogBuildingVisble=false"></Building>
		<el-dialog :visible.sync="personFormVisble" width="80%">
      <AddPlace :isUpdate="'1'"></AddPlace>
    </el-dialog>
  </div>
</template>
<script>
  import seeData from '../../component/seeData.vue'
	import Building from './Building.vue'
  import titles from '../../component/title.vue'
  import AddPlace from './AddPlace.vue'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        place: {
          placeName:'',
          placeType:'',
          gridName:''
        },
        placeName: '',
        placeType: '',
        gridName: '',
        tableData: [],
				UnitData:[],
        multipleSelection: [],
        size: 10,
        currentPage: 0,
        total: 0,
        dialogTabelVisible: false,
        personFormVisble: false,
				dialogBuildingVisble:false,
        seeDataVal: {},
        id:'',
        showTabel:[],
        schoolYouErY:['gridName','placeAddress','placeTelephone','placeArea','teacherNum','studentNum','boyNum','grileNum','classroomArea','bedroomArea','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
        hospistal:['buildingName','placeAddress','hospitalClass','hospitalOwnership','placeArea','buildingUnderground','workNum','contacter','placeTelephone','isUnsafe','isBasement','undergroundArea','undergroundFloor','groundFloor','placeRemark'],
        buiness:['gridName','placeAddress','buildingName','buildingUnderground','placeArea','placeTelephone','isBasement','undergroundArea','undergroundFloor','groundFloor','scopeOperation','isUnsafe','placeRemark'],
        Car:['gridName','buildingName','placeAddress','groundFloor','placeArea','contacter','placeTelephone','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
        service:['gridName','buildingName','serviceType','legalRepresentative','contacter','placeTelephone','galleryfulNum','placeArea','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
        other:['gridName','placeAddress','buildingName','placeArea','placeTelephone','workNum','isUnsafe','contacter','undergroundArea','undergroundFloor','groundFloor','isBasement','placeRemark'],
        wenti:['gridName','buildingName','placeAddress','placeArea','contacter','placeTelephone','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
        dang:['gridName','placeAddress','placeArea','placeTelephone','workNum','isUnsafe','contacter','undergroundArea','undergroundFloor','groundFloor','isBasement','placeRemark'],
				building:['placeName','placeAddress','buildingName','placeCategory','placeType','villageName','buildingArea','buildingFloor','groundFloor','undergroundFloor','unitNum','families','manager','idCard']
			}

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': function(){
        this.id = this.$route.params.id;
        this.checkId(this.id)
        this.getVal();
        
      }
    },
    components: {
      titles,
      seeData,
      AddPlace,
			Building
    },
    mounted() {
      this.id = this.$route.params.id;
      this.checkId(this.id)
      this.getVal();
    },
    methods: {
      ...mapMutations([
        'AddAddressFormData',
        'AddshowAddressForm'
      ]),
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex % 2) {
          return 'bg-f6'
        }
        return ''
      },
      handleSelectionChange() {

      },
			 add(){
			  this.$router.push('/index/addPlace')
			},
			biaodian(){
				window.open("http://192.168.0.252:8951")
			}
			,
			imports(){
			  this.$router.push('/index/PlaceImport')
			},
			deleteBuilding(row){ //删除楼
					let id = row.id
					this.$confirm('此操作将删除该楼宇全部信息, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
					 	this.$request.post('/zzPlace/delete',{
							id
						},(res)=>{
							if(res.result=='1'){
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.getVal();
							}
						}) 
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});
			},
      handleSizeChange(val) {
        this.size = val;
        this.getVal();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getVal();
      },
      find() {
        this.currentPage = 1;
        this.placeName = this.place.placeName;
        this.gridName = this.place.gridName;
        this.getVal();
      },
      getVal() {
        this.$request.get('/zzPlace/listPage', {
				
          current: this.currentPage,
          size: this.size,
          placeName: this.placeName,
          placeType: this.placeType,
          gridName: this.gridName,

        }, (res) => {

          this.total = res.data.total;
          this.tableData = res.data.records;
        })
      },
      reset() {
				 this.placeName=''
				 this.gridName=''
				 this.place={}
				 this.getVal();
      },
      see(row) {
        this.dialogTabelVisible = true;
        this.seeDataVal = row;
      },
      edit(row) {
        var rows = {...row};
				//console.log(rows)
        this.AddAddressFormData(rows);
        this.personFormVisble = true;
      },
			Building(row){ //楼宇操作弹框
			//console.log(row)
				
			  this.seeDataVal = row;
				this.dialogBuildingVisble = true;
				//获取单元列表
				this.getUnit(row);
			},
			getUnit(row){ //获取单元
				this.$request.get('/zzPlace/listUnits',{
					buildingId:row.id,
				},(res)=>{
				    if(res.result == 1){
				        this.UnitData=res.data
				    }else{
				        _this.$message.error(res.msg);
				    } 
				})
			},
      checkId(id){
        switch (id) {
					case '1':
					  this.showTabel = this.building;
					  this.placeType = '楼';
					  break;	
          case '2':
            this.showTabel = this.schoolYouErY;
            this.placeType = '幼儿园';
            break;
          case '3':
            this.showTabel = this.schoolYouErY;
            this.placeType = '学校';
            break;
          case '4':
            this.showTabel = this.buiness;
            this.placeType = '商业场所';
            break;
          case '5':
            this.showTabel = this.hospistal;
            this.placeType = '医院';
            break;
          case '6':
            this.showTabel = this.Car;
            this.placeType = '车站码头';
            break;
          case '7':
            this.showTabel = this.service;
            this.placeType = '服务场所';
            break;
          case '8':
            this.showTabel = this.other;
            this.placeType = '宗教场所';
            break;
          case '9':
            this.showTabel = this.dang;
            this.placeType = '党政机关';
            break;
          case '10':
            this.showTabel = this.wenti;
            this.placeType = '文体活动场所';
            break;
          case '11':
            this.showTabel = this.other;
            this.placeType = '地下场所';
            break;
          default:
            break;
        }
        this.AddshowAddressForm(this.showTabel);
      }
      
    }
  }

</script>
