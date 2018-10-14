// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

import Vue from 'vue'
import Router from 'vue-router'
import Methods from './views/Methods.vue'
import Statuses from './views/Statuses.vue'
import Document from './views/Document.vue'
import Auths from './views/Auths.vue'
import Headers from './views/Headers.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Document
    },
    {
      path: '/methods',
      name: 'methods',
      component: Methods
    },
    {
      path: '/statuses',
      name: 'statuses',
      component: Statuses
    },
    {
      path: '/auths',
      name: 'auths',
      component: Auths
    },
    {
      path: '/headers',
      name: 'headers',
      component: Headers
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
