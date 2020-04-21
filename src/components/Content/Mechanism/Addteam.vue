<template>
    <div class="pad10" style="padding:20px;">
        
        <el-form :inline="true" label-position="top" label-width="80px" ref="teamData" :rules="rules" :model="teamData">
            
            <el-form-item label="内部编号：" prop="teamId">
                <el-input class="oinput" v-model="teamData.teamId" placeholder="请输入内部编号"></el-input>
            </el-form-item>
            <el-form-item label="人员编号：" prop="teamCode">
                <el-input class="oinput" v-model="teamData.teamCode" placeholder="请输入人员编号"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="personName">
                <el-input class="oinput" v-model="teamData.personName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="公民身份号码：" prop="idCard">
                <el-input class="oinput" v-model="teamData.idCard" placeholder="请输入公民身份号码"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
                <el-select class="oinput" v-model="teamData.sex" placeholder="请选择性别 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民族：" prop="nation">
                <el-select class="oinput" v-model="teamData.nation" placeholder="请选择民族 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Nation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="政治面貌：">
                <el-select class="oinput" v-model="teamData.politicalStatus" placeholder="请选择政治面貌">
                    <el-option
                    v-for="item in Politics"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期：">
                <el-date-picker
                class="oinput"
                v-model="teamData.birth"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="级别：" prop="position">
                <el-input class="oinput" v-model="teamData.position" placeholder="请输入级别"></el-input>
            </el-form-item>
            <el-form-item label="职级：" prop="dutyClass">
                <el-input class="oinput" v-model="teamData.dutyClass" placeholder="请输入职级"></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="duty">
                <el-input class="oinput" v-model="teamData.duty" placeholder="请输入职务"></el-input>
            </el-form-item>
            <el-form-item label="职业现状：" prop="occupationStatus">
                <el-select class="oinput" v-model="teamData.occupationStatus" placeholder="请选择职业现状 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Occupation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="特长：">
                <el-select class="oinput" v-model="teamData.skills" placeholder="请选择特长 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Speciality"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文化程度：" prop="qualifications">
                <el-select class="oinput" v-model="teamData.qualifications" placeholder="请选择文化程度  ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Culture"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系电话：" prop="mobile">
                <el-input class="oinput" v-model="teamData.mobile" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            
            <el-form-item label="固定电话：" prop="telephone">
                <el-input class="oinput"  v-model="teamData.telephone" placeholder="请输入固定电话"></el-input>
            </el-form-item>
            
            <el-form-item label="进入日期：">
                <el-date-picker
                class="oinput"
                v-model="teamData.joinTime"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item label="退出日期：">
                <el-date-picker
                class="oinput"
                v-model="teamData.quitTime"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
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
            Culture:this.GLOBAL.select.Culture,
            Politics:this.GLOBAL.select.Politics,
            Occupation:this.GLOBAL.select.Occupation,
            Status:this.GLOBAL.select.Status,
            teamData:{},
            rules: {
                teamId: [
                    { required: true, message: '请输入内部编号', trigger: 'blur' }
                ],
                teamCode: [
                    { required: true, message: '请输入人员编号', trigger: 'blur' }
                ],
                personName: [
                    {  required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                idCard:[
                    {  required: true, message: '请输入公民身份证号码', trigger: 'blur' }
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
            this.$request.post('/zzOrgTeam/insert',{...postObj},function(res){
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
