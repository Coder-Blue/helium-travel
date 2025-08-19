<script lang="ts" setup>
import type { InsertLocationLog } from "~/lib/db/schema";

import { CENTER_DALAT } from "~/lib/constants";

const route = useRoute();
const { currentLocation } = useLocationStore();
const { $csrfFetch } = useNuxtApp();

async function onSubmit(values: InsertLocationLog) {
  await $csrfFetch(`/api/locations/${route.params.slug}/add`, {
    method: "POST",
    body: values,
  });
}

async function onSubmitComplete() {
  navigateTo({
    name: "dashboard-location-slug",
    params: {
      slug: route.params.slug,
    },
  });
}
</script>

<template>
  <LocationLogForm
    :initial-values="{
      name: '',
      description: '',
      startedAt: Date.now() - (24 * 60 * 60 * 1000),
      endedAt: Date.now(),
      long: currentLocation?.long || (CENTER_DALAT as [number, number])[0],
      lat: currentLocation?.lat || (CENTER_DALAT as [number, number])[1],
    }"
    :on-submit
    :on-submit-complete
    submit-label="Thêm Ghi chú địa điểm"
    submit-icon="tabler:map-pin-plus"
  />
</template>
