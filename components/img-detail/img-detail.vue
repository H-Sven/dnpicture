<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			index: Number
		},
		data() {
			return {
				
			};
		},
		mounted() {
			// console.log(this.list)
			// console.log(this.index)
		},
		methods: {
			handleClick() {
				getApp().globalData.imgList = this.list
				getApp().globalData.imgIndex = this.index
				this.$u.route('pages/imgDetail/index')
			}
		}
	}
</script>

<style lang="scss">

</style>
