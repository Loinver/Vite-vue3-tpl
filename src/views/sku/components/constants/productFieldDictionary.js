/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-11-25 20:22:14
 * @LastEditors: Linyer
 * @LastEditTime: 2021-12-06 18:30:47
 */
const defaultSetting = {
  fieldType: 'input', // 当前字段输入类型 可选值为：input：单输入框，inputRange：输入区间，select：下拉选择，operate：操作栏
  isVerify: true, // 是否需要校验
  suffix: '', // 输入框后缀
  readonly: false, // 是否只读
};
export default [
  {
    label: '标的额区间',
    prop: 'targetLandLadder',
    productForm: [
      {
        type: 'a',
        setting: {
          publicArea: {
            ...defaultSetting,
          },
          privateArea: {
            ...defaultSetting,
          },
        },
      },
    ],
  },
  {
    label: '成本价格(元)',
    prop: 'costPrice',
    productForm: [
      {
        type: 'b',
        setting: {
          publicArea: {
            ...defaultSetting,
          },
          privateArea: {
            ...defaultSetting,
          },
        },
      },
    ],
  },
  {
    label: '成本比例',
    prop: 'costRatio',
    productForm: [
      {
        type: 'a',
        setting: {
          publicArea: { ...defaultSetting },
          privateArea: { ...defaultSetting },
        },
      },
    ],
  },
  {
    label: '官费(元)',
    prop: 'officialFees',
    productForm: [
      {
        type: 'a',
        setting: {
          publicArea: { ...defaultSetting },
          privateArea: { ...defaultSetting },
        },
      },
      {
        type: 'b',
        setting: {
          publicArea: { ...defaultSetting },
          privateArea: { ...defaultSetting },
        },
      },
    ],
  },
  {
    label: '销售价格(元)',
    prop: 'sellingPrice',
    productForm: [
      {
        type: 'b',
        setting: {
          publicArea: { ...defaultSetting, readonly: true },
          privateArea: {
            ...defaultSetting,
            isVerify: false,
            readonly: false,
          },
        },
      },
    ],
  },
  {
    label: '销售价格',
    prop: 'isNegotiable',
    productForm: [
      {
        type: 'b',
        setting: {
          publicArea: { ...defaultSetting, readonly: true },
          privateArea: {
            ...defaultSetting,
            isVerify: false,
            readonly: false,
          },
        },
      },
    ],
  },
  {
    label: '收费比例',
    prop: 'chargeProportion',
    productForm: [
      {
        type: 'a',
        setting: {
          publicArea: { ...defaultSetting, readonly: true, suffix: '%' },
          privateArea: {
            ...defaultSetting,
            isVerify: false,
            readonly: false,
            suffix: '%',
          },
        },
      },
    ],
  },
  {
    label: '操作',
    prop: 'operate',
    productForm: [
      {
        type: 'a',
        setting: {
          publicArea: {
            isLadder: true,
          },
          privateArea: {
            isLadder: false,
          },
        },
      },
      {
        type: 'b',
        setting: {
          publicArea: {
            isLadder: true,
          },
          privateArea: {
            isLadder: true,
          },
        },
      },
    ],
  },
];
