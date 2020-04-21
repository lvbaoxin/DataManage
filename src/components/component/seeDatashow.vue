<!-- 点击查看数据弹框-->
<template>
    <el-dialog :visible.sync="diaVisible" @close="close" width="70%">
        <p class="dialogTitle"><i class="el-icon-star-on"></i>实有人口详细信息</p>
        <ul class="dialogList clearfix">
            <!-- <li class="fl">
                <p>户号</p>
                <p>{{seeDataVal.householdNumber}} </p>
            </li> -->
            <li class="fl">
                <p>公民身份证号码</p>
                <p class="lineAuto">{{seeDataVal.idCard}} </p>
            </li>
            <!-- <li class="fl">
                <p>户主姓名</p>
                <p> {{seeDataVal.householder}}</p>
            </li> -->
            <li class="fl">
                <p>居住人姓名</p>
                <p> {{seeDataVal.personName}}</p>
            </li>
            <!-- <li class="fl">
                <p>居住关系</p>
                <p> {{seeDataVal.relations}}</p>
            </li> -->
            <!-- <li class="fl">
                <p>房屋权属</p>
                <p> {{seeDataVal.houseOwnership}}</p>
            </li> -->
            <li class="fl">
                <p>性别</p>
                <p>{{seeDataVal.sex}}</p>
            </li>
            <li class="fl">
                <p>出生日期</p>
                <p>{{seeDataVal.birth}}</p>
            </li>
            <li class="fl">
                <p>死亡日期</p>
                <p>{{seeDataVal.deathTime}}</p>
            </li>
            <li class="fl">
                <p>民族</p>
                <p>{{seeDataVal.nation}}</p>
            </li>
            <li class="fl">
                <p>籍贯</p>
                <p>{{seeDataVal.nativePlace}}</p>
            </li>
            <li class="fl">
                <p>婚姻状况</p>
                <p>{{seeDataVal.maritalStatus}}</p>
            </li>
            <li class="fl">
                <p>政治面貌</p>
                <p>{{seeDataVal.politicalStatus}}</p>
            </li>
            <li class="fl">
                <p>特长</p>
                <p>{{seeDataVal.skills}}</p>
            </li>
			 <li class="fl">
			    <p>是否低保</p>
			    <p>{{seeDataVal.isDibao}}</p>
			</li>
			 <li class="fl">
			    <p>是否大病</p>
			    <p>{{seeDataVal.isDabing}}</p>
			</li>
			 <li class="fl">
			    <p>是否外出务工</p>
			    <p>{{seeDataVal.isWaichuwugong}}</p>
			</li>
            <li class="fl">
                <p>职业现状</p>
                <p>{{seeDataVal.occupationStatus}}</p>
            </li>
            <li class="fl">
                <p>联系电话</p>
                <p>{{seeDataVal.contact}}</p>
            </li>
            <li class="fl">
                <p>工作单位</p>
                <p>{{seeDataVal.servicePlace}}</p>
            </li>
            <!-- <li class="fl">
                <p>户籍状况</p>
                <p>{{seeDataVal.registryConsistency}}</p>
            </li>
            <li class="fl">
                <p>详细地址</p>
                <p>{{seeDataVal.domicileAddress}}</p>
            </li> -->
			<li class="fl">
			    <p>详细地址</p>
			    <template slot-scope="scope">
			    	<el-button @click="see(scope.row)" type="text" size="small">查看</el-button>			    	
			    </template>
			</li>
            <li class="fl">
                <p>租住时间</p>
                <p>{{seeDataVal.tenancyTime}}</p>
            </li>
            <li class="fl">
                <p>暂住人数</p>
                <p>{{seeDataVal.populations}}</p>
            </li>
            <li class="fl">
                <p>文化程度</p>
                <p>{{seeDataVal.qualifications}}</p>
            </li>
			<seeData :Visible="dialogTabelVisible" :seeDataVal="seeDataVal" @close="dialogTabelVisible=false"></seeData>
        </ul>
    </el-dialog>

</template>
<script>
	
export default {
    props:['Visible','title','seeDataVal'],
    watch:{
        Visible(){
            this.diaVisible = this.Visible
        }
    },
    data(){
        return{
            diaVisible:false,
			dialogTabelVisible: false,
			seeDataVal: {}
        }
    },
    methods:{
        close:function(){
            this.$emit('close')
        }
    }
}
</script>
<style>
.dialogTitle{
    padding: 10px;
    border: 1px dashed #f1f1f1;
    color: #000;
    font-weight: bold;
    margin-bottom: 10px;
}
.dialogTitle i{
    margin-right: 5px;
}
.dialogList{
    display: flex;
    flex-wrap: wrap;
}
.dialogList li P{
    min-width: 120px;
    height: 30px;
    padding: 10px 10px;
    line-height: 30px;
    text-align: center;
    border-right:1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3; 
    word-break: break-all;
}
.dialogList li P:nth-of-type(1){
    
    background: #f5f5f5;
}
.dialogList li P:nth-of-type(2){
    color: #000;
}
.lineAuto{
    line-height: 20px !important;
}
</style>

