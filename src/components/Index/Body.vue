<template>
    <main class="main">
            <menus class="menu" :menu="menu"></menus>
            <div class="content">
                <content>
                    <navs></navs>
                    <router-view></router-view>    
                </content> 
            </div>
        </main>
</template>
<script>
import { mapMutations } from 'vuex'
import navs from '../component/nav.vue'
import menus from './menu.vue'
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
    mounted(){
        this.getlistForTree()
    },
    watch:{
        $route(to,form){
            if(to.name == 'addPlace') this.AddAddressFormData({});
            if(to.name == 'AddHouse') this.AddPersonFormData({});
            this.AddNav(to.meta.nav);
        }
    },
    methods:{
        ...mapMutations([
            'AddNav',
            'AddPersonFormData',
            'AddAddressFormData'
        ]),
        getlistForTree(){
            this.$request.get('sysMenu/listForTree',{},res=>{
                var data = res.data;
                for (let index = 0; index < data.length; index++) {
                    if(data[index].title == '数据中心'){
                        this.menu = data[index].child;
                    }
                }
               
            })
        }
    }
}
</script>

<style>
.main{
    position: absolute;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
}
.main .menu{
    min-width: 200px;
    flex: 2;
}

.main .content{
    flex: 18;
    overflow: auto;
    bottom: 0;
    position: relative;
}
content::-webkit-scrollbar {
        display: none;
    }
</style>
