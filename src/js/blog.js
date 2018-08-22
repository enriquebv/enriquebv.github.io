import Glist from './glist'
import Vue from 'vue'

const blog = new Glist('enriquebv')

new Vue({
  el: '#blog',
  data: {
    title: blog.githubUser,
    prop: 'test',
    search: '',
    posts: [],
    post: {},
    page: {},
    page: 0,
    perPage: 10,
    languageFilter: ''
  },
  methods: {
    applyLanguageFilter: function (language) {
      this.languageFilter = language
    },
    showPost: function (event, post) {
      window.history.pushState({ slug: post.slug }, post.description, '#!' + post.slug)

      blog.getPost(post.url)
        .catch(alert)
        .then(content => {
          this.post = content
        })

      event.preventDefault()
    }
  },
  computed: {
    isIndex: function () {
      return this.post.description === undefined
    },
    isPost: function () {
      return this.post.description !== undefined
    },
    isPage: function () {
      return this.page.title !== undefined && this.post.title === undefined
    },
    filteredPosts: function () {
      const first = this.page * this.perPage
      const last = first + this.perPage
      let posts = this.posts

      posts = (this.search.length === 0)
        ? posts
        : posts.filter(post => post.description.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)

      posts = (this.languageFilter.length === 0)
        ? posts
        : posts.filter(post => {

          for (let file in post.files) {
            if (post.files[file].language === this.languageFilter) {
              return true
            }
          }

          return false
        })

      return posts.slice(first, last)
    },
    extensions: function () {
      const extensions = {}

      if (this.posts.length !== 0) {
        let files = this.posts[0].files

        this.posts
          .forEach(post => {
            Object.keys(post.files)
              .forEach(file => {
                const fileExtension = String(file.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0])

                if (!extensions[fileExtension]) {
                  extensions[fileExtension] = {
                    language: post.files[file].language
                  }
                }
              })
          })
      }

      return extensions
    }
  },
  mounted: function () {
    blog.getPosts()
      .then(posts => this.posts = posts)
  },
  watch: {
    title: function () {
      console.info(this.title)
    }
  }
})