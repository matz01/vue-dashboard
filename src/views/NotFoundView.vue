<script setup lang="ts">
</script>

<template>
  <v-container class="text-center">
    <h1 class="mb-4">404</h1>
    <p class="mb-4">La pagina che cerchi non esiste.</p>
    <v-btn :to="{ name: 'home' }" color="primary">Torna alla home</v-btn>
  </v-container>
</template>
