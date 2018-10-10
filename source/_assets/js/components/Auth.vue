<template>
	<div>
		<span v-if="loading">loading</span>
		<login v-if="!user && !loading" />
		<div v-else>
			<user :user="user" />
			<logout v-if="user" />
		</div>
	</div>
</template>

<script>
	import Login from './Login.vue';
	import Logout from './Logout.vue';
	import User from './User.vue';
	import axios from 'axios';
	import Routes from '../Routes'

	export default {
		data() {
			return {
				loading: true,
				user: false
			}
		},
		methods: {
			async storeToken(token) {
				this.loading = true

				this.user = await this.getMe(token);
				if(!this.user){
					console.error('something vent wrong')
				}
				
				this.$cookie.set('jwt', JSON.stringify(token), { SameSite:'strict', expires: token.expires_in+'s' })
				this.loading = false

			},
			getMe(token) {
				return axios({
					method: 'post',
					url: Routes.me,
					headers: {
					  'Content-Type': 'application/json',
					  'Authorization': `Bearer ${token.access_token}`
					}
				})
				.then(res => res.data)
				.catch(e => false)
			},
			logout() {
				this.user = false
				this.$cookie.delete('jwt')
			}
		},
		async created() {
			this.$eventBus.$on('login.success', this.storeToken)
			this.$eventBus.$on('logout.success', this.logout)

			const jwt = this.$cookie.get('jwt')
			if(jwt) {
				this.user = await this.getMe(JSON.parse(jwt))
			}
			this.loading = false;
		},
		components: {
			Login,
			Logout,
			User,
		}
	}
</script>