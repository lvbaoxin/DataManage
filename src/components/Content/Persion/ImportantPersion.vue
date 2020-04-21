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
          <span>出生日期：</span>
          <el-date-picker
            class="oinput"
            v-model="person.birth"
            type="date"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </p>
        <p>
          <span>联系电话：</span>
          <el-input type="number" class="oinput" v-model="person.contact" placeholder="请输入联系电话"></el-input>
        </p>
        <p>
          <span>社区：</span>
          <el-select v-model="person.Community" placeholder="请选择">
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
          <span>请输入年龄范围：</span>
          <el-input
            type="number"
            class="oinput"
            v-model.number="person.ageStart"
            placeholder="范围1-200"
          ></el-input>至
          <el-input
            type="number"
            class="oinput"
            v-model.number="person.ageEnd"
            placeholder="范围1-200"
          ></el-input>
        </p>
        <p>
          <span>详细地址：</span>
          <el-input class="oinput" v-model="person.domicileAddress" placeholder="请输入详细地址"></el-input>
        </p>
        <p>
          
            <el-button type="primary" @click="find" icon="el-icon-search">查询</el-button>
          
            <el-button type @click="reset">重置</el-button>
        </p>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'常用人口数据列表'"></titles>
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
            <el-table-column prop="householdNumber" label="户号"></el-table-column>
          <el-table-column
            prop="idCard"
            :formatter="GLOBAL.check.formatID"
            label="公民身份证号码"
            width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="personName" label="居住人姓名"></el-table-column>
          <el-table-column prop="relations" label="居住关系" show-overflow-tooltip></el-table-column>
          <el-table-column prop="houseOwnership" label="房屋权属" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="birth" label="出生日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="buildingPlace" label="楼栋地址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="nation" label="民族" show-overflow-tooltip></el-table-column>
          <el-table-column prop="nativePlace" label="籍贯" show-overflow-tooltip></el-table-column>
          <el-table-column prop="maritalStatus" label="婚姻状况" show-overflow-tooltip></el-table-column>
          <el-table-column prop="consistencyType" label="人户分类情况" show-overflow-tooltip></el-table-column>
          <el-table-column prop="politicalStatus" label="政治面貌" show-overflow-tooltip></el-table-column>
          <el-table-column prop="occupationStatus" label="职业现状" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="contact"
            :formatter="GLOBAL.check.formatPhone"
            label="联系电话"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="servicePlace" label="工作单位" show-overflow-tooltip></el-table-column>
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
    <seeData
      :Visible="dialogTabelVisible"
      :seeDataVal="seeDataVal"
      @close="dialogTabelVisible=false"
    ></seeData>
    <el-dialog :visible.sync="personFormVisble" width="80%">
      <editForm @success="editSuccess" :requestUrl="requestUrl"></editForm>
    </el-dialog>
  </div>
</template>
<script>
import seeData from "../../component/seeData.vue";
import titles from "../../component/title.vue";
import editForm from "../../component/form/RealPopForm.vue";
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
      dialogTabelVisible: false,
      personFormVisble: false,
      seeDataVal: {},
      postUrl:''
    };
  },
  watch:{
      $route:function(to,form){
          var id = to.params.id;
          this.getUrl(id);
          this.getVal();
      }
  },
  props: ["requestUrl"],
  components: {
    titles,
    seeData,
    editForm
  },
  mounted() {
    this.getUrl(this.$route.params.id);
    this.getVal();
  },
  methods: {
    ...mapMutations(["AddPersonFormData"]),
    handleSelectionChange() {},
    getUrl(id){
        //console.log(id)
        switch (id) {
            case "0":
                this.postUrl = 'hpImportant/listPage'
                break;
            
            case "1":
                this.postUrl = 'hpImportant/listPage?isXingshijiejiao=1'
                break;
            case "2":
                this.postUrl = 'hpImportant/listPage?isShedu=1'
                break;
            case "3":
                this.postUrl = 'hpImportant/listPage?isJingshen=1'
                break;
            case "4":
                this.postUrl = 'hpImportant/listPage?isWentiqingshaonian=1'
                break;
            case "5":
                this.postUrl = 'hpImportant/listPage?isXinfang=1'
                break;
            case "6":
                this.postUrl = 'hpImportant/listPage?isShewai=1'
                break;
            case "7":
                this.postUrl = 'hpImportant/listPage?isShexie=1'
                break;
            case "8":
                this.postUrl = 'hpImportant/listPage?isQita=1'
                break;
            default:
                this.postUrl = 'hpImportant/listPage'
                break;
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
    find() {
      this.currentPage = 1;
      this.post = { ...this.person };
      this.getVal();
    },
    getVal() {
      this.$request.get(
        this.postUrl,
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
      this.dialogTabelVisible = true;
      this.seeDataVal = row;
    },
    reset() {},
    
    editSuccess() {
      this.getVal();
      this.personFormVisble = false;
    },
  }
};
</script>
