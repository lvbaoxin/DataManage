<template>
    <div>
        <div class="search">
        	<p>
        		<span>小区名称：</span>
        		<el-input class="oinput" v-model="person.villageName" placeholder="请输入小区名称"></el-input>
        	</p>
        	<p>
        		<span>楼栋名称：</span>
        		<el-input class="oinput" v-model="person.building" placeholder="请输入楼栋名称"></el-input>
        	</p>
        	<p>
        		<el-button slot="reference" type="primary" @click="getList" icon="el-icon-search">查询</el-button>
        		<el-button type="" @click="reset">重置</el-button>
        	</p>
        </div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
            :data="needImportList" tooltip-effect="dark" style="width: 100%">
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
        </el-table>
        <div style="text-align:right;margin:20px 0;">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                layout="sizes,prev, pager, next"
                :total="totalSize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            person:{},
            select:[],
            needImportList:[],
            totalSize:0,
            current:1,
            size:10
        }
    }, 
    mounted:function(){
        this.getList()
    },
    methods:{
        getList(){
            var _this = this;
            this.$request.get('/fileBuilding/listImportHisPage',{
                villageName: this.person.villageName,
                building: this.person.building,
                current:this.current,
                size:this.size
            },function(res){
                _this.needImportList = res.data.records;
                _this.totalSize = res.data.total
            })
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2) {
            return 'bg-f6'
            }
            return ''
        },
        sizeChange(val){
            this.size = val;
            this.getList();
        },
        currentChange(val){
            this.current = val;
            this.getList();
        },
        find(){
            this.getList();
        },
        reset(){
			this.person = {}
			this.getList();
        },
    }
}
</script>

