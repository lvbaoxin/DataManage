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
                
                <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
                <el-button type="" @click="reset">重置</el-button>
            </p>
        </div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
            :data="needImportList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="idCard" :formatter="GLOBAL.check.formatID" label="公民身份证号码"></el-table-column>
            <el-table-column prop="personName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isXingshijiejiao" label="是否刑释解教人员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isShewai" label="是否涉外" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isWentiqingshaonian" label="是否问题青少年" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isShedu" label="是否涉毒" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isXinfang" label="是否信访" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isShejun" label="是否涉军" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="isShefashesu" label="是否涉法涉诉" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="isJingshen" label="是否肇事肇祸精神障碍者" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="isShexie" label="是否涉邪" show-overflow-tooltip> </el-table-column>
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
            this.$request.get('/fileImportantPopulation/listImportHisPage',{
                personName:this.person.personName,
                idCard:this.person.idCard,
                community:this.person.community,
                grid:this.person.grid,
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

