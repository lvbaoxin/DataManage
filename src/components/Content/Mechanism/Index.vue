// 组织模块
<template>
  <div class="bg-b">
    <div class="ocontent">
      <titles :title="'数据筛选'">
        <span class="fr"></span>
      </titles>
      <div class="search">
        <p>
          <span>组织名称：</span>
          <el-input class="oinput" v-model="org.orgName" placeholder="请输入组织名称"></el-input>
        </p>
        <!-- <p>
          <span>组织类别：</span>
          <el-select v-model="org.orgCategory" placeholder="请选择">
            <el-option
              v-for="item in this.GLOBAL.select.orgCategory"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p> -->
        <p>
          <span>组织分类：</span>
          <el-select v-model="org.orgType" placeholder="请选择">
            <el-option
              v-for="item in this.GLOBAL.select.orgType"
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
      <titles :title="'组织数据列表'">
       
      </titles>
      <div>
        <el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="GLOBAL.format.tableRowClassName"
          :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">  </el-table-column>
          <el-table-column prop="orgName" label="组织名称"> </el-table-column>
          <el-table-column prop="orgCategory" label="组织类别"> </el-table-column>
          <el-table-column prop="orgType" label="组织分类" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orgSecretary" label="组织书记" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orgLiaisons" label="组织联系人" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orgContact" label="组织联系人电话" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="orgPlace" label="组织所在地" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orgAddress" label="组织详细地址" show-overflow-tooltip>  </el-table-column>
          <el-table-column prop="guideDept" label="业务指导部门" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orgUnitStatus" :formatter="orgstatus" label="组织所在单位情况" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <router-link  :to="{ name: 'OrgPersion', params: { id: scope.row.id }}"><el-button v-if="scope.row.orgType=='队伍'" type="text" size="small">成员</el-button></router-link>
              
              <router-link v-if="id=='1'" :to="{ name: 'Company', params: { id: scope.row.id }}"><el-button type="text" size="small">所在单位</el-button></router-link>
              
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
      <orgEditForm :requestUrl="requestUrl" @success="editSuccess"></orgEditForm>
    </el-dialog>
  </div>
</template>
<script>
  import titles from '../../component/title.vue'
  import orgEditForm from '../../component/form/orgEditForm.vue'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        id:'',
        org: {
          orgName: '',
          orgCategory: '',
          orgType: ''
        },
        orgName: '',
        orgCategory: '',
        orgType: '',
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
      orgEditForm
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': function(){
        this.id = this.$route.params.id;
        this.getCategory(this.id)
       
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      this.getCategory(this.id)
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
      getCategory(id){
        switch (id) {
          case '1':
            this.orgCategory = '党委机构'
            break;
          case '2':
            this.orgCategory = '政府机构'
            break;
          case '3':
            this.orgCategory = '人大机构'
            break;
          case '4':
            this.orgCategory = '政协机构'
            break;
          case '5':
            this.orgCategory = '社会机构'
            break;
        
          default:
            break;
        }
         this.getVal();
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
        this.orgName = this.org.orgName;
        this.orgType = this.org.orgType;
        this.getVal();
      },
      getVal() {
        this.$request.get('/zzOrg/listPage', {

          current: this.currentPage,
          size: this.size,
          orgName: this.orgName,
          orgCategory: this.orgCategory,
          orgType: this.orgType

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
      },
      orgstatus(row, column, cellValue, index){
        switch (cellValue) {
          case 3:
            return '法人单位'
            break;
          case 1:
            return '与上级机构相同'
            break;
          case 2:
            return '联合支部'
            break;
          default:
            break;
        }
      }
      
    }
  }

</script>
