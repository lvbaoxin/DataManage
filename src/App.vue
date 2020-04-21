<template>
  <div id="app" class="iconfont">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body, div, dl, dt, dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,th,td{margin:0;padding:0;letter-spacing: 0;}
table{border-collapse:collapse;border-spacing:0;}
li{list-style: none;}
i{font-style: normal;}
fieldset,img {border:0;}
body {font-family: "微软雅黑", "宋体", Arial, Helvetica, sans-serif;padding:0px;min-width:1500px;width:100%;height:100%;font-size: 14px;position: absolute;}
a{text-decoration: none;}
.clearfix {zoom: 1;}
.clearfix:after {content: ".";width: 0;height: 0;visibility: hidden;display: block;clear: both;overflow:hidden;}
.fl {float: left}
.fr {float: right}
.bor-b{border-bottom: 1px solid #e9e9e9;}
.inline{display: inline-block;}
.pad10{padding: 10px;}
.marr-10{margin-right:10px; }
.mart-10{margin-top: 10px;}
.marl-20{margin-left: 20px;}
.marb-10{margin-bottom: 10px;}
.pad-t10{padding-top: 10px;}
.red{color: red;}
.el-input__prefix{
  display: flex;
  align-items: center;
}
.bg-f{
  background: #fff;
}
.bg-f6{
  background-color: #f6fefe !important;
}
/*人口模块统一样式*/
.bg-b{
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: #cee7fd;
}
.persison-nav{
  padding:10px 20px;
  background: #edf5fe;
  display: flex;
  align-items: center;
}
.persison-nav .el-breadcrumb__inner{
  color: #bca5a6;
  
}
.persison-nav .icon-shouye{
  color: #999999;
  font-size: 25px;
  margin-right: 20px;
}

.ocontent{
  background: #fff;
  border-radius: 6px;
  width: 96%;
  margin: 20px auto;
  padding: 18px 15px;
}
.title{
  position: relative;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-bottom: 18px;
}
.title .line{
  width: 6px;
  height: 25px;
  margin-right: 5px;
  background: #0079FE;
  display: inline-block;
}
.title span:nth-of-type(3){
  position: absolute;
  right: 15px;
  color: #0079FE;
}
.ocontent .search{
  padding: 15px;
  font-size: 14px;
}
.ocontent .search  p{
  
  margin: 0 10px 10px 10px;
  display: inline-block;
}
.ocontent .search .el-input{
  width: 200px !important;
}
.oinput{
  width: 200px;
}
.addhouselist{
    margin-left: 20px;
}
.addhouselist em{
    font-style: normal;
    color: red;
}
.addhouselist li{
    width: 220px;
    float: left;
    margin:  10px;
}
.addhouselist li p{
    line-height: 30px;
}
/*图表样式*/
.chartContent{
    box-shadow: 0px 0px 2px #888;
    border-radius: 6px;
    margin-right: 5px;
    display: inline-block;
    margin-bottom: 10px;
}
.chartContent .headers{
    text-align: center;
    background: #f2f2f2;
    padding:10px 0 ;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.chartContent .headers img{
    position: absolute;
    width: 30px;
    left: 10px;
}
.chartContent .contents{
  width: 100%;
  background: #fff;
}
/*重置ele樣式*/
.el-menu{
    border-right:none !important; 
}


.slide-left-enter-active,
.slide-left-leave-active {
 transition: all .5s;
 opacity: .8;
}
.slide-left-enter,
.slide-left-leave-to {
 transition: all .5s;
 transform: translate3d(100%, 0, 0);
 opacity: .8;
}
.slide-right-enter-active,
.slide-right-leave-active {
 transition: all .5s;
}
.slide-right-enter,
.slide-right-leave-to {
 transition: all .5s;
 transform: translate3d(-100%, 0, 0);
}
/* slot */
.slotchild{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
}
/* 页面划分 */
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
