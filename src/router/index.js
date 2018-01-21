import Vue from 'vue'
import Router from 'vue-router'
import GitFriend from '@/components/GitFriend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GitFriend',
      component: GitFriend
    }
  ]
})
