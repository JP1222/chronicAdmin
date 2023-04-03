<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    @close="handleClose"
    width="60vw"
  >
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-row :gutter="24">
        <el-col :span="11" v-if="role === 'admin'">
          <el-form-item label="所属医生：" prop="did">
            <el-select placeholder="请选择" clearable v-model="form.did">
              <el-option
                v-for="(item, index) in docList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11"> </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="11">
          <el-form-item label="患者：" prop="pid">
            <el-select placeholder="请选择" clearable v-model="form.pid">
              <el-option
                v-for="(item, index) in patientList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title"></el-input>
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
import {
  ref,
  defineProps,
  defineEmits,
  watch,
  reactive,
  nextTick,
  defineExpose
} from 'vue'
import Editor from '@/components/editor/index.vue'
import { addAction, updateAction } from '@/api/sportManagement/action'
import {
  getPatientByDocId,
  addZhiDaoForDoc,
  addZhiDaoforAdmi,
  updateZhiDaoForDoc,
  updateZhiDaoForAdm
} from '@/api/foodManagement/food.js'
import { getToday } from '@/utils/params/date'
import { ElMessage } from 'element-plus'

const prop = defineProps({
  dialogVisible: Boolean,
  dialogStatus: String,
  role: String,
  docList: Array,
  editData: Object
})

const emits = defineEmits(['update:dialogVisible', 'updateList'])

// 监视visible
watch(
  () => prop.dialogVisible,
  (newVal, oldVal) => {
    if (prop.dialogStatus === 'add') {
      resetForm()
      title.value = '新增指导'
    } else {
      title.value = '查看指导'
    }
  }
)

const editorStatus = 'food'
const title = ref('')
const form = reactive({})

const rules = reactive({
  did: [{ required: true, message: '字段值不可为空' }],
  pid: [{ required: true, message: '字段值不可为空' }],
  title: [{ required: true, message: '字段值不可为空' }]
})

const getMsg = (msg) => {
  form.content = msg
  submit()
}

const formRef = ref()
// 提交方法
const submit = () => {
  // 表单校验
  formRef.value.validate(async (valid) => {
    if (!valid) return
    // 新增
    if (prop.dialogStatus === 'add') {
      form.date = getToday()
      createZhiDao()
      // 更新
    } else if (prop.dialogStatus === 'edit') {
      updateChuFang()
    }
  })
}

// 根据医生id获取患者
const patientList = ref([])
const getPatient = async (did) => {
  const res = await getPatientByDocId({ did })
  if (res.success) {
    nextTick(() => {
      patientList.value = res.body
    })
    console.log(res)
  }
}

// 新增指导方法
const createZhiDao = async () => {
  // 管理员操作
  if (prop.role === 'admin') {
    const res = await addZhiDaoforAdmi(form)
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
    // 医生操作
  } else if (prop.role === 'staff') {
    const res = await addZhiDaoForDoc(form)
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
}

// 编辑方法
const updateChuFang = async () => {
  if (prop.role === 'admin') {
    const res = await updateZhiDaoForAdm(form)
    if (res.success) {
      ElMessage({
        type: 'success',
        message: '更新成功'
      })
      emits('updateList')
      handleClose()
    } else {
      ElMessage({
        type: 'error',
        message: res.body
      })
    }
  } else if (prop.role === 'staff') {
    const res = await updateZhiDaoForDoc(form)
    if (res.success) {
      ElMessage({
        type: 'success',
        message: '更新成功'
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
}

// 清空表单
const wangEditorRef = ref()
const resetForm = () => {
  form.pid = ''
  form.did = ''
  form.title = ''
  form.content = ''
  //   form.date = getToday()
  nextTick(() => {
    wangEditorRef.value.setData('')
  })
}

// 编辑设置数据
const setData = (data) => {
  form.date = data.date
  form.pid = data.pid
  form.doctorName = data.doctorName
  form.title = data.title
  form.id = data.id

  nextTick(() => {
    wangEditorRef.value.setData(data.content)
  })
  console.log(form)
}

// 根据患者姓名查找对应 id
const findPid = (patientName) => {
  const list = JSON.parse(JSON.stringify(patientList))
  console.log('patientList', patientList)
}

// 处理关闭
const handleClose = () => {
  emits('update:dialogVisible', false)
}

defineExpose({
  setData,
  getPatient
})
</script>
<style lang="scss" scoped></style>
