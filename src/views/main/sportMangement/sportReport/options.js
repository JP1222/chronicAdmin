export const options = [
  {
    label: '',
    prop: 'id',
    width: 50
  },
  {
    label: '患者姓名',
    prop: 'patientName',
    width: 100
  },
  {
    label: '电话号码',
    prop: 'telephone'
  },
  {
    width: 1
  },
  {
    label: '动作名称',
    prop: 'actionName'
  },
  {
    label: '建议',
    prop: 'advice'
  },
  {
    label: '汇报时间',
    prop: 'reportDate'
  },
  {
    label: '操作',
    prop: 'action',
    width: 150
  }
]

export function addDoctor() {
  const hasDoc = options.find(item => item.label === '所属医生')
  if(!hasDoc){
    options.splice(3, 1, { label: '所属医生', prop: 'doctorName', width: 90 })
  }
}
