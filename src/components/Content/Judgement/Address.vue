<template>
    <div class="pad10">
        <Pie :parameter="parameter1" :labelwidth='parameter1.width' :labelheigth='parameter1.heigth'></Pie>
        <Bar :parameter="parameter2" :labelwidth='parameter2.width' :labelheigth='parameter2.heigth'></Bar>
    </div>
</template>
<script>
import Pie from '../../component/charts/Pie'
import Bar from '../../component/charts/Bar'
export default {
    components:{
        Pie,Bar
    },
    data(){
        return{
            parameter1:{
                id:'AddressBing',
                stack:false,
                url:'zzPlace/listPlaceTypeForPie',
                title:'腾鳌镇重点场所数量比例图',
				width:'100%',
				heigth:500
            },
            parameter2:{
                id:'AddressZhu',
                stack:false,
                url:'zzPlace/listPlaceTypeForBar',
                title:'腾鳌镇重场所群数量统计图',
				width:'100%',
				heigth:500
            }
        }
    }
}
</script>
