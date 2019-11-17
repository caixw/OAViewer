// SPDX-License-Identifier: MIT

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import API5 from '@/views/API5.vue';
import Sidebar from '@/views/Sidebar.vue';
import APISidebar from '@/views/APISidebar.vue';

export const mode = 'history';
export const routes = [
    {
        path: '/',
        name: 'home',
        components: { default: Home, 'sidebar': Sidebar }
    },
    {
        path: '/api.v5',
        name: 'api.v5',
        components: { default: API5, 'sidebar': APISidebar }
    },
    {
        path: '/about',
        name: 'about',
        components: { default: About, 'sidebar': APISidebar }
    }
];
