import Vue from 'vue'
import { MessageBox, Row, Col, Button, Input, Loading, Dialog, Dropdown, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Divider, Popover, Collapse, CollapseItem, Form, FormItem, Select, Option, Menu, MenuItem, MenuItemGroup, Submenu, Tooltip} from 'element-ui'
import Avatar from './components/avatar.vue'
import store from './store/index'
import store1 from './store/store'
import store2 from './store/store2'
import tim from 'tim'
import TIM from 'tim-js-sdk/tim-js-friendship.js'
// import TWebLive from 'tweblive'
import VueClipboard from 'vue-clipboard2'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import './assets/css/animate.css'

import trtcCalling from './trtc-calling'
import TRTCCalling from 'trtc-calling-js'

import qs from 'qs'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 引入axios
import VueResource from 'vue-resource'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
//刷新保存store
if (sessionStorage.getItem('store1')) {
  store1.replaceState(
      Object.assign({},
          store1.state,
          JSON.parse(sessionStorage.getItem('store1'))
      )
  )
  sessionStorage.removeItem('store1')
}

// 监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('store1', JSON.stringify(store1.state))
})

if (sessionStorage.getItem('store')) {
  store.replaceState(
      Object.assign({},
          store.state,
          JSON.parse(sessionStorage.getItem('store'))
      )
  )
  sessionStorage.removeItem('store')
}

// 监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('store', JSON.stringify(store.state))
})


Vue.use(ElementUI)
Vue.use(VueResource)
Vue.config.productionTip = false

window.tim = tim
window.TIM = TIM
window.TRTCCalling = TRTCCalling
window.trtcCalling = trtcCalling
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
// Vue.prototype.TWebLive = TWebLive
Vue.prototype.$store2 = store2
Vue.prototype.$store1 = store1
Vue.prototype.$store = store
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.trtcCalling = trtcCalling
Vue.prototype.TRTCCalling = TRTCCalling
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(VueClipboard)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Divider)
Vue.use(Popover)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Tooltip)
Vue.component('avatar', Avatar)



new Vue({
  el: '#app',
  router,
  store,
  store1,
  store2,
  render: h => h(App)
})
