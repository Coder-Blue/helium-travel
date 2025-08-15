<script lang="ts" setup>
import type { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

async function onSubmit(values: InsertLocation) {
  await $csrfFetch("/api/locations", {
    method: "POST",
    body: values,
  });
};

function onSubmitComplete() {
  navigateTo("/dashboard");
}
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1 class="text-lg">
        Thêm Địa Điểm
      </h1>
      <p class="text-sm">
        Địa điểm là nơi bạn đã hoặc sẽ đến. Đó có thể là một thành phố, quốc gia, tiểu bang hoặc điểm tham quan. Bạn có thể thêm thời gian cụ thể đã đến địa điểm này sau khi thêm địa điểm.
      </p>
    </div>
    <LocationForm
      :on-submit
      :on-submit-complete
      submit-label="Thêm"
      submit-icon="tabler:circle-plus-filled"
    />
  </div>
</template>
