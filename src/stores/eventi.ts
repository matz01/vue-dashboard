import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Evento {
  id: number
  casa: string
  ospite: string
  campionato: string
  data: string
  stato: 'bozza' | 'pubblicato'
}

export const useEventiStore = defineStore('eventi', () => {
  // STATE
  const eventi = ref<Evento[]>([
    { id: 1, casa: 'Milan', ospite: 'Inter', campionato: 'Serie A', data: '2025-03-15 20:45', stato: 'pubblicato' },
    { id: 2, casa: 'Juventus', ospite: 'Roma', campionato: 'Serie A', data: '2025-03-16 18:00', stato: 'bozza' },
    { id: 3, casa: 'Napoli', ospite: 'Lazio', campionato: 'Serie A', data: '2025-03-17 15:00', stato: 'bozza' },
  ])

  // GETTERS
  const pubblicati = computed(() => eventi.value.filter(e => e.stato === 'pubblicato'))
  const bozze = computed(() => eventi.value.filter(e => e.stato === 'bozza'))

  // ACTIONS
  function toggleStato(id: number) {
    const evento = eventi.value.find(e => e.id === id)
    if (evento) {
      evento.stato = evento.stato === 'pubblicato' ? 'bozza' : 'pubblicato'
    }
  }

  return { eventi, pubblicati, bozze, toggleStato }
})
