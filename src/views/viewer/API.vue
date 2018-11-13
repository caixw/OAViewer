<template>
  <v-dialog v-model="visible" width="50rem" scrollable>
    <v-card>
        <v-toolbar flat card dense>
          <v-toolbar-title>
            {{api.summary}}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="visible=false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

      <v-card-text class="pl-0 pr-0">
        <v-chip disabled label small>{{api.method}}</v-chip>
        {{api.path}}

        <vue-markdown v-if="api.description" :source="api.description" />

        <v-expansion-panel expand class="panel">
          <v-expansion-panel-content>
            <h2 class="pl-0 pr-0 subheading" slot="header" v-t="'viewer.api.request'" />
            <v-card>
              <v-card-text>
                <code>{{api.requests[0].type}}</code>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <h2 class="pl-0 pr-0 subheading" slot="header" v-t="'viewer.api.response'" />
            <v-card>
              <v-card-text>
                <code>{{api.responses[0].type}}</code>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.panel{
  box-shadow: none
}
</style>

<script lang="ts">
import VueMarkdown from 'vue-markdown'
import { Component, Vue } from 'vue-property-decorator'
import { API, api } from './types'

@Component({
  components: {
  VueMarkdown
  }
  })
export default class VApi extends Vue {
  api: API = api
  visible: boolean = false

  public show(api: API) {
    this.api = api
    this.visible = true
  }
}
</script>
