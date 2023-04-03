<template>
 
  <el-dialog
    :model-value="docDialogVisiable"
    :title="title"
    width="30%"
    @close="handleClose"
    :before-close="handleClose"
  >
  
    <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
     
      <el-form-item label="医生姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="机构" prop="oid">
        <el-select v-model="form.oid">
          <el-option
            v-for="(item, index) in orgList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
 
</template>

<script setup>
import { defineProps, ref, watch, defineEmits, reactive } from 'vue' 
import { addDoc, updateDoc } from '@/api/systemManage/adminManage'
import { ElMessage } from 'element-plus'

const props = defineProps({
  dialogStatus: String,
  docDialogVisiable: Boolean,
  orgList: Array,
  dialogTableValue: Object
})

const title = ref('')

const formRef = ref(null)

const form = reactive({})

watch(
  () => props.dialogStatus,
  (newVal, oldeVal) => {
    console.log(props.dialogTableValue)
    if (newVal === 'add') {
      title.value = '新增医生'
    } else {
      title.value = '编辑医生'
    }
  }
)

watch(
  () => props.dialogTableValue,
  (newVal, oldVal) => {
    console.log(newVal)

    console.log(form)

    for (const key in newVal) {

      if (Object.hasOwnProperty.call(newVal, key)) {
        form[key] = newVal[key]
      }
    }
    console.log(form)
  }
)



const emits = defineEmits(['update:docDialogVisiable', 'getList'])

const handleClose = () => {
  emits('update:docDialogVisiable', false)
}

//确认按钮
const handleConfirm = () => {
  // 确认校验  async 和 await  确保父级关系 才能异步 获取到数据
  formRef.value.validate((valid) => {
    if (valid) {
      if (props.dialogStatus === 'add') {
        createSubmit()
      } else {
        editSubmit()
      }
    } else {
      return
    }
  })
  //调用关闭窗口
}

const createSubmit = async () => {
  const res = await addDoc(form)
  // 事实上你用 .then((res) => {}) 一样能获取到
  if (res.success) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    handleClose()
    // 添加成功后 关闭 对话框 并且 更新 信息  @getList 什么意思 自己去看vue文档
    emits('getList')
  }
}

// updateDoc
const editSubmit = async () => {
  console.log(form.value)
  const res = await updateDoc(form)
  // 事实上你用 .then((res) => {}) 一样能获取到
  if (res.success) {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    handleClose()
    // 添加成功后 关闭 对话框 并且 更新 信息  @getList 什么意思 自己去看vue文档
    emits('getList')
  }
}

//定义表单校验rules
//对象 -> key值 -> 数组
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
      //表单验证触发方式
      //trigger: ‘change’:数据改变时触发
      //trigger: ‘blur’:失去焦点时触发
    }
  ],
  account: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  oid: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ]
})
</script>
