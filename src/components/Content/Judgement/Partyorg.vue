<template>
    <div class="pad10">
        <el-tabs type="border-card">
            <el-tab-pane label="党员学历分析">
                <Pie :parameter="parameter"></Pie>
                <Bar :parameter="parameter1"></Bar>
            </el-tab-pane>
        <!--    <el-tab-pane label="党员在职/退休" :lazy="true">
				
			</el-tab-pane>
            <el-tab-pane label="志愿者组织中退休党员分析" :lazy="true">
				
			</el-tab-pane> -->
            <el-tab-pane label="党员年龄分析" :lazy="true">
                <Bar :parameter="parameter2"></Bar>
            </el-tab-pane>
            <el-tab-pane label="党员男女率比例分析" :lazy="true">
                <Bar :parameter="parameter3"></Bar>
            </el-tab-pane>
            <el-tab-pane label="志愿组织党员/非党员比例" :lazy="true">
                <Pie :parameter="parameter6"></Pie>
                <Bar :parameter="parameter7"></Bar>
            </el-tab-pane>
			  <el-tab-pane label="外出务工" :lazy="true">
			    <Bar :parameter="parameter8" :labelwidth='parameter8.width' :labelheigth='parameter8.heigth'></Bar>
			</el-tab-pane>
        </el-tabs>
      <!--  <div class="mart-10">
            <Bar :parameter="parameter4"></Bar>
            <Bar :parameter="parameter5"></Bar>
        </div> -->
    </div>
</template>
<script>
import Pie from '../../component/charts/Pie'
import Bar from '../../component/charts/Bar'
export default {
    data(){
        return{
            parameter:{
                id:'wenhua1',
                showlabl:true,
                stack:false,
                url:'zzPartyMember/listQuaForPie',
                title:'腾鳌镇党员文化程度比例图'
            },
            parameter1:{
                id:'wenhua2',
                stack:false,
                url:'zzPartyMember/listQuaForBar',
                title:'腾鳌镇党员文化程度情况统计图'
            },
            parameter2:{
                id:'age',
                stack:false,
                url:'zzPartyMember/listAgeForBar',
                title:'腾鳌镇党员年龄结构统计图'
            },
            parameter3:{
                id:'sex',
                stack:true,
                url:'zzPartyMember/listSexForBar',
                title:'腾鳌镇男女党员数量的比率统计图'
            },
            parameter4:{
                id:'dang',
                stack:false,
                vertical:true,
                url:'zzOrg/listHQForBar',
                title:'腾鳌镇基层党总部党支部数量统计图'
            },
            parameter5:{
                id:'zhiyuanzhe',
                stack:false,
                vertical:true,
                url:'zzOrg/listVoForBar',
                title:'腾鳌镇基层党总部党支部数量统计图'
            },
            parameter6:{
                id:'isDangBing',
                stack:false,
                showlabl:true,
                url:'zzOrg/listPamVoForPie',
                title:'腾鳌镇志愿组织中党员/非党员数量比例图'
            },
            parameter7:{
                id:'isDangZhu',
                stack:false,
                url:'zzOrg/listPamVoForBar',
                title:'腾鳌镇党员/非党员情况统计图'
            },
			parameter8:{
			    id:'wcwg0',
			    stack:false,
			    url:'zzHoseholdPopulation/listPaWugongCntForBar',
			    title:'外出务工统计图',
				width:'100%',
				heigth:600
			},
        }
        
    },
    mounted:function(){
    },
    components:{
        Pie,Bar
    },
    methods:{
        
    }
}
</script>
<style>

</style>


