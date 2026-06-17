<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventiStore } from '@/stores/eventi'
import EventoCard from "@/components/EventoCard.vue";

const store = useEventiStore()
const route = useRoute()
const router = useRouter()

// Il filtro vive nella query string (?stato=bozza), non in un ref locale:
// così è condivisibile via URL e sopravvive al refresh della pagina.
const filtro = computed({
  get: () => (route.query.stato as string) ?? 'tutti',
  set: (value: string) => {
    const query = { ...route.query }
    if (value === 'tutti') {
      delete query.stato
    } else {
      query.stato = value
    }
    router.push({ query })
  },
})

const eventiFiltrati = computed(() => {
  if (filtro.value === 'tutti') return store.eventi
  return store.eventi.filter(e => e.stato === filtro.value)
})
</script>

<template>
  <v-container>
    <h1 class="mb-4">Eventi</h1>

    <v-alert
      v-if="route.query.accessNegato"
      type="error"
      text="Accesso negato: devi effettuare il login per visitare l'area riservata."
      class="mb-4"
      closable
    />

    <v-btn-toggle v-model="filtro" mandatory class="mb-4">
      <v-btn value="tutti">Tutti</v-btn>
      <v-btn value="pubblicato">Pubblicati</v-btn>
      <v-btn value="bozza">Bozze</v-btn>
    </v-btn-toggle>

    <EventoCard
      v-for="evento in eventiFiltrati"
      :key="evento.id"
      :evento="evento"
      class="mb-3"
      @cambia-stato="store.toggleStato"
    />
  </v-container>
</template>
