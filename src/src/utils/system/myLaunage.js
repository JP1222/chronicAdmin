const message = {
  date: '时间',
  sex: '性别',
  education: '受教育情况',
  smoke: '吸烟史',
  drink: '饮酒',
  family: '家族病史',
  personal: '个人病史',
  age: '年龄',
  partake: '锻炼参与',
  height: '身高',
  weight: '体重（kg）',
  waist: '腰围（cm）',
  hip: '臀围（cm）',
  fat: '脂肪量',
  lbw: '瘦体重',
  fatRate: '脂肪比（%）',
  max: '最大释氧量',
  left: '握力（左）',
  right: '握力（右）',
  sitStand: '30s坐站（中老年）',
  walk: '4.5m步行（中老年）',
  pushUp: '俯卧撑（男）',
  all: '肌力汇总',
  randomSweet: '随机糖（mmol/L）',
  fastingSweet: '空腹糖（mmol/L）',
  INS: '空腹胰岛素',
  HbAlc: 'HbAlc（%）',
  CPR: '空腹C肽',
  afterSweet: '2h餐后糖（mmol/L）',
  HDL: 'HDL',
  LDL: 'LDL',
  TC: '总胆固醇（mg/dl）',
  TG: '甘油三脂(mg/dl)',
  pressure: '血压（mm Hg）',
  block: '血阻',
  stress: '血管弹性',
  state: '血液状态',
  raw: '血生化',
  density: '骨密度',
  VC: '肺活量',
  electricity: '安静心电图',
  rate: '安静心率',
  SaO2: '血氧饱和度',
  EF: '射血指数',
  muscleBone: '肌骨健康',
  pressure: '血压',
  sweet: '自测糖'
  // id: 'id'
}

const filesArray = [
  'muscleBone',
  'electricity',
  'density',
  'raw',
  'state',
  'all'
]

export function changeValue(key) {
  return message[key]
}

export function isFile(name) {
  return filesArray.indexOf(name) !== -1 ? true : false
}

export function hadleFiles(obj) {
  let files = []
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      if (isFile(key)) {
        delete obj[key]
        let res = {
          key,
          value: element
        }
        files.push(res)
      }
    }
  }
  return files
}
