<template>
    <div class="pad10">
        <el-tabs type="border-card">
            <el-tab-pane label="实有人口统计">
                <Pie :parameter="parameter" :labelwidth='parameter.width' :labelheigth='parameter.heigth'></Pie>
                <Bar :parameter="parameter1" :labelwidth='parameter1.width' :labelheigth='parameter1.heigth'></Bar>
            </el-tab-pane>
            <el-tab-pane label="人口总数" :lazy="true">
                <Pie :parameter="parameter2" :labelwidth='parameter2.width' :labelheigth='parameter2.heigth'></Pie>
                <Lines :parameter="parameter3" :labelwidth='parameter3.width' :labelheigth='parameter3.heigth'></Lines>
            </el-tab-pane>
            <el-tab-pane label="男女比率" :lazy="true">
                <Pie :parameter="parameter4" :labelwidth='parameter4.width' :labelheigth='parameter4.heigth'></Pie>
            </el-tab-pane>
            <el-tab-pane label="人口结构" :lazy="true">
                
                <Bar :parameter="parameter5" :labelwidth='parameter5.width' :labelheigth='parameter5.heigth'></Bar>
            </el-tab-pane>
            <el-tab-pane label="老年系数" :lazy="true">
                <Bar :parameter="parameter6" :labelwidth='parameter6.width' :labelheigth='parameter6.heigth'></Bar>
            </el-tab-pane>
			  <el-tab-pane label="外出务工" :lazy="true">
			    <Bar :parameter="parameter7" :labelwidth='parameter7.width' :labelheigth='parameter7.heigth'></Bar>
			</el-tab-pane>
           <!-- <el-tab-pane label="学历性别比" :lazy="true">
            </el-tab-pane>
            <el-tab-pane label="人口流动率" :lazy="true">
            </el-tab-pane> -->
        </el-tabs>
        <div class="mart-10">
        </div>
    </div>
</template>
<script>
import Pie from '../../component/charts/Pie'
import Bar from '../../component/charts/Bar'
import Lines from '../../component/charts/Line'
export default {
    data(){
        return{
            parameter:{
                id:'persionNum',
                stack:false,
                showlabl:true,
                url:'zzHoseholdPopulation/listPoTypeForPie',
                title:'腾鳌镇实有人口数量比例图',
				width:'100%',
				heigth:500
            },
            parameter1:{
                id:'persionNum1',
                stack:false,
                url:'zzHoseholdPopulation/listPoTypeForBar',
                title:'腾鳌镇实有人口情况统计图',
				width:'100%',
				heigth:500
            },
            parameter2:{
                id:'persionAllNum',
                stack:false,
                showlabl:true,
                url:'zzHoseholdPopulation/listPoCntForPie',
                title:'腾鳌镇人口总数量比例图',
				width:'100%',
				heigth:500
            },
            parameter3:{
                id:'persionAllNumLine',
                stack:true,
                url:'zzHoseholdPopulation/listPoCntForLine',
                title:'腾鳌镇人口总量情况统计图',
				width:'100%',
				heigth:500
            },
            parameter4:{
                id:'persionSex',
                stack:false,
                vertical:false,
                showlabl:true,
                url:'zzHoseholdPopulation/listPoSexForPie',
                title:'腾鳌镇男女人口数量比例图',
				width:'100%',
				heigth:500
            },
            parameter5:{
                id:'persionJieG',
                stack:false,
                vertical:false,
                url:'zzHoseholdPopulation/listPoAgeForBar',
                title:'腾鳌镇人口结构统计图',
				width:'100%',
				heigth:600
            },
            parameter6:{
                id:'persionOld',
                stack:false,
                url:'zzHoseholdPopulation/listPoAge65ForBar',
                title:'近年腾鳌镇65岁以上人口占总人口的比率统计图',
				width:'100%',
				heigth:600
            },
			parameter7:{
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
        Pie,Bar,Lines
    },
    methods:{
        
    }
}
</script>
<style>

</style>


