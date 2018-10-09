<template>
	<div>
		<b>{{ user.name }}</b><br>
		<small>{{ user.email }}</small>
	</div>
</template>

<script>
	export default {
		props: ['user']
	}
</script>