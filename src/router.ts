// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Methods from './views/Methods.vue'
import About from './views/About.vue'
import Document from './views/Document.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/methods',
      name: 'methods',
      component: Methods
    },
    {
      path: '/document',
      name: 'document',
      component: Document
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
