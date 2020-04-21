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
import navs from '../../component/nav.vue'
import menus from '../../Index/menu.vue'
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
                    if(data[index].title == 'GIS应用'){
						
                        this.menu = data[index].child;
						
                    }
                    
                }
				//console.log( this.menu )
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

.map-right{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
}

.right-menu{
    position: absolute;
    padding: 10px 0 0 10px;
    height: 100%;
    width: 19%;
    left: 80%;
    overflow: auto;
	background-color: #fff;
}
.box-card{
    width: 300px;
    position: absolute;
    left: 0;
    top: 200px;
    background: #eeeeee;
}
.box-card .headers{
    line-height: 50px;
    text-align: center;
    background: #199ed8;
    color: #fff;
}
.box-card .text{
    background: #fff;
    line-height: 50px;
    font-size: 16px;
    margin: 4px;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    color: #666666;
}
.box-card .text span{
    margin-left: 15px;
    letter-spacing: 4px
}

.persionList li{
    padding: 4px;
    font-size: 14px;
    color: #999;
    border-top: 1px solid #ccc;
}
.persionList li span{
    cursor: pointer;
}
.persionList li:nth-of-type(2n){
    background: rgb(244, 250, 255);
}
.persionList li img{
    margin: 0px 5px 5px 20px;
    width: 20px;
}
.persionList li p:nth-of-type(2){
    margin-top: 15px;
    display: flex;
    align-items: center;
    color: #00a5ff;
}
.map-right .dialogInfo{
    line-height: 40px;
    display: inline-block;
    box-shadow: 1px 1px 2px #666;
    position: relative;
    padding: 0px 30px;
    border-radius: 4px;
    overflow: hidden;
    margin: 4px 0;
}
.map-right .dialogInfoImg{
    width: 60px;
    float: right;
}
.box-card .text .bg,.map-right .dialogInfo .bg{
    margin-left: 0;
    position: absolute;
    display: inline-block;
    width: 3px;
    height: 100%;
    background: #199ed8;
    left: 0;
}
#container1{
    position: absolute;
    margin-left: 0;
    bottom: 0;
    left: 0;
    top: 0px;
}
</style>
