<template>
  <el-card>
    <!-- 类比：
      <div> = <el-row>
      <span> = <el-col> -->
    <el-row :gutter="20" class="top-form-contianer">
      <el-col :span="7">
        <el-input
          :placeholder="请输入要查找的医生"
          clearable
          v-model="queryForm1.query"
        ></el-input>
      </el-col>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="handleCreatDoc">添加医生</el-button>

      <el-button @click="handleCheckLog">查看日志</el-button>
    </el-row>

    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      border
      :height="cardHeight"
      style="font-size: 1rem"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-button type="danger" @click="handleDeleteDoc(row)"
            >删除</el-button
          >
          <el-button @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <doc-dialog
    v-model:docDialogVisiable="docDialogVisiable"
    :dialogStatus="dialogStatus"
    :orgList="orgList"
    @getList="getList"
    :dialogTableValue="dialogTableValue"
  />
  <log-dialog v-model:logDialogVisible="logDialogVisible" />
  <!-- 组件名 大写一律改成 -小写  除非开头是大写 但最好不要大写 -->
  <!-- <docDialog v-model="docDialogVisiable" /> -->
</template>

<script setup>
import docDialog from './components/docDialog.vue'
import logDialog from './components/logDialog.vue'
import { nextTick, ref } from 'vue'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { getAllDocInfo, deleteDocById } from '@/api/systemManage/adminManage'
import { options } from './options'
import { ElMessageBox, ElMessage } from 'element-plus'
import { addDoc, getOrgList } from '@/api/systemManage/adminManage'
// import { isNull } from '../../../utils/filter'

const queryForm1 = ref({
  pagenum: 1,
  pagesize: 10
})
const cardHeight = getHeightWithOutHeader()

const tableData = ref([])
const dialogTableValue = ref({})

// 获取医生列表
const getList = async () => {
  const res = await getAllDocInfo(queryForm1.value)
  tableData.value = res.body.content
}
getList()

const docDialogVisiable = ref(false)
const docDialogTitle = ref('')

const dialogStatus = ref('')
//  处理添加医生
const handleCreatDoc = () => {
  docDialogTitle.value = '添加用户'
  dialogStatus.value = 'add'
  docDialogVisiable.value = true
}

// 获取到机构列表后 向 docDialog 传参
const orgList = ref([])
// 获取机构列表 getOrg这个函数名 不能和getOrgList 这个一样 不然不知道调用那一个
const getOrg = async () => {
  const res = await getOrgList()
  if (res.success) {
    console.log(res)
    orgList.value = res.body
  }
}
getOrg()

// 这里的 row 对应医生的信息
// 处理 编辑医生
const handleEdit = (row) => {
  // 这个一般 不用添加  因为 它必定会有数据  没有数据 就不会显示
  // 还有向 dialogTableValue docDialogTitle 这种参数 你如果要 传递给 子组件   就要用 porps  emits 是事件

  // if (isNull(row)) {
  //   docDialog.value = '添加用户'
  //   dialogTableValue.value = {}
  // } else {

  docDialogVisiable.value = true
  docDialog.value = '编辑用户'
  dialogStatus.value = 'edit'
  // dialogTableValue.value = JSON.parse(JSON.stringify(row))

  // }
  // 获取row的信息后 传给对话框这里面有一些 数据处理   可能我写的不是很好但是能用
  const tableData = JSON.parse(JSON.stringify(row))
  // 不需要传递password 所以删了
  delete tableData['password']
  dialogTableValue.value = tableData
}

// 处理删除医生
const handleDeleteDoc = (row) => {
  ElMessageBox.confirm('请确认是否删除该患者', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteDocById({ id: row.id })
      getList()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}

const logDialogVisible = ref(false)
//  处理单击 查看日志
const handleCheckLog = () => {
  logDialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.top-form-contianer {
  margin-bottom: 10px;
}
</style>
