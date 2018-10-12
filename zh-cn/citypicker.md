# 省市区选择插件

选择省市区以及详细地址插件

?> :file_folder: src\components\cityPicker\index.vue
#### 基础用法


```vue
 <CityPicker 
            :editable="editable"
            :firstLevelCode="trademarkRegister.provinceCode" 
            :firstLevelName="trademarkRegister.provinceName"
            :secondLevelCode="trademarkRegister.cityCode" 
            :secondLevelName="trademarkRegister.cityName"
            :thirdLevelCode="trademarkRegister.county" 
            :thirdLevelName="trademarkRegister.countyName"
            :detailedAddress="trademarkRegister.applyAddress" 
            @finished="updateAddress">
  </CityPicker>
  <script>
  import CityPicker from '@/components/cityPicker'
   export default {
     components ： {
       CityPicker
     },
     methods: {
      updateAddress: function (data) {
        this.trademarkRegister.provinceCode = data.firstLevelCode
        this.trademarkRegister.provinceName = data.firstLevelName
        this.trademarkRegister.cityCode = data.secondLevelCode
        this.trademarkRegister.cityName = data.secondLevelName
        this.trademarkRegister.county = data.thirdLevelCode
        this.trademarkRegister.countyName = data.thirdLevelName
        this.trademarkRegister.applyAddress = data.detailedAddress
      }
     }
   }
  </script>
```

#### Props

| 参数                   | 说明             | 类型   | 可选值     | 默认值 |
| ---------------------- | ---------------- | ------ | ---------- | ------ |
| `editable`               | 是否可编辑       | Bool   | true false | true   |
| `firstLevelCode`         | 省份code         | Number | ----       | ----   |
| `firstLevelName`         | 省份Name         | String | ----       | ----   |
| `secondLevelCode`        | 城市code         | Number | ----       | ----   |
| `secondLevelName`        | 城市Name         | String | ----       | ----   |
| `thirdLevelCode`         | 区县code         | Number | ----       | ----   |
| `thirdLevelName`         | 区县Name         | String | ----       | ----   |
| `detailedAddress`        | 详细地址         | String | ----       | ----   |
| `disableDetailedAddress` | 是否显示详细地址 | Bool   | ----       | false  |

!> 省市区的Name、Code 是必填的，数据回显的时候需要用到Name, Code

#### Events

| 事件名称 | 说明               | 回调参数                                                                                                                    |
| -------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `finished` | 省市区选择完成事件 | object  {firstLevelCode, firstLevelName, secondLevelCode, secondLevelName, thirdLevelCode, thirdLevelName, detailedAddress} |
