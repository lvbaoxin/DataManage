<template>
  <div class="pad10">
    <el-form
      :inline="true"
      label-position="top"
      label-width="80px"
      ref="WenKongFormData"
      :rules="rules"
      :model="WenKongFormData"
    >
      <el-form-item label="身份证号：">
        <el-input v-model="WenKongFormData.idCard" placeholder="请输入户号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="personName">
        <el-input v-model="WenKongFormData.personName" placeholder="请输入户主姓名"></el-input>
      </el-form-item>
      <el-form-item label="户籍详址：" prop="registryAddress">
        <el-input v-model="WenKongFormData.registryAddress" placeholder></el-input>
      </el-form-item>
      <el-form-item label="现住地详情：" prop="domicileAddress">
        <el-input v-model="WenKongFormData.domicileAddress" placeholder></el-input>
      </el-form-item>
      <el-form-item label="人户一致标志：" prop="consistencyFlag">
        <el-select v-model="WenKongFormData.consistencyFlag" placeholder="请选择信访事项类别">
          <el-option
            v-for="item in GLOBAL.select.isOrNo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信访事项类别：" prop="xinfangType">
        <el-input v-model="WenKongFormData.xinfangType" placeholder></el-input>
      </el-form-item>
      <el-form-item label="主要问题：" prop="xinfangRemark">
        <el-input v-model="WenKongFormData.xinfangRemark" placeholder></el-input>
      </el-form-item>
      <el-form-item label="定级依据：" prop="wenkongTypeReason">
        <el-input v-model="WenKongFormData.wenkongTypeReason" placeholder></el-input>
      </el-form-item>
      <el-form-item label="责任单位：" prop="responsibleUnit">
        <el-input v-model="WenKongFormData.responsibleUnit" placeholder></el-input>
      </el-form-item>
      <el-form-item label="街道包保人员：" prop="streetPerson">
        <el-input v-model="WenKongFormData.streetPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="街道包保人员联系方式：" prop="streetContact">
        <el-input v-model="WenKongFormData.streetContact" placeholder></el-input>
      </el-form-item>
      <el-form-item label="派出所责任民警：" prop="policeStationPerson">
        <el-input v-model="WenKongFormData.policeStationPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="派出所责任民警联系方式：" prop="policeStationContact">
        <el-input v-model="WenKongFormData.policeStationContact" placeholder></el-input>
      </el-form-item>
      <el-form-item label="社区责任人：" prop="communityPerson">
        <el-input v-model="WenKongFormData.communityPerson" placeholder></el-input>
      </el-form-item>
      <el-form-item label="社区责任人联系方式：" prop="communityContact">
        <el-input v-model="WenKongFormData.communityContact" placeholder></el-input>
      </el-form-item>

      <div style="margin:20px auto;text-align:center;">
        <el-form-item size="large">
          <el-button type="primary" @click="submit('WenKongFormData')">提交</el-button>
          <el-button @click="reset('WenKongFormData')">重置</el-button>
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
    ...mapState(["WenKongFormData"])
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
      for (var key in this.WenKongFormData) {
        if (this.WenKongFormData[key]) {
          postObj[key] = this.WenKongFormData[key];
        }
      }
      var _this = this;
      this.$request.post(
        "zzHoseholdPopulationWenkong/update",
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
      for (var key in this.WenKongFormData) {
        if (key != "id" && key != "popuId") {
          this.WenKongFormData[key] = "";
        }
      }
    }
  }
};
</script>

<style>
</style>
