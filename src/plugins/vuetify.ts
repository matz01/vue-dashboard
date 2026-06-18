import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'controlRoom',
    themes: {
      controlRoom: {
        dark: true,
        colors: {
          background: '#0d1117',
          surface: '#161b22',
          primary: '#22c55e',
          secondary: '#3b82f6',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
          success: '#22c55e',
          onAir: '#ef4444',
          signalIssue: '#f59e0b',
          standby: '#eab308',
          scheduled: '#3b82f6',
          ended: '#6b7280',
        },
      },
    },
  },
})
