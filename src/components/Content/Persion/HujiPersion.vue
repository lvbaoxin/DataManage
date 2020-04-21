<template>
    <Household :requestUrl="requestUrl"></Household>
</template>
<script>
import Household from './Household';
export default {
    data(){
        return{
            requestUrl:{
                list:'registryPopulation/listPage',
                insert:'registryPopulation/insert',
                update:'registryPopulation/update',
                find:'registryPopulation/find'

            }
        }
    },
    components:{
        Household
    }
}
</script>

