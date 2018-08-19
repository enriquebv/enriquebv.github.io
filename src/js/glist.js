'use strict'

class Glist {
  constructor(user, options) {
    this.githubUser = user
    this.gists = []
    this.slugs = []
  }

  _getJSON(endpoint) {
    const request = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
      request.open('GET', endpoint, true)
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          (request.status === 200)
            ? resolve(JSON.parse(request.response))
            : reject(`Error getting ${endpoint}.`, request)
        }
      }
      request.send()
    })
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      this._getJSON(`https://api.github.com/users/${this.githubUser}/gists`)
        .catch(reject)
        .then(list => {
          this.gists = list.map(gist => Object.assign(gist, { slug: this.getSlug(gist.description) }))
          this.slugs = this.gists.map(gist => this.getSlug(gist.description))
          resolve(this.gists)
        })
    })
  }

  getPost(url) {
    return new Promise((resolve, reject) => {
      this._getJSON(url)
        .catch(reject)
        .then(content => {
          content.slug = this.getSlug(content.description)
          resolve(content)
        })
    })
  }

  getSlug(description) {
    return description
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/(https?:\/\/[^\s]+)/g, '')
      .replace(/\s/g, '-')
      .replace(/[^\d\w-]/g, '')
      .replace(/-$/g, '')
  }
}

module.exports = Glist