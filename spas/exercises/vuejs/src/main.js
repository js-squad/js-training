import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './components/App.vue'
import NewsView from './components/NewsView.vue'
import ItemView from './components/ItemView.vue'
import UserView from './components/UserView.vue'
import UserSubmissionsView from './components/UserSubmissionsView.vue'
import UserCommentsView from './components/UserCommentsView.vue'

// install router
Vue.use(Router)

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/news/:page': {
    component: NewsView
  },
  '/user/:id': {
    component: UserView
  },
  '/item/:id': {
    component: ItemView
  },
  // add route for user's submissions

  // add route for user's comments

})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/news/1'
})

router.start(App, '#app')
