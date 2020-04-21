<template>
    <Household :requestUrl="requestUrl"></Household>
</template>
<script>
import Household from './Household';
export default {
    data(){
        return{
            requestUrl:{
                list:'emptyHangingPopulation/listPage',
                insert:'emptyHangingPopulation/insert',
                update:'emptyHangingPopulation/update',
                find:'emptyHangingPopulation/find'

            }
        }
    },
    components:{
        Household
    }
}
</script>

