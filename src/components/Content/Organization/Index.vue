// 组织模块
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        <p>
          <span>机构名称：</span>
          <el-input class="oinput" v-model="person.idCard" placeholder="请输入机构名称"></el-input>
        </p>
        <p>
          <span>机构类别：</span>
          <el-input class="oinput" v-model="person.personName" placeholder></el-input>
        </p>
        <p>
          <span>机构分类：</span>
          <el-input class="oinput" v-model="person.personName" placeholder></el-input>
        </p>

        <p>
          <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
          <el-button type @click="reset">重置</el-button>
        </p>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'队伍数据列表'"></titles>
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
          <el-table-column prop="orgName" label="机构名称"></el-table-column>
          <el-table-column prop="orgCategory" label="机构类别"></el-table-column>
          <el-table-column prop="orgType" label="机构分类" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgSecretary" label="机构书记" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgLiaisons" label="机构联系人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgContact" label="机构联系人电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgClass" label="机构层级" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgPlace" label="机构所在地" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgAddress" label="机构详细地址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="startTime" label="成立日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="guideDept" label="业务指导部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="personNum" label="人员数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgUnitStatus" label="机构所在单位情况" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
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
    <seeData
      :Visible="dialogTabelVisible"
      :seeDataVal="seeDataVal"
      @close="dialogTabelVisible=false"
    ></seeData>
    <el-dialog :visible.sync="personFormVisble" width="80%">
      <editForm></editForm>
    </el-dialog>
  </div>
</template>
<script>
import seeData from "../../component/seeData.vue";
import titles from "../../component/title.vue";
import editForm from "../../component/form/editForm.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      person: {
        politicalStatus: "",
        personName: "",
        idCard: "",
        birth: "",
        contact: ""
      },
      value: "",
      politicalStatus: "",
      personName: "",
      idCard: "",
      birth: "",
      contact: "",
      tableData: [],
      multipleSelection: [],
      size: 10,
      currentPage: 0,
      total: 0,
      dialogTabelVisible: false,
      personFormVisble: false,
      seeDataVal: {}
    };
  },
  components: {
    titles,
    seeData,
    editForm
  },
  mounted() {
    this.getVal();
  },
  methods: {
    ...mapMutations(["AddPersonFormData"]),
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
      this.politicalStatus = this.person.politicalStatus;
      this.personName = this.person.personName;
      this.idCard = this.person.idCard;
      this.birth = this.person.birth;
      this.contact = this.person.contact;
      this.getVal();
    },
    getVal() {
      this.$request.get(
        "/zzOrg/listPage",
        {
          current: this.currentPage,
          size: this.size,
          orgName: this.politicalStatus,
          orgCategory: this.personName,
          orgCategory: this.idCard
        },
        res => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        }
      );
    },
    reset() {},
    see(row) {
      this.dialogTabelVisible = true;
      this.seeDataVal = row;
    },
    edit(row) {
      this.AddPersonFormData(row);
      //console.log(row);
      this.personFormVisble = true;
    },
    addData() {
      this.AddPersonFormData({});
    }
  }
};
</script>
