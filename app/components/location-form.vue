<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { CENTER_DALAT } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertLocation | null;
  onSubmit: (location: InsertLocation) => Promise<any>;
  onSubmitComplete: () => void;
  submitLabel: string;
  submitIcon: string;
}>();

const router = useRouter();
const mapStore = useMapStore();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: props.initialValues?.name || "",
    description: props.initialValues?.description || "",
    long: props.initialValues?.long || (CENTER_DALAT as [number, number])[0],
    lat: props.initialValues?.lat || (CENTER_DALAT as [number, number])[1],
  },
});

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("long", mapStore.addedPoint.long);
    setFieldValue("lat", mapStore.addedPoint.lat);
  }
});

onMounted(() => {
  mapStore.addedPoint = {
    id: 1,
    name: "Thêm địa điểm",
    description: "",
    long: props.initialValues?.long || (CENTER_DALAT as [number, number])[0],
    lat: props.initialValues?.lat || (CENTER_DALAT as [number, number])[1],
  };
});

const onSubmit = handleSubmit(async (values: InsertLocation) => {
  try {
    submitError.value = "";
    loading.value = true;
    await props.onSubmit(values);
    submitted.value = true;
    props.onSubmitComplete();
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

function formatNumber(value?: number) {
  if (!value)
    return 0;
  return value.toFixed(5);
}

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
  }
  mapStore.addedPoint = null;

  return true;
});
</script>

<template>
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
        {{ props.submitLabel }}
        <span v-if="loading" class="loading loading-spinner loading-sm" />
        <Icon
          v-else
          :name="props.submitIcon"
          size="24"
        />
      </button>
    </div>
  </form>
  <div class="divider" />
  <AppPlaceSearch @result-selected="searchResultSelected" />
</template>
