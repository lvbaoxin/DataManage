<template>
    <div class="iconfont pwbody">
        <p>设置新密码</p>
        <div class="updatepw">
            <span class="ospan">旧密码:</span>
            <el-input
                class="oinput"
                placeholder="请输入旧密码"
                v-model="oldPassword">
                <i slot="prefix" class="el-input__icon icon-mimacopy"></i>
            </el-input>
        </div>
        <div  class="updatepw">
            <span class="ospan">新密码:</span>
            <el-input
                class="oinput"
                placeholder="请输入新密码"
                v-model="newPassword">
                <i slot="prefix" class="el-input__icon icon-mimacopy"></i>
            </el-input>
        </div>
        <div  class="updatepw">
            <span class="ospan">确认密码:</span>
            <el-input
                class="oinput"
                placeholder="请输入确认密码"
                v-model="repeatPw">
                <i slot="prefix" class="el-input__icon icon-mimacopy"></i>
            </el-input>
        </div>
        <el-button type="primary" style="width:150px;" @click="update">修改</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            oldPassword:'',
            newPassword:'',
            repeatPw:''
        }
    },
    methods:{
        update(){

            var _this = this;
            if(!this.oldPassword){
                this.$message.error('请输入旧密码')
                return;
            }
            if(!this.newPassword){
                this.$message.error('请输入新密码')
                return;
            }
            if(this.newPassword != this.repeatPw){
                this.$message.error('新密码和确认密码不一致')
                return;
            }
            this.$request.post('sysUser/updatePassword',{
                oldPassword:this.oldPassword,
                newPassword:this.newPassword
            },function(res){
                if(res.result != '1'){
                    _this.$message.error(res.msg)
                }else{
                    localStorage.removeItem('token');
                    _this.$router.push('/login')
                }
            })
        }
    }
}
</script>
<style>
.updatepw{
    display: flex;
    align-items: center;
    width: 30%;
    margin: 15px auto;
}
.updatepw .ospan{
    display: inline-block;
    width: 80px;
    
}
.pwbody{
    margin-top: 100px;
    text-align: center;
}
</style>


