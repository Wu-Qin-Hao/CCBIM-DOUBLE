# 模型接口

## Attributes

```
说明：属性设置在model组件中设置
```

> 注意：HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：官方文档介绍  https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-camelCase-vs-kebab-casehttps://cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90

```html
<model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="a90a011e-94cc-2c90-8afe-00100e53ee12"
    :isHandle='true'
    :isChooseButton='true'
    :isProfile='true'
    :isWalk='true'
    :isClearHeight='true'
    :isFloor='true'
    :isModelMap='true'
    :isCoordinateButton='true'
    :isPositionButton='true'
    :isMark='true'>
</model>
```


属性设置                     |               说明
---                         |               ---
:urlIp='urlIp'              |               请求模型数据的url地址
worker-Url="../DataWorker.js" |             绘制线框的worker线程文件路径
web-Gl-Font-Url="../gentilis_regular.typeface.json"   |  webGL内字体的json文件路径
:isHandle='true'            |               默认true<br>false : 不开启操作栏<br>true : 开启操作栏<br>**查看使用示例9**
:isChooseButton='true'      |               默认true<br>false : 关闭选择构件按钮功能<br>true : 开启
:isProfile='true'           |               默认true<br>false : 关闭常规剖面按钮功能<br>true : 开启
:isWalk='true'              |               默认true<br>false : 关闭漫游按钮功能<br>true : 开启
:isClearHeight='true'       |               默认true<br>false : 关闭净高测量按钮功能<br>true : 开启
:isFloor='true'             |               默认true<br>false : 关闭楼层/构件按钮功能<br>true : 开启
:isModelMap='true'          |               默认true<br>false : 关闭模型地图按钮功能<br>true : 开启
:isCoordinateButton='true'  |               默认true<br>false : 关闭测坐标按钮功能<br>true : 开启
:isPositionButton='true'    |               默认true<br>false : 关闭图纸定位按钮功能<br>true : 开启
:isMark='true'              |               默认true<br>false : 关闭标注按钮功能<br>true : 开启
:isOpenMiniMap='true'       |               默认true<br>false : 关闭图纸地图<br>true : 开启
:ccbimTextureType=2         |               默认2<br>1: 颜色模式<br>2: 贴图模式<br>**查看使用示例4**
:isSimColorMode='false'     |               默认false<br>单颜色绘制模式<br>**查看使用示例6**
simColorModeColor='0xffffff'     |               默认0xffffff<br>单颜色绘制模式 颜色值<br>**查看使用示例7**
:isModelEdge='true'         |               默认true<br>是否绘制模型边框<br>**查看使用示例7**
modelEdgeColor='#505050'         |               默认#505050<br>模型边框颜色<br>**查看使用示例7**
:isAutoRotation='false'     |               默认false<br>是否自动旋转<br>**查看使用示例8**
:isShowBCInfo='false'       |               默认false<br>是否直接显示构件信息
:isShowContextMenu='true'       |           默认true<br>是否显示选中构件弹出菜单列表
:isNeedUpdate='true'        |               默认true<br>是否需要实时渲染模型开关（默认为true，当鼠标不在模型范围内时不渲染释放内存）


属性设置                     |               说明
---                         |               ---
@render                     |              模型下载完成执行的回调<br>**查看使用示例18**
@selected-geometry          |              选中构件执行的回调，输出构件信息<br>**查看使用示例19**
@click-model-mark           |              点击标注点执行的回调


# <font color=red>使用注意点</font>
> 组件使用时
  worker-Url="../DataWorker.js"
  web-Gl-Font-Url="../gentilis_regular.typeface.json"
  proto-Url="../gemotry.proto"
  是对应的文件路径
> :url-Ip="urlIp"是模型请求的url地址
> version="a90a011e-94cc-2c90-8afe-00100e53ee12"是模型编号

# 使用示例

## 1.基本设置

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo  [基本设置](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/basicSetting.html)

## 2.改变背景色

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <button @click='setClearColor'>背景色改为黄色</button>
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        setClearColor () {
          window.$CCBIM.webglContext.initClearColor('#ffff00')
        }
      }
    })
  </script>
</body>

</html>

```

> 查看demo  [改变背景色](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/setClearColor.html)

## 3.属性设置背景色

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun({
          clearColor: '#312ED8'
        })
      }
    })
  </script>
</body>

</html>

```
> 查看demo  [属性设置背景色](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/ccbimClearColor.html)

