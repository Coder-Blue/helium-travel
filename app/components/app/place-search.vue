<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { SearchSchema } from "~/lib/zod-schemas";

const emit = defineEmits<{ resultSelected: [result: NominatimResult] }>();

const searchResults = ref<NominatimResult[]>([]);
const form = useTemplateRef("form");
const loading = ref(false);
const hasSearched = ref(false);
const errorMessage = ref("");

async function onSubmit(query: Record<string, string>) {
  try {
    loading.value = true;
    hasSearched.value = true;
    errorMessage.value = "";
    searchResults.value = [];

    const results = await $fetch("/api/search", {
      query,
    });

    searchResults.value = results;
  }
  catch (e) {
    const error = e as FetchError;
    errorMessage.value = getFetchErrorMessage(error);
  }
  loading.value = false;
}

function setLocation(result: NominatimResult) {
  emit("resultSelected", result);

  searchResults.value = [];
  errorMessage.value = "";
  hasSearched.value = false;

  if (form.value) {
    form.value.resetForm();
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="text-xs italic flex justify-end gap-1">
      <span>Kết quả tim kiếm bởi</span> <a
        href="https://nominatim.openstreetmap.org/ui/search.html"
        class="link"
        target="_blank"
        rel="noopener nofollow"
      >nominatim</a>
    </div>
    <Form
      ref="form"
      v-slot="{ errors }"
      :validation-schema="toTypedSchema(SearchSchema)"
      :initial-values="{ q: '' }"
      class="flex flex-col gap-2 items-center"
      @submit="onSubmit"
    >
      <div class="join mt-4">
        <div>
          <label class="input join-item">
            <Icon name="tabler:search" />
            <Field
              type="text"
              name="q"
              placeholder="Tìm kiếm một địa điểm..."
              :disabled="loading"
              :class="{ 'input-error': errors.q }"
            />
          </label>
          <div v-if="errors.q" class="validator-hint text-error">
            {{ errors.q }}
          </div>
        </div>
        <button :disabled="loading" class="btn btn-neutral join-item">
          Tìm kiếm
        </button>
      </div>
    </Form>
    <div
      v-if="!loading && errorMessage"
      role="alert"
      class="alert alert-error"
    >
      {{ errorMessage }}
    </div>
    <div
      v-if="!loading && hasSearched && !searchResults.length"
      role="alert"
      class="alert alert-warning"
    >
      Không tìm thấy kết quả
    </div>
    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-lg" />
    </div>
    <div class="flex flex-col overflow-auto gap-2 max-h-60 mt-2">
      <div
        v-for="result in searchResults"
        :key="result.place_id"
        class="card card-sm bg-base-100"
      >
        <div class="card-body">
          <h4 class="card-title">
            {{ result.display_name }}
          </h4>
          <div class="justify-end card-actions">
            <button class="btn btn-warning btn-sm" @click="setLocation(result)">
              Chọn vị trí
              <Icon name="tabler:map-pin-share" size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
