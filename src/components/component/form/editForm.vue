<template>
    <div class="pad10">
        <el-form :inline="true" label-position="top" label-width="80px" ref="PersonFormData" :rules="rules" :model="PersonFormData">
            <el-form-item label="户号：">
                <el-input v-model="PersonFormData.householdNumber" placeholder="请输入户号"></el-input>
            </el-form-item>
            <el-form-item label="户主姓名：" prop="householder">
                <el-input v-model="PersonFormData.householder" placeholder="请输入户主姓名"></el-input>
            </el-form-item>
            
            <el-form-item label="户主关系：">
                <el-select  @change="changeRelations" v-model="PersonFormData.relations" placeholder="请选择户主关系">
                    <el-option
                    v-for="item in relation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="居住人姓名：" prop="personName" >
                <el-input v-model="PersonFormData.personName" placeholder="请输入居住人姓名"></el-input>
            </el-form-item>
            <el-form-item label="楼栋地址：" prop="buildingPlace" >
                <el-input v-model="PersonFormData.buildingPlace" placeholder="请输入楼栋地址"></el-input>
            </el-form-item>
            <el-form-item label="房屋权属：">
                <el-select v-model="PersonFormData.houseOwnership" placeholder="请选择房屋权属">
                    <el-option
                    v-for="item in Ownership"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="户籍状况：">
                <el-select v-model="PersonFormData.registryConsistency" placeholder="请选择户籍状况 ">
                    <el-option
                    v-for="item in Status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select v-model="PersonFormData.sex" placeholder="请选择性别 ">
                    <el-option
                    v-for="item in Sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文化程度：" prop="qualifications">
                <el-select v-model="PersonFormData.qualifications" placeholder="请选择文化程度  ">
                    <el-option
                    v-for="item in Culture"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系电话：" prop="contact">
                <el-input v-model="PersonFormData.contact" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="政治面貌：">
                <el-select v-model="PersonFormData.politicalStatus" placeholder="请选择政治面貌">
                    <el-option
                    v-for="item in Politics"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民族：" prop="nation">
                <el-select v-model="PersonFormData.nation" placeholder="请选择民族 ">
                    <el-option
                    v-for="item in Nation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公民身份证号：" prop="idCard">
                <el-input @blur="getBirth" v-model="PersonFormData.idCard" placeholder="请输入公民身份证号"></el-input>
            </el-form-item>
            <el-form-item label="出生日期：">
                <el-date-picker
                v-model="PersonFormData.birth"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="死亡日期：">
                <el-date-picker
                v-model="PersonFormData.deathTime"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="婚姻状况：" prop="maritalStatus">
                <el-select v-model="PersonFormData.maritalStatus" placeholder="请选择婚姻状况 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.marry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人户分类情况：" prop="consistencyType">
                <el-select class="oinput" v-model="PersonFormData.consistencyType" placeholder="请选择人户分类情况">
                    <el-option
                    v-for="item in GLOBAL.select.personClass"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
			<!--  -->
			 <el-form-item label="是否低保户：">
			    <el-select class="oinput" v-model="PersonFormData.isDibao" placeholder="请选择">
			        <el-option
			        v-for="item in Whether"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			        </el-option>
			    </el-select>
			</el-form-item>
			 <el-form-item label="是否大病：">
			    <el-select class="oinput" v-model="PersonFormData.isDabing" placeholder="请选择">
			        <el-option
			        v-for="item in Whether"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			        </el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="是否外出务工：">
			    <el-select class="oinput" v-model="PersonFormData.isWaichuwugong" placeholder="请选择">
			        <el-option
			        v-for="item in Whether"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			        </el-option>
			    </el-select>
			</el-form-item>
			<!--  -->
            <el-form-item label="籍贯：" prop="nativePlace" >
                <el-input v-model="PersonFormData.nativePlace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
            <el-form-item label="职业现状：" prop="occupationStatus">
                <el-select v-model="PersonFormData.occupationStatus" placeholder="请选择职业现状 ">
                    <el-option
                    v-for="item in Occupation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="工作单位：">
                <el-input v-model="PersonFormData.servicePlace" placeholder="请输入工作单位"></el-input>
            </el-form-item>
            <el-form-item label="特长：">
                <el-select v-model="PersonFormData.skills" placeholder="请选择特长 ">
                    <el-option
                    v-for="item in Speciality"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="暂住人数：">
                <el-input v-model="PersonFormData.populations" placeholder="请输入暂住人数"></el-input>
            </el-form-item>
            <el-form-item label="租住时间：">
                <el-date-picker
                v-model="PersonFormData.tenancyTime"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            
            
           
            <el-form-item label="详细地址：" prop="domicileAddress">
                <el-input type="textarea" v-model="PersonFormData.domicileAddress" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <div style="margin:20px auto;text-align:center;">
                <el-form-item size="large" >
                    <el-button type="primary" @click="submit('PersonFormData')">提交</el-button>
                    <el-button @click="reset('PersonFormData')">重置</el-button>
                </el-form-item>
            </div>
            
        </el-form>
        
        
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        var checkID = (rule, value, callback)=>{
            if(!this.GLOBAL.check.idCard(value)){
                return callback(new Error('身份证号码填写错误'));
            }
            callback();
        }
        var checkPhone = (rule, value, callback)=>{
            if(!this.GLOBAL.check.phone(value)){
                return callback(new Error('请输入正确的手机号码'));
                
            }
            callback()
        }
        return {
            relation:this.GLOBAL.select.relation,
            Ownership:this.GLOBAL.select.Ownership,
            Culture:this.GLOBAL.select.Culture,
            Politics:this.GLOBAL.select.Politics,
            Occupation:this.GLOBAL.select.Occupation,
            Sex:this.GLOBAL.select.Sex,
            Status:this.GLOBAL.select.Status,
            Nation:this.GLOBAL.select.Nation,
            Speciality:this.GLOBAL.select.Speciality,
			Whether:[
				{
					value: '1',
					label: '是'
				},
				{
					value: '0',
					label: '否'
				}
			],
            rules: {
                idCard: [
                    { validator:checkID,required: true, message: '请输入公民身份证号', trigger: 'blur' }
                ],
                householder: [
                    { required: true, message: '请输入户主姓名', trigger: 'change' }
                ],
                personName: [
                    {  required: true, message: '请输入居住人姓名', trigger: 'change' }
                ],
                nativePlace: [
                    {  required: true, message: '请输入籍贯', trigger: 'change' }
                ],
                qualifications: [
                    {  required: true, message: '请选择文化程度', trigger: 'change' }
                ],
                occupationStatus: [
                    { required: true, message: '请选择职业现状', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                maritalStatus: [
                    { required: true, message: '请选择婚姻状况', trigger: 'change' }
                ],
                nation: [
                    { required: true, message: '请选择民族', trigger: 'change' }
                ],
                domicileAddress: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState([
            'PersonFormData'
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
            for(var key in this.PersonFormData){
                if(this.PersonFormData[key]){
                    postObj[key] = this.PersonFormData[key];
                }
            }
            var _this = this;
            delete postObj.createTime;
            delete postObj.createUser;
            delete postObj.dataRoleId;
            delete postObj.modifyTime;
            delete postObj.modityUser;
			postObj.birth =postObj.birth+' 00:00:00'
			postObj.importDate = postObj.importDate+' 00:00:00'
			for (let s in postObj) {
				if(postObj[s]=='否'){
					postObj[s]=0
				}else if(postObj[s]=='是'){
					postObj[s]=1
				}
			}
            this.$request.post(this.requestUrl.update,{...postObj},function(res){
                if(res.result == 1){
                    _this.$message('操作成功');
                    _this.$emit('success')
                }else{
                    _this.$message.error(res.msg);
                }

            },function(res){
                _this.$message.error('操作失败，请稍后重试');
            })
        },
        //选择“本人”时，户主姓名复制到居住人姓名
        changeRelations(val){
            if(val == '本人'){
                this.PersonFormData.personName = this.PersonFormData.householder;
            }
        },
        getBirth(){
            var birth = this.getBirthdatByIdNo(this.PersonFormData.idCard);
            if(birth){
                this.PersonFormData.birth = birth;
            }
        },
        trim(s){
            return s.replace(/^\s+|\s+$/g, "");
        },
        getBirthdatByIdNo(iIdNo){
            var tmpStr = "";
            var idDate = "";
            var tmpInt = 0;
            var strReturn = "";

            iIdNo = this.trim(iIdNo);

            if ((iIdNo.length != 15) && (iIdNo.length != 18)) {
                strReturn = "输入的身份证号位数错误";
                return;
            }

            if (iIdNo.length == 15) {
                tmpStr = iIdNo.substring(6, 12);
                tmpStr = "19" + tmpStr;
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

                return tmpStr+' 00:00:00';
            }
            else {
                tmpStr = iIdNo.substring(6, 14);
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

                return tmpStr+' 00:00:00';
            }
        },
        reset(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>

</style>
