<template>
  <el-descriptions class="margin-top" title="" :column="3" size="large" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">患者姓名</div>
      </template>
      {{ patient.name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">电话号码</div>
      </template>
      {{ patient.telephone }}
    </el-descriptions-item>
  </el-descriptions>

  <div class="main-contianer">
    <side-type />

    <div class="content">
      <main-table :pid="patientInfo['id']"></main-table>
    </div>
  </div>
</template>
<script setup>
import sideType from './sideType.vue'
import mainTable from './mainTable.vue'
import { reactive, ref, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { getAllType } from '@/api/healthAssessment/main'

const store = useStore()

const patient = JSON.parse(JSON.stringify(store.state.patient.patientInfo))
const patientInfo = reactive(patient)

// 获取路由
const router = useRouter()

// if (!userId) {
//   ElMessage({
//     message: '请选择评测对象',
//     type: 'warning'
//   })
//   router.push({ path: '/patientManagement/main' })
// }

const active = ref({})
provide('active', active)

const activeUrl = ref({})
provide('activeUrl', activeUrl)

const changeInfo = () => {
  patientInfo.name = 'nima'
}

// const getTypeList = () => {
//   getAllType().then((res) => {
//     console.log(res)
//   })
// }
// getTypeList()
</script>

<style lang="scss" scoped>
.main-contianer {
  width: 100%;
  height: 90%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  .left {
    width: 250px;
  }
  .content {
    flex: 1;
    margin-left: 15px;
    width: calc(100% - 250px);
    height: 100%;
  }
}
</style>
