<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    @close="handleClose"
    width="60vw"
  >
    <el-form
      :model="formData"
      :rules="rules"
      label-position="left"
      label-width="100px"
      size="medium"
      style="padding: 0 30px"
      v-if="dialogStatus === 'add' || dialogStatus === 'change'"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="请输入标题" prop="title">
            <el-input v-model="formData.title" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请输入作者" prop="writer">
            <el-input
              v-model="formData.writer"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <Editor
      ref="wangEditorRef"
      @sendMsg="getMsg"
      @submit="handleConfirm"
      :status="editorStatus"
    ></Editor>
    <template #footer> </template>
  </el-dialog>
</template>

<script setup>
import { insertNotice, changeNotice } from '@/api/announcements/'
import { defineEmits, reactive, ref, watch, nextTick } from 'vue'
import Editor from '@/components/editor/index.vue'
import { getToday } from '@/utils/params/date.js'

const formData = reactive({})

const editorStatus = 'announce'

const wangEditorRef = ref()

const prop = defineProps({
  dialogVisible: Boolean,
  dialogStatus: String,
  title: String,
  editData: Object,
})

const rules = ref({
  title: [
    {
      pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
      trigger: ['blur', 'change'],
      message: '不得输入非法字符',
    },
  ],
  writer: [
    {
      pattern: /^[一-龥]+$/,
      trigger: ['blur', 'change'],
      message: '请输入汉字',
    },
  ],
  content: [
    {
      pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
      trigger: ['blur', 'change'],
      message: '不得输入非法字符',
    },
  ],
})

const emits = defineEmits(['update:dialogVisible', 'updateList'])

watch(
  () => prop.editData,
  (newVal, oldVal) => {
    formData.writer = newVal.writer
    formData.title = newVal.title
    formData.id = newVal.id
    nextTick(() => {
      wangEditorRef.value.setData(
        newVal.content === undefined ? '' : newVal.content
      )
    })
  }
)

const handleConfirm = async () => {
  formData.date = getToday()
  if (prop.dialogStatus === 'add') {
    formData.id = null
    let res = await insertNotice(formData)
  }
  if (prop.dialogStatus === 'change') {
    let res = await changeNotice(formData)
  }
  emits('updateList')
  handleClose()
}

const handleClose = () => {
  emits('update:dialogVisible', false)
}

const getMsg = (msg) => {
  formData.content = msg
  handleConfirm()
}
</script>

<style></style>
