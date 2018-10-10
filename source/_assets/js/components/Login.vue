<template>
	<form @submit.prevent="SendLoginRequest">
		<input type="email" v-model="email" name="email">
		<input type="password" v-model="password" name="password">
		<button type="submit">Login</button>
	</form>
</template>

<script>
	import axios from 'axios';
	import Routes from '../Routes'

	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			async SendLoginRequest(e) {
				try {
					const res = await axios({
						method: 'post',
						url : Routes.login,
						headers: {
						  'Content-Type': 'application/json',
						},
						data: {
							email: this.email,
							password: this.password,
						}
					})
					
					this.$eventBus.$emit('login.success', res.data)
				} catch(e) {
					this.$eventBus.$emit('login.error', e.response)
				}
			}
		}
	}
</script>