<template>
    <Household :requestUrl="requestUrl"></Household>
</template>
<script>
import Household from './Household';
export default {
    data(){
        return{
            requestUrl:{
                list:'lodgedPopulation/listPage',
                insert:'lodgedPopulation/insert',
                update:'lodgedPopulation/update',
                find:'lodgedPopulation/find'

            }
        }
    },
    components:{
        Household
    }
}
</script>

