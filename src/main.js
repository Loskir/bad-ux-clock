import Vue from 'vue'
import App from './App.vue'
import VueTween from '@seregpie/vuetween'

Vue.use(VueTween)

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
