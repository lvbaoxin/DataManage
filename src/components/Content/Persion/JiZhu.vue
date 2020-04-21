<template>
    <Household :requestUrl="requestUrl"></Household>
</template>
<script>
import Household from './Household';
export default {
    data(){
        return{
            requestUrl:{
                list:'hostFamilyPopulation/listPage',
                insert:'hostFamilyPopulation/insert',
                update:'hostFamilyPopulation/update',
                find:'hostFamilyPopulation/find'

            }
        }
    },
    components:{
        Household
    }
}
</script>

