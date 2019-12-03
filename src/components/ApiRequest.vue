<template>
    <div>
        <h4 class="subtitle-2">{{$i18n.t(title)}}</h4>

        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                <tr>
                    <th>{{$i18n.t('api.var')}}</th>
                    <th>{{$i18n.t('api.type')}}</th>
                    <th>{{$i18n.t('api.value')}}</th>
                    <th>{{$i18n.t('api.description')}}</th>
                </tr>
                </thead>
                <tbody>
                    <x-api-request-body v-for="(param, index) of params" :key="index" :param="param" />
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import XApiRequestBody from '@/components/ApiRequestBody.vue';
import * as apidoc from '@/components/apidoc.ts';

@Component({
  components: { XApiRequestBody }
})
export default class XApiRequest extends Vue {
    @Prop() readonly params!: apidoc.RequestBody[];
    @Prop() readonly title!: string;
}
</script>
