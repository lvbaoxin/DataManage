<template>
	<div style="margin:20px; display: flex; ">
		<div style="width: 300px; padding-top: 40px;">
			<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="用户登录名">
				<el-input v-model="form.userName"></el-input>
			</el-form-item>
			<el-form-item label="用户真实姓名">
				<el-input v-model="form.loginName"></el-input>
			</el-form-item>
			<el-form-item label="角色分类">
				<el-cascader expand-trigger="hover" :props="casrule" :options="options" v-model="roleId">
				</el-cascader>
			</el-form-item>
			<el-form-item label="用户登录密码">
				<el-input v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
			</el-form-item>
		</el-form>
		</div>
		<div class="ocontent" style="width: 810px;">
				<div class="search">
					<p>
						<span>用户名：</span>
						<el-input class="oinput" v-model="person.userName" placeholder="请输入用户名"></el-input>
					</p>
					<p>
						<span>真实姓名：</span>
						<el-input class="oinput" v-model="person.loginName" placeholder="请输入真实姓名"></el-input>
					</p>
					<p>
						<el-button slot="reference" type="primary" @click="getList" icon="el-icon-search">查询</el-button>
						<el-button type="" @click="reset">重置</el-button>
					</p>
				</div>
				<el-table :header-cell-style="{background:'#3498db',color:'#fff'}" ref="multipleTable" border :row-class-name="tableRowClassName"
				    :data="needImportList" tooltip-effect="dark" style="width: 100%">
				   <el-table-column prop="userName" label="用户姓名"> </el-table-column>
				   <el-table-column prop="loginName" label="真实姓名"> </el-table-column>
				   <el-table-column prop="roleName" label="角色类别"> </el-table-column>
				</el-table>
				<div style="text-align:right;margin:20px 0;">
				    <el-pagination
				        background
				        @size-change="sizeChange"
				        @current-change="currentChange"
				        layout="sizes,prev, pager, next"
				        :total="totalSize">
				    </el-pagination>
				</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					userName: '',
					loginName: '',
					password: ''
				},
				roleId: [],
				options: [],
				casrule: {
					label: 'roleName',
					value: 'roleId',
					children: 'child'
				},
				 tableData:[],
				person:{},
				select:[],
				needImportList:[],
				totalSize:0,
				current:1,
				size:10
			}
		},
		mounted() {
			this.getRoleList()
		},
		methods: {
			onSubmit() {
				for (const key in this.form) {
					if (!this.form[key]) {
						this.$message.error('请完善信息')
						return;
					}
				}
				if (!this.roleId.length) {
					this.$message.error('请完善信息')
					return;
				}
				this.$request.post('sysUser/insert', {
					...this.form,
					roleId: this.roleId[1]
				}, res => {
					if (res.result == '1') {
						this.$message('创建成功')
					}else{
						this.$message(res.msg)
					}
				})
			},
			getRoleList() {
				this.$request.get('zzRole/listForTree', {
					current: 1,
					size: 100
				}, res => {
					this.options = res.data;
					this.getList()
				})
			},
			 getList(){
			    var _this = this;
			    this.$request.get('/sysUser/listPage',{
			        loginName:_this.person.userName,
							userName:_this.person.loginName,
			        current:this.current,
			        size:this.size
			    },function(res){
						//console.log(res)
			        _this.needImportList = res.data.records;
			        _this.totalSize = res.data.total
			    })
			},
			tableRowClassName({ row, rowIndex }) {
			    if (rowIndex % 2) {
			    return 'bg-f6'
			    }
			    return ''
			},
			sizeChange(val){
			    this.size = val;
			    this.getList();
			},
			currentChange(val){
			    this.current = val;
			    this.getList();
			},
			find(){
			    this.getList();
			},
			reset(){
				this.person = {}
				this.getList();
			},
		}
	}
</script>
