<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { CENTER_DALAT } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

const router = useRouter();

const mapStore = useMapStore();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    long: (CENTER_DALAT as [number, number])[0],
    lat: (CENTER_DALAT as [number, number])[1],
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = getFetchErrorMessage(error);
  }
  loading.value = false;
});

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("long", mapStore.addedPoint.long);
    setFieldValue("lat", mapStore.addedPoint.lat);
  }
});

function formatNumber(value?: number) {
  if (!value)
    return 0;
  return value.toFixed(5);
}

onMounted(() => {
  mapStore.addedPoint = {
    id: 1,
    name: "Thêm địa điểm",
    description: "",
    long: (CENTER_DALAT as [number, number])[0],
    lat: (CENTER_DALAT as [number, number])[1],
  };
});

function searchResultSelected(result: NominatimResult) {
  setFieldValue("name", result.display_name);
  mapStore.addedPoint = {
    id: 1,
    name: "Thêm địa điểm",
    description: "",
    long: Number(result.lon),
    lat: Number(result.lat),
    centerMap: true,
  };
}

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Bạn có chắc chắn bạn muốn rời đi? Tất cả các thay đổi chưa lưu sẽ bị mất!");

    if (!confirm)
      return false;

    return true;
  }
});
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
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="Tên"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="Mô tả"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <p class="text-xs text-gray-400">
        Tọa độ hiện tại: {{ formatNumber(controlledValues.lat) }}, {{ controlledValues.long }}
      </p>
      <p>Để đặt địa điểm:</p>
      <ul class="list-disc ml-4 text-sm">
        <li>Kéo thả con dấu <Icon name="tabler:map-pin-filled" class="text-warning" /> trên bản đồ.</li>
        <li>Nhấp đôi chuột vào bản đồ</li>
        <li>Tìm kiếm qua ô phía dưới</li>
      </ul>
      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Hủy
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="btn btn-primary"
        >
          Thêm
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
    <div class="divider" />
    <AppPlaceSearch @result-selected="searchResultSelected" />
  </div>
</template>
