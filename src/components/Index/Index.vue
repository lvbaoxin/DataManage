<template>
    <div>
        <header class="header">

            <img class="header-bg"  src="../../assets/u159.png" alt="">
            <p class="title fl"><span class="name">腾鳌镇</span>大数据融合平台</p>
            <ul class="list iconfont fl">
                <li><router-link to="/main"><i class="icon-shouye"></i> 首页</router-link></li>
                <li><router-link to="/index"><i class="icon-shujuku"></i>数据中心</router-link></li>
                <li><router-link to="/Judgement"><i class="icon-tongji"></i>统计分析</router-link></li>
                <li><router-link to="/yanpan"><i class="icon-icon-diejiafenxi"></i>研判分析</router-link></li>
                <li><router-link to="/juece"><i class="icon-yidongduanicon-"></i>决策分析</router-link></li>
                <li><router-link to="/report"><i class="icon-baobiao"></i>报表管理</router-link></li>
                <li><router-link to="/gis"><i class="icon-LC_icon_gps_line_1"></i></router-link>GIS应用</li>
            </ul>
            <div class="admin fr">
                <p>
                    <img class="marr-10" src="../../assets/u193.png" alt=""><span>欢迎您，{{userInfo.userName}}</span>
                    <router-link to="/setting">
                        <span class="el-dropdown-link" style="margin-left:10px;color:#fff;display: flex;align-items: center;cursor:pointer;">
                            <img width="20px;" height="20px;" src="../../assets/u199.png" alt="">
                            账户设置
                        </span>
                    </router-link>
                    <span class="marl-20" style="display: flex;align-items: center;cursor:pointer;" @click="out"><img src="../../assets/u203.png" alt="">退出登录</span>
                </p>
                <p class="mart-10" style="text-align:right;">{{nowTime}}</p>
            </div>
        </header>
        
        <router-view ></router-view>  
        
        
        
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return{
            userInfo:JSON.parse(localStorage.getItem('userInfo')) || {},
            transitionName:'',
            nowTime:''
        }
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.AddNav([])
            this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
        }
    },
    mounted(){
        this.nowTime = this.GLOBAL.check.getNowFormatDate()
        setInterval(()=>{
            this.nowTime = this.GLOBAL.check.getNowFormatDate()
        },1000)
    },
    methods:{
        ...mapMutations([
            'AddNav'
        ]),
        out(){
            localStorage.removeItem('token');
            this.$router.push('/login')
        },
        command(val){
            if(val == 'password'){
                this.$router.push('/index/updatePW')
            }
        },
        
    }
}
</script>

<style>
.header{    
    min-width: 100%;
    height: 90px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.header-bg{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    position: absolute;
}
.header .title{
    font-size: 25px;
    color: #fff;
    font-weight: bold;
}
.header .name{
    font-size: 32px;
}
.list{
    font-size: 14px;
    margin: 0 15px;
    font-weight: bold;
}
.list li{
    min-width: 50px;
    padding: 0 8px;
    text-align: center;
    float: left;
    color: #fff;
    cursor: pointer;
}
.list li a{
    color: #fff;
}
.list li:hover{
    background: #4ecb73;
}
.list i{
    font-size: 24px;
    display: block;
    color: #fff;
}
.admin{
    font-size:14px;
    color: #fff;
}
.admin p:nth-of-type(1){
    line-height: 30px;
    display: flex;
    align-content: center;
}
.admin p:nth-of-type(2){
    margin-top: 5px;
}

</style>
