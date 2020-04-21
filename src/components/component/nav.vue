<template>
    <header class="persison-nav iconfont" v-show="nav.length>0">
        <i class="icon-shouye"></i>
        <div class="nav" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }" >首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item,index) in nav" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
    </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:mapState([
    // 映射 this.count 为 store.state.count
        'nav'
    ])
}
</script>
<style>
</style>

