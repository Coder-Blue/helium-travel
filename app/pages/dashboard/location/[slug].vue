<script lang="ts" setup>
const route = useRoute();
const mapStore = useMapStore();

const { slug } = route.params;
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, {
  lazy: true,
});

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'">
      <div class="loading" />
    </div>
    <div v-if="location && status !== 'pending'">
      <h2 class="text-xl">
        {{ location.name }}
      </h2>
      <p class="text-sm">
        {{ location.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="mt-4">
        <p class="text-sm italic">
          Thêm 1 ghi chú cho địa điểm để bắt đầu.
        </p>
      </div>
      <button class="btn btn-primary mt-2">
        Thêm ghi chú địa điểm
        <Icon name="tabler:map-pin-plus" size="24" />
      </button>
    </div>
    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>
  </div>
</template>
