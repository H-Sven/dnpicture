<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">点击登录</button>
		<!-- #endif -->
		<u-avatar :src="userInfo.avatarUrl"></u-avatar>
		<text>{{ userInfo.nickName }}</text>
		<text>{{ BatteryInfo.level }}</text>
		<text>{{ BatteryInfo.isCharging }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				BatteryInfo: {}
			};
		},
		onLoad() {
			// #ifdef MP-WEIXIN
				this.BatteryInfo = wx.getBatteryInfoSync()
			// #endif
			// #ifndef MP-WEIXIN
				this.getUserInfo()
			// #endif
		},
		methods: {
			getUserInfo() {
				let that = this
				uni.authorize({
						scope: 'scope.userInfo',
						success() {
							 uni.getUserInfo({
								 success(res) {
									that.userInfo = res.userInfo
								 }
							 })
						},
						fail() {
							console.log('fail')
						}
				})
			},
			bindGetUserInfo(res) {
				const that = this
				wx.login({
					success (res) {
						if (res.code) {
							// 获取微信用户信息
							wx.getUserInfo({
								success: res => {
									that.userInfo = res.userInfo
								},
								fail:res => {
									// 获取失败的去引导用户授权 
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
