<template>
	<view>
		<view class="top_img">
			<image :src="album.lcover" mode="widthFix" class="img"></image>
			<div class="name">{{ album.name }}</div>
		</view>
		<view class="desc_info">
			<view class="avatar_name">
				<u-avatar :src="album.user.avatar" size="70"></u-avatar>
				<text class="name">{{ album.user.name }}</text>
			</view>
			<view class="desc">{{ album.desc }}</view>
		</view>
		<view class="wallpaper_wrap">
			<view  v-for="(item, index) in wallpaper" :key="index" class="wallpaper_item">
				<img-detail :list="wallpaper" :index="index">
					<image :src="item.thumb + item.rule.replace('$<Height>', 360)" mode="widthFix" class="item_img"></image>
				</img-detail>
			</view>
		</view>
		<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				album: [],
				wallpaper: [],
				param: {
					limit: 30,
					order: 'new',
					skip: 0,
					first: 1
				},
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			};
		},
		onLoad(props) {
			this.id = props.id
			this.getAlbumDetails()
		},
		methods: {
			getAlbumDetails(param = this.param) {
				this.status = 'loading'
				const url = `/image/v1/wallpaper/album/${this.id}/wallpaper`
				this.$get(url, { ...param }).then(res => {
					if (this.album.length === 0) {
						this.album = res.album
					}
					this.wallpaper = [...this.wallpaper, ...res.wallpaper]
					this.status = res.wallpaper < 30 ? 'nomore' : 'loadmore'
					this.loading = false
				})
			}
		},
		// 页面触底，上拉加载下一页
		onReachBottom() {
			// skip = skip + limit
			if (this.status === 'loading') return false
			if (this.status === 'loadmore') this.param.skip += this.param.limit
			this.param.first = 0
			this.getAlbumDetails(this.param)
		}
	}
</script>

<style lang="scss" scoped>
.top_img {
	width: 100%;
	position: relative;
	.img {
		width: 100%;
	}
	.name {
		position: absolute;
		color: #fff;
		font-size: 26rpx;
		bottom: 15px;
		left: 10px;
	}
}
.desc_info {
	padding: 20rpx;
	.avatar_name {
		display: flex;
		align-items: center;
		.name {
			margin-left: 10rpx;
		}
	}
	.desc {
		color: #666;
		font-size: 26rpx;
		padding-top: 20rpx;
	}
}
.wallpaper_wrap {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	.wallpaper_item {
		width: 33.33%;
		border: 3rpx solid #fff;
	}
}
</style>
