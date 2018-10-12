# 文件上传插件

文件上传组件，支持多种格式

?> :file_folder: src\components\uploader\index.vue
#### 基础用法


```vue
  <FileUploader 
    :fileUrl="accessoryForm.accessoryAddre" 
    :allowedExtension="allowedExtension"
    tips="格式:word，压缩文件，pdf，png，jpg 10MB以内"
    @removeUploaded="accessoryForm.accessoryAddre = null"
    :fileType="100" 
    :editable="true" 
    :maxSize="10000"
    @fileUploaded="updateAccessoryForm">
  </FileUploader>
  <script>
  import FileUploader from '@/components/uploader'
   export default {
     components ： {
       FileUploader
     },
     methods: {
      updateAccessoryForm: function (filePath) {
        this.accessoryForm.accessoryAddre = filePath
      }
     }
   }
  </script>
```

#### Props

| 参数               | 说明                   | 类型    | 可选值                                                                                   | 默认值                                                                                                                                                                                                                         |
| ------------------ | ---------------------- | ------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `editable`         | ### 是否可编辑             | Boolean | true false                                                                               | true                                                                                                                                                                                                                           |
| `fileUrl`          | 已上传文件链接         | String  | ----                                                                                     | ----                                                                                                                                                                                                                           |
| `allowedExtension` | 允许文件后缀名         | Array   | ----                                                                                     | 默认根据文件类型生成 `0`:['jpg', 'jpeg', 'png']; `1`：['doc', 'docx'] `2`:['pdf']; `3`:['xls', 'xlsx', 'xlsm']; `4`: ['jpg', 'jpeg', 'png', 'xls', 'xlsx', 'xlsm', 'doc', 'docx', 'pdf', 'rar', 'zip', 'tar'];                           |
| `tips`             | 提示文本               | String  | ----                                                                                     | 默认根据文件类型生成 `0`:请上传jpg，jpeg，png格式的图片 `1`：请上传doc，docx格式的文件 `2`:请上传pdf格式的文件; `3`:请上传xls，xlsx, xlsm格式的文件 `4`: 请上传jpg, jpeg, png, xls, xlsx, xlsm, doc, docx, pdf, rar, zip, tar 格式的文件 |
| `fileType`         | 文件类型               | String  | `0`:图片; `1`:word文档; `2`:pdf文档; `3`:excel文档; `4`:所有文件; `100`: 公用图片;`101`:上传的图片地址 | ----                                                                                                                                                                                                                           |
| `maxSize`          | 最大大小（KB）         | Number  | ----                                                                                     | ----                                                                                                                                                                                                                           |
| `isGainTwo`        | 两图上传               | String  | ----                                                                                     | ----                                                                                                                                                                                                                           |
| `allowedAllFile`   | 允许所有的文件类型上传 | Boolean | ----                                                                                     | ----                                                                                                                                                                                                                           |

!> fileType 除了控制默认的 `allowedExtension`  `tips` 外，还影响上传后默认显示的文件logo。 除了props 的fileType 外，组件内部还有一个fileType, 主要文件服务器区分`图片` 和 `文件`，组件自己会根据后缀名来设置，不用另外处理

#### Events

| 事件名称       | 说明             | 回调参数 |
| -------------- | ---------------- | -------- |
| `fileUploaded` | 图片上传完成事件 | 文件路径 |


> 其他

1. 该组件还默认提供了文件上传进度展示，使用axios相关api
2. 文件名的回显截取的是文件路径的filename 后字符串
3. 文件名上传长度限制为100字内（文件服务器限制）
4. 文件名上传大小控制到20M以内（文件服务器限制）