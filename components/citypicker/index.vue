<!-- 城市选择组件 -->
<template>
  <div class="city-picker-container">
    <el-input v-if="editable" style="width: auto" v-model="fullAddress" placeholder="请选择地区" v-on:focus="queryCity()">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <i slot="suffix" class="el-input__icon el-icon-close" @click="clearAddress"></i>
    </el-input>
    <el-input v-if="editable && !disableDetailedAddress" style="width: auto" v-model="result.detailedAddress" placeholder="请输入详细地址" @blur="buildResult" v-on:focus="showCitySelector=false">
      <i slot="suffix" class="el-input__icon el-icon-close" @click="clearDetailedAddress"></i>
    </el-input>
    <div v-if="!editable" class="not-allowed"><span>{{firstLevelName}}</span><span>{{secondLevelName}}</span><span>{{thirdLevelName}}</span><span v-if="!disableDetailedAddress">{{detailedAddress}}</span></div>
    <div class="city-selector" v-show="showCitySelector">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="请选择省份" name="firstLevel">
          <el-button size="mini" plain v-bind:class="{ active: firstLevelTag.id === activeFirstLevelTag.id }" v-for="firstLevelTag in firstLevelTags" :key="firstLevelTag.id" v-on:click="querySecondLevel(firstLevelTag)">{{firstLevelTag.name}}</el-button>
        </el-tab-pane>
        <el-tab-pane label="请选择城市" name="secondLevel">
          <el-button size="mini" plain v-bind:class="{ active: secondLevelTag.id === activeSecondLevelTag.id }" v-for="secondLevelTag in secondLevelTags" :key="secondLevelTag.id" v-on:click="queryThirdLevel(secondLevelTag)">{{secondLevelTag.name}}</el-button>
        </el-tab-pane>
        <el-tab-pane label="请选择地区" name="thirdLevel">
          <el-button size="mini" plain v-bind:class="{ active: thirdLevelTag.id === activeThirdLevelTag.id }" v-for="thirdLevelTag in thirdLevelTags" :key="thirdLevelTag.id" v-on:click="completeTask(thirdLevelTag)">{{thirdLevelTag.name}}</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { queryCityByLevel } from '@/api/common'
  export default {
    name: 'cityPicker',
    props: {
      editable: Boolean,  // 是否可编辑 true 可编辑 false 不可编辑
      detailedAddress: String,  // 详细地址
      firstLevelCode: null,   // 第一层地区编码
      firstLevelName: String,   // 第一层地区名称
      secondLevelCode: null,  // 第二层地区编码
      secondLevelName: String,  // 第二层地区名称
      thirdLevelCode: null,   // 第三层的确编码
      thirdLevelName: String,    // 第三层地区名称
      disableDetailedAddress: Boolean // 不显示详细地址
    },
    data () {
      return {
        showCitySelector: false,
        fullAddress: '',
        activeTab: 'firstLevel',
        activeFirstLevelTag: {},
        activeSecondLevelTag: {},
        activeThirdLevelTag: {},
        firstLevelTags: [],
        secondLevelTags: [],
        thirdLevelTags: [],
        result: {
          detailedAddress: '',
          firstLevelCode: 0,   // 第一层地区编码
          firstLevelName: '',   // 第一层地区名称
          secondLevelCode: 0,  // 第二层地区编码
          secondLevelName: '',  // 第二层地区名称
          thirdLevelCode: 0,   // 第三层的确编码
          thirdLevelName: ''    // 第三层地区名称
        }
      }
    },
    watch: {
      firstLevelName: function (val) {
        this.updateData()
      },
      secondLevelName: function (val) {
        this.updateData()
      },
      thirdLevelName: function (val) {
        this.updateData()
      },
      detailedAddress: function (val) {
        this.updateData()
      }
    },
    beforeDestroy () {
      document.querySelector('body').removeEventListener('click', this.handleBodyClick)
    },
    mounted: function () {
      this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.handleBodyClick)
      })

      this.updateData()
      queryCityByLevel(1).then(response => {
        if (response.data.success) {
          this.firstLevelTags = response.data.data
          // 初始化已选值显示
          if (this.firstLevelCode) {
            for (var i = 0; i < this.firstLevelTags.length; i++) {
              if (this.firstLevelTags[i].id === this.firstLevelCode) {
                this.activeFirstLevelTag = this.firstLevelTags[i]
                queryCityByLevel(2, this.activeFirstLevelTag.id).then(response => {
                  this.secondLevelTags = response.data.data
                  if (this.secondLevelCode) {
                    for (var j = 0; j < this.secondLevelTags.length; j++) {
                      if (this.secondLevelTags[j].id === this.secondLevelCode) {
                        this.activeSecondLevelTag = this.secondLevelTags[j]
                        queryCityByLevel(3, this.activeSecondLevelTag.id).then(response => {
                          this.thirdLevelTags = response.data.data
                          if (this.thirdLevelCode) {
                            for (var k = 0; k < this.thirdLevelTags.length; k++) {
                              if (this.thirdLevelTags[k].id === this.thirdLevelCode) {
                                this.activeThirdLevelTag = this.thirdLevelTags[k]
                              }
                            }
                          }
                        })
                      }
                    }
                  }
                })
              }
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: '请求接口失败!'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      updateData: function () {
        if (this.detailedAddress === '' || this.detailedAddress) this.result.detailedAddress = this.detailedAddress
        var fullAddressArr = []
        if (this.firstLevelName === '' || this.firstLevelName) {
          if (this.firstLevelName !== '') {
            fullAddressArr.push(this.firstLevelName)
          }
        }
        if (this.secondLevelName === '' || this.secondLevelName) {
          if (this.secondLevelName !== '') {
            fullAddressArr.push(this.secondLevelName)
          }
        }
        if (this.thirdLevelName === '' || this.thirdLevelName) {
          if (this.thirdLevelName !== '') {
            fullAddressArr.push(this.thirdLevelName)
          }
        }
        this.fullAddress = fullAddressArr.join('/')
      },
      queryCity: function () {
        this.activeTab = 'firstLevel'
        this.showCitySelector = !this.showCitySelector
      },
      handleBodyClick (event) {
        const notOutside = this.$el.contains(event.target)
        if (!notOutside) {
          this.showCitySelector = false
        }
      },
      querySecondLevel: function (tag) {
        this.activeFirstLevelTag = tag
        this.secondLevelTags = []
        this.thirdLevelTags = []
        queryCityByLevel(2, tag.id).then(response => {
          if (response.data.success) {
            this.secondLevelTags = response.data.data
            if (this.secondLevelTags.length > 0) {
              this.activeTab = 'secondLevel'
            } else {
              this.showCitySelector = false
              this.buildResult()
            }
          } else {
            this.$message({
              type: 'error',
              message: '请求接口失败!'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      queryThirdLevel: function (tag) {
        this.activeSecondLevelTag = tag
        this.thirdLevelTags = []
        queryCityByLevel(3, tag.id).then(response => {
          if (response.data.success) {
            this.thirdLevelTags = response.data.data
            if (this.thirdLevelTags.length > 0) {
              this.activeTab = 'thirdLevel'
            } else {
              this.showCitySelector = false
              this.buildResult()
            }
          } else {
            this.$message({
              type: 'error',
              message: '请求接口失败!'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      completeTask: function (tag) {
        this.activeThirdLevelTag = tag
        this.showCitySelector = false
        this.buildResult()
      },
      buildResult: function () {
        this.result.firstLevelCode = this.activeFirstLevelTag.id ? this.activeFirstLevelTag.id : 0
        this.result.firstLevelName = this.activeFirstLevelTag.name ? this.activeFirstLevelTag.name : ''
        this.result.secondLevelCode = this.activeSecondLevelTag.id ? this.activeSecondLevelTag.id : 0
        this.result.secondLevelName = this.activeSecondLevelTag.name ? this.activeSecondLevelTag.name : ''
        this.result.thirdLevelCode = this.activeThirdLevelTag.id ? this.activeThirdLevelTag.id : 0
        this.result.thirdLevelName = this.activeThirdLevelTag.name ? this.activeThirdLevelTag.name : ''
        this.fullAddress = this.result.firstLevelName && this.result.secondLevelName && this.result.thirdLevelName ? this.result.firstLevelName + '/' + this.result.secondLevelName + '/' + this.result.thirdLevelName : ''
        this.$emit('finished', this.result)
      },
      handleClick: function () {
      },
      reset: function () {
        this.result.firstLevelCode = null
        this.result.firstLevelName = null
        this.result.secondLevelCode = null
        this.result.secondLevelName = null
        this.result.thirdLevelCode = null
        this.result.thirdLevelName = null
        this.fullAddress = ''
        this.activeFirstLevelTag = {}
        this.activeSecondLevelTag = {}
        this.activeThirdLevelTag = {}
        this.result.detailedAddress = null
        this.$emit('finished', this.result)
      },
      clearAddress: function () {
        this.result.firstLevelCode = null
        this.result.firstLevelName = null
        this.result.secondLevelCode = null
        this.result.secondLevelName = null
        this.result.thirdLevelCode = null
        this.result.thirdLevelName = null
        this.fullAddress = ''
        this.activeFirstLevelTag = {}
        this.activeSecondLevelTag = {}
        this.activeThirdLevelTag = {}
        this.$emit('finished', this.result)
      },
      clearDetailedAddress: function () {
        this.result.detailedAddress = ''
        this.buildResult()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .city-picker-container {
    width: auto;
    position: relative;
  }
  .city-selector{
    max-width: 600px;
    position: absolute;
    top:45px;
    z-index: 999;
    overflow-y: scroll;
    max-height: 200px;
  }
  .el-button{
    margin-right: 5px;
    margin-bottom:8px;
    margin-left: 5px;
    cursor: pointer;
  }
  .el-button.active{
    background-color: $light-blue;
    color: $white;
  }
  .el-button:hover{
    background-color: $light-blue;
    color: $white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .not-allowed{
    color: $color-not-allowed;
    cursor: not-allowed;
  }
  .el-icon-close{
    cursor: pointer;
  }
</style>