## 4.属性设置贴图模式(默认)，颜色模式

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    :ccbim-Texture-Type=1></model>
    <!-- :ccbim-Texture-Type=1为颜色模式2为贴图模式 -->
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>
    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo  [属性设置贴图模式(默认)，颜色模式](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/textureType.html)

## 5.函数切换贴图模式，颜色模式

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <button @click='setMap'>贴图模式（默认）</button>
    <button @click='setColor'>颜色模式</button>
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>
    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        // 设置贴图模式
        setMap () {
          window.$CCBIM.projectManager.setEntMapMode()
        },
        // 设置颜色模式
        setColor () {
          window.$CCBIM.projectManager.setEntColorMode()
        }
      }
    })
  </script>
</body>

</html>

```
> 查看demo  [函数设置贴图模式(默认)，颜色模式](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/switchTexture.html)

## 6.单颜色绘制模式

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    :ccbim-Texture-Type=1
    :is-Sim-Color-Mode='true'></model>
    <!-- 要使用单颜色绘制模式 前提条件是:ccbim-Texture-Type=1颜色模式开启 -->
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>
    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun({
          clearColor: '#312ED8'
        })
      }
    })
  </script>
</body>

</html>

```
> 查看demo [单颜色绘制模式](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/simColorMode.html)

## 7.单颜色绘制模式设置颜色值及设置模型边框颜色

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    :ccbim-Texture-Type=1
    :is-Sim-Color-Mode='true'
    sim-Color-Mode-Color='#2E6CD8'
    :is-Model-Edge='true'
    model-Edge-Color='#541265'></model>
    <!-- 要使用单颜色绘制模式 前提条件是:ccbim-Texture-Type=1颜色模式开启 -->
    <!-- model-Edge-Color='#fff'模型边框颜色设置为白色 -->
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>
    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun({
          clearColor: '#312ED8'
        })
      }
    })
  </script>
</body>

</html>

```
> 查看demo [单颜色绘制模式设置颜色值及设置模型边框颜色](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/simColorMode_Color.html)

## 8.自动旋转

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    :is-Need-Update="false"
    :is-Auto-Rotation='true'></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo [自动旋转](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/autoRotation.html)

## 9.隐藏操作栏

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    :is-Handle='false'></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo [隐藏操作栏](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/noHandle.html)

## 10.操作栏功能（按钮可自己设置显示）

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    :is-Model-Map='false'
    :is-Walk='false'
    :is-Clear-Height='false'
    :is-Mark='false'></model>
    <!-- 关闭模型地图按钮，关闭漫游按钮，关闭净高测量按钮，关闭标注按钮 -->
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo [操作栏功能（按钮可自己设置显示）](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/handleSet.html)

## 11.模型下载完成执行的回调

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    @render='renderFinish'></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        renderFinish () {
          alert('模型下载完成')
        }
      }
    })
  </script>
</body>

</html>

```
> 查看demo [模型下载完成执行的回调](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/renderFinish.html)

## 12.选中构件得到构件信息

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    @selected-geometry='selectedGEO'></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        selectedGEO (data) {
          console.log(data)
        }
      }
    })
  </script>
</body>

</html>

```
> 查看demo [选中构件得到构件信息](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/selectedGEO.html)

## 13.清空模型加载其它模型

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <button @click='disposeRender'>清空模型</button>
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        // 清空模型
        disposeRender () {
          window.$CCBIM.render.$disposeRender()
          // 如果要切换模型，清空模型后获取新的version再运行window.$CCBIM.render.$ccbimRun()
        }
      }
    })
  </script>
</body>

</html>

```
> 查看demo [清空模型加载其它模型](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/disposeRender.html)

