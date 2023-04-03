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
      <el-form-item label="血糖检测情况" prop="sugar">
        <el-input v-model="formData.sugar" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="睡眠紊乱情况" prop="sleep">
        <el-input v-model="formData.sleep" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="关节疼痛情况" prop="joint">
        <el-input v-model="formData.joint" type="text" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="handleReset('edit')">清空表单</el-button> -->
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
  addDiseaseForDoc,
  addDiseaseForAdm,
  editDiseaseForAdm,
  editDiseaseForDoc
} from '@/api/diseaseManagement/index'

const prop = defineProps({
  dialogVisible: Boolean,
  role: String,
  docList: Array,
  dialogStatus: String,
  pid: Number,
  editData: Object
})

// 监听status
watch(
  () => prop.dialogStatus,
  (newVal, oldVal) => {
    if (newVal === 'add') {
      console.log(prop.pid)
      title.value = '新增疾病汇报'
    } else {
      title.value = '编辑疾病汇报'
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
  sugar: [
    {
      pattern: /^[一-龥]+$/,
      trigger: ['blur', 'change'],
      message: '请输入汉字'
    }
  ],
  sleep: [
    {
      pattern: /^[一-龥]+$/,
      trigger: ['blur', 'change'],
      message: '请输入汉字'
    }
  ],
  joint: [
    {
      pattern: /^[一-龥]+$/,
      trigger: ['blur', 'change'],
      message: '请输入汉字'
    }
  ]
})

// 处理提交
const handleConfirm = () => {
  if (prop.dialogStatus === 'add') {
    createDisease()
  } else {
    editDisease()
  }
}

// 新增疾病汇报
const createDisease = async () => {
  if (prop.role === 'admin') {
    // 管理员添加疾病汇报
    const res = await addDiseaseForAdm(formData)
    if (res.success) {
      emits('updateList')
      ElMessage({
        type: 'success',
        message: '新增成功!'
      })
      handleClose()
    }
  } else {
    // 医生添加疾病汇报
    const res = await addDiseaseForDoc(formData)
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

// 修改疾病汇报
const editDisease = async () => {
  if (prop.role === 'admin') {
    // 管理员
    const res = await editDiseaseForAdm(formData)
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
    const res = await editDiseaseForDoc(formData)
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
  emits('update:dialogVisible', false)
}
</script>

<style></style>
