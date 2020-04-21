<template>
  <div class="pad10">
    <el-form
      :inline="true"
      label-position="top"
      label-width="80px"
      ref="jiaoZhengFormData"
      :rules="rules"
      :model="jiaoZhengFormData"
    >
      <el-form-item label="身份证号：">
        <el-input v-model="jiaoZhengFormData.idCard" placeholder="请输入户号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="personName">
        <el-input v-model="jiaoZhengFormData.personName" placeholder="请输入户主姓名"></el-input>
      </el-form-item>
      <el-form-item label="户籍详址：" prop="registryAddress">
        <el-input v-model="jiaoZhengFormData.registryAddress" placeholder></el-input>
      </el-form-item>
      <el-form-item label="现住地详情：" prop="domicileAddress">
        <el-input v-model="jiaoZhengFormData.domicileAddress" placeholder></el-input>
      </el-form-item>
      <el-form-item label="人户一致标志：" prop="consistencyFlag">
        <el-select v-model="jiaoZhengFormData.consistencyFlag" placeholder="请选择信访事项类别">
          <el-option
            v-for="item in GLOBAL.select.isOrNo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信访事项类别：" prop="xinfangType">
        <el-input v-model="jiaoZhengFormData.xinfangType" placeholder></el-input>
      </el-form-item>
      <el-form-item label="主要问题：" prop="xinfangRemark">
        <el-input v-model="jiaoZhengFormData.xinfangRemark" placeholder></el-input>
      </el-form-item>
      <el-form-item label="责任单位：" prop="responsibleUnit">
        <el-input v-model="jiaoZhengFormData.responsibleUnit" placeholder></el-input>
      </el-form-item>
      <el-form-item label="街道责任人：" prop="streetPerson">
        <el-input v-model="jiaoZhengFormData.streetPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="街道责任人联系方式：" prop="streetContact">
        <el-input v-model="jiaoZhengFormData.streetContact" placeholder></el-input>
      </el-form-item>
      <el-form-item label="社区责任人：" prop="communityPerson">
        <el-input v-model="jiaoZhengFormData.communityPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="社区责任人联系方式：" prop="communityContact">
        <el-input v-model="jiaoZhengFormData.communityContact" placeholder></el-input>
      </el-form-item>

      <div style="margin:20px auto;text-align:center;">
        <el-form-item size="large">
          <el-button type="primary" @click="submit('jiaoZhengFormData')">提交</el-button>
          <el-button @click="reset('jiaoZhengFormData')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      rules: {}
    };
  },
  computed: {
    ...mapState(["jiaoZhengFormData"])
  },
  methods: {
    submit(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postData();
        } else {
          this.$message.error("请完善必填信息");
          return;
        }
      });
    },
    postData() {
      var postObj = {};
      for (var key in this.jiaoZhengFormData) {
        if (this.jiaoZhengFormData[key]) {
          postObj[key] = this.jiaoZhengFormData[key];
        }
      }
      var _this = this;
      this.$request.post(
        "zzHoseholdPopulationJiaozheng/update",
        { ...postObj },
        function(res) {
          if (res.result == 1) {
            _this.$message("操作成功");
            _this.$emit("success");
          } else {
            _this.$message.error(res.msg);
          }
        },
        function(res) {
          _this.$message.error("操作失败，请稍后重试");
        }
      );
    },

    reset(formName) {
      for (var key in this.jiaoZhengFormData) {
        if (key != "id" && key != "popuId") {
          this.jiaoZhengFormData[key] = "";
        }
      }
    }
  }
};
</script>

<style>
</style>
