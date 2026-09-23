<template>
  <v-card
    :to="`/rockets/${rocket.id}`"
    class="mb-3"
  >
    <div class="d-flex">
      <v-img
        v-if="rocket.image_url"
        :src="rocket.image_url"
        cover
        width="120"
        height="120"
      />
      <div
        v-else
        class="no-image"
      >
        <v-icon
          icon="mdi-rocket-launch-outline"
          size="32"
        />
      </div>

      <div class="pa-3">
        <div class="text-h6">
          {{ rocket.full_name || 'Nama tidak diketahui' }}
        </div>
        <p class="text-body-2 desc">
          {{ rocket.description || 'Deskripsi tidak tersedia' }}
        </p>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import type { Rocket } from '@/types/rocket'

  defineProps<{
    rocket: Rocket
  }>()
</script>

<style scoped>
.no-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
}
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}
</style>
