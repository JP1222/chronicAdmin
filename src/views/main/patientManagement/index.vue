<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 3px 0">
      <el-row :span="4">
        <el-input v-model="queryForm.word"></el-input>
      </el-row>
      <el-row :span="4">
        <el-button
          icon="el-icon-search"
          type="primary"
          plain
          @click="getList"
          v-debounce
          >搜索</el-button
        >
        <el-button type="default" @click="handleReset" v-debounce
          >重置</el-button
        >
        <el-button type="primary" @click="hadnleAdd">添加用户</el-button>
      </el-row>

      <el-row :span="4"> </el-row>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border
      :height="getHeightWithOutHeader()"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="font-size: 1rem"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template
          v-slot="{ row }"
          v-if="item.prop === 'action' || item.prop === 'step'"
        >
          <div v-if="item.prop === 'action'">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-button @click="goHealthAssessment(row)" type="primary"
                  >健康测评</el-button
                >
              </el-col>
              <el-col :span="7">
                <el-button @click="handleDisease(row)">疾病汇报</el-button>
              </el-col>
              <el-col :span="4">
                <el-button @click="handleSport(row)">运动数据</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="second-row">
              <el-col :span="7">
                <el-button @click="handleClickeDayReport(row)" v-debounce
                  >每日数据</el-button
                >
              </el-col>
              <el-col :span="7">
                <el-button @click="handleEdit(row)">编辑信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="danger" @click="handleDelete(row)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </div>

          <div class="step" v-else>
            <span @click="handleClickStep(row)">{{ row.step }}</span>
          </div>
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

  <Dialog
    ref="editDialog"
    v-model:dialogVisible="dialogVisible"
    :orgList="orgList"
    :role="'admin'"
    :dialogStatus="dialogStatus"
    :docList="docList"
    @updateList="getList"
  />

  <diease-record-dialog
    v-model:dieaseRecordDIalogVisible="dieaseRecordDIalogVisible"
    :patientId="patientId"
    :docList="docList"
  />

  <!-- 每日数据 -->
  <day-report-dialog
    v-model:dialogVisible="dayReportDialogVisible"
    :patientId="patientId"
    :dayReportList="dayReportList"
  />

  <sport-dialog
    v-model:sportDialogVisible="sportDialogVisible"
    :patientId="patientId"
    :docList="docList"
  />

  <step-dialog
    v-model:userStepDialogVisible="stepDialogVisible"
    :patientId="patientId"
  />
</template>
<script setup>
import sportDialog from './components/sportDialog.vue'
import dieaseRecordDialog from './components/dieaseRecordDialog.vue'
import dayReportDialog from './components/dayReportDialog.vue'
import Dialog from './components/Dialog.vue'
import Pagination from '@/components/pagination/index.vue'
import stepDialog from './components/stepDialog.vue'
import {
  getAllPaientBystaff,
  getAllPaientByAdmin,
  deletePaientById,
  getMecIDName,
  getDocList,
  getDayXueYaReport,
  getDayXueTangReport,
  getDayXinLvReport,
  getUseStep
} from '@/api/patientManagement/index'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { options, roleAddDoc } from './options'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 表格高度
const cardHeight = getHeightWithOutHeader()
const store = useStore()
const role = store.state.user.role
const loading = ref(false)
const queryForm = reactive({
  pageNum: 1,
  pageSize: 10,
  word: ''
})
// Dialog ref
const editDialog = ref(null)
// 临时变量记录选中
const temp = ref({})
// 表格数据
const tableData = ref([])
// 医生列表
const docList = ref([])
// 机构列表
const orgList = ref([])
// 表单对话框
const dialogVisible = ref(false)
// 对话框状态
const dialogStatus = ref('')
const total = ref(0)

// 获取路由
const router = useRouter()

// 获取患者
const getList = async () => {
  loading.value = true
  if (role === 'staff') {
    // 医生获取
    const res = await getAllPaientBystaff(queryForm)
    if (res.success) {
      loading.value = false
      tableData.value = res.body.content
      total.value = res.body.totalSize
    }
  } else {
    // 管理员获取
    const res = await getAllPaientByAdmin(queryForm)
    if (res.success) {
      loading.value = false
      tableData.value = res.body.content
      total.value = res.body.totalSize
    }
  }
  temp.value = {}
}

// 获取机构列表
const getOrgList = async () => {
  const res = await getMecIDName()
  if (res.success) {
    console.log(res)
    orgList.value = res.body
  }
}

// 获取医生列表 (管理员)
const getAllDocList = async () => {
  const res = await getDocList()
  if (res.success) {
    docList.value = res.body
  }
}

// 处理单击表格 （ 暂时没用 ）-----------******————————————————————
const handleCurrentChange = (value) => {
  temp.value = value
}
// -----------******————————————————————

// 处理单击健康评测
const goHealthAssessment = (row) => {
  console.log(JSON.parse(JSON.stringify(row)))
  store.dispatch('patient/setPatientInfo', row)
  router.push({ path: '/healthAssessment/main', query: { id: row.id } })
}

// 添加患者单击事件
const hadnleAdd = () => {
  dialogVisible.value = true
  dialogStatus.value = 'add'
}

const dieaseRecordDIalogVisible = ref(false)
const patientId = ref(0)
// 处理单击疾病汇报
const handleDisease = (row) => {
  patientId.value = row.id
  dieaseRecordDIalogVisible.value = true
}

const dayReportDialogVisible = ref(false)
const dayReportList = ref([])
// 处理单击每日数据
const handleClickeDayReport = (row) => {
  dayReportList.value = {}
  getDayXueYaReport({ pid: row.id }).then((res) => {
    const xueYaList = res.body
    getDayXueTangReport({ pid: row.id }).then((res) => {
      const xueTangList = res.body
      getDayXinLvReport({ pid: row.id }).then((res) => {
        const xinLvList = res.body

        dayReportList.value.xueYa = xueYaList
        dayReportList.value.xueTang = xueTangList
        dayReportList.value.xinLv = xinLvList

        dayReportDialogVisible.value = true
      })

      console.log(dayReportList)
    })
  })
}

const sportDialogVisible = ref(false)
// 处理单击运动数据
const handleSport = (row) => {
  patientId.value = row.id
  sportDialogVisible.value = true
}

// 处理单击编辑
const handleEdit = (row) => {
  const data = JSON.parse(JSON.stringify(row))
  delete data['loginDate']
  delete data['registerDate']
  console.log(data)
  dialogStatus.value = 'edit'
  dialogVisible.value = true
  editDialog.value.setData(data)
}

// 删除患者 根据id
const handleDelete = (row) => {
  ElMessageBox.confirm('请确认是否删除该患者', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deletePaientById({ id: row.id })
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

const stepDialogVisible = ref(false)
//查看用户步数
const handleClickStep = (row) => {
  const pid = row.id
  patientId.value = pid
  stepDialogVisible.value = true
}

// 重置
const handleReset = () => {
  if (!queryForm.word) {
    ElMessage.warning('已重置')
  } else {
    queryForm.word = ''
    getList()
  }
}

// 初始化调用的函数
if (role === 'admin') {
  roleAddDoc()
}

getList()
getOrgList()
getAllDocList()
</script>

<style lang="scss" scoped>
.second-row {
  margin-top: 3px;
}

.step {
  color: #303133;
  cursor: pointer;
  width: 200px;

  &:hover {
    color: #409eff;
    text-decoration: underline;
  }

  &:hover::after {
    content: '点我查看用户步数';
    position: fixed;
    color: gray;
    background-color: #fff;
    border-radius: 4px;
    z-index: 999;
  }
}
</style>
