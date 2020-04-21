
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        <p>
          <span>党员名称：</span>
          <el-input class="oinput" v-model="org.personName" placeholder="请输入姓名"></el-input>
        </p>
        <p>
          <span>性别：</span>
          <el-select class="oinput" v-model="org.sex" placeholder="请选择性别 ">
              <el-option
              v-for="item in this.GLOBAL.select.Sex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </p>
        <p>
          <span>身份证号：</span>
          <el-input class="oinput" v-model="org.idCard" placeholder="请输入身份证号"></el-input>
        </p>
        <p>
          <span>年龄范围（开始）：</span>
          <el-input class="oinput" type="number" v-model="org.ageStart" placeholder="请输入年龄范围"></el-input>
        </p>
        <p>
          <span>年龄范围（结束）：</span>
          <el-input class="oinput" type="number" v-model="org.ageEnd" placeholder="请输入年龄范围"></el-input>
        </p>
        <p>
          <span>所在党支部名称：</span>
          <el-input class="oinput" v-model="org.pmPartyBranch" placeholder="请输入所在党支部名称"></el-input>
        </p>
        <p>
          <span>现住地详情：</span>
          <el-input class="oinput" v-model="org.domicileAddress" placeholder="请输入现住地详情"></el-input>
        </p>
        <p>
          <el-button slot="reference" type="primary" @click="find" icon="el-icon-search">查询</el-button>
          <el-button type="" @click="reset">重置</el-button>
        </p>
      </div>
    </div>
    <div class="ocontent">
      <titles :title="'党员信息列表'">
          <span class="fr">
              <el-button type="primary" @click="add">添加</el-button>
              <el-button type="primary" @click="imports">导入</el-button>
          </span>
          
      </titles>
      <div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
          :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">  </el-table-column>
          <el-table-column prop="personName" label="党员名称"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column prop="nation" label="民族" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="birth" label="出生日期" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="qualifications" label="学历" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="pmType" label="人员类别" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="pmPartyBranch" label="所在党支部" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="domicileAddress" label="家庭住址" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" >
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
      <PartyDetail :isUpdate="'1'" @updateSuccess="updateSuccess"></PartyDetail>
    </el-dialog>
  </div>
</template>
<script>
  import titles from '../../component/title.vue'
  import PartyDetail from './PartyDetail.vue'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        id:'',
        org: {
        },
        getPamar:{},
        tableData: [],
        multipleSelection: [],
        size: 10,
        currentPage: 0,
        total: 0,
        personFormVisble: false,
        requestUrl:{
          update:'zzOrg/update'
        }
      }

    },
    components: {
      titles,
      PartyDetail
    },
    mounted() {
      this.getVal();
    },
    methods: {
      ...mapMutations([
        'AddPartyData'
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
      add(){
        this.$router.push('/index/PartyDetail')
      },
      imports(){
        this.$router.push('/index/PartyImport')
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
        this.getPamar = {...this.org};
        this.getVal();
      },
      getVal() {
        this.$request.get('/zzPartyMember/listPage', {

          current: this.currentPage,
          size: this.size,
          ...this.getPamar

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
        var rows = row;
        this.AddPartyData(rows);
        this.personFormVisble = true;
      },
      editSuccess(){
        this.personFormVisble = false;
        this.getVal();
      },
      updateSuccess(){
        this.currentPage = 1;
        this.personFormVisble = false;
        this.getVal();
      }
    }
  }

</script>
