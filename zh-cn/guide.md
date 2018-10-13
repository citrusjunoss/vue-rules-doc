**工作文档**

---
> Erp项目

该约定提供了一定的参考，可以帮助你规避错误，改善代码的可读性和开发体验。


# 包管理工具
 > 首选使用yarn，请先搭建yarn :https://yarnpkg.com/zh-Hans/

 已经装了 node 下，可以直接执行以下命令安装 yarn ：
 ```
  npm i yarn -g
 ```

# 首次启动前准备
```
git clone git@192.168.16.211:root/erp-vue.git
cd erp-vue
yarn
```

# 启动
```
yarn start
```

# 打包构建
```
yarn build
```

# 分支管理
master：主干分支，保证稳定，只有开发完成并测试通过的稳定功能才可以合并到 master 分支 。master 分支会被部署到生产环境。

release：高仿分支，部署线上跑在真实数据环境，附加紧急 bug 修复作用，各模块分支先合并到 release 分支通过真实数据环境测试后由 release 分支合并到 master 分支。

develop：主要开发分支，用于各模块分支合并的开发。

hotfix: 大型 bug 修复分支，主要用于对周期性长的 bug 修复开发。修复完即合并且删除，下次新建。

各模块分支：模块开发分支，用于日常开发，开发中主要提交合并的分支。
#### 注意事项：
 未测试通过的代码请不要提交到 master、release、develop等分支，开发以模块分支为主。
 ```
 # 为方便开发，你可以设置 pull 和 push 的默认分支为当前开发模块分支，命令如下：
 git branch --set-upstream-to=origin/[模块名] [模块名]
 ```

# git commit 规范
项目使用 validate-commit-msg 用于检查 Commit message 是否符合规范,每次 commit 的时候会错误的提示要解决了才能提交上去。
##### 提交格式
```
<type>(<scope>): <subject>
```
type: commit的类型;
- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

scope: 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等;

- 如果你的修改影响了不止一个 scope ，你可以使用*代替

subject: commit 目的的简短描述，不超过50个字符;
- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

# 项目结构
```
+ dist    —— 存放打包后的文件，是真正用于部署的成品
+ build    —— webpack 构建配置目录
+ config    —— 本地服务配置目录
+ express    —— 数据接口模拟，已有现成后台接口，可不使用(后面可能会使用 mock 替代)
+ node_modules  —— 安装的依赖包目录
+ static  —— 静态资源目录
+ test  —— 单元测试目录
- src   —— 开发目录
    + assets   —— 资源目录，统一管理各模块的 css、图片以及一些公共的 js
    + api   —— 异步请求目录, 对所有的接口封装集中管理
    - components   —— 公共组件
        + base   —— 公共基础组件，一般为颗粒细小的常用组件
    + router   —— 路由配置
    + scss   —— 组件外部引用公共样式表
    + config   —— 业务开发常用公共配置文件
    + store   —— vuex 数据状态管理
    + util   —— 公共js工具
    - views   —— 视图组件，主要开发目录
        - page   —— 路由页面
            + components   —— 相关路由下功能组件和UI组件
            - *.vue   —— 容器组件，主要处理业务逻辑（可无）
            - index.vue   —— 路由入口容器组件，处理逻辑或分发业务功能
        - App.vue   —— layout 组件， 一般由于做全局处理工作
        - main.js   —— 入口配置文件
```


```
根目录下其他主要文件说明
- .editorconfig  —— 统一编辑器排版风格
- .eslintrc   —— eslint 代码语法检查
- .gitignore  —— 配置使用 git 来 push 代码时的忽略项
- .babelrc  —— babel 的配置文件
```


# 开发规范
#### eslint检查
开发环境每次热更新的时候都会执行代码检查，有错误的提示要解决了才能正常显示 UI 界面


#### 组件命名

> 当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。

我们项目统一风格要求如下：
1. 有意义的名词、简短、具有可读性。
2. 组件文件夹名和组件名以 PascalCase (单词首字母大写命名)命名 ，组件使用也同样。
3. 公共组件命名以项目名称简拼为命名空间(IpsComponent.vue), 公共基础组件以base为命名空间（BaseButton.vue）。


#### Template
1. 尽量减少结构嵌套、无意义标签， 必要时使用<template></template>。
2. v-for 和 v-if／v-else 设置 key， 并避免同元素使用。
3. 元素内的属性方法应该分多行撰写，每个特性一行。
4. 能简写的指令就简写。


#### Css
1. 样式用 scss 编写，注意所有组件样式表必须 scoped。
2. 需要全局样式情况下使用特殊 ClassName 避免样式污染。
3. 尽量使用 flex 布局。


#### Javascript
```
尽量使用 ES6 的语法。
```
vue方法放置顺序：

components 、props 、data 、created 、mounted 、activited 、update 、beforRouteUpdate 、methods 、filter 、computed 、watch

方法函数命名：
1. 动宾短语。常用动词 set／get／open／close／jump 等（jumpPage、openCarInfoDialog）
2. http请求方法以 get／post开头，data 结尾。（getDetailData、postFormData）
3. 事件方法以 on 开头（onTypeChange、onSubmit）
4. 驼峰命名。



# 开发资料
### vue 相关资料
1. vue 中文文档：https://cn.vuejs.org
2. ElemnetUI 中文文档：http://element-cn.eleme.io/#/zh-CN
3. JavaScript(ES6)中文文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript


更多待后续补充······
