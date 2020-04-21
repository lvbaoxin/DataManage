<template>
    <div class="pad10" style="padding:20px;">
        
        <el-form :inline="true" label-position="top" label-width="80px" ref="partyData" :rules="rules" :model="partyData">
            
            <el-form-item label="党员名称:" prop="personName">
                <el-input class="oinput" v-model="partyData.personName" placeholder="请输入内部编号"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select class="oinput" v-model="partyData.sex" placeholder="请选择性别 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民族：" prop="nation">
                <el-select class="oinput" v-model="partyData.nation" placeholder="请选择民族 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Nation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公民身份号码：" prop="idCard">
                <el-input class="oinput" v-model="partyData.idCard" placeholder="请输入公民身份号码"></el-input>
            </el-form-item>
            <el-form-item label="出生日期：">
                <el-date-picker
                class="oinput"
                v-model="partyData.birth"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="文化程度：" prop="qualifications">
                <el-select class="oinput" v-model="partyData.qualifications" placeholder="请选择文化程度  ">
                    <el-option
                    v-for="item in this.GLOBAL.select.Culture"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员类别：" prop="pmType">
                <el-select class="oinput" v-model="partyData.pmType" placeholder="请选择人员类别">
                    <el-option
                    v-for="item in this.GLOBAL.select.personStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在党支部（填写全称）：" prop="pmPartyBranch">
                <el-input class="oinput" v-model="partyData.pmPartyBranch" placeholder="请输入所在党支部"></el-input>
            </el-form-item>
            <el-form-item label="加入党组织日期：">
                <el-date-picker
                class="oinput"
                v-model="partyData.joinTime"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="转为正式党员日期：">
                <el-date-picker
                class="oinput"
                v-model="partyData.becomeFullMember"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="工作岗位：" prop="occupationCategory">
                <el-input class="oinput" v-model="partyData.occupationCategory" placeholder="请输入工作岗位"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="mobile">
                <el-input class="oinput" v-model="partyData.mobile" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            
            <el-form-item label="固定电话：" prop="telephone">
                <el-input class="oinput"  v-model="partyData.telephone" placeholder="请输入固定电话"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址：" prop="domicileAddress">
                <el-input class="oinput"  v-model="partyData.domicileAddress" placeholder="请输入家庭住址"></el-input>
            </el-form-item>
            <el-form-item label="党籍状态：">
                <el-select class="oinput" v-model="partyData.memberStatu" placeholder="请选择党籍状态">
                    <el-option
                    v-for="item in this.GLOBAL.select.dangjiStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="是否为失联党员：">
                <el-select class="oinput" v-model="partyData.isFloatingMember" placeholder="请选择是否为失联党员">
                    <el-option
                    v-for="item in this.GLOBAL.select.isOrNo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为流动党员：">
                <el-select class="oinput" v-model="partyData.isFloatingMember" placeholder="请选择是否为流动党员">
                    <el-option
                    v-for="item in this.GLOBAL.select.isOrNo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="外出流向省：" prop="mobile">
                <el-input class="oinput" v-model="partyData.outflowProvince" placeholder="请输入外出流向省"></el-input>
            </el-form-item>
            <el-form-item label="外出流向市：" prop="telephone">
                <el-input class="oinput"  v-model="partyData.outflowCity" placeholder="请输入外出流向市"></el-input>
            </el-form-item>
            <el-form-item label="外出流向县，地区：" prop="telephone">
                <el-input class="oinput"  v-model="partyData.outflowArea" placeholder="请输入外出流向县，地区"></el-input>
            </el-form-item>
            
            
            <div style="margin:20px auto;text-align:center;">
                <el-form-item size="large" >
                    <el-button type="primary" @click="submit('partyData')">提交</el-button>
                    <el-button @click="reset('partyData')">重置</el-button>
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
            
            rules: {
                personName:[
                    { required: true, message: '请输入党员名称', trigger: 'blur' }
                ],
                nation:[
                    { required: true, message: '选择民族', trigger: 'change' }
                ],
                idCard:[
                    { required: true, message: '请输入公民身份证号码', trigger: 'blur' }
                ]
                
            },
        }
        
    },
    props:['isUpdate'],
    computed:{
        ...mapState([
            'partyData'
        ])
    },
    mounted:function(){
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
            for(var key in this.partyData){
                if(this.partyData[key]){
                    postObj[key] = this.partyData[key];
                }
            }
            var _this = this;
            if(this.isUpdate == '1'){
                var postUrl = '/zzPartyMember/update'
            }else{
                var postUrl = '/zzPartyMember/insert'
            }
			postObj.becomeFullMember = postObj.becomeFullMember+' 00:00:00'
			postObj.birth = postObj.birth+' 00:00:00'
			postObj.createTime = postObj.createTime+' 00:00:00'
			postObj.importDate = postObj.importDate+' 00:00:00'
			postObj.modifyTime = postObj.modifyTime+' 00:00:00'
			postObj.joinTime = postObj.joinTime+' 00:00:00'
            this.$request.post(postUrl,{...postObj},function(res){
                if(res.result == 1){
                    _this.$message('操作成功');
                    _this.reset('partyData')
                    _this.$emit('updateSuccess');
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
