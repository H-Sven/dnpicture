<template>
	<view>
		<view class="img_user">
			<u-avatar :src="imgDetail.user.avatar" class="avatar"></u-avatar>
			<view class="user_name">
				<view class="name">{{ imgDetail.user.name }}</view>
				<view class="atime">{{ imgDetail.atime | timeFrom(false) }}</view>
			</view>
		</view>
		<image :src="imgDetail.thumb" class="preview"></image>
		<view class="support_collect">
			<view class="support">
				<u-icon name="thumb-up"></u-icon>
				<text>{{ imgDetail.rank }}</text>
			</view>
			<view class="collect">
				<u-icon name="heart"></u-icon>
				<text>收藏</text>
			</view>
		</view>
		<!-- 相关 -->
		<view v-if="album.length" class="album_wrap">
			<view class="album_title">相关</view>
			<view class="album_list">
				<view v-for="(item, index) in album" :key="index" class="album_item">
					<image :src="item.cover" class="img_cover"></image>
					<view class="item_info">
						<view class="tag">专辑</view>
						<view class="name">{{ item.name }}</view>
					</view>
					<view class="more">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 最热评论 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgDetail: {},
				album: [],
				comment: [],
				hot: []
			};
		},
		onLoad() {
			console.log(getApp().globalData.imgList)
			console.log(getApp().globalData.imgIndex)
			const { imgList, imgIndex } = getApp().globalData
			this.imgDetail = imgList[imgIndex]
			this.getImgComment()
		},
		methods: {
			getImgComment() {
				const url = `/image/v2/wallpaper/wallpaper/${this.imgDetail.id}/comment`
				this.$get(url, {}).then(res => {
					console.log(res)
					this.album = res.album
					this.comment = res.comment
					this.hot = res.hot
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.img_user {
	display: flex;
	padding: 30rpx;
	.avatar {
		margin-right: 20rpx;
	}
	.user_name {
		font-size: 30rpx;
		.atime {
			color: #999;
			margin-top: 10rpx;
			font-size: 24rpx;
		}
	}
}
.preview {
	width: 100%;
	height: 360rpx;
}
.support_collect {
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 60rpx;
	border-bottom: 1px solid #999;
	.support,
	.collect {
		display: flex;
		align-items: center;
	}
}
.album_wrap {
	padding: 30rpx;
	border-bottom: 1px solid #999;
	.album_title {
		padding: 10rpx 0;
	}
	.album_item {
		display: flex;
		padding: 10rpx 0;
		.img_cover {
			flex: 1;
			width: 100rpx;
			height: 100rpx;
		}
		.item_info {
			flex: 3;
			padding-left: 20rpx;
			.tag {
				width: 90rpx;
				height: 40rpx;
				background-color: #DD6161;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.name {
				color: #888;
				padding: 10rpx 0;
			}
		}
		.more {
			display: flex;
			align-items: center;
		}
	}
}
</style>
