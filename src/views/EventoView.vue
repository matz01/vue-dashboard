<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventiStore } from '@/stores/eventi'

const route = useRoute()
const router = useRouter()
const store = useEventiStore()

const evento = computed(() =>
  store.eventi.find(e => e.id === Number(route.params.id))
)

</script>

<template>
  <v-container>
    <v-alert v-if="!evento" type="warning" text="Evento non trovato" />

    <v-card v-else>
      <v-card-title>{{ evento.casa }} vs {{ evento.ospite }}</v-card-title>
      <v-card-subtitle>{{ evento.campionato }} — {{ evento.data }}</v-card-subtitle>
      <v-card-text>
        <v-chip :color="evento.stato === 'pubblicato' ? 'green' : 'orange'">
          {{ evento.stato }}
        </v-chip>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="store.toggleStato(evento.id)">
          {{ evento.stato === 'pubblicato' ? 'Nascondi' : 'Pubblica' }}
        </v-btn>
        <v-btn variant="text" @click="router.back()">Indietro</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
