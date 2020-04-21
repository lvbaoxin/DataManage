<!-- 户籍模块 -->
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'报表信息填报'">
        <span class="fr"></span>
      </titles>
      <el-form :inline="true" :model="formInline" class="demo-form-inline mart-10">
        <el-form-item label="姓名：">
          <el-input v-model="formInline.personName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formInline.idCard" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="人户分类情况：">
          <el-select v-model="formInline.consistencyType" placeholder="人户分类情况">
            <el-option
              v-for="item in this.GLOBAL.select.personClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="稳控类别：">
          <el-select v-model="formInline.wenkongType" placeholder="稳控类别">
            <el-option
              v-for="item in this.GLOBAL.select.reportCategory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信访事项类别：">
          <el-select v-model="formInline.xinfangType" placeholder="信访事项类别">
            <el-option
              v-for="item in this.GLOBAL.select.reportCategory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道负责人：">
          <el-input v-model="formInline.streetPerson" placeholder="街道负责人"></el-input>
        </el-form-item>
        <el-form-item label="社区包保人员：">
          <el-input v-model="formInline.communityPerson" placeholder="社区包保人员"></el-input>
        </el-form-item>
        <el-form-item label="派出所责任民警：">
          <el-input v-model="formInline.policeStationPerson" placeholder="派出所责任民警"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" icon="el-icon-refresh" @click="refresh">刷新</el-button>
      <el-button type="info" icon="el-icon-printer" @click="print">打印</el-button>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="danger" icon="el-icon-upload2" @click="exportData">导出选中的数据</el-button>
      
    </div>
    <div class="ocontent" id="reportList">
      <titles :title="'报表列表'"></titles>
      <div>
        <el-table
          :header-cell-style="{background:'#3498db',color:'#fff'}"
          ref="multipleTable"
          border
          :row-class-name="GLOBAL.format.tableRowClassName"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="idCard"
             width="160"
            :formatter="GLOBAL.check.formatID"
            label="公民身份号码"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="personName" label="姓名"></el-table-column>
          <el-table-column prop="domicileAddress" label="户籍地址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="registryAddress" label="实际居住地" show-overflow-tooltip></el-table-column>
          <el-table-column prop="consistencyTypeName" label="人户分类情况" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xinfangRemark" label="反映的主要问题" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xinfangType" label="信访事项类别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="responsibleUnit" label="属事责任单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="wenkongType" label="稳控级别（一、二、三级）" show-overflow-tooltip></el-table-column>
          <el-table-column prop="wenkongTypeReason" label="定级依据" show-overflow-tooltip></el-table-column>
          <el-table-column prop="streetPerson" label="街道责任人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="communityPerson" label="社区包保人员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="policeStationPerson" label="派出所责任民警" show-overflow-tooltip></el-table-column>
          
        </el-table>

        <div class="pad10 clearfix">

          <div class="inline fr">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="this.size"
              layout="sizes, prev, pager, next"
              :total="this.total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var fileDownload = require('js-file-download')
import http from '../../../tools/http/http.js';
import titles from "../../component/title.vue";
export default {
  data() {
    return {
      formInline: {
        policeStationPerson: "",
        communityPerson: "",
        streetPerson: "",
        wenkongType: "",
        xinfangType: "",
        consistencyType: "",
        personName: "",
        idCard:""
      },
      selectIds:[],
      post: {},
      tableData: [],
      size: 10,
      currentPage: 0,
      total: 0,
    };
  },
  components: {
    titles
  },
  mounted() {
    this.getVal();
  },
  methods: {
    search(){
      this.post = {};
      for (const key in this.formInline) {
        if (this.formInline[key]) {
          this.post[key] = this.formInline[key]
        }
      }
      this.getVal();
    },
    exportData(){
      var _this = this;
      if(this.selectIds.length == 0){
        _this.$message.error('请选择导出数据');
        return;
      }
      this.selectIds=this.selectIds.toString();

      http.responseType = 'arraybuffer';
      http.get('/report/exportWKPoCntByIds?ids='+this.selectIds,{responseType:'arraybuffer'}).then(res=>{
        fileDownload(res.data,'报表.xls')
      })
    },
    print(){
      var printHtml = document.getElementById("reportList").innerHTML;
      var wind = window.open("",'newwindow', 'height=800, width=1200, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
      wind.document.body.innerHTML = printHtml;
      wind.print();
      return false; 
    },
    refresh(){
      this.getVal();
    },
    handleSelectionChange(array) {
      this.selectIds = [];
      for (let index = 0; index < array.length; index++) {
        this.selectIds.push(array[index].id)
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getVal();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getVal();
    },
    getVal() {
      this.$request.get(
        '/report/listWKPoCntPage',
        {
          current: this.currentPage,
          size: this.size,
          ...this.post
        },
        res => {
          this.total = res.data.total;
          this.tableData = res.data.records;
          this.$message('加载成功')
        }
      );
    }
  }
};
</script>
