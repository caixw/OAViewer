// SPDX-License-Identifier: MIT

import * as router from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import API5 from '@/views/API5.vue';
import DocTreeSidebar from '@/components/DocTreeSidebar.vue';
import APISidebar from '@/components/APISidebar.vue';

export const mode = 'history';
export const routes: router.RouteConfig[] = [
    {
        path: '/',
        name: 'home',
        components: { default: Home, 'sidebar': DocTreeSidebar }
    },
    {
        path: '/api.v5',
        name: 'api.v5',
        components: { default: API5, 'sidebar': APISidebar }
    },
    {
        path: '/about',
        name: 'about',
        components: { default: About, 'sidebar': DocTreeSidebar }
    }
];
