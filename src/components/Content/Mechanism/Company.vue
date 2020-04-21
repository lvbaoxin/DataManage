// 组织模块
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        <p>
          <span>单位名称：</span>
          <el-input class="oinput" v-model="org.orgUnitName" placeholder="请输入内部编号"></el-input>
        </p>
        <p>
          <span>机构代码：</span>
          <el-input class="oinput" v-model="org.orgUnitSocialCreditCode" placeholder="请输入人员编号"></el-input>
        </p>

        <p>
          <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
          <el-button type @click="reset">重置</el-button>
        </p>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'单位数据列表'">
        <span class="fr">
          <router-link :to="{ name: 'AddCompany',params: { id: this.orgId }}">
            <el-button type="primary">新增</el-button>
          </router-link>
        </span>
      </titles>
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
          <el-table-column prop="orgUnitName" label="单位名称"></el-table-column>
          <el-table-column prop="orgUnitType" label="单位类别"></el-table-column>
          <el-table-column prop="orgUnitStatus" label="单位建立党组织情况" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="orgUnitSocialCreditCode"
            label="机构代码或统一社会信用代码"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
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
      <orgEditCompanyForm :requestUrl="requestUrl" @success="editSuccess"></orgEditCompanyForm>
    </el-dialog>
  </div>
</template>
<script>
import titles from "../../component/title.vue";
import orgEditCompanyForm from "../../component/form/orgEditCompanyForm.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      org: {
        orgUnitSocialCreditCode: "",
        orgUnitName: ""
      },
      orgId: "",
      orgUnitName: "",
      orgUnitSocialCreditCode: "",
      tableData: [],
      multipleSelection: [],
      size: 10,
      currentPage: 0,
      total: 0,
      personFormVisble: false,
      requestUrl: {
        update: "zzOrg/update"
      }
    };
  },
  components: {
    titles,
    orgEditCompanyForm
  },
  mounted() {
    this.orgId = this.$route.params.id;
    this.getVal();
  },
  methods: {
    ...mapMutations(["AddOrgFormData"]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "bg-f6";
      }
      return "";
    },
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
      this.orgUnitName = this.org.orgUnitName;
      this.orgUnitSocialCreditCode = this.org.orgUnitSocialCreditCode;
      this.getVal();
    },
    getVal() {
      this.$request.get(
        "/zzOrgUnit/listPage",
        {
          current: this.currentPage,
          size: this.size,
          orgId: this.orgId,
          orgUnitName: this.orgUnitName,
          orgUnitSocialCreditCode: this.orgUnitSocialCreditCode
        },
        res => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        }
      );
    },
    reset() {
      for (var key in this.org) {
        this.org[key] = "";
      }
    },
    edit(row) {
      this.AddOrgFormData(row);
      this.personFormVisble = true;
    },
    editSuccess() {
      this.personFormVisble = false;
      this.getVal();
    }
  }
};
</script>