## 15.加入标注点

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
      <button @click="modelMarkListRequest">加载标注点列表</button>
      <button @click="addModelMarkRequest">添加标注点</button>
      <button @click="removeModelMarkRequest">删除标注点</button>
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"
    @click-model-mark="clickpoint"
    :model-Mark="modelMarks"
    :is-Handle='false'
    :is-Dbl-Click='true'></render>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.js"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          urlIp: 'http://172.16.9.28:8081',
          modelMarks: [], // 保存标注点的信息
          userList: [] // 这是第三方用户自己保存的标注点信息列表
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        modelMarkListRequest (userList) {
          // 清空选中状态
          // window.$CCBIM.render.$clearAllSelected()
          // 模型标注列表的请求
          window.$CCBIM.render.$modelMarkListRequest().then((markList) => {
            console.log(markList)
            // 需要做一个对象合并，将标注点信息合并到使用方数据内使用
            // userList代表使用方的保存下来的标记列表
            for (let i = 0; i < userList.length; i++) {
              for (let j = 0; j < markList.length; j++) {
                if (userList[i].mpId === markList[j].markingPointId) {
                  Object.assign(userList[i], {pointId: markList[j].markingPointId})
                  Object.assign(userList[i], {pointInfo: markList[j].pointInfo})
                  break
                }
              }
            }
            // 模型场景中加入标注点
            this.modelMarks = []
            for (let i = 0; i < userList.length; i++) {
              let obj = userList[i].pointInfo
              // obj = {
              //   id: '区分标注点',
              //   iconImg: '标注点的图片样式'(默认),
              //   color: '标记点的颜色'(如果有图片又有颜色则使用颜色),
              //   iconText: '文字'(标记文字)
              // }
              Object.assign(obj, {'id': userList[i].pointId})
              Object.assign(obj, {'color': '#333'})
              Object.assign(obj, {'iconText': 'wuqinhao'})
              this.modelMarks.push(obj)
            }
          })
        },
        addModelMarkRequest () {
          // 添加模型标注的请求
          window.$CCBIM.render.$addModelMarkRequest().then((item) => {
            // 返回添加标注的id
            // 1.拿到标注id后使用方做业务操作
            console.log(item)
            this.userList.push({
              mpId: item.result
            })
            // 2.业务操作成功后刷新标注点列表
            this.modelMarkListRequest(this.userList)
          })
        },
        removeModelMarkRequest () {
          console.log(this.modelMarks)
          // 删除模型标注的请求
          if (this.modelMarks[0]) {
            // 拿到要删除的标注点id，调用接口
            window.$CCBIM.render.$removeModelMarkRequest(this.modelMarks[0].id).then(() => {
              // 1.删除成功后，使用方删除相应的标注点业务数据
              // 2.modelMarks数组中删除对应的标注，模型场景内的标注就会消失
              this.modelMarks.shift()
            })
          }
        },
        clickpoint (item) {
          console.log(item)
          window.$CCBIM.render.$bounceModelMark(item.id)
        }
      }
    })
  </script>
</body>

</html>

```
![图片](/images/modelMark.png)

> 查看demo [加入标注点](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/markModel.html)

## 16.模型设置功能

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <button @click='settingHandle'>设置</button>
    <model
    :url-Ip="urlIp"
    worker-Url="../DataWorker.js"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa5500b6-0aad-2c91-8087-00445f1d1597"></model>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>
    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        // 运行webGL
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        // 打开设置页面
        settingHandle () {
          window.$CCBIM.render.$setShowSettingBox()
        }
      }
    })
  </script>
</body>

</html>

```
> 查看demo [模型设置](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/setting.html)

# 图纸接口

## Methods

```
说明：模型对外接口全部挂载在window.$CCBIM.render对象下，以下方法我为了简写省略了此对象
```

方法名称                |   说明                |           参数
---                     |   ---                 |           ---
$ccbimRun(obj)          |   运行webGL           |   Obj对象（非必填）<br>{<br>&nbsp;&nbsp;clearColor : &nbsp;&nbsp; 模型区域背景色，类型：String。<br>
$ccbimUpdate()          |   更新视口长宽        |   无
$disposeRender()            |  清空，切换加载其他图纸  |   无<br>


## Attributes

```
说明：属性设置在dwg组件中设置
```

> 注意：HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：官方文档介绍  https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-camelCase-vs-kebab-casehttps://cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90


属性设置                            |               说明
---                                |               ---
:urlIp='urlIp'                     |               请求模型数据的url地址
proto-Url="../gemotry.proto"       |              图纸的proto协议路径
web-Gl-Font-Url="../gentilis_regular.typeface.json"   |  webGL内字体的json文件路径
:isCoordinateButton='true'         |              默认true<br>false : 关闭图纸测坐标<br>true : 开启<br>
:isPositionButton='true'           |              默认true<br>false : 关闭图纸定位<br>true : 开启<br>
:isFloor='true'                    |              默认true<br>false : 关闭图纸图层<br>true : 开启<br>
:isMark='true'                     |              默认true<br>false : 关闭图纸标注点<br>true : 开启<br>


```html
<dwg
    :url-Ip="urlIp"
    version="a90a011e-94cc-2c90-8afe-00100e53ee12"
    proto-Url="../gemotry.proto"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    :isHandle='true'
    :isFloor='true'
    :isCoordinateButton='true'
    :isPositionButton='true'
    :isMark='true'>
</dwg>
```

属性设置                     |               说明
---                         |               ---
@render                     |              图纸下载完成执行的回调<br>


## 1.图纸基本设置
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <dwg
    :url-Ip="urlIp"
    proto-Url="../gemotry.proto"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa3d010c-bb27-2c91-8082-01b975e1f377"></dwg>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo [图纸基本设置](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/DWG.html)

## 2.图纸操作按钮
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
    <dwg
    :url-Ip="urlIp"
    proto-Url="../gemotry.proto"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    version="aa3d010c-bb27-2c91-8082-01b975e1f377"
    :is-coordinate-button='false'></dwg>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8990'
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      }
    })
  </script>
