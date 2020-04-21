<template>
    <div class="pad10">
        <el-form :inline="true" label-position="top" label-width="80px" ref="orgFormData" :rules="rules" :model="orgFormData">
            <el-form-item label="人员编号" prop="teamCode">
                <el-input v-model="orgFormData.teamCode" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="personName">
                <el-input v-model="orgFormData.personName" placeholder="请输入机构描述"></el-input>
            </el-form-item>
            <el-form-item label="公民身份号码">
                <el-input v-model="orgFormData.idCard" placeholder="请输入机构描述"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" >
                <el-select v-model="orgFormData.sex" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民族">
                <el-select v-model="orgFormData.nation" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.Nation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" prop="orgLiaisons" >
                <el-select v-model="orgFormData.politicalStatus" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.Politics"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker
                    v-model="orgFormData.birth"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="级别">
                 <el-input v-model="orgFormData.position" placeholder="请输入级别"></el-input>
            </el-form-item>
            <el-form-item label="职级">
                 <el-input v-model="orgFormData.dutyClass" placeholder="请输入职级"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="duty">
                <el-input v-model="orgFormData.duty" placeholder="请输入职务"></el-input>
            </el-form-item>
            <el-form-item label="职业现状" prop="occupationStatus">
                <el-select v-model="orgFormData.occupationStatus" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.Occupation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="学历">
                 <el-select v-model="orgFormData.qualifications" placeholder="请选择">
                    <el-option
                    v-for="item in this.GLOBAL.select.Culture"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                 <el-input type="number" v-model="orgFormData.mobile" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="telephone">
                 <el-input type="number" v-model="orgFormData.telephone" placeholder="请输入固定电话"></el-input>
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
