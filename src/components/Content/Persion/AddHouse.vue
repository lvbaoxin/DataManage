<template>
    <div class="ocontent addHouse">
        <titles :title="'新增实有人口信息'">
            <span style="color:#999;"><em class="red">*</em> 为必填项</span>
        </titles>
        <addForm @success="success"></addForm>
    </div>
</template>

<script>
import titles from '../../component/title.vue'
import addForm from '../../component/form/addForm.vue'
export default {
    data(){
        return{
            seeDataVal:{}
        }
    },
    components:{
        titles,
        addForm
    },
    methods:{
        success(){
            this.$router.push('/index/Household')
        }
    }
    
}
</script>

<style>
.addHouse{
    margin: 0 auto;
}

</style>

