<template>
    <div class="pad10" style="padding:20px;">
        
        <el-form :inline="true" label-position="top" label-width="80px" ref="teamData" :rules="rules" :model="teamData">
            
            <el-form-item label="单位名称:" prop="orgUnitName">
                <el-input class="oinput" v-model="teamData.orgUnitName" placeholder="请输入内部编号"></el-input>
            </el-form-item>
            <el-form-item label="单位类别:" prop="orgUnitType">
                <el-select v-model="teamData.orgUnitType" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.orgUnitStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位建立党组织情况:" prop="orgUnitStatus">
                <el-input class="oinput" v-model="teamData.orgUnitStatus" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="单位的机构代码或统一社会信用代码:" prop="orgUnitSocialCreditCode">
                <el-input class="oinput" v-model="teamData.orgUnitSocialCreditCode" placeholder="请输入公民身份号码"></el-input>
            </el-form-item>
           
            <div style="margin:20px auto;text-align:center;">
                <el-form-item size="large" >
                    <el-button type="primary" @click="submit('teamData')">提交</el-button>
                    <el-button @click="reset('teamData')">重置</el-button>
                </el-form-item>
            </div>
            
        </el-form>
        
        
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        
        return {
            teamData:{},
            rules: {
                orgUnitName: [
                    { required: true, message: '请输入单位名称', trigger: 'blur' }
                ],
                orgUnitType: [
                    { required: true, message: '请输入单位类别', trigger: 'blur' }
                ],
                orgUnitStatus: [
                    {  required: true, message: '请输入单位建立党组织情况', trigger: 'blur' }
                ],
                orgUnitSocialCreditCode:[
                    {  required: true, message: '请输入单位的机构代码或统一社会信用代码', trigger: 'blur' }
                ]
                
            },
        }
        
    },
    watch:{
        '$route': function(){
            this.teamData.orgId = this.$route.params.id;
        }
    },
    
    mounted:function(){
        this.teamData.orgId = this.$route.params.id;
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
            for(var key in this.teamData){
                if(this.teamData[key]){
                    postObj[key] = this.teamData[key];
                }
            }
            var _this = this;
            this.$request.post('/zzOrgUnit/insert',{...postObj},function(res){
                if(res.result == 1){
                    _this.$message('操作成功');
                    _this.reset('teamData')
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
