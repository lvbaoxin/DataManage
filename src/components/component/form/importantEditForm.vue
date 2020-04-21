<template>
    <div class="pad10">
        <el-form :inline="true" label-position="top" label-width="80px" ref="importantFormData" :rules="rules" :model="importantFormData">
            
            
            <el-form-item label="是否刑释解教人员：">
                <el-select v-model="importantFormData.isXingshijiejiao" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否涉外：">
                <el-select v-model="importantFormData.isShewai" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否问题青少年：">
                <el-select v-model="importantFormData.isWentiqingshaonian" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否涉毒：">
                <el-select v-model="importantFormData.isShedu" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否信访：">
                <el-select v-model="importantFormData.isXinfang" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否涉军：">
                <el-select v-model="importantFormData.isShejun" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否涉法涉诉：">
                <el-select v-model="importantFormData.isShefashesu" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否肇事肇祸精神障碍者：">
                <el-select v-model="importantFormData.isJingshen" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否涉邪：">
                <el-select v-model="importantFormData.isShexie" placeholder="请选择">
                    <el-option
                    v-for="item in GLOBAL.select.isOrNo1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="confirm">确定</el-button>
    </div>
</template>
<script>
export default {
    props:{
        importantFormData:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    data(){
        return{
            rules:{}
        }
    },
    methods:{
        confirm(){
            var _this = this;
            delete this.importantFormData.createTime
            this.$request.post('/fileImportantPopulation/update',{
                ...this.importantFormData
            },function(res){
                _this.$emit('editsuccess')
                //console.log(res)
            })
        }
    }
}
</script>
