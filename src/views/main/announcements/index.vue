<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row>
        <el-button
          type="primary"
          @click="addNewNotice"
          style="margin-left: 10px"
          >新增公告</el-button
        >
        <el-button @click="handleClickChioseBtn">设为轮播图</el-button>
      </el-row>
    </el-row>

    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      stripe
      :border="true"
      :height="cardHeight"
      highlight-current-row
      selection
      @selection-change="handelSelect"
      @select-all="handleSelectAll"
      style="font-size: 1rem"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'firstPicture'">
          <el-image
            v-if="row.firstPicture"
            class="consult-img"
            :src="row.firstPicture"
          ></el-image>
          <span v-else>暂未设置</span>
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'action'">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :limit="1"
                :data="{ id: row.id }"
                name="file"
                :with-credentials="true"
                :on-success="handleSuccess"
              >
                <el-button type="primary">设置预览图片</el-button>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-button @click="handleEdit(row)">编辑</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="danger" @click="handleDelete(row)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :total="total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    />
  </el-card>

  <AnnouncementsDialog
    v-model:dialogVisible="dialogVisible"
    :dialogStatus="dialogStatus"
    :title="title"
    :editData="editData"
    @updateList="getList"
  />
</template>

<script setup>
import {
  getNoticeByAdmin,
  getNoticeByUser,
  deleteNotice,
  submitChiose
} from '@/api/announcements/index'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, computed } from 'vue'
import { options } from './options'
import { useStore } from 'vuex'
import Pagination from '@/components/pagination/index.vue'
import AnnouncementsDialog from '@/views/main/announcements/components/announcementsDialog.vue'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { getURl } from '@/api/request'

const cardHeight = getHeightWithOutHeader()
const store = useStore()

// 表格数据
const tableData = ref([])
// 对话框显示
const dialogVisible = ref(false)
const dialogStatus = ref('')
const title = ref('')
const loading = ref(false)
const total = ref(0)
const editData = ref()
const queryForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const uploadUrl = computed(() => {
  return `${getURl()}/notice/setFirstPicture`
})
const choiseArray = ref([])
const table = ref()

// 获取目前是账户身份
const role = store.state.user.role

// 获取新的信息
const getList = async () => {
  loading.value = true
  if (role === 'staff') {
    const res = await getNoticeByAdmin(queryForm)
    tableData.value = res.body
    total.value = res.body.length

    loading.value = false
  } else if (role === 'admin') {
    const res = await getNoticeByUser(queryForm)
    tableData.value = res.body
    total.value = res.body.length

    loading.value = false
  }
  console.log(tableData.value)
}

// 修改表格信息
const handleEdit = (row) => {
  dialogStatus.value = 'change'
  editData.value = row
  title.value = '修改公告'
  dialogVisible.value = true
}

// 删除表格信息
const handleDelete = (row) => {
  ElMessageBox({
    title: '警告',
    message: '是否删除该信息',
    type: 'warning',
    showCancelButton: true,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        await deleteNotice({ id: row.id })
        getList()
        ElMessage({ type: 'success', message: '删除成功!' })
        done()
      } else {
        ElMessage({ type: 'info', message: '取消成功!' })
        done()
      }
    }
  })
}

// 添加新的公告
const addNewNotice = () => {
  editData.value = {}
  title.value = '添加新公告'
  dialogStatus.value = 'add'
  dialogVisible.value = true
}

// 图片上传成功
const handleSuccess = (res, file, fileList) => {
  fileList.pop()
  console.log(fileList)
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '上传成功'
    })
    getList()
  }
}

//处理表格单击
const handelSelect = (arr, currentClick) => {
  console.log('table', table)
  console.log('arr', arr)

  if (arr.length > 3) {
    table.value.clearSelection()
    choiseArray.value = []
    ElMessage({
      type: 'error',
      message: '您最多选择三个'
    })
  } else {
    choiseArray.value = arr
  }
}

// 处理选择轮播图
const handleClickChioseBtn = async () => {
  const arr = choiseArray.value
  if (arr.length == 0) {
    ElMessage({
      type: 'error',
      message: '请选择公告'
    })
  } else {
    console.log(arr)
    const params = []
    arr.forEach((item) => {
      params.push(item.id)
    })
    const res = await submitChiose(params)
    if (res.success) {
      ElMessage({
        type: 'success',
        message: '选择成功！'
      })
      table.value.clearSelection()
    }
  }
}

getList()
</script>

<style lang="scss" scoped>
.patient-name-contianer {
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.consult-img {
  height: 100px;
  display: table-cell;
  text-align: center;
}
</style>
