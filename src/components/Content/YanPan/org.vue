<template>
    <div class="pad10">
        <BarPolar :parameter="parameter" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <BarPolar :parameter="parameter5" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <Bar :parameter="parameter1" :labelwidth="width" :labelheigth="parameter1.heigth"></Bar>
        <BarPolar :parameter="parameter2" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <BarPolar :parameter="parameter3" :labelwidth="width" :labelheigth="heigth"></BarPolar>
        <BarPolar :parameter="parameter4" :labelwidth="width" :labelheigth="heigth"></BarPolar>
    </div>
</template>
<script>
import Lines from '../../component/charts/Line.vue'
import Bar from '../../component/charts/Bar.vue'
import BarPolar from '../../component/charts/BarPolar.vue'
import Pie from '../../component/charts/Pie.vue'
export default {
    components:{
        Lines,
        Bar,
        BarPolar,
        Pie
    },
    data(){
        return{
			width:'520px',
			heigth:500,
            parameter:{
                id:'listQuaCntYearForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePartyMember/listQuaCntYearForBar',
                title:'近年腾鳌镇党员学历同比统计图'
            },
            parameter1:{
                id:'listPoAgeCntForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePartyMember/listPoAgeCntForBar',
                title:'腾鳌镇党员各年龄段同比统计图',
				heigth:430
            },
            parameter2:{
                id:'listAge65CntMonthForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePartyMember/listAge65CntMonthForBar',
                title:'腾鳌镇65周岁以下党员数量环比统计图'
            },
            parameter3:{
                id:'listJobCntYearForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePartyMember/listJobCntYearForBar',
                title:'近年腾鳌镇党员在职同比统计图'
            },
            parameter4:{
                id:'listJobCntMonthForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePartyMember/listJobCntMonthForBar',
                title:'腾鳌镇在职党员数量环比统计图'
            },
            parameter5:{
                id:'listQuaCntMonthForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePartyMember/listQuaCntMonthForBar',
                title:'近年腾鳌镇党员学历环比统计图'
            }
            
        }
    }
}
</script>

