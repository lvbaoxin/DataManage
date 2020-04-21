<template>
	<div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名" >
            <el-input style='width: 180px;' v-model="formInline.personName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input style='width: 180px;' v-model="formInline.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="社区">
            <el-select v-model="formInline.community" placeholder="请选择社区">
                <el-option v-for="item in this.GLOBAL.select.Community"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="网格">
            <el-select v-model="formInline.grid" placeholder="请选择网格">
                <el-option v-for="item in this.GLOBAL.select.grid"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
			<el-button type="primary" @click="schnellImport">一键导入</el-button>
        </el-form-item>
    </el-form>
	 <el-dialog
	    title="事件信息"
	    :visible.sync="dialogVisibl"
	    width="60%"
		:modal-append-to-body='false'
		>
		<div class="importComplete">
			<p><i class="el-icon-success"></i></p>
			<h3>导入完成</h3>
			<p>成功导入决策信息数量:{{fileImportRes.insertCount}}条，没能成功导入{{fileImportRes.failCount}}条，更新数据{{fileImportRes.updateCount}}条</p>
		</div>
	 </el-dialog>
	</div>
</template>
<script>
export default {
    data(){
        return{
            formInline:{},
			fileImportRes:{},
			dialogVisibl:false
        }
    },
	props:['postUrl','dataLists'],
    methods:{
        onSubmit(){
            this.$emit('search',this.formInline);
        },
		schnellImport(){
			var _this =this
			if(this.dataLists.length<1){
				this.$message.error('没有可导入数据');
				return
			}
			var loading = this.$loading({
			  lock: true,
			  text: '正在导入，请耐心等待...',
			  spinner: 'el-icon-loading',
			  background: 'rgba(0, 0, 0, 0.7)'
			});
			_this.$request.post(_this.postUrl,{
				..._this.formInline
			},res=>{
			   if(res.result=='1'){
				   _this.fileImportRes=res.data
				   _this.dialogVisibl=true
					_this.formInline={}
					_this.$emit('search')
					loading.close();
			   }
			})
		}
    }
}
</script>
<style>
	.importComplete{
	    text-align: center;
		z-index: 9999 !important;
	}
	.importComplete i{
	    font-size: 60px;
	    color: #4BD863;
	}
	.importComplete h3{
	    color: #666666;
	    line-height: 24px;
	    margin-top: 15px;
	}
	.importComplete p:nth-of-type(2){
	    font-size: 14px;
	    color: #999999;
	    margin-top: 5px;
	}
</style>
