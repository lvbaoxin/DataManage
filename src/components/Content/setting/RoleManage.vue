<template>
    <div class="pad10" style="width:100%;height:100%;background:#cde6fc">
        <div class="role-left">
            <titles :title="'角色信息维护'"></titles>
            <el-tree :data="treedata" :props="defaultProps" >
                <span class="custom-tree-node" slot-scope="{ node }">
                    <span>{{ node.label }}</span>
                    <span style="margin-left:100px">
                        <el-button v-show="node.level==1" type="text" size="mini" @click="add(node)" >
                            新增
                        </el-button>
                        <el-button v-show="node.level!=1" type="text" size="mini" @click="edit(node)" >
                            编辑
                        </el-button>
                        <el-button v-show="node.level!=1" type="text" size="mini" @click="deletes(node)">
                            删除
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <!-- 角色更新 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="角色简称">
                    <el-input v-model="form.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色详述">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
				 <el-form-item label="角色父级">
				    <el-cascader
						change-on-select
				        :props="gridprop"
				        :options="listForTree"
				        v-model="form.roleParentIds">
				    </el-cascader>
				</el-form-item>
                <el-form-item label="网格">
                    <el-cascader
						change-on-select
                        :props="gridprop"
                        :options="gridList"
                         v-model="form.gridIds">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="角色分类">
                    <el-select v-model="form.roleClass" placeholder="请选择">
                        <el-option
                        v-for="item in RoleClassList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="update">{{btntext}}</el-button>
                    <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import titles from "../../component/title.vue";
export default {
    components:{
        titles
    },
    data(){
        return{
            treedata:[],
            defaultProps:{
                children: 'child',
                label: 'roleName'
            },
            dialogVisible:false,
            form:{},
            gridList:[],
            RoleClassList:[],
			listForTree:[],
            gridprop:{
                label:'name',
                value:'index',
                children: 'child'
            },
            type:0,
            btntext:''
        }
    },
    mounted(){
        this.getroleInfo()
        this.getGrid()
        this.getRoleClass()
		this.getlistForTree()
    },
    methods:{
        getroleInfo(){
            this.$request.get('zzRole/listForTree',{},res =>{
                this.treedata = res.data;
				console.log(res.data)
            })
        },
        deletes(node){
            var roleId = node.data.roleId;
            this.$confirm('确认要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$request.post('zzRole/delete',{
                    id:roleId
                },res=>{
                    this.$message('删除成功')
                    this.getroleInfo()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        },
        // 获取网格列表
        getGrid(){
            this.$request.get('common/listGridForTree',{},res=>{
				
                this.gridList = res.data
				//console.log(res.data)
            })
        },
		// 获取角色树
		
		getlistForTree(){
			 this.$request.get('zzRole/listByParentIdForTree',{},res=>{
				
			    this.listForTree=res.data 
				
			})
		}, 
		
		
        // 获取角色分类
        getRoleClass(){
            this.$request.get('common/listRoleClassForSelect',{},res=>{
				//console.log(res.data)
                this.RoleClassList = res.data;
            })
        },
        edit(node){
            this.dialogVisible = true;
            this.type = 0;
			this.btntext = '更新';
            this.$request.get('zzRole/find',{
                id:node.data.roleId
            },res=>{
                this.form = res.data;
				this.form.roleParentIds=res.data.roleParentIds.split(',').map(Number)
                this.form.gridIds=res.data.gridIds.split(',').map(Number)
            })
            
        },
        update(){
            if(!this.form.roleName || !this.form.remark || !this.form.roleClass || !this.form.gridIds || !this.form.roleParentIds){
                this.$message('请完善信息');
                return;
            }
			this.form.roleParentId=this.form.roleParentIds[this.form.roleParentIds.length-1]
            this.form.gridId = this.form.gridIds[this.form.gridIds.length-1];
            //this.form.id = this.form.roleId;
            var data
            if(this.type){
                url = 'zzRole/insert'
				data=this.form
            }else{
				var url = 'zzRole/update';
				data={
					createUser:this.form.createUser,
					delFlag:this.form.delFlag,
					remark:this.form.remark,
					gridId:this.form.gridId,
					gridIds:this.form.gridIds,
					id:this.form.id,
					roleClass:this.form.roleClass,
					roleName:this.form.roleName, 
					roleParentId:this.form.roleParentId, 
					roleParentIds:this.form.roleParentIds,
					modifyUser:JSON.parse(localStorage.getItem('userInfo')).userName || {}
				}
			}
            this.$request.post(url,{
               ...data
            },res=>{
                this.$message('更新成功');
                this.dialogVisible = false;
                this.getroleInfo()
				this.getRoleClass()
				this.getlistForTree()
				this.getGrid()
            })
        },
        add(node){
          
            this.dialogVisible = true;
            this.form = {};
            this.type = 1;
			 this.btntext = '新增';
			 this.form.id = '';
            this.form.roleParentId = node.data.roleId;
        }
    }
}
</script>
<style>
.role-left{
    padding: 10px;
    width: 40%;
    background: #fff;
    border-radius: 8px;
    height: 90%;
    overflow: auto;
}
</style>


