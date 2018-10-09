import Vue from 'vue'
import Auth from './components/Auth.vue'

Vue.prototype.$eventBus = new Vue()

new Vue({
	el: '#root',
	components: {
		Auth
	},
	mounted() {
		console.log('hello')
	}
})