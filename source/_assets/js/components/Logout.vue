<template>
	<form @submit.prevent="SendLogoutRequest">
		<button type="submit">Logout</button>
	</form>
</template>

<script>
	import axios from 'axios';

	export default {
		methods: {
			async SendLogoutRequest(e) {
				let jwt = localStorage.getItem('jwt')
				
				if(!jwt) {
					return console.error('something went wrong')
				}
				
				jwt = JSON.parse(jwt)

				axios({
					method: 'post',
					url: 'http://user-manager.test/api/auth/logout',
					headers: {
					  'Content-Type': 'application/json',
					  'Authorization': `Bearer ${jwt.access_token}`
					}
				})
				.then(res => {
					this.$eventBus.$emit('logout.success')
				})
				.catch(e => console.error(e))
			}
		}
	}
</script>