<!-- 户籍模块 -->
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
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
          <span>社区：</span>
          <el-select v-model="person.community" placeholder="请选择">
            <el-option
              v-for="item in this.GLOBAL.select.Community"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          <span>网格：</span>
          <el-select v-model="person.grid" placeholder="请选择">
            <el-option
              v-for="item in this.GLOBAL.select.grid"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          <span>详细地址：</span>
          <el-input class="oinput" v-model="person.domicileAddress" placeholder="详细地址"></el-input>
        </p>
        <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'决策列表'"></titles>
      <div>
        <el-table
          :header-cell-style="{background:'#3498db',color:'#fff'}"
          ref="multipleTable"
          border
          :row-class-name="GLOBAL.format.tableRowClassName"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="personName" label="姓名"></el-table-column>
          <el-table-column
            prop="idCard"
            :formatter="GLOBAL.check.formatID"
            label="公民身份证号码"
            width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qualifications" label="文化程度" show-overflow-tooltip></el-table-column>
          <el-table-column prop="domicileAddress" label="发生地详址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="caseType" label="类别（重点问题类别）" show-overflow-tooltip></el-table-column>
          <el-table-column prop="caseRemark" label="问题状况" show-overflow-tooltip></el-table-column>
          <el-table-column prop="guardianPerson" label="监护人" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
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
    
    
    <Detail ref="caseDetail" :detailData="detailData"></Detail>
    
  </div>
</template>
<script>
import titles from "../../component/title.vue";
import Detail from "./component/detail.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      person: {},
      post: {},
      tableData: [],
      multipleSelection: [],
      size: 10,
      currentPage: 0,
      total: 0,
      detailVisble: true,
      detailData: {}
    };
  },
  components: {
    titles,
    Detail
  },
  mounted() {
    this.getVal();
  },
  methods: {
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
      this.post = { ...this.person };
      this.getVal();
    },
    getVal() {
      this.$request.get(
        'decisions/listCasePage',
        {
          current: this.currentPage,
          size: this.size,
          ...this.post
        },
        res => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        }
      );
    },
    see(row) {
        this.$refs.caseDetail.getInfo(row);
        this.detailData = row;
        this.detailVisble = true;
    },
  }
};
</script>
