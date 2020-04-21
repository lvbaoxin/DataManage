<template>
    <div class="pad10">
        <el-form :inline="true" label-position="top" label-width="80px" ref="FormData" :rules="rules" :model="FormData">
            <el-form-item label="组织名称：" prop="orgName">
                <el-input v-model="FormData.orgName" placeholder="请输入组织名称"></el-input>
            </el-form-item>
            <el-form-item label="组织描述：" prop="orgRemark">
                <el-input type="textarea" v-model="FormData.orgRemark" placeholder="请输入组织描述"></el-input>
            </el-form-item>
            <el-form-item label="组织大类别：">
                <el-select v-model="FormData.orgCategory" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.orgCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组织分类：" prop="orgType" >
                <el-input v-model="FormData.orgType" placeholder="请输入组织分类"></el-input>
            </el-form-item>
            <el-form-item label="组织书记：">
                <el-input v-model="FormData.orgSecretary" placeholder="请输入组织书记"></el-input>
            </el-form-item>
            <el-form-item label="组织联系人" prop="orgLiaisons" >
                <el-input v-model="FormData.orgLiaisons" placeholder="请输入组织联系人"></el-input>
            </el-form-item>
            <el-form-item label="组织联系人电话：" prop="orgContact">
                <el-input type="number" v-model="FormData.orgContact" placeholder="请输入组织联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="组织层级：">
                 <el-input v-model="FormData.orgClass" placeholder="请输入组织层级"></el-input>
            </el-form-item>
            <el-form-item label="组织所在地：">
                 <el-input v-model="FormData.orgPlace" placeholder="请输入组织所在地"></el-input>
            </el-form-item>
            <el-form-item label="组织详细地址：" prop="orgAddress">
                <el-input type="textarea" v-model="FormData.orgAddress" placeholder="请输入组织详细地址"></el-input>
            </el-form-item>
            <el-form-item label="成立日期：" prop="startTime">
                <el-date-picker
                    v-model="FormData.startTime"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="注销日期：">
                <el-date-picker
                    v-model="FormData.endTime"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
                
            </el-form-item>
            <el-form-item label="业务指导部门：">
                 <el-input v-model="FormData.guideDept" placeholder="请输入业务指导部门"></el-input>
            </el-form-item>
            <el-form-item label="组织所在单位情况：" prop="orgUnitStatus">
                <el-select v-model="FormData.orgUnitStatus" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.orgUnitStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
           
            <div style="margin:20px auto;text-align:center;">
                <el-form-item size="large" >
                    <el-button type="primary" @click="submit('FormData')">提交</el-button>
                    <el-button @click="reset('FormData')">重置</el-button>
                </el-form-item>
            </div>
            
        </el-form>
        
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            FormData:{
                orgUnitStatus:0
            },
            rules: {}
        }
    },
    methods:{
        submit(formName){
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postData();
                } else {
                    this.$message.error('请完善必填信息');
                    return;
                }
            });
            
        },
        postData(){
            var postObj = {};
            for(var key in this.FormData){
                if(this.FormData[key]){
                    postObj[key] = this.FormData[key];
                }
            }
            var _this = this;
            this.$request.post('/zzOrg/insert',{...postObj},function(res){
                if(res.result == 1){
                    _this.$message('操作成功');
                    _this.$emit('success')
                    _this.reset('FormData')
                }else{
                    _this.$message.error(res.msg);
                }

            },function(res){
                _this.$message.error('操作失败，请稍后重试');
            })
        },
        reset(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>

</style>
