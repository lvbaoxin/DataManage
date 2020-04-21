<template>
    <div class="pad10" style="padding:20px;">
        
        <el-form :inline="true" label-position="top" label-width="80px" ref="AddressForm" :rules="rules" :model="AddressForm">
            <el-form-item label="场地类型">
                <el-select class="oinput" @change="checkId" v-model="AddressForm.placeType" placeholder="请选择场地类型">
                    <el-option
                    v-for="item in this.GLOBAL.select.placeClass"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('placeName')>=0" label="场所名称：" prop="placeName">
                <el-input class="oinput" v-model="AddressForm.placeName" placeholder="请输入场所名称"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('placeRemark')>=0" label="场所描述：" prop="placeRemark">
                <el-input class="oinput" v-model="AddressForm.placeRemark	" placeholder="请输入场所描述"></el-input>
            </el-form-item>
            
            <el-form-item v-if="showAddressForm.indexOf('placeAddress')>=0" label="场所地址：" prop="placeAddress">
                <el-input class="oinput" v-model="AddressForm.placeAddress" placeholder="请输入场所地址"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('placeTelephone')>=0" label="办公电话：" prop="placeTelephone" >
                <el-input type="number" class="oinput" v-model="AddressForm.placeTelephone" placeholder="请输入办公电话"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('teacherNum')>=0"  label="教师人数："  prop="teacherNum">
                <el-input type="number" class="oinput" v-model="AddressForm.teacherNum" placeholder="请输入教师人数"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('studentNum')>=0" label="学生人数："  prop="studentNum">
                <el-input type="number" class="oinput" v-model="AddressForm.studentNum" placeholder="请输入学生人数"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('boyNum')>=0" label="男生数量：" prop="boyNum">
                <el-input type="number" class="oinput" v-model="AddressForm.boyNum" placeholder="请输入男生数量"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('grileNum')>=0" label="女生数量：" prop="grileNum">
                <el-input type="number" class="oinput" v-model="AddressForm.grileNum" placeholder="请输入女生数量"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('classroomArea')>=0" label="教室面积：" prop="classroomArea">
                <el-input class="oinput" v-model="AddressForm.classroomArea" placeholder="请输入教室面积"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('bedroomArea')>=0" label="寝室面积：">
                <el-input class="oinput" v-model="AddressForm.bedroomArea" placeholder="请输入寝室面积"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('isBasement')>=0" label="是否存在地下场所" prop="isBasement">
                <el-select class="oinput" v-model="AddressForm.isBasement" placeholder="请选择是否存在地下场所 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.isOrNo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('undergroundArea')>=0" label="地下面积：" prop="undergroundArea">
                <el-input class="oinput"  v-model="AddressForm.undergroundArea" placeholder="请输入地下面积"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('undergroundFloor')>=0" label="地下层数：">
                <el-input class="oinput" v-model="AddressForm.undergroundFloor" placeholder="请输入地下层数"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('groundFloor')>=0" label="地上层数：" prop="groundFloor">
                <el-input class="oinput" v-model="AddressForm.groundFloor" placeholder="请输入地上层数"></el-input>
            </el-form-item>
            
            <el-form-item v-if="showAddressForm.indexOf('isUnsafe')>=0" label="有无安全隐患：" prop="isUnsafe" >
                <el-select class="oinput" v-model="AddressForm.isUnsafe" placeholder="请选择有无安全隐患 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.isOrNo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item v-if="showAddressForm.indexOf('gridName')>=0" label="所属网格：" prop="gridName">
                <el-select class="oinput" v-model="AddressForm.gridName" placeholder="请选择所属网格 ">
                    <el-option
                    v-for="item in this.GLOBAL.select.grid"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('buildingName')>=0" label="建筑物名称：" prop="buildingName">
                <el-input class="oinput" v-model="AddressForm.buildingName" placeholder="请输入建筑物名称"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('buildingUnderground')>=0" label="建筑结构：" prop="buildingUnderground">
                <el-input class="oinput" v-model="AddressForm.buildingUnderground" placeholder="请输入建筑结构"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('contacter')>=0" label="联系人：" prop="contacter">
                <el-input class="oinput" v-model="AddressForm.contacter" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('scopeOperation')>=0" label="经营范围：" prop="scopeOperation">
                <el-input class="oinput" v-model="AddressForm.scopeOperation" placeholder="请输入经营范围"></el-input>
            </el-form-item>
            
			<!-- 新加 -->
			<!-- <el-form-item v-if="showAddressForm.indexOf('placeCategory')>=0" label="场所分类：" prop="placeCategory">
			    <el-input class="oinput" readonly v-model="AddressForm.placeCategory" value="重点场所"></el-input>
			</el-form-item> -->
			
			<el-form-item v-if="showAddressForm.indexOf('placeCategory')>=0" label="场所分类：" prop="placeCategory">
			    <el-select class="oinput" v-model="AddressForm.placeCategory" placeholder="请选择场所分类 ">
			        <el-option key='1' value="重点场所" label="重点场所"></el-option>
			    </el-select>
			</el-form-item>
			
			
			<el-form-item v-if="showAddressForm.indexOf('villageName')>=0" label="小区名称：" prop="villageName">
			    <el-input class="oinput" v-model="AddressForm.villageName" placeholder="请输入小区名称"></el-input>
			</el-form-item>
			<el-form-item v-if="showAddressForm.indexOf('buildingArea')>=0" label="建筑面积：" prop="buildingArea">
			    <el-input class="oinput" v-model="AddressForm.buildingArea" placeholder="请输入建筑面积"></el-input>
			</el-form-item>
			<el-form-item v-if="showAddressForm.indexOf('buildingFloor')>=0" label="楼层数：" prop="buildingFloor">
			    <el-input class="oinput" v-model="AddressForm.buildingFloor" placeholder="请输入楼层数"></el-input>
			</el-form-item>
			<el-form-item v-if="showAddressForm.indexOf('unitNum')>=0" label="单元数：" prop="unitNum">
			    <el-input class="oinput" v-model="AddressForm.unitNum" placeholder="请输入单元数"></el-input>
			</el-form-item>
			<el-form-item v-if="showAddressForm.indexOf('families')>=0" label="楼栋户数：" prop="families">
			    <el-input class="oinput" v-model="AddressForm.families" placeholder="请输入楼栋户数"></el-input>
			</el-form-item>
			<el-form-item v-if="showAddressForm.indexOf('manager')>=0" label="楼长姓名：" prop="manager">
			    <el-input class="oinput" v-model="AddressForm.manager" placeholder="请输入楼长姓名"></el-input>
			</el-form-item>
			<el-form-item v-if="showAddressForm.indexOf('idCard')>=0" label="楼长身份证号码：" prop="idCard">
			    <el-input class="oinput" v-model="AddressForm.idCard" placeholder="请输入楼长身份证号码"></el-input>
			</el-form-item>
			
			<!-- end -->
            <el-form-item v-if="showAddressForm.indexOf('hospitalClass')>=0" label="医院级别：" prop="hospitalClass">
                <el-input type="input" v-model="AddressForm.hospitalClass" placeholder="请输入医院级别"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('hospitalOwnership')>=0" label="医院所有制性质" prop="hospitalOwnership">
                <el-input type="input" v-model="AddressForm.hospitalOwnership" placeholder="请输入医院所有制性质"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('serviceType')>=0" label="服务类别：" prop="serviceType">
                <el-input type="input" v-model="AddressForm.serviceType" placeholder="请输入服务类别"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('legalRepresentative')>=0" label="法人代表：" prop="legalRepresentative">
                <el-input type="input" v-model="AddressForm.legalRepresentative" placeholder="请输入法人代表"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('galleryfulNum')>=0" label="容纳人数：" prop="galleryfulNum">
                <el-input  type="number" v-model="AddressForm.galleryfulNum" placeholder="请输入容纳人数"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('workNum')>=0" label="工作人员人数：" prop="workNum">
                <el-input type="input" v-model="AddressForm.workNum" placeholder="请输入工作人员人数"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('gpsx')>=0" label="经度：" prop="gpsx">
                <el-input type="input" v-model="AddressForm.gpsx" placeholder="请输入经度"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('gpsy')>=0" label="纬度：" prop="gpsy">
                <el-input type="input" v-model="AddressForm.gpsy" placeholder="请输入纬度"></el-input>
            </el-form-item>
            <el-form-item v-if="showAddressForm.indexOf('placeArea')>=0" label="场所占地面积：" prop="placeArea">
                <el-input type="input" v-model="AddressForm.placeArea" placeholder="请输入场所占地面积"></el-input>
            </el-form-item>
            <div style="margin:20px auto;text-align:center;">
                <el-form-item size="large" >
                    <el-button type="primary" @click="submit('AddressForm')">提交</el-button>
                    <el-button @click="reset(AddressForm)">重置</el-button>
                </el-form-item>
            </div>
            
        </el-form>
        
        
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
       
        return {
            rules: {
                placeName:[
                    { required: true, message: '请输入场所名称', trigger: 'blur' }
                ],
            },
            schoolYouErY:['gridName','placeAddress','placeTelephone','placeArea','teacherNum','studentNum','boyNum','grileNum','classroomArea','bedroomArea','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
            hospistal:['buildingName','placeAddress','hospitalClass','hospitalOwnership','placeArea','buildingUnderground','workNum','contacter','placeTelephone','isUnsafe','isBasement','undergroundArea','undergroundFloor','groundFloor','placeRemark'],
            buiness:['gridName','placeAddress','buildingName','buildingUnderground','placeArea','placeTelephone','isBasement','undergroundArea','undergroundFloor','groundFloor','scopeOperation','isUnsafe','placeRemark'],
            Car:['gridName','buildingName','placeAddress','groundFloor','placeArea','contacter','placeTelephone','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
            service:['gridName','buildingName','serviceType','legalRepresentative','contacter','placeTelephone','galleryfulNum','placeArea','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
            other:['gridName','placeAddress','buildingName','placeArea','placeTelephone','workNum','isUnsafe','contacter','undergroundArea','undergroundFloor','groundFloor','isBasement','placeRemark'],
            wenti:['gridName','buildingName','placeAddress','placeArea','contacter','placeTelephone','isBasement','undergroundArea','undergroundFloor','groundFloor','isUnsafe','placeRemark'],
            dang:['gridName','placeAddress','placeArea','placeTelephone','workNum','isUnsafe','contacter','undergroundArea','undergroundFloor','groundFloor','isBasement','placeRemark'],
			building:['placeName','placeAddress','buildingName','placeCategory','placeType','villageName','buildingArea','buildingFloor','groundFloor','undergroundFloor','unitNum','families','manager','idCard']
		}      
    },
    computed:{
        ...mapState([
            'showAddressForm',
            'AddressForm'
        ])
    },
    props:[
        'isUpdate'
    ],
    mounted:function(){
        
    },
    methods:{
        ...mapMutations([
            'AddshowAddressForm'
        ]),
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
            for(var key in this.AddressForm){
                if(this.AddressForm[key]){
                    postObj[key] = this.AddressForm[key];
                }
            }
            var _this = this;
            if(this.isUpdate == '1'){
                var postUrl = '/zzPlace/update'
            }else{
                var postUrl = '/zzPlace/insert'
            }
            
            this.$request.post(postUrl,{...postObj},function(res){
				//console.log(res)
                if(res.result == 1){
                    _this.$message('操作成功');
                    _this.reset(this.AddressForm)
                }else{
                    _this.$message.error(res.msg);
                }

            })
        },
        checkId(id){
            this.reset(this.AddressForm)
            switch (id) {
                case '幼儿园':
                    this.showTabel = this.schoolYouErY;
                    break;
                case '学校':
                    this.showTabel = this.schoolYouErY;
                    break;
                case '商业场所':
                    this.showTabel = this.buiness;
                    break;
                case '医院':
                    this.showTabel = this.hospistal;
                    break;
                case '车站码头':
                    this.showTabel = this.Car;
                    break;
                case '服务场所':
                    this.showTabel = this.service;
                    break;
                case '宗教场所':
                    this.showTabel = this.other;
                    break;
                case '党政机关':
                    this.showTabel = this.dang;
                    break;
                case '文体活动场所':
                    this.showTabel = this.wenti;
                    break;
                case '地下场所':
                    this.showTabel = this.other;
                    break;
				case '楼':
					this.showTabel = this.building;
					break;
                default:
                    break;
            }
            this.AddshowAddressForm(this.showTabel);
        },
        reset(object){
            for (const key in object) {
                if(key != 'placeType'){
                    if (object.hasOwnProperty(key)) {
                        object[key] = '';
                    }
                }   
            }
        }
    }
}
</script>

