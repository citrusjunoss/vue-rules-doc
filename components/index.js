
import cityPicker from './citypicker'

cityPicker.install = function(Vue) {
  Vue.component(cityPicker.name, cityPicker)
}


let install = function(Vue) {
  cityPicker.install(Vue)
}

export {
  install,
  cityPicker,
}

export default {
  install
}