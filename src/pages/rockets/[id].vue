<template>
  <v-container
    class="py-6"
    style="max-width: 700px"
  >
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      to="/"
      class="mb-4"
    >
      Balik ke list
    </v-btn>

    <!-- loading -->
    <div
      v-if="loading"
      class="text-center py-8"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
      <p class="mt-2">
        Loading...
      </p>
    </div>

    <!-- error + retry -->
    <v-alert
      v-else-if="error"
      type="error"
      class="mb-2"
    >
      {{ error }}
      <div class="mt-2">
        <v-btn
          size="small"
          @click="loadDetail"
        >
          Coba lagi
        </v-btn>
      </div>
    </v-alert>

    <!-- success -->
    <v-card
      v-else-if="rocket"
      class="pa-4"
    >
      <v-img
        v-if="rocket.image_url"
        :src="rocket.image_url"
        height="260"
        cover
        class="mb-4 rounded"
      />
      <div
        v-else
        class="no-image mb-4"
      >
        <v-icon
          icon="mdi-rocket-launch-outline"
          size="48"
        />
      </div>

      <div class="text-h5 mb-2">
        {{ rocket.full_name || 'Nama tidak diketahui' }}
      </div>
      <p class="mb-4">
        {{ rocket.description || 'Deskripsi tidak tersedia' }}
      </p>

      <v-list density="comfortable">
        <v-list-item
          title="Cost per launch"
          :subtitle="rocket.launch_cost || 'Tidak tersedia'"
        />
        <v-list-item
          title="Country"
          :subtitle="rocket.manufacturer?.country_code || 'Tidak tersedia'"
        />
        <v-list-item
          title="First flight"
          :subtitle="rocket.maiden_flight || 'Tidak tersedia'"
        />
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { getRocketById } from '@/api/rockets'
  import { rocketStore } from '@/store/rockets'
  import type { Rocket } from '@/types/rocket'

  const route = useRoute()
  const rocket = ref<Rocket | null>(null)
  const loading = ref(false)
  const error = ref('')

  async function loadDetail () {
    error.value = ''
    const id = String(route.params.id)

    // kalo rocketnya udah ada di store (dari list atau tambahan lokal), ga usah fetch lagi
    const cached = rocketStore.findById(id)
    if (cached) {
      rocket.value = cached
      return
    }

    loading.value = true
    try {
      rocket.value = await getRocketById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Terjadi kesalahan'
    } finally {
      loading.value = false
    }
  }

  onMounted(loadDetail)
  watch(() => route.params.id, loadDetail)
</script>

<style scoped>
.no-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
</style>
