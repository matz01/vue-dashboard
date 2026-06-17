<script setup lang="ts">


import type {Evento} from "@/stores/eventi";

const props = defineProps<{
  evento: Evento
}>()

const emit = defineEmits<{
  cambiaStato: [id: number]
}>()

</script>

<template>
  <v-card>
    <v-card-title>{{ props.evento.casa }} vs {{ props.evento.ospite }}</v-card-title>
    <v-card-subtitle>{{ props.evento.campionato }} — {{ props.evento.data }}</v-card-subtitle>
    <v-card-text>
      <v-chip :color="props.evento.stato === 'pubblicato' ? 'green' : 'orange'">
        {{ props.evento.stato }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="emit('cambiaStato', props.evento.id)">
        {{ props.evento.stato === 'pubblicato' ? 'Nascondi' : 'Pubblica' }}
      </v-btn>
      <v-btn :to="{ name: 'evento', params: { id: props.evento.id } }" variant="text">
        Dettaglio
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
