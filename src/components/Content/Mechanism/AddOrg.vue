<template>
    <div class="ocontent addHouse">
        <titles :title="'新增机构信息'">
            <span style="color:#999;"><em class="red">*</em> 为必填项</span>
        </titles>
        <orgAddForm @success="success"></orgAddForm>
    </div>
</template>

<script>
import titles from '../../component/title.vue'
import orgAddForm from '../../component/form/orgAddForm.vue'
export default {
    data(){
        return{
            seeDataVal:{}
        }
    },
    components:{
        titles,
        orgAddForm
    },
    methods:{
        success(){
            
        }
    }
    
}
</script>

<style>
.addHouse{
    margin: 0 auto;
}

</style>

