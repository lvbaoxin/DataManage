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
    mounted(){
        this.getlistForTree()
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
    methods:{
        ...mapMutations([
            'AddNav'
        ]),
        getlistForTree(){
            this.$request.get('sysMenu/listForTree',{},res=>{
                var data = res.data;
				//console.log(data)
                for (let index = 0; index < data.length; index++) {
                    if(data[index].title == '统计分析'){
                        this.menu = data[index].child;
						
                    }
                    
                }
               // console.log(res)
            })
        }
    }
}
</script>

<style>
.el-aside {
position: absolute;
bottom: 0;
top: 90px;
}

.judgemain {
position: absolute;
left: 200px;
right: 0;
bottom: 0;
top: 90px;
overflow: auto;
}
.aside{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #333;
}
.aside .parent{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    display: inline-block;

}
.aside .childList{
    text-align: center;
    background: #666;
    color: #fff;
    padding: 10px 0;
}
.aside .childList img{
    width: 50px;

}
   

</style>
