<template>
    <div>
        <div class="search">
                                
            <p>
                <span>社区：</span>
                <el-select v-model="person.community" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.Community"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span>网格：</span>
                <el-select v-model="person.grid" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.grid"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
                <span>导入日期：</span>
                <el-date-picker
                    v-model="person.importDate"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
            </p>
            <p>
                
                <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
                <el-button type="" @click="reset">重置</el-button>
            </p>
        </div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
            :data="needImportList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="householdNumber" label="户号"> </el-table-column>
            <el-table-column prop="idCard" label="公民身份证号码"> </el-table-column>
            <el-table-column prop="householder" label="户主姓名" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="personName" label="居住人姓名" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="relations" label="居住关系" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="houseOwnership" label="房屋权属" show-overflow-tooltip>  </el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="birth" label="出生日期" show-overflow-tooltip>  </el-table-column>
            <el-table-column prop="nation" label="民族" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="nativePlace" label="籍贯" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="contact" label="联系电话" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="servicePlace" label="工作单位" show-overflow-tooltip> </el-table-column>
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
            this.$request.get('/filePopulation/listImportHisPage',{
                personName:this.person.personName,
                idCard:this.person.idCard,
                contact:this.person.contact,
                community:this.person.community,
                grid:this.person.grid,
                importDate:this.person.importDate,
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

        },
    }
}
</script>

