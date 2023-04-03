<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    @close="handleClose"
    width="60vw"
  >
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-row :gutter="24">
        <el-col :span="11">
          <el-form-item label="动作类型：" prop="type">
            <el-select placeholder="请选择" clearable v-model="form.type">
              <el-option
                v-for="(item, index) in list"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="动作名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <Editor
      ref="wangEditorRef"
      :status="editorStatus"
      @sendMsg="getMsg"
      @submit="submit"
    ></Editor>
    <!-- <el-button @click="resetForm">测试</el-button> -->
  </el-dialog>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch, reactive, nextTick } from 'vue'
import Editor from '@/components/editor/index.vue'
import {
  addAction,
  updateAction,
  getAllActionType
} from '@/api/sportManagement/action'

import { getToday } from '@/utils/params/date'
import { ElMessage } from 'element-plus'

// 这个是组件传参  你要看下 都对应的什么
const prop = defineProps({
  dialogVisible: Boolean,
  actionTypeOptions: Array,
  dialogStatus: String,
  actionData: Object
})

const emits = defineEmits(['update:dialogVisible', 'updateList'])

// 监视标题
watch(
  () => prop.dialogStatus,
  (newVal, oldVal) => {
    if (newVal === 'add') {
      resetForm()
      title.value = '新增动作'
    } else {
      // setData(prop.actionData)
      title.value = '查看动作'
    }
  }
)

// 监视visible
watch(
  () => prop.dialogVisible,
  (newVal, oldVal) => {
    if (newVal) {
      console.log(newVal)
      getAllActionTypeList()
    }

    if (prop.actionData) {
      setData(prop.actionData)
    }

    if (prop.dialogStatus === 'add') {
      resetForm()
      title.value = '新增动作'
    } else {
      // setData(prop.actionData)
      title.value = '查看动作'
    }
  }
)

const editorStatus = 'action'

const title = ref('')
const form = reactive({
  type: '',
  name: '',
  content: '',
  date: ''
})

const list = ref([])

const rules = reactive({
  type: [{ required: true, message: '字段值不可为空' }],
  name: [{ required: true, message: '字段值不可为空' }]
})

const getMsg = (msg) => {
  form.content = msg
  submit()
}

// 获取所有动作类型
const getAllActionTypeList = async () => {
  const res = await getAllActionType()
  if (res) {
    list.value = res.body
  }
}

const formRef = ref()
const submit = () => {

  formRef.value.validate(async (valid) => {
    if (!valid) return

    if (prop.dialogStatus === 'add') {
      createAciton()
    } else if (prop.dialogStatus === 'edit') {
      updateActionSubimt()
    }
  })
}

// 新增方法
const createAciton = async () => {
  const res = await addAction(form)
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    emits('updateList')
    handleClose()
  } else {
    ElMessage({
      type: 'error',
      message: res.body
    })
  }
}

// 编辑方法
const updateActionSubimt = async () => {
  const res = await updateAction(form)
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    emits('updateList')
    handleClose()
  } else {
    ElMessage({
      type: 'error',
      message: res.body
    })
  }
}

// 清空表单
const wangEditorRef = ref()
const resetForm = () => {
  form.type = ''
  form.name = ''
  form.content = ''
  form.date = getToday()
  nextTick(() => {
    wangEditorRef.value.setData('')
  })
}

// 编辑设置数据
const setData = (data) => {
  form.type = data.type
  form.name = data.name
  form.content = data.content
  form.id = data.id
  nextTick(() => {
    wangEditorRef.value.setData(data.content)
  })
}

// 处理关闭
const handleClose = () => {
  emits('update:dialogVisible', false)
}
</script>
<style lang="scss" scoped></style>
