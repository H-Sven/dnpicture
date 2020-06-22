<template>
	<scroll-view scroll-y v-if="monthString" class="recommend_view" @scrolltolower="scrolltolower" >
		<!-- 推荐 -->
		<view class="recommend_warp">
			<view v-for="(item, index) in recommendData" :key="index" class="recommend_item" @click="details(item.target)">
				<image class="item_image" :src="item.thumb"></image>
			</view>
		</view>
		<!-- 月份 -->
		<view class="title">
			<text>{{ monthString }}热图</text>
			<text>更多>></text>
		</view>
		<view class="month_warp">
			<view v-for="(item, index) in monthData" :key="index" class="month_item">
				<img-detail :list="monthData" :index="index">
					<image class="item_image" :src="item.thumb" mode="aspectFill"></image>
				</img-detail>
			</view>
		</view>
		<!-- 热门 -->
		<view class="title">
			<text>热门</text>
		</view>
		<view class="hot_warp">
			<view v-for="(item, index) in verticalList" :key="index" class="hot_item">
				<img-detail :list="verticalList" :index="index">
					<image class="item_image" :src="item.thumb" mode="aspectFill"></image>
				</img-detail>
			</view>
		</view>
		<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				monthString: '',
				recommendData: [],
				monthData: [],
				verticalList: [],
				param: {
					limit: 30,
					order: 'hot',
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
		created() {
			this.getDataList()
		},
		methods: {
			getDataList(param = this.param) {
				this.status = 'loading'
				this.$get('/image/v3/homepage/vertical', {
					...param
				}).then(res => {
					if (this.recommendData.length === 0) {
						this.recommendData = res.homepage[1].items
						this.monthData = res.homepage[2].items
						this.monthString = this.$u.timeFormat(res.homepage[2].stime, 'mm-dd')
					}
					this.verticalList = [...this.verticalList, ...res.vertical]
					this.status = res.vertical.length < 30 ? 'nomore' : 'loadmore'
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
				this.getDataList(this.param)
			},
			details(id) {
				this.$u.route('pages/album/index', { id })
			}
		}
	}
</script>

<style lang="scss" scoped>
.recommend_view {
	height: calc(100vh - 36px);
}
.recommend_warp {
	width: 100%;
	height: 200px;
	display: flex;
	flex-wrap: wrap;
	.recommend_item {
		width: 50%;
		height: 100px;
		.item_image {
			width: 100%;
			height: 100%;
		}
	}
}
.title {
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
}
.month_warp {
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	.month_item {
		width: 33.33%;
		.item_image {
			width: 100%;
			height: 160px;
		}
	}
}
.hot_warp {
	@extend .month_warp;
	.hot_item {
		@extend  .month_item
	}
}
</style>