<template>
  <el-dialog
    :model-value="UserInfoDialogVisiable"
    :title="'修改个人信息'"
    width="60%"
    @close="handleClose"
    :before-close="handleClose"
  >
    <el-form
      :model="formData"
      ref="vForm"
      :rules="rules"
      label-position="left"
      label-width="80px"
      size="medium"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item label="姓名" prop="name" class="required">
            <el-input v-model="formData.name" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item label="账号" prop="account" class="required">
            <el-input
              v-model="formData.account"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item label="注册日期" prop="date">
            <el-input
              v-model="formData.date"
              :disabled="true"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item label="机构" prop="organizationName" class="required">
            <el-input
              v-model="formData.organizationName"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="formData.password"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell"> </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  defineEmits,
  defineProps
} from 'vue'

const props = defineProps({
  UserInfoDialogVisiable: Boolean
})
const emits = defineEmits(['update:useInfoDialogVisiable', 'getList'])

const state = reactive({
  formData: {
    name: '',
    account: '',
    date: '',
    organizationName: '',
    input44779: ''
  },
  rules: {
    name: [
      {
        required: true,
        message: '字段值不可为空'
      },
      {
        pattern: /^[一-龥]+$/,
        trigger: ['blur', 'change'],
        message: ''
      }
    ],
    account: [
      {
        required: true,
        message: '字段值不可为空'
      }
    ],
    organizationName: [
      {
        required: true,
        message: '字段值不可为空'
      }
    ]
  }
})

const instance = getCurrentInstance()
const submitForm = () => {
  instance.ctx.$refs['vForm'].validate((valid) => {
    if (!valid) return
    //TODO: 提交表单
  })
}

const resetForm = () => {
  instance.ctx.$refs['vForm'].resetFields()
}

const handleClose = () => {
  emits('update:docDialogVisiable', false)
}
</script>

<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
  width: 100% !important;
}

.el-form-item--medium {
  .el-radio {
    line-height: 36px !important;
  }

  .el-rate {
    margin-top: 8px;
  }
}

.el-form-item--small {
  .el-radio {
    line-height: 32px !important;
  }

  .el-rate {
    margin-top: 6px;
  }
}

.el-form-item--mini {
  .el-radio {
    line-height: 28px !important;
  }

  .el-rate {
    margin-top: 4px;
  }
}

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: '';
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}
</style>

<style lang="scss" scoped>
div.table-container {
  table.table-layout {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    td.table-cell {
      display: table-cell;
      height: 36px;
      border: 1px solid #e1e2e3;
    }
  }
}

div.tab-container {
}

.label-left-align ::v-deep .el-form-item__label {
  text-align: left;
}

.label-center-align ::v-deep .el-form-item__label {
  text-align: center;
}

.label-right-align ::v-deep .el-form-item__label {
  text-align: right;
}

.custom-label {
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;

  ::v-deep .el-divider--horizontal {
    margin: 0;
  }
}
</style>
