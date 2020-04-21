<template>
    <Household :requestUrl="requestUrl"></Household>
</template>
<script>
import Household from './Household';
export default {
    data(){
        return{
            requestUrl:{
                list:'floatingPopulation/listPage',
                insert:'floatingPopulation/insert',
                update:'floatingPopulation/update',
                find:'floatingPopulation/find'

            }
        }
    },
    components:{
        Household
    }
}
</script>

