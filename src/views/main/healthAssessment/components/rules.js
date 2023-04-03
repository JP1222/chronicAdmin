import { ElMessage } from 'element-plus'

const rules = {
  common: {
    rule: [
      {
        type: 'InputNumber',
        field: 'age',
        title: '年龄',
        col: {
          span: 12
        },
        props: {
          min: 1,
          max: 150
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'radio',
        title: '性别',
        field: 'sex',
        col: {
          span: 12
        },
        options: [
          { value: '男', label: '男', disabled: false },
          { value: '女', label: '女', disabled: false }
        ],
        validate: [{ required: true, message: '请选择性别' }]
      },
      {
        type: 'input',
        title: '受教育情况',
        field: 'education',
        validate: [
          { required: true, message: '请输入受教育情况', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        title: '吸烟史',
        field: 'smoke',
        validate: [{ required: true, message: '请输入吸烟史', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '饮酒',
        field: 'drink',
        validate: [{ required: true, message: '请输入饮酒史', trigger: 'blur' }]
      }
    ]
  },
  sift: {
    rule: [
      {
        type: 'input',
        title: '家族病史',
        field: 'family',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '个人病史',
        field: 'personal',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '个人病史',
        field: '锻炼参与',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    ]
  },
  composition: {
    rule: [
      {
        type: 'number',
        field: 'height',
        title: '身高(cm)',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'weight',
        title: '体重（kg）',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'waist',
        title: '腰围（cm）',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'hip',
        title: '臀围（cm）',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'fat',
        title: '脂肪量',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'lbw',
        title: '瘦体重',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'fatRate',
        title: '脂肪比（%）',
        col: {
          span: 12
        },
        props: {
          min: 1
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  heartAdapt: {
    rule: [
      {
        type: 'number',
        field: 'max',
        title: '最大释氧量',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  bone: {
    rule: [
      {
        type: 'upload',
        field: 'density',
        title: '骨密度',
        value: [],
        props: {
          action: '/api/bone/insert',
          name: 'density',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file, fileList) {
            console.log(res)
            // fileList.pop()
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      }
    ],
    option: {
      submitBtn: false,
      resetBtn: false,
      onSubmit: function (formData) {}
    }
  },
  BM: {
    rule: [
      {
        type: 'upload',
        field: 'BM',
        title: '肌骨健康',
        value: [],
        props: {
          action: '/api/BM/insert',
          name: 'density',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      }
    ]
  },
  sweet: {
    rule: [
      {
        type: 'number',
        field: 'randomSweet',
        title: '随机糖（mmol/L）',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'fastingSweet',
        title: '空腹糖（mmol/L）',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'INS',
        title: '空腹胰岛素',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'HbAlc',
        title: 'HbAlc（%）',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'HbAlc',
        title: 'HbAlc（%）',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  bloodFat: {
    rule: [
      {
        type: 'number',
        field: 'HDL',
        title: 'HDL',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'LDL',
        title: 'LDL',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'TC',
        title: '总胆固醇（mg/dl）',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'TG',
        title: '甘油三脂(mg/dl)',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  sign: {
    rule: [
      {
        type: 'number',
        field: 'pressure',
        title: '血压',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'sweet',
        title: '自测糖',
        col: {
          span: 12
        },
        props: {
          min: 0
        },
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  vessel: {
    rule: [
      {
        type: 'input',
        field: 'stress',
        title: '血管弹性',
        col: {
          span: 12
        },

        validate: [{ type: 'number', required: true, message: '请输入' }]
      },

      {
        type: 'input',
        field: 'block',
        title: '血阻',
        col: {
          span: 12
        },

        validate: [{ type: 'number', required: true, message: '请输入' }]
      }
    ]
  },
  blood: {
    rule: [
      {
        type: 'upload',
        field: 'raw',
        title: '血生化',
        value: [],
        props: {
          action: '/api/blood/insert',
          name: 'state',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      },
      {
        type: 'upload',
        field: 'state',
        title: '血液状态',
        value: [],
        props: {
          action: '/api/blood/insert',
          name: 'raw',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      }
    ]
  },
  lung: {
    rule: [
      {
        type: 'number',
        field: 'VC',
        title: '肺活量',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  bloodPressure: {
    rule: [
      {
        type: 'number',
        field: 'pressure',
        title: '血压（mm Hg）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }],
        props: {
          min: 0,
        }
      },
      
    ]
  }
}

export default {
  rules
}