</body>

</html>

```
> 查看demo [图纸操作按钮](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/DWGHandleSet.html)

## 3.图纸加入标注点

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>CCBIM</title>
</head>

<body>
  <div id="app">
      <button @click="modelMarkListRequest">加载标注点列表</button>
      <button @click="addModelMarkRequest">添加标注点</button>
      <button @click="removeModelMarkRequest">删除标注点</button>
    <dwg
    :url-Ip="urlIp"
    proto-Url="../gemotry.proto"
    web-Gl-Font-Url="../gentilis_regular.typeface.json"
    :model-Mark="modelMarks"
    version="aa3d010c-bb27-2c91-8082-01b975e1f377"></dwg>
  </div>
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="../CCBIM.js"></script>
  <script>

    Vue.use(CCBIM.install)
    new Vue({
      el: '#app',
      data () {
        return {
          // 获取模型数据接口ip
          urlIp: 'http://172.16.9.28:8081',
          modelMarks: [], // 保存标注点的信息
          userList: [] // 这是第三方用户自己保存的标注点信息列表
        }
      },
      mounted () {
        window.$CCBIM.render.$ccbimRun()
      },
      methods: {
        modelMarkListRequest (userList) {
          // 模型标注列表的请求
          window.$CCBIM.render.$modelMarkListRequest().then((markList) => {
            console.log(markList)
            // 需要做一个对象合并，将标注点信息合并到使用方数据内使用
            // userList代表使用方的保存下来的标记列表
            for (let i = 0; i < userList.length; i++) {
              for (let j = 0; j < markList.length; j++) {
                if (userList[i].mpId === markList[j].markingPointId) {
                  Object.assign(userList[i], {pointId: markList[j].markingPointId})
                  Object.assign(userList[i], {pointInfo: markList[j].pointInfo})
                  break
                }
              }
            }
            // 模型场景中加入标注点
            this.modelMarks = []
            for (let i = 0; i < userList.length; i++) {
              let obj = userList[i].pointInfo
              // obj = {
              //   id: '区分标注点',
              //   iconImg: '标注点的图片样式'(默认),
              //   color: '标记点的颜色'(如果有图片又有颜色则使用颜色),
              //   iconText: '文字'(标记文字)
              // }
              Object.assign(obj, {'id': userList[i].pointId})
              Object.assign(obj, {'color': '#333'})
              Object.assign(obj, {'iconText': 'wuqinhao'})
              this.modelMarks.push(obj)
            }
          })
        },
        addModelMarkRequest () {
          // 添加模型标注的请求
          window.$CCBIM.render.$addModelMarkRequest().then((item) => {
            // 返回添加标注的id
            // 1.拿到标注id后使用方做业务操作
            console.log(item)
            this.userList.push({
              mpId: item.result
            })
            // 2.业务操作成功后刷新标注点列表
            this.modelMarkListRequest(this.userList)
          })
        },
        removeModelMarkRequest () {
          console.log(this.modelMarks)
          // 删除模型标注的请求
          if (this.modelMarks[0]) {
            // 拿到要删除的标注点id，调用接口
            window.$CCBIM.render.$removeModelMarkRequest(this.modelMarks[0].id).then(() => {
              // 1.删除成功后，使用方删除相应的标注点业务数据
              // 2.modelMarks数组中删除对应的标注，模型场景内的标注就会消失
              this.modelMarks.shift()
            })
          }
        }
      }
    })
  </script>
</body>

</html>

```
![图片](/images/modelMark.png)

> 查看demo [图纸加入标注点](https://wu-qin-hao.github.io/CCBIMDOC-DIS/static/demo/DWGMarkModel.html)
