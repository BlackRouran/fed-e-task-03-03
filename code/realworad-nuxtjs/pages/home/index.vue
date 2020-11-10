<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item" v-if="user">
								<nuxt-link 
								class="nav-link" 
								:class="{'active': tab === 'your_feed'}"
								exact
								:to="{
									name: 'home',
									query: {
										tab: 'your_feed'
									}
								}">Your Feed</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link 
								class="nav-link" 
								:class="{'active': tab === 'global_feed'}"
								exact
								:to="{
									name: 'home',
									query: {
										tab: 'global_feed'
									}
								}">Global Feed</nuxt-link>
							</li>
							<li class="nav-item" :class="{'active': tab === 'tag_feed'}" v-if="tag">
								<nuxt-link class="nav-link"
							 	exact
								 :to="{
									 name: 'home',
										query: {
										tab: 'tag_feed',
										tag: tag
									}
								 }"
								 >#{{tag}}</nuxt-link>
							</li>
						</ul>
					</div>

					<div class="article-preview" v-for="article in articles" :key="article.slug">
						<div class="article-meta">
							<nuxt-link :to="{
								name: 'profile', 
								params: {
									username: article.author.username
								}
							}">
							<img :src="article.author.image" >
							</nuxt-link>
							<div class="info">
								<a href="" class="author">{{ article.author.username }}</a>
								<span class="date">{{ article.author.createdAt }}</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{'cative': article.favorited }">
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link :to="{
							name: 'article',
							params: {
								slug: article.slug
							}
						}" class="preview-link">
							<h1>{{ article.title }}</h1>
							<p>{{ article.description }}</p>
							<span>Read more...</span>
						</nuxt-link>
					</div>
					<!-- 分页 -->
					<nav>
						<ul class="pagination">
							<li class="page-item" :class="{'active': page === item}" v-for="(item, index) in totlePages" :key="index">
								<nuxt-link class="page-link" :to="{
									name: 'home',
									query: {
										page: item,
										tag: $route.query.tag	,
										tab: tab
									}
								}">{{ item }}</nuxt-link>
							</li>
						</ul>
					</nav>
				</div>
					<!-- 标签  -->
				<div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list" v-for="(item, index) in tags" :key="index">
           <nuxt-link :to="{
									name: 'home',
									query: { 	
										tag: item,
										tab: 'tag_feed'
									}
								}" class="tag-pill tag-default">{{ item }}</nuxt-link>
          </div>
        </div>
      </div>
			<!-- 标签 -->
			</div>
		</div>
	</div>
</template>

<script>
import { getArticles, getFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
	name: 'homeIndex',
	async asyncData ( {query, store} ) {
		const page = Number.parseInt(query.page || 1) 
		const limit = 20
		const { tag } = query
		const tab = query.tab || 'global_feed'
		const loodArticles = store.state.user &&  tab === 'your_feed' ? getFeedArticles : getArticles
		const [articleRes, tagRes] = await Promise.all([
			loodArticles({
					limit,
					offset: (page - 1) * limit,
					tag
				}),
			getTags()
		])
		const { articles, articlesCount } = articleRes.data
		const { tags } = tagRes.data
		return {
			articles,
			articlesCount,
			limit,
			page,
			tags,
			tag,
			tab
		}
	},
	watchQuery: ['page', 'tag'],
	computed: {
		...mapState(["user"]),
		totlePages () {
			return Math.ceil(this.articlesCount / this.limit)
		}
	}
}
</script>

<style>
</style>
