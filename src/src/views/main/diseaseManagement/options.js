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
    width: 1
  },
  {
    label: '睡眠紊乱情况',
    prop: 'sleep'
  },
  {
    label: '血糖检测情况',
    prop: 'sugar'
  },
  {
    label: '关节疼痛情况',
    prop: 'joint'
  },
  {
    label: '汇报时间',
    prop: 'date'
  },
  {
    label: '操作',
    prop: 'action',
    width: 150
  }
]

export function addDoc() {
  const hasDoc = options.find(item => item.label === '所属医生')
  if(!hasDoc){
  options.splice(2, 1, { label: '所属医生', prop: 'doctorName', width: 90 })
  }
}
