<template>
<v-card flat tag="article" class="article">
  <h1>APIDOC</h1>

  <section>
    <h3>@api</h3>
    <p>xx</p>
  </section>
</v-card>
</template>

<style scoped>
.article {
  padding: 1rem;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Document extends Vue {}
</script>
