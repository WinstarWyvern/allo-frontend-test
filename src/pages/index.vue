<template>
  <v-container
    class="py-6"
    style="max-width: 700px"
  >
    <h1 class="text-h4 mb-4">
      🚀 Rocket List
    </h1>

    <!-- filter -->
    <v-text-field
      v-model="keyword"
      label="Cari nama rocket..."
      density="comfortable"
      variant="outlined"
      class="mb-2"
    />

    <v-btn
      class="mb-4"
      variant="tonal"
      @click="showForm = !showForm"
    >
      {{ showForm ? 'Tutup form' : '+ Tambah Rocket' }}
    </v-btn>

    <!-- form tambah rocket -->
    <v-card
      v-if="showForm"
      class="pa-4 mb-4"
    >
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="form.full_name"
          label="Nama rocket (wajib)"
          density="comfortable"
        />
        <v-textarea
          v-model="form.description"
          label="Deskripsi"
          density="comfortable"
          rows="2"
        />
        <v-text-field
          v-model="form.image_url"
          label="URL gambar"
          density="comfortable"
        />
        <v-text-field
          v-model="form.launch_cost"
          label="Cost per launch"
          density="comfortable"
        />
        <v-text-field
          v-model="form.country_code"
          label="Kode negara, contoh: USA"
          density="comfortable"
        />
        <v-text-field
          v-model="form.maiden_flight"
          label="First flight"
          type="date"
          density="comfortable"
        />
        <v-btn
          type="submit"
          color="primary"
        >
          Simpan
        </v-btn>
      </v-form>
    </v-card>

    <!-- loading -->
    <div
      v-if="rocketStore.loading"
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
      v-else-if="rocketStore.error"
      type="error"
      class="mb-2"
    >
      {{ rocketStore.error }}
      <div class="mt-2">
        <v-btn
          size="small"
          @click="rocketStore.fetchRockets()"
        >
          Coba lagi
        </v-btn>
      </div>
    </v-alert>

    <!-- success -->
    <div v-else>
      <p
        v-if="filteredRockets.length === 0"
        class="text-medium-emphasis"
      >
        Rocket tidak ditemukan.
      </p>
      <RocketCard
        v-for="rocket in filteredRockets"
        :key="rocket.id"
        :rocket="rocket"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue'
  import { rocketStore } from '@/store/rockets'
  import type { NewRocketForm } from '@/types/rocket'

  const keyword = ref('')
  const showForm = ref(false)

  const form = reactive<NewRocketForm>({
    full_name: '',
    description: '',
    image_url: '',
    launch_cost: '',
    country_code: '',
    maiden_flight: '',
  })

  // lifecycle: pas halaman ini muncul, baru ambil data dari API
  onMounted(() => {
    rocketStore.fetchRockets()
  })

  // filter simple berdasarkan nama
  const filteredRockets = computed(() => {
    if (!keyword.value.trim()) return rocketStore.rockets
    return rocketStore.rockets.filter(r =>
      (r.full_name || '').toLowerCase().includes(keyword.value.toLowerCase()),
    )
  })

  function submitForm () {
    if (!form.full_name.trim()) return
    rocketStore.addRocket({ ...form })
    // reset form
    form.full_name = ''
    form.description = ''
    form.image_url = ''
    form.launch_cost = ''
    form.country_code = ''
    form.maiden_flight = ''
    showForm.value = false
  }
</script>
