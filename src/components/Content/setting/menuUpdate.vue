<template>
    <div class="pad10">
        <el-form ref="form" :model="role" label-width="80px">
            
            <el-form-item label="角色分类">
                <el-cascader
                    @change="rolechange"
                    expand-trigger="hover"
                    :props="casrule"
                    :options="options"
                    v-model="role.roleId">
                </el-cascader>
            </el-form-item>
            <el-form-item :label="item.name" v-for="(item,index) in menuList" :key="index">
                <el-checkbox-group v-model="menuIds" @change="handleCheckedCitiesChange">
                    <div v-for="(items,indexs) in item.child" :key="indexs">
                        <div v-for="(itemss,indexss) in items.child" :key="indexss" style="display:inline-block;margin-left:20px">
                            <el-checkbox :label="itemss.index.toString()" >{{itemss.name}}</el-checkbox>
                            <el-checkbox :label="itemsss.index.toString()" v-for="(itemsss,indexsss) in itemss.child" :key="indexsss">{{itemsss.name}}</el-checkbox>
                        </div>
                    </div>
                    
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="creat">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            role:{},
            menuIds:[],
            menuList:[],
            options:[],
            casrule: {
                label:'roleName',
                value:'roleId',
                children: 'child'
            },
        }
    },
    mounted(){
        this.getRoleList()
        this.getMenu()
    },
    methods:{
        getMenu(){
            this.$request.get('sysMenu/listForTree',{},res=>{
                this.menuList = res.data;
            })
        },
        rolechange(array){
            this.$request.get('sysMenuRole/findByRoleId',{
                roleId:array[1]
            },res=>{
                if(res.result == 1){
                    this.menuIds = res.data.menuIds.split(",");
                    //console.log(this.menuIds)
                }
            })
        },
        getRoleList(){
            this.$request.get('zzRole/listForTree',{
                current:1,
                size:100
            },res=>{
                this.options = res.data;
            })
        },
        handleCheckedCitiesChange(val){
            console.log(val)
        },
        creat(){
            if(!this.role.roleId){
                this.$message.error("请选择角色")
                return;
            }
            //console.log(this.role.roleId)
            this.$request.post('sysMenuRole/update',{
                roleId:this.role.roleId[1],
                menuIds:this.menuIds.toString()
            },res=>{
                if(res.result == '1'){
                    this.$message("更新成功")
                }
            })
        }
    }
}
</script>

