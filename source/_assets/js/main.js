import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import Auth from './components/Auth.vue'

Vue.prototype.$eventBus = new Vue()

new Vue({
	el: '#root',
	components: {
		Auth
	}
})