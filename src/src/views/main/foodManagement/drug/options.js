export let options = [
  {
    label: '',
    prop: 'id',
    width: '50'
  },
  {
    label: '日期',
    prop: 'date'
  },
  {
    label: '患者姓名',
    prop: 'patientName'
  },
  {
    width: 1
  },
  {
    label: '已开药方',
    prop: 'isDrug'
  },
  {
    label: '操作',
    prop: 'action'
  }
]

export function addItem() {
  const hasDoc = options.find(item => item.label === '所属医生')
  if(!hasDoc){
  options.splice(3, 1, { label: '所属医生', prop: 'doctorName', width: 90 })
  }
}
