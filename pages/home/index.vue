<template>
	<view class="home">
		<view class="tabs">
			<view class="tabs_active">
				<u-tabs ref="uTabs" :list="tabsList" :current="current" @change="tabsChange" :is-scroll="false"></u-tabs>
			</view>
			<u-icon name="search" class="search_icon"></u-icon>
		</view>
		<view class="content">
			<view v-if="current === 0">
				<home-recommend></home-recommend>
			</view>
			<view v-if="current === 1">
				<home-category></home-category>
			</view>
			<view v-if="current === 2">
				<home-new></home-new>
			</view>
			<view v-if="current === 3">
				<home-album></home-album>
			</view>
		</view>
	</view>
</template>
<script>
	import homeAlbum from '@/pages/home/home-album/index.vue'
	import homeCategory from '@/pages/home/home-category/index.vue'
	import homeNew from '@/pages/home/home-new/index.vue'
	import homeRecommend from '@/pages/home/home-recommend/index.vue'
	export default {
		components: {
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend
		},
		data() {
			return {
				current: 0,
				tabsList: [
					{ name: '推荐' },
					{ name: '分类' },
					{ name: '最新' },
					{ name: '专辑' },
				]
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({ title: this.tabsList[0].name })
		},
		methods: {
			tabsChange(index) {
				this.current = index
				uni.setNavigationBarTitle({ title: this.tabsList[index].name })
			},
		}
	}
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;
	.tabs {
		display: flex;
		align-items: center;
		position: relative;
		.tabs_active {
			width: 80%;
			margin: 0 auto;
		}
		.search_icon {
			position: absolute;
			right: 20rpx;
		}
	}
	.content {
		width: 100%;
	}
}
</style>
