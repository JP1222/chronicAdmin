<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    @close="handleClose"
    width="40vw"
  >
    <el-form
      :model="formData"
      ref="vForm"
      :rules="rules"
      label-position="left"
      label-width="100px"
      size="medium"
      style="padding: 0 30px"
    >
      <el-form-item label="所属医生" prop="did" v-if="role === 'admin'">
        <el-select v-model="formData.did" class="full-width-input" clearable>
          <el-option
            v-for="(item, index) in docList"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled"
          ></el-option> </el-select
      ></el-form-item>

      <el-form-item label="运动处方" prop="aid">
        <el-select v-model="formData.aid" class="full-width-input" clearable>
          <el-option
            v-for="(item, index) in actionList"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="小提示" prop="tip" class="required">
        <el-input v-model="formData.tip" type="text" clearable></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

import {
  createChuFangForDoc,
  createChuFangForAdm,
  updateChuFangForDoc,
  updateChuFangForAdm
} from '@/api/sportManagement/actionChuFang'

const prop = defineProps({
  dialogVisible: Boolean,
  role: String,
  docList: Array,
  dialogStatus: String,
  pid: Number,
  editData: Object,
  actionList: Array
})

// 监听status
watch(
  () => prop.dialogVisible,
  (newVal, oldVal) => {
    if (prop.dialogStatus === 'add') {
      formData.pid = prop.pid
      title.value = '新增运动处方'
    } else {
      title.value = '编辑运动处方'
    }
  }
)

watch(
  () => prop.pid,
  (newVal, oldVal) => {
    if (newVal) {
      formData.pid = newVal
    }
  }
)

watch(
  () => prop.editData,
  (newVal, oldVal) => {
    // let data = JSON.parse(JSON.stringify(newVal))
    for (const key in newVal) {
      if (Object.hasOwnProperty.call(newVal, key)) {
        formData[key] = newVal[key]
      }
    }
    console.log(formData)
  }
)

const emits = defineEmits(['update:dialogVisible', 'updateList'])
const title = ref('')

const formData = reactive({})
const rules = ref({
  aid: [
    {
      required: true,
      message: '请选择动作'
    }
  ],
  tip: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ]
})

// 处理提交

const vForm = ref()
const handleConfirm = () => {
  console.log(formData)
  vForm.value.validate((valid) => {
    if (!valid) return
    if (prop.dialogStatus === 'add') {
      createDisease()
    } else {
      editDisease()
    }
  })
}

// 新增运动处方
const createDisease = async () => {
  if (prop.role === 'admin') {
    // 管理员添加运动处方
    const res = await createChuFangForAdm(formData)
    if (res.success) {
      emits('updateList')
      ElMessage({
        type: 'success',
        message: '新增成功!'
      })
      handleClose()
    }
  } else {
    // 医生添加运动处方
    const res = await createChuFangForDoc(formData)
    if (res.success) {
      emits('updateList')
      ElMessage({
        type: 'success',
        message: '新增成功!'
      })
      handleClose()
    }
  }
}

// 修改运动处方
const editDisease = async () => {
  if (prop.role === 'admin') {
    // 管理员
    const res = await updateChuFangForAdm(formData)
    if (res.success) {
      emits('updateList')
      ElMessage({
        type: 'success',
        message: '修改成功!'
      })
      handleClose()
    }
  } else {
    // 医生
    const res = await updateChuFangForDoc(formData)
    if (res.success) {
      emits('updateList')
      ElMessage({
        type: 'success',
        message: '修改成功!'
      })
      handleClose()
    }
  }
}

// 处理关闭
const handleClose = () => {
  formData.pid = null
  formData.aid = null
  formData.tip = null
  emits('update:dialogVisible', false)
}
</script>

<style></style>
