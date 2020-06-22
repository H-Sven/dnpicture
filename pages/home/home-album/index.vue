<template>
	<scroll-view v-if="bannerList.length > 0" scroll-y class="album_view" @scrolltolower="scrolltolower">
		<u-swiper :list="bannerList" name="thumb"></u-swiper>
		<view class="album_list">
			<view v-for="(item, index) in albumList" :key="index" class="album_item">
				<image :src="item.cover" class="album_img"></image>
				<view class="album_info">
					<view class="album_name" @click="details(item.id)">{{ item.name }}</view>
					<view class="album_desc" @click="details(item.id)">{{ item.desc | desc }}</view>
					<view class="album_btn">
						<view class="album_follow">+关注</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				albumList: [],
				bannerList: [],
				param: {
					limit: 30,
					order: 'new',
					skip: 0
				},
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		filters: {
			desc(value) {
				const strText = value.length > 30 ? `${value.substr(0,30)}...` : value
				return strText 
			}
		},
		created() {
			this.getAlbumList()
		},
		methods: {
			getAlbumList(param = this.param) {
				this.$get('/image/v1/wallpaper/album', { ...param }).then(res => {
					if (this.bannerList.length === 0) {
						this.bannerList = res.banner
					}
					this.albumList = [...this.albumList, ...res.album]
					this.status = res.album.length < 30 ? 'nomore' : 'loadmore'
					this.loading = false
				}).catch(err => {
					this.loading = false
					console.log(err)
				})
			},
			// 上拉加载
			scrolltolower() {
				// skip = skip + limit
				if (this.status === 'loading') return false
				if (this.status === 'loadmore') this.param.skip += this.param.limit
				this.getAlbumList(this.param)
			},
			details(id) {
				this.$u.route('pages/album/index', { id })
			}
		}
	}
</script>

<style lang="scss" scoped>
.album_view {
	height: calc(100vh - 36px);
	.album_list {
		padding: 10rpx;
		.album_item {
			display: flex;
			align-items: flex-start;
			padding: 10rpx 0;
			.album_img {
				width: 200rpx;
				height: 200rpx;
				margin-right: 20rpx;
			}
			.album_info {
				flex: 1;
				padding: 0 10rpx;
				.album_name {
					font-size: 30rpx;
					color: #000;
					padding-bottom: 10rpx;
				}
				.album_desc {
					padding: 10rpx 0;
					font-size: 24rpx;
				}
				.album_btn {
					padding: 10rpx;
					display: flex;
					justify-content: flex-end;
					.album_follow {
						column-rule: $u-type-primary;
						border: 1rpx solid $u-type-primary;
						font-size: 20rpx;
						padding: 10rpx;
					}
				}
			}
		}
	}
}
</style>