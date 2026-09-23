// state management manual pake reactive() bawaan vue
// ga pake pinia biar simple aja, cuma dipake bareng di beberapa halaman

import { reactive } from 'vue'
import { getRockets } from '@/api/rockets'
import type { NewRocketForm, Rocket } from '@/types/rocket'

export const rocketStore = reactive({
  rockets: [] as Rocket[],
  loading: false,
  error: '',

  // dipanggil sekali pas halaman list dibuka
  async fetchRockets () {
    this.loading = true
    this.error = ''
    try {
      this.rockets = await getRockets()
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Terjadi kesalahan'
    } finally {
      this.loading = false
    }
  },

  // dipanggil dari form tambah rocket
  // (API-nya read only jadi ga bisa beneran nyimpen ke server)
  addRocket (form: NewRocketForm) {
    const newRocket: Rocket = {
      id: 'local-' + Date.now(), // id asal2an biar unik
      full_name: form.full_name,
      description: form.description || null,
      image_url: form.image_url || null,
      launch_cost: form.launch_cost || null,
      maiden_flight: form.maiden_flight || null,
      manufacturer: { country_code: form.country_code || null },
    }
    this.rockets.unshift(newRocket)
  },

  findById (id: string) {
    return this.rockets.find(r => r.id === id)
  },
})
