<template>
  <v-dialog v-model="visible" width="50rem">
    <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-chip disabled label>{{api.method}}</v-chip>
            {{api.path}}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="visible=false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

      <v-card-text>
        // tesxt
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { API, api } from './types'

@Component
export default class VApi extends Vue {
  api: API = api
  visible: boolean = false

  public show(api: API) {
    this.api = api
    this.visible = true
  }
}
</script>
