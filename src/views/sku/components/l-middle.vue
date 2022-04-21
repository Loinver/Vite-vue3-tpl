<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-10 09:05:23
 * @LastEditors: Linyer
 * @LastEditTime: 2021-12-18 15:01:56
-->
<template>
  <div class="dimension">
    <!-- {{ testValue }} -->
    <!-- <test v-model="testValue"></test> -->
    <el-form ref="dimensionForm" :model="dimensionForm" :rules="dimensionRules">
      <el-form-item class="" v-for="dimension in dimensionArray" :key="dimension.key" :label="dimension.label">
        <el-checkbox-group v-model="dimension.selected">
          <el-checkbox
            v-for="specification in dimension.specificationValue"
            :key="specification.key"
            :label="specification"
            @change="handleSelectSpecification"
            >{{ specification.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-table :data="dimensionForm.skuTable" border style="width: 100%; margin-top: 20px">
        <el-table-column v-for="(head, index) in skuTableHead" :key="index" :prop="head.prop" :label="head.label" />
        <el-table-column v-for="(head, index) in skuField" :key="index" :prop="head.prop" :label="head.label">
          <template #default="{ row, $index }">
            <el-form-item :prop="'skuTable.' + $index + '.' + head.prop" :rules="dimensionRules[head.prop]">
              <el-input
                type="text"
                :disabled="head.setting.readonly"
                v-model="row[head.prop]"
                clearable
                autocomplete="off"
              >
                <template v-if="head.setting.suffix" #append>{{ head.setting.suffix }}</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item style="margin-top: 20px">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import dictionary from './constants/productFieldDictionary';
import test from './test.vue';
import { reactive, defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    test,
  },
  setup() {
    // 规格维度
    const dimensionArray = reactive([
      {
        key: 'color',
        label: '颜色',
        selected: [],
        specificationValue: [
          {
            key: 'red',
            label: '红色',
          },
          {
            key: 'yellow',
            label: '黄色',
          },
          {
            key: 'green',
            label: '绿色',
          },
        ],
      },
      {
        key: 'size',
        label: '尺寸',
        selected: [],
        specificationValue: [
          {
            key: 'large',
            label: '大',
          },
          {
            key: 'middle',
            label: '中',
          },
          {
            key: 'small',
            label: '小',
          },
        ],
      },
      {
        key: 'address',
        label: '产地',
        selected: [],
        specificationValue: [
          {
            key: 'beijing',
            label: '北京',
          },
          {
            key: 'chengdu',
            label: '成都',
          },
          {
            key: 'xian',
            label: '西安',
          },
          {
            key: 'beijing1',
            label: '北京',
          },
          {
            key: 'chengdu2',
            label: '成都',
          },
          {
            key: 'xian3',
            label: '西安',
          },
          {
            key: 'beijing4',
            label: '北京',
          },
          {
            key: 'chengdu5',
            label: '成都',
          },
          {
            key: 'xian6',
            label: '西安',
          },
          {
            key: 'beijing7',
            label: '北京',
          },
          {
            key: 'chengdu8',
            label: '成都',
          },
          {
            key: 'xian9',
            label: '西安',
          },
          {
            key: 'beijing10',
            label: '北京',
          },
          {
            key: 'chengdu11',
            label: '成都',
          },
          {
            key: 'xian12',
            label: '西安',
          },
          {
            key: 'beijing13',
            label: '北京',
          },
          {
            key: 'chengdu14',
            label: '成都',
          },
          {
            key: 'xian15',
            label: '西安',
          },
        ],
      },
    ]);
    const skuTableHead = reactive([]); // sku表格头部信息
    const skuList = reactive([]); // sku数组数据
    const selectDimension = reactive([]); // 选择的维度和规格值
    const productSkuField = reactive([]); // 不同产品形态下的产品sku的标准字段
    // 产品公私域
    const productArea = {
      publicArea: 'publicArea',
      privateArea: 'privateArea',
    };
    const isPublicAreaProduct = ref(false); // 是否是公域产品
    const currentProductShape = ref('b'); // a为标的额形态的产品 b为标准产品
    // 产品形态
    const productShape = {
      a: {
        label: '标的额产品',
      },
      b: {
        label: '标准产品',
      },
    };
    return {
      dimensionArray,
      skuTableHead,
      skuList,
      selectDimension,
      productSkuField,
      productArea,
      productShape,
      isPublicAreaProduct,
      currentProductShape,
    };
  },
  data() {
    // 校验金额数字
    const checkMoney = (rule, value, callback) => {
      const reg = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
      if (value <= 0) {
        callback(new Error('金额不能小于0.01'));
      } else if (value > 999999999) {
        callback(new Error('金额只能低于10亿'));
      } else if (!reg.test(value)) {
        callback(new Error('金额最多2位小数'));
      } else {
        callback();
      }
    };
    // 校验百分比
    const checkPercentage = (rule, value, callback) => {
      const reg = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
      if (value <= 0) {
        callback(new Error('比例不能小于0.01'));
      } else if (value > 100) {
        callback(new Error('比例不能大于100'));
      } else if (!reg.test(value)) {
        callback(new Error('金额最多2位小数'));
      } else {
        callback();
      }
    };
    return {
      testValue: '22222',
      radioSelect: [],
      dictionary,
      skuField: [],
      dimensionForm: {
        skuTable: [],
      },
      dimensionRules: {
        costPrice: [
          { validator: checkMoney, trigger: 'change' },
          { validator: checkMoney, trigger: 'blur' },
        ],
        officialFees: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur',
          },
        ],
      },
      spanArr: [],
      pos: 0,
    };
  },
  watch: {},
  created() {
    this.skuField = this.getProductFormField(this.currentProductShape, this.productArea.publicArea);
    console.log('[ this.skuField ]', this.skuField);
  },
  methods: {
    /**
     * 获取产品形态下的字段、是否校验、字段类型等
     * type:产品形态
     * domain:公私域
     */
    getProductFormField(type, domain) {
      // 当前产品形态下的标准字段及属性
      const formField = this.dictionary.map((item) => {
        const arr = item?.productForm.filter((shape) => {
          return shape.type === type;
        });
        if (arr.length > 0) {
          return {
            prop: item.prop,
            label: item.label,
            setting: arr[0].setting[domain],
          };
        }
      });
      return formField.filter((item) => item); //筛选一次将undefined去掉
    },
    /**
     * 选择维度下的规格
     */
    handleSelectSpecification() {
      this.selectDimension = this.dimensionArray.filter((item) => item.selected.length > 0);
      console.log('[ this.selectDimension ]', JSON.stringify(this.selectDimension));
      this.updateSkuTable();
    },
    /**
     * 递归获取每条SKU数据
     */
    getSkuData(skuArr = [], i, list) {
      if (list[i]) {
        for (let j = 0; j < list[i].length; j++) {
          if (i < list.length - 1) {
            skuArr[i] = list[i][j];
            this.getSkuData(skuArr, i + 1, list); // 递归循环
          } else {
            this.skuList.push([...skuArr, list[i][j]]); // 扩展运算符，连接两个数组
          }
        }
      }
    },
    /**
     * 更新sku表格数据
     */
    updateSkuTable() {
      console.time('生成表格时间');
      this.skuList = []; // 重新初始化sku列表数组
      const skuArray = []; // [[1, 2], [a, b]...]格式的sku组合
      const skuCheckedArray = []; // 使用一个新数组来处理选中的规格值
      // 生成规格组合
      for (let i = 0; i < this.selectDimension.length; i++) {
        const dimensionKey = this.selectDimension[i]; // 维度的key
        const item = [];
        dimensionKey.selected.forEach((child) => {
          item.push({ key: dimensionKey.key, label: child.label });
        });
        skuCheckedArray.push(item);
      }
      // 将规格组合成一个大数组 [[1, 2], [a, b]...]
      skuCheckedArray.forEach((ele) => {
        ele.length > 0 ? skuArray.push(ele) : '';
      });
      // 生成sku数据
      this.getSkuData([], 0, skuArray);
      this.setTableData(); // 生成表格数据
      console.timeEnd('生成表格时间');
    },
    /**
     * 配置表格数据
     */
    setTableData() {
      this.skuTableHead.length = 0; // 清空表头数组
      this.dimensionForm.skuTable.length = 0; // 清空sku表格数组
      for (let i = 0; i < this.skuList.length; i++) {
        const sku = this.skuList[i];
        const item = {};
        this.skuField.forEach((o) => {
          item[o.prop] = '';
        });
        // 动态设置规格维度key
        sku.forEach((s) => {
          item[s.key] = s.label;
        });
        this.dimensionForm.skuTable.push(item);
      }
      // this.spanArr.length = 0;
      // for (var i = 0; i < this.dimensionForm.skuTable.length; i++) {
      //   if (i === 0) {
      //     this.spanArr.push(1);
      //     this.pos = 0;
      //   } else {
      //     // 判断当前元素与上一个元素是否相同
      //     if (this.dimensionForm.skuTable[i].rkNum === this.dimensionForm.skuTable[i - 1].rkNum) {
      //       this.spanArr[this.pos] += 1;
      //       this.spanArr.push(0);
      //     } else {
      //       this.spanArr.push(1);
      //       this.pos = i;
      //     }
      //   }
      // }
      console.log(',,', this.spanArr);
      console.log('[ this.dimensionForm.skuTable ]', this.dimensionForm.skuTable);
      // 生成表格头部信息
      for (let i = 0; i < this.selectDimension.length; i++) {
        this.skuTableHead.push({
          label: this.selectDimension[i].label,
          prop: this.selectDimension[i].key,
        });
      }
    },
    // cellMerge({ row, column, rowIndex, columnIndex }) {
    // if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
    //   const _row = this.spanArr[rowIndex];
    //   const _col = _row > 0 ? 1 : 0;
    //   return {
    //     rowspan: _row,
    //     colspan: _col,
    //   };
    // }
    // },
    /**
     * 提交表格数据
     */
    handleSubmit() {
      this.$refs.dimensionForm.validate((valid) => {
        console.log('%c [ valid ]-392-「l-middle」', 'font-size:13px; background:pink; color:#bf2c9f;', valid);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
