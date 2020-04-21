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
                id:'SafeBing',
                stack:false,
                showlabl:true,
                url:'zzOrg/listTenThouSoForPie',
                title:'腾鳌镇万人社会组织数量占比图',
				width:'100%',
				heigth:500
            },
            parameter2:{
                id:'SafeZhu',
                stack:false,
                url:'zzOrg/listTenThouSoForBar',
                title:'腾鳌镇万人组织情况统计图',
				width:'100%',
				heigth:500
            }
        }
    }
}
</script>
