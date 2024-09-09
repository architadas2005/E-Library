import router from './router.js'
import NavBar from './components/NavBar.js'

new Vue({
  el: '#app',
  template: `
    <div class="bg-white min-vh">
      <div class="container">
        <NavBar :key='has_changed'/>
        <router-view class="fs-regular"/>
      </div>
    </div>
`,
  router,
  components: {
    NavBar,
  },
  data: {
    has_changed: true,
  },
  watch: {
    $route(to, from) {
      this.has_changed = !this.has_changed
    },
  },
})
