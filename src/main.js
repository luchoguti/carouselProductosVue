import Vue from 'vue'
import App from './App.vue'
new Vue({
  el: '#app',
  render: h => h(App),
  filters: {
    json: (value) => { return JSON.stringify(value, null, 2) }
  }
})
