<template>
    <div>
        <img class="login-bg" src="../../assets/u0.jpg" alt="">
        <div class="login">
            <img class="logo mart-20" src="../../assets/u56.svg" alt="">
            <p class="log-title marb-20">腾鳌镇大数据融合平台</p>
            <div class="oform">
                <el-input
                     class="marb-20 "
                    placeholder="请输入用户名称"
                    v-model="username">
                    <i slot="prefix" class="el-input__icon iconfont icon-user"></i>
                </el-input>
                <el-input
                    class="marb-20 "
                    placeholder="请输入登录密码"
                    type="password"
                    v-model="password">
                    <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                </el-input>
                <el-button class="btn" :loading="onlogin" size="medium" type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            username:'',
            password:'',
			onlogin:false
        }
    },
    methods:{
        login(){
            var _this = this;
            if(!this.username || !this.password){
                this.$message.error('请填写用户名或密码');
                return;
            }
			_this.onlogin=true;
            axios.post(this.GLOBAL.loginUrl+'/login',{
                username:this.username,
                password:this.password
            }).then(function(res){
				if(res.data.result==1){
                    localStorage.setItem("roleId",res.data.data.roleId);
                    localStorage.setItem('userInfo',JSON.stringify(res.data.data));
                    localStorage.setItem('token',res.data.data.token);
                    localStorage.setItem('menuRole',res.data.data.menuRole)
                    _this.onlogin=false;
                    let redirect = decodeURIComponent(_this.$route.query.redirect || '/main'); 
                    _this.$router.push({ path: redirect })
                }else{
                    _this.$message.error(res.data.msg);
                    _this.onlogin=false;
                }
            })
            
        }
    }
}
</script>
<style>
.mart-20{
    margin-top: 20px;
}
.marb-20{
    margin-bottom: 20px;
}
.login-bg{
    width: 100%; 
    height: 100%;
    position: absolute;
    z-index: -1;
}
.login{
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -280px;
    display: inline-block;
    width: 460px;
    background: rgba(255,255,255,.7);
    border-radius: 15px;
    text-align: center;
}
.login .logo{
    width: 100px;
}

.login .oinput input{
    height: 45px;
}
.login .log-title{
    color: #0099ff;
    text-align: center;
    font-size: 24px;
}
.login .oform{
    margin: 0 auto;
    width: 80%;
}
.login .btn{
    width: 100%;
    height: 45px;
    margin-bottom: 115px;
    background: #1b83f6;
}
</style>


