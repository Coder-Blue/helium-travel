<script lang="ts" setup>
import type { InsertLocationLog } from "~/lib/db/schema";

const route = useRoute();
const { $csrfFetch } = useNuxtApp();

const locationStore = useLocationStore();
const { currentLocationLog: locationLog } = storeToRefs(locationStore);

async function onSubmit(values: InsertLocationLog) {
  await $csrfFetch(`/api/locations/${route.params.slug}/${route.params.id}`, {
    method: "PUT",
    body: values,
  });
}

function onSubmitComplete() {
  navigateTo({
    name: "dashboard-location-slug-id",
    params: {
      slug: route.params.slug,
      id: route.params.id,
    },
  });
}
</script>

<template>
  <LocationLogForm
    v-if="locationLog"
    :initial-values="locationLog"
    :on-submit
    :on-submit-complete
    submit-label="Cập nhật Ghi chú"
    submit-icon="tabler:map-pin-up"
  />
</template>
