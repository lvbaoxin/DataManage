<template>
    <div class="pad10">
        <Bar :parameter="parameter" :labelwidth="parameter.width" :labelheigth="parameter.heigth">
            <div class="slotchild">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary marl-20" @click="search">搜索</el-button>
            </div>
        </Bar>
        <BarPolar :parameter="parameter1" :labelwidth="parameter1.width" :labelheigth="parameter1.heigth"></BarPolar>
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
            parameter:{
                id:'listPlaceTypeCntYearForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePlace/listPlaceTypeCntYearForBar',
                title:'近年腾鳌镇邻里纠纷数量同比趋势图',
                time:'',
				width:'800px',
				heigth:340
            },
            parameter1:{
                id:'listPlaceTypeCntMonthForBar',
                showlabl:true,
                stack:false,
                url:'studyDeterminePlace/listPlaceTypeCntMonthForBar',
                title:'腾鳌镇重点场所数量环比统计图',
				width:'500px',
				heigth:400
            },
            time:''
            
        }
    },
    methods:{
        search(){
            if(this.time){
                this.parameter.time = this.time;
            }
        }
    }
}
</script>

<style>

</style>
