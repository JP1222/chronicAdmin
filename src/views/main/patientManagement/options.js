export let options = [
  {
    label: '',
    prop: 'id',
    width: 50
  },
  {
    label: '姓名',
    prop: 'name',
    width: 100
  },
  {
    label: '性别',
    prop: 'sex',
    width: 50
  },
  {
    label: '电话',
    prop: 'telephone'
  },
  {
    label: '生日',
    prop: 'birthday'
  },
  {
    width: 1
  },
  {
    label: '机构',
    prop: 'organization'
  },
  {
    label: '步数',
    prop: 'step',
    width: 80
  },
  {
    label: '上次登录时间',
    prop: 'loginDate'
  },
  {
    label: '会员开始时间',
    prop: 'startDate'
  },
  {
    label: '会员截止时间',
    prop: 'endDate'
  },
  {
    label: '操作',
    prop: 'action',
    width: 300
  }
]

export function roleAddDoc() {
  const hasDoc = options.find((item) => item.label === '所属医生')
  console.log(hasDoc)

  if (!hasDoc) {
    options.splice(7, 0, { label: '所属医生', prop: 'doctorName', width: 90 })
  }
}
