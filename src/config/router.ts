// SPDX-License-Identifier: MIT

import * as router from 'vue-router';

import Home from '@/views/Home.vue';
import DocTreeSidebar from '@/components/DocTreeSidebar.vue';
import Footer from '@/components/Footer.vue';

import Api from '@/views/Api.vue';
import ApiSidebar from '@/components/ApiSidebar.vue';
import ApiFooter from '@/components/ApiFooter.vue';

export const mode = 'history';
export const routes: router.RouteConfig[] = [
    {
        path: '/',
        name: 'home',
        components: {
            default: Home,
            'sidebar': DocTreeSidebar,
            'footer': Footer
        }
    },
    {
        path: '/api',
        name: 'api',
        components: {
            default: Api,
            'sidebar': ApiSidebar,
            'footer': ApiFooter
        }
    }
];
