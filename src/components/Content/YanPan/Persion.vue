<template>
    <div class="pad10">
        <BarPolar :parameter="parameter2" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <Lines :parameter="parameter" :labelwidth="width" :labelheigth="heigth"></Lines>
        <Bar :parameter="parameter3" :labelwidth="width" :labelheigth="270"></Bar>
        <Lines :parameter="parameter1" :labelwidth="width" :labelheigth="heigth"></Lines>
        
        
        <Bar :parameter="parameter4" :labelwidth="width" :labelheigth="heigth"></Bar>
        <Bar :parameter="parameter7" :labelwidth="width" :labelheigth="heigth"></Bar>
        <Bar :parameter="parameter5" :labelwidth="width" :labelheigth="heigth"></Bar>
        <BarPolar :parameter="parameter6" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <BarPolar :parameter="parameter8" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <Lines :parameter="parameter9" :labelwidth="width" :labelheigth="heigth"></Lines>
        <Bar :parameter="parameter10" :labelwidth="width" :labelheigth="heigth">
            <div class="slotchild">
                <el-date-picker
                    v-model="time1"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary marl-20" @click="search(1)">搜索</el-button>
            </div>
        </Bar>
        <Bar :parameter="parameter11" :labelwidth="width" :labelheigth="heigth">
            <div class="slotchild">
                <el-date-picker
                    v-model="time2"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary marl-20" @click="search(2)">搜索</el-button>
            </div>
        </Bar>
    </div>
</template>
<script>
import Lines from '../../component/charts/Line.vue'
import Bar from '../../component/charts/Bar.vue'
import Pie from '../../component/charts/Pie.vue'
import BarPolar from '../../component/charts/BarPolar.vue'
export default {
    components:{
        Lines,
        Bar,
        Pie,
        BarPolar
    },
    data(){
        return{
			width:'500px',
			heigth:340,
            parameter:{
                id:'listPoCntTimeForLine',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoCntTimeForLine',
                title:'腾鳌镇人口总数环比统计图'
            },
            parameter3:{
                id:'listPoAgeCntForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoAgeCntForBar',
                title:'腾鳌镇人口总数同比统计图'
            },
            parameter1:{
                id:'listPoRiseTimeForLine',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoRiseTimeForLine',
                title:'腾鳌镇户籍人口增长率同比统计图'
            },
            parameter2:{
                id:'listPoCntForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoCntForBar',
                title:'腾鳌镇人口总数统计图'
            },
            
            parameter4:{
                id:'listPoSexRateMonthForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoSexRateMonthForBar',
                title:'腾鳌镇人口男女比率环比统计图'
            },
            parameter7:{
                id:'listPoSexRateYearForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoSexRateYearForBar',
                title:'腾鳌镇人口男女比率同比统计图'
            },
            parameter5:{
                id:'listPoAge15CntForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePopulation/listPoAge15CntForBar',
                title:'腾鳌镇人口（0-15岁）环比统计图'
            },
            parameter6:{
                id:'listPoAge65RateYearForBar',
                showlabl:false,
                stack:false,
                url:'studyDeterminePopulation/listPoAge65RateYearForBar',
                title:'腾鳌镇老年系数同比统计图'
            },
            parameter8:{
                id:'listPoAge65RateMonthForBar',
                showlabl:false,
                stack:false,
                url:'studyDeterminePopulation/listPoAge65RateMonthForBar',
                title:'腾鳌镇老年系数同比统计图'
            },
            parameter9:{
                id:'listPoFloatingCntYearForLine',
                showlabl:false,
                stack:false,
                url:'studyDeterminePopulation/listPoFloatingCntYearForLine',
                title:'腾鳌镇近年流动人口数量同比统计图'
            },
            parameter10:{
                id:'listPoBirthCntForBar',
                showlabl:false,
                stack:false,
                url:'studyDeterminePopulation/listPoBirthCntForBar',
                title:'近年腾鳌镇出生人口数量同比趋势图',
                time:''
            },
            parameter11:{
                id:'listPoDeadthCntForBar',
                showlabl:false,
                stack:false,
                url:'studyDeterminePopulation/listPoDeadthCntForBar',
                title:'近年腾鳌镇死亡人口数量同比趋势图',
                time:''
            },
            time1:'',
            time2:''
        }
        
    },
    methods:{
        search(value){
            
            switch (value) {
                case 1:
                    this.parameter10.time = this.time1;
                    break;
                case 2:
                    this.parameter11.time = this.time2;
                    break;
                default:
                    break;
            }
        }
    }
    
}
</script>

