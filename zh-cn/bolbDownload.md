# 二进制文件下载

后台提供二进制文件流，前端通过Bolb对象转换下载文件

?> :file_folder: src\components\Common\DownloadFile.vue
#### 基础用法


```vue
 <DownloadFile 
    :fileType="['pdf', 'word']" 
    :isShow="trademarkCaseDetail.trademarkRegist.riskWarningSec === 1"
    urlRules="/case/trademark/regist/letterOfRiskGeneratePdfDownload" 
    :Params="{caseId: activeCase.id, isRiskWarning: 1}" 
    downloadText="生成风险告知书" 
  />
  <script>
   import DownloadFile from '@/components/Common/DownloadFile'
   export default {
     components ： {
       DownloadFile
     }
   }
  </script>
```

#### Props

| 参数           | 说明             | 类型    | 可选值               | 默认值                                   |
| -------------- | ---------------- | ------- | -------------------- | ---------------------------------------- |
| `fileType`     | 生成文件类型     | Array   | 根据后台处理参数确定 | []                                       |
| `isShow`       | 是否显示         | Boolean | ----                 | false                                    |
| `downloadText` | 下载按钮展示文字 | String  | ----                 | 下载                                     |
| `urlRules`     | 下载接口         | String  | ----                 | 该功能未完善, 默认的风险告知书下载接口。 |
| `Params`       | 接口参数         | Object  | ----                 | ----                                     |

!> 组件还未完善，目前适用于商标案件风险告知书下载

?> bolb slice MouseEvent 属于新特性，存在兼容问题，兼容浏览器版本如下:

| Featurn              | Chrome | Edge | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebK |
| -------------------- | ------ | ---- | --------------- | ----------------- | ----- | ------------ |
| `Basic support`      | 5[1]   | yes  | 4[2]            | 10                | 11.10 | 5.1 [1]      |
| `slice()`            | 10 21  | yes  | 5 moz[3]   13   | 10                | 12    | 5.1 webkit   |
| `Blob() constructor` | 20     | yes  | 13.0            | 10                | 12.10 | 6            |
| `MouseEvent`         | yes    | --   | ?               | 11                | yes   | ?            |

