<template>
    <div class="menu iconfont">
        <el-menu
            default-active="2"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            background-color="#333333"
            text-color="#fff"
            active-text-color="#0079fe">
            <el-submenu v-for="(item,index) in menu" :key="index" :index="item.index.toString()" >
                <template slot="title">
                    <i :class="item.icon" style="font-size:24px;"></i>
                    <span>{{item.name}}</span>
                </template>
                <div v-for="(items,indexs) in item.child" :key="indexs">
                    <el-submenu v-if="items.child" :index="items.index.toString()">
                        <template slot="title">{{items.name}}</template>
                        <el-menu-item v-show="showIndex.in_array(items.index)" :index="child.index.toString()" v-for="(child,childindex) in items.child" :route="child.router" :key="childindex">{{child.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else @click="select(items.nav)" v-show="showIndex.in_array(items.index)" :route="items.router" :index="items.index.toString()" >{{items.name}}</el-menu-item>
                
                </div>
                
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
Array.prototype.in_array = function (element) {
　　for (var i = 0; i < this.length; i++) {
　　　　if (this[i] == element) {
　　　　　　return true;
　　}
　}
　　return false;
}
export default {
    data(){
        return {
            showIndex:[]
        }
    },
    mounted(){
        this.getRole();
    },
    props:['menu'],
    methods: {
      getRole(){
          var roleId = localStorage.getItem("roleId") || "";
          var _this = this;
          if(roleId){
              this.$request.get("sysMenuRole/findByRoleId?roleId="+roleId,{},function(res){
                  if(res.result == '1'){
					  
                      _this.showIndex = res.data.menuIds.split(",");
					  
                  }
              })
          }
      },
      handleOpen(key, keyPath) {
      },
      select(nav){
      }
    }
}
</script>
<style>
.menu{
    height: 100%;
    background: #333;
    bottom: 0;
    overflow: auto;
    border-right:1px solid #e6e6e6; 
}
.menu::-webkit-scrollbar {
        display: none;
    }
.el-submenu .el-menu,.el-submenu .el-menu-item{
    background-color: rgba(102, 102, 102, 1) !important;
}

.el-menu-item:focus{
    background-color:#0079fe !important; 
    color: #fff !important;
}
 .el-menu-item:hover{
    color: rgba(59, 177, 156, 1) !important;
}
</style>


