<!-- 户籍模块 -->
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        <p>
          <span>名称：</span>
          <el-input class="oinput" v-model="person.personName" placeholder="请输入名称"></el-input>
        </p>
        <p>
          <span>公民身份证号：</span>
          <el-input class="oinput" v-model="person.idCard" placeholder="请输入公民身份证号"></el-input>
        </p>
        <p>
          <span>户籍地址：</span>
          <el-input class="oinput" v-model="person.RegistryAddress" placeholder="请输入公民身份证号"></el-input>
        </p>
        <p>
          <span>现住地址：</span>
          <el-input class="oinput" v-model="person.domicileAddress" placeholder="请输入现住地址"></el-input>
        </p>
        <p>
          <span>信访类别：</span>
          <el-input class="oinput" v-model="person.xinfangType" placeholder="请输入信访类别"></el-input>
        </p>
        <p>
          <span>责任人员：</span>
          <el-input
            type="number"
            class="oinput"
            v-model="person.responsibilityPersonName"
            placeholder="请输入责任人员"
          ></el-input>
        </p>

        <p>
          <el-popover
            placement="top-start"
            title="说明"
            width="200"
            trigger="hover"
            content=""
          >
            <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
          </el-popover>
          <el-button type @click="reset">重置</el-button>
        </p>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'稳控人口数据列表'"></titles>
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
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="personName" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="registryAddress" label="户籍详址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="domicileAddress" label="现住地详情" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="consistencyFlag"
            :formatter="GLOBAL.check.formatIsNo"
            label="人户一致标志"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="xinfangType" label="信访事项类别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xinfangRemark" label="主要问题" show-overflow-tooltip></el-table-column>
          <el-table-column prop="wenkongTypeReason" label="定级依据" show-overflow-tooltip></el-table-column>
          <el-table-column prop="responsibleUnit" label="责任单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="streetPerson" label="街道包保人员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="streetContact" label="街道包保人员联系方式" show-overflow-tooltip></el-table-column>
          <el-table-column prop="policeStationPerson" label="派出所责任民警" show-overflow-tooltip></el-table-column>
          <el-table-column prop="policeStationContact" label="派出所责任民警联系方式" show-overflow-tooltip></el-table-column>
          <el-table-column prop="communityPerson" label="社区包保人员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="communityContact" label="社区包保人员联系方式" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog :visible.sync="personFormVisble" width="80%">
      <editForm @success="editSuccess"></editForm>
    </el-dialog>
  </div>
</template>
<script>
import titles from "../../component/title.vue";
import editForm from "../../component/form/editformWenKong.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      person: {},
      post: {},
      tableData: [],
      size: 10,
      currentPage: 0,
      total: 0,
      personFormVisble: false
    };
  },
  props: ["requestUrl"],
  components: {
    titles,
    editForm
  },
  mounted() {
    this.getVal();
  },
  methods: {
    ...mapMutations(["AddWenKongData"]),

    handleSelectionChange() {},
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
        "/zzHoseholdPopulationWenkong/listPage",
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
    reset() {
      for (const key in person) {
        if (object.hasOwnProperty(key)) {
          object[key] = "";
        }
      }
    },
    edit(row) {
      var mydata = { ...row };
      this.AddWenKongData(mydata);
      this.personFormVisble = true;
    },
    editSuccess() {
      this.getVal();
      this.personFormVisble = false;
    }
  }
};
</script>
