// 组织模块
<template>
  <div class="bg-b" >
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        
        <p>
          <span>人员编号：</span>
          <el-input class="oinput" v-model="org.orgName" placeholder="请输入人员编号"></el-input>
        </p>
        <p>
          <span>姓名：</span>
          <el-input class="oinput" v-model="org.orgName" placeholder="请输入姓名"></el-input>
        </p>
        <p>
          <span>日期：</span>
          <el-date-picker class="oinput" v-model="org.birth" type="date" value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>
          <span>政治面貌：</span>
          <el-select v-model="org.Community" placeholder="请选择">
              <el-option
              v-for="item in this.GLOBAL.select.Politics"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </p>
        <p>
          <span>职业现状：</span>
          <el-select v-model="org.Community" placeholder="请选择">
              <el-option
              v-for="item in this.GLOBAL.select.Occupation"
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
      <titles :title="'成员数据列表'">
          <span class="fr"><router-link :to="{ name: 'Addteam',params: { id: this.orgId }}"><el-button type="primary" >添加</el-button></router-link></span>
          
      </titles>
      <div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="GLOBAL.format.tableRowClassName"
          :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">  </el-table-column>
          <el-table-column prop="teamCode" label="人员编号"> </el-table-column>
          <el-table-column prop="personName" label="姓名" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="idCard" label="公民身份号码" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="nation" label="民族" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="politicalStatus" label="政治面貌" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="birth" label="出生日期" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="position" label="级别" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="dutyClass" label="职级" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="duty" label="职务" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="occupationStatus" label="职业现状" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="joinTime" label="进入日期" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog :visible.sync="personFormVisble" width="80%">
      <orgEidtPersionForm :requestUrl="requestUrl" @success="editSuccess"></orgEidtPersionForm>
    </el-dialog>
  </div>
</template>
<script>
  import titles from '../../component/title.vue'
  import orgEidtPersionForm from '../../component/form/orgEidtPersionForm.vue'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        org: {
          teamId: '',
          teamCode: '',
          personName:''
        },
        orgId: '',
        teamId:'',
        teamCode: '',
        personName: '',
        tableData: [],
        multipleSelection: [],
        size: 10,
        currentPage: 0,
        total: 0,
        personFormVisble: false,
        requestUrl:{
          update:'zzOrgTeam/update'
        }
      }

    },
    components: {
      titles,
      orgEidtPersionForm
    },
    mounted() {
        this.orgId = this.$route.params.id;
        this.getVal();
    },
    methods: {
      ...mapMutations([
        'AddOrgFormData'
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
        this.teamId = this.org.teamId;
        this.teamCode = this.org.teamCode;
        this.personName = this.org.personName;
        this.getVal();
      },
      getVal() {
        this.$request.get('/zzOrgTeam/listPage', {

          current: this.currentPage,
          size: this.size,
          orgId:this.orgId,
          teamId: this.teamId,
          teamCode: this.teamCode,
          personName: this.personName

        }, (res) => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        })
      },
      reset() {
        for(var key in this.org){
          this.org[key] = '';
        }
      },
      edit(row) {
        this.AddOrgFormData(row);
        this.personFormVisble = true;
      },
      editSuccess(){
        this.personFormVisble = false;
        this.getVal();
      }
    }
  }

</script>
