<template>
    <el-container>
        <el-aside width="200px">
            <menus :menu="menu"></menus>
        </el-aside>
        <div class="judgemain">
            <navs></navs>
            <router-view></router-view>  
        </div>
    </el-container>
</template>

<script>
import { mapMutations } from 'vuex'
import menus from '../../Index/menu.vue'
import navs from '../../component/nav.vue'
export default {
    data(){
        return{
            menu:[
                
            ]
        }
        
    },
    components:{
        menus,
        navs
    },
    watch:{
        $route(to,form){
            this.AddNav(to.meta.nav);
        }
    },
    mounted(){
        this.getlistForTree()
    },
    methods:{
        ...mapMutations([
            'AddNav'
        ]),
        getlistForTree(){
            this.$request.get('sysMenu/listForTree',{},res=>{
                var data = res.data;
                for (let index = 0; index < data.length; index++) {
                    if(data[index].title == '决策分析'){
                        this.menu = data[index].child;
                    }
                    
                }
            })
        }
    }
}
</script>

<style>

</style>
