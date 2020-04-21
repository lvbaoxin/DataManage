<template>
    <div class="pad10">
        <el-form :inline="true" label-position="top" label-width="80px" ref="orgFormData" :rules="rules" :model="orgFormData">
            <el-form-item label="机构所在单位名称" prop="orgUnitName">
                <el-input v-model="orgFormData.orgUnitName" placeholder="请输入机构所在单位名称"></el-input>
            </el-form-item>
            <el-form-item label="机构所在单位类别" prop="orgUnitType">
                <el-select v-model="orgFormData.orgUnitType" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.orgUnitStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位建立党组织情况">
                <el-input v-model="orgFormData.orgUnitStatus" placeholder="请输入单位建立党组织情况"></el-input>
            </el-form-item>
            <el-form-item label="机构代码或统一社会信用代码" prop="sex" >
                <el-input v-model="orgFormData.orgUnitSocialCreditCode" placeholder="请输入机构代码或统一社会信用代码"></el-input>
            </el-form-item>
            
            <div style="margin:20px auto;text-align:center;">
                <el-form-item size="large" >
                    <el-button type="primary" @click="submit('orgFormData')">提交</el-button>
                    <el-button @click="reset('orgFormData')">重置</el-button>
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
            
            rules: {}
        }
    },
    computed: {
        ...mapState([
            'orgFormData'
        ])
    },
    props:['requestUrl'],
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
            for(var key in this.orgFormData){
                if(this.orgFormData[key]){
                    postObj[key] = this.orgFormData[key];
                }
            }
            var _this = this;
            delete postObj.createTime;
            delete postObj.createUser;
            delete postObj.dataRoleId;
            delete postObj.modifyTime;
            delete postObj.modityUser;
            this.$request.post(this.requestUrl.update,{...postObj},function(res){
                if(res.result == 1){
                    _this.$message('操作成功');
                    _this.reset('orgFormData')
                    _this.$emit('success')
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
